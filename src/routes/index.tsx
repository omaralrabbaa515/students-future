import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Compass,
  Sparkles,
  Bot,
  GraduationCap,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowLeft,
  Building2,
  ExternalLink,
  Newspaper,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";
import { INITIAL_MAGAZINE_ARTICLES } from "@/data/magazine";
import { SECTOR_SALARY_BENCHMARKS } from "@/data/official-market-stats";
import { universities } from "@/data/universities";
import { buildMetaTags, buildFaqSchema, SITE_URL } from "@/lib/seo";

const HOME_FAQS = [
  {
    question: "ما هي منصة «الطلاب والمستقبل» الأردنية؟",
    answer:
      "منصة «الطلاب والمستقبل» هي المنظومة الوطنية الذكية للتوجيه الأكاديمي والمهني ومواءمة التعليم مع سوق العمل الأردني 2026 بإعداد الطالب عمر معن الرباع، توفر تحليلاً رسمياً لـ 121 تخصصاً جامعياً، واستكشاف 19 جامعة أردنية حكومية وخاصة، و215+ دورة وشهادة مجانية معتمدة مع مستشار ذكاء اصطناعي تفاعلي.",
  },
  {
    question: "كيف أعرف التخصصات الراكدة والمشبعة في سوق العمل وديوان الخدمة المدنية؟",
    answer:
      "توفر المنصة مصفوفة دقيقة مصنفة حسب دراسات ديوان الخدمة المدنية ووزارة التعليم العالي تبيّن التخصصات المطلوبة والمشبعة والراكدة، مع إحصاءات مخزون الطلبات، نسب الاستيعاب السنوية، والبدائل المعتمدة ذات الأمان الوظيفي العالي.",
  },
  {
    question: "كيف أختار تخصصي الجامعي بعد نتائج التوجيهي عبر منصة الطلاب والمستقبل؟",
    answer:
      "يمكنك استخدام أدلة المنصة أو الجولة الاسترشادية التفاعلية أو محاورة 'المستشار الذكي'؛ حيث تُدخل معدلك ليفحص النظام فوراً فرص قبولك في التخصصات الجامعية ويقترح عليك البدائل الأكثر طلباً في سوق العمل.",
  },
  {
    question: "ما هي التخصصات الأكثر طلباً في سوق العمل الأردني والخليجي لعام 2026؟",
    answer:
      "تتصدر تخصصات: الأمن السيبراني، الذكاء الاصطناعي وعلم البيانات، هندسة البرمجيات، التمريض القانوني، تكنولوجيا الأشعة والتخدير، التكنولوجيا المالية (FinTech)، والتسويق الرقمي وسلاسل الإمداد قوائم التوظيف الأعلى طلباً وأجراً.",
  },
  {
    question: "هل توفر المنصة دورات وشهادات تدريبية مجانية معتمدة للطلبة؟",
    answer:
      "نعم، توفر المنصة بنك شهادات يضم أكثر من 215 دورة وشهادة مهنية مجانية معتمدة من منصات دولية وعربية معتمدة (Alison, Saylor Academy, HP LIFE, إدراك, معارف, زادي, OpenLearn) مع روابط مباشرة وطريقة الحصول عليها مجاناً لتعزيز السيرة الذاتية.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildMetaTags({
      title: "منصة الطلاب والمستقبل | التوجيه الأكاديمي والمهني وسوق العمل الأردني 2026",
      description:
        "منصة «الطلاب والمستقبل» - المنظومة الوطنية الذكية للتوجيه الأكاديمي والمهني: تحليل نسب تشغيل التخصصات، استكشاف الجامعات الأردنية الحكومية والخاصة، ومستشار ذكاء اصطناعي تفاعلي مع 215+ دورة مجانية معتمدة.",
      keywords:
        "الطلاب والمستقبل، منصة الطلاب والمستقبل، التوجيه الأكاديمي الأردن، تخصصات التوجيهي 2026، معدلات القبول الموحد، التخصصات الراكدة، ديوان الخدمة المدنية، استكشاف الجامعات الأردنية، عمر معن الرباع",
      path: "/",
    }),
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
  }),
  component: Home,
});

type TourStageItem = {
  step: string;
  id: string;
  title: string;
  desc: string;
  icon: typeof Compass;
  color: string;
  hidden?: boolean;
};

// Interactive Tour Navigation (Stage 5 deleted, Stage 6 hidden per user request)
const TOUR_STAGES: TourStageItem[] = [
  {
    step: "01",
    id: "stage-matching",
    title: "المطابقة الذكية للمعدل",
    desc: "محاكي تفاعلي حي يطابق معدلك مع الحدود الدنيا في الجامعات الأردنية",
    icon: Compass,
    color: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    step: "02",
    id: "stage-advisor",
    title: "المستشار الذكي والبث المباشر",
    desc: "محرك ذكاء اصطناعي محلي فائق السرعة يجيبك ببيانات موثوقة بنسبة جهوزية 100%",
    icon: Bot,
    color: "from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    step: "03",
    id: "stage-market",
    title: "تقرير ديوان الخدمة وسجّل",
    desc: "بيانات واقع العرض والطلب: التخصصات المطلوبة والراكدة والمشبعة والرواتب",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    step: "04",
    id: "stage-certs",
    title: "بنك الدورات والشهادات المجانية",
    desc: "215 دورة وشهادة مجانية معتمدة في 13 قطاعاً أكاديمياً",
    icon: Award,
    color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    step: "06",
    id: "stage-magazine",
    title: "المجلة الخبيرية الأكاديمية",
    desc: "مقالات ودراسات حصرية بأقلام كبار المرشدين الأكاديميين وخبراء التوظيف",
    icon: Newspaper,
    color: "from-cyan-500/20 to-sky-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    hidden: true,
  },
  {
    step: "05",
    id: "stage-universities",
    title: "استكشاف الجامعات الأردنية",
    desc: "استكشف الجامعات الحكومية والخاصة ومناطقها وما يميز كل جامعة عن الأخرى",
    icon: Building2,
    color: "from-violet-500/20 to-purple-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
  },
];

const VISIBLE_TOUR_STAGES = TOUR_STAGES.filter((s) => !s.hidden);

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTourStageId, setActiveTourStageId] = useState<string>("stage-matching");

  // Tour Stage 1: Simulator GPA (secondary branches removed per user request)
  const [simGpa, setSimGpa] = useState<number>(85.5);

  // Tour Stage 2: AI Simulator Prompts
  const [selectedAiPromptIdx, setSelectedAiPromptIdx] = useState(0);
  const AI_SIM_PROMPTS = [
    {
      q: "معدلي 85% في التوجيهي، ما هي أفضل التخصصات المتاحة لي ذات المستقبل الواعد؟",
      answer:
        "وفقاً للحدود الدنيا في القبول الموحد لعام 2024/2025 وسوق العمل الأردني، معدل 85% يؤهلك تنافسياً لتخصصات واعدة جداً مثل: 1) الأمن السيبراني في اليرموك أو البلقاء، 2) علوم البيانات والذكاء الاصطناعي في الهاشمية، 3) التمريض في العلوم والتكنولوجيا، 4) هندسة البرمجيات بالبرنامج الموازي، وجميعها تسجل نسب تشغيل بين 75% و 90% مع متوسط رواتب بداية تفوق 600 دينار.",
      badges: ["معدل التوجيهي", "أمن سيبراني", "قبول موحد"],
    },
    {
      q: "هل الهندسة المدنية والمعمارية راكدة فعلاً في ديوان الخدمة المدنية؟",
      answer:
        "نعم، مصنفة رسمياً في التقرير السنوي الصادر عن هيئة الخدمة والإدارة العامة (ديوان الخدمة سابقاً) كـ 'تخصص راكد' للإناث والذكور في الجهاز الحكومي بانتظار يفوق 10 سنوات وتراكم آلاف الطلبات. لكن إذا كنت تحب الهندسة، فإن دراستها مع احتراف برمجيات النمذجة (BIM) وإدارة المشاريع (PMP) واللغة الإنجليزية يفتح لك سوق المقاولات والشركات الاستشارية في دول الخليج برواتب مجزية.",
      badges: ["هندسة", "ديوان الخدمة", "سوق الخليج"],
    },
    {
      q: "كيف أحصل على دخل بالدولار من الأردن أثناء دراستي الجامعية؟",
      answer:
        "المسار الأسرع يبدأ باختيار مهارة رقمية محددة (مثل: تحليل البيانات، برمجة بايثون، أو تطوير واجهات الويب)، وإكمال شهادة معتمدة مجانية من المنصات المتوفرة على منصتنا (مثل Alison و Saylor Academy و HP LIFE وإدراك). ثم إنشاء حساب على منصات العمل الحر وبناء سابقة أعمال تجريبية. متوسط دخل الخريج الماهر عن بُعد يتراوح بين 600 إلى 2000 دولار شهرياً.",
      badges: ["فريلانس", "شهادات مجانية", "عمل عن بعد"],
    },
  ];

  // Tour Stage 4: Only providers that actually have courses in the platform
  const activeProvidersWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of certifications) {
      counts.set(c.provider, (counts.get(c.provider) || 0) + 1);
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count > 0)
      .map(([provider, count]) => ({ provider, count }));
  }, []);

  const [selectedCertProvider, setSelectedCertProvider] = useState<string>("الكل");

  const filteredStageCerts = useMemo(() => {
    if (selectedCertProvider === "الكل") {
      return certifications;
    }
    return certifications.filter((c) => c.provider === selectedCertProvider);
  }, [selectedCertProvider]);

  // Tour Stage Universities filter (حكومية / خاصة / الكل)
  const [uniStageFilter, setUniStageFilter] = useState<"الكل" | "حكومية" | "خاصة">("الكل");

  const filteredStageUniversities = useMemo(() => {
    if (uniStageFilter === "الكل") return universities;
    if (uniStageFilter === "حكومية") {
      return universities.filter(
        (u) => u.type === "حكومية" || u.type === "حكومية بنموذج دولي"
      );
    }
    return universities.filter((u) => u.type === "خاصة");
  }, [uniStageFilter]);

  const demanded = majors.filter((m) => m.classification === "مطلوب");
  const saturated = majors.filter((m) => m.classification === "مشبع");
  const stagnant = majors.filter((m) => m.classification === "راكد");

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(HOME_FAQS)) }}
      />
      {/* ================= 1. HERO SECTION ================= */}
      <section className="hero-surface text-primary-foreground border-border/50 border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                <span className="text-white">مستشار المسار الأكاديمي والمهني · الأردن · 2026</span>
              </div>
              <h1 className="font-display mt-5 max-w-3xl text-3xl leading-snug font-extrabold sm:text-5xl text-white">
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

      {/* ================= 2. PLATFORM GUIDES & VITAL STATS (أدلة المنصة في الأعلى) ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-b border-border">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="تخصصات مطلوبة" value={demanded.length} tone="tone-good" />
          <Stat label="تخصصات مشبعة" value={saturated.length} tone="tone-warn" />
          <Stat label="تخصصات راكدة" value={stagnant.length} tone="tone-bad" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <CardLink
            to="/majors"
            title="دليل التخصصات"
            body={`${majors.length} تخصصاً مع تقدير نسبة التشغيل ومستوى الخطر وخريطة الجامعات والاعتمادات.`}
          />
          <CardLink
            to="/universities"
            title="استكشاف الجامعات"
            body={`${universities.length} جامعة حكومية وخاصة مع ما يميز كل جامعة ومناطقها الجغرافية وكلياتها الرائدة.`}
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
            body="34 مصدراً رسمياً موثقاً من بينها ديوان الخدمة، التعليم العالي، الإحصاءات العامة، وسجّل."
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

      {/* ================= 3. THE GUIDED TOUR STAGES (المحطات الاسترشادية في الأسفل) ================= */}
      <section className="py-20 bg-surface/40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="size-3.5" />
              الجولة الاسترشادية الشاملة بالمنصة
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
              محطات تفاعلية تأخذك من حيرة التوجيهي إلى أول وظيفة
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              استكشف قدرات المنصة خطوة بخطوة من خلال محاكيات حية ومباشرة تربط خياراتك بالأرقام ونسب التشغيل والجامعات المعتمدة.
            </p>
          </div>

          {/* Tour Stage Tabs Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
            {VISIBLE_TOUR_STAGES.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeTourStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveTourStageId(stage.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-card border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02]"
                      : "bg-surface/60 border-border hover:bg-card text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <span className="font-mono text-xs font-bold opacity-60">محطة {stage.step}</span>
                    <Icon className={`size-4 sm:size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-bold text-[11px] sm:text-xs block line-clamp-2 ${isActive ? "text-foreground" : ""}`}>
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tour Stage Interactive Showcase */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl transition-all">
            {/* STAGE 1: Smart GPA Matching (Secondary branches removed) */}
            {activeTourStageId === "stage-matching" && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Compass className="size-3.5" />
                    المحطة الأولى: المطابقة الذكية الحية للمعدل
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    حرّك شريط المعدل واكتشف ما تقبله كليات الأردن في ثوانٍ
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    تقوم خوارزمية المنصة بعزل التخصصات والجامعات المطابقة لمعدلك في التوجيهي فورياً،
                    وتقارنها مع الحدود الدنيا المعتمدة في وحدة تنسيق القبول الموحد.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>فحص توافق معدلك مع متطلبات وشروط التعليم العالي.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>مقارنة الحدود الدنيا التنافسية لآخر الأعوام الأكاديمية.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>إظهار الخيارات المتاحة في البرنامج التنافسي والموازي والجامعات الخاصة.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/advisor"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>اسأل المستشار عن خيارات معدلك</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Interactive Live GPA Simulator Card (without secondary branches) */}
                <div className="bg-surface-2 p-6 rounded-2xl border border-border space-y-4 shadow-sm">
                  {/* GPA Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-foreground">معدلك في التوجيهي:</span>
                      <span className="font-mono text-base font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
                        {simGpa.toFixed(1)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="65"
                      max="99.5"
                      step="0.1"
                      value={simGpa}
                      onChange={(e) => setSimGpa(parseFloat(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>الحد الأدنى للقبول (65%)</span>
                      <span>امتياز (99.5%)</span>
                    </div>
                  </div>

                  {/* Reactive Matches Preview */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-[11px] font-bold text-muted-foreground block">
                      التوافق الفوري وفق هذا المعدل ({simGpa.toFixed(1)}%):
                    </span>

                    {/* Major 1: AI */}
                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">الذكاء الاصطناعي وعلم البيانات</span>
                        <span className="text-[10px] text-muted-foreground">الجامعة الأردنية والتكنولوجيا والهاشمية</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          simGpa >= 88.0
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : simGpa >= 83.0
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {simGpa >= 88.0
                          ? "متاح تنافسي ✓"
                          : simGpa >= 83.0
                            ? "متاح موازي / أقاليم"
                            : "يتطلب رفع المعدل"}
                      </span>
                    </div>

                    {/* Major 2: Cybersecurity */}
                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">الأمن السيبراني والشبكات</span>
                        <span className="text-[10px] text-muted-foreground">جامعة اليرموك والبلقاء التطبيقية</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          simGpa >= 82.5
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : simGpa >= 78.0
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {simGpa >= 82.5
                          ? "متاح تنافسي ✓"
                          : simGpa >= 78.0
                            ? "متاح موازي / أقاليم"
                            : "يتطلب رفع المعدل"}
                      </span>
                    </div>

                    {/* Major 3: Nursing */}
                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">التمريض القانوني</span>
                        <span className="text-[10px] text-muted-foreground">الجامعة الهاشمية وجامعة مؤتة</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          simGpa >= 78.0
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : simGpa >= 72.0
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {simGpa >= 78.0
                          ? "متاح تنافسي ✓"
                          : simGpa >= 72.0
                            ? "متاح موازي / أقاليم"
                            : "يتطلب رفع المعدل"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: AI Advisor with Interactive Prompt Simulator */}
            {activeTourStageId === "stage-advisor" && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <Bot className="size-3.5" />
                    المحطة الثانية: المستشار الذكي 100% جهوزية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    استشر خبيراً مدرباً على أرقام ديوان الخدمة وسوق العمل الأردني
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    يعمل المستشار الذكي بنظام استجابة سريع ودقيق يركز على تخصصك والجامعات المتاحة دون تشتيت،
                    مسترشداً ببيانات ديوان الخدمة وسجّل ومنهاج القبول الموحد.
                  </p>

                  {/* Clickable Prompt Chips */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground block">
                      جرّب الضغط على أي سؤال للاستجابة الحية:
                    </span>
                    <div className="flex flex-col gap-2">
                      {AI_SIM_PROMPTS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAiPromptIdx(idx)}
                          className={`p-2.5 rounded-xl text-right text-xs transition-all border cursor-pointer ${
                            selectedAiPromptIdx === idx
                              ? "bg-primary/10 border-primary text-primary font-bold shadow-xs"
                              : "bg-surface border-border text-foreground hover:bg-card"
                          }`}
                        >
                          <span className="line-clamp-1">{p.q}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/advisor"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>تحدث مع المستشار الذكي الآن</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AI Chat Stream Simulation Box */}
                <div className="bg-surface-2 p-5 rounded-2xl border border-border font-sans space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Bot className="size-4 text-primary" />
                      <span className="text-xs font-bold text-foreground">بث حي من المستشار الأكاديمي:</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">
                      جاهز 100% · استجابة سريعة
                    </span>
                  </div>

                  {/* Student Question Balloon */}
                  <div className="p-3 rounded-xl bg-primary/10 text-primary text-xs leading-relaxed font-semibold">
                    طالب: &quot;{AI_SIM_PROMPTS[selectedAiPromptIdx].q}&quot;
                  </div>

                  {/* AI Response Balloon */}
                  <div className="p-4 rounded-xl bg-card border border-border text-xs leading-relaxed text-foreground space-y-2.5">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="size-3.5" />
                      <span>تقرير المستشار الأكاديمي الموثق بالأرقام:</span>
                    </div>
                    <p className="text-muted-foreground leading-6">
                      {AI_SIM_PROMPTS[selectedAiPromptIdx].answer}
                    </p>
                    <div className="pt-2 border-t border-border/60 flex flex-wrap gap-1.5">
                      {AI_SIM_PROMPTS[selectedAiPromptIdx].badges.map((b) => (
                        <span
                          key={b}
                          className="text-[10px] bg-surface text-muted-foreground px-2 py-0.5 rounded-md border border-border"
                        >
                          #{b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: Market Data & Salaries */}
            {activeTourStageId === "stage-market" && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <TrendingUp className="size-3.5" />
                    المحطة الثالثة: الشفافية ومؤشرات السوق
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    لا تدرس تخصصاً وتتفاجأ بأنه راكد منذ سنوات
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    تحليل كامل لـ {majors.length} تخصصاً أردنياً يشمل: معدلات التعيين السنوي في ديوان الخدمة، فترات الانتظار بالأشهر،
                    مؤشر العمل عن بُعد، والطلب في المملكة العربية السعودية والإمارات وقطر.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                      {demanded.length} تخصصاً مطلوباً
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg">
                      {saturated.length} تخصصاً مشبعاً
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg">
                      {stagnant.length} تخصصاً راكداً
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/majors"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>تصفح دليل التخصصات الكامل ({majors.length} تخصصاً)</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Market Benchmark Simulation with Sector Tabs */}
                <div className="bg-surface-2 p-5 rounded-2xl border border-border space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">
                      مقارنة الرواتب وفترات الانتظار (بيانات سجّل والضمان):
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {SECTOR_SALARY_BENCHMARKS.map((sec, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-foreground block">{sec.sector}</span>
                          <span className="text-[10px] text-muted-foreground">
                            فترة الانتظار التقريبية: {sec.averageWaitTimeMonths} شهراً · العمل عن بُعد: {sec.remotePotential}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="font-mono font-bold text-primary block">
                            {sec.entrySalaryJOD} د.أ
                          </span>
                          <span className="text-[10px] text-muted-foreground">راتب البداية</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: Certifications (Only real providers with courses + fixed click handler & display) */}
            {activeTourStageId === "stage-certs" && (
              <div className="grid md:grid-cols-2 gap-8 items-start animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Award className="size-3.5" />
                    المحطة الرابعة: الشهادات والدورات العالمية المجانية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    تخرج من الجامعة ولديك شهادات عالمية معتمدة في سيرتك الذاتية
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    وفرنا دليلاً مباشراً لـ {certifications.length} دورة وشهادة مجانية 100% معتمدة من المنصات المعتمدة في المنصة (Alison, Saylor Academy, HP LIFE, إدراك, منصة معارف, منصة زادي, OpenLearn, FAO).
                    اضغط على أي جهة مانحة لاستعراض شهاداتها ودوراتها مباشرة.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>دورات Alison و Saylor Academy في التكنولوجيا والهندسة والعلوم واللغات.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>مسارات إدراك و HP LIFE في ريادة الأعمال والإدارة والمهارات المالية.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>دورات معارف وزادي والجامعة المفتوحة البريطانية (OpenLearn) بروابط مباشرة.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/certifications"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>استكشف بنك الدورات المجانية الكامل ({certifications.length} دورة)</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Certifications preview cards with working provider filter */}
                <div className="space-y-3 bg-surface-2 p-5 rounded-2xl border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      اختر الجهة المانحة لعرض شهاداتها ({filteredStageCerts.length} دورة):
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pb-2 border-b border-border">
                    <button
                      type="button"
                      onClick={() => setSelectedCertProvider("الكل")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCertProvider === "الكل"
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      الكل ({certifications.length})
                    </button>

                    {activeProvidersWithCounts.map(({ provider, count }) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => setSelectedCertProvider(provider)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCertProvider === provider
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-card border border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {provider} ({count})
                      </button>
                    ))}
                  </div>

                  {/* Courses List for Selected Provider */}
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pl-1">
                    {filteredStageCerts.slice(0, 6).map((cert) => (
                      <a
                        key={cert.id}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 block leading-relaxed">
                            {cert.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground block mt-1">
                            الجهة المانحة: <strong className="text-foreground">{cert.provider}</strong> · {cert.category}
                          </span>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <span>مجانية ✓</span>
                          <ExternalLink className="size-2.5" />
                        </span>
                      </a>
                    ))}
                  </div>

                  {filteredStageCerts.length > 6 && (
                    <div className="pt-2 text-center">
                      <Link
                        to="/certifications"
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>عرض جميع دورات {selectedCertProvider === "الكل" ? "المنصة" : selectedCertProvider} ({filteredStageCerts.length} دورة)</span>
                        <ArrowLeft className="size-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 6 (Hidden in tabs, kept in code if ever needed) */}
            {activeTourStageId === "stage-magazine" && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Newspaper className="size-3.5" />
                    المجلة الخبيرية الأكاديمية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    مقالات ودراسات حصرية من كبار مستشاري التوجيه في المملكة
                  </h3>
                </div>
                <div className="space-y-3">
                  {INITIAL_MAGAZINE_ARTICLES.slice(0, 2).map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-2xl bg-surface-2 border border-border block"
                    >
                      <span className="font-bold text-xs text-foreground block">{art.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE UNIVERSITIES: Jordanian Public & Private Universities Explorer */}
            {activeTourStageId === "stage-universities" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-2">
                      <Building2 className="size-3.5" />
                      دليل الجامعات الأردنية الحكومية والخاصة ({universities.length} جامعة)
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
                      استكشف الجامعات الحكومية والخاصة ومناطقها وما يميز كل جامعة عن الأخرى
                    </h3>
                  </div>

                  <Link
                    to="/universities"
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold inline-flex items-center gap-2 shadow-xs shrink-0 hover:opacity-90"
                  >
                    <span>استكشاف الجامعات</span>
                    <ArrowLeft className="size-3.5" />
                  </Link>
                </div>

                {/* Filter buttons inside stage for Public / Private */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { id: "الكل", label: `جميع الجامعات (${universities.length})` },
                        { id: "حكومية", label: "الجامعات الحكومية (10)" },
                        { id: "خاصة", label: "الجامعات الخاصة (9)" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setUniStageFilter(tab.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          uniStageFilter === tab.id
                            ? "bg-violet-600 text-white shadow-xs"
                            : "bg-surface-2 border border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-muted-foreground">
                    تغطية شاملة لأقاليم المملكة: الوسط · الشمال · الجنوب
                  </span>
                </div>

                {/* Universities Showcase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStageUniversities.slice(0, 6).map((uni) => (
                    <div
                      key={uni.id}
                      className="p-4 rounded-2xl bg-surface-2 border border-border hover:border-primary/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              uni.type === "خاصة"
                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {uni.type} · تأسست {uni.establishedYear}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3 text-primary" />
                            {uni.location.city} ({uni.location.region})
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-sm text-foreground mb-1">
                          {uni.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2.5">
                          {uni.overview}
                        </p>

                        {/* What distinguishes this university */}
                        <div className="p-2.5 rounded-xl bg-card border border-border mb-2.5">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            ✨ ما يميزها عن غيرها:
                          </span>
                          <p className="text-[11px] text-foreground line-clamp-2 leading-relaxed">
                            {uni.uniqueAdvantages[0]}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border/60">
                        <span className="text-[10px] font-bold text-muted-foreground block mb-1">
                          أبرز الكليات الرائدة:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {uni.flagshipColleges.slice(0, 3).map((col, mi) => (
                            <span
                              key={mi}
                              className="text-[10px] bg-card border border-border px-2 py-0.5 rounded-md text-foreground line-clamp-1"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/universities"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-bold text-xs"
                  >
                    <span>استعرض الدليل الكامل لجميع الجامعات الـ {universities.length} ومميزاتها التفصيلية</span>
                    <ArrowLeft className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
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
        <h2 className={`font-display font-bold ${featured ? "text-xl" : "text-lg"}`}>{title}</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-7">{body}</p>
      </div>
      <span className="text-brand-ink mt-5 text-sm font-bold">استعرض ←</span>
    </Link>
  );
}
