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
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm text-accent">مستشار المسار الأكاديمي والمهني · الأردن</p>
          <h1 className="font-display mt-3 text-3xl leading-snug font-extrabold sm:text-4xl">
            اعرف مستقبل تخصصك قبل أن تختاره
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-primary-foreground/85">
            تحليل مبني على البيانات الرسمية لنِسَب التشغيل والتصنيف السوقي لكل تخصص في الجامعات
            الأردنية الحكومية والخاصة، مع مسار شهادات عالمية مجانية معتمدة يمنح طلبة التخصصات
            المشبعة والراكدة ميزة تنافسية حقيقية.
          </p>

          <form
            className="mt-8 flex max-w-xl flex-wrap gap-2"
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
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <button
              type="submit"
              className="bg-accent text-accent-foreground rounded-md px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            >
              اسأل المستشار
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="تخصصات مطلوبة" value={demanded.length} tone="good" />
          <Stat label="تخصصات مشبعة" value={saturated.length} tone="warn" />
          <Stat label="تخصصات راكدة" value={stagnant.length} tone="bad" />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <CardLink
            to="/majors"
            title="دليل التخصصات"
            body={`${majors.length} تخصصاً مع تقدير نسبة التشغيل ومستوى الخطر وخريطة الجامعات والاعتمادات.`}
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

        <h2 className="font-display mt-12 text-xl font-bold">تخصصات يسأل عنها الطلبة كثيراً</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {majors.slice(0, 10).map((major) => (
            <Link
              key={major.slug}
              to="/majors/$slug"
              params={{ slug: major.slug }}
              className="border-border bg-card hover:border-accent rounded-full border px-4 py-2 text-sm transition-colors"
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
  const colors: Record<string, string> = {
    good: "text-emerald-700",
    warn: "text-amber-700",
    bad: "text-rose-700",
  };
  return (
    <div className="border-border bg-card rounded-lg border p-5">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className={`font-display mt-1 text-3xl font-extrabold ${colors[tone]}`}>{value}</p>
    </div>
  );
}

function CardLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
      className="border-border bg-card hover:border-accent block rounded-lg border p-6 transition-colors"
    >
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-7">{body}</p>
    </Link>
  );
}
