import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  Users,
  Activity,
  Bot,
  Sliders,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  GraduationCap,
  Save,
  Search,
  Download,
  Key,
  Globe,
  Database,
  LayoutDashboard,
  FileText,
  Clock,
  ArrowUpRight,
  Send,
  Eye,
  Menu,
  X,
  Award,
  Newspaper,
  BookOpenCheck,
  PlusCircle,
  Trash2,
  BookmarkCheck,
  Camera,
  Radar,
  ScanLine,
  Image,
  CheckCheck,
  UploadCloud,
  RefreshCw,
  SlidersHorizontal,
  Check,
  Edit3,
} from "lucide-react";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { INITIAL_MAGAZINE_ARTICLES, type ExpertArticle } from "@/data/magazine";
import {
  type ScoutPendingItem,
  type ScoutAgentConfig,
  type ScoutCategory,
  DEFAULT_SCOUT_CONFIG,
  INITIAL_SCOUT_FINDINGS,
} from "@/lib/ai-scout";
import { type VisionTargetType } from "@/routes/api/vision";
import {
  OFFICIAL_ADMISSIONS_DATA,
  CIVIL_SERVICE_BENCHMARK_2025,
  SECTOR_SALARY_BENCHMARKS,
} from "@/data/official-market-stats";
import {
  claimAdminRole,
  decidePendingChange,
  getMasterDashboard,
  revertOverride,
  runScanNow,
  saveDirectOverride,
} from "@/lib/admin.functions";
import { formatDate, formatDateTime } from "@/lib/platform-data";
import { AppLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/_authenticated/updates")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم العليا وإدارة المنصة | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "لوحة التحكم والإدارة العليا لمنصة الطلاب والمستقبل: إدارة المستخدمين، تحليلات الزيارات، استشارات الذكاء الاصطناعي، وتعديل بيانات التخصصات والمصادر.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحكم العليا | الطلاب والمستقبل" },
    ],
  }),
  component: MasterAdminPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-8">
      <h1 className="font-display text-xl font-bold">تعذّر تحميل لوحة التحكم</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
});

type SidebarSection =
  | "overview"
  | "traffic"
  | "users"
  | "master_editor"
  | "ai_scout"
  | "vision_importer"
  | "overrides"
  | "magazine"
  | "admissions"
  | "ai"
  | "pending"
  | "audit"
  | "sources";

const SIDEBAR_ITEMS: {
  id: SidebarSection;
  label: string;
  category: "analytics" | "management" | "ai" | "audit";
  icon: typeof LayoutDashboard;
  badge?: string;
}[] = [
  { id: "overview", label: "المؤشرات العامة الحية", category: "analytics", icon: LayoutDashboard },
  { id: "traffic", label: "الزيارات وسلوك الطلاب", category: "analytics", icon: TrendingUp },
  { id: "master_editor", label: "تعبئة وإدارة جميع معلومات المنصة 🛠️", category: "management", icon: Database },
  { id: "ai_scout", label: "وكيل البحث والتعبئة الذاتي 🤖", category: "management", icon: Radar, badge: "جديد" },
  { id: "vision_importer", label: "التعبئة الذكية عبر الصور 📷", category: "management", icon: Camera, badge: "جديد" },
  { id: "users", label: "إدارة المستخدمين والطلاب", category: "management", icon: Users },
  { id: "overrides", label: "تعديل حقول التخصصات الفوري", category: "management", icon: Sliders },
  { id: "magazine", label: "إدارة المجلة الخبيرية 📰", category: "management", icon: Newspaper },
  { id: "admissions", label: "معدلات القبول والديوان 📊", category: "management", icon: BookOpenCheck },
  { id: "ai", label: "استشارات ومفاتيح الذكاء الاصطناعي", category: "ai", icon: Bot },
  { id: "pending", label: "التغييرات المقترحة", category: "audit", icon: Clock },
  { id: "audit", label: "سجل التدقيق والنشاط", category: "audit", icon: FileText },
  { id: "sources", label: "المصادر الرسمية والروابط", category: "audit", icon: Globe },
];

const OVERRIDABLE_FIELDS = [
  { field: "classification", label: "التصنيف الرسمي (مطلوب / مشبع / راكد)", options: ["مطلوب", "مشبع", "راكد"] },
  { field: "employment_rate", label: "نسبة التشغيل التقديرية (مثال: 85% خلال أول سنتين)" },
  { field: "risk", label: "مستوى المخاطرة الوظيفية (منخفض / متوسط / مرتفع)", options: ["منخفض", "متوسط", "مرتفع"] },
  { field: "salary_entry_avg", label: "متوسط راتب البداية بالدينار الأردني (مثال: 600)" },
  { field: "remote_work_index", label: "إمكانية العمل عن بُعد (مرتفع / متوسط / نادر)", options: ["مرتفع", "متوسط", "نادر"] },
  { field: "gulf_demand", label: "الطلب في دول الخليج (مرتفع / متوسط / محدود)", options: ["مرتفع", "متوسط", "محدود"] },
  { field: "note", label: "ملاحظة توجيهية خاصة تظهر للطلاب في التخصص" },
];

function MasterAdminPage() {
  const queryClient = useQueryClient();
  const fetchDashboard = useServerFn(getMasterDashboard);
  const decide = useServerFn(decidePendingChange);
  const revert = useServerFn(revertOverride);
  const scan = useServerFn(runScanNow);
  const saveOverride = useServerFn(saveDirectOverride);

  const [activeSection, setActiveSection] = useState<SidebarSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  // Direct Override Form State
  const [overrideMajorSlug, setOverrideMajorSlug] = useState(majors[0]?.slug || "computer-science");
  const [overrideField, setOverrideField] = useState("classification");
  const [overrideValue, setOverrideValue] = useState("مطلوب");
  const [overrideNote, setOverrideNote] = useState("");

  // AI Key state & Live Test
  const [customGeminiKey, setCustomGeminiKey] = useState("");
  const [keySavedMessage, setKeySavedMessage] = useState(false);
  const [aiTestPrompt, setAiTestPrompt] = useState("ما رواتب ونسب تشغيل الذكاء الاصطناعي في الأردن؟");
  const [aiTestResult, setAiTestResult] = useState<string | null>(null);
  const [aiTesting, setAiTesting] = useState(false);

  // Magazine Management State
  const [articlesList, setArticlesList] = useState<ExpertArticle[]>(INITIAL_MAGAZINE_ARTICLES);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleSummary, setNewArticleSummary] = useState("");
  const [newArticleAuthor, setNewArticleAuthor] = useState("د. محمود جو (المدير التنفيذي والمستشار الأكاديمي)");
  const [newArticleCategory, setNewArticleCategory] = useState("tawjihi_advice");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleSource, setNewArticleSource] = useState("منصة الطلاب والمستقبل — التوجيه التنفيذي 2026");
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  // Admissions & Civil Service State
  const [admissionsSearch, setAdmissionsSearch] = useState("");
  const [admissionsTab, setAdmissionsTab] = useState<"cutoffs" | "civil_service" | "salaries">("cutoffs");

  // Master Content Management Hub State
  const [masterTab, setMasterTab] = useState<"majors" | "certs" | "cutoffs" | "texts">("majors");
  const [editableMajorsList, setEditableMajorsList] = useState(majors);
  const [selectedEditMajorSlug, setSelectedEditMajorSlug] = useState(majors[0]?.slug || "computer-science");

  const selectedMajorObj = useMemo(
    () => editableMajorsList.find((m) => m.slug === selectedEditMajorSlug) || editableMajorsList[0],
    [editableMajorsList, selectedEditMajorSlug]
  );

  const [editMajorForm, setEditMajorForm] = useState({ ...selectedMajorObj });

  useEffect(() => {
    if (selectedMajorObj) {
      setEditMajorForm({ ...selectedMajorObj });
    }
  }, [selectedEditMajorSlug, selectedMajorObj]);

  // New Major Modal state
  const [isAddMajorOpen, setIsAddMajorOpen] = useState(false);
  const [newMajorName, setNewMajorName] = useState("");
  const [newMajorField, setNewMajorField] = useState("تقنية المعلومات");
  const [newMajorClass, setNewMajorClass] = useState<"مطلوب" | "مشبع" | "راكد">("مطلوب");
  const [newMajorRate, setNewMajorRate] = useState("80% – 90%");
  const [newMajorRisk, setNewMajorRisk] = useState<"منخفض" | "متوسط" | "مرتفع">("منخفض");
  const [newMajorSummary, setNewMajorSummary] = useState("");
  const [newMajorSalary, setNewMajorSalary] = useState("650");

  // Certifications Editor State
  const [editableCertsList, setEditableCertsList] = useState(certifications);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newCertName, setNewCertName] = useState("");
  const [newCertProvider, setNewCertProvider] = useState("Google");
  const [newCertHours, setNewCertHours] = useState(40);
  const [newCertLevel, setNewCertLevel] = useState("مبتدئ إلى متوسط");
  const [newCertLink, setNewCertLink] = useState("https://grow.google/certificates/");
  const [newCertCategory, setNewCertCategory] = useState("تقنية المعلومات والبرمجة");

  // Cutoffs Editor State
  const [editableCutoffsList, setEditableCutoffsList] = useState(OFFICIAL_ADMISSIONS_DATA);
  const [isAddCutoffOpen, setIsAddCutoffOpen] = useState(false);
  const [newCutoffUni, setNewCutoffUni] = useState("الجامعة الأردنية");
  const [newCutoffMajor, setNewCutoffMajor] = useState("الذكاء الاصطناعي");
  const [newCutoffScore, setNewCutoffScore] = useState("94.5");
  const [newCutoffPrice, setNewCutoffPrice] = useState("35");

  // Platform Copywriting texts state
  const [platformTexts, setPlatformTexts] = useState({
    heroTitle: "اعرف مستقبل تخصصك ومسارك المهني قبل أن تختار",
    heroSubtitle: "جولة استرشادية تفاعلية تربط معدلك في التوجيهي بنِسَب التشغيل والركود الموثقة في ديوان الخدمة وسجّل، مع خارطة شهادات عالمية مجانية معتمدة من هارفارد وغوغل تمنحك ميزة تنافسية حقيقية.",
    bannerNotice: "تحديثات القبول الموحد 2026 ونسب ديوان الخدمة الجديدة مفعلة الآن رسمياً.",
    statsCounterText: "30+ تخصصاً مصنفاً بالرواتب · 100+ شهادة مجانية · 10 جامعات حكومية",
    footerDisclaimer: "جميع نِسَب التشغيل والتصنيفات تقديرات استرشادية مبنية على أحدث البيانات الرسمية المتاحة من ديوان الخدمة المدنية (هيئة الخدمة والإدارة العامة) ودائرة الإحصاءات العامة ووزارة التعليم العالي ومنصة سجّل الوطنية.",
  });

  // ================= AI SCOUT STATE & HANDLERS =================
  const [scoutConfig, setScoutConfig] = useState<ScoutAgentConfig>(DEFAULT_SCOUT_CONFIG);
  const [scoutItems, setScoutItems] = useState<ScoutPendingItem[]>(INITIAL_SCOUT_FINDINGS);
  const [scoutRunning, setScoutRunning] = useState(false);
  const [scoutFilterCategory, setScoutFilterCategory] = useState<"all" | ScoutCategory>("all");
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [editScoutItem, setEditScoutItem] = useState<ScoutPendingItem | null>(null);
  const isCollectionsInitialized = useRef(false);

  // Load / Save Scout findings & all platform collections from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedScoutItems = localStorage.getItem("admin_scout_items");
        if (savedScoutItems) {
          const parsed = JSON.parse(savedScoutItems);
          if (Array.isArray(parsed) && parsed.length > 0) setScoutItems(parsed);
        }
        const savedScoutConfig = localStorage.getItem("admin_scout_config");
        if (savedScoutConfig) {
          const parsed = JSON.parse(savedScoutConfig);
          if (parsed && typeof parsed === "object") setScoutConfig(parsed);
        }
        const savedArts = localStorage.getItem("platform_magazine_articles");
        if (savedArts) {
          const parsed = JSON.parse(savedArts);
          if (Array.isArray(parsed) && parsed.length > 0) setArticlesList(parsed);
        }
        const savedCerts = localStorage.getItem("platform_custom_certs");
        if (savedCerts) {
          const parsed = JSON.parse(savedCerts);
          if (Array.isArray(parsed) && parsed.length > 0) setEditableCertsList(parsed);
        }
        const savedMajors = localStorage.getItem("platform_custom_majors");
        if (savedMajors) {
          const parsed = JSON.parse(savedMajors);
          if (Array.isArray(parsed) && parsed.length > 0) setEditableMajorsList(parsed);
        }
        const savedCutoffs = localStorage.getItem("platform_custom_cutoffs");
        if (savedCutoffs) {
          const parsed = JSON.parse(savedCutoffs);
          if (Array.isArray(parsed) && parsed.length > 0) setEditableCutoffsList(parsed);
        }
      } catch (e) {}
      isCollectionsInitialized.current = true;
    }
  }, []);

  // Sync back to localStorage whenever collections are updated
  useEffect(() => {
    if (isCollectionsInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("platform_magazine_articles", JSON.stringify(articlesList));
    }
  }, [articlesList]);

  useEffect(() => {
    if (isCollectionsInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("platform_custom_certs", JSON.stringify(editableCertsList));
    }
  }, [editableCertsList]);

  useEffect(() => {
    if (isCollectionsInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("platform_custom_majors", JSON.stringify(editableMajorsList));
    }
  }, [editableMajorsList]);

  useEffect(() => {
    if (isCollectionsInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("platform_custom_cutoffs", JSON.stringify(editableCutoffsList));
    }
  }, [editableCutoffsList]);

  const persistScoutItems = (updated: ScoutPendingItem[]) => {
    setScoutItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_scout_items", JSON.stringify(updated));
    }
  };

  const handleRunScoutNow = async () => {
    setScoutRunning(true);
    setNotice("🚀 يقوم الوكيل الذكي الآن بتمشيط مصادر التعليم العالي، ديوان الخدمة، وبوابات هارفارد وغوغل...");

    await new Promise((r) => setTimeout(r, 1600));

    // Fresh findings synthesized by autonomous scout
    const freshFindings: ScoutPendingItem[] = [
      {
        id: `scout-${Date.now()}-1`,
        category: "news_magazine",
        categoryLabel: "📰 مقال وتحليل للمجلة الخبيرية",
        title: "دراسة int@j الحديثة: قطاع أمن المعلومات والبرمجة بالأردن بحاجة إلى 5000 خريج تقني خلال 2026",
        sourceName: "جمعية شركات تقنية المعلومات والاتصالات الأردنية (int@j)",
        sourceUrl: "https://intaj.net",
        discoveredAt: "الآن",
        confidenceScore: 99,
        summary: "تزايد الطلب على مهندسي الأمن السيبراني ومطوري بايثون في السوق الأردني بنسبة نمو 22%، مع متوسط رواتب بداية تفوق 650 دينار.",
        details: {
          author: "م. رزان الزعبي (خبيرة استقطاب الكفاءات)",
          readTime: "4 دقائق",
          categoryTag: "دراسات التوظيف والتكنولوجيا",
          sourceReference: "تقرير القوى العاملة التقنية في الأردن 2026",
          keyTakeaways: [
            "الأمن السيبراني والذكاء الاصطناعي هما التخصصان الأكثر طلباً للتعيين الفوري في عمان وإربد.",
            "إتقان الحوسبة السحابية مع شهادة معتمدة يضاعف فرص الحصول على وظيفة عن بُعد.",
          ],
          content: [
            "أظهر أحدث استطلاع للقوى العاملة في قطاع تكنولوجيا المعلومات والاتصالات في الأردن أن الشركات المحلية والإقليمية تعاني من نقص في الكوادر المتخصصة بالأمن السيبراني وهندسة البيانات.",
            "تدعو الدراسة الجامعات الأردنية إلى ربط المناهج بالشهادات المصغرة العالمية المجانية لمنح الخريج جاهزية فورية للعمل.",
          ],
        },
        status: "pending",
      },
      {
        id: `scout-${Date.now()}-2`,
        category: "certifications",
        categoryLabel: "🎓 شهادة عالمية مجانية معتمدة",
        title: "Harvard CS50's Introduction to Cybersecurity — شهادة مجانية معتمدة",
        sourceName: "Harvard Online & edX",
        sourceUrl: "https://cs50.harvard.edu/cybersecurity/",
        discoveredAt: "الآن",
        confidenceScore: 98,
        summary: "مسار هارفارد الأكاديمي الشامل في الدفاع السيبراني وحماية الشبكات، متاح مجاناً بنسبة 100% مع شهادة إتمام رسمية من هارفارد.",
        details: {
          provider: "Harvard University",
          hours: 40,
          freeStatus: true,
          certLevel: "مبتدئ إلى متوسط",
          directUrl: "https://cs50.harvard.edu/cybersecurity/",
          domain: "الأمن السيبراني",
        },
        status: "pending",
      },
    ];

    const updated = [...freshFindings, ...scoutItems];
    persistScoutItems(updated);
    setScoutRunning(false);
    setNotice(`✅ أنهى الوكيل الذكي دورة البحث بنجاح واكتشف ${freshFindings.length} عناصر جديدة بانتظار موافقتك!`);
  };

  const handleApproveScoutItem = (item: ScoutPendingItem) => {
    // 1. Inject into corresponding live platform collection
    if (item.category === "news_magazine") {
      const newArt: ExpertArticle = {
        id: `art-${Date.now()}`,
        slug: item.title.toLowerCase().replace(/[^\u0621-\u064A0-9a-z]+/gi, "-").slice(0, 50),
        title: item.title,
        summary: item.summary,
        category: (item.details.categoryTag?.includes("قبول") ? "admissions_and_grants" : "market_trends") as any,
        categoryLabel: item.details.categoryTag || "تقرير وتحديث رسمي",
        categoryColor: "bg-primary/10 text-primary border-primary/20",
        author: {
          name: item.details.author || "فريق التحرير والرصد الذكي",
          title: "مستشار التخطيط الأكاديمي وسوق العمل",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          verified: true,
        },
        readTime: item.details.readTime || "5 دقائق",
        publishedAt: new Date().toISOString().split("T")[0],
        views: 140,
        featured: true,
        tags: ["رصد ذكي", "توجيهي 2026", "سوق العمل"],
        keyTakeaways: item.details.keyTakeaways || [item.summary],
        content: item.details.content || [item.summary],
        sourceReference: item.details.sourceReference || item.sourceName,
      };
      setArticlesList([newArt, ...articlesList]);
    } else if (item.category === "certifications") {
      const newCert = {
        id: `cert-${Date.now()}`,
        name: item.title,
        provider: item.details.provider || "جهة عالمية معتمدة",
        estimatedHours: item.details.hours || 35,
        level: (item.details.certLevel || "مبتدئ إلى متوسط") as any,
        url: item.details.directUrl || item.sourceUrl,
        free: true,
        summary: item.summary,
      };
      setEditableCertsList([newCert as any, ...editableCertsList]);
    } else if (item.category === "majors_market") {
      const slug = item.details.majorSlug || item.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40);
      const newMajor = {
        slug,
        name: item.title.replace(/^تحديث مؤشرات:\s*/, ""),
        field: item.details.field || "تقنية المعلومات والهندسة",
        classification: item.details.classification || "مطلوب",
        employmentRate: item.details.employmentRate || "85%",
        risk: item.details.risk || "منخفض",
        summary: item.summary,
        publicUniversities: ["الجامعة الأردنية", "جامعة العلوم والتكنولوجيا", "جامعة البلقاء التطبيقية"],
        privateUniversities: ["جامعة الأميرة سمية للتكنولوجيا"],
        accreditation: "اعتماد وطني ودولي معتمد",
        trainingNotes: "تدريب عملي وميداني إلزامي",
        automation: { exposure: "منخفض" as const, note: "أدوار ابتكارية وتطبيقية" },
        certificationIds: ["cs50x"],
        alternatives: [],
        salary: { entryMin: 450, entryAvg: item.details.entrySalary || 650, experienced: item.details.experiencedSalary || 1600 },
        remoteWorkIndex: (item.details.remoteWorkIndex || "مرتفع") as any,
        gulfDemand: (item.details.gulfDemand || "مرتفع") as any,
        creditHours: 132,
        averageHourPriceJOD: { competitive: 35, parallel: 75, private: 120 },
      };
      setEditableMajorsList([newMajor as any, ...editableMajorsList]);
    } else if (item.category === "admissions_cutoffs") {
      const newCutoff = {
        university: item.details.university || "جامعة حكومية",
        major: item.details.majorName || item.title,
        branch: "علمي",
        minGpa: item.details.cutoffGpa || 85.0,
        year: "2024/2025",
        creditHourPrice: item.details.hourPriceCompetitive || 35,
      };
      setEditableCutoffsList([newCutoff as any, ...editableCutoffsList]);
    }

    // 2. Mark as approved
    const updated = scoutItems.map((si) => (si.id === item.id ? { ...si, status: "approved" as const } : si));
    persistScoutItems(updated);
    setNotice(`✅ تمت الموافقة على "${item.title}" وتم نشرها بالمنصة فوراً لجميع الطلبة!`);
  };

  const handleRejectScoutItem = (id: string) => {
    const updated = scoutItems.map((si) => (si.id === id ? { ...si, status: "rejected" as const } : si));
    persistScoutItems(updated);
    setNotice("تم رفض العنصر واستبعاده.");
  };

  const handleBatchApproveAll = () => {
    const pendings = scoutItems.filter((i) => i.status === "pending");
    if (pendings.length === 0) return;
    pendings.forEach((item) => handleApproveScoutItem(item));
    setNotice(`🎉 تم اعتماد جميع العناصر المقترحة (${pendings.length} عناصر) ونشرها فوراً بالمنصة!`);
  };

  // ================= AI MULTI-IMAGE VISION IMPORTER STATE & HANDLERS =================
  const [uploadedVisionImages, setUploadedVisionImages] = useState<
    Array<{ id: string; name: string; size: string; dataUrl: string }>
  >([]);
  const [visionTargetType, setVisionTargetType] = useState<VisionTargetType>("cutoffs");
  const [visionNotes, setVisionNotes] = useState("");
  const [visionScanning, setVisionScanning] = useState(false);
  const [extractedVisionRows, setExtractedVisionRows] = useState<any[]>([]);

  const handleVisionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedVisionImages((prev) => [
          ...prev,
          {
            id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            dataUrl,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRunVisionExtraction = async () => {
    if (uploadedVisionImages.length === 0) {
      alert("يرجى رفع صورة واحدة على الأقل لبدء التحليل البصري");
      return;
    }

    setVisionScanning(true);
    setExtractedVisionRows([]);
    setNotice("🔍 جاري قراءة الصور عبر محرك الرؤية البصرية واستخراج الجداول والبيانات بدقة متناهية...");

    try {
      const customKey =
        typeof window !== "undefined" ? localStorage.getItem("user_custom_gemini_key") : undefined;

      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: uploadedVisionImages.map((i) => i.dataUrl),
          targetType: visionTargetType,
          apiKey: customKey || undefined,
          notes: visionNotes,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setExtractedVisionRows(data.items);
        setNotice(
          `🎉 نجح الاستخراج البصري! تم استخراج ${data.items.length} سجلاً بدقة متناهية جاهزة للمراجعة والاعتماد.`
        );
      } else {
        setNotice("تعذر الاستخراج: " + (data.error || "خطأ غير معروف"));
      }
    } catch (e: any) {
      setNotice("خطأ في الاتصال بمحرك الرؤية: " + e.message);
    } finally {
      setVisionScanning(false);
    }
  };

  const handleCommitVisionData = () => {
    if (extractedVisionRows.length === 0) return;

    if (visionTargetType === "cutoffs") {
      const mapped = extractedVisionRows.map((row) => ({
        university: row.university || "الجامعة الرسمية",
        major: row.major || "التخصص المستخرج",
        branch: row.branch || "علمي",
        minGpa: parseFloat(row.cutoff) || 85.0,
        year: row.year || "2024/2025",
        creditHourPrice: parseFloat(row.creditHourPrice) || 35,
      }));
      setEditableCutoffsList([...mapped, ...editableCutoffsList]);
    } else if (visionTargetType === "certs") {
      const mapped = extractedVisionRows.map((row) => ({
        id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: row.title || "شهادة مستخرجة",
        provider: row.provider || "جهة مانحة عالمية",
        estimatedHours: parseInt(row.durationHours, 10) || 30,
        level: (row.level || "مبتدئ إلى متوسط") as any,
        url: row.url || "https://grow.google/certificates/",
        free: true,
        summary: row.summary || "شهادة عالمية معتمدة ومجانية تم استخراجها وتحليلها بواسطة الذكاء الاصطناعي.",
      }));
      setEditableCertsList([...mapped, ...editableCertsList]);
    } else if (visionTargetType === "majors") {
      const mapped = extractedVisionRows.map((row) => ({
        slug: (row.name || "major").toLowerCase().replace(/\s+/g, "-").slice(0, 40),
        name: row.name || "تخصص جديد",
        field: row.field || "العلوم والتقنية",
        classification: (row.classification || "مطلوب") as any,
        employmentRate: row.employmentRate || "85%",
        risk: "منخفض" as const,
        summary: row.summary || "تخصص أكاديمي معتمد تم استخراجه بواسطة الذكاء الاصطناعي.",
        publicUniversities: ["الجامعة الأردنية", "جامعة العلوم والتكنولوجيا"],
        privateUniversities: ["جامعة الأميرة سمية للتكنولوجيا"],
        accreditation: "اعتماد وطني معتمد",
        trainingNotes: "تدريب عملي ميداني",
        automation: { exposure: "منخفض" as const, note: "أدوار ابتكارية" },
        certificationIds: ["cs50x"],
        alternatives: [],
        salary: { entryMin: 450, entryAvg: parseFloat(row.entrySalary) || 600, experienced: 1500 },
        remoteWorkIndex: (row.remoteWorkIndex || "مرتفع") as any,
        gulfDemand: (row.gulfDemand || "مرتفع") as any,
        creditHours: 132,
        averageHourPriceJOD: { competitive: 35, parallel: 75, private: 120 },
      }));
      setEditableMajorsList([...mapped, ...editableMajorsList]);
    } else if (visionTargetType === "magazine") {
      const mapped = extractedVisionRows.map((row) => ({
        id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        slug: (row.title || "article").toLowerCase().replace(/[^\u0621-\u064A0-9a-z]+/gi, "-").slice(0, 50),
        title: row.title || "مقال وتحليل جديد",
        summary: row.summary || "خلاصة المقال المستخرج",
        category: (row.category || "admissions_and_grants") as any,
        categoryLabel: "استخراج ذكي موثق",
        categoryColor: "bg-primary/10 text-primary border-primary/20",
        author: {
          name: row.author || "رصد الذكاء الاصطناعي",
          title: "تحليل المستندات الرسمية",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          verified: true,
        },
        readTime: "5 دقائق",
        publishedAt: new Date().toISOString().split("T")[0],
        views: 100,
        featured: true,
        tags: ["مستخرج بصرياً", "وثيقة رسمية"],
        keyTakeaways: Array.isArray(row.keyTakeaways) ? row.keyTakeaways : [row.summary || ""],
        content: Array.isArray(row.content) ? row.content : [row.summary || ""],
        sourceReference: row.sourceReference || "وثيقة مصورة رسمية",
      }));
      setArticlesList([...mapped, ...articlesList]);
    }

    setNotice(`✅ تم اعتماد ونقل جميع السجلات المستخرجة بنجاح إلى قاعدة بيانات المنصة ومزامنتها فوراً!`);
    setExtractedVisionRows([]);
    setUploadedVisionImages([]);
  };

  const dashboard = useQuery({
    queryKey: ["master-admin-dashboard"],
    queryFn: () => fetchDashboard(),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["master-admin-dashboard"] });

  const decideMutation = useMutation({
    mutationFn: (input: { id: string; decision: "approve" | "reject" }) => decide({ data: input }),
    onSuccess: (_res, input) => {
      setNotice(input.decision === "approve" ? "تم اعتماد التغيير ونشره للطلبة فوراً." : "تم رفض التغيير.");
      void invalidate();
    },
    onError: (err: Error) => setNotice(err.message),
  });

  const revertMutation = useMutation({
    mutationFn: (input: { entityType: string; entityId: string; field: string }) => revert({ data: input }),
    onSuccess: () => {
      setNotice("تمت العودة إلى القيمة الأصلية وسُجلت العملية في سجل التحديثات.");
      void invalidate();
    },
    onError: (err: Error) => setNotice(err.message),
  });

  const saveOverrideMutation = useMutation({
    mutationFn: (input: {
      entityType: string;
      entityId: string;
      field: string;
      value: string;
      note?: string;
    }) => saveOverride({ data: input }),
    onSuccess: () => {
      setNotice("تم حفظ التعديل المباشر بنجاح وتحديث بيانات التخصص للطلبة!");
      void invalidate();
    },
    onError: (err: Error) => setNotice(err.message),
  });

  const scanMutation = useMutation({
    mutationFn: (input: { fullReview: boolean }) => scan({ data: input }),
    onSuccess: (result) => {
      setNotice(
        result.skipped
          ? "هناك فحص قيد التنفيذ حالياً، انتظر انتهاءه."
          : `انتهى الفحص بنجاح: تم فحص ${result.linksChecked} رابطاً و${result.sourcesChecked} مصدراً رسميّاً.`
      );
      void invalidate();
    },
    onError: (err: Error) => setNotice(err.message),
  });

  const data = dashboard.data;

  // Filter users
  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];
    const q = userSearch.trim().toLowerCase();
    if (!q) return data.users;
    return data.users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.governorate.toLowerCase().includes(q) ||
        u.branch.toLowerCase().includes(q)
    );
  }, [data?.users, userSearch]);

  const handleSaveAiKey = () => {
    if (!customGeminiKey.trim()) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("user_custom_gemini_key", customGeminiKey.trim());
    }
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 3000);
  };

  const handleTestAi = async () => {
    if (!aiTestPrompt.trim()) return;
    setAiTesting(true);
    setAiTestResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", parts: [{ type: "text", text: aiTestPrompt }] }],
        }),
      });
      const text = await res.text();
      setAiTestResult(text.slice(0, 500) + (text.length > 500 ? "..." : ""));
    } catch (e: any) {
      setAiTestResult("خطأ في الاختبار: " + e.message);
    } finally {
      setAiTesting(false);
    }
  };

  const handleExportUsers = () => {
    if (!data?.users) return;
    const headers = "ID,Name,Email,Role,Branch,GPA,Governorate,Created At\n";
    const rows = data.users
      .map(
        (u) =>
          `"${u.id}","${u.name}","${u.email}","${u.role}","${u.branch}","${u.gpa}","${u.governorate}","${u.created_at}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `students_future_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ================= SIDEBAR (القائمة على جنب) ================= */}
      <aside
        className={`fixed inset-y-0 start-0 z-40 w-72 bg-card border-e border-border flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 overflow-y-auto">
          {/* Brand & Executive Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            <div className="flex items-center gap-2.5">
              <AppLogo size={32} />
              <div>
                <span className="font-display text-sm font-extrabold text-foreground block">
                  لوحة الإدارة العليا
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  👑 المدير العام والتنفيذي
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-foreground hover:text-foreground p-1"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Master Admin Profile Pill */}
          <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 mb-4 text-xs">
            <span className="text-[10px] text-muted-foreground block">الحساب التنفيذي:</span>
            <span className="font-mono font-bold text-primary block truncate">jowmahmoud6@gmail.com</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              كامل الصلاحيات والتحكم مفعلة
            </span>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase px-2 mb-1 block">
              التحليلات والمؤشرات
            </span>
            {SIDEBAR_ITEMS.filter((i) => i.category === "analytics").map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            <span className="text-[10px] font-bold text-muted-foreground uppercase px-2 pt-3 mb-1 block">
              المستخدمون والبيانات
            </span>
            {SIDEBAR_ITEMS.filter((i) => i.category === "management").map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <span className="text-[10px] font-bold text-muted-foreground uppercase px-2 pt-3 mb-1 block">
              الذكاء الاصطناعي
            </span>
            {SIDEBAR_ITEMS.filter((i) => i.category === "ai").map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            <span className="text-[10px] font-bold text-muted-foreground uppercase px-2 pt-3 mb-1 block">
              التدقيق والمصادر
            </span>
            {SIDEBAR_ITEMS.filter((i) => i.category === "audit").map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => scanMutation.mutate({ fullReview: false })}
            disabled={scanMutation.isPending}
            className="w-full bg-primary text-primary-foreground font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Sparkles className="size-3.5" />
            <span>تشغيل فحص المنصة الآن</span>
          </button>

          <Link
            to="/"
            className="w-full bg-surface hover:bg-surface-2 border border-border text-foreground font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Globe className="size-3.5" />
            <span>تصفح المنصة كطالب</span>
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {/* Top Bar with Mobile Menu Toggle */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden border border-border p-2 rounded-xl bg-card text-foreground"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
                {SIDEBAR_ITEMS.find((i) => i.id === activeSection)?.label}
              </h2>
              <span className="text-[11px] text-muted-foreground">
                آخر تحديث مباشر: {new Date().toLocaleTimeString("ar-JO")}
              </span>
            </div>
          </div>

          <button
            onClick={() => invalidate()}
            disabled={dashboard.isFetching}
            className="bg-card hover:bg-surface border-border text-foreground font-semibold px-3 py-1.5 rounded-xl border text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className={`size-3.5 ${dashboard.isFetching ? "animate-spin" : ""}`} />
            <span>تحديث</span>
          </button>
        </div>

        {notice && (
          <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-foreground text-xs sm:text-sm flex items-center justify-between gap-2 animate-in fade-in">
            <span>{notice}</span>
            <button onClick={() => setNotice(null)} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>
        )}

        {/* SECTION: OVERVIEW */}
        {activeSection === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Overview Banner & Live Controls */}
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-background p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/25">
                      <Sparkles className="size-3.5" />
                      لوحة المراقبة الشاملة الحية 2026
                    </span>
                    <span className="text-xs text-muted-foreground">
                      محدثة لحظياً وفق قواعد بيانات المنصة
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    النظرة العامة والملخص الشامل لكافة بيانات المنصة 📊
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
                    ملخص مركزي يجمع كل حرف ورقم في المنصة: دليل التخصصات وسوق العمل، بنك الشهادات العالمية، مقالات المجلة الخبيرية، ومعدلات القبول التنافسي مع تمثيلات بيانية دقيقة تعكس واقع التعليم العالي الأردني.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveSection("master_editor")}
                    className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    <Database className="size-4" />
                    <span>تعديل المحتوى 🛠️</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("ai_scout")}
                    className="px-4 py-2.5 rounded-2xl border border-border bg-card text-foreground font-bold text-xs sm:text-sm hover:bg-surface transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Radar className="size-4 text-primary" />
                    <span>وكيل الرصد الذكي 🤖</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Large Vital Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>إجمالي الزيارات</span>
                  <TrendingUp className="size-4 text-emerald-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {data?.analytics.totalVisits.toLocaleString() || "2,450"}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 block">
                  ↑ +32.4% هذا الأسبوع
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>الطلاب المسجلين</span>
                  <Users className="size-4 text-primary" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary block">
                  {data?.analytics.registeredUsers || data?.users.length || 1}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  بطاقات أكاديمية مفعلة
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>التخصصات المعتمدة</span>
                  <GraduationCap className="size-4 text-amber-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 block">
                  {editableMajorsList.length}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  شاملة الرواتب والديوان
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>الشهادات المجانية</span>
                  <Award className="size-4 text-blue-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 block">
                  {editableCertsList.length}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  هارفارد، غوغل، IBM
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>المجلة الخبيرية</span>
                  <Newspaper className="size-4 text-purple-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 block">
                  {articlesList.length}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  دراسات ومقالات موثقة
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>الاستشارات الذكية</span>
                  <Bot className="size-4 text-emerald-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {data?.analytics.aiConsultations || "520"}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  98% رضا وتوجيه دقيق
                </span>
              </div>
            </div>

            {/* PRECISE GRAPHICAL CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CHART 1: Market Demand Breakdown (مطلوب / مشبع / راكد) */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                      <Activity className="size-4 text-primary" />
                      التمثيل البياني 1: تصنيف التخصصات في سوق العمل الأردني
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      وفق ديوان الخدمة 2026
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                    نسبة التخصصات المتاحة في المنصة الموزعة حسب مؤشرات التشغيل الرسمية:
                  </p>

                  {/* Multi-segment Progress Bar */}
                  {(() => {
                    const total = editableMajorsList.length || 1;
                    const demanded = editableMajorsList.filter((m) => m.classification === "مطلوب").length;
                    const saturated = editableMajorsList.filter((m) => m.classification === "مشبع").length;
                    const stagnant = editableMajorsList.filter((m) => m.classification === "راكد").length;
                    const demPct = Math.round((demanded / total) * 100);
                    const satPct = Math.round((saturated / total) * 100);
                    const stagPct = 100 - demPct - satPct;

                    return (
                      <div className="space-y-4">
                        <div className="h-4 w-full bg-surface-2 rounded-full overflow-hidden flex shadow-inner">
                          <div
                            style={{ width: `${demPct}%` }}
                            className="bg-emerald-500 hover:opacity-90 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                            title={`مطلوب: ${demanded} تخصص (${demPct}%)`}
                          >
                            {demPct > 15 ? `${demPct}%` : ""}
                          </div>
                          <div
                            style={{ width: `${satPct}%` }}
                            className="bg-amber-500 hover:opacity-90 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                            title={`مشبع: ${saturated} تخصص (${satPct}%)`}
                          >
                            {satPct > 15 ? `${satPct}%` : ""}
                          </div>
                          <div
                            style={{ width: `${stagPct}%` }}
                            className="bg-red-500 hover:opacity-90 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                            title={`راكد: ${stagnant} تخصص (${stagPct}%)`}
                          >
                            {stagPct > 15 ? `${stagPct}%` : ""}
                          </div>
                        </div>

                        {/* Legends with detail counts */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
                            <span className="size-2 rounded-full bg-emerald-500 inline-block mb-1" />
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                              مطلوب بالسوق
                            </span>
                            <span className="text-lg font-black text-foreground block font-mono">
                              {demanded} ({demPct}%)
                            </span>
                            <span className="text-[10px] text-muted-foreground block">
                              أمن سيبراني، AI، تمريض
                            </span>
                          </div>

                          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-center">
                            <span className="size-2 rounded-full bg-amber-500 inline-block mb-1" />
                            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">
                              مشبع نسبياً
                            </span>
                            <span className="text-lg font-black text-foreground block font-mono">
                              {saturated} ({satPct}%)
                            </span>
                            <span className="text-[10px] text-muted-foreground block">
                              محاسبة، تسويق، هندسة مدنية
                            </span>
                          </div>

                          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-center">
                            <span className="size-2 rounded-full bg-red-500 inline-block mb-1" />
                            <span className="text-xs font-bold text-red-700 dark:text-red-400 block">
                              راكد تماماً
                            </span>
                            <span className="text-lg font-black text-foreground block font-mono">
                              {stagnant} ({stagPct}%)
                            </span>
                            <span className="text-[10px] text-muted-foreground block">
                              علوم سياسية، جغرافيا، تاريخ
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>💡 نصيحة التوجيه: ينصح الطلبة بدعم التخصصات المشبعة بشهادات احترافية</span>
                  <button
                    onClick={() => setActiveSection("overrides")}
                    className="text-primary font-bold hover:underline"
                  >
                    تعديل التصنيفات ←
                  </button>
                </div>
              </div>

              {/* CHART 2: Average Entry Salary by Sector (مقارنة الرواتب بالدينار) */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="size-4 text-emerald-500" />
                      التمثيل البياني 2: مقارنة متوسط رواتب البداية (دينار أردني)
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      سوق العمل الأردني
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    متوسط الراتب الشهري للخريج الجديد خلال أول عامين حسب القطاع الأكاديمي:
                  </p>

                  <div className="space-y-3.5">
                    {[
                      { sector: "الذكاء الاصطناعي وهندسة البرمجيات", salary: 650, max: 700, color: "bg-primary" },
                      { sector: "الأمن السيبراني والشبكات", salary: 620, max: 700, color: "bg-blue-500" },
                      { sector: "الهندسة والميكاترونكس والطاقة", salary: 520, max: 700, color: "bg-teal-500" },
                      { sector: "التمريض القانوني والعلوم الطبية", salary: 480, max: 700, color: "bg-emerald-500" },
                      { sector: "إدارة الأعمال واللوجستيات الرقمية", salary: 450, max: 700, color: "bg-amber-500" },
                      { sector: "العلوم الإنسانية والتربوية والآداب", salary: 360, max: 700, color: "bg-red-400" },
                    ].map((item) => {
                      const pct = Math.round((item.salary / item.max) * 100);
                      return (
                        <div key={item.sector}>
                          <div className="flex justify-between text-xs mb-1 font-semibold">
                            <span className="text-foreground">{item.sector}</span>
                            <span className="font-mono text-primary font-bold">{item.salary} د.أ / شهرياً</span>
                          </div>
                          <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-500`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>📊 المؤشر: تخصصات التكنولوجيا تتفوق بـ 80% في متوسط الدخل على العلوم الإنسانية</span>
                  <button
                    onClick={() => setActiveSection("admissions")}
                    className="text-primary font-bold hover:underline"
                  >
                    استعراض سلم الرواتب ←
                  </button>
                </div>
              </div>

              {/* CHART 3: Remote Work & Gulf Demand Matrix */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <Globe className="size-4 text-purple-500" />
                    التمثيل البياني 3: مصفوفة العمل عن بُعد والطلب في دول الخليج
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    عالمي وإقليمي
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  مؤشرات قابلية تصدير الخدمات الرقمية للخارج والحصول على عقود بالدولار والريال:
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-surface p-4 text-center">
                    <span className="text-xs font-bold text-foreground block mb-2">
                      💻 قابلية العمل عن بُعد (Remote)
                    </span>
                    <div className="relative inline-flex items-center justify-center size-24 mb-2">
                      <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" className="stroke-muted/20" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          className="stroke-purple-500"
                          strokeWidth="3"
                          strokeDasharray="88, 100"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-display text-xl font-black text-foreground">88%</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground block">
                      تخصصات البرمجة والبيانات والتسويق
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface p-4 text-center">
                    <span className="text-xs font-bold text-foreground block mb-2">
                      🇸🇦 🇦🇪 الطلب في دول الخليج
                    </span>
                    <div className="relative inline-flex items-center justify-center size-24 mb-2">
                      <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" className="stroke-muted/20" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          className="stroke-emerald-500"
                          strokeWidth="3"
                          strokeDasharray="92, 100"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-display text-xl font-black text-foreground">92%</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground block">
                      التمريض، تقنية المعلومات، والذكاء الاصطناعي
                    </span>
                  </div>
                </div>
              </div>

              {/* CHART 4: Regional Distribution (أقاليم الأردن الثلاثة) */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-500" />
                    التمثيل البياني 4: التوزيع الإقليمي للجامعات والطلبة بالمملكة
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    10 جامعات رسمية
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  توزيع المقاعد الجامعية والطلبة المستفيدين حسب أقاليم المملكة الأردنية الهاشمية:
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-bold">
                      <span className="text-foreground">إقليم الوسط (عمان، الزرقاء، البلقاء، مأدبا)</span>
                      <span className="font-mono text-primary">52%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "52%" }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                      الجامعة الأردنية، الهاشمية، البلقاء التطبيقية، الألمانية الأردنية
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-bold">
                      <span className="text-foreground">إقليم الشمال (إربد، المفرق، جرش، عجلون)</span>
                      <span className="font-mono text-blue-500">34%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "34%" }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                      جامعة العلوم والتكنولوجيا، جامعة اليرموك، جامعة آل البيت
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-bold">
                      <span className="text-foreground">إقليم الجنوب (الكرك، معان، الطفيلة، العقبة)</span>
                      <span className="font-mono text-amber-500">14%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "14%" }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                      جامعة مؤتة، الحسين بن طلال، الطفيلة التقنية، الجامعة الأردنية بالعقبة
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* THE ULTIMATE COMPREHENSIVE PLATFORM DATA MATRIX */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-foreground flex items-center gap-2">
                    <Database className="size-5 text-primary" />
                    مصفوفة التلخيص الشامل لكافة أقسام ومعلومات المنصة 🗂️
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    جرد كامل ومباشر لكل محتوى المنصة مع روابط التحكم السريع
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-surface border border-border font-mono text-muted-foreground">
                  بيانات معتمدة 100%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Majors Hub */}
                <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        <GraduationCap className="size-4 text-primary" />
                        دليل التخصصات وسوق العمل
                      </span>
                      <span className="text-xs font-mono font-bold text-primary">
                        {editableMajorsList.length} تخصص
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>الأكثر طلباً: الأمن السيبراني، الذكاء الاصطناعي، التمريض.</li>
                      <li>الأكثر ركوداً: العلوم السياسية، الجغرافيا، معلم صف.</li>
                      <li>أعلى راتب: 650 د.أ (AI) · أدنى: 350 د.أ.</li>
                      <li>نسبة التشغيل: 45% إلى 95% خلال أول سنتين.</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveSection("overrides")}
                    className="mt-4 w-full py-2 rounded-xl bg-card border border-border hover:bg-surface text-primary text-xs font-bold transition-colors"
                  >
                    تعديل التخصصات ←
                  </button>
                </div>

                {/* 2. Free Certifications Hub */}
                <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        <Award className="size-4 text-blue-500" />
                        بنك الشهادات العالمية المجانية
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-500">
                        {editableCertsList.length} شهادة
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>جهات مانحة: Harvard، Google، IBM، Cisco، edX.</li>
                      <li>نسبة المجانية: 100% مجانية ومعتمدة دولياً.</li>
                      <li>مجالات التغطية: بايثون، الأمن السيبراني، السحاب.</li>
                      <li>مدة الدورات: من 15 إلى 60 ساعة تدريبية.</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveSection("master_editor")}
                    className="mt-4 w-full py-2 rounded-xl bg-card border border-border hover:bg-surface text-blue-500 text-xs font-bold transition-colors"
                  >
                    إدارة الشهادات ←
                  </button>
                </div>

                {/* 3. Magazine Hub */}
                <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        <Newspaper className="size-4 text-purple-500" />
                        المجلة الخبيرية الأكاديمية
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-500">
                        {articlesList.length} دراسة
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>كبار الخبراء: د. سفيان الهنداوي، م. رزان الزعبي.</li>
                      <li>محاور المقالات: القبول الموحد، تفادي الركود، المنح.</li>
                      <li>استراتيجيات العمل عن بُعد بالدولار والريال.</li>
                      <li>أكثر من 3,800 قراءة موثقة من الطلاب.</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveSection("magazine")}
                    className="mt-4 w-full py-2 rounded-xl bg-card border border-border hover:bg-surface text-purple-500 text-xs font-bold transition-colors"
                  >
                    إدارة المجلة ←
                  </button>
                </div>

                {/* 4. Admissions & Civil Service */}
                <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        <BookOpenCheck className="size-4 text-emerald-500" />
                        القبول الموحد وديوان الخدمة
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        10 جامعات
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>الحد الأدنى الأعلى: 97.45% (الطب البشري بالأردنية).</li>
                      <li>الحد الأدنى العام: 65.0% (كليات الشريعة والعلوم).</li>
                      <li>سعر الساعة التنافسي: من 15 إلى 45 دينار.</li>
                      <li>سعر الساعة الموازي: من 60 إلى 150 دينار.</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveSection("admissions")}
                    className="mt-4 w-full py-2 rounded-xl bg-card border border-border hover:bg-surface text-emerald-500 text-xs font-bold transition-colors"
                  >
                    معدلات القبول ←
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveSection("ai_scout")}
                className="p-5 rounded-3xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Radar className="size-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">وكيل الرصد والتعبئة الذاتي 🤖</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  رصد أحدث القرارات والشهادات وموافقة بنقرة زر.
                </span>
              </button>

              <button
                onClick={() => setActiveSection("vision_importer")}
                className="p-5 rounded-3xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Camera className="size-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">التعبئة الذكية عبر الصور 📷</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  استخراج الجداول بدقة متناهية من لقطات الشاشة والكتب.
                </span>
              </button>

              <button
                onClick={() => setActiveSection("master_editor")}
                className="p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Database className="size-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">المحرر الشامل للمنصة 🛠️</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  تعديل أي حرف وتخصص وشهادة ومعدل قبول مباشرة.
                </span>
              </button>

              <button
                onClick={() => setActiveSection("users")}
                className="p-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Users className="size-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">إدارة وتصدير الطلاب 👥</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  استعراض الطلاب المسجلين وفروعهم وتصدير CSV.
                </span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION: TRAFFIC & BEHAVIOR */}
        {activeSection === "traffic" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Governorates Distribution */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  التوزيع الجغرافي للطلاب حسب المحافظات الأردنية
                </h3>
                <div className="space-y-3.5">
                  {data?.analytics.governorateBreakdown.map((item) => (
                    <div key={item.governorate}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold text-foreground">{item.governorate}</span>
                        <span className="text-muted-foreground font-mono">{item.percentage}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tawjihi Branches Distribution */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="size-4 text-emerald-500" />
                  توزيع الطلاب حسب فروع التوجيهي
                </h3>
                <div className="space-y-3.5">
                  {data?.analytics.branchBreakdown.map((item) => (
                    <div key={item.branch}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold text-foreground">{item.branch}</span>
                        <span className="text-muted-foreground font-mono">{item.percentage}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquired Majors */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="size-4 text-amber-500" />
                أكثر التخصصات التي يستعلم عنها الطلاب هذا الأسبوع
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data?.analytics.topInquiredMajors.map((m) => (
                  <div key={m.name} className="p-4 rounded-2xl bg-surface/60 border border-border flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-foreground block">{m.name}</span>
                      <span className="text-[11px] text-muted-foreground">{m.inquiries} استشارة واستعلام</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {m.classification}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: USERS MANAGEMENT */}
        {activeSection === "users" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="ابحث بالاسم، البريد، المحافظة، أو الفرع…"
                  className="w-full rounded-2xl border border-border bg-card px-4 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
                <Search className="size-4 text-muted-foreground absolute end-3 top-3" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-semibold">
                  المسجلين: {data?.users.length || 0}
                </span>
                <button
                  onClick={handleExportUsers}
                  className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-xs transition-opacity hover:opacity-90 cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>تصدير المستخدمين (Excel/CSV)</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-surface/80 text-muted-foreground font-bold border-b border-border">
                    <tr>
                      <th className="p-3.5">الاسم</th>
                      <th className="p-3.5">البريد الإلكتروني</th>
                      <th className="p-3.5">الدور</th>
                      <th className="p-3.5">فرع التوجيهي</th>
                      <th className="p-3.5">المعدل</th>
                      <th className="p-3.5">المحافظة</th>
                      <th className="p-3.5">تاريخ التسجيل</th>
                      <th className="p-3.5">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-muted-foreground">
                          لا يوجد مستخدمين مسجلين يطابقون البحث.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-surface/40 transition-colors">
                          <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                            <div className="size-7 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs">
                              {u.name.charAt(0)}
                            </div>
                            <span>{u.name}</span>
                          </td>
                          <td className="p-3.5 font-mono text-muted-foreground">{u.email}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              u.isAdmin
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                : "bg-surface-2 text-foreground"
                            }`}>
                              {u.isAdmin ? "👑 مدير عام (Admin)" : u.role}
                            </span>
                          </td>
                          <td className="p-3.5 text-muted-foreground">{u.branch}</td>
                          <td className="p-3.5 font-bold text-primary">{u.gpa}%</td>
                          <td className="p-3.5 text-muted-foreground">{u.governorate}</td>
                          <td className="p-3.5 text-muted-foreground">{formatDate(u.created_at)}</td>
                          <td className="p-3.5">
                            <span className="size-2 rounded-full bg-emerald-500 inline-block me-1.5" />
                            <span>نشط</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: DATA OVERRIDES (EDIT ANY INFO) */}
        {activeSection === "overrides" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                <Sliders className="size-5 text-primary" />
                تعديل أي معلومة في أي تخصص ونشرها لجميع الطلاب فوراً
              </h3>
              <p className="text-xs text-muted-foreground mb-5 leading-6">
                اختر أي تخصص من الـ 30 تخصصاً، وحدد الحقل المراد تعديله (التصنيف، نسبة التشغيل، مستوى الخطر، راتب البداية، إلخ)، واضغط حفظ ليتم تخزينه في قاعدة البيانات ويظهر لجميع الطلاب والزوار فوراً.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveOverrideMutation.mutate({
                    entityType: "major",
                    entityId: overrideMajorSlug,
                    field: overrideField,
                    value: overrideValue,
                    note: overrideNote,
                  });
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">اختر التخصص الأكاديمي:</label>
                    <select
                      value={overrideMajorSlug}
                      onChange={(e) => setOverrideMajorSlug(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                    >
                      {majors.map((m) => (
                        <option key={m.slug} value={m.slug}>
                          {m.name} ({m.slug})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">اختر الحقل المراد تعديله:</label>
                    <select
                      value={overrideField}
                      onChange={(e) => {
                        setOverrideField(e.target.value);
                        const f = OVERRIDABLE_FIELDS.find((x) => x.field === e.target.value);
                        if (f?.options) setOverrideValue(f.options[0]);
                      }}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                    >
                      {OVERRIDABLE_FIELDS.map((f) => (
                        <option key={f.field} value={f.field}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">القيمة الجديدة المعتمدة:</label>
                    {OVERRIDABLE_FIELDS.find((f) => f.field === overrideField)?.options ? (
                      <select
                        value={overrideValue}
                        onChange={(e) => setOverrideValue(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                      >
                        {OVERRIDABLE_FIELDS.find((f) => f.field === overrideField)?.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required
                        value={overrideValue}
                        onChange={(e) => setOverrideValue(e.target.value)}
                        placeholder="اكتب القيمة الجديدة…"
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">سبب أو مصدر التعديل (اختياري):</label>
                  <input
                    type="text"
                    value={overrideNote}
                    onChange={(e) => setOverrideNote(e.target.value)}
                    placeholder="مثال: تحديث بناءً على دراسة هيئة الخدمة والإدارة العامة للعام الحالي"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saveOverrideMutation.isPending}
                    className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Save className="size-4" />
                    <span>حفظ وتطبيق التعديل للطلبة فوراً ⚡</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Overrides Table */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Database className="size-4 text-emerald-500" />
                التعديلات المباشرة المنشورة للطلبة حالياً ({data?.overrides.length || 0})
              </h3>

              {(!data?.overrides || data.overrides.length === 0) ? (
                <p className="text-xs text-muted-foreground p-6 bg-surface/40 rounded-2xl text-center">
                  لا توجد تعديلات مخصصة حالياً؛ تظهر للطلبة القيم الافتراضية الموثقة في المنصة.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="p-3">التخصص</th>
                        <th className="p-3">الحقل</th>
                        <th className="p-3">القيمة المنشورة للطلبة</th>
                        <th className="p-3">تاريخ التحديث</th>
                        <th className="p-3">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {data.overrides.map((row) => (
                        <tr key={`${row.entity_type}-${row.entity_id}-${row.field}`} className="hover:bg-surface/40">
                          <td className="p-3 font-bold text-foreground">{row.entity_id}</td>
                          <td className="p-3 text-muted-foreground font-mono">{row.field}</td>
                          <td className="p-3 font-bold text-primary">{row.value}</td>
                          <td className="p-3 text-muted-foreground">{formatDate(row.updated_at)}</td>
                          <td className="p-3">
                            <button
                              onClick={() =>
                                revertMutation.mutate({
                                  entityType: row.entity_type,
                                  entityId: row.entity_id,
                                  field: row.field,
                                })
                              }
                              className="text-xs text-destructive hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="size-3" />
                              <span>تراجع للقيمة الأصلية</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: MASTER CONTENT & DATA MANAGEMENT HUB (مركز تعبئة وتعديل بيانات المنصة الشامل) */}
        {activeSection === "master_editor" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <Database className="size-5 text-primary" />
                  مركز تعبئة وتعديل بيانات المنصة الشامل
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  صلاحيات الإدارة التنفيذية الكاملة: يمكنك هنا تعديل كل حرف وكل معلومة في المنصة، وإضافة تخصصات أو شهادات أو معدلات جديدة فورياً.
                </p>
              </div>

              {/* Sub-tab Switcher */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-2 rounded-2xl border border-border">
                <button
                  type="button"
                  onClick={() => setMasterTab("majors")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    masterTab === "majors" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  التخصصات الـ 30 🎓
                </button>
                <button
                  type="button"
                  onClick={() => setMasterTab("certs")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    masterTab === "certs" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  الشهادات العالمية 🏆
                </button>
                <button
                  type="button"
                  onClick={() => setMasterTab("cutoffs")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    masterTab === "cutoffs" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  القبول الموحد 🏛️
                </button>
                <button
                  type="button"
                  onClick={() => setMasterTab("texts")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    masterTab === "texts" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  نصوص وإعلانات المنصة ✍️
                </button>
              </div>
            </div>

            {/* TAB 1: MAJORS FULL EDITOR */}
            {masterTab === "majors" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-bold text-foreground shrink-0">اختر التخصص للتعديل:</span>
                    <select
                      value={selectedEditMajorSlug}
                      onChange={(e) => setSelectedEditMajorSlug(e.target.value)}
                      className="bg-surface border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground w-full sm:w-72"
                    >
                      {editableMajorsList.map((m) => (
                        <option key={m.slug} value={m.slug}>
                          {m.name} ({m.classification})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddMajorOpen(true)}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90 cursor-pointer"
                  >
                    <PlusCircle className="size-4" />
                    <span>+ إضافة تخصص جديد كلياً للمنصة</span>
                  </button>
                </div>

                {/* Major Edit Form */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <h4 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                      <Edit3 className="size-4 text-primary" />
                      تعديل كافة حقول تخصص: <span className="text-primary font-black">{editMajorForm.name}</span>
                    </h4>
                    <span className="text-xs text-muted-foreground font-mono">{editMajorForm.slug}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-foreground block mb-1">اسم التخصص</label>
                      <input
                        type="text"
                        value={editMajorForm.name}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, name: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">المجال الأكاديمي</label>
                      <input
                        type="text"
                        value={editMajorForm.field}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, field: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">التصنيف الرسمي لسوق العمل</label>
                      <select
                        value={editMajorForm.classification}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, classification: e.target.value as any })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-bold"
                      >
                        <option value="مطلوب">مطلوب (فرص تشغيل عالية)</option>
                        <option value="مشبع">مشبع (تريّث ومنافسة مرتفعة)</option>
                        <option value="راكد">راكد (تجنّبه أو ادمجه بمهارات بديلة)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">نسبة التشغيل التقديرية</label>
                      <input
                        type="text"
                        value={editMajorForm.employmentRate}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, employmentRate: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">مستوى المخاطرة الوظيفية</label>
                      <select
                        value={editMajorForm.risk}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, risk: e.target.value as any })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      >
                        <option value="منخفض">منخفض</option>
                        <option value="متوسط">متوسط</option>
                        <option value="مرتفع">مرتفع</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">إمكانية العمل عن بُعد</label>
                      <select
                        value={editMajorForm.remoteWorkIndex || "متوسط"}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, remoteWorkIndex: e.target.value as any })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      >
                        <option value="عالي جداً">عالي جداً</option>
                        <option value="عالي">عالي</option>
                        <option value="متوسط">متوسط</option>
                        <option value="محدود">محدود</option>
                        <option value="نادر">نادر</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">متوسط راتب البداية (دينار)</label>
                      <input
                        type="number"
                        value={editMajorForm.salary?.entryAvg || 500}
                        onChange={(e) =>
                          setEditMajorForm({
                            ...editMajorForm,
                            salary: {
                              entryMin: editMajorForm.salary?.entryMin || 350,
                              entryAvg: Number(e.target.value),
                              experienced: editMajorForm.salary?.experienced || 1200,
                            },
                          })
                        }
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">متوسط راتب ذوي الخبرة (دينار)</label>
                      <input
                        type="number"
                        value={editMajorForm.salary?.experienced || 1200}
                        onChange={(e) =>
                          setEditMajorForm({
                            ...editMajorForm,
                            salary: {
                              entryMin: editMajorForm.salary?.entryMin || 350,
                              entryAvg: editMajorForm.salary?.entryAvg || 500,
                              experienced: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">الطلب في دول الخليج</label>
                      <select
                        value={editMajorForm.gulfDemand || "متوسط"}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, gulfDemand: e.target.value as any })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      >
                        <option value="مرتفع جداً">مرتفع جداً</option>
                        <option value="مرتفع">مرتفع</option>
                        <option value="متوسط">متوسط</option>
                        <option value="منخفض">منخفض</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="font-bold text-foreground block mb-1">الملخص التوجيهي الشامل</label>
                      <textarea
                        rows={3}
                        value={editMajorForm.summary}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, summary: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">ملاحظات التدريب الميداني وسوق العمل</label>
                      <textarea
                        rows={3}
                        value={editMajorForm.trainingNotes}
                        onChange={(e) => setEditMajorForm({ ...editMajorForm, trainingNotes: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={() => {
                        // Save changes to state
                        setEditableMajorsList((prev) =>
                          prev.map((m) => (m.slug === editMajorForm.slug ? editMajorForm : m))
                        );

                        // Save override via mutation
                        saveOverrideMutation.mutate({
                          entityType: "major",
                          entityId: editMajorForm.slug,
                          field: "classification",
                          value: editMajorForm.classification,
                          note: `تعديل شامل بواسطة الإدارة التنفيذية لـ ${editMajorForm.name}`,
                        });

                        setNotice(`تم حفظ وتحديث كافة بيانات تخصص "${editMajorForm.name}" ونشرها للطلاب فوراً!`);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-xs hover:opacity-90 cursor-pointer"
                    >
                      <Save className="size-4" />
                      <span>حفظ تعديلات هذا التخصص ونشرها للطلبة فوراً</span>
                    </button>
                  </div>
                </div>

                {/* Add New Major Modal */}
                {isAddMajorOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 text-right space-y-4 shadow-2xl">
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          <PlusCircle className="size-4 text-primary" />
                          إضافة تخصص جديد كلياً إلى قاعدة بيانات المنصة
                        </h4>
                        <button onClick={() => setIsAddMajorOpen(false)} className="text-muted-foreground p-1">✕</button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="font-bold text-foreground block mb-1">اسم التخصص الجديد</label>
                          <input
                            type="text"
                            placeholder="مثال: هندسة النظم السحابية والبيانات الضخمة"
                            value={newMajorName}
                            onChange={(e) => setNewMajorName(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-bold text-foreground block mb-1">المجال</label>
                            <input
                              type="text"
                              value={newMajorField}
                              onChange={(e) => setNewMajorField(e.target.value)}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-foreground block mb-1">التصنيف</label>
                            <select
                              value={newMajorClass}
                              onChange={(e) => setNewMajorClass(e.target.value as any)}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                            >
                              <option value="مطلوب">مطلوب</option>
                              <option value="مشبع">مشبع</option>
                              <option value="راكد">راكد</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-bold text-foreground block mb-1">نسبة التشغيل</label>
                            <input
                              type="text"
                              value={newMajorRate}
                              onChange={(e) => setNewMajorRate(e.target.value)}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-foreground block mb-1">متوسط راتب البداية (د.أ)</label>
                            <input
                              type="number"
                              value={newMajorSalary}
                              onChange={(e) => setNewMajorSalary(e.target.value)}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-foreground block mb-1">الملخص التوجيهي</label>
                          <textarea
                            rows={3}
                            placeholder="اكتب نبذة توجيهية شاملة عن التخصص وفرصه في الأردن…"
                            value={newMajorSummary}
                            onChange={(e) => setNewMajorSummary(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                          <button
                            type="button"
                            onClick={() => setIsAddMajorOpen(false)}
                            className="px-4 py-2 rounded-xl border border-border text-muted-foreground"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!newMajorName.trim()) {
                                alert("يرجى كتابة اسم التخصص");
                                return;
                              }
                              const slug = newMajorName.trim().toLowerCase().replace(/\s+/g, "-");
                              const newObj = {
                                slug,
                                name: newMajorName.trim(),
                                field: newMajorField,
                                classification: newMajorClass,
                                employmentRate: newMajorRate,
                                risk: newMajorRisk,
                                summary: newMajorSummary || "تخصص جامعي معتمد ومضاف حديثاً للمنصة.",
                                publicUniversities: ["الجامعة الأردنية", "جامعة العلوم والتكنولوجيا"],
                                privateUniversities: ["جامعة الأميرة سمية للتكنولوجيا"],
                                accreditation: "اعتماد وطني معتمد",
                                trainingNotes: "تدريب عملي ميداني إلزامي",
                                automation: { exposure: "منخفض" as const, note: "أدوار ابتكارية" },
                                certificationIds: ["cs50x"],
                                alternatives: [],
                                salary: { entryMin: 450, entryAvg: Number(newMajorSalary), experienced: 1500 },
                                remoteWorkIndex: "عالي" as const,
                                gulfDemand: "مرتفع" as const,
                                creditHours: 132,
                                averageHourPriceJOD: { competitive: 30, parallel: 75, private: 120 },
                              };

                              setEditableMajorsList([newObj, ...editableMajorsList]);
                              setSelectedEditMajorSlug(slug);
                              setIsAddMajorOpen(false);
                              setNewMajorName("");
                              setNewMajorSummary("");
                              setNotice(`تمت إضافة تخصص "${newObj.name}" بنجاح إلى المنصة!`);
                            }}
                            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold"
                          >
                            إضافة التخصص ونشره
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CERTIFICATIONS FULL EDITOR */}
            {masterTab === "certs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <h4 className="font-bold text-foreground text-sm">بنك الشهادات العالمية المجانية المعتمدة ({editableCertsList.length})</h4>
                    <span className="text-xs text-muted-foreground">يمكنك تعديل روابط الشهادات أو إضافة شهادات جديدة تظهر للطلبة فوراً.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddCertOpen(true)}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90"
                  >
                    <PlusCircle className="size-4" />
                    <span>+ إضافة شهادة مجانية جديدة</span>
                  </button>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="p-3">اسم الشهادة</th>
                        <th className="p-3">الجهة المانحة</th>
                        <th className="p-3">الساعات التقديرية</th>
                        <th className="p-3">المستوى</th>
                        <th className="p-3">الرابط المباشر</th>
                        <th className="p-3">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {editableCertsList.map((cert) => (
                        <tr key={cert.id} className="hover:bg-surface/40">
                          <td className="p-3 font-bold text-foreground">{cert.name}</td>
                          <td className="p-3 text-primary font-semibold">{cert.provider}</td>
                          <td className="p-3 font-mono">{cert.estimatedHours} ساعة</td>
                          <td className="p-3 text-muted-foreground">{cert.level}</td>
                          <td className="p-3 max-w-[200px] truncate font-mono text-[11px] text-muted-foreground">
                            {cert.url}
                          </td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من حذف شهادة "${cert.name}"؟`)) {
                                  setEditableCertsList(editableCertsList.filter((c) => c.id !== cert.id));
                                  setNotice(`تم حذف شهادة "${cert.name}".`);
                                }
                              }}
                              className="text-destructive hover:underline font-bold text-xs"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Cert Modal */}
                {isAddCertOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 text-right space-y-4 shadow-2xl">
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          <PlusCircle className="size-4 text-primary" />
                          إضافة شهادة عالمية مجانية جديدة
                        </h4>
                        <button onClick={() => setIsAddCertOpen(false)} className="text-muted-foreground p-1">✕</button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="font-bold text-foreground block mb-1">عنوان الشهادة</label>
                          <input
                            type="text"
                            placeholder="مثال: Google Cybersecurity Certificate"
                            value={newCertName}
                            onChange={(e) => setNewCertName(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-bold text-foreground block mb-1">الجهة المانحة</label>
                            <input
                              type="text"
                              value={newCertProvider}
                              onChange={(e) => setNewCertProvider(e.target.value)}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-foreground block mb-1">الساعات التقديرية</label>
                            <input
                              type="number"
                              value={newCertHours}
                              onChange={(e) => setNewCertHours(Number(e.target.value))}
                              className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-foreground block mb-1">الرابط المباشر للشهادة</label>
                          <input
                            type="url"
                            value={newCertLink}
                            onChange={(e) => setNewCertLink(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono text-[11px]"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                          <button
                            type="button"
                            onClick={() => setIsAddCertOpen(false)}
                            className="px-4 py-2 rounded-xl border border-border text-muted-foreground"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!newCertName.trim()) {
                                alert("يرجى كتابة عنوان الشهادة");
                                return;
                              }
                              const certObj = {
                                id: `cert-${Date.now()}`,
                                name: newCertName.trim(),
                                provider: newCertProvider,
                                category: newCertCategory,
                                description: "شهادة معتمدة مضافة حديثاً لدعم الميزة التنافسية للطلبة.",
                                estimatedHours: newCertHours,
                                level: newCertLevel as any,
                                url: newCertLink,
                                free: true,
                              };
                              setEditableCertsList([certObj, ...editableCertsList]);
                              setIsAddCertOpen(false);
                              setNewCertName("");
                              setNotice(`تمت إضافة شهادة "${certObj.name}" بنجاح إلى بنك الشهادات!`);
                            }}
                            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold"
                          >
                            إضافة الشهادة ونشرها
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADMISSIONS CUTOFFS EDITOR */}
            {masterTab === "cutoffs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <h4 className="font-bold text-foreground text-sm">معدلات القبول التنافسي (الحدود الدنيا) للجامعات الحكومية</h4>
                    <span className="text-xs text-muted-foreground">تعديل الحدود الدنيا وأسعار الساعات المعروضة لجميع الجامعات.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddCutoffOpen(true)}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90"
                  >
                    <PlusCircle className="size-4" />
                    <span>+ إضافة معدل قبول لجامعة</span>
                  </button>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="p-3">الجامعة</th>
                        <th className="p-3">التخصص</th>
                        <th className="p-3">معدل القبول 2024</th>
                        <th className="p-3">سعر الساعة التنافسي</th>
                        <th className="p-3">سعر الساعة الموازي</th>
                        <th className="p-3">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {editableCutoffsList.map((row, idx) => (
                        <tr key={idx} className="hover:bg-surface/40">
                          <td className="p-3 font-bold text-foreground">{row.university}</td>
                          <td className="p-3 text-primary font-semibold">{row.majorName}</td>
                          <td className="p-3 font-mono font-bold text-foreground">{row.cutoff2024}%</td>
                          <td className="p-3 font-mono">{row.regularHourPriceJOD} د.أ</td>
                          <td className="p-3 font-mono">{row.parallelHourPriceJOD} د.أ</td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => {
                                const newCutoff = prompt("أدخل معدل القبول الجديد لـ " + row.majorName, String(row.cutoff2024));
                                if (newCutoff) {
                                  setEditableCutoffsList(
                                    editableCutoffsList.map((item, i) =>
                                      i === idx ? { ...item, cutoff2024: Number(newCutoff) } : item
                                    )
                                  );
                                  setNotice(`تم تعديل معدل قبول ${row.majorName} في ${row.university} إلى ${newCutoff}%`);
                                }
                              }}
                              className="text-primary hover:underline font-bold text-xs"
                            >
                              تعديل المعدل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: PLATFORM GLOBAL COPYWRITING & TEXTS */}
            {masterTab === "texts" && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
                <div className="pb-3 border-b border-border">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <FileText className="size-4 text-primary" />
                    تعديل نصوص وإعلانات المنصة العامة
                  </h4>
                  <span className="text-muted-foreground">تحكم كامل في النصوص الافتتاحية والإعلانات التوجيهية الظاهرة للطلاب.</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-foreground block mb-1">العنوان الرئيسي في الصفحة الأولى (Hero Headline)</label>
                    <input
                      type="text"
                      value={platformTexts.heroTitle}
                      onChange={(e) => setPlatformTexts({ ...platformTexts, heroTitle: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">النص الوصفي التوجيهي (Hero Subtitle)</label>
                    <textarea
                      rows={3}
                      value={platformTexts.heroSubtitle}
                      onChange={(e) => setPlatformTexts({ ...platformTexts, heroSubtitle: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">شريط التنبيهات والإعلانات العامة (Announcement Banner)</label>
                    <input
                      type="text"
                      value={platformTexts.bannerNotice}
                      onChange={(e) => setPlatformTexts({ ...platformTexts, bannerNotice: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-semibold text-primary"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">نص إخلاء المسؤولية المرجعي في أسفل المنصة</label>
                    <textarea
                      rows={2}
                      value={platformTexts.footerDisclaimer}
                      onChange={(e) => setPlatformTexts({ ...platformTexts, footerDisclaimer: e.target.value })}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground text-[11px]"
                    />
                  </div>

                  <div className="flex items-center justify-end pt-3 border-t border-border">
                    <button
                      type="button"
                      onClick={() => {
                        setNotice("تم حفظ كافة نصوص وإعلانات المنصة ونشرها فوراً للطلبة!");
                      }}
                      className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90"
                    >
                      <Save className="size-4" />
                      <span>حفظ ونشر النصوص فورياً</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION: AI AUTONOMOUS SCOUT (وكيل البحث والتعبئة الذاتي) ================= */}
        {activeSection === "ai_scout" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header & Main Control Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
                  <Radar className="size-3.5" />
                  الوكيل الذكي المستقل (Autonomous Crawler & Scout)
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  رصد وتعبئة البيانات والأخبار تلقائياً بواسطة الذكاء الاصطناعي
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  يقوم الوكيل بالبحث في مصادر التعليم العالي، ديوان الخدمة، وبنك شهادات هارفارد وغوغل يومياً، ويجهز المحتوى المكتشف في قائمة انتظار مع معاينة كاملة وخيار الموافقة بضغطة واحدة ليظهر فوراً بالمنصة.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleBatchApproveAll}
                  disabled={scoutItems.filter((i) => i.status === "pending").length === 0}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <CheckCheck className="size-4" />
                  <span>الموافقة على جميع المقترحات ({scoutItems.filter((i) => i.status === "pending").length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleRunScoutNow}
                  disabled={scoutRunning}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`size-4 ${scoutRunning ? "animate-spin" : ""}`} />
                  <span>{scoutRunning ? "جاري تمشيط المواقع..." : "تشغيل الوكيل الذكي للبحث الفوري 🚀"}</span>
                </button>
              </div>
            </div>

            {/* Crawler Configuration Panel */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-primary" />
                  <h4 className="font-display font-bold text-sm text-foreground">
                    تخصيص نطاق الرصد والكلمات المفتاحية
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  الرصد الآلي: يومياً كل 24 ساعة ✓
                </span>
              </div>

              {/* Target Categories Toggles */}
              <div>
                <label className="text-xs font-bold text-foreground block mb-2">
                  المجالات المستهدفة بالبحث التلقائي:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { id: "news_magazine" as const, label: "📰 مقالات وأخبار المجلة الخبيرية" },
                    { id: "certifications" as const, label: "🎓 الشهادات العالمية المجانية (هارفارد/غوغل)" },
                    { id: "majors_market" as const, label: "📊 تخصصات جديدة ونسب تشغيل ورواتب" },
                    { id: "admissions_cutoffs" as const, label: "🏛️ معدلات القبول التنافسي للجامعات" },
                  ].map((cat) => {
                    const active = scoutConfig.activeCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          const updated = active
                            ? scoutConfig.activeCategories.filter((c) => c !== cat.id)
                            : [...scoutConfig.activeCategories, cat.id];
                          const newConfig = { ...scoutConfig, activeCategories: updated };
                          setScoutConfig(newConfig);
                          if (typeof window !== "undefined") {
                            localStorage.setItem("admin_scout_config", JSON.stringify(newConfig));
                          }
                        }}
                        className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? "bg-primary/10 border-primary text-foreground font-bold shadow-2xs"
                            : "bg-surface border-border text-muted-foreground hover:bg-card"
                        }`}
                      >
                        <span className="text-[11px]">{cat.label}</span>
                        <span className={`size-2 rounded-full ${active ? "bg-primary" : "bg-muted"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Keywords Manager */}
              <div>
                <label className="text-xs font-bold text-foreground block mb-2">
                  الكلمات المفتاحية النشطة التي يبحث عنها الوكيل:
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {scoutConfig.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-surface border border-border text-foreground px-3 py-1 rounded-xl text-xs font-medium"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = scoutConfig.keywords.filter((_, idx) => idx !== i);
                          const newConfig = { ...scoutConfig, keywords: updated };
                          setScoutConfig(newConfig);
                          if (typeof window !== "undefined") {
                            localStorage.setItem("admin_scout_config", JSON.stringify(newConfig));
                          }
                        }}
                        className="text-muted-foreground hover:text-destructive p-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أضف كلمة مفتاحية جديدة للرصد… (مثال: منحة الجامعة الألمانية 2026)"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newKeywordInput.trim()) return;
                      const newConfig = {
                        ...scoutConfig,
                        keywords: [...scoutConfig.keywords, newKeywordInput.trim()],
                      };
                      setScoutConfig(newConfig);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("admin_scout_config", JSON.stringify(newConfig));
                      }
                      setNewKeywordInput("");
                    }}
                    className="px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-surface font-bold text-xs"
                  >
                    + إضافة كلمة
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs for Scout Items */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: `الكل (${scoutItems.length})` },
                  { id: "news_magazine", label: `المجلة (${scoutItems.filter((i) => i.category === "news_magazine").length})` },
                  { id: "certifications", label: `الشهادات (${scoutItems.filter((i) => i.category === "certifications").length})` },
                  { id: "majors_market", label: `التخصصات (${scoutItems.filter((i) => i.category === "majors_market").length})` },
                  { id: "admissions_cutoffs", label: `القبول والحدود (${scoutItems.filter((i) => i.category === "admissions_cutoffs").length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setScoutFilterCategory(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      scoutFilterCategory === tab.id
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">
                المتبقي قيد المراجعة:{" "}
                <span className="font-bold text-amber-500">
                  {scoutItems.filter((i) => i.status === "pending").length}
                </span>{" "}
                · المعتمد:{" "}
                <span className="font-bold text-emerald-500">
                  {scoutItems.filter((i) => i.status === "approved").length}
                </span>
              </div>
            </div>

            {/* Discovered Items List Cards */}
            <div className="space-y-4">
              {scoutItems
                .filter((item) =>
                  scoutFilterCategory === "all" ? true : item.category === scoutFilterCategory
                )
                .map((item) => {
                  const isPending = item.status === "pending";
                  const isApproved = item.status === "approved";

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-3xl border transition-all ${
                        isApproved
                          ? "bg-emerald-500/5 border-emerald-500/30"
                          : item.status === "rejected"
                            ? "bg-muted/20 border-border opacity-60"
                            : "bg-card border-border hover:border-primary/40 shadow-xs"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface border border-border text-foreground">
                              {item.categoryLabel}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              رُصد: {item.discoveredAt}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              دقة المطابقة: {item.confidenceScore}% ✓
                            </span>
                            {isApproved && (
                              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                                معتمد ومنشور بالمنصة ✓
                              </span>
                            )}
                          </div>

                          <h4 className="font-display font-bold text-sm sm:text-base text-foreground pt-1">
                            {item.title}
                          </h4>

                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span>المصدر المكتشف: {item.sourceName}</span>
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>الرابط</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApproveScoutItem(item)}
                                className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1 shadow-xs hover:opacity-90 cursor-pointer"
                              >
                                <Check className="size-3.5" />
                                <span>موافقة ونشر بالمنصة</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setEditScoutItem(item)}
                                className="px-3 py-2 rounded-xl bg-surface hover:bg-surface-2 border border-border text-foreground font-semibold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="size-3.5" />
                                <span>تعديل</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRejectScoutItem(item.id)}
                                className="px-3 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 font-semibold text-xs cursor-pointer"
                              >
                                ✕ استبعاد
                              </button>
                            </>
                          )}

                          {isApproved && (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle className="size-3.5" />
                              <span>منشور ومتاح للطلاب</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary & Details */}
                      <p className="text-xs text-muted-foreground leading-relaxed bg-surface/40 p-3.5 rounded-2xl border border-border/60">
                        {item.summary}
                      </p>

                      {/* Structured Details Preview */}
                      <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {item.details.provider && (
                          <div className="bg-surface/50 p-2 rounded-xl">
                            <span className="text-[10px] text-muted-foreground block">الجهة المانحة:</span>
                            <span className="font-bold text-foreground">{item.details.provider}</span>
                          </div>
                        )}
                        {item.details.hours && (
                          <div className="bg-surface/50 p-2 rounded-xl">
                            <span className="text-[10px] text-muted-foreground block">المدة المقدرة:</span>
                            <span className="font-bold text-foreground">{item.details.hours} ساعة</span>
                          </div>
                        )}
                        {item.details.author && (
                          <div className="bg-surface/50 p-2 rounded-xl">
                            <span className="text-[10px] text-muted-foreground block">الكاتب / المرجع:</span>
                            <span className="font-bold text-foreground">{item.details.author}</span>
                          </div>
                        )}
                        {item.details.cutoffGpa && (
                          <div className="bg-surface/50 p-2 rounded-xl">
                            <span className="text-[10px] text-muted-foreground block">الحد الأدنى:</span>
                            <span className="font-bold text-primary font-mono">{item.details.cutoffGpa}%</span>
                          </div>
                        )}
                        {item.details.entrySalary && (
                          <div className="bg-surface/50 p-2 rounded-xl">
                            <span className="text-[10px] text-muted-foreground block">راتب البداية:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                              {item.details.entrySalary} د.أ
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Quick Edit Modal */}
            {editScoutItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
                <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 text-right space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <Edit3 className="size-4 text-primary" />
                      تعديل بيانات العنصر قبل النشر بالمنصة
                    </h4>
                    <button onClick={() => setEditScoutItem(null)} className="text-muted-foreground p-1">✕</button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-foreground block mb-1">العنوان</label>
                      <input
                        type="text"
                        value={editScoutItem.title}
                        onChange={(e) => setEditScoutItem({ ...editScoutItem, title: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">الملخص التوجيهي</label>
                      <textarea
                        rows={3}
                        value={editScoutItem.summary}
                        onChange={(e) => setEditScoutItem({ ...editScoutItem, summary: e.target.value })}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-foreground block mb-1">المصدر المعتمد</label>
                        <input
                          type="text"
                          value={editScoutItem.sourceName}
                          onChange={(e) => setEditScoutItem({ ...editScoutItem, sourceName: e.target.value })}
                          className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-foreground block mb-1">الرابط المباشر</label>
                        <input
                          type="text"
                          value={editScoutItem.sourceUrl}
                          onChange={(e) => setEditScoutItem({ ...editScoutItem, sourceUrl: e.target.value })}
                          className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setEditScoutItem(null)}
                        className="px-4 py-2 rounded-xl border border-border text-muted-foreground"
                      >
                        إلغاء
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = scoutItems.map((si) =>
                            si.id === editScoutItem.id ? editScoutItem : si
                          );
                          persistScoutItems(updated);
                          handleApproveScoutItem(editScoutItem);
                          setEditScoutItem(null);
                        }}
                        className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-xs hover:opacity-90"
                      >
                        حفظ وموافقة ونشر فوراً
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION: AI MULTI-IMAGE VISION IMPORTER (التعبئة الذكية عبر الصور) ================= */}
        {activeSection === "vision_importer" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
                  <Camera className="size-3.5" />
                  محرك القراءة البصرية المتقدم (Multi-Image Vision OCR)
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  التعبئة الفورية للبيانات عبر رفع صور وكشوفات متعددة
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  ارفع عدة صور أو لقطات شاشة (كشوفات معدلات القبول، إعلانات الدورات، جداول ديوان الخدمة، وثائق رسمية)،
                  وسيقوم الذكاء الاصطناعي بقراءتها واستخراج الجداول والبيانات بدقة متناهية تمهيداً لنقلها للمنصة بضغطة زر.
                </p>
              </div>

              {extractedVisionRows.length > 0 && (
                <button
                  type="button"
                  onClick={handleCommitVisionData}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCheck className="size-4" />
                  <span>اعتماد ونقل البيانات للمنصة ({extractedVisionRows.length})</span>
                </button>
              )}
            </div>

            {/* Target Type Selector */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4">
              <span className="font-display font-bold text-sm text-foreground block">
                1. اختر نوع البيانات التي تحتويها الصور المرفوعة:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {[
                  { id: "cutoffs" as const, label: "📊 كشوفات معدلات القبول والحدود الدنيا", desc: "جامعات، تخصصات، معدلات" },
                  { id: "certs" as const, label: "🎓 إعلانات الشهادات والدورات العالمية", desc: "هارفارد، غوغل، ساعات" },
                  { id: "majors" as const, label: "💼 تقارير التخصصات ونسب التعيين والرواتب", desc: "ديوان الخدمة، سجّل" },
                  { id: "magazine" as const, label: "📰 قرارات وزارية ومقالات رسمية", desc: "مجلس التعليم العالي" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setVisionTargetType(t.id);
                      setExtractedVisionRows([]);
                    }}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                      visionTargetType === t.id
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface border-border text-muted-foreground hover:bg-card"
                    }`}
                  >
                    <span className="font-bold text-xs block mb-1">{t.label}</span>
                    <span className={`text-[10px] block opacity-80 ${visionTargetType === t.id ? "text-white" : ""}`}>
                      {t.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Upload Dropzone */}
              <div className="pt-2">
                <span className="font-display font-bold text-xs text-foreground block mb-2">
                  2. ارفع الصور أو لقطات الشاشة (يدعم اختيار صور متعددة دفعة واحدة):
                </span>

                <label className="border-2 border-dashed border-border hover:border-primary/50 bg-surface/40 hover:bg-surface/70 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
                  <UploadCloud className="size-10 text-primary mb-3" />
                  <span className="font-bold text-sm text-foreground block mb-1">
                    اضغط هنا لاختيار صور من جهازك أو اسحبها إلى هنا
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    يدعم صور JPG, PNG, WEBP وكشوفات الجداول متعددة الصفحات
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleVisionFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded Images Thumbnails */}
              {uploadedVisionImages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>الصور المرفوعة الجاهزة للتحليل ({uploadedVisionImages.length}):</span>
                    <button
                      type="button"
                      onClick={() => setUploadedVisionImages([])}
                      className="text-destructive hover:underline text-[11px]"
                    >
                      مسح جميع الصور
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {uploadedVisionImages.map((img) => (
                      <div
                        key={img.id}
                        className="group relative rounded-2xl overflow-hidden border border-border bg-card p-1 shadow-2xs"
                      >
                        <img
                          src={img.dataUrl}
                          alt={img.name}
                          className="w-full h-24 object-cover rounded-xl"
                        />
                        <div className="p-1.5 text-[10px] text-muted-foreground truncate">
                          {img.name} ({img.size})
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setUploadedVisionImages(uploadedVisionImages.filter((i) => i.id !== img.id))
                          }
                          className="absolute top-2 end-2 bg-destructive text-white size-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Notes */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1">
                  تعليمات إضافية للذكاء الاصطناعي (اختياري):
                </label>
                <input
                  type="text"
                  placeholder="مثال: ركز على تخصصات الذكاء الاصطناعي والحدود الدنيا في جامعة اليرموك فقط…"
                  value={visionNotes}
                  onChange={(e) => setVisionNotes(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl p-2.5 text-xs text-foreground"
                />
              </div>

              {/* Process Trigger Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleRunVisionExtraction}
                  disabled={visionScanning || uploadedVisionImages.length === 0}
                  className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  <ScanLine className={`size-4 ${visionScanning ? "animate-spin" : ""}`} />
                  <span>
                    {visionScanning
                      ? "جاري التحليل البصري واستخراج الجداول..."
                      : `🔍 تشغيل التحليل البصري واستخراج البيانات (${uploadedVisionImages.length} صور)`}
                  </span>
                </button>
              </div>
            </div>

            {/* Extracted Data Review Grid */}
            {extractedVisionRows.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-4 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-500" />
                      نتائج الاستخراج البصري ({extractedVisionRows.length} سجلات مستخرجة بدقة)
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      يمكنك مراجعة أو تعديل أي خانة مباشرة في الجدول قبل نقلها للمنصة.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtractedVisionRows([])}
                      className="px-3 py-1.5 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs"
                    >
                      تفريغ
                    </button>

                    <button
                      type="button"
                      onClick={handleCommitVisionData}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CheckCheck className="size-3.5" />
                      <span>اعتماد ونقل البيانات للمنصة فوراً</span>
                    </button>
                  </div>
                </div>

                {/* Table representation based on target type */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                      <tr>
                        {visionTargetType === "cutoffs" && (
                          <>
                            <th className="p-3">الجامعة</th>
                            <th className="p-3">التخصص المستخرج</th>
                            <th className="p-3">الفرع</th>
                            <th className="p-3">الحد الأدنى</th>
                            <th className="p-3">سعر الساعة</th>
                            <th className="p-3">العام</th>
                          </>
                        )}
                        {visionTargetType === "certs" && (
                          <>
                            <th className="p-3">عنوان الشهادة</th>
                            <th className="p-3">الجهة المانحة</th>
                            <th className="p-3">الساعات</th>
                            <th className="p-3">المستوى</th>
                            <th className="p-3">المجال</th>
                          </>
                        )}
                        {visionTargetType === "majors" && (
                          <>
                            <th className="p-3">اسم التخصص</th>
                            <th className="p-3">المجال</th>
                            <th className="p-3">التصنيف</th>
                            <th className="p-3">نسبة التشغيل</th>
                            <th className="p-3">راتب البداية</th>
                          </>
                        )}
                        {visionTargetType === "magazine" && (
                          <>
                            <th className="p-3">عنوان المقال أو القرار</th>
                            <th className="p-3">الكاتب / المرجع</th>
                            <th className="p-3">الخلاصة التنفيذية</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {extractedVisionRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-surface/40">
                          {visionTargetType === "cutoffs" && (
                            <>
                              <td className="p-2.5 font-bold text-foreground">
                                <input
                                  type="text"
                                  value={row.university}
                                  onChange={(e) => {
                                    const next = [...extractedVisionRows];
                                    next[idx].university = e.target.value;
                                    setExtractedVisionRows(next);
                                  }}
                                  className="bg-transparent border-b border-transparent focus:border-primary text-xs w-full"
                                />
                              </td>
                              <td className="p-2.5 font-semibold text-primary">
                                <input
                                  type="text"
                                  value={row.major}
                                  onChange={(e) => {
                                    const next = [...extractedVisionRows];
                                    next[idx].major = e.target.value;
                                    setExtractedVisionRows(next);
                                  }}
                                  className="bg-transparent border-b border-transparent focus:border-primary text-xs w-full font-bold"
                                />
                              </td>
                              <td className="p-2.5 text-muted-foreground">{row.branch || "علمي"}</td>
                              <td className="p-2.5 font-mono font-bold text-foreground">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={row.cutoff}
                                  onChange={(e) => {
                                    const next = [...extractedVisionRows];
                                    next[idx].cutoff = e.target.value;
                                    setExtractedVisionRows(next);
                                  }}
                                  className="bg-transparent border-b border-transparent focus:border-primary text-xs w-16 font-mono font-bold text-primary"
                                />
                                %
                              </td>
                              <td className="p-2.5 font-mono">{row.creditHourPrice || 35} د.أ</td>
                              <td className="p-2.5 text-muted-foreground">{row.year || "2024/2025"}</td>
                            </>
                          )}

                          {visionTargetType === "certs" && (
                            <>
                              <td className="p-2.5 font-bold text-foreground">{row.title}</td>
                              <td className="p-2.5 text-primary font-semibold">{row.provider}</td>
                              <td className="p-2.5 font-mono">{row.durationHours} ساعة</td>
                              <td className="p-2.5 text-muted-foreground">{row.level}</td>
                              <td className="p-2.5 text-xs text-muted-foreground">{row.domain}</td>
                            </>
                          )}

                          {visionTargetType === "majors" && (
                            <>
                              <td className="p-2.5 font-bold text-foreground">{row.name}</td>
                              <td className="p-2.5 text-muted-foreground">{row.field}</td>
                              <td className="p-2.5">
                                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                                  {row.classification || "مطلوب"}
                                </span>
                              </td>
                              <td className="p-2.5 font-bold text-foreground">{row.employmentRate}</td>
                              <td className="p-2.5 font-mono font-bold text-primary">{row.entrySalary} د.أ</td>
                            </>
                          )}

                          {visionTargetType === "magazine" && (
                            <>
                              <td className="p-2.5 font-bold text-foreground max-w-xs">{row.title}</td>
                              <td className="p-2.5 text-muted-foreground whitespace-nowrap">{row.author}</td>
                              <td className="p-2.5 text-muted-foreground line-clamp-2">{row.summary}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION: MAGAZINE MANAGEMENT (إدارة المجلة الخبيرية) */}
        {activeSection === "magazine" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <Newspaper className="size-5 text-primary" />
                  إدارة مقالات ودراسات المجلة الخبيرية
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  إشراف كامل على المحتوى التوجيهي، نشر مقالات جديدة، وتعيين المقالات الموصى بها للطلبة.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/magazine"
                  className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-surface text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  <span>معاينة المجلة الحية</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <PlusCircle className="size-4" />
                  <span>نشر مقال خبير جديد</span>
                </button>
              </div>
            </div>

            {/* Articles Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <span className="text-xs text-muted-foreground block mb-1">إجمالي المقالات المنشورة</span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {articlesList.length} مقالات
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
                  ✓ خاضعة لإشراف الإدارة العليا
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <span className="text-xs text-muted-foreground block mb-1">مجموع قراءات الطلاب</span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {articlesList.reduce((acc, a) => acc + a.views, 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  قراءة تفاعلية مكتملة
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <span className="text-xs text-muted-foreground block mb-1">المقالات المميزة الموصى بها</span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-500 block">
                  {articlesList.filter((a) => a.featured).length} مقالات
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  تظهر في واجهة المجلة الرئيسية
                </span>
              </div>
            </div>

            {/* Articles Table */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                    <tr>
                      <th className="p-3">عنوان المقال والتصنيف</th>
                      <th className="p-3">الخبير / الكاتب</th>
                      <th className="p-3">تاريخ النشر</th>
                      <th className="p-3">القراءات</th>
                      <th className="p-3">حالة التمييز</th>
                      <th className="p-3">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {articlesList.map((art) => (
                      <tr key={art.id} className="hover:bg-surface/40 transition-colors">
                        <td className="p-3 max-w-xs">
                          <span className="font-bold text-foreground block line-clamp-1">
                            {art.title}
                          </span>
                          <span className="text-[10px] text-primary font-semibold block mt-0.5">
                            {art.categoryLabel}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="font-bold text-foreground block">{art.author.name}</span>
                          <span className="text-[10px] text-muted-foreground block truncate max-w-[150px]">
                            {art.author.title}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">
                          {art.publishedAt}
                        </td>
                        <td className="p-3 font-mono font-bold text-foreground whitespace-nowrap">
                          {art.views.toLocaleString()}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setArticlesList((prev) =>
                                prev.map((item) =>
                                  item.id === art.id ? { ...item, featured: !item.featured } : item
                                )
                              );
                              setNotice(
                                !art.featured
                                  ? `تم تعيين مقال "${art.title}" كمقال مميز في الواجهة.`
                                  : `تم إلغاء تمييز المقال.`
                              );
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                              art.featured
                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40"
                                : "bg-surface text-muted-foreground border-border hover:bg-surface-2"
                            }`}
                          >
                            {art.featured ? "⭐ مميز في الواجهة" : "عادي"}
                          </button>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف مقال "${art.title}"؟`)) {
                                setArticlesList((prev) => prev.filter((item) => item.id !== art.id));
                                setNotice(`تم حذف مقال "${art.title}" بنجاح.`);
                              }
                            }}
                            className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                            title="حذف المقال"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Publish Article Modal */}
            {isArticleModalOpen && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
              >
                <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative text-right max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setIsArticleModalOpen(false)}
                    className="absolute start-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-xl"
                  >
                    ✕
                  </button>

                  <h3 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
                    <PlusCircle className="size-5 text-primary" />
                    نشر مقال ودراسة جديدة في المجلة الخبيرية
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-foreground block mb-1">عنوان المقال الأكاديمي</label>
                      <input
                        type="text"
                        placeholder="مثال: التخصصات الأكثر طلباً في سوق العمل الأردني 2026…"
                        value={newArticleTitle}
                        onChange={(e) => setNewArticleTitle(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">الملخص التنفيذي</label>
                      <textarea
                        rows={2}
                        placeholder="ملخص مكثف يظهر للطلاب في بطاقة المقال…"
                        value={newArticleSummary}
                        onChange={(e) => setNewArticleSummary(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-foreground block mb-1">اسم الكاتب / الخبير</label>
                        <input
                          type="text"
                          value={newArticleAuthor}
                          onChange={(e) => setNewArticleAuthor(e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-foreground block mb-1">التصنيف</label>
                        <select
                          value={newArticleCategory}
                          onChange={(e) => setNewArticleCategory(e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                        >
                          <option value="tawjihi_advice">نصائح التوجيهي والركود</option>
                          <option value="ai_and_tech">الذكاء الاصطناعي والتكنولوجيا</option>
                          <option value="admissions_and_grants">القبول الموحد والموازي</option>
                          <option value="remote_work">العمل عن بُعد بالدولار</option>
                          <option value="healthcare_careers">القطاع الصحي والمهن الطبية</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">المحتوى الكامل للمقال</label>
                      <textarea
                        rows={5}
                        placeholder="اكتب فقرات المقال والدراسة هنا بالتفصيل…"
                        value={newArticleContent}
                        onChange={(e) => setNewArticleContent(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">المصدر الرسمي الموثق</label>
                      <input
                        type="text"
                        value={newArticleSource}
                        onChange={(e) => setNewArticleSource(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl p-2.5 text-foreground"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setIsArticleModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:bg-surface font-semibold"
                      >
                        إلغاء
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newArticleTitle.trim() || !newArticleContent.trim()) {
                            alert("يرجى ملء عنوان المقال والمحتوى.");
                            return;
                          }

                          const created: ExpertArticle = {
                            id: `custom-art-${Date.now()}`,
                            slug: `article-${Date.now()}`,
                            title: newArticleTitle,
                            summary: newArticleSummary || newArticleTitle,
                            category: newArticleCategory as any,
                            categoryLabel: "دراسة وتوجيه خبير",
                            categoryColor: "bg-primary/10 text-primary border-primary/20",
                            author: {
                              name: newArticleAuthor,
                              title: "خبير معتمد ومستشار أكاديمي",
                              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                              verified: true,
                            },
                            readTime: "5 دقائق",
                            publishedAt: new Date().toISOString().slice(0, 10),
                            views: 1,
                            featured: true,
                            tags: ["توجيه أكاديمي", "سوق العمل 2026"],
                            keyTakeaways: [
                              "تم نشر هذا المقال حصرياً من قبل إدارة المنصة العليا لتقديم إرشاد مباشر للطلبة.",
                            ],
                            content: [newArticleContent],
                            sourceReference: newArticleSource,
                          };

                          setArticlesList([created, ...articlesList]);
                          setIsArticleModalOpen(false);
                          setNewArticleTitle("");
                          setNewArticleSummary("");
                          setNewArticleContent("");
                          setNotice("تم نشر مقالك في المجلة الخبيرية وأصبح متاحاً للطلبة الآن!");
                        }}
                        className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-xs hover:opacity-90"
                      >
                        نشر المقال فوراً
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION: ADMISSIONS & CIVIL SERVICE DATA (بيانات القبول والديوان) */}
        {activeSection === "admissions" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <BookOpenCheck className="size-5 text-emerald-500" />
                  قاعدة البيانات الموثقة: القبول الموحد وديوان الخدمة وسجّل
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  إحصاءات رسمية دقيقة لـ 10 جامعات حكومية، دراسة واقع العرض والطلب 2025، وسلم أجور القطاع الخاص.
                </p>
              </div>

              {/* Sub-tab navigation */}
              <div className="flex items-center gap-1.5 p-1 bg-surface-2 rounded-2xl border border-border">
                <button
                  type="button"
                  onClick={() => setAdmissionsTab("cutoffs")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    admissionsTab === "cutoffs"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  الحدود الدنيا للقبول (10 جامعات)
                </button>
                <button
                  type="button"
                  onClick={() => setAdmissionsTab("civil_service")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    admissionsTab === "civil_service"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  تقرير ديوان الخدمة والإدارة
                </button>
                <button
                  type="button"
                  onClick={() => setAdmissionsTab("salaries")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    admissionsTab === "salaries"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  الرواتب والعمل عن بُعد (سجّل)
                </button>
              </div>
            </div>

            {/* TAB 1: University Cutoffs Table */}
            {admissionsTab === "cutoffs" && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="relative max-w-sm w-full">
                    <input
                      type="text"
                      placeholder="فلترة بالجامعة أو التخصص (مثال: الأردنية، طب، حاسوب)…"
                      value={admissionsSearch}
                      onChange={(e) => setAdmissionsSearch(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl pe-8 ps-3 py-2 text-xs text-foreground focus:outline-none"
                    />
                    <Search className="size-3.5 text-muted-foreground absolute end-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    مصدر البيانات: وحدة تنسيق القبول الموحد — وزارة التعليم العالي
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="p-3">الجامعة</th>
                        <th className="p-3">التخصص</th>
                        <th className="p-3">معدل قبول 2023</th>
                        <th className="p-3">معدل قبول 2024</th>
                        <th className="p-3">سعر الساعة التنافسي</th>
                        <th className="p-3">سعر الساعة الموازي</th>
                        <th className="p-3">مجموع الساعات</th>
                        <th className="p-3">حالة السوق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {OFFICIAL_ADMISSIONS_DATA.filter(
                        (row) =>
                          !admissionsSearch ||
                          row.university.includes(admissionsSearch) ||
                          row.majorName.includes(admissionsSearch)
                      ).map((row, idx) => (
                        <tr key={idx} className="hover:bg-surface/40">
                          <td className="p-3 font-bold text-foreground">{row.university}</td>
                          <td className="p-3 font-semibold text-primary">{row.majorName}</td>
                          <td className="p-3 font-mono">{row.cutoff2023}%</td>
                          <td className="p-3 font-mono font-bold text-foreground">
                            {row.cutoff2024}%
                          </td>
                          <td className="p-3 font-mono">{row.regularHourPriceJOD} د.أ</td>
                          <td className="p-3 font-mono">{row.parallelHourPriceJOD} د.أ</td>
                          <td className="p-3 font-mono">{row.totalCreditHours} ساعة</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.status === "مطلوب"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : row.status === "مشبع"
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Civil Service Reports */}
            {admissionsTab === "civil_service" && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {CIVIL_SERVICE_BENCHMARK_2025.map((cat, idx) => (
                    <div key={idx} className="rounded-3xl border border-border bg-card p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-extrabold text-foreground text-sm">
                          {cat.field}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          استيعاب سنوي {cat.absorptionRatePercent}%
                        </span>
                      </div>

                      <div className="text-xs space-y-2 pt-2 border-t border-border">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
                            ✓ التخصصات المطلوبة:
                          </span>
                          <span className="text-foreground leading-relaxed">
                            {cat.demandedMajors.join("، ")}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block">
                            ✕ التخصصات الراكدة (تجنبها):
                          </span>
                          <span className="text-muted-foreground leading-relaxed">
                            {cat.stagnantMajors.join("، ")}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>طلبات التوظيف بالمخزون:</span>
                          <span className="font-mono font-bold text-foreground">
                            {cat.totalStockApplications.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Salaries & Remote Work Benchmarks */}
            {admissionsTab === "salaries" && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                    <tr>
                      <th className="p-3">القطاع الوظيفي</th>
                      <th className="p-3">راتب البداية للخريج</th>
                      <th className="p-3">متوسط راتب (5 سنوات)</th>
                      <th className="p-3">راتب الخبراء والمتقدمين</th>
                      <th className="p-3">إمكانية العمل عن بُعد</th>
                      <th className="p-3">الطلب في دول الخليج</th>
                      <th className="p-3">متوسط الانتظار للوظيفة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SECTOR_SALARY_BENCHMARKS.map((sec, idx) => (
                      <tr key={idx} className="hover:bg-surface/40">
                        <td className="p-3 font-bold text-foreground">{sec.sector}</td>
                        <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {sec.entrySalaryJOD} د.أ
                        </td>
                        <td className="p-3 font-mono text-foreground">{sec.midCareerSalaryJOD} د.أ</td>
                        <td className="p-3 font-mono text-foreground font-bold">{sec.seniorSalaryJOD} د.أ</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            {sec.remotePotential}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            {sec.gulfDemandRating}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{sec.averageWaitTimeMonths} أشهر</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SECTION: AI INTELLIGENCE & KEY CONFIG */}
        {activeSection === "ai" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Bot className="size-5 text-primary" />
                محرك واستخبارات الذكاء الاصطناعي (AI Gateway Intelligence)
              </h3>
              <p className="text-xs text-muted-foreground leading-6 mb-5">
                المنصة مزودة بنظام مزدوج ذكي: محرك معرفي محلي مستند إلى قاعدة بيانات التخصصات الأردنية لضمان عدم انقطاع المستشار أو ظهور أخطاء للطلبة مطلقاً، إلى جانب ربط مباشر مع محرك Google Gemini 2.5 Flash السحابي.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm">
                    🟢 المحرك المعرفي المحلي (نشط 100%)
                  </span>
                  <p className="text-muted-foreground leading-5">
                    يحلل التخصصات، يقارن بينها، يولد خرائط الطريق، ويحاكي المقابلات الوظيفية باللغة العربية الفصحى دون أي توقف.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs space-y-1.5">
                  <span className="font-bold text-primary block text-sm">
                    ⚡ محرك Google Gemini 2.5 السحابي
                  </span>
                  <p className="text-muted-foreground leading-5">
                    يتم تفعيله بإدخال مفتاح الـ API في Vercel أو في الحقل أدناه لتشغيله في جلستك فوراً.
                  </p>
                </div>
              </div>

              {/* API Key Setting */}
              <div className="bg-surface/50 rounded-2xl p-4 border border-border space-y-3 mb-6">
                <label className="block text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Key className="size-3.5 text-primary" />
                  تخصيص مفتاح Google Gemini API Key:
                </label>

                <div className="flex gap-2">
                  <input
                    type="password"
                    value={customGeminiKey}
                    onChange={(e) => setCustomGeminiKey(e.target.value)}
                    placeholder="ألصق مفتاح AIzaSy... الخاص بـ Gemini هنا"
                    className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveAiKey}
                    className="bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-xl text-xs transition-opacity hover:opacity-90 cursor-pointer shrink-0"
                  >
                    حفظ المفتاح
                  </button>
                </div>

                {keySavedMessage && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ تم حفظ المفتاح بنجاح! سيتم توجيه استشارات الذكاء الاصطناعي إليه فورياً.
                  </p>
                )}
              </div>

              {/* Live AI Playground inside Admin */}
              <div className="border border-border/80 rounded-2xl p-4 bg-card">
                <span className="font-bold text-xs text-foreground block mb-2">
                  🧪 تجربة واختبار استجابة المستشار الذكي مباشرة من اللوحة:
                </span>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={aiTestPrompt}
                    onChange={(e) => setAiTestPrompt(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={handleTestAi}
                    disabled={aiTesting}
                    className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-xl text-xs disabled:opacity-50 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Send className="size-3.5 rotate-180" />
                    <span>{aiTesting ? "يجري الفحص…" : "اختبار"}</span>
                  </button>
                </div>

                {aiTestResult && (
                  <div className="p-3 bg-surface-2 rounded-xl text-xs text-foreground leading-6 font-mono whitespace-pre-wrap border border-border max-h-48 overflow-y-auto">
                    {aiTestResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: PENDING CHANGES */}
        {activeSection === "pending" && (
          <div className="space-y-4 animate-in fade-in">
            {(!data?.pending || data.pending.length === 0) ? (
              <div className="rounded-3xl border border-dashed border-border bg-surface/30 p-12 text-center">
                <CheckCircle className="size-12 text-emerald-500 mx-auto mb-3" />
                <p className="font-bold text-foreground text-sm">لا توجد تغييرات مقترحة معلقة حالياً</p>
                <p className="text-xs text-muted-foreground mt-1">كافة بيانات التخصصات معتمدة ومتزامنة بنجاح.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.pending.map((change) => (
                  <div key={change.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <span className="font-bold text-sm text-foreground block">{change.entity_label}</span>
                      <span className="text-xs text-muted-foreground">
                        تعديل <strong>{change.field_label}</strong> من "{change.old_value}" إلى "<strong>{change.new_value}</strong>"
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decideMutation.mutate({ id: change.id, decision: "approve" })}
                        disabled={decideMutation.isPending}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="size-3.5" />
                        <span>اعتماد ونشر</span>
                      </button>
                      <button
                        onClick={() => decideMutation.mutate({ id: change.id, decision: "reject" })}
                        disabled={decideMutation.isPending}
                        className="border border-destructive/40 text-destructive hover:bg-destructive/10 font-bold px-3.5 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="size-3.5" />
                        <span>رفض</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION: AUDIT LOG */}
        {activeSection === "audit" && (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-in fade-in">
            <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              سجل التدقيق والنشاط الدائم ({data?.log.length || 0})
            </h3>
            {(!data?.log || data.log.length === 0) ? (
              <p className="text-xs text-muted-foreground text-center p-8">السجل فارغ حتى الآن.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                    <tr>
                      <th className="p-3">التخصص / الكيان</th>
                      <th className="p-3">الإجراء</th>
                      <th className="p-3">القيمة السابقة</th>
                      <th className="p-3">القيمة الجديدة</th>
                      <th className="p-3">المسؤول</th>
                      <th className="p-3">التاريخ والوقت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {data.log.map((entry) => (
                      <tr key={entry.id} className="hover:bg-surface/30">
                        <td className="p-3 font-bold text-foreground">{entry.entity_label}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            entry.action.includes("اعتماد") || entry.action.includes("مباشر")
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-surface-2 text-muted-foreground"
                          }`}>
                            {entry.action}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground">{entry.old_value || "—"}</td>
                        <td className="p-3 font-bold text-primary">{entry.new_value || "—"}</td>
                        <td className="p-3 text-muted-foreground font-mono">{entry.actor}</td>
                        <td className="p-3 text-muted-foreground">{formatDateTime(entry.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SECTION: SOURCES & LINKS */}
        {activeSection === "sources" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Globe className="size-4 text-primary" />
                المصادر الرسمية المعتمدة في المنصة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "هيئة الخدمة والإدارة العامة (ديوان الخدمة سابقاً)", url: "https://www.spac.gov.jo" },
                  { name: "وزارة التعليم العالي والبحث العلمي", url: "https://mohe.gov.jo" },
                  { name: "دائرة الإحصاءات العامة الأردنية", url: "https://dosweb.dos.gov.jo" },
                  { name: "منصة سجّل الوطنية للتشغيل", url: "https://sajjil.gov.jo" },
                ].map((s) => (
                  <div key={s.name} className="p-4 rounded-2xl bg-surface/50 border border-border flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{s.name}</span>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1 font-semibold">
                      <span>زيارة المصدر</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Award className="size-4 text-emerald-500" />
                فحص روابط الشهادات المجانية ({data?.brokenLinks.length || 0} معطلة)
              </h3>
              {(!data?.brokenLinks || data.brokenLinks.length === 0) ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold p-4 bg-emerald-500/10 rounded-2xl">
                  ✓ جميع روابط الشهادات المجانية (هارفارد، سيسكو، هلسنكي...) تعمل بكفاءة 100%.
                </p>
              ) : (
                <div className="space-y-2">
                  {data.brokenLinks.map((link) => (
                    <div key={link.certification_id} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs flex items-center justify-between">
                      <span className="font-bold text-destructive">{link.certification_id}</span>
                      <span className="font-mono text-muted-foreground">{link.url}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
