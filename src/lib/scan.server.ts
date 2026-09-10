import { generateObject } from "ai";
import { z } from "zod";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { MAJOR_FIELDS } from "@/lib/platform-data";

type ScanResult = {
  scanRunId: string;
  linksChecked: number;
  brokenLinks: number;
  sourcesChecked: number;
  changesFound: number;
};

/** حالات تعني أن الموقع يحجب الفحص الآلي لا أن الرابط معطّل */
const BLOCKING_STATUSES = new Set([401, 403, 405, 406, 429, 999]);

async function checkLink(url: string): Promise<{
  ok: boolean;
  httpStatus: number | null;
  error: string | null;
}> {
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0 (compatible; TullabPlatformLinkCheck/1.0)" },
      });
      if (response.ok) return { ok: true, httpStatus: response.status, error: null };
      if (BLOCKING_STATUSES.has(response.status)) {
        return { ok: true, httpStatus: response.status, error: "الموقع يحجب الفحص الآلي" };
      }
      if (method === "GET") {
        return { ok: false, httpStatus: response.status, error: `رمز الاستجابة ${response.status}` };
      }
    } catch (error) {
      if (method === "GET") {
        return {
          ok: false,
          httpStatus: null,
          error: error instanceof Error ? error.message : "تعذّر الوصول إلى الرابط",
        };
      }
    }
  }
  return { ok: false, httpStatus: null, error: "تعذّر الوصول إلى الرابط" };
}

function toPlainText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function hashText(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const ProposalSchema = z.object({
  proposals: z.array(
    z.object({
      majorSlug: z.string(),
      field: z.enum(MAJOR_FIELDS),
      newValue: z.string(),
      note: z.string(),
      sourceUrl: z.string(),
    }),
  ),
});

/** يشغّل فحصاً كاملاً: روابط الشهادات + صفحات المصادر الرسمية + استخراج التغييرات المقترحة */
export async function runScan(trigger: "cron" | "manual"): Promise<ScanResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: runRow, error: runError } = await supabaseAdmin
    .from("scan_runs")
    .insert({ trigger, status: "running" })
    .select("id")
    .single();
  if (runError || !runRow) throw new Error(runError?.message ?? "تعذّر إنشاء عملية فحص");
  const scanRunId = runRow.id;

  let linksChecked = 0;
  let brokenLinks = 0;
  let sourcesChecked = 0;
  let changesFound = 0;

  try {
    // ١) فحص روابط الشهادات
    const now = new Date().toISOString();
    for (const cert of certifications) {
      const result = await checkLink(cert.url);
      linksChecked += 1;
      if (!result.ok) brokenLinks += 1;
      await supabaseAdmin.from("link_checks").upsert(
        {
          certification_id: cert.id,
          url: cert.url,
          ok: result.ok,
          http_status: result.httpStatus,
          error: result.error,
          checked_at: now,
          ...(result.ok ? { last_ok_at: now } : {}),
        },
        { onConflict: "certification_id" },
      );
      if (!result.ok) {
        const { data: existing } = await supabaseAdmin
          .from("pending_changes")
          .select("id")
          .eq("entity_id", cert.id)
          .eq("field", "url")
          .eq("status", "pending")
          .maybeSingle();
        if (!existing) {
          await supabaseAdmin.from("pending_changes").insert({
            scan_run_id: scanRunId,
            entity_type: "certification",
            entity_id: cert.id,
            entity_label: cert.title,
            field: "url",
            field_label: "رابط الشهادة",
            old_value: cert.url,
            new_value: cert.url,
            source_url: cert.url,
            note: `رابط معطّل: ${result.error ?? "تعذّر الوصول"}`,
          });
          changesFound += 1;
        }
      }
    }

    // ٢) فحص صفحات المصادر الرسمية
    const { data: sources } = await supabaseAdmin
      .from("sources")
      .select("key, name, url, last_note");
    const changedSources: { name: string; url: string; excerpt: string }[] = [];

    for (const source of sources ?? []) {
      sourcesChecked += 1;
      try {
        const response = await fetch(source.url, {
          redirect: "follow",
          headers: { "user-agent": "Mozilla/5.0 (compatible; TullabPlatformSourceCheck/1.0)" },
        });
        const text = toPlainText(await response.text());
        const hash = await hashText(text);
        const changed = Boolean(source.last_note) && source.last_note !== hash;
        await supabaseAdmin
          .from("sources")
          .update({
            last_reviewed_at: new Date().toISOString(),
            last_status: response.ok ? (changed ? "تغيّر المحتوى" : "بلا تغيير") : "تعذّر الفحص",
            last_note: hash,
          })
          .eq("key", source.key);
        if (changed && response.ok) {
          changedSources.push({
            name: source.name,
            url: source.url,
            excerpt: text.slice(0, 6000),
          });
        }
      } catch {
        await supabaseAdmin
          .from("sources")
          .update({
            last_reviewed_at: new Date().toISOString(),
            last_status: "تعذّر الفحص",
          })
          .eq("key", source.key);
      }
    }

    // ٣) استخراج التغييرات المقترحة من المصادر التي تغيّرت
    const aiKey = process.env["LOVABLE_API_KEY"];
    if (changedSources.length > 0 && aiKey) {
      const gateway = createLovableAiGatewayProvider(aiKey);
      const currentTable = majors
        .map(
          (major) =>
            `${major.slug} | ${major.name} | التشغيل: ${major.employmentRate} | التصنيف: ${major.classification} | الخطر: ${major.risk}`,
        )
        .join("\n");
      const sourceText = changedSources
        .map((source) => `# ${source.name} (${source.url})\n${source.excerpt}`)
        .join("\n\n");

      try {
        const { object } = await generateObject({
          model: gateway("google/gemini-3.8-flash"),
          schema: ProposalSchema,
          system:
            "أنت محلل بيانات سوق عمل أردني. تقرأ نصوصاً من مصادر رسمية وتقترح تحديثات لجدول التخصصات. " +
            "كل النصوص المقترحة بالعربية فقط. لا تقترح أي تحديث ما لم يذكره نص المصدر صراحة. " +
            "قيم التصنيف المسموحة: مطلوب أو مشبع أو راكد. قيم الخطر المسموحة: منخفض أو متوسط أو مرتفع. " +
            "نسبة التشغيل تُكتب بصيغة مثل \"70% – 80%\". إن لم تجد أي دليل صريح فأعد قائمة فارغة.",
          prompt: `جدول التخصصات الحالي:\n${currentTable}\n\nنصوص المصادر التي تغيّرت:\n${sourceText}`,
        });

        for (const proposal of object.proposals.slice(0, 30)) {
          const major = majors.find((item) => item.slug === proposal.majorSlug);
          if (!major) continue;
          const oldValue =
            proposal.field === "employmentRate"
              ? major.employmentRate
              : proposal.field === "classification"
                ? major.classification
                : major.risk;
          if (oldValue === proposal.newValue) continue;
          const { data: existing } = await supabaseAdmin
            .from("pending_changes")
            .select("id")
            .eq("entity_id", major.slug)
            .eq("field", proposal.field)
            .eq("status", "pending")
            .maybeSingle();
          if (existing) continue;
          await supabaseAdmin.from("pending_changes").insert({
            scan_run_id: scanRunId,
            entity_type: "major",
            entity_id: major.slug,
            entity_label: major.name,
            field: proposal.field,
            field_label:
              proposal.field === "employmentRate"
                ? "تقدير نسبة التشغيل (أول سنتين)"
                : proposal.field === "classification"
                  ? "التصنيف في سوق العمل"
                  : "مستوى الخطر",
            old_value: oldValue,
            new_value: proposal.newValue,
            source_url: proposal.sourceUrl || null,
            note: proposal.note,
          });
          changesFound += 1;
        }
      } catch (error) {
        console.error("تعذّر استخراج التغييرات المقترحة", error);
      }
    }

    await supabaseAdmin
      .from("scan_runs")
      .update({
        finished_at: new Date().toISOString(),
        status: "completed",
        links_checked: linksChecked,
        broken_links: brokenLinks,
        sources_checked: sourcesChecked,
        changes_found: changesFound,
      })
      .eq("id", scanRunId);

    return { scanRunId, linksChecked, brokenLinks, sourcesChecked, changesFound };
  } catch (error) {
    await supabaseAdmin
      .from("scan_runs")
      .update({
        finished_at: new Date().toISOString(),
        status: "failed",
        links_checked: linksChecked,
        broken_links: brokenLinks,
        sources_checked: sourcesChecked,
        changes_found: changesFound,
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      })
      .eq("id", scanRunId);
    throw error;
  }
}
