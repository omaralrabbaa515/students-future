import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Scale,
  Sparkles,
  Bot,
  ArrowRightLeft,
  Building2,
  Award,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Briefcase,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

import { majors, type Major } from "@/data/majors";
import { certifications } from "@/data/certifications";
import {
  buildMetaTags,
  buildWebApplicationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: buildMetaTags({
      title: "مختبر المقارنة اللحظية بين التخصصات والجامعات الأردنية",
      description:
        "قارن لحظياً وجنباً إلى جنب بين أي تخصصين أو جامعتين في الأردن: نسب التشغيل، تصنيف ديوان الخدمة المدنية، أثر الذكاء الاصطناعي، تكاليف الساعات، والشهادات العالمية المجانية.",
      keywords:
        "مقارنة التخصصات، مقارنة الجامعات الأردنية، الفرق بين هندسة البرمجيات وعلوم الحاسوب، الأمن السيبراني ولا الذكاء الاصطناعي، الطب ولا الصيدلة، الطلاب والمستقبل",
      path: "/compare",
    }),
    links: [{ rel: "canonical", href: `${SITE_URL}/compare` }],
  }),
  component: ComparePage,
});

type Preset = {
  title: string;
  major1: string;
  major2: string;
};

const PRESETS: Preset[] = [
  {
    title: "علوم الحاسوب ⚡ هندسة البرمجيات",
    major1: "computer-science",
    major2: "software-engineering",
  },
  {
    title: "الأمن السيبراني ⚡ الذكاء الاصطناعي",
    major1: "cybersecurity",
    major2: "data-science-ai",
  },
  {
    title: "التمريض ⚡ الصيدلة",
    major1: "nursing",
    major2: "pharmacy",
  },
  {
    title: "المحاسبة ⚡ نظم المعلومات الإدارية",
    major1: "accounting",
    major2: "mis",
  },
  {
    title: "الهندسة المدنية ⚡ الهندسة الكهربائية",
    major1: "civil-engineering",
    major2: "electrical-engineering",
  },
];

function ComparePage() {
  const navigate = useNavigate();

  const [slug1, setSlug1] = useState<string>("computer-science");
  const [slug2, setSlug2] = useState<string>("software-engineering");
  const [slug3, setSlug3] = useState<string>(""); // optional 3rd major

  const major1 = useMemo(() => majors.find((m) => m.slug === slug1), [slug1]);
  const major2 = useMemo(() => majors.find((m) => m.slug === slug2), [slug2]);
  const major3 = useMemo(
    () => (slug3 ? majors.find((m) => m.slug === slug3) : null),
    [slug3],
  );

  const selectedMajors = useMemo(() => {
    return [major1, major2, major3].filter(Boolean) as Major[];
  }, [major1, major2, major3]);

  const handleSwap = () => {
    const temp = slug1;
    setSlug1(slug2);
    setSlug2(temp);
  };

  const handleApplyPreset = (p: Preset) => {
    setSlug1(p.major1);
    setSlug2(p.major2);
    setSlug3("");
  };

  const handleConsultAdvisor = () => {
    const names = selectedMajors.map((m) => m.name).join(" و ");
    navigate({
      to: "/advisor",
      search: {
        q: `أرغب بمقارنة تفصيلية واستشارة شخصية بين تخصصات: ${names}، أيهما أفضل لسوق العمل الأردني والإقليمي؟`,
      },
    });
  };

  const compareAppSchema = buildWebApplicationSchema(
    "مختبر المقارنة اللحظية بين التخصصات والجامعات الأردنية",
    "أداة مقارنة تفاعلية حية تتيح لطلبة الجامعات والتوجيهي مقارنة نسب التشغيل وتصنيف سوق العمل وأسعار الساعات جنباً إلى جنب.",
    "/compare",
  );
  const breadcrumbsSchema = buildBreadcrumbSchema([
    { name: "الرئيسية", path: "/" },
    { name: "مختبر المقارنة", path: "/compare" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-xs font-bold text-brand backdrop-blur-md">
          <Scale className="size-3.5" />
          <span>مختبر المقارنة اللحظية الشامل · الأردن 2026</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
          قارن بين التخصصات بدقة البيانات الرسمية
        </h1>
        <p className="text-sm text-muted-foreground leading-7">
          قارن جنباً إلى جنب بين أي تخصصين أو ثلاثة في الجامعات الأردنية: تعرّف على فوارق نِسَب التشغيل، مستوى الإشباع والركود، أثر الذكاء الاصطناعي، وخريطة الجامعات والاعتمادات.
        </p>
      </div>

      {/* Quick Comparison Presets */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-muted-foreground ml-2">مقارنات شائعة:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.title}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="rounded-full border border-border bg-card hover:border-brand hover:text-brand px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer shadow-xs"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Selectors Bar */}
      <div className="card-surface mt-8 p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-12 items-center">
          <div className="sm:col-span-5">
            <label className="block text-sm font-bold text-foreground mb-2">
              التخصص الأول
            </label>
            <select
              value={slug1}
              onChange={(e) => setSlug1(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-base font-bold text-foreground focus:border-brand focus:outline-none shadow-xs transition-colors"
            >
              {majors.map((m) => (
                <option key={m.slug} value={m.slug} disabled={m.slug === slug2 || m.slug === slug3}>
                  {m.name} ({m.classification})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              title="تبديل التخصصين"
              aria-label="تبديل التخصصين"
              className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground hover:bg-secondary hover:text-brand transition-colors cursor-pointer shadow-xs"
            >
              <ArrowRightLeft className="size-5" />
            </button>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-sm font-bold text-foreground mb-2">
              التخصص الثاني
            </label>
            <select
              value={slug2}
              onChange={(e) => setSlug2(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-base font-bold text-foreground focus:border-brand focus:outline-none shadow-xs transition-colors"
            >
              {majors.map((m) => (
                <option key={m.slug} value={m.slug} disabled={m.slug === slug1 || m.slug === slug3}>
                  {m.name} ({m.classification})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional 3rd Major Button */}
        <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {!slug3 ? (
            <button
              type="button"
              onClick={() => {
                const third = majors.find((m) => m.slug !== slug1 && m.slug !== slug2);
                if (third) setSlug3(third.slug);
              }}
              className="text-brand-ink hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer py-1"
            >
              <span>+ إضافة تخصص ثالث للمقارنة الثلاثية</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold">التخصص الثالث:</span>
              <select
                value={slug3}
                onChange={(e) => setSlug3(e.target.value)}
                className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground focus:border-brand"
              >
                {majors.map((m) => (
                  <option key={m.slug} value={m.slug} disabled={m.slug === slug1 || m.slug === slug2}>
                    {m.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setSlug3("")}
                className="text-danger hover:underline ml-2 font-semibold"
              >
                إلغاء التخصص الثالث
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleConsultAdvisor}
            className="inline-flex items-center gap-2 rounded-xl bg-brand text-brand-foreground px-5 py-2.5 text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition-transform hover:-translate-y-0.5 cursor-pointer ml-auto"
          >
            <Bot className="size-4" />
            <span>اسأل المستشار الذكي عن هذه المقارنة</span>
          </button>
        </div>
      </div>

      {/* Comparison Cards Matrix */}
      <div
        className={`mt-10 grid gap-6 sm:gap-8 ${
          selectedMajors.length === 3
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {selectedMajors.map((major, idx) => {
          const tone =
            major.classification === "مطلوب"
              ? "tone-good"
              : major.classification === "مشبع"
                ? "tone-warn"
                : "tone-bad";

          return (
            <div
              key={major.slug}
              className="card-surface flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm relative overflow-hidden transition-all hover:border-brand/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <span className="text-sm font-bold text-brand">
                    الخيار {idx + 1} · {major.field}
                  </span>
                  <span className={`pill ${tone} text-xs font-semibold`}>{major.classification}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-3">
                  {major.name}
                </h2>

                {/* Key Metrics Row */}
                <div className="mt-5 grid grid-cols-2 gap-3.5 text-center">
                  <div className="bg-surface-2 p-3.5 sm:p-4 rounded-2xl border border-border">
                    <p className="text-xs text-muted-foreground font-semibold">نسبة التشغيل التقديرية</p>
                    <p className="font-display text-xl sm:text-2xl font-black text-foreground mt-1">
                      {major.employmentRate}
                    </p>
                  </div>
                  <div className="bg-surface-2 p-3.5 sm:p-4 rounded-2xl border border-border">
                    <p className="text-xs text-muted-foreground font-semibold">مستوى الخطر بسوق العمل</p>
                    <p className="font-display text-xl sm:text-2xl font-black text-foreground mt-1">
                      {major.risk}
                    </p>
                  </div>
                </div>

                {/* Automation Exposure */}
                <div className="mt-4 rounded-2xl border border-border bg-card/60 p-4 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-foreground">
                      <Cpu className="size-4 text-brand" />
                      <span>أثر الأتمتة والذكاء الاصطناعي:</span>
                    </span>
                    <span className="font-extrabold text-brand">{major.automation.exposure}</span>
                  </div>
                  <p className="text-muted-foreground leading-6">{major.automation.note}</p>
                </div>

                {/* Accreditation & Universities Summary */}
                <div className="mt-4 rounded-2xl border border-border bg-card/60 p-4 text-xs sm:text-sm space-y-1.5">
                  <span className="font-bold flex items-center gap-1.5 text-foreground">
                    <Building2 className="size-4 text-secondary" />
                    <span>خريطة الجامعات والاعتمادات:</span>
                  </span>
                  <p className="text-muted-foreground leading-6">
                    يُطرح في الجامعات الحكومية والخاصة مع متطلبات اعتماد هيئة التعليم العالي
                    {major.field.includes("الهندسة") || major.field.includes("تكنولوجيا")
                      ? "، واعتمادات ABET في كليات الهندسة وتكنولوجيا المعلومات."
                      : "، ومطابقة معايير الاعتماد البرامجي والنقابي الأردني."}
                  </p>
                </div>

                {/* Smart Alternatives if Saturated or Stagnant */}
                {major.alternatives && major.alternatives.length > 0 && (
                  <div className="mt-4 rounded-xl border border-accent/25 bg-accent/5 p-3.5 text-xs space-y-2">
                    <span className="font-bold flex items-center gap-1.5 text-accent">
                      <Sparkles className="size-3.5" />
                      <span>بدائل أكاديمية ذات طلب أعلى:</span>
                    </span>
                    <div className="space-y-1">
                      {major.alternatives.map((alt) => (
                        <p key={alt.name} className="text-muted-foreground">
                          • <strong className="text-foreground">{alt.name}:</strong> {alt.reason}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                <Link
                  to="/majors/$slug"
                  params={{ slug: major.slug }}
                  className="text-xs font-bold text-brand-ink hover:underline"
                >
                  التفاصيل الكاملة للتخصص ←
                </Link>

                <Link
                  to="/advisor"
                  search={{ q: `حلل لي تخصص ${major.name} مقارنة بسوق العمل الأردني` }}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground bg-surface-2 px-2.5 py-1.5 rounded-lg border border-border"
                >
                  <Bot className="size-3" />
                  <span>اسأل المستشار</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Free Certifications Bridging Section */}
      <div className="mt-12 card-surface p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="pill text-xs bg-secondary/15 text-secondary border border-secondary/30">
              معزز التنافسية لجميع التخصصات
            </span>
            <h2 className="font-display text-xl font-extrabold text-foreground mt-2">
              دورات مجانية معتمدة تمنحك تفوقاً مهما كان تخصصك
            </h2>
            <p className="text-xs text-muted-foreground mt-1 leading-6">
              طلبة التخصصات المشبعة أو الراكدة يستطيعون جسر فجوة التوظيف عبر إضافة دورات تدريبية معتمدة مجاناً إلى سيرتهم الذاتية.
            </p>
          </div>

          <Link
            to="/certifications"
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand bg-brand/10 text-brand px-4 py-2.5 text-xs font-bold hover:bg-brand/20 transition-colors shrink-0"
          >
            <span>استعراض كافة الدورات المجانية</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
