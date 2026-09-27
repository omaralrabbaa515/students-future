import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";

import {
  certificationCategories,
  certificationProviders,
  certifications,
} from "@/data/certifications";
import { getPlatformMeta } from "@/lib/public-data.functions";
import { EMPTY_PLATFORM_META, formatDate, type PlatformMeta } from "@/lib/platform-data";

export const Route = createFileRoute("/certifications")({
  loader: async () => {
    let meta: PlatformMeta = EMPTY_PLATFORM_META;
    try {
      meta = await getPlatformMeta();
    } catch {
      meta = EMPTY_PLATFORM_META;
    }
    return { meta };
  },
  errorComponent: ErrorComponent,
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-4 py-12 text-sm">الصفحة غير موجودة.</p>
  ),
  head: () => ({
    meta: [
      { title: "دليل الشهادات المجانية المعتمدة | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "قاعدة شهادات عالمية مجانية معتمدة بروابط مباشرة في البرمجة والذكاء الاصطناعي والبيانات والأمن السيبراني والصحة العامة والتسويق الرقمي.",
      },
      { property: "og:title", content: "دليل الشهادات المجانية المعتمدة" },
      {
        property: "og:description",
        content: "شهادات مجانية معتمدة تبني ميزة تنافسية لطلبة التخصصات المشبعة والراكدة.",
      },
    ],
  }),
  component: Certifications,
});

function Certifications() {
  const { meta } = Route.useLoaderData();
  const brokenLinks = useMemo(() => {
    const map = new Map<string, string>();
    for (const check of meta.linkChecks) {
      if (!check.ok) map.set(check.certification_id, check.error ?? "تعذّر الوصول إلى الرابط");
    }
    return map;
  }, [meta]);
  const lastLinkCheck = useMemo(() => {
    const dates = meta.linkChecks.map((check) => check.checked_at).sort();
    return dates.at(-1) ?? meta.lastScan?.finished_at ?? meta.lastScan?.started_at ?? null;
  }, [meta]);
  const [category, setCategory] = useState("الكل");
  const [provider, setProvider] = useState("الكل");
  const [query, setQuery] = useState("");
  const [certsList, setCertsList] = useState(certifications);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("platform_custom_certs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const customFormatted = parsed.map((c: any) => ({
              id: c.id || `custom-${Math.random().toString(36).slice(2, 7)}`,
              title: c.name || c.title || "شهادة معتمدة",
              provider: c.provider || "جهة عالمية",
              category: c.domain || c.category || "تقنية المعلومات والبرمجة",
              fields: c.fields || ["علوم الحاسوب", "تكنولوجيا المعلومات", "هندسة البرمجيات"],
              hours: c.estimatedHours || c.hours || 35,
              free: true,
              level: c.level || "مبتدئ إلى متوسط",
              url: c.url || "https://grow.google/certificates/",
              summary: c.summary || "شهادة احترافية معتمدة تعزز فرص العمل.",
            }));
            const existingIds = new Set(certifications.map((c) => c.id));
            const newOnly = customFormatted.filter((c: any) => !existingIds.has(c.id));
            setCertsList([...newOnly, ...certifications]);
          }
        } catch (e) {}
      }
    }
  }, []);

  const filtered = useMemo(
    () =>
      certsList.filter(
        (cert) =>
          (category === "الكل" || cert.category === category) &&
          (provider === "الكل" || cert.provider === provider) &&
          (!query.trim() ||
            cert.title.includes(query.trim()) ||
            cert.summary.includes(query.trim()) ||
            cert.fields.some((field) => field.includes(query.trim()))),
      ),
    [certsList, category, provider, query],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">دليل الشهادات المجانية المعتمدة</h1>
      <p className="pill tone-neutral mt-3">
        آخر فحص للروابط: {formatDate(lastLinkCheck)}
      </p>
      <p className="text-muted-foreground mt-2 text-sm leading-7">
        {certsList.length} شهادة مجانية من جهات عالمية موثوقة، مصنّفة حسب المجال، مع نبذة عن كل
        دورة والتخصصات التي تستفيد منها ورابط التسجيل المباشر.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          aria-label="ابحث باسم الدورة أو التخصص"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث باسم الدورة أو التخصص"
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        />
        <select
          aria-label="تصفية حسب المجال"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        >
          <option value="الكل">كل المجالات</option>
          {certificationCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          aria-label="تصفية حسب الجهة المانحة"
          value={provider}
          onChange={(event) => setProvider(event.target.value)}
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        >
          <option value="الكل">كل الجهات المانحة</option>
          {certificationProviders.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert) => (
          <div key={cert.id} className="card-surface card-hover flex flex-col p-5">
            <span className="pill tone-neutral self-start">
              {cert.category}
            </span>
            <h2 className="font-display mt-3 font-bold">{cert.title}</h2>
            <p className="text-muted-foreground mt-1 text-xs">الجهة المانحة: {cert.provider}</p>
            {brokenLinks.has(cert.id) && (
              <p className="tone-bad mt-2 rounded-xl px-3 py-2 text-xs leading-6">
                تنبيه: تعذّر الوصول إلى رابط هذه الدورة في آخر فحص ({brokenLinks.get(cert.id)}).
              </p>
            )}
            <p className="mt-3 flex-1 text-sm leading-7">{cert.summary}</p>
            <p className="bg-surface text-foreground mt-3 rounded-xl px-3 py-2 text-xs leading-6">
              <span className="font-bold">طريقة الحصول على الشهادة: </span>
              {cert.howToGet}
            </p>
            <p className="text-muted-foreground mt-3 text-xs leading-6">
              التخصصات المستفيدة: {cert.fields.join("، ")}
            </p>
            <a
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="text-brand-ink mt-3 text-sm break-all underline"
            >
              {cert.url}
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground mt-8 text-sm">لا توجد شهادات مطابقة لهذه التصفية.</p>
      )}
    </div>
  );
}
