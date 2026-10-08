import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الطلاب والمستقبل | نِسَب التشغيل والشهادات المجانية للتخصصات الأردنية" },
      {
        name: "description",
        content:
          "اعرف تصنيف تخصصك في سوق العمل الأردني وتقدير نسبة تشغيله، واحصل على مسار شهادات عالمية مجانية معتمدة يبني ميزتك التنافسية.",
      },
      { property: "og:title", content: "الطلاب والمستقبل | مستشار المسار الأكاديمي" },
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
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-white/10 px-3.5 py-1 text-xs font-semibold text-brand backdrop-blur-md">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                مستشار المسار الأكاديمي والمهني · الأردن · 2026
              </div>
              <h1 className="font-display mt-5 max-w-3xl text-3xl leading-snug font-extrabold sm:text-5xl">
                اعرف مستقبل تخصصك قبل أن تختاره
              </h1>
              <p className="mt-5 max-w-2xl leading-8 text-white/85">
                تحليل مبني على البيانات الرسمية لنِسَب التشغيل والتصنيف السوقي لكل تخصص في الجامعات
                الأردنية الحكومية والخاصة، مع مسار شهادات عالمية مجانية معتمدة يمنح طلبة التخصصات
                المشبعة والراكدة ميزة تنافسية حقيقية.
              </p>

              <form
                className="mt-8 flex max-w-xl flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md shadow-lg"
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
                  aria-label="اكتب اسم تخصصك للسؤال عن مساره"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="اكتب اسم تخصصك… مثال: الصيدلة"
                  className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand text-brand-foreground rounded-xl px-6 py-3 text-sm font-bold shadow-[0_8px_24px_-6px_var(--brand)] transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  اسأل المستشار
                </button>
              </form>
            </div>

            <div className="relative flex shrink-0 items-center justify-center self-center md:self-auto">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand to-secondary opacity-35 blur-2xl animate-pulse" />
              <img
                src="/logo.png"
                alt="شعار منصة الطلاب والمستقبل"
                width={512}
                height={512}
                className="relative size-36 sm:size-48 object-contain rounded-2xl drop-shadow-[0_12px_32px_rgba(56,189,248,0.35)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="تخصصات مطلوبة" value={demanded.length} tone="tone-good" />
          <Stat label="تخصصات مشبعة" value={saturated.length} tone="tone-warn" />
          <Stat label="تخصصات راكدة" value={stagnant.length} tone="tone-bad" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardLink
            to="/majors"
            title="دليل التخصصات"
            body={`${majors.length} تخصصاً مع تقدير نسبة التشغيل ومستوى الخطر وخريطة الجامعات والاعتمادات.`}
          />
          <CardLink
            to="/compare"
            title="مختبر المقارنة اللحظية"
            body="قارن جنباً إلى جنب بين أي تخصصين لمعرفة فوارق الطلب والأتمتة والاعتمادات الرسمية."
            featured
          />
          <CardLink
            to="/certifications"
            title="دورات مجانية معتمدة"
            body={`${certifications.length} دورة تدريبية مجانية مقسمة في 13 قطاعاً أكاديمياً بروابط مباشرة وطريقة الحصول عليها.`}
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
              className="border-border bg-card hover:border-brand hover:text-brand-ink rounded-full border px-4 py-2 text-sm transition-colors"
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
        <h2 className={`font-display font-bold ${featured ? "text-2xl" : "text-lg"}`}>{title}</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-7">{body}</p>
      </div>
      <span className="text-brand-ink mt-5 text-sm font-bold">استعرض ←</span>
    </Link>
  );
}
