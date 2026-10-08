import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Scale,
  Bot,
  Compass,
  GraduationCap,
  Building2,
  ArrowRight,
  Save,
  Shield,
  ExternalLink,
} from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { majors } from "@/data/majors";
import { certifications } from "@/data/certifications";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي والملف الأكاديمي | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "لوحة حسابك الأكاديمي الموحدة: ملفك الأكاديمي، بنك الشارات التفاعلي، والتخصصات والشهادات المحفوظة.",
      },
    ],
  }),
  component: AccountPage,
});

type Badge = {
  id: string;
  title: string;
  category: "استكشاف" | "مقارنة" | "شهادات" | "ذكاء اصطناعي" | "اعتمادات";
  iconName: string;
  description: string;
  howToEarn: string;
  isUnlocked: boolean;
  progressPercent: number;
  rewardText: string;
};

const JORDANIAN_UNIVERSITIES = [
  "الجامعة الأردنية (عمان)",
  "جامعة العلوم والتكنولوجيا الأردنية (إربد)",
  "الجامعة الهاشمية (الزرقاء)",
  "جامعة اليرموك (إربد)",
  "جامعة الأميرة سمية للتكنولوجيا (عمان)",
  "جامعة البلقاء التطبيقية (السلط)",
  "جامعة مؤتة (الكرك)",
  "جامعة آل البيت (المفرق)",
  "جامعة الحسين بن طلال (معان)",
  "الجامعة الألمانية الأردنية (مادبا)",
  "جامعة عمان الأهلية",
  "جامعة العلوم التطبيقية الخاصة",
  "جامعة الشرق الأوسط",
  "جامعة البترا",
  "جامعة الزيتونة الأردنية",
  "جامعة فيلادلفيا",
  "جامعة إربد الأهلية",
  "جامعة جرش",
  "جامعة الزرقاء",
];

const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-explore",
    title: "مستكشف التخصصات الأردنية",
    category: "استكشاف",
    iconName: "Compass",
    description: "الاطلاع على نسب التشغيل والتصنيفات الرسمية لـ 5 تخصصات أردنية مختلفة.",
    howToEarn:
      "تصفح دليل التخصصات وافتح تفاصيل 5 تخصصات للتحقق من أرقام ديوان الخدمة المدنية ومستوى الطلب بسوق العمل.",
    isUnlocked: true,
    progressPercent: 100,
    rewardText: "مُكتسبة: مستكشف مطلع على بيانات السوق الأردني",
  },
  {
    id: "badge-compare",
    title: "رائد المقارنة اللحظية",
    category: "مقارنة",
    iconName: "Scale",
    description: "إجراء مقارنة تحليلية مباشرة بين تخصصين عبر مختبر المقارنة اللحظية.",
    howToEarn:
      "ادخل إلى «مختبر المقارنة اللحظية»، واختر تخصصين ترغب بالمفاضلة بينهما، واطلع على بطاقات المقارنة وجدول الاعتمادات.",
    isUnlocked: true,
    progressPercent: 100,
    rewardText: "مُكتسبة: قادر على اتخاذ قرار أكاديمي مبني على البيانات",
  },
  {
    id: "badge-advisor",
    title: "المحاور الأكاديمي الذكي",
    category: "ذكاء اصطناعي",
    iconName: "Bot",
    description: "إكمال جلسة إرشاد تفاعلية كاملة مع المستشار الذكي للحصول على خطة مسار عملية.",
    howToEarn:
      "استشر «المستشار الذكي»، وزوده بمعدلك في الثانوية واهتماماتك، وتفاعل معه حتى يقدم لك التوصية والبدائل المحددة.",
    isUnlocked: true,
    progressPercent: 100,
    rewardText: "مُكتسبة: حصلت على استشارة مدعومة ببيانات المنصة الرسمية",
  },
  {
    id: "badge-certs",
    title: "سفير الشهادات المجانية",
    category: "شهادات",
    iconName: "Award",
    description: "استعراض والاطلاع على تفاصيل إحدى الشهادات العالمية المعتمدة من الجهات الست.",
    howToEarn:
      "ادخل إلى قسم «الشهادات المجانية»، وتعرف على مسار إحدى الشهادات المجانية من جامعة هارفارد أو سيسكو أو هلسنكي وطريقة الحصول عليها.",
    isUnlocked: false,
    progressPercent: 65,
    rewardText: "قيد الإنجاز: افتح مسار شهادة مجانية معتمدة لتكتمل الشارة",
  },
  {
    id: "badge-accreditation",
    title: "محلل الاعتمادات والجامعات",
    category: "اعتمادات",
    iconName: "Building2",
    description: "التحقق من اعتمادات ABET وهيئة الاعتماد والجامعات الأردنية المطروحة لتخصصك.",
    howToEarn:
      "راجع خريطة الجامعات والاعتمادات في أي تخصص لمعرفة الجامعات التي تمنح اعتمادات دولية ونقابية معترف بها.",
    isUnlocked: false,
    progressPercent: 40,
    rewardText: "قيد الإنجاز: راجع اعتمادات 3 جامعات أردنية لتكتمل الشارة",
  },
  {
    id: "badge-graduate",
    title: "مخطط المستقبل المتكامل",
    category: "استكشاف",
    iconName: "GraduationCap",
    description: "تحديد مسارك الأكاديمي المستهدف وتحديث بياناتك في هذا الملف الأكاديمي.",
    howToEarn:
      "اختر تخصصك المستهدف والجامعة المفضلة ومعدلك في نموذج «ملفي الأكاديمي» أدناه واضغط زر الحفظ.",
    isUnlocked: false,
    progressPercent: 50,
    rewardText: "قيد الإنجاز: حدد بياناتك الأكاديمية واضغط حفظ لتكتمل الشارة",
  },
];

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading, avatarUrl, displayName, isAdmin } = useAuth();

  // Academic Profile State
  const [targetMajor, setTargetMajor] = useState("علوم الحاسوب");
  const [targetUniversity, setTargetUniversity] = useState("الجامعة الأردنية (عمان)");
  const [highSchoolGrade, setHighSchoolGrade] = useState("85.5");
  const [careerInterest, setCareerInterest] = useState("البرمجة والتقنيات السحابية");
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Active Tab
  const [tab, setTab] = useState<"profile" | "badges" | "saved">("profile");

  useEffect(() => {
    // Load local academic profile preferences if present
    const saved = localStorage.getItem("user_academic_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          major?: string;
          university?: string;
          grade?: string;
          interest?: string;
        };
        if (parsed.major) setTargetMajor(parsed.major);
        if (parsed.university) setTargetUniversity(parsed.university);
        if (parsed.grade) setHighSchoolGrade(parsed.grade);
        if (parsed.interest) setCareerInterest(parsed.interest);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      major: targetMajor,
      university: targetUniversity,
      grade: highSchoolGrade,
      interest: careerInterest,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("user_academic_profile", JSON.stringify(data));
    setSavedNotice("تم حفظ تفضيلات ملفك الأكاديمي بنجاح!");
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const unlockedCount = INITIAL_BADGES.filter((b) => b.isUnlocked).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      {/* User Header with Email Avatar */}
      <div className="card-surface relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="size-24 rounded-2xl object-cover border-2 border-brand/50 shadow-md ring-4 ring-brand/10"
              />
            ) : (
              <div className="flex size-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-secondary text-2xl font-bold text-white shadow-md">
                {displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground shadow-xs">
              ✓
            </div>
          </div>

          <div className="flex-1 text-center sm:text-right space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {displayName}
              </h1>
              {isAdmin ? (
                <span className="pill text-xs bg-brand/20 text-brand border border-brand/40">
                  مشرف تنفيذي
                </span>
              ) : (
                <span className="pill text-xs bg-secondary/20 text-secondary border border-secondary/40">
                  طالب جامعي / توجيهي
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground dir-ltr font-mono">
              {user?.email || "طالب مسجل في منصة الطلاب والمستقبل"}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4 text-accent" />
                <span>الشارات المكتسبة: <strong className="text-foreground">{unlockedCount} من {INITIAL_BADGES.length}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-4 text-brand" />
                <span>التخصص المستهدف: <strong className="text-foreground">{targetMajor}</strong></span>
              </span>
            </div>
          </div>

          {/* Quick Admin or Action Button */}
          {isAdmin && (
            <div className="shrink-0 self-center sm:self-start">
              <Link
                to="/updates"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand/50 bg-brand/10 px-4 py-2 text-xs font-bold text-brand hover:bg-brand/20 transition-colors"
              >
                <Shield className="size-4" />
                <span>لوحة التحديثات</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-8 flex border-b border-border gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setTab("profile")}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            tab === "profile"
              ? "border-brand text-brand"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          ملفي الأكاديمي
        </button>

        <button
          type="button"
          onClick={() => setTab("badges")}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            tab === "badges"
              ? "border-brand text-brand"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>بنك الشارات التفاعلي</span>
          <span className="rounded-full bg-accent/20 px-2 py-0.2 text-xs text-accent font-extrabold">
            {unlockedCount}/{INITIAL_BADGES.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTab("saved")}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            tab === "saved"
              ? "border-brand text-brand"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          الدورات المجانية الموصى بها
        </button>
      </div>

      {/* Tab 1: ملفي الأكاديمي (Academic Profile) */}
      {tab === "profile" && (
        <div className="mt-6 space-y-6">
          <form onSubmit={handleSaveProfile} className="card-surface p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                بيانات المسار الأكاديمي
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                حدد تخصصك المهتم به والجامعة ومعدلك لتخصيص الاستشارات والمقارنات اللحظية وفق بياناتك الشخصية.
              </p>
            </div>

            {savedNotice && (
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-sm font-bold text-accent flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{savedNotice}</span>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  التخصص الأكاديمي المستهدف
                </label>
                <select
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none"
                >
                  {majors.map((m) => (
                    <option key={m.slug} value={m.name}>
                      {m.name} ({m.classification})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  الجامعة المفضلة أو التي تدرس بها
                </label>
                <select
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none"
                >
                  {JORDANIAN_UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  معدل الثانوية العامة (التوجيهي)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="50"
                  max="100"
                  value={highSchoolGrade}
                  onChange={(e) => setHighSchoolGrade(e.target.value)}
                  placeholder="مثال: 85.5"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  مجال الشغف والاهتمام الوظيفي
                </label>
                <input
                  type="text"
                  value={careerInterest}
                  onChange={(e) => setCareerInterest(e.target.value)}
                  placeholder="مثال: الأمن السيبراني، الذكاء الاصطناعي، إدارة المشاريع"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-brand text-brand-foreground px-5 py-2.5 text-sm font-bold shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                <Save className="size-4" />
                <span>حفظ البيانات الأكاديمية</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-xs font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <Scale className="size-3.5 text-secondary" />
                  <span>مقارنة تخصصي في المختبر</span>
                </Link>
                <Link
                  to="/advisor"
                  search={{ q: targetMajor }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-brand/40 bg-brand/10 px-3.5 py-2 text-xs font-bold text-brand hover:bg-brand/20 transition-colors"
                >
                  <Bot className="size-3.5" />
                  <span>استشارة ذكية لتخصصي</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: بنك الشارات التفاعلي (Badges Bank) */}
      {tab === "badges" && (
        <div className="mt-6 space-y-6">
          <div className="card-surface p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="pill text-xs bg-accent/15 text-accent border border-accent/30 font-bold">
                  بنك الشارات والأوسمة الأكاديمية
                </span>
                <h2 className="font-display text-xl font-extrabold text-foreground mt-2">
                  اكتسب شارات الإنجاز وطوّر ميزتك التنافسية
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-6">
                  كل شارة تمثل خطوة نوعية في وعيك الأكاديمي والمهني. اطلع على متطلبات كل شارة أدناه واكتشف كيفية فتحها بسهولة.
                </p>
              </div>

              <div className="text-center sm:text-left bg-surface-2 p-3.5 rounded-2xl border border-border">
                <p className="text-xs text-muted-foreground">نسبة الإنجاز الإجمالية</p>
                <p className="font-display text-2xl font-black text-brand mt-0.5">
                  {Math.round((unlockedCount / INITIAL_BADGES.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INITIAL_BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`card-surface flex flex-col justify-between p-5 relative overflow-hidden transition-all duration-300 ${
                  badge.isUnlocked
                    ? "border-accent/30 shadow-[0_4px_20px_-4px_rgba(52,211,153,0.15)]"
                    : "opacity-85"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`pill text-[11px] ${
                        badge.isUnlocked
                          ? "bg-accent/20 text-accent font-bold"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      {badge.category}
                    </span>

                    {badge.isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent">
                        <CheckCircle2 className="size-3.5" />
                        <span>مُكتسبة</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                        <Lock className="size-3.5" />
                        <span>مقفلة ({badge.progressPercent}%)</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                        badge.isUnlocked
                          ? "bg-accent/20 text-accent border border-accent/40 shadow-xs"
                          : "bg-surface-2 text-muted-foreground border border-border"
                      }`}
                    >
                      {badge.iconName === "Compass" && <Compass className="size-5" />}
                      {badge.iconName === "Scale" && <Scale className="size-5" />}
                      {badge.iconName === "Bot" && <Bot className="size-5" />}
                      {badge.iconName === "Award" && <Award className="size-5" />}
                      {badge.iconName === "Building2" && <Building2 className="size-5" />}
                      {badge.iconName === "GraduationCap" && <GraduationCap className="size-5" />}
                    </div>

                    <h3 className="font-display font-bold text-sm text-foreground">
                      {badge.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 leading-6">
                    {badge.description}
                  </p>

                  {/* HOW TO EARN - الشرح الدقيق لكيفية الحصول عليها */}
                  <div className="mt-4 rounded-xl border border-border/80 bg-surface-2/60 p-3 text-xs">
                    <p className="font-bold text-foreground mb-1 flex items-center gap-1">
                      <Sparkles className="size-3 text-brand" />
                      <span>طريقة فتح الشارة:</span>
                    </p>
                    <p className="text-muted-foreground leading-5">{badge.howToEarn}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>التقدم</span>
                    <span className="font-bold text-foreground">{badge.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        badge.isUnlocked ? "bg-accent" : "bg-brand"
                      }`}
                      style={{ width: `${badge.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: المسارات والشهادات الموصى بها (Saved Recommendations) */}
      {tab === "saved" && (
        <div className="mt-6 space-y-6">
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-bold text-foreground">
              الدورات التدريبية المجانية المقترحة لتخصصك
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              دورات تدريبية معتمدة مجاناً من منصات وجامعات رائدة لبناء ميزة تنافسية حقيقية.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certifications.slice(0, 4).map((cert) => (
                <div key={cert.id} className="card-surface p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand">{cert.provider}</span>
                      <span className="pill text-[10px] bg-secondary/15 text-secondary">
                        {cert.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground mt-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-6 line-clamp-2">
                      {cert.summary}
                    </p>
                    <div className="mt-3 text-[11px] text-muted-foreground bg-surface-2 p-2 rounded-lg">
                      <strong className="text-foreground">طريقة الحصول:</strong> {cert.howToGet}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                    >
                      <span>بدء الدورة مجاناً</span>
                      <ExternalLink className="size-3" />
                    </a>

                    <Link
                      to="/advisor"
                      search={{ q: `كيف تفيدني شهادة ${cert.title} في سوق العمل؟` }}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      استشر الذكاء الاصطناعي
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
