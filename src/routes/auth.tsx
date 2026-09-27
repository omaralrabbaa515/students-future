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

  async function handleGoogle() {
    setBusy(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile?onboarding=true`,
        },
      });
      if (error) {
        if (
          error.message?.includes("provider is not enabled") ||
          error.message?.includes("Unsupported provider") ||
          error.message?.includes("validation_failed")
        ) {
          setMessage({
            type: "error",
            text: "تنبيه: مزود تسجيل Google غير مفعّل بعد في لوحة Supabase. لتفعيله: ادخل على Supabase Dashboard -> Authentication -> Providers -> Google وقم بتشغيله وإدخال Client ID و Secret. حالياً، يمكنك إنشاء حسابك وتسجيل الدخول فوراً عبر البريد وكلمة المرور أدناه!",
          });
          setBusy(false);
          return;
        }
        throw error;
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "تعذّر المتابعة باستخدام حساب Google",
      });
      setBusy(false);
    }
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

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogle}
          disabled={busy}
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-border bg-card hover:bg-surface py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-foreground transition-all shadow-2xs hover:shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {/* Google SVG Icon */}
          <svg className="size-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>المتابعة السريعة بحساب Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-3 text-[11px] font-semibold text-muted-foreground uppercase">
            أو عبر البريد الإلكتروني
          </span>
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

      {/* Admin Notice */}
      <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <ShieldCheck className="size-3.5 text-primary" />
        <span>حسابات إدارة المنصة يتم تفعيل صلاحياتها تلقائياً عند تسجيل الدخول.</span>
      </div>
    </div>
  );
}
