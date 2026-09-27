import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  Trophy,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
  LogOut,
  ShieldCheck,
  Edit3,
  Save,
  Compass,
  ArrowRight,
  TrendingUp,
  Share2,
  Printer,
  Target,
  FileText,
  Check,
  Bot,
} from "lucide-react";

import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/use-student";
import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";
import type { TawjihiBranch, UserRole } from "@/lib/student-store";
import { StudentOnboarding } from "@/components/student-onboarding";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "ملفي الأكاديمي والمهني | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "بطاقة الهوية الأكاديمية الذكية، تتبع التقدم، التخصصات المفضلة، وخطة الشهادات العالمية المجانية المعتمدة.",
      },
      { property: "og:title", content: "ملفي الأكاديمي والمهني | الطلاب والمستقبل" },
    ],
  }),
  component: ProfilePage,
});

const ROLE_LABELS: Record<UserRole, string> = {
  school_student: "طالب مدرسة (توجيهي)",
  uni_student: "طالب جامعي",
  graduate: "خريج باحث عن عمل",
  parent: "ولي أمر",
  advisor: "مرشد أكاديمي / تربوي",
  recruiter: "ممثل سوق العمل",
};

const BRANCH_LABELS: Record<TawjihiBranch, string> = {
  scientific: "الفرع العلمي",
  literary: "الفرع الأدبي",
  industrial: "الفرع الصناعي",
  information_tech: "تكنولوجيا المعلومات (IT)",
  health: "الحقل الصحي / التمريضي",
  agricultural: "الفرع الزراعي",
};

const JORDAN_GOVERNORATES = [
  "عمان",
  "إربد",
  "الزرقاء",
  "البلقاء",
  "مادبا",
  "الكرك",
  "معان",
  "العقبة",
  "المفرق",
  "جرش",
  "عجلون",
  "الطفيلة",
];

const AVAILABLE_INTERESTS = [
  "الذكاء الاصطناعي وتعلم الآلة",
  "الأمن السيبراني والشبكات",
  "تطوير البرمجيات والويب",
  "الطب وجراحة الفم والأسنان",
  "التمريض والعلوم الطبية",
  "الهندسة والطاقة المتجددة",
  "إدارة الأعمال والمحاسبة",
  "التكنولوجيا المالية (FinTech)",
  "التسويق الرقمي وتصميم UI/UX",
  "اللوجستيات وسلاسل الإمداد",
];

function ProfilePage() {
  const navigate = useNavigate();
  const student = useStudent();
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State for editing
  const [formName, setFormName] = useState(student.profile.name);
  const [formRole, setFormRole] = useState<UserRole>(student.profile.role);
  const [formBranch, setFormBranch] = useState<TawjihiBranch>(student.profile.tawjihiBranch);
  const [formGpa, setFormGpa] = useState<number>(student.profile.tawjihiGpa);
  const [formGov, setFormGov] = useState<string>(student.profile.governorate);
  const [formInterests, setFormInterests] = useState<string[]>(student.profile.interests || []);

  // Academic Goal Tracker State
  const [targetMajorSlug, setTargetMajorSlug] = useState<string>("artificial-intelligence");
  const [targetUni, setTargetUni] = useState<string>("جامعة العلوم والتكنولوجيا الأردنية");

  // Personal Academic Notes State
  const [personalNotes, setPersonalNotes] = useState<string>("");
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("onboarding") === "true" || params.get("setup") === "true") {
        setShowOnboarding(true);
      }
      const savedNotes = localStorage.getItem("student_personal_notes");
      if (savedNotes) setPersonalNotes(savedNotes);
      const savedTargetMajor = localStorage.getItem("student_target_major");
      if (savedTargetMajor) setTargetMajorSlug(savedTargetMajor);
      const savedTargetUni = localStorage.getItem("student_target_uni");
      if (savedTargetUni) setTargetUni(savedTargetUni);
    }

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAuthUser(data.session.user);
        if (data.session.user.user_metadata?.full_name && !student.profile.name) {
          student.updateProfile({ name: data.session.user.user_metadata.full_name });
        }
      }
    });
  }, []);

  const handleSaveNotes = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("student_personal_notes", personalNotes);
      localStorage.setItem("student_target_major", targetMajorSlug);
      localStorage.setItem("student_target_uni", targetUni);
    }
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    student.updateProfile({
      name: formName,
      role: formRole,
      tawjihiBranch: formBranch,
      tawjihiGpa: formGpa,
      governorate: formGov,
      interests: formInterests,
    });

    if (authUser) {
      await supabase.auth.updateUser({
        data: {
          full_name: formName,
          role: formRole,
          tawjihiBranch: formBranch,
          tawjihiGpa: formGpa,
          governorate: formGov,
        },
      });
    }

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    void navigate({ to: "/auth" });
  };

  const toggleInterest = (interest: string) => {
    if (formInterests.includes(interest)) {
      setFormInterests(formInterests.filter((i) => i !== interest));
    } else {
      setFormInterests([...formInterests, interest]);
    }
  };

  const copyShareCard = () => {
    void navigator.clipboard.writeText(
      `بطاقة طالبي في منصة الطلاب والمستقبل: ${student.profile.name} - معدل ${student.profile.tawjihiGpa}% (${BRANCH_LABELS[student.profile.tawjihiBranch]})`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const savedMajorsList = majors.filter((m) => student.bookmarkedMajors.includes(m.slug));
  const savedCertsList = certifications.filter((c) =>
    student.bookmarkedCerts.includes(c.id) || !!student.certProgress[c.id]
  );

  const isAdmin =
    authUser?.email?.toLowerCase() === "jowmahmoud6@gmail.com" ||
    authUser?.email?.toLowerCase() === "mralrba0@gmail.com";

  // Level calculation: 100 points per level
  const userLevel = Math.max(1, Math.floor(student.points / 100) + 1);
  const nextLevelXp = userLevel * 100;
  const currentLevelProgress = Math.min(100, Math.round(((student.points % 100) / 100) * 100));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="size-3.5" />
            الهوية الأكاديمية والمهنية
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            ملفي الشخصي ومساري الأكاديمي
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            إدارة بياناتك الأكاديمية، متابعة شهاداتك العالمية، وتخصيص توصيات التخصصات.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowOnboarding(true)}
            className="border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold py-2 px-3.5 rounded-xl border transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span>معالج الإعداد الأكاديمي 🪄</span>
          </button>

          {isAdmin && (
            <Link
              to="/updates"
              className="border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold py-2 px-3.5 rounded-xl border transition-colors inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="size-4" />
              لوحة التحديثات (مشرف)
            </Link>
          )}

          {authUser ? (
            <button
              onClick={handleSignOut}
              className="border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 text-muted-foreground text-xs font-semibold py-2 px-3.5 rounded-xl border transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="size-3.5" />
              تسجيل الخروج
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-primary text-primary-foreground text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-opacity hover:opacity-90 inline-flex items-center gap-1.5"
            >
              تسجيل الدخول / حفظ السحابي
            </Link>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="size-4 shrink-0" />
          <span>تم حفظ تحديثات الملف الأكاديمي بنجاح، وتمت مزامنتها مع لوحة التحكم والمستشار الذكي!</span>
        </div>
      )}

      {/* Main Grid: Digital ID Card + Gamification Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Holographic Digital Student Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-7 shadow-xl">
          {/* Decorative Background Shapes */}
          <div className="absolute -top-12 -end-12 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -start-10 size-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Card Top Row */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="size-14 sm:size-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white/20 shrink-0">
                {student.profile.name.charAt(0) || "ط"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {student.profile.name}
                  </h2>
                  <span className="size-2 rounded-full bg-emerald-500" title="نشط" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {ROLE_LABELS[student.profile.role]}
                  </span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <MapPin className="size-3 text-primary" />
                    {student.profile.governorate}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-end">
              <span className="text-[10px] text-muted-foreground font-mono block">رقم الهوية الأكاديمية</span>
              <span className="text-xs font-mono font-bold text-foreground bg-surface-2 px-2.5 py-1 rounded-lg border border-border inline-block mt-0.5">
                JO-STU-{Math.abs(student.profile.name.split("").reduce((a, b) => a + b.charCodeAt(0), 1000))}
              </span>
            </div>
          </div>

          {/* Card Metrics Grid */}
          <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-card/80 backdrop-blur-xs rounded-2xl p-3 border border-border/80">
              <span className="text-[11px] text-muted-foreground block">معدل التوجيهي</span>
              <span className="font-display text-lg sm:text-xl font-extrabold text-primary block mt-0.5">
                {student.profile.tawjihiGpa}%
              </span>
            </div>

            <div className="bg-card/80 backdrop-blur-xs rounded-2xl p-3 border border-border/80">
              <span className="text-[11px] text-muted-foreground block">فرع الثانوية</span>
              <span className="font-bold text-xs sm:text-sm text-foreground block mt-1 truncate">
                {BRANCH_LABELS[student.profile.tawjihiBranch]}
              </span>
            </div>

            <div className="bg-card/80 backdrop-blur-xs rounded-2xl p-3 border border-border/80">
              <span className="text-[11px] text-muted-foreground block">المستوى والخبرة</span>
              <span className="font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 block mt-1">
                المستوى {userLevel} ({student.points} XP)
              </span>
            </div>

            <div className="bg-card/80 backdrop-blur-xs rounded-2xl p-3 border border-border/80">
              <span className="text-[11px] text-muted-foreground block">التخصصات المحفوظة</span>
              <span className="font-bold text-xs sm:text-sm text-foreground block mt-1">
                {student.bookmarkedMajors.length} تخصصات
              </span>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="relative z-10 mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>هوية رقمية معتمدة لاحتساب معايير القبول وسوق العمل</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-card hover:bg-surface border-border text-foreground font-semibold px-3 py-1.5 rounded-xl border transition-colors inline-flex items-center gap-1 text-xs cursor-pointer"
                title="طباعة الهوية الأكاديمية الرسمية"
              >
                <Printer className="size-3.5 text-primary" />
                <span>طباعة الهوية</span>
              </button>
              <button
                type="button"
                onClick={copyShareCard}
                className="bg-card hover:bg-surface border-border text-foreground font-semibold px-3 py-1.5 rounded-xl border transition-colors inline-flex items-center gap-1 text-xs cursor-pointer"
              >
                <Share2 className="size-3.5" />
                <span>{copiedLink ? "تم النسخ!" : "مشاركة الهوية"}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-xl shadow-xs transition-opacity hover:opacity-90 inline-flex items-center gap-1 text-xs cursor-pointer"
              >
                <Edit3 className="size-3.5" />
                <span>{isEditing ? "إغلاق التعديل" : "تعديل البيانات"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gamification & Badges Card */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                <Trophy className="size-4 text-amber-500" />
                نظام التقدم والشارات
              </span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {student.points} نقطة
              </span>
            </div>

            {/* Level Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>المستوى {userLevel}</span>
                <span>المستوى {userLevel + 1}</span>
              </div>
              <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                متبقي {nextLevelXp - student.points} نقطة للانتقال للمستوى القادم 🚀
              </span>
            </div>

            {/* Badges Shelf */}
            <span className="text-xs font-semibold text-muted-foreground block mb-2">
              الشارات المحققة ({student.badges.length}):
            </span>
            <div className="grid grid-cols-2 gap-2">
              {student.badges.map((badge) => (
                <div
                  key={badge}
                  className="p-2 rounded-xl bg-surface/70 border border-border/70 flex items-center gap-2 text-xs"
                >
                  <Award className="size-4 text-amber-500 shrink-0" />
                  <span className="font-semibold text-foreground text-[11px] truncate">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60">
            <Link
              to="/dashboard"
              className="text-xs font-bold text-primary hover:underline flex items-center justify-between"
            >
              <span>فتح لوحة التحكم الذكية والمطابقة</span>
              <ArrowRight className="size-3.5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Edit Form Drawer / Collapsible */}
      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className="border-border bg-card rounded-3xl border p-6 sm:p-7 shadow-lg mb-8 animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <Edit3 className="size-4 text-primary" />
              تعديل المعلومات الأكاديمية والاهتمامات
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              إلغاء
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">الاسم</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">الدور الأكاديمي</label>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as UserRole)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
              >
                {Object.entries(ROLE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">فرع التوجيهي</label>
              <select
                value={formBranch}
                onChange={(e) => setFormBranch(e.target.value as TawjihiBranch)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
              >
                {Object.entries(BRANCH_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                المعدل ({formGpa}%)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                step="0.1"
                value={formGpa}
                onChange={(e) => setFormGpa(parseFloat(e.target.value) || 75)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-foreground mb-1.5">المحافظة</label>
            <select
              value={formGov}
              onChange={(e) => setFormGov(e.target.value)}
              className="w-full sm:w-1/2 rounded-xl border border-border bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none"
            >
              {JORDAN_GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-foreground mb-2">
              الاهتمامات والمجالات التي تجذبك:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map((interest) => {
                const active = formInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-surface border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {interest} {active ? "✓" : "+"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm hover:opacity-90 cursor-pointer"
            >
              <Save className="size-4" />
              <span>حفظ التعديلات في ملفي</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= ACADEMIC TARGET & DEGREE RADAR ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Goal Tracker */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
              <span className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                <Target className="size-4 text-primary" />
                بوصلة التخصص والجامعة المنشودة
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                محدد الهدف 🎯
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              حدد التخصص والجامعة التي تطمح لدخولها، وسيقوم النظام باحتساب الفارق التنافسي ونسبة فرصتك في القبول.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">الجامعة المنشودة:</label>
                <select
                  value={targetUni}
                  onChange={(e) => {
                    setTargetUni(e.target.value);
                    if (typeof window !== "undefined") localStorage.setItem("student_target_uni", e.target.value);
                  }}
                  className="w-full bg-surface border border-border rounded-xl p-2.5 text-xs text-foreground font-semibold"
                >
                  <option value="الجامعة الأردنية">الجامعة الأردنية</option>
                  <option value="جامعة العلوم والتكنولوجيا الأردنية">جامعة العلوم والتكنولوجيا</option>
                  <option value="جامعة اليرموك">جامعة اليرموك</option>
                  <option value="الجامعة الهاشمية">الجامعة الهاشمية</option>
                  <option value="جامعة البلقاء التطبيقية">جامعة البلقاء التطبيقية</option>
                  <option value="جامعة مؤتة">جامعة مؤتة</option>
                  <option value="جامعة آل البيت">جامعة آل البيت</option>
                  <option value="جامعة الحسين بن طلال">جامعة الحسين بن طلال</option>
                  <option value="جامعة الطفيلة التقنية">جامعة الطفيلة التقنية</option>
                  <option value="الجامعة الألمانية الأردنية">الجامعة الألمانية الأردنية</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">التخصص المنشود:</label>
                <select
                  value={targetMajorSlug}
                  onChange={(e) => {
                    setTargetMajorSlug(e.target.value);
                    if (typeof window !== "undefined") localStorage.setItem("student_target_major", e.target.value);
                  }}
                  className="w-full bg-surface border border-border rounded-xl p-2.5 text-xs text-foreground font-semibold"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Calculation Gauge */}
            {(() => {
              const currentMajor = majors.find((m) => m.slug === targetMajorSlug) || majors[0];
              const benchmarkScore = 85.0; // Benchmark cutoff
              const gpaDiff = Number((student.profile.tawjihiGpa - benchmarkScore).toFixed(1));
              const isAhead = gpaDiff >= 0;

              return (
                <div className="p-4 rounded-2xl bg-surface-2 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-muted-foreground">الفارق التنافسي التقديري:</span>
                    <span
                      className={`font-mono font-extrabold px-2.5 py-0.5 rounded-lg ${
                        isAhead
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {isAhead ? `+${gpaDiff}% أعلى من الحد الأدنى` : `${gpaDiff}% فارق للمنافسة`}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isAhead
                      ? `معدلك الحالي (${student.profile.tawjihiGpa}%) يمنحك أفضلية تنافسية ممتازة للالتحاق بـ ${currentMajor.name} في ${targetUni}.`
                      : `تحتاج إلى تركيز دراسي لرفع معدلك بمقدار ${Math.abs(gpaDiff)} علامة أو وضع البرنامج الموازي أو كليات الأقاليم كخيار استراتيجي.`}
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
            <Link
              to="/advisor"
              search={{
                q: `معدلي في التوجيهي ${student.profile.tawjihiGpa}% في ${BRANCH_LABELS[student.profile.tawjihiBranch]} وأريد دراسة ${majors.find((m) => m.slug === targetMajorSlug)?.name} في ${targetUni}، ما هي استراتيجيتي التنافسية؟`,
              }}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5"
            >
              <Bot className="size-4" />
              <span>استشر الذكاء الاصطناعي حول هذا الهدف</span>
            </Link>
          </div>
        </div>

        {/* Personal Academic Notes & Strategy */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
              <span className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                مفكرتي واستراتيجيتي الأكاديمية
              </span>
              {notesSaved && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 animate-in fade-in">
                  <Check className="size-3" />
                  تم الحفظ
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-3">
              اكتب ملاحظاتك الشخصية، ترتيب الرغبات الـ 30 في القبول الموحد، أو توجيهات المستشار الذكي:
            </p>

            <textarea
              rows={5}
              placeholder="مثال: الخيار 1 في القبول الموحد: الذكاء الاصطناعي في العلوم والتكنولوجيا. الخيار 2: الأمن السيبراني في اليرموك. إنهاء دورة CS50 قبل بدء الفصل الأول..."
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full bg-surface border border-border rounded-2xl p-3.5 text-xs text-foreground leading-relaxed focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              تُحفظ الملاحظات تلقائياً في جهازك
            </span>
            <button
              type="button"
              onClick={handleSaveNotes}
              className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90 cursor-pointer"
            >
              <Save className="size-3.5" />
              <span>حفظ الملاحظات</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarked Majors Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              التخصصات المفضلة والمحفوظة ({savedMajorsList.length})
            </h3>
            <p className="text-muted-foreground text-xs">
              التخصصات التي قمت بتمييزها لمقارنتها ومتابعة نسب تشغيلها.
            </p>
          </div>

          <Link
            to="/majors"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>استعراض كل التخصصات</span>
            <ArrowRight className="size-3 rotate-180" />
          </Link>
        </div>

        {savedMajorsList.length === 0 ? (
          <div className="p-8 text-center rounded-3xl border border-dashed border-border bg-surface/30">
            <Compass className="size-10 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-xs font-semibold text-muted-foreground">
              لم تقم بحفظ أي تخصص في قائمتك المفضلة بعد.
            </p>
            <Link
              to="/majors"
              className="mt-3 inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl"
            >
              تصفح دليل التخصصات واضغط على حفظ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {savedMajorsList.map((major) => {
              const match = student.evaluateMajorMatch(major.slug);
              return (
                <div
                  key={major.slug}
                  className="rounded-2xl border border-border bg-card p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          major.classification === "مطلوب"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : major.classification === "مشبع"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {major.classification}
                      </span>
                      <button
                        onClick={() => student.toggleMajorBookmark(major.slug)}
                        title="إزالة من المفضلة"
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    <h4 className="font-display font-bold text-sm text-foreground mb-1">
                      {major.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-5">
                      {major.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-muted-foreground">التوافق مع معدلك:</span>
                      <span className="text-primary font-bold">{match.matchScore}% ({match.status})</span>
                    </div>

                    <Link
                      to="/majors/$slug"
                      params={{ slug: major.slug }}
                      className="w-full bg-surface hover:bg-surface-2 border border-border text-foreground text-center font-bold text-xs py-2 rounded-xl block transition-colors"
                    >
                      فتح التحليل الكامل
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Certifications Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="size-5 text-primary" />
              خطة الشهادات والمهارات المعتمدة ({savedCertsList.length})
            </h3>
            <p className="text-muted-foreground text-xs">
              الشهادات المجانية المعتمدة عالمياً التي تتابع تقدمك فيها.
            </p>
          </div>

          <Link
            to="/certifications"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>استعراض كل الشهادات المجانية</span>
            <ArrowRight className="size-3 rotate-180" />
          </Link>
        </div>

        {savedCertsList.length === 0 ? (
          <div className="p-8 text-center rounded-3xl border border-dashed border-border bg-surface/30">
            <Award className="size-10 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-xs font-semibold text-muted-foreground">
              لم تبدأ بمتابعة أي شهادة بعد.
            </p>
            <Link
              to="/certifications"
              className="mt-3 inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl"
            >
              استكشف دورات هارفارد و سيسكو المجانية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {savedCertsList.map((cert) => {
              const progress = student.certProgress[cert.id] || {
                status: "not_started",
                progressPercent: 0,
              };
              const isDone = progress.status === "completed";

              return (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-border bg-card p-4 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                        {cert.provider}
                      </span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground p-1"
                        title="فتح صفحة الدورة الرسمية"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-foreground mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3">
                      {cert.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[11px] text-muted-foreground">حالة الإنجاز:</span>
                      <span
                        className={`text-[11px] font-bold ${
                          isDone
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {isDone ? "مكتملة وموثقة 🏆" : `${progress.progressPercent}% قيد الدراسة`}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isDone ? "bg-emerald-500" : "bg-primary"
                        }`}
                        style={{ width: `${progress.progressPercent || (isDone ? 100 : 20)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>متابعة الدراسة</span>
                        <ExternalLink className="size-3" />
                      </a>

                      {!isDone ? (
                        <button
                          onClick={() => student.updateCertProgress(cert.id, "completed", 100)}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          تحديد كمكتملة (+100 XP)
                        </button>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold inline-flex items-center gap-1">
                          <CheckCircle className="size-3.5" />
                          أحسنت الإنجاز!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Onboarding Wizard Modal */}
      <StudentOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
