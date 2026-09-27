import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Sparkles,
  Trophy,
  Bookmark,
  GraduationCap,
  Calculator,
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  Share2,
  Printer,
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  User,
  Users,
  Briefcase,
  HelpCircle,
  Award,
  Layers,
  ArrowRightLeft,
} from "lucide-react";

import { majors, type Major } from "@/data/majors";
import { certifications, type Certification } from "@/data/certifications";
import { useStudent } from "@/hooks/use-student";
import type { TawjihiBranch, UserRole } from "@/lib/student-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم الطالب الفائقة | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "لوحة تحكم تفاعلية ذكية للطلبة: مطابقة التوجيهي، حاسبة التكاليف، تتبع الشهادات المجانية، والمفضلة الأكاديمية.",
      },
    ],
  }),
  component: DashboardPage,
});

const ROLE_LABELS: Record<UserRole, { label: string; icon: typeof User }> = {
  school_student: { label: "طالب مدرسة (توجيهي)", icon: GraduationCap },
  uni_student: { label: "طالب جامعي", icon: User },
  graduate: { label: "خريج باحث عن عمل", icon: Briefcase },
  parent: { label: "ولي أمر", icon: Users },
  advisor: { label: "مرشد أكاديمي / تربوي", icon: Compass },
  recruiter: { label: "سوق العمل / توظيف", icon: Trophy },
};

const BRANCH_LABELS: Record<TawjihiBranch, string> = {
  scientific: "الفرع العلمي",
  literary: "الفرع الأدبي",
  industrial: "الفرع الصناعي",
  information_tech: "تكنولوجيا المعلومات",
  health: "الحقل الصحي",
  agricultural: "الفرع الزراعي",
};

const GOVERNORATES = [
  "عمان",
  "إربد",
  "الزرقاء",
  "البلقاء",
  "مأدبا",
  "الكرك",
  "معان",
  "الطفيلة",
  "العقبة",
  "المفرق",
  "جرش",
  "عجلون",
];

export function DashboardPage() {
  const {
    profile,
    bookmarkedMajors,
    bookmarkedCerts,
    certProgress,
    points,
    badges,
    updateProfile,
    toggleMajorBookmark,
    toggleCertBookmark,
    updateCertProgress,
    evaluateMajorMatch,
  } = useStudent();

  const [activeTab, setActiveTab] = useState<
    "matcher" | "bookmarks" | "certs" | "budget" | "parent"
  >("matcher");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(profile.name);
  const [profileRole, setProfileRole] = useState(profile.role);
  const [profileBranch, setProfileBranch] = useState(profile.tawjihiBranch);
  const [profileGpa, setProfileGpa] = useState(profile.tawjihiGpa);
  const [profileGov, setProfileGov] = useState(profile.governorate);

  // Comparison State
  const [compareMajor1, setCompareMajor1] = useState<string>("computer-science");
  const [compareMajor2, setCompareMajor2] = useState<string>("cybersecurity");

  // Budget Calculator State
  const [selectedBudgetMajor, setSelectedBudgetMajor] = useState<string>("computer-science");
  const [creditHours, setCreditHours] = useState<number>(132);
  const [hourCost, setHourCost] = useState<number>(45);
  const [semesterFee, setSemesterFee] = useState<number>(120);
  const [monthlyTransport, setMonthlyTransport] = useState<number>(60);
  const [studyYears, setStudyYears] = useState<number>(4);

  // Filter for matcher
  const [filterMarket, setFilterMarket] = useState<"all" | "مطلوب" | "مشبع" | "راكد">("all");

  const evaluatedMajors = useMemo(() => {
    return majors.map((major) => ({
      ...major,
      match: evaluateMajorMatch(major.slug),
    }));
  }, [evaluateMajorMatch]);

  const filteredMatches = useMemo(() => {
    return evaluatedMajors.filter((m) => {
      if (filterMarket !== "all" && m.classification !== filterMarket) return false;
      return true;
    });
  }, [evaluatedMajors, filterMarket]);

  const bookmarkedMajorsList = useMemo(() => {
    return majors.filter((m) => bookmarkedMajors.includes(m.slug));
  }, [bookmarkedMajors]);

  const bookmarkedCertsList = useMemo(() => {
    return certifications.filter((c) => bookmarkedCerts.includes(c.id));
  }, [bookmarkedCerts]);

  // Budget calculations
  const totalHoursCost = creditHours * hourCost;
  const totalSemesters = studyYears * 2;
  const totalRegistration = totalSemesters * semesterFee;
  const totalTransport = studyYears * 9 * monthlyTransport; // 9 months per academic year
  const grandTotalCost = totalHoursCost + totalRegistration + totalTransport;

  // Estimated ROI calculation (assuming average entry salary in JD)
  const estimatedStartingSalary = selectedBudgetMajor.includes("computer") || selectedBudgetMajor.includes("cyber") ? 550 : 380;
  const estimatedRoiMonths = Math.round(grandTotalCost / estimatedStartingSalary);

  const saveProfileHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      role: profileRole,
      tawjihiBranch: profileBranch,
      tawjihiGpa: Number(profileGpa),
      governorate: profileGov,
    });
    setIsEditingProfile(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Top Banner / Hero Profile Card */}
      <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 font-bold">
              <GraduationCap className="size-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-black text-foreground">
                  {profile.name}
                </h1>
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {ROLE_LABELS[profile.role]?.label || "طالب"}
                </span>
                <span className="bg-surface-2 text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {BRANCH_LABELS[profile.tawjihiBranch]}
                </span>
                <span className="bg-surface-2 text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                  محافظة {profile.governorate}
                </span>
              </div>
              <p className="text-muted-foreground mt-1.5 text-sm">
                معدل التوجيهي الحالي:{" "}
                <span className="text-foreground font-black text-base">
                  %{profile.tawjihiGpa.toFixed(1)}
                </span>{" "}
                • نقاط الإنجاز:{" "}
                <span className="text-amber-500 font-bold">{points} نقطة</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="border-border hover:bg-surface rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <SlidersHorizontal className="size-3.5" />
              تعديل بياناتي ومعدلي
            </button>
            <button
              onClick={handlePrint}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Printer className="size-3.5" />
              طباعة / تصدير خطتي
            </button>
          </div>
        </div>

        {/* Gamification Badges Bar */}
        <div className="border-border/60 mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
          <span className="text-muted-foreground text-xs font-semibold flex items-center gap-1">
            <Trophy className="size-3.5 text-amber-500" />
            الشارات المكتسبة ({badges.length}):
          </span>
          {badges.map((b) => (
            <span
              key={b}
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-lg px-2 py-0.5 text-xs font-medium flex items-center gap-1"
            >
              <Award className="size-3" />
              {b}
            </span>
          ))}
          {badges.length === 0 && (
            <span className="text-muted-foreground text-xs">
              احفظ تخصصات وابدأ دورات للحصول على شارات ومكافآت!
            </span>
          )}
        </div>

        {/* Quick Edit Form Drawer */}
        {isEditingProfile && (
          <form
            onSubmit={saveProfileHandler}
            className="border-primary/20 bg-primary/5 mt-5 rounded-xl border p-4 animate-in fade-in slide-in-from-top-2"
          >
            <h3 className="text-foreground text-sm font-bold mb-3 flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-primary" />
              تحديث بيانات الطالب والمعدل اللحظي
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <label className="text-muted-foreground block text-xs mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="border-border bg-background w-full rounded-lg border px-3 py-1.5 text-xs"
                />
              </div>

              <div>
                <label className="text-muted-foreground block text-xs mb-1">نوع الدور</label>
                <select
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value as UserRole)}
                  className="border-border bg-background w-full rounded-lg border px-3 py-1.5 text-xs"
                >
                  <option value="school_student">طالب مدرسة (توجيهي)</option>
                  <option value="uni_student">طالب جامعي</option>
                  <option value="graduate">خريج باحث عن عمل</option>
                  <option value="parent">ولي أمر</option>
                  <option value="advisor">مرشد أكاديمي</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block text-xs mb-1">فرع التوجيهي</label>
                <select
                  value={profileBranch}
                  onChange={(e) => setProfileBranch(e.target.value as TawjihiBranch)}
                  className="border-border bg-background w-full rounded-lg border px-3 py-1.5 text-xs"
                >
                  <option value="scientific">الفرع العلمي</option>
                  <option value="literary">الفرع الأدبي</option>
                  <option value="industrial">الفرع الصناعي</option>
                  <option value="information_tech">تكنولوجيا المعلومات</option>
                  <option value="health">الحقل الصحي</option>
                  <option value="agricultural">الفرع الزراعي</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block text-xs mb-1">
                  المعدل (%): <span className="font-bold text-foreground">{profileGpa}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="0.5"
                    value={profileGpa}
                    onChange={(e) => setProfileGpa(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <input
                    type="number"
                    min="50"
                    max="100"
                    step="0.1"
                    value={profileGpa}
                    onChange={(e) => setProfileGpa(Number(e.target.value))}
                    className="border-border bg-background w-16 rounded-lg border px-2 py-1 text-center text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="border-border rounded-lg border px-3 py-1.5 text-xs hover:bg-background"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-xs font-bold shadow-sm"
              >
                حفظ التعديلات
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Main Tab Navigation */}
      <div className="border-border/70 mt-8 flex flex-wrap gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab("matcher")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "matcher"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <Compass className="size-4" />
          مطابقة التوجيهي الذكية
          <span className="bg-background/20 rounded-full px-2 py-0.5 text-xs">
            {filteredMatches.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "bookmarks"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <Bookmark className="size-4" />
          المفضلة والمقارنة
          <span className="bg-background/20 rounded-full px-2 py-0.5 text-xs">
            {bookmarkedMajors.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("certs")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "certs"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <Award className="size-4" />
          متتبع الشهادات المكتسبة
          <span className="bg-background/20 rounded-full px-2 py-0.5 text-xs">
            {Object.keys(certProgress).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "budget"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <Calculator className="size-4" />
          حاسبة تكاليف الجامعة والعائد (ROI)
        </button>

        <button
          onClick={() => setActiveTab("parent")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "parent"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <Users className="size-4" />
          وضع ولي الأمر
        </button>
      </div>

      {/* TAB 1: TAWJIHI MATCHER */}
      {activeTab === "matcher" && (
        <div className="mt-6 space-y-6">
          <div className="bg-surface/50 border-border/80 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <h2 className="font-display text-lg font-bold">
                التخصصات المتطابقة مع معدلك ({profile.tawjihiGpa}%) وفرعك ({BRANCH_LABELS[profile.tawjihiBranch]})
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                يتم حساب التوافق بناءً على الحدود الدنيا التقريبية للقبول التنافسي والموازي في الجامعات الأردنية.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-muted-foreground text-xs">سوق العمل:</span>
              {(["all", "مطلوب", "مشبع", "راكد"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterMarket(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    filterMarket === cat
                      ? "bg-foreground text-background"
                      : "bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat === "all" ? "الكل" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((m) => {
              const isBookmarked = bookmarkedMajors.includes(m.slug);
              const badgeClass =
                m.match.status === "متاح تنافسياً"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                  : m.match.status === "متاح موازياً"
                  ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                  : "bg-rose-500/10 text-rose-600 border-rose-500/30";

              return (
                <div
                  key={m.slug}
                  className="border-border/80 bg-card hover:border-primary/50 flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-muted-foreground text-xs font-medium">{m.field}</span>
                        <h3 className="font-display text-base font-bold text-foreground hover:text-primary transition-colors">
                          <Link to="/majors/$slug" params={{ slug: m.slug }}>
                            {m.name}
                          </Link>
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleMajorBookmark(m.slug)}
                        title={isBookmarked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                        className={`rounded-xl p-2 transition-colors ${
                          isBookmarked
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Bookmark className="size-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className={`border rounded-lg px-2 py-0.5 text-xs font-bold ${badgeClass}`}>
                        {m.match.status} ({m.match.matchScore}%)
                      </span>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
                          m.classification === "مطلوب"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : m.classification === "مشبع"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-rose-500/10 text-rose-600"
                        }`}
                      >
                        سوق العمل: {m.classification}
                      </span>
                    </div>

                    <p className="text-muted-foreground mt-3 line-clamp-2 text-xs leading-6">
                      {m.summary}
                    </p>
                  </div>

                  <div className="border-border/60 mt-4 border-t pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        نسبة التشغيل: <strong className="text-foreground">{m.employmentRate}</strong>
                      </span>
                      <Link
                        to="/majors/$slug"
                        params={{ slug: m.slug }}
                        className="text-primary hover:underline font-bold flex items-center gap-1"
                      >
                        التفاصيل
                        <ChevronLeft className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKMARKS & COMPARISON */}
      {activeTab === "bookmarks" && (
        <div className="mt-6 space-y-8">
          <div>
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Bookmark className="size-5 text-primary" />
              التخصصات المحفوظة في مفضلتك ({bookmarkedMajorsList.length})
            </h2>

            {bookmarkedMajorsList.length === 0 ? (
              <div className="border-border/70 bg-surface/30 rounded-2xl border p-8 text-center">
                <Bookmark className="text-muted-foreground mx-auto size-10 stroke-1" />
                <p className="text-foreground mt-2 font-bold">لم تقم بحفظ أي تخصصات بعد</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  تصفح دليل التخصصات أو تبويب المطابقة واضغط على أيقونة الإشارة المرجعية لحفظ التخصصات التي تفضلها.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarkedMajorsList.map((m) => (
                  <div key={m.slug} className="border-border bg-card rounded-2xl border p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm">
                        <Link to="/majors/$slug" params={{ slug: m.slug }} className="hover:text-primary">
                          {m.name}
                        </Link>
                      </h4>
                      <button
                        onClick={() => toggleMajorBookmark(m.slug)}
                        className="text-rose-500 hover:bg-rose-500/10 rounded-lg p-1.5 text-xs"
                      >
                        إزالة
                      </button>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs line-clamp-2">{m.summary}</p>
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border/60">
                      <span className="font-semibold">{m.classification}</span>
                      <span className="text-muted-foreground">{m.employmentRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Side by Side Comparison Tool */}
          <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
            <h3 className="font-display text-base font-bold mb-2 flex items-center gap-2">
              <ArrowRightLeft className="size-4 text-primary" />
              أداة المقارنة المباشرة (Side-by-Side Comparison)
            </h3>
            <p className="text-muted-foreground text-xs mb-5">
              قارن بين تخصصين جنباً إلى جنب في نسب التشغيل، تصنيف سوق العمل، والجامعات المتاحة لحسم ترددك.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  التخصص الأول
                </label>
                <select
                  value={compareMajor1}
                  onChange={(e) => setCompareMajor1(e.target.value)}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-semibold"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  التخصص الثاني
                </label>
                <select
                  value={compareMajor2}
                  onChange={(e) => setCompareMajor2(e.target.value)}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-semibold"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            {(() => {
              const m1 = majors.find((m) => m.slug === compareMajor1);
              const m2 = majors.find((m) => m.slug === compareMajor2);
              if (!m1 || !m2) return null;

              return (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-right text-xs">
                    <thead>
                      <tr className="border-b border-border bg-surface/60">
                        <th className="p-3 font-bold text-muted-foreground">وجه المقارنة</th>
                        <th className="p-3 font-bold text-primary text-sm">{m1.name}</th>
                        <th className="p-3 font-bold text-indigo-500 text-sm">{m2.name}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-semibold text-muted-foreground">تصنيف سوق العمل</td>
                        <td className="p-3 font-bold">{m1.classification}</td>
                        <td className="p-3 font-bold">{m2.classification}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-muted-foreground">نسبة التشغيل التقديرية</td>
                        <td className="p-3 font-bold text-foreground">{m1.employmentRate}</td>
                        <td className="p-3 font-bold text-foreground">{m2.employmentRate}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-muted-foreground">مستوى مخاطر الركود</td>
                        <td className="p-3">{m1.risk}</td>
                        <td className="p-3">{m2.risk}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-muted-foreground">أثر الذكاء الاصطناعي</td>
                        <td className="p-3">{m1.automation.note}</td>
                        <td className="p-3">{m2.automation.note}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-muted-foreground">أبرز الجامعات الحكومية</td>
                        <td className="p-3">{m1.publicUniversities.slice(0, 3).join("، ")}</td>
                        <td className="p-3">{m2.publicUniversities.slice(0, 3).join("، ")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATIONS TRACKER */}
      {activeTab === "certs" && (
        <div className="mt-6 space-y-6">
          <div className="bg-surface/50 border-border/80 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <h2 className="font-display text-lg font-bold">
                مسار الشهادات المجانية العالمية المعتمدة
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                تعلّم المهارات ذات الطلب العالي واكسب نقاطاً لرفع فرصك في التوظيف قبل التخرج.
              </p>
            </div>
            <Link
              to="/certifications"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              استعراض الـ 31 شهادة مجانية
              <ExternalLink className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {certifications.slice(0, 8).map((cert) => {
              const progress = certProgress[cert.id] || { status: "not_started", progressPercent: 0 };
              const isSaved = bookmarkedCerts.includes(cert.id);

              return (
                <div
                  key={cert.id}
                  className="border-border/80 bg-card rounded-2xl border p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-muted-foreground text-[11px] font-semibold">
                        {cert.provider} • {cert.category}
                      </span>
                      <h4 className="font-bold text-sm text-foreground">{cert.title}</h4>
                    </div>

                    <span
                      className={`rounded-lg px-2 py-0.5 text-xs font-bold ${
                        progress.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                          : progress.status === "in_progress"
                          ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {progress.status === "completed"
                        ? "مكتملة ✓"
                        : progress.status === "in_progress"
                        ? "قيد الدراسة ⏳"
                        : "لم تبدأ"}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-xs leading-5 line-clamp-2">
                    {cert.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateCertProgress(
                            cert.id,
                            progress.status === "completed" ? "not_started" : "completed"
                          )
                        }
                        className="border-border hover:bg-surface rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors"
                      >
                        {progress.status === "completed" ? "إلغاء الإكمال" : "تحديد كمكتملة (+100 نقطة)"}
                      </button>

                      {progress.status !== "completed" && (
                        <button
                          onClick={() =>
                            updateCertProgress(
                              cert.id,
                              progress.status === "in_progress" ? "not_started" : "in_progress"
                            )
                          }
                          className="text-muted-foreground hover:text-foreground rounded-lg px-2 py-1 text-xs"
                        >
                          {progress.status === "in_progress" ? "إلغاء البدء" : "أدرسها حالياً"}
                        </button>
                      )}
                    </div>

                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline text-xs font-bold flex items-center gap-1"
                    >
                      رابط الدورة
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: COLLEGE BUDGET & ROI CALCULATOR */}
      {activeTab === "budget" && (
        <div className="mt-6 space-y-6">
          <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold mb-1 flex items-center gap-2">
              <Calculator className="size-5 text-primary" />
              حاسبة تكاليف الدراسة الجامعية والعائد المالي (College ROI Calculator)
            </h2>
            <p className="text-muted-foreground text-xs mb-6">
              احسب التكلفة التقديرية الكاملة لدراستك (ساعات، تسجيل، مواصلات) واكتشف كم شهراً تحتاج بعد التخرج لاسترداد استثمارك!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  إجمالي الساعات المعتمدة
                </label>
                <input
                  type="number"
                  value={creditHours}
                  onChange={(e) => setCreditHours(Number(e.target.value))}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  سعر الساعة المعتمدة (دينار)
                </label>
                <input
                  type="number"
                  value={hourCost}
                  onChange={(e) => setHourCost(Number(e.target.value))}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-bold"
                />
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  تنافسي: 25-45 د.أ | موازي: 60-100 د.أ
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  رسوم التسجيل الفصلية (دينار)
                </label>
                <input
                  type="number"
                  value={semesterFee}
                  onChange={(e) => setSemesterFee(Number(e.target.value))}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  المواصلات والمصروف الشهري (دينار)
                </label>
                <input
                  type="number"
                  value={monthlyTransport}
                  onChange={(e) => setMonthlyTransport(Number(e.target.value))}
                  className="border-border bg-background w-full rounded-xl border p-2.5 text-sm font-bold"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border-border/60 bg-surface/50 rounded-xl border p-4 text-center">
                <span className="text-muted-foreground text-xs">تكلفة الساعات</span>
                <p className="font-display text-xl font-black text-foreground mt-1">
                  {totalHoursCost.toLocaleString()} د.أ
                </p>
              </div>

              <div className="border-border/60 bg-surface/50 rounded-xl border p-4 text-center">
                <span className="text-muted-foreground text-xs">رسوم التسجيل (4 سنوات)</span>
                <p className="font-display text-xl font-black text-foreground mt-1">
                  {totalRegistration.toLocaleString()} د.أ
                </p>
              </div>

              <div className="border-border/60 bg-surface/50 rounded-xl border p-4 text-center">
                <span className="text-muted-foreground text-xs">المواصلات والمصروف</span>
                <p className="font-display text-xl font-black text-foreground mt-1">
                  {totalTransport.toLocaleString()} د.أ
                </p>
              </div>

              <div className="border-primary/30 bg-primary/10 rounded-xl border p-4 text-center">
                <span className="text-primary text-xs font-bold">التكلفة الإجمالية التقديرية</span>
                <p className="font-display text-2xl font-black text-primary mt-1">
                  {grandTotalCost.toLocaleString()} د.أ
                </p>
              </div>
            </div>

            {/* ROI Insight Box */}
            <div className="bg-emerald-500/10 border-emerald-500/20 mt-6 rounded-2xl border p-4 flex items-center gap-4">
              <div className="bg-emerald-500 text-white rounded-xl p-3 shrink-0">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                  مؤشر العائد على الاستثمار (ROI): تحتاج إلى قرابة {estimatedRoiMonths} شهراً فقط لاسترجاع تكاليف دراستك!
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  بافتراض متوسط راتب بداية {estimatedStartingSalary} دينار أردني. تذكر أن الحصول على الشهادات المهنية المجانية على المنصة يرفع الراتب المبدئي بنسبة تصل إلى 30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PARENT MODE */}
      {activeTab === "parent" && (
        <div className="mt-6 space-y-6">
          <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-xl p-3">
                <Users className="size-6" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold">دليل ولي الأمر لاتخاذ القرار الأكاديمي الحكيم</h2>
                <p className="text-muted-foreground text-xs">
                  مساعدة أولياء الأمور في توجيه أبنائهم نحو المستقبل الواعد وتجنب التكاليف المهدورة في التخصصات الراكدة.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="border-emerald-500/20 bg-emerald-500/5 rounded-2xl border p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  1. التخصصات الأكثر أماناً مالياً
                </h4>
                <p className="text-xs text-muted-foreground leading-6">
                  وفقاً لتقارير هيئة الخدمة والإدارة العامة، قطاعات تكنولوجيا المعلومات، الذكاء الاصطناعي، الأمن السيبراني، والتمريض تحقق أسرع فترات توظيف وأعلى عوائد مالية مقارنة بتكاليف دراستها.
                </p>
              </div>

              <div className="border-amber-500/20 bg-amber-500/5 rounded-2xl border p-4">
                <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">
                  2. احذر فخ التخصصات الراكدة
                </h4>
                <p className="text-xs text-muted-foreground leading-6">
                  تخصصات مثل الحقوق والعلوم السياسية وبعض العلوم الإنسانية تعاني من ركود شديد يتجاوز 10 سنوات انتظار في ديوان الخدمة. لا تدفع مبالغ طائلة في الموازي لهذه التخصصات دون خطة بديلة واضحة.
                </p>
              </div>

              <div className="border-primary/20 bg-primary/5 rounded-2xl border p-4">
                <h4 className="font-bold text-sm text-primary mb-2">
                  3. صناديق الدعم والمنح والقروض
                </h4>
                <p className="text-xs text-muted-foreground leading-6">
                  تأكد من تقديم طلب لصندوق دعم الطالب في وزارة التعليم العالي، حيث تغطي المنح والقروض حتى 45 ساعة معتمدة للطلبة المستحقين في الجامعات الرسمية بموجب معايير النقاط والمحافظات.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
