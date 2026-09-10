import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الطلبة والمستقبل | نِسَب التشغيل والشهادات المجانية للتخصصات الأردنية" },
      {
        name: "description",
        content:
          "اعرف تصنيف تخصصك في سوق العمل الأردني وتقدير نسبة تشغيله، واحصل على مسار شهادات عالمية مجانية معتمدة يبني ميزتك التنافسية.",
      },
      { property: "og:title", content: "الطلبة والمستقبل | مستشار المسار الأكاديمي" },
      {
        property: "og:description",
        content: "تحليل التخصصات الأردنية ودليل شهادات مجانية معتمدة بروابط مباشرة.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const demanded = majors.filter((m) => m.classification === "مطلوب");
  const saturated = majors.filter((m) => m.classification === "مشبع");
  const stagnant = majors.filter((m) => m.classification === "راكد");

  return (
    <div>
      <section className="hero-surface text-primary-foreground border-border/50 border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="border-accent/40 text-accent pill border bg-white/5">
            مستشار المسار الأكاديمي والمهني · الأردن · 2026
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-3xl leading-snug font-extrabold sm:text-5xl">
            اعرف مستقبل تخصصك قبل أن تختاره
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/80">
            تحليل مبني على البيانات الرسمية لنِسَب التشغيل والتصنيف السوقي لكل تخصص في الجامعات
            الأردنية الحكومية والخاصة، مع مسار شهادات عالمية مجانية معتمدة يمنح طلبة التخصصات
            المشبعة والراكدة ميزة تنافسية حقيقية.
          </p>

          <form
            className="mt-9 flex max-w-xl flex-wrap gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md"
            onSubmit={(event) => {
              event.preventDefault();
              const text = query.trim();
              navigate({
                to: "/advisor",
                search: text ? { q: text } : {},
              });
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="اكتب اسم تخصصك… مثال: الصيدلة"
              className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-accent text-accent-foreground rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              اسأل المستشار
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="تخصصات مطلوبة" value={demanded.length} tone="tone-good" />
          <Stat label="تخصصات مشبعة" value={saturated.length} tone="tone-warn" />
          <Stat label="تخصصات راكدة" value={stagnant.length} tone="tone-bad" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <CardLink
            to="/majors"
            title="دليل التخصصات"
            body={`${majors.length} تخصصاً مع تقدير نسبة التشغيل ومستوى الخطر وخريطة الجامعات والاعتمادات.`}
            className="md:col-span-3 lg:col-span-1"
            featured
          />
          <CardLink
            to="/certifications"
            title="الشهادات المجانية المعتمدة"
            body={`${certifications.length} شهادة عالمية مجانية بروابط مباشرة، مصنّفة حسب المجال والجهة المانحة.`}
          />
          <CardLink
            to="/sources"
            title="المصادر الرسمية"
            body="الجهات التي تُبنى عليها التقديرات: ديوان الخدمة المدنية، الإحصاءات العامة، التعليم العالي، سجّل."
          />
        </div>

        <h2 className="font-display mt-14 text-xl font-bold">تخصصات يسأل عنها الطلبة كثيراً</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {majors.slice(0, 10).map((major) => (
            <Link
              key={major.slug}
              to="/majors/$slug"
              params={{ slug: major.slug }}
              className="border-border bg-card hover:border-brand hover:text-brand rounded-full border px-4 py-2 text-sm transition-colors"
            >
              {major.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="card-surface p-6">
      <p className={`pill ${tone}`}>{label}</p>
      <p className="font-display mt-3 text-4xl font-extrabold">{value}</p>
    </div>
  );
}

function CardLink({
  to,
  title,
  body,
  className,
  featured,
}: {
  to: string;
  title: string;
  body: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`card-surface card-hover flex flex-col justify-between p-6 ${className ?? ""}`}
    >
      <div>
        <h3 className={`font-display font-bold ${featured ? "text-2xl" : "text-lg"}`}>{title}</h3>
        <p className="text-muted-foreground mt-3 text-sm leading-7">{body}</p>
      </div>
      <span className="text-brand mt-5 text-sm font-bold">استعرض ←</span>
    </Link>
  );
}
