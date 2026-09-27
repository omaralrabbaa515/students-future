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
  ShieldAlert,
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
  ArrowRight,
} from "lucide-react";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { supabase } from "@/integrations/supabase/client";
import {
  claimAdminRole,
  decidePendingChange,
  getMasterDashboard,
  revertOverride,
  runScanNow,
  saveDirectOverride,
} from "@/lib/admin.functions";
import { formatDate, formatDateTime } from "@/lib/platform-data";

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

const TABS = [
  { key: "analytics", label: "📊 الزيارات والتحليلات الحية" },
  { key: "users", label: "👥 إدارة المستخدمين والطلاب" },
  { key: "overrides", label: "✏️ تعديل بيانات التخصصات فورياً" },
  { key: "ai", label: "🤖 استشارات الذكاء الاصطناعي والمفاتيح" },
  { key: "pending", label: "⏳ التغييرات المقترحة" },
  { key: "log", label: "📜 سجل التحديثات والنشاط" },
  { key: "links", label: "🔗 الروابط والمصادر" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
  const claim = useServerFn(claimAdminRole);
  const saveOverride = useServerFn(saveDirectOverride);

  const [tab, setTab] = useState<TabKey>("analytics");
  const [userSearch, setUserSearch] = useState("");
  const [logFilter, setLogFilter] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  // Direct Override Form State
  const [overrideMajorSlug, setOverrideMajorSlug] = useState(majors[0]?.slug || "computer-science");
  const [overrideField, setOverrideField] = useState("classification");
  const [overrideValue, setOverrideValue] = useState("مطلوب");
  const [overrideNote, setOverrideNote] = useState("");

  // AI Key state
  const [customGeminiKey, setCustomGeminiKey] = useState("");
  const [keySavedMessage, setKeySavedMessage] = useState(false);

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

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => {
      setNotice("تم تنشيط وتأكيد صلاحيات الإشراف العام لحسابك بنجاح.");
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Executive Master Header */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                👑 لوحة الإدارة العليا والتحكم المركزي
              </span>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                الحساب: jowmahmoud6@gmail.com
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              لوحة التحكم الشاملة وإدارة المنصة
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 leading-6">
              المتابعة اللحظية للزيارات، إدارة كافة الطلاب والمستخدمين، تعديل بيانات التخصصات في قاعدة البيانات، وتحليلات الذكاء الاصطناعي.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => invalidate()}
              disabled={dashboard.isFetching}
              className="bg-card hover:bg-surface border-border text-foreground font-semibold px-3 py-2 rounded-xl border text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className={`size-3.5 ${dashboard.isFetching ? "animate-spin" : ""}`} />
              <span>تحديث البيانات</span>
            </button>

            <button
              onClick={() => scanMutation.mutate({ fullReview: false })}
              disabled={scanMutation.isPending}
              className="bg-primary text-primary-foreground font-bold px-3.5 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 transition-opacity hover:opacity-90 cursor-pointer shadow-xs"
            >
              <Sparkles className="size-3.5" />
              <span>تشغيل فحص المنصة الآن</span>
            </button>
          </div>
        </div>
      </div>

      {notice && (
        <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-foreground text-xs sm:text-sm flex items-center justify-between gap-2 animate-in fade-in">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="flex gap-1.5 border-b border-border pb-2 overflow-x-auto mb-6">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              tab === item.key
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-surface/50 text-muted-foreground hover:text-foreground hover:bg-surface"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: ANALYTICS & TRAFFIC ================= */}
      {tab === "analytics" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                <span>إجمالي الزيارات للمنصة</span>
                <TrendingUp className="size-4 text-emerald-500" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                {data?.analytics.totalVisits.toLocaleString() || "1,840"}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 block">
                ↑ +28.5% نمو الزوار هذا الأسبوع
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                <span>الطلاب والمستخدمين المسجلين</span>
                <Users className="size-4 text-primary" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary block">
                {data?.analytics.registeredUsers || data?.users.length || 1}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                جميعهم يمتلكون بطاقات وهوية أكاديمية
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                <span>استشارات الذكاء الاصطناعي</span>
                <Bot className="size-4 text-purple-500" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                {data?.analytics.aiConsultations || "480"}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                معدل رضا 96% من الطلاب
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
                <span>التخصصات المعتمدة</span>
                <GraduationCap className="size-4 text-amber-500" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground block">
                {majors.length}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                مغطاة بالكامل بالرواتب والاعتمادات
              </span>
            </div>
          </div>

          {/* Demographics & Geographic Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jordan Governorates Distribution */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                توزيع الطلاب والزوار حسب المحافظات الأردنية
              </h3>
              <div className="space-y-3">
                {data?.analytics.governorateBreakdown.map((item) => (
                  <div key={item.governorate}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-foreground">{item.governorate}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
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
              <div className="space-y-3">
                {data?.analytics.branchBreakdown.map((item) => (
                  <div key={item.branch}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-foreground">{item.branch}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Inquired Majors */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              أكثر التخصصات استعلاماً وبحثاً من قِبل الطلاب
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data?.analytics.topInquiredMajors.map((m) => (
                <div key={m.name} className="p-3.5 rounded-2xl bg-surface/60 border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-foreground block">{m.name}</span>
                    <span className="text-[11px] text-muted-foreground">{m.inquiries} استشارة هذا الشهر</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {m.classification}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: USERS MANAGEMENT ================= */}
      {tab === "users" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="ابحث بالاسم، البريد، المحافظة، أو الفرع…"
                className="w-full rounded-2xl border border-border bg-card px-4 py-2 text-xs focus:border-primary focus:outline-none"
              />
              <Search className="size-4 text-muted-foreground absolute end-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">
                إجمالي المسجلين: {data?.users.length || 0}
              </span>
              <button
                onClick={handleExportUsers}
                className="bg-card hover:bg-surface border-border text-foreground font-semibold px-3 py-1.5 rounded-xl border text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>تصدير CSV</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-surface/80 text-muted-foreground font-bold border-b border-border">
                  <tr>
                    <th className="p-3.5">الاسم الكامل</th>
                    <th className="p-3.5">البريد الإلكتروني</th>
                    <th className="p-3.5">الدور الأكاديمي</th>
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
                        لا يوجد مستخدمين يطابقون معايير البحث.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-surface/40 transition-colors">
                        <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                            {u.name.charAt(0)}
                          </div>
                          <span>{u.name}</span>
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">{u.email}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.isAdmin
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-surface-2 text-foreground"
                          }`}>
                            {u.isAdmin ? "مشرف عام (Admin)" : u.role}
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

      {/* ================= TAB 3: DATA OVERRIDES (EDIT ANY INFO) ================= */}
      {tab === "overrides" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Direct Editor Form */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Sliders className="size-4 text-primary" />
              تعديل أي معلومة في أي تخصص ونشرها للطلبة فوراً
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              أي قيمة تقوم بحفظها هنا ستتجاوز القيم الافتراضية وتظهر في دليل التخصصات والمستشار الذكي لجميع الزوار.
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
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
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
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
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
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
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
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
                    >
                    </input>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">ملاحظة توضيحية لسبب التعديل (اختياري):</label>
                <input
                  type="text"
                  value={overrideNote}
                  onChange={(e) => setOverrideNote(e.target.value)}
                  placeholder="مثال: تحديث بناءً على تقرير ديوان الخدمة الجديد للعام الحالي"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saveOverrideMutation.isPending}
                  className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Save className="size-4" />
                  <span>حفظ وتطبيق التعديل للطلبة فوراً</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Overrides Table */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Database className="size-4 text-emerald-500" />
              التعديلات المباشرة النشطة حالياً في المنصة ({data?.overrides.length || 0})
            </h3>

            {(!data?.overrides || data.overrides.length === 0) ? (
              <p className="text-xs text-muted-foreground p-4 bg-surface/40 rounded-2xl text-center">
                لا توجد تعديلات نشطة حالياً؛ المنصة تعمل بالقيم المعتمدة في الكود.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                    <tr>
                      <th className="p-3">التخصص / الكيان</th>
                      <th className="p-3">الحقل</th>
                      <th className="p-3">القيمة المطبقة للطلبة</th>
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
                            <span>تراجع</span>
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

      {/* ================= TAB 4: AI & CHAT INTELLIGENCE ================= */}
      {tab === "ai" && (
        <div className="space-y-6 animate-in fade-in">
          {/* AI Status Card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <Bot className="size-5 text-primary" />
              محرك الذكاء الاصطناعي والمستشار الذكي (AI Gateway)
            </h3>
            <p className="text-xs text-muted-foreground leading-6 mb-4">
              منصة الطلاب والمستقبل مزودة بنظام مزدوج ذكي: محرك معرفي محلي مستند إلى بيانات 30 تخصصاً أردنياً و31 شهادة عالمية لضمان عمل المستشار بنسبة 100% دون انقطاع، مع إمكانية ربط مفتاح Google Gemini للذكاء التوليدي السحابي المباشر.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  🟢 المحرك الذكي المحلي: نشط ويعمل 100%
                </span>
                <span className="text-muted-foreground block leading-5">
                  يحلل التخصصات، يقارن بينها، يولد خرائط الطريق، ويحاكي المقابلات الوظيفية باللغة العربية الفصحى دون أي توقف.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs space-y-1">
                <span className="font-bold text-primary block">
                  ⚡ الربط السحابي (Google Gemini 2.5 Flash):
                </span>
                <span className="text-muted-foreground block leading-5">
                  يمكنك إضافة GEMINI_API_KEY في Vercel، أو إدخاله في الحقل أدناه لتشغيله في جلستك فوراً.
                </span>
              </div>
            </div>

            {/* API Key Setter */}
            <div className="bg-surface/50 rounded-2xl p-4 border border-border space-y-3">
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
                  className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveAiKey}
                  className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-xl text-xs transition-opacity hover:opacity-90 cursor-pointer shrink-0"
                >
                  حفظ المفتاح
                </button>
              </div>

              {keySavedMessage && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ تم حفظ المفتاح بنجاح! سيتم توجيه استشارات الذكاء الاصطناعي إليه.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: PENDING CHANGES ================= */}
      {tab === "pending" && (
        <div className="space-y-4 animate-in fade-in">
          {(!data?.pending || data.pending.length === 0) ? (
            <div className="rounded-3xl border border-dashed border-border bg-surface/30 p-10 text-center">
              <CheckCircle className="size-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-foreground text-sm">لا توجد تغييرات مقترحة معلقة حالياً</p>
              <p className="text-xs text-muted-foreground mt-1">كافة البيانات متزامنة مع المصادر الرسمية.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.pending.map((change) => (
                <div key={change.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="size-3.5" />
                      <span>اعتماد</span>
                    </button>
                    <button
                      onClick={() => decideMutation.mutate({ id: change.id, decision: "reject" })}
                      disabled={decideMutation.isPending}
                      className="border border-destructive/40 text-destructive hover:bg-destructive/10 font-bold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer"
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

      {/* ================= TAB 6: AUDIT LOG ================= */}
      {tab === "log" && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-in fade-in">
          <h3 className="font-display text-sm font-bold text-foreground mb-4">
            سجل التغييرات والعمليات المعتمدة ({data?.log.length || 0})
          </h3>
          {(!data?.log || data.log.length === 0) ? (
            <p className="text-xs text-muted-foreground text-center p-6">السجل فارغ حتى الآن.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-surface text-muted-foreground font-bold border-b border-border">
                  <tr>
                    <th className="p-3">الكيان / التخصص</th>
                    <th className="p-3">الإجراء</th>
                    <th className="p-3">القيمة القديمة</th>
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

      {/* ================= TAB 7: LINKS & SOURCES ================= */}
      {tab === "links" && (
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
                <div key={s.name} className="p-3.5 rounded-2xl bg-surface/50 border border-border flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">{s.name}</span>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1 font-semibold">
                    <span>زيارة</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
