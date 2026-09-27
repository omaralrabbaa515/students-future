import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  School,
  Briefcase,
  Users,
  Compass,
  Building2,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  saveStudentState,
  type UserRole,
  type TawjihiBranch,
} from "@/lib/student-store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول وبوابة الحسابات | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "تسجيل دخول شامل لجميع الأدوار: طلاب التوجيهي، الجامعيين، الخريجين، أولياء الأمور، المرشدين الأكاديميين، وممثلي سوق العمل عبر Google أو البريد الإلكتروني.",
      },
      { property: "og:title", content: "بوابة تسجيل الدخول | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "انضم إلى منصة الطلاب والمستقبل وخصّص مسارك الأكاديمي والمهني.",
      },
    ],
  }),
  component: AuthPage,
});

const ROLE_OPTIONS: {
  role: UserRole;
  label: string;
  icon: typeof School;
  desc: string;
}[] = [
  {
    role: "school_student",
    label: "طالب مدرسة (توجيهي)",
    icon: School,
    desc: "مطابقة التخصصات لمعدلي وحساب تكاليف الجامعة",
  },
  {
    role: "uni_student",
    label: "طالب جامعي",
    icon: GraduationCap,
    desc: "خارطة الشهادات المعتمدة واكتساب المهارات لسوق العمل",
  },
  {
    role: "graduate",
    label: "خريج باحث عن عمل",
    icon: Briefcase,
    desc: "فرص العمل عن بُعد وسد فجوات الخبرة بشهادات عالمية",
  },
  {
    role: "parent",
    label: "ولي أمر",
    icon: Users,
    desc: "مقارنة تكاليف التخصصات ونسب الركود وتوجيه الأبناء",
  },
  {
    role: "advisor",
    label: "مرشد أكاديمي / تربوي",
    icon: Compass,
    desc: "أدوات متطورة لمساندة وتوجيه الطلبة نحو تخصصات المستقبل",
  },
  {
    role: "recruiter",
    label: "ممثل شركة / سوق عمل",
    icon: Building2,
    desc: "استكشاف المهارات الأكاديمية والربط مع الكفاءات الصاعدة",
  },
];

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

const TAWJIHI_BRANCHES: { value: TawjihiBranch; label: string }[] = [
  { value: "scientific", label: "الفرع العلمي" },
  { value: "literary", label: "الفرع الأدبي" },
  { value: "industrial", label: "الفرع الصناعي" },
  { value: "information_tech", label: "تكنولوجيا المعلومات (IT)" },
  { value: "health", label: "الحقل الصحي / التمريضي" },
  { value: "agricultural", label: "الفرع الزراعي" },
];

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("school_student");
  const [tawjihiBranch, setTawjihiBranch] = useState<TawjihiBranch>("scientific");
  const [tawjihiGpa, setTawjihiGpa] = useState<number>(85.0);
  const [governorate, setGovernorate] = useState<string>("عمان");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Check if session is already active
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // If already signed in, go directly to profile
        void navigate({ to: "/profile" });
      }
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name || "طالب طموح",
              role,
              tawjihiBranch,
              tawjihiGpa,
              governorate,
            },
            emailRedirectTo: `${window.location.origin}/profile`,
          },
        });

        if (error) throw error;

        // Sync local state immediately
        saveStudentState({
          profile: {
            name: name || "طالب طموح",
            role,
            tawjihiBranch,
            tawjihiGpa,
            governorate,
            budgetTier: "public_regular",
            interests: ["التكنولوجيا والذكاء الاصطناعي"],
          },
        });

        if (data.session) {
          setMessage({
            type: "success",
            text: "أهلاً بك! تم إنشاء حسابك بنجاح، جاري تحويلك إلى ملفك الأكاديمي…",
          });
          setTimeout(() => void navigate({ to: "/profile" }), 1200);
        } else {
          setMessage({
            type: "success",
            text: "تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد التسجيل أو تسجيل الدخول فوراً.",
          });
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // If user has metadata, update student store
        if (data.user?.user_metadata) {
          const meta = data.user.user_metadata;
          saveStudentState({
            profile: {
              name: meta.full_name || "مستخدم متميز",
              role: (meta.role as UserRole) || "school_student",
              tawjihiBranch: (meta.tawjihiBranch as TawjihiBranch) || "scientific",
              tawjihiGpa: Number(meta.tawjihiGpa) || 82.0,
              governorate: meta.governorate || "عمان",
              budgetTier: "public_regular",
              interests: ["التكنولوجيا"],
            },
          });
        }

        setMessage({
          type: "success",
          text: "تم تسجيل الدخول بنجاح! جاري توجيهك الآن…",
        });

        const userEmail = data.user?.email?.toLowerCase();
        const isAdmin = userEmail === "jowmahmoud6@gmail.com" || userEmail === "mralrba0@gmail.com";

        setTimeout(() => {
          if (isAdmin) {
            void navigate({ to: "/updates" });
          } else {
            void navigate({ to: "/profile" });
          }
        }, 1000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "تعذّر إكمال العملية، يرجى المحاولة لاحقاً",
      });
    } finally {
      setBusy(false);
    }
  }

  function fillAdminCredentials() {
    setEmail("jowmahmoud6@gmail.com");
    setPassword("MasterAdmin#2026");
    setMode("signin");
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "يرجى كتابة بريدك الإلكتروني أولاً لاستعادة كلمة المرور" });
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      setMessage({
        type: "success",
        text: "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح.",
      });
      setIsResetOpen(false);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "تعذّر إرسال رابط الاستعادة",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      {/* Top Header Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center size-14 rounded-3xl bg-primary/10 text-primary mb-3 shadow-inner">
          <Sparkles className="size-7" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
          {mode === "signin" ? "مرحباً بعودتك إلى المنصة" : "انضم إلى منصة الطلاب والمستقبل"}
        </h1>
        <p className="text-muted-foreground mt-2 text-xs sm:text-sm leading-6 max-w-md mx-auto">
          بوابتك الموحدة للمطابقة الأكاديمية الذكية، الشهادات المجانية المعتمدة، وخوارزميات التوظيف الأردنية.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="border-border bg-card rounded-3xl border p-6 sm:p-8 shadow-xl">
        {/* Sign In / Sign Up Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-surface-2 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage(null);
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === "signin"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn className="size-4" />
            <span>تسجيل الدخول</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage(null);
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === "signup"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus className="size-4" />
            <span>إنشاء حساب جديد</span>
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: عمر الرباع"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm focus:border-primary focus:outline-none"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  نوع الحساب والدور الأكاديمي
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ROLE_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = role === item.role;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => setRole(item.role)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 ring-1 ring-primary"
                            : "border-border/70 bg-surface/50 hover:bg-surface"
                        }`}
                      >
                        <div
                          className={`size-7 rounded-lg flex shrink-0 items-center justify-center ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-2 text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <span className="font-bold text-xs block text-foreground leading-tight">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tawjihi details if role is student */}
              {(role === "school_student" || role === "uni_student") && (
                <div className="bg-surface/60 rounded-2xl p-3.5 border border-border/70 space-y-3">
                  <span className="text-xs font-bold text-foreground block">
                    بيانات التوجيهي والمحافظة (لتخصيص المطابقة):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                        فرع التوجيهي
                      </label>
                      <select
                        value={tawjihiBranch}
                        onChange={(e) => setTawjihiBranch(e.target.value as TawjihiBranch)}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
                      >
                        {TAWJIHI_BRANCHES.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                        المعدل (حقيقي/متوقع)
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="100"
                        step="0.1"
                        value={tawjihiGpa}
                        onChange={(e) => setTawjihiGpa(parseFloat(e.target.value) || 75)}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                        المحافظة
                      </label>
                      <select
                        value={governorate}
                        onChange={(e) => setGovernorate(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
                      >
                        {JORDAN_GOVERNORATES.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">كلمة المرور</label>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => setIsResetOpen(!isResetOpen)}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  نسيت كلمة المرور؟
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="٨ خانات على الأقل"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm pe-10 focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 pe-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Reset password form inline */}
          {isResetOpen && (
            <div className="p-3 bg-surface-2 rounded-2xl text-xs space-y-2 border border-border">
              <p className="text-muted-foreground leading-5">
                أدخل بريدك الإلكتروني في الحقل أعلاه واضغط الزر لإرسال رابط إعادة تعيين كلمة المرور:
              </p>
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={busy}
                className="bg-primary text-primary-foreground text-xs font-bold py-1.5 px-3 rounded-xl disabled:opacity-50"
              >
                إرسال رابط الاستعادة
              </button>
            </div>
          )}

          {/* Feedback messages */}
          {message && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 leading-6 ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary text-primary-foreground hover:opacity-95 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {busy ? (
              <span className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : mode === "signin" ? (
              <>
                <span>تسجيل الدخول ومتابعة مساري</span>
                <ArrowRight className="size-4 rotate-180" />
              </>
            ) : (
              <>
                <span>إنشاء الحساب وبدء الاستكشاف</span>
                <Sparkles className="size-4" />
              </>
            )}
          </button>
        </form>

        {/* Mode Toggle Footer */}
        <div className="mt-6 pt-5 border-t border-border/70 text-center text-xs text-muted-foreground">
          {mode === "signin" ? (
            <p>
              ليس لديك حساب بعد؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setMessage(null);
                }}
                className="font-bold text-primary hover:underline ms-1"
              >
                أنشئ حسابك مجاناً الآن
              </button>
            </p>
          ) : (
            <p>
              لديك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setMessage(null);
                }}
                className="font-bold text-primary hover:underline ms-1"
              >
                سجّل الدخول لحسابك
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Admin Notice & Quick Fill */}
      <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-3.5 text-primary" />
          <span>حسابات إدارة المنصة يتم تفعيل صلاحياتها تلقائياً عند تسجيل الدخول.</span>
        </div>
        <button
          type="button"
          onClick={fillAdminCredentials}
          className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
        >
          👑 تعبئة بيانات حساب المدير العام (jowmahmoud6@gmail.com)
        </button>
      </div>
    </div>
  );
}
