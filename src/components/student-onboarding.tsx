import { useState } from "react";
import {
  Sparkles,
  School,
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  Building2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Trophy,
} from "lucide-react";

import { useStudent } from "@/hooks/use-student";
import { supabase } from "@/integrations/supabase/client";
import type { TawjihiBranch, UserRole } from "@/lib/student-store";

interface StudentOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES: {
  role: UserRole;
  label: string;
  icon: typeof School;
  desc: string;
}[] = [
  {
    role: "school_student",
    label: "طالب مدرسة (توجيهي)",
    icon: School,
    desc: "أبحث عن التخصص الأنسب لمعدلي وحساب تكاليف الجامعة",
  },
  {
    role: "uni_student",
    label: "طالب جامعي",
    icon: GraduationCap,
    desc: "أريد شهادات عالمية مجانية معتمدة وخطة لبناء مهاراتي",
  },
  {
    role: "graduate",
    label: "خريج باحث عن عمل",
    icon: Briefcase,
    desc: "أبحث عن مسارات العمل عن بُعد وسد فجوات الخبرة",
  },
  {
    role: "parent",
    label: "ولي أمر",
    icon: Users,
    desc: "أرغب في مقارنة تكاليف التخصصات ونسب الركود لمساندة أبنائي",
  },
  {
    role: "advisor",
    label: "مرشد أكاديمي / تربوي",
    icon: Compass,
    desc: "استخدام أدوات المنصة لتوجيه ومساندة الطلبة",
  },
  {
    role: "recruiter",
    label: "ممثل شركة / سوق عمل",
    icon: Building2,
    desc: "استكشاف الكفاءات الأكاديمية الصاعدة ومتطلبات التوظيف",
  },
];

const BRANCHES: { value: TawjihiBranch; label: string }[] = [
  { value: "scientific", label: "الفرع العلمي" },
  { value: "literary", label: "الفرع الأدبي" },
  { value: "industrial", label: "الفرع الصناعي" },
  { value: "information_tech", label: "تكنولوجيا المعلومات (IT)" },
  { value: "health", label: "الحقل الصحي والتمريضي" },
  { value: "agricultural", label: "الفرع الزراعي" },
];

const GOVERNORATES = [
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

const INTERESTS = [
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

export function StudentOnboarding({ isOpen, onClose }: StudentOnboardingProps) {
  const student = useStudent();
  const [step, setStep] = useState(1);

  const [role, setRole] = useState<UserRole>(student.profile.role || "school_student");
  const [branch, setBranch] = useState<TawjihiBranch>(student.profile.tawjihiBranch || "scientific");
  const [gpa, setGpa] = useState<number>(student.profile.tawjihiGpa || 84.5);
  const [governorate, setGovernorate] = useState<string>(student.profile.governorate || "عمان");
  const [interests, setInterests] = useState<string[]>(
    student.profile.interests?.length
      ? student.profile.interests
      : ["الذكاء الاصطناعي وتعلم الآلة", "تطوير البرمجيات والويب"],
  );
  const [budgetTier, setBudgetTier] = useState<"public_regular" | "public_parallel" | "private" | "flexible">(
    student.profile.budgetTier || "public_regular",
  );

  if (!isOpen) return null;

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleFinish = async () => {
    // Update local student store
    student.updateProfile({
      role,
      tawjihiBranch: branch,
      tawjihiGpa: gpa,
      governorate,
      interests,
      budgetTier,
    });

    // Sync to Supabase auth user metadata if authenticated
    try {
      await supabase.auth.updateUser({
        data: {
          role,
          tawjihiBranch: branch,
          tawjihiGpa: gpa,
          governorate,
          interests,
          budgetTier,
          onboarded: true,
        },
      });
    } catch {
      // Offline fallback
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {step}/4
            </span>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                {step === 1 && "الخطوة الأولى: تحديد هويتك ودورك الأكاديمي"}
                {step === 2 && "الخطوة الثانية: بيانات التوجيهي والمحافظة"}
                {step === 3 && "الخطوة الثالثة: اهتماماتك وشغفك الأكاديمي"}
                {step === 4 && "الخطوة الرابعة: المسار والميزانية المفضلة"}
              </h2>
              <span className="text-[11px] text-muted-foreground">
                سنستخدم هذه البيانات لتوليد بطاقتك وتخصيص توصيات التخصصات لك فورياً
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground font-semibold px-2 py-1 rounded-lg"
          >
            تخطي
          </button>
        </div>

        {/* STEP 1: Role Picker */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <p className="text-xs text-muted-foreground font-semibold">
              اختر الفئة التي تنتمي إليها للاستفادة من الأدوات المصممة لك:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setRole(item.role)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary shadow-xs"
                        : "border-border bg-surface/40 hover:bg-surface hover:border-border"
                    }`}
                  >
                    <div
                      className={`size-9 rounded-xl flex shrink-0 items-center justify-center ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-foreground block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Tawjihi Branch, GPA & Governorate */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <label className="block text-xs font-bold text-foreground mb-2">
                فرع الثانوية العامة (التوجيهي):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BRANCHES.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBranch(b.value)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      branch === b.value
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface/50 rounded-2xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-foreground">
                  المعدل (المتوقع أو الحقيقي):
                </label>
                <span className="font-display text-lg font-extrabold text-primary bg-primary/10 px-3 py-0.5 rounded-xl">
                  {gpa.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="0.5"
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                className="w-full accent-primary h-2 bg-surface-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                المحافظة (لتحديد الجامعات الأقرب لك):
              </label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs sm:text-sm focus:border-primary focus:outline-none"
              >
                {GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: Academic Interests */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <p className="text-xs text-muted-foreground font-semibold">
              اختر المجالات التي تجذبك أو ترغب في استكشاف تخصصاتها:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {INTERESTS.map((item) => {
                const selected = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item} {selected ? "✓" : "+"}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Budget Tier & Finalize */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <p className="text-xs text-muted-foreground font-semibold">
              ما هو المسار الدراسي والبرنامج المفضل لميزانيتك الجامعية؟
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "public_regular",
                  title: "البرنامج التنافسي (حكومي)",
                  desc: "الاعتماد على معدل القبول الموحد بأقل تكلفة لسعر الساعة.",
                },
                {
                  id: "public_parallel",
                  title: "البرنامج الموازي (حكومي)",
                  desc: "قبول في الجامعات الرسمية بمعدل أقل مع رسوم ساعة أعلى.",
                },
                {
                  id: "private",
                  title: "الجامعات الخاصة",
                  desc: "مرونة عالية في القبول وتجهيزات حديثة مع خصومات للمتفوقين.",
                },
                {
                  id: "flexible",
                  title: "مرن ومفتوح لكافة الخيارات",
                  desc: "مقارنة كافة المسارات والفرص لاختيار الأنسب عائداً على الاستثمار.",
                },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudgetTier(tier.id as any)}
                  className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                    budgetTier === tier.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary shadow-xs"
                      : "border-border bg-surface/50 hover:bg-surface"
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-foreground block">
                    {tier.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground block mt-1 leading-5">
                    {tier.desc}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5">
              <Trophy className="size-4 shrink-0" />
              <span>
                إكمال هذا الإعداد يمنحك فوراً <strong>+100 نقطة خبرة</strong> وتفعيل هوية الطالب الأكاديمية!
              </span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="border border-border hover:bg-surface text-foreground font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <ArrowRight className="size-3.5" />
              <span>السابق</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
            >
              <span>التالي</span>
              <ArrowLeft className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-102"
            >
              <Sparkles className="size-4" />
              <span>إتمام ملفي وتوليد هويتي الأكاديمية 🎓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
