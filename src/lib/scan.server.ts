import { generateObject } from "ai";
import { z } from "zod";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { FIELD_LABELS, MAJOR_FIELDS, type MajorField } from "@/lib/platform-data";

type ScanResult = {
  scanRunId: string;
  linksChecked: number;
  brokenLinks: number;
  sourcesChecked: number;
  changesFound: number;
  reviewedMajors: number;
  statusChanges: number;
  skipped?: boolean;
  paused?: string | null;
};

/** عدد التخصصات في كل نداء ذكاء اصطناعي */
const REVIEW_BATCH_SIZE = 6;
/** أقصى عدد دفعات في الجولة الواحدة */
const MAX_BATCHES_PER_RUN = 6;
/** كل كم يوم تُعاد المراجعة الشاملة */
const FULL_REVIEW_INTERVAL_DAYS = 7;
/** أقصى عمر لجولة فحص قائمة قبل اعتبارها متوقفة (دقائق) */
const RUN_LOCK_MINUTES = 15;

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

const CLASSIFICATIONS = ["مطلوب", "مشبع", "راكد"] as const;
const RISKS = ["منخفض", "متوسط", "مرتفع"] as const;

const ReviewSchema = z.object({
  reviews: z.array(
    z.object({
      majorSlug: z.string(),
      classification: z.enum(CLASSIFICATIONS).nullable(),
      risk: z.enum(RISKS).nullable(),
      employmentRate: z.string().nullable(),
      evidence: z.string(),
      sourceUrl: z.string(),
    }),
  ),
});

type GatewayFailure = { kind: "halt" | "rate_limited"; message: string };

/** يستخرج حالة HTTP من خطأ بوابة الذكاء الاصطناعي */
function gatewayFailure(error: unknown): GatewayFailure | null {
  const raw = error as { statusCode?: number; status?: number; message?: string } | null;
  const status = raw?.statusCode ?? raw?.status ?? 0;
  const message = raw?.message ?? "";
  if (status === 402 || /insufficient|credit/i.test(message)) {
    return { kind: "halt", message: "توقّفت المراجعة الآلية: رصيد الذكاء الاصطناعي غير كافٍ" };
  }
  if (status === 403) {
    return { kind: "halt", message: "توقّفت المراجعة الآلية: الذكاء الاصطناعي معطّل أو تجاوز الحد" };
  }
  if (status === 429) {
    return { kind: "rate_limited", message: "تأجّلت بقية الدفعات: تجاوز حدّ الطلبات" };
  }
  return null;
}

type SourceText = { name: string; url: string; excerpt: string; changed: boolean };

type MajorSnapshot = {
  slug: string;
  name: string;
  values: Record<MajorField, string>;
};

/** يشغّل فحصاً كاملاً: روابط الشهادات + صفحات المصادر + مراجعة حالة التخصصات */
export async function runScan(
  trigger: "cron" | "manual",
  options: { fullReview?: boolean } = {},
): Promise<ScanResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // قفل single-flight: لا نشغّل جولتين متزامنتين
  const lockCutoff = new Date(Date.now() - RUN_LOCK_MINUTES * 60_000).toISOString();
  const { data: activeRun } = await supabaseAdmin
    .from("scan_runs")
    .select("id, started_at")
    .eq("status", "running")
    .gte("started_at", lockCutoff)
    .limit(1)
    .maybeSingle();
  if (activeRun) {
    return {
      scanRunId: activeRun.id,
      linksChecked: 0,
      brokenLinks: 0,
      sourcesChecked: 0,
      changesFound: 0,
      reviewedMajors: 0,
      statusChanges: 0,
      skipped: true,
    };
  }

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
  let reviewedMajors = 0;
  let statusChanges = 0;
  let paused: string | null = null;

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
    const sourceTexts: SourceText[] = [];

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
        if (response.ok) {
          sourceTexts.push({
            name: source.name,
            url: source.url,
            excerpt: text.slice(0, 6000),
            changed,
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

    // ٣) مراجعة حالة التخصصات
    const aiKey = process.env["LOVABLE_API_KEY"];
    const { data: reviewRows } = await supabaseAdmin
      .from("major_reviews")
      .select("slug, last_reviewed_at");
    const reviewMap = new Map((reviewRows ?? []).map((row) => [row.slug, row.last_reviewed_at]));

    const neverReviewed = majors.filter((major) => !reviewMap.has(major.slug));
    const oldestReview = (reviewRows ?? []).reduce<number | null>((oldest, row) => {
      const time = new Date(row.last_reviewed_at).getTime();
      return oldest === null || time < oldest ? time : oldest;
    }, null);
    const fullReviewDue =
      options.fullReview === true ||
      oldestReview === null ||
      Date.now() - oldestReview >= FULL_REVIEW_INTERVAL_DAYS * 24 * 60 * 60_000;

    // ترتيب المراجعة: التخصصات غير المراجعة أولاً، ثم الأقدم مراجعة
    const targets = (fullReviewDue ? [...majors] : neverReviewed).sort((a, b) => {
      const aTime = reviewMap.has(a.slug) ? new Date(reviewMap.get(a.slug)!).getTime() : 0;
      const bTime = reviewMap.has(b.slug) ? new Date(reviewMap.get(b.slug)!).getTime() : 0;
      return aTime - bTime;
    });

    if (targets.length > 0 && sourceTexts.length > 0 && aiKey) {
      const gateway = createLovableAiGatewayProvider(aiKey);

      // القيم الفعلية المعروضة حالياً (بعد أي تحديث سابق معتمد)
      const { data: overrides } = await supabaseAdmin
        .from("data_overrides")
        .select("entity_id, field, value")
        .eq("entity_type", "major");
      const overrideMap = new Map(
        (overrides ?? []).map((row) => [`${row.entity_id}|${row.field}`, row.value]),
      );
      const snapshot = (major: (typeof majors)[number]): MajorSnapshot => ({
        slug: major.slug,
        name: major.name,
        values: {
          employmentRate:
            overrideMap.get(`${major.slug}|employmentRate`) ?? major.employmentRate,
          classification:
            overrideMap.get(`${major.slug}|classification`) ?? major.classification,
          risk: overrideMap.get(`${major.slug}|risk`) ?? major.risk,
        },
      });

      const sourceText = sourceTexts
        .map(
          (source) =>
            `# ${source.name} (${source.url})${source.changed ? " [تغيّر المحتوى]" : ""}\n${source.excerpt}`,
        )
        .join("\n\n");

      const batches: MajorSnapshot[][] = [];
      for (let index = 0; index < targets.length; index += REVIEW_BATCH_SIZE) {
        batches.push(targets.slice(index, index + REVIEW_BATCH_SIZE).map(snapshot));
      }

      for (const batch of batches.slice(0, MAX_BATCHES_PER_RUN)) {
        let reviews: z.infer<typeof ReviewSchema>["reviews"];
        try {
          const { object } = await generateObject({
            model: gateway("google/gemini-3.8-flash"),
            schema: ReviewSchema,
            system:
              "أنت محلل بيانات سوق عمل أردني. تقرأ نصوصاً من مصادر رسمية أردنية وتراجع حالة التخصصات. " +
              "كل النصوص المقترحة بالعربية فقط. " +
              "لكل تخصص أعد الحالة (مطلوب أو مشبع أو راكد) ومستوى الخطر (منخفض أو متوسط أو مرتفع) " +
              'ونسبة التشغيل بصيغة مثل "70% – 80%". ' +
              "لا تعتمد إلا على ما ذكره نص المصدر صراحة، وضع في evidence الجملة المقتبسة من المصدر التي تدل على الحالة. " +
              "إن لم تجد دليلاً صريحاً لحقل ما فأعد قيمته null، وإن لم تجد أي دليل للتخصص فاتركه خارج القائمة.",
            prompt:
              `التخصصات المطلوب مراجعتها وقيمها الحالية:\n` +
              batch
                .map(
                  (major) =>
                    `${major.slug} | ${major.name} | التشغيل: ${major.values.employmentRate} | التصنيف: ${major.values.classification} | الخطر: ${major.values.risk}`,
                )
                .join("\n") +
              `\n\nنصوص المصادر الرسمية:\n${sourceText}`,
          });
          reviews = object.reviews;
        } catch (error) {
          const failure = gatewayFailure(error);
          if (failure) {
            paused = failure.message;
            break;
          }
          console.error("تعذّرت مراجعة دفعة تخصصات", error);
          continue;
        }

        const reviewedAt = new Date().toISOString();
        for (const major of batch) {
          const review = reviews.find((item) => item.majorSlug === major.slug);
          reviewedMajors += 1;

          if (!review || !review.evidence?.trim()) {
            await supabaseAdmin.from("major_reviews").upsert(
              {
                slug: major.slug,
                last_reviewed_at: reviewedAt,
                last_scan_run_id: scanRunId,
                evidence: null,
                source_url: null,
              },
              { onConflict: "slug" },
            );
            continue;
          }

          const proposed: Partial<Record<MajorField, string>> = {};
          if (review.classification) proposed.classification = review.classification;
          if (review.risk) proposed.risk = review.risk;
          if (review.employmentRate?.trim()) {
            proposed.employmentRate = review.employmentRate.trim();
          }

          for (const field of MAJOR_FIELDS) {
            const newValue = proposed[field];
            if (!newValue || newValue === major.values[field]) continue;

            const { error: overrideError } = await supabaseAdmin.from("data_overrides").upsert(
              {
                entity_type: "major",
                entity_id: major.slug,
                field,
                value: newValue,
                source_url: review.sourceUrl || null,
                updated_at: reviewedAt,
                updated_by: "مراجعة آلية",
              },
              { onConflict: "entity_type,entity_id,field" },
            );
            if (overrideError) {
              console.error("تعذّر تطبيق التحديث الآلي", overrideError);
              continue;
            }

            await supabaseAdmin.from("change_log").insert({
              entity_type: "major",
              entity_id: major.slug,
              entity_label: major.name,
              field,
              field_label: FIELD_LABELS[field] ?? field,
              old_value: major.values[field],
              new_value: newValue,
              action: "تحديث آلي",
              actor: "مراجعة آلية",
              source_url: review.sourceUrl || null,
              note: review.evidence.slice(0, 500),
            });

            statusChanges += 1;
            changesFound += 1;
          }

          await supabaseAdmin.from("major_reviews").upsert(
            {
              slug: major.slug,
              last_reviewed_at: reviewedAt,
              last_scan_run_id: scanRunId,
              inferred_classification: review.classification,
              inferred_risk: review.risk,
              inferred_employment_rate: review.employmentRate,
              evidence: review.evidence.slice(0, 1000),
              source_url: review.sourceUrl || null,
            },
            { onConflict: "slug" },
          );
        }
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
        reviewed_majors: reviewedMajors,
        status_changes: statusChanges,
        error: paused,
      })
      .eq("id", scanRunId);

    return {
      scanRunId,
      linksChecked,
      brokenLinks,
      sourcesChecked,
      changesFound,
      reviewedMajors,
      statusChanges,
      paused,
    };
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
        reviewed_majors: reviewedMajors,
        status_changes: statusChanges,
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      })
      .eq("id", scanRunId);
    throw error;
  }
}
