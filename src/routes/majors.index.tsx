import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";

import { majorFields, majors, type MarketClassification } from "@/data/majors";

export const Route = createFileRoute("/majors/")({
  head: () => ({
    meta: [
      { title: "دليل التخصصات الأردنية | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "تصنيف التخصصات في سوق العمل الأردني بين مطلوب ومشبع وراكد، مع تقدير نسبة التشغيل ومستوى الخطر لكل تخصص.",
      },
      { property: "og:title", content: "دليل التخصصات الأردنية" },
      {
        property: "og:description",
        content: "نسب التشغيل ومستوى الخطر لكل تخصص في الجامعات الأردنية.",
      },
    ],
  }),
  component: MajorsIndex,
});

const classifications: MarketClassification[] = ["مطلوب", "مشبع", "راكد"];

export function classificationBadge(value: string) {
  if (value === "مطلوب") return "tone-good";
  if (value === "مشبع") return "tone-warn";
  return "tone-bad";
}

export function riskBadge(value: string) {
  if (value === "منخفض") return "tone-good";
  if (value === "متوسط") return "tone-warn";
  return "tone-bad";
}

function normalizeArabic(text: string): string {
  return text
    .toLowerCase()
    .replace(/[أإآء]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, "")
    .trim();
}

const SEARCH_ALIASES: Record<string, string[]> = {
  cs: ["computer-science", "software-engineering"],
  ai: ["data-science-ai"],
  se: ["software-engineering"],
  it: ["computer-science", "cybersecurity", "mis"],
  ux: ["digital-media-design"],
  ui: ["digital-media-design"],
  fintech: ["fintech"],
  doc: ["medicine", "dentistry"],
  doctor: ["medicine"],
};

function MajorsIndex() {
  const [classification, setClassification] = useState<string>("الكل");
  const [field, setField] = useState<string>("الكل");
  const [query, setQuery] = useState("");
  const [majorsList, setMajorsList] = useState(majors);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("platform_custom_majors");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingSlugs = new Set(majors.map((m) => m.slug));
            const newOnly = parsed.filter((m: any) => !existingSlugs.has(m.slug));
            setMajorsList([...newOnly, ...majors]);
          }
        } catch (e) {}
      }
    }
  }, []);

  const filtered = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    const qNorm = normalizeArabic(rawQ);
    const matchedSlugsFromAlias = SEARCH_ALIASES[rawQ] || [];

    return majorsList.filter((major) => {
      const matchClassification = classification === "الكل" || major.classification === classification;
      const matchField = field === "الكل" || major.field === field;

      if (!matchClassification || !matchField) return false;
      if (!rawQ) return true;

      if (matchedSlugsFromAlias.includes(major.slug)) return true;

      const normName = normalizeArabic(major.name);
      const normField = normalizeArabic(major.field);
      const normSummary = normalizeArabic(major.summary);
      const normTitles = (major.jobTitles || []).map(normalizeArabic).join(" ");

      return (
        normName.includes(qNorm) ||
        normField.includes(qNorm) ||
        normSummary.includes(qNorm) ||
        normTitles.includes(qNorm)
      );
    });
  }, [majorsList, classification, field, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">دليل التخصصات</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-7">
        {majorsList.length} تخصصاً مع تقدير نسبة التشغيل خلال أول سنتين بعد التخرج، ومستوى الخطر،
        والتصنيف الرسمي في سوق العمل الأردني.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          aria-label="ابحث باسم التخصص"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث باسم التخصص"
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        />
        <select
          aria-label="تصفية حسب التصنيف في سوق العمل"
          value={classification}
          onChange={(event) => setClassification(event.target.value)}
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        >
          <option value="الكل">كل التصنيفات</option>
          {classifications.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          aria-label="تصفية حسب المجال"
          value={field}
          onChange={(event) => setField(event.target.value)}
          className="border-border bg-card focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
        >
          <option value="الكل">كل المجالات</option>
          {majorFields.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((major) => (
          <Link
            key={major.slug}
            to="/majors/$slug"
            params={{ slug: major.slug }}
            className="card-surface card-hover flex flex-col p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`pill ${classificationBadge(major.classification)}`}
              >
                {major.classification}
              </span>
              <span
                className={`pill ${riskBadge(major.risk)}`}
              >
                الخطر: {major.risk}
              </span>
              {major.remoteWorkIndex && major.remoteWorkIndex.includes("عالي") && (
                <span className="pill tone-good">
                  عمل عن بُعد {major.remoteWorkIndex}
                </span>
              )}
            </div>
            <h2 className="font-display mt-3 text-lg font-bold">{major.name}</h2>
            <p className="text-muted-foreground mt-1 text-xs">{major.field}</p>
            <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-7">
              {major.summary}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
              <span className="font-bold">
                التشغيل: <span className="text-brand-ink">{major.employmentRate}</span>
              </span>
              {major.salary && (
                <span className="text-muted-foreground font-semibold">
                  متوسط البداية: <strong className="text-foreground">{major.salary.entryAvg} د.أ</strong>
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground mt-8 text-sm">لا توجد تخصصات مطابقة لهذه التصفية.</p>
      )}
    </div>
  );
}
