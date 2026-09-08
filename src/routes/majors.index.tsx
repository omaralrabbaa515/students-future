import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { majorFields, majors, type MarketClassification } from "@/data/majors";

export const Route = createFileRoute("/majors/")({
  head: () => ({
    meta: [
      { title: "دليل التخصصات الأردنية | الطلبة والمستقبل" },
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
  if (value === "مطلوب") return "bg-emerald-100 text-emerald-800";
  if (value === "مشبع") return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

export function riskBadge(value: string) {
  if (value === "منخفض") return "bg-emerald-100 text-emerald-800";
  if (value === "متوسط") return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

function MajorsIndex() {
  const [classification, setClassification] = useState<string>("الكل");
  const [field, setField] = useState<string>("الكل");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      majors.filter(
        (major) =>
          (classification === "الكل" || major.classification === classification) &&
          (field === "الكل" || major.field === field) &&
          (!query.trim() || major.name.includes(query.trim())),
      ),
    [classification, field, query],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-extrabold">دليل التخصصات</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-7">
        {majors.length} تخصصاً مع تقدير نسبة التشغيل خلال أول سنتين بعد التخرج، ومستوى الخطر،
        والتصنيف الرسمي في سوق العمل الأردني.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث باسم التخصص"
          className="border-border bg-card rounded-md border px-4 py-2 text-sm"
        />
        <select
          value={classification}
          onChange={(event) => setClassification(event.target.value)}
          className="border-border bg-card rounded-md border px-4 py-2 text-sm"
        >
          <option value="الكل">كل التصنيفات</option>
          {classifications.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={field}
          onChange={(event) => setField(event.target.value)}
          className="border-border bg-card rounded-md border px-4 py-2 text-sm"
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
            className="border-border bg-card hover:border-accent flex flex-col rounded-lg border p-5 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${classificationBadge(major.classification)}`}
              >
                {major.classification}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${riskBadge(major.risk)}`}
              >
                الخطر: {major.risk}
              </span>
            </div>
            <h2 className="font-display mt-3 text-lg font-bold">{major.name}</h2>
            <p className="text-muted-foreground mt-1 text-xs">{major.field}</p>
            <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-7">
              {major.summary}
            </p>
            <p className="mt-4 text-sm font-bold">
              تقدير التشغيل: <span className="text-primary">{major.employmentRate}</span>
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground mt-8 text-sm">لا توجد تخصصات مطابقة لهذه التصفية.</p>
      )}
    </div>
  );
}
