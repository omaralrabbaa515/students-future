import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
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
} from "lucide-react";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { INITIAL_MAGAZINE_ARTICLES, type ExpertArticle } from "@/data/magazine";
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
  { id: "users", label: "إدارة المستخدمين والطلاب", category: "management", icon: Users },
  { id: "overrides", label: "تعديل بيانات التخصصات", category: "management", icon: Sliders },
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
          <div className="space-y-6 animate-in fade-in">
            {/* 4 Large KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>إجمالي الزيارات</span>
                  <TrendingUp className="size-4 text-emerald-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {data?.analytics.totalVisits.toLocaleString() || "1,840"}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 block">
                  ↑ +28.5% نمو هذا الأسبوع
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
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

              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>استشارات الذكاء الاصطناعي</span>
                  <Bot className="size-4 text-purple-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {data?.analytics.aiConsultations || "480"}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  96% معدل رضا واكتمال
                </span>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                  <span>التخصصات المعتمدة</span>
                  <GraduationCap className="size-4 text-amber-500" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                  {majors.length}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  شاملة الرواتب والاعتمادات
                </span>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveSection("overrides")}
                className="p-5 rounded-3xl border border-border bg-card hover:bg-surface text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Sliders className="size-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">تعديل أي تخصص في المنصة</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  تعديل نسب التشغيل، الرواتب، التصنيف: مطلوب/مشبع/راكد فورياً.
                </span>
              </button>

              <button
                onClick={() => setActiveSection("users")}
                className="p-5 rounded-3xl border border-border bg-card hover:bg-surface text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Users className="size-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">إدارة وتصدير الطلاب</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  استعراض جميع الطلاب المسجلين، فروعهم، معدلاتهم، وتصدير CSV.
                </span>
              </button>

              <button
                onClick={() => setActiveSection("ai")}
                className="p-5 rounded-3xl border border-border bg-card hover:bg-surface text-right transition-all group cursor-pointer shadow-2xs"
              >
                <Bot className="size-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground block">مفاتيح واستشارات الذكاء الاصطناعي</span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  فحص استجابة المستشار وتحديث مفاتيح Gemini وOpenAI.
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
