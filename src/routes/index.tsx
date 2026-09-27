import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Compass,
  Sparkles,
  Bot,
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  Search,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Layers,
  ShieldCheck,
  Building2,
  DollarSign,
  Laptop,
  Users,
  Briefcase,
  HelpCircle,
  ExternalLink,
  Zap,
  Flame,
  Globe,
  Newspaper,
  BookOpenCheck,
} from "lucide-react";

import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";
import { INITIAL_MAGAZINE_ARTICLES } from "@/data/magazine";
import { OFFICIAL_ADMISSIONS_DATA, SECTOR_SALARY_BENCHMARKS } from "@/data/official-market-stats";
import { AppLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "منصة الطلاب والمستقبل | دليلك الأكاديمي والمهني الشامل في الأردن",
      },
      {
        name: "description",
        content:
          "جولة تعريفية تفاعلية شاملة: اعرف مستقبل تخصصك ومعدلك، نِسَب التشغيل والركود الرسمية من ديوان الخدمة والتعليم العالي، والشهادات العالمية المجانية المعتمدة.",
      },
      {
        property: "og:title",
        content: "منصة الطلاب والمستقبل | مستشارك الأكاديمي وسوق العمل الأردني",
      },
      {
        property: "og:description",
        content: "تحليل معمق للتخصصات الأردنية، الشهادات العالمية المجانية، والمجلة الخبيرية المعتمدة.",
      },
    ],
  }),
  component: HomePageTour,
});

// Interactive 5-Stage Tour Navigation
const TOUR_STAGES = [
  {
    step: "01",
    id: "stage-matching",
    title: "المطابقة الذكية للمعدل والفرع",
    desc: "مطابقة فورية لمعدلك في التوجيهي مع الحدود الدنيا في 10 جامعات أردنية",
    icon: Compass,
    color: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    step: "02",
    id: "stage-advisor",
    title: "المستشار الذكي والبث المباشر",
    desc: "ذكاء اصطناعي محلي فائق السرعة يجيبك ببيانات موثوقة بنسبة جهوزية 100%",
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
    title: "بنك الشهادات العالمية المجانية",
    desc: "أكثر من 100 شهادة مجانية معتمدة من هارفارد (CS50)، غوغل، وIBM",
    icon: Award,
    color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    step: "05",
    id: "stage-magazine",
    title: "المجلة الخبيرية الأكاديمية",
    desc: "مقالات ودراسات حصرية بأقلام كبار المرشدين الأكاديميين وخبراء التوظيف",
    icon: Newspaper,
    color: "from-cyan-500/20 to-sky-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  },
];

const FAQS = [
  {
    q: "هل خدمات واستشارات منصة الطلاب والمستقبل مجانية بالكامل؟",
    a: "نعم، المنصة غير ربحية ومتاحة مجاناً بنسبة 100% لكافة طلبة المدارس والتوجيهي والجامعيين والخريجين في المملكة الأردنية الهاشمية، بما يشمل استشارات الذكاء الاصطناعي وروابط الشهادات العالمية.",
  },
  {
    q: "ما الفرق بين هذه المنصة وموقع وحدة تنسيق القبول الموحد؟",
    a: "وحدة تنسيق القبول الموحد مسؤولة عن تقديم طلبات الالتحاق بالجامعات الرسمية وفق الحدود الدنيا. منصتنا تمثل المستشار التوجيهي الذكي قبل وأثناء وبعد التقديم، حيث توضح لك نسب التشغيل، فترات الانتظار في ديوان الخدمة، سلم الرواتب في القطاع الخاص، إمكانية العمل عن بُعد، والبدائل المتاحة.",
  },
  {
    q: "هل شهادات هارفارد (CS50) وغوغل وIBM المعروضة مجانية حقاً؟",
    a: "نعم! جميع الشهادات المدرجة في قسم 'الشهادات المجانية' تم التحقق من روابطها الرسمية وتوفر مساراً تعليمياً كاملاً مع شهادة إتمام بدون أي رسوم مالية على الطالب الأردني.",
  },
  {
    q: "إذا كان تخصصي مصنفاً كـ 'راكد' أو 'مشبع'، هل يعني ذلك أنني لن أجد عملاً؟",
    a: "التصنيف يشير إلى واقع التعيين في الجهاز الحكومي والقطاع التقليدي. توفر منصتنا لكل تخصص راكد أو مشبع 'مسار تعويض الميزة التنافسية' من خلال شهادات رقمية ومهارات متقدمة تفتح لك أبواب العمل في القطاع الخاص والعمل الحر الدولي بالدولار.",
  },
  {
    q: "كيف تضمن المنصة صحة ودقة البيانات المعروضة؟",
    a: "تُبنى التقديرات على البيانات الرسمية المفتوحة والتقارير الدورية الصادرة عن هيئة الخدمة والإدارة العامة (ديوان الخدمة المدنية سابقاً)، دائرة الإحصاءات العامة، وزارة التعليم العالي والبحث العلمي، والمؤسسة العامة للضمان الاجتماعي، وتخضع لتدقيق الإدارة العليا للمنصة.",
  },
];

function HomePageTour() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTourStage, setActiveTourStage] = useState(0);

  // Quick Comparison State
  const [compMajor1Slug, setCompMajor1Slug] = useState("artificial-intelligence");
  const [compMajor2Slug, setCompMajor2Slug] = useState("civil-engineering");

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered majors for quick search
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return majors.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.field.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const major1 = majors.find((m) => m.slug === compMajor1Slug) || majors[0];
  const major2 = majors.find((m) => m.slug === compMajor2Slug) || majors[1];

  const demandedCount = majors.filter((m) => m.classification === "مطلوب").length;
  const saturatedCount = majors.filter((m) => m.classification === "مشبع").length;
  const stagnantCount = majors.filter((m) => m.classification === "راكد").length;

  return (
    <div className="bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* ================= 1. LUXURY HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-surface to-background pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Animated Glow Backdrop */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[130px] rounded-full pointer-events-none opacity-80" />
        <div className="absolute -top-10 end-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          {/* Royal Jordan Crest Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-card border border-border shadow-xs text-foreground mb-6">
            <AppLogo size={20} />
            <span>المنصة الأكاديمية والمهنية المعتمدة · المملكة الأردنية الهاشمية · 2026</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.2]">
            اعرف مستقبل تخصصك ومسارك المهني{" "}
            <span className="bg-gradient-to-l from-primary via-emerald-500 to-amber-500 bg-clip-text text-transparent">
              قبل أن تختار
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-6 text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            جولة استرشادية تفاعلية تربط معدلك في التوجيهي بنِسَب التشغيل والركود الموثقة في ديوان الخدمة وسجّل،
            مع خارطة شهادات عالمية مجانية معتمدة من هارفارد وغوغل تمنحك ميزة تنافسية حقيقية.
          </p>

          {/* Live Quick Major Search Box */}
          <div className="mt-10 max-w-2xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  void navigate({
                    to: "/advisor",
                    search: { q: searchQuery.trim() },
                  });
                }
              }}
              className="relative flex items-center p-2 rounded-3xl bg-card/90 backdrop-blur-xl border-2 border-primary/30 shadow-2xl focus-within:border-primary transition-all"
            >
              <div className="p-3 text-primary">
                <Search className="size-5" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أي تخصص أردني… (مثال: الذكاء الاصطناعي، الصيدلة، التمريض، الهندسة المدنية)"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none px-2"
              />

              <button
                type="submit"
                className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm shrink-0 cursor-pointer"
              >
                استشر الذكاء الاصطناعي
              </button>
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute inset-x-0 top-full mt-2 bg-card border border-border rounded-2xl p-2 shadow-2xl z-30 text-right space-y-1">
                {searchResults.map((m) => (
                  <Link
                    key={m.slug}
                    to="/majors/$slug"
                    params={{ slug: m.slug }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-surface transition-colors"
                  >
                    <div>
                      <span className="font-bold text-xs text-foreground block">{m.name}</span>
                      <span className="text-[10px] text-muted-foreground block">{m.field}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.classification === "مطلوب"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : m.classification === "مشبع"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {m.classification} · {m.employmentRate}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Popular Major Quick Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">أكثر التخصصات بحثاً:</span>
              {[
                { name: "الذكاء الاصطناعي", slug: "artificial-intelligence" },
                { name: "الأمن السيبراني", slug: "cybersecurity" },
                { name: "التمريض", slug: "nursing" },
                { name: "علم البيانات", slug: "data-science" },
                { name: "الصيدلة", slug: "pharmacy" },
              ].map((chip) => (
                <Link
                  key={chip.slug}
                  to="/majors/$slug"
                  params={{ slug: chip.slug }}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-surface hover:bg-surface-2 border border-border text-foreground transition-all hover:scale-105"
                >
                  {chip.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border">
              <span className="font-display text-2xl sm:text-3xl font-black text-foreground block">
                30+
              </span>
              <span className="text-xs text-muted-foreground font-semibold">تخصصاً مصنفاً بالرواتب</span>
            </div>

            <div className="p-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border">
              <span className="font-display text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 block">
                100+
              </span>
              <span className="text-xs text-muted-foreground font-semibold">شهادة عالمية مجانية</span>
            </div>

            <div className="p-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border">
              <span className="font-display text-2xl sm:text-3xl font-black text-primary block">
                10
              </span>
              <span className="text-xs text-muted-foreground font-semibold">جامعات حكومية معتمدة</span>
            </div>

            <div className="p-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border">
              <span className="font-display text-2xl sm:text-3xl font-black text-amber-500 block">
                100%
              </span>
              <span className="text-xs text-muted-foreground font-semibold">استخدام مجاني لجميع الطلبة</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. THE GUIDED TOUR (الجولة التعريفية بالمنصة) ================= */}
      <section className="py-20 bg-surface/40 border-b border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="size-3.5" />
              الجولة التعريفية الشاملة بالمنصة
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
              خمس محطات تأخذك من حيرة التوجيهي إلى أول وظيفة
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              استكشف قدرات المنصة خطوة بخطوة وكيف تمنحك الأرقام الحقيقية الموثقة الثقة في اختيار مستقبلك الأكاديمي.
            </p>
          </div>

          {/* Tour Stage Tabs Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
            {TOUR_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeTourStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveTourStage(idx)}
                  className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-card border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02]"
                      : "bg-surface/60 border-border hover:bg-card text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-xs font-bold opacity-60">محطة {stage.step}</span>
                    <Icon className={`size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-bold text-xs sm:text-sm block ${isActive ? "text-foreground" : ""}`}>
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tour Stage Interactive Showcase */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl transition-all">
            {/* STAGE 1: Smart Matching */}
            {activeTourStage === 0 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Compass className="size-3.5" />
                    المحطة الأولى: المطابقة الذكية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    لا تضيع وقتك في تخصصات لا تقبل معدلك
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    من خلال معالج التهيئة الأكاديمي، تدخل معدلك المتوقع أو الحقيقي في التوجيهي وفرعك الدراسي (علمي، أدبي، صناعي، صحي، IT)،
                    فتقوم خوارزمية المنصة بعزل التخصصات التي تناسبك تلقائياً وعرض الحدود الدنيا في الجامعات الأردنية.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>فحص توافق الفرع الأكاديمي مع شروط التعليم العالي.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>مقارنة الحدود الدنيا التنافسية لآخر عامين (2023 و 2024).</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>حساب الميزانية التقديرية (تنافسي، موازي، وخاص).</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>جرب لوحة التحكم والمطابقة</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Visual Simulation Card */}
                <div className="bg-surface-2 p-6 rounded-2xl border border-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-bold text-foreground">معاينة مطابقة المعدل الحية:</span>
                    <span className="text-xs font-mono font-bold text-primary">المعدل: 88.5% · علمي</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">علوم الحاسوب والذكاء الاصطناعي</span>
                        <span className="text-[11px] text-muted-foreground">جامعة اليرموك والهاشمية والتكنو</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                        متاح تنافسي ✓
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">هندسة الميكاترونكس والأتمتة</span>
                        <span className="text-[11px] text-muted-foreground">جامعة البلقاء التطبيقية</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                        متاح تنافسي ✓
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">التمريض القانوني</span>
                        <span className="text-[11px] text-muted-foreground">الجامعة الأردنية</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                        متاح موازي / تنافسي مرن
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: AI Advisor */}
            {activeTourStage === 1 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <Bot className="size-3.5" />
                    المحطة الثانية: المستشار الذكي 100% جهوزية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    استشر خبيراً مدرباً على أرقام ديوان الخدمة الأردني
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    يعمل المستشار الذكي بنظام البث المباشر (SSE Streaming) المدعوم بمحرك ذكاء محلي لا يتعطل أبداً.
                    يمكنك اختيار نبرة المستشار الأنسب لك من بين 4 شخصيات أكاديمية متخصصة.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-surface border border-border">
                      <span className="font-bold text-foreground block">🏛️ المستشار الرسمي</span>
                      <span className="text-[11px] text-muted-foreground">تحليل معتمد وفق ديوان الخدمة</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface border border-border">
                      <span className="font-bold text-foreground block">💼 خبير سوق العمل</span>
                      <span className="text-[11px] text-muted-foreground">منصة سجّل ورواتب القطاع الخاص</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface border border-border">
                      <span className="font-bold text-foreground block">🚀 رائد الأعمال الرقمي</span>
                      <span className="text-[11px] text-muted-foreground">فرص العمل عن بُعد بالدولار</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface border border-border">
                      <span className="font-bold text-foreground block">🤝 المرشد الأخوي الداعم</span>
                      <span className="text-[11px] text-muted-foreground">تفكيك قلق وحيرة التوجيهي</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/advisor"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>تحدث مع المستشار الآن</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AI Chat Stream Simulation */}
                <div className="bg-surface-2 p-5 rounded-2xl border border-border font-sans space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Bot className="size-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">بث حي من المستشار الأكاديمي:</span>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary text-xs leading-relaxed">
                    طالب: &quot;معدلي 85 علمي، محتار بين الأمن السيبراني والهندسة المدنية؟&quot;
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border text-xs leading-7 text-foreground space-y-2">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      تقرير المستشار الأكاديمي الموثق:
                    </p>
                    <p>
                      <strong>1. الأمن السيبراني:</strong> تخصص مطلوب بشدة في الأردن والخليج، نسبة التشغيل 80%+، ومتوسط راتب البداية 600 دينار.
                    </p>
                    <p>
                      <strong>2. الهندسة المدنية:</strong> مصنفة رسمياً كـ &quot;راكدة&quot; في مخزون ديوان الخدمة بانتظار يتجاوز 10 سنوات، ولا ينصح بها إلا مع إتقان برمجيات BIM وإدارة المشاريع.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: Market Data */}
            {activeTourStage === 2 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <TrendingUp className="size-3.5" />
                    المحطة الثالثة: الشفافية ومؤشرات السوق
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    لا تدرس تخصصاً وتتفاجأ بأنه راكد منذ 10 سنوات
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    تحليل كامل لـ 30 تخصصاً يشمل: معدلات التعيين السنوي في ديوان الخدمة، فترات الانتظار بالأشهر،
                    مؤشر العمل عن بُعد، والطلب في المملكة العربية السعودية والإمارات وقطر.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                      {demandedCount} تخصصاً مطلوباً
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg">
                      {saturatedCount} تخصصاً مشبعاً
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg">
                      {stagnantCount} تخصصاً راكداً
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/majors"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>تصفح دليل التخصصات الكامل</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Market Benchmark Simulation */}
                <div className="bg-surface-2 p-5 rounded-2xl border border-border space-y-3">
                  <span className="text-xs font-bold text-foreground block">
                    مقارنة سريعة لرواتب وفترات الانتظار (بيانات سجّل والضمان):
                  </span>
                  {SECTOR_SALARY_BENCHMARKS.slice(0, 3).map((sec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-card border border-border flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-foreground block">{sec.sector}</span>
                        <span className="text-[10px] text-muted-foreground">
                          فترة الانتظار: {sec.averageWaitTimeMonths} أشهر
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
            )}

            {/* STAGE 4: Certifications */}
            {activeTourStage === 3 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Award className="size-3.5" />
                    المحطة الرابعة: الشهادات العالمية المجانية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    تخرج من الجامعة ولديك شهادات هارفارد وغوغل في سيرتك الذاتية
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    وفرنا دليلاً مباشراً لأقوى الشهادات المصغرة (Micro-Credentials) العالمية المجانية 100% معتمدة من كبرى المؤسسات.
                    هذه الشهادات هي التي تميزك وتجعلك تقتنص عقود عمل عن بُعد برواتب تبدأ من 800 إلى 2000 دولار.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>CS50x لعلوم الحاسوب و CS50 AI من جامعة هارفارد.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>شهادات Google المهنية في الأمن السيبراني وتحليل البيانات.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>مسارات IBM في الذكاء الاصطناعي والحوسبة السحابية.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/certifications"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>استكشف الشهادات المجانية</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Certifications preview cards */}
                <div className="space-y-3">
                  {certifications.slice(0, 3).map((cert) => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground block">{cert.name}</span>
                        <span className="text-[11px] text-muted-foreground block">
                          الجهة المانحة: {cert.provider} · {cert.estimatedHours} ساعة
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        مجانية 100% ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 5: Magazine */}
            {activeTourStage === 4 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Newspaper className="size-3.5" />
                    المحطة الخامسة: المجلة الخبيرية الأكاديمية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    مقالات ودراسات حصرية من كبار مستشاري التوجيه في المملكة
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    قسم تفاعلي يواكب كل مستجدات سوق العمل: أسرار القبول الموحد والـ 30 رغبة، التحول نحو الجامعات التقنية التطبيقية،
                    وخارطة طريق الحصول على وظائف عن بُعد بالدولار من الأردن.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>مقالات موثقة ومراجعة من قبل الإدارة الأكاديمية للمنصة.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>خلاصات تنفيذية سريعة قابلة للتطبيق الفوري.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/magazine"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>تصفح مقالات المجلة الخبيرية</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Magazine article preview */}
                <div className="space-y-3">
                  {INITIAL_MAGAZINE_ARTICLES.slice(0, 2).map((art) => (
                    <Link
                      key={art.id}
                      to="/magazine"
                      className="p-4 rounded-2xl bg-surface-2 border border-border block hover:border-primary/40 transition-colors"
                    >
                      <span className="text-[10px] font-bold text-primary block mb-1">
                        {art.categoryLabel} · {art.readTime}
                      </span>
                      <span className="font-bold text-xs text-foreground block line-clamp-2">
                        {art.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground block mt-1">
                        بواسطة: {art.author.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= 3. QUICK MAJOR COMPARISON PLAYGROUND ================= */}
      <section className="py-20 border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
              <Zap className="size-3.5" />
              مختبر المقارنة اللحظية
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              قارن بين أي تخصصين وجهاً لوجه
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              اختر تخصصين واطلع على الفارق الفوري في نسب التشغيل، الرواتب، والطلب في الخليج والعمل عن بُعد.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
            {/* Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-border">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">التخصص الأول:</label>
                <select
                  value={compMajor1Slug}
                  onChange={(e) => setCompMajor1Slug(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl p-3 text-xs text-foreground font-bold"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">التخصص الثاني:</label>
                <select
                  value={compMajor2Slug}
                  onChange={(e) => setCompMajor2Slug(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl p-3 text-xs text-foreground font-bold"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="pt-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 p-3 rounded-xl bg-surface border border-border font-bold">
                <span className="text-muted-foreground">وجه المقارنة</span>
                <span className="text-primary text-center">{major1.name}</span>
                <span className="text-purple-600 dark:text-purple-400 text-center">{major2.name}</span>
              </div>

              <div className="grid grid-cols-3 p-3 rounded-xl hover:bg-surface/50 transition-colors">
                <span className="font-bold text-muted-foreground">التصنيف الرسمي:</span>
                <span className="text-center font-bold">{major1.classification}</span>
                <span className="text-center font-bold">{major2.classification}</span>
              </div>

              <div className="grid grid-cols-3 p-3 rounded-xl bg-surface/30">
                <span className="font-bold text-muted-foreground">نسبة التشغيل التقديرية:</span>
                <span className="text-center font-bold text-emerald-600 dark:text-emerald-400">
                  {major1.employmentRate}
                </span>
                <span className="text-center font-bold text-emerald-600 dark:text-emerald-400">
                  {major2.employmentRate}
                </span>
              </div>

              <div className="grid grid-cols-3 p-3 rounded-xl hover:bg-surface/50 transition-colors">
                <span className="font-bold text-muted-foreground">متوسط راتب البداية:</span>
                <span className="text-center font-mono font-bold">
                  {major1.salary?.entryAvg || 450} د.أ
                </span>
                <span className="text-center font-mono font-bold">
                  {major2.salary?.entryAvg || 400} د.أ
                </span>
              </div>

              <div className="grid grid-cols-3 p-3 rounded-xl bg-surface/30">
                <span className="font-bold text-muted-foreground">إمكانية العمل عن بُعد:</span>
                <span className="text-center font-bold">{major1.remoteWorkIndex || "متوسط"}</span>
                <span className="text-center font-bold">{major2.remoteWorkIndex || "محدود"}</span>
              </div>

              <div className="grid grid-cols-3 p-3 rounded-xl hover:bg-surface/50 transition-colors">
                <span className="font-bold text-muted-foreground">الطلب في دول الخليج:</span>
                <span className="text-center font-bold">{major1.gulfDemand || "متوسط"}</span>
                <span className="text-center font-bold">{major2.gulfDemand || "محدود"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FAQS ACCORDION ================= */}
      <section className="py-20 bg-surface/30 border-b border-border">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3">
              <HelpCircle className="size-3.5" />
              الأسئلة الأكثر تكراراً
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              كل ما تحتاج معرفته عن المنصة
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:bg-surface transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. LUXURY FINAL CALL TO ACTION ================= */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-card via-surface to-background text-center">
        <div className="relative mx-auto max-w-3xl px-4 space-y-6">
          <AppLogo size={48} className="mx-auto" />

          <h2 className="font-display text-2xl sm:text-4xl font-black text-foreground">
            مستقبلك يبدأ بقرار مدروس مبني على البيانات
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            انضم إلى آلاف الطلبة الأردنيين الذين اكتشفوا مسارهم الموثق، وابدأ رحلتك الأكاديمية مع المستشار الذكي وبنك الشهادات المجانية.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/auth"
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all cursor-pointer"
            >
              ابدأ الآن وأنشئ حسابك مجاناً
            </Link>

            <Link
              to="/advisor"
              className="px-6 py-3 rounded-2xl border border-border bg-card hover:bg-surface text-foreground font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              تحدث مع المستشار الذكي 🤖
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
