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
  Calculator,
  MapPin,
  School,
  Wallet,
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

// Interactive 7-Stage Tour Navigation
const TOUR_STAGES = [
  {
    step: "01",
    id: "stage-matching",
    title: "المطابقة الذكية للمعدل والفرع",
    desc: "محاكي تفاعلي حي يطابق معدلك مع الحدود الدنيا في 10 جامعات أردنية",
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
    title: "بنك الشهادات العالمية المجانية",
    desc: "أكثر من 100 شهادة مجانية معتمدة من هارفارد (CS50)، غوغل، وIBM",
    icon: Award,
    color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    step: "05",
    id: "stage-calculator",
    title: "حاسبة الرسوم والميزانية الجامعية",
    desc: "احسب القسط الفصلي والتكلفة الإجمالية في الجامعات الأردنية (تنافسي وموازي)",
    icon: Calculator,
    color: "from-rose-500/20 to-orange-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
  {
    step: "06",
    id: "stage-magazine",
    title: "المجلة الخبيرية الأكاديمية",
    desc: "مقالات ودراسات حصرية بأقلام كبار المرشدين الأكاديميين وخبراء التوظيف",
    icon: Newspaper,
    color: "from-cyan-500/20 to-sky-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  },
  {
    step: "07",
    id: "stage-universities",
    title: "خريطة الجامعات الرسمية الـ 10",
    desc: "استكشف أفضل الجامعات الحكومية الأردنية ونقاط قوتها الأكاديمية ومواقعها",
    icon: Building2,
    color: "from-violet-500/20 to-purple-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
  },
];

const JORDAN_PUBLIC_UNIVERSITIES = [
  {
    name: "الجامعة الأردنية",
    city: "عمان",
    established: "1962",
    badge: "أم الجامعات الأردنية",
    topMajors: ["الطب والجراحة", "الذكاء الاصطناعي", "الحقوق", "طب الأسنان"],
    description: "أقدم وأعرق صرح أكاديمي في المملكة، المتصدرة محلياً في تصنيف QS العالمي.",
  },
  {
    name: "جامعة العلوم والتكنولوجيا الأردنية",
    city: "الرمثا / إربد",
    established: "1986",
    badge: "جوهرة الجامعات التكنولوجية",
    topMajors: ["هندسة البرمجيات", "الأمن السيبراني", "الطب البشري", "الهندسة المدنية"],
    description: "واحدة من أفضل الجامعات التكنولوجية والطبية في الشرق الأوسط.",
  },
  {
    name: "جامعة اليرموك",
    city: "إربد",
    established: "1976",
    badge: "منارة الشمال الأكاديمية",
    topMajors: ["علوم الحاسوب", "الإعلام الرقمي", "الترجمة واللغات", "العلوم المالية"],
    description: "صرح عريق يتميز بكلية الإعلام والحاسوب والعلوم الإنسانية والتربوية.",
  },
  {
    name: "الجامعة الهاشمية",
    city: "الزرقاء",
    established: "1995",
    badge: "قلب الزرقاء التعليمي",
    topMajors: ["العلوم الطبية المخبرية", "الصيدلة", "هندسة الميكاترونكس", "التمريض"],
    description: "جامعة خالية من الكربون تعتمد كلياً على الطاقة الشمسية ومتميزة بالعلوم الصحية.",
  },
  {
    name: "جامعة البلقاء التطبيقية",
    city: "السلط (وكافة المحافظات)",
    established: "1997",
    badge: "رائدة التعليم التقني والتطبيقي",
    topMajors: ["الذكاء الاصطناعي التطبيقي", "هندسة الأوتوترونكس", "الطاقة المتجددة"],
    description: "تشرف على كافة كليات المجتمع والكليات التقنية المنتشرة في محافظات المملكة.",
  },
  {
    name: "جامعة مؤتة",
    city: "الكرك",
    established: "1981",
    badge: "سيف الجنوب وصرح التميز",
    topMajors: ["الطب البشري", "التمريض", "الهندسة الكيميائية", "العلوم الإدارية"],
    description: "تضم جناحين عسكرياً ومدنياً، ومصدر فخر لأبناء الجنوب وكافة طلبة الأردن.",
  },
  {
    name: "جامعة آل البيت",
    city: "المفرق",
    established: "1992",
    badge: "واحة البادية الأكاديمية",
    topMajors: ["تكنولوجيا المعلومات", "الفقه وأصوله", "القانون", "العلوم الإدارية"],
    description: "صرح جامعي متميز يربط بين الأصالة والعلوم الحديثة في محافظة المفرق.",
  },
  {
    name: "جامعة الحسين بن طلال",
    city: "معان",
    established: "1999",
    badge: "جامعة أغلى الرجال",
    topMajors: ["هندسة التعدين", "إدارة الضيافة والسياحة", "الآثار", "علم الحاسوب"],
    description: "تقع في معان التاريخية، وتتفرد في تخصصات التعدين وسلاسل الإمداد والتراث.",
  },
  {
    name: "جامعة الطفيلة التقنية",
    city: "الطفيلة",
    established: "2005",
    badge: "أول جامعة تقنية حكومية",
    topMajors: ["هندسة الطاقة المتجددة", "الجيولوجيا والتعدين", "الميكاترونكس"],
    description: "تركز على التخصصات الهندسية النادرة واحتياجات المشروعات الصناعية الكبرى.",
  },
  {
    name: "الجامعة الألمانية الأردنية",
    city: "عمان / مادبا",
    established: "2005",
    badge: "جسر الأردن نحو الصناعة الألمانية",
    topMajors: ["الهندسة الصناعية", "علوم البيانات", "العمارة", "إدارة الأعمال الدولية"],
    description: "نموذج فريد من الجامعات التطبيقية يتضمن سنة دراسية وتدريبية كاملة في ألمانيا.",
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

  // Tour Stage 1: Simulator GPA & Branch
  const [simGpa, setSimGpa] = useState<number>(85.5);
  const [simBranch, setSimBranch] = useState<"علمي" | "أدبي" | "صناعي" | "IT">("علمي");

  // Tour Stage 2: AI Simulator Prompts
  const [selectedAiPromptIdx, setSelectedAiPromptIdx] = useState(0);
  const AI_SIM_PROMPTS = [
    {
      q: "معدلي 85% فرع علمي، ما هي أفضل التخصصات المتاحة لي ذات المستقبل الواعد؟",
      answer:
        "وفقاً للحدود الدنيا في القبول الموحد لعام 2024/2025 وسوق العمل الأردني، معدل 85% علمي يؤهلك تنافسياً لتخصصات واعدة جداً مثل: 1) الأمن السيبراني في اليرموك أو البلقاء، 2) علوم البيانات والذكاء الاصطناعي في الهاشمية، 3) التمريض في العلوم والتكنولوجيا، 4) هندسة البرمجيات بالبرنامج الموازي، وجميعها تسجل نسب تشغيل بين 75% و 90% مع متوسط رواتب بداية تفوق 600 دينار.",
      badges: ["توجيهي علمي", "أمن سيبراني", "قبول موحد"],
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
        "المسار الأسرع يبدأ باختيار مهارة رقمية محددة (مثل: تحليل البيانات، برمجة بايثون، أو تطوير واجهات React)، وإكمال شهادة معتمدة مجانية مثل Google Data Analytics أو CS50x من هارفارد المتوفرة على منصتنا. ثم إنشاء حساب على منصات العمل الحر (Upwork، Mostaql) وبناء سابقة أعمال تجريبية. متوسط دخل الخريج الماهر عن بُعد يتراوح بين 600 إلى 2000 دولار شهرياً.",
      badges: ["فريلانس", "شهادات هارفارد", "عمل عن بعد"],
    },
  ];

  // Tour Stage 3: Market Sector Index
  const [selectedSectorIdx, setSelectedSectorIdx] = useState(0);

  // Tour Stage 4: Certifications Provider Filter
  const [selectedCertProvider, setSelectedCertProvider] = useState<string>("الكل");

  // Tour Stage 5: Tuition Calculator
  const [calcUni, setCalcUni] = useState("الجامعة الأردنية");
  const [calcMajorSlug, setCalcMajorSlug] = useState("artificial-intelligence");
  const [calcHours, setCalcHours] = useState(15);
  const [calcProgram, setCalcProgram] = useState<"competitive" | "parallel">("competitive");

  // Tour Stage 7: Selected University
  const [selectedUniIdx, setSelectedUniIdx] = useState(0);

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
              سبع محطات تفاعلية تأخذك من حيرة التوجيهي إلى أول وظيفة
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              استكشف قدرات المنصة خطوة بخطوة من خلال محاكيات حية ومباشرة تربط خياراتك بالأرقام والرسوم الجامعية الرسمية.
            </p>
          </div>

          {/* Tour Stage Tabs Selector (7 Tabs) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
            {TOUR_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeTourStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveTourStage(idx)}
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
            {/* STAGE 1: Smart Matching with LIVE SIMULATOR SLIDER */}
            {activeTourStage === 0 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Compass className="size-3.5" />
                    المحطة الأولى: المطابقة الذكية الحية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    حرّك شريط المعدل واكتشف ما تقبله كليات الأردن في ثوانٍ
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    تقوم خوارزمية المنصة بعزل التخصصات والجامعات المطابقة لمعدلك في التوجيهي وفرعك الدراسي فورياً،
                    وتقارنها مع الحدود الدنيا المعتمدة في وحدة تنسيق القبول الموحد.
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
                      <span>فتح معالج المطابقة الكامل في لوحة التحكم</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Interactive Live GPA Simulator Card */}
                <div className="bg-surface-2 p-6 rounded-2xl border border-border space-y-4 shadow-sm">
                  {/* Branch selector pills */}
                  <div>
                    <span className="text-xs font-bold text-muted-foreground block mb-2">اختر فرع الثانوية:</span>
                    <div className="flex flex-wrap gap-2">
                      {(["علمي", "أدبي", "صناعي", "IT"] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSimBranch(b)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            simBranch === b
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "bg-card border border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GPA Slider */}
                  <div className="space-y-1.5 pt-2">
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
                      التوافق الفوري وفق هذا المعدل ({simBranch}):
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
                    يعمل المستشار الذكي بنظام البث المباشر (SSE Streaming) مع محرك محلي لا يتعطل أبداً.
                    اختر أحد الأسئلة الشائعة لمعاينة أسلوب التحليل الفوري المبني على الأرقام الرسمية:
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
                  <div className="flex items-center gap-3 text-xs font-bold">
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
                            فترة الانتظار التقريبية: {sec.averageWaitTimeMonths} شهراً
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
                      <span>استكشف بنك الشهادات المجانية الكامل</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Certifications preview cards with provider filter */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5 pb-2">
                    {["الكل", "Harvard", "Google", "IBM"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSelectedCertProvider(p)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCertProvider === p
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  {certifications
                    .filter((c) =>
                      selectedCertProvider === "الكل" ? true : c.provider.includes(selectedCertProvider)
                    )
                    .slice(0, 3)
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between"
                      >
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

            {/* STAGE 5: Interactive University Tuition & Budget Calculator */}
            {activeTourStage === 4 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    <Calculator className="size-3.5" />
                    المحطة الخامسة: حاسبة الرسوم والميزانية الجامعية
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    خطط لميزانية دراستك في الجامعات الأردنية بشفافية تامة
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    احسب التكلفة التقديرية للفصل الدراسي وكامل سنوات التخرج بدقة، وقارن بين أسعار الساعات في البرنامج التنافسي
                    والبرنامج الموازي مع رسوم التسجيل والخدمات الطلابية.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>أسعار الساعات المعتمدة في الجامعات الأردنية الرسمية.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>احتساب رسوم التسجيل الفصلية الثابتة.</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>المقارنة الذكية بين التنافسي والموازي لتجنب المفاجآت المالية.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/majors"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90"
                    >
                      <span>استكشف أسعار الساعات لكافة التخصصات</span>
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Calculator Interactive Widget */}
                {(() => {
                  const currentMajor =
                    majors.find((m) => m.slug === calcMajorSlug) || majors[0];
                  const hourPrice =
                    calcProgram === "competitive"
                      ? currentMajor.averageHourPriceJOD.competitive
                      : currentMajor.averageHourPriceJOD.parallel;
                  const regFee = calcProgram === "competitive" ? 45 : 85;
                  const semesterTuition = calcHours * hourPrice;
                  const semesterTotal = semesterTuition + regFee;
                  const totalDegreeCost = 132 * hourPrice + 8 * regFee;

                  return (
                    <div className="bg-surface-2 p-6 rounded-2xl border border-border space-y-4 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-border">
                        <span className="text-xs font-bold text-foreground">حاسبة الرسوم الفورية:</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setCalcProgram("competitive")}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              calcProgram === "competitive"
                                ? "bg-primary text-primary-foreground shadow-2xs"
                                : "bg-card border border-border text-muted-foreground"
                            }`}
                          >
                            تنافسي
                          </button>
                          <button
                            type="button"
                            onClick={() => setCalcProgram("parallel")}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              calcProgram === "parallel"
                                ? "bg-primary text-primary-foreground shadow-2xs"
                                : "bg-card border border-border text-muted-foreground"
                            }`}
                          >
                            موازي
                          </button>
                        </div>
                      </div>

                      {/* Pickers */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-bold text-muted-foreground block mb-1">الجامعة:</label>
                          <select
                            value={calcUni}
                            onChange={(e) => setCalcUni(e.target.value)}
                            className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground font-semibold"
                          >
                            <option value="الجامعة الأردنية">الجامعة الأردنية</option>
                            <option value="جامعة العلوم والتكنولوجيا">جامعة العلوم والتكنولوجيا</option>
                            <option value="جامعة اليرموك">جامعة اليرموك</option>
                            <option value="الجامعة الهاشمية">الجامعة الهاشمية</option>
                            <option value="جامعة البلقاء التطبيقية">جامعة البلقاء التطبيقية</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-muted-foreground block mb-1">التخصص:</label>
                          <select
                            value={calcMajorSlug}
                            onChange={(e) => setCalcMajorSlug(e.target.value)}
                            className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground font-semibold"
                          >
                            {majors.slice(0, 10).map((m) => (
                              <option key={m.slug} value={m.slug}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Credit Hours Slider */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-foreground">عدد الساعات في الفصل الدراسي:</span>
                          <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            {calcHours} ساعة معتمدة
                          </span>
                        </div>
                        <input
                          type="range"
                          min="12"
                          max="18"
                          step="3"
                          value={calcHours}
                          onChange={(e) => setCalcHours(parseInt(e.target.value, 10))}
                          className="w-full accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>12 ساعة (حد أدنى)</span>
                          <span>15 ساعة (متوسط)</span>
                          <span>18 ساعة (حد أقصى)</span>
                        </div>
                      </div>

                      {/* Resulting Price Cards */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-center">
                        <div className="p-2.5 rounded-xl bg-card border border-border">
                          <span className="text-[10px] text-muted-foreground block">سعر الساعة</span>
                          <span className="font-mono font-bold text-xs sm:text-sm text-foreground block mt-0.5">
                            {hourPrice} د.أ
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                          <span className="text-[10px] text-primary font-bold block">القسط الفصلي</span>
                          <span className="font-mono font-extrabold text-xs sm:text-sm text-primary block mt-0.5">
                            {semesterTotal} د.أ
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-card border border-border">
                          <span className="text-[10px] text-muted-foreground block">التكلفة التقديرية للدرجة</span>
                          <span className="font-mono font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 block mt-0.5">
                            {totalDegreeCost.toLocaleString()} د.أ
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* STAGE 6: Verified Expert Magazine */}
            {activeTourStage === 5 && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Newspaper className="size-3.5" />
                    المحطة السادسة: المجلة الخبيرية الأكاديمية الموثقة 100%
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
                      <span>تصفح مقالات المجلة الخبيرية الكاملة</span>
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

            {/* STAGE 7: 10 Jordanian Public Universities Explorer */}
            {activeTourStage === 6 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-2">
                      <Building2 className="size-3.5" />
                      المحطة السابعة: خريطة الجامعات الرسمية الـ 10
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
                      استكشف الجامعات الحكومية ونقاط قوتها الأكاديمية
                    </h3>
                  </div>

                  <Link
                    to="/majors"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold inline-flex items-center gap-1.5 shadow-xs shrink-0"
                  >
                    <span>عرض معدلات القبول لكافة الجامعات</span>
                    <ArrowLeft className="size-3.5" />
                  </Link>
                </div>

                {/* Universities Horizontal / Grid Showcase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {JORDAN_PUBLIC_UNIVERSITIES.slice(0, 6).map((uni, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-surface-2 border border-border hover:border-primary/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                            تأسست {uni.established}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3 text-primary" />
                            {uni.city}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-sm text-foreground mb-1">
                          {uni.name}
                        </h4>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mb-2">
                          👑 {uni.badge}
                        </span>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                          {uni.description}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-border/60">
                        <span className="text-[10px] font-bold text-muted-foreground block mb-1">
                          أبرز الكليات والتخصصات:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {uni.topMajors.map((m, mi) => (
                            <span
                              key={mi}
                              className="text-[10px] bg-card border border-border px-2 py-0.5 rounded-md text-foreground"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
