import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Globe2,
  GraduationCap,
  Calculator,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Stamp,
  Wallet,
  Compass,
  Layers,
  Award,
  ArrowLeft,
  Info,
  Scale,
  Sparkles,
  Building2,
} from "lucide-react";
import {
  GUIDE_PARTS_META,
  JORDAN_FOUR_ACADEMIC_FIELDS,
  ARAB_CERTIFICATE_MAPPING_RULES,
  COUNTRIES_EQUIVALENCY_DATA,
  ADMISSION_THRESHOLDS_TABLE,
  type GuidePartSummaryCard,
  type CountryEquivalencyInfo,
} from "@/data/international-guide";
import { buildMetaTags, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/international-guide")({
  head: () => ({
    meta: buildMetaTags({
      title: "مرشد الطلبة الوافدين | معادلة الشهادات العربية والحقول الأكاديمية في الأردن 2026",
      description:
        "الدليل الرسمي الشامل للطلبة الوافدين في الجامعات الأردنية (9 أجزاء): هيكلية الحقول الأكاديمية الأربعة، حساب ومعادلة شهادات 22 دولة عربية، الحدود الدنيا للقبول واستثناء الـ 5 علامات، التجسير والانتقال، وسلسلة التصديقات والرسوم.",
      keywords:
        "مرشد الطلبة الوافدين، ادرس في الأردن، معادلة الشهادات العربية في الأردن، معدلات قبول الوافدين الأردن، استثناء 5 علامات للوافدين، الحقول الأكاديمية الأربعة في الأردن",
      path: "/international-guide",
    }),
    links: [{ rel: "canonical", href: `${SITE_URL}/international-guide` }],
  }),
  component: InternationalStudentsGuidePage,
});

function ExplanatoryPartCard({ meta }: { meta: GuidePartSummaryCard }) {
  return (
    <div className="mb-8 rounded-3xl border-2 border-brand/30 bg-gradient-to-br from-brand/10 via-card to-surface p-6 sm:p-7 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/30 px-3.5 py-1 text-xs font-extrabold text-brand-ink">
          <Info className="size-3.5" />
          {meta.explanatoryCard.badge}
        </span>
        <span className="font-mono text-xs font-bold text-muted-foreground bg-surface px-3 py-1 rounded-full border border-border">
          القسم المستقل {meta.partNumber} من 9
        </span>
      </div>

      <h3 className="font-display text-lg sm:text-xl font-extrabold text-foreground">
        {meta.explanatoryCard.headline}
      </h3>
      <p className="mt-2.5 text-sm leading-8 text-muted-foreground">
        {meta.explanatoryCard.description}
      </p>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {meta.explanatoryCard.keyHighlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-background/80 p-3.5 text-xs leading-6 text-foreground"
          >
            <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs sm:text-sm leading-7 text-foreground">
        <Sparkles className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-1" />
        <div>
          <span className="font-extrabold text-amber-700 dark:text-amber-300">القاعدة التوضيحية الذهبية: </span>
          <span>{meta.explanatoryCard.goldenRule}</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeaderBanner({ meta }: { meta: GuidePartSummaryCard }) {
  return (
    <div className="mb-5 flex flex-col gap-2 border-b border-border pb-5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono text-sm font-extrabold shadow-xs">
          0{meta.partNumber}
        </span>
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-ink">
          {meta.partLabel}
        </span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-snug">
        {meta.partLabel}: {meta.title}
      </h2>
      <p className="text-sm text-muted-foreground leading-7">{meta.subtitle}</p>
    </div>
  );
}

function CountryCard({ item }: { item: CountryEquivalencyInfo }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:border-brand/40 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-ink font-mono text-sm font-extrabold border border-brand/30">
            {item.number}
          </span>
          <div>
            <h4 className="font-display text-base sm:text-lg font-extrabold text-foreground">
              {item.country}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{item.certificateName}</p>
          </div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold text-muted-foreground border border-border">
          الفئة {item.category}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface/70 border border-border/60 p-3.5">
          <span className="text-[11px] font-extrabold text-brand-ink block mb-1">
            القاعدة الحسابية المعتمدة:
          </span>
          <p className="text-xs sm:text-sm leading-6 text-foreground font-medium">
            {item.calculationRule}
          </p>
        </div>
        <div className="rounded-xl bg-surface/70 border border-border/60 p-3.5">
          <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">
            الإجراء ووثيقة المعادلة:
          </span>
          <p className="text-xs sm:text-sm leading-6 text-foreground font-medium">
            {item.equivalencyDocStatus}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs font-extrabold text-foreground block mb-2.5">
          تسكين الشعب والمسارات في الحقول الأكاديمية الأربعة:
        </span>
        <div className="space-y-2.5">
          {item.tracks.map((t, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/80 bg-background p-3.5 flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  • {t.trackName}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {t.mappedJordanFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full bg-brand/10 text-brand-ink border border-brand/25 px-2.5 py-0.5 text-[11px] font-bold"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">{t.details}</p>
            </div>
          ))}
        </div>
      </div>

      {item.specialNotes && (
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs leading-6 text-foreground">
          <span className="font-extrabold text-amber-700 dark:text-amber-300">ملاحظة تنظيمية هامة: </span>
          {item.specialNotes}
        </div>
      )}
    </div>
  );
}

function InternationalStudentsGuidePage() {
  const [selectedPartFilter, setSelectedPartFilter] = useState<number | "all">("all");

  // Part 1 Interactive Equivalency & Field Simulator State
  const [simCountryNum, setSimCountryNum] = useState<number>(10); // Default: Egypt
  const [simTrackIdx, setSimTrackIdx] = useState<number>(0);
  const [simDirectPercent, setSimDirectPercent] = useState<number>(85);
  const [simStudentScore, setSimStudentScore] = useState<number>(348.5);
  const [simMaxScore, setSimMaxScore] = useState<number>(410);
  const [simScoreOutOf20, setSimScoreOutOf20] = useState<number>(15.4);

  const selectedCountryObj = useMemo(() => {
    return (
      COUNTRIES_EQUIVALENCY_DATA.find((c) => c.number === simCountryNum) ??
      COUNTRIES_EQUIVALENCY_DATA[0]
    );
  }, [simCountryNum]);

  const selectedTrackObj = useMemo(() => {
    return selectedCountryObj.tracks[simTrackIdx] ?? selectedCountryObj.tracks[0];
  }, [selectedCountryObj, simTrackIdx]);

  const calculatedJordanGpa = useMemo(() => {
    if (selectedCountryObj.formulaType === "direct_percent" || selectedCountryObj.formulaType === "tracks_gpa") {
      return Math.min(100, Math.max(0, Number(simDirectPercent.toFixed(2))));
    }
    if (selectedCountryObj.formulaType === "total_score") {
      if (!simMaxScore || simMaxScore <= 0) return 0;
      const pct = (simStudentScore / simMaxScore) * 100;
      return Math.min(100, Math.max(0, Number(pct.toFixed(2))));
    }
    if (selectedCountryObj.formulaType === "out_of_20") {
      const pct = simScoreOutOf20 * 5;
      return Math.min(100, Math.max(0, Number(pct.toFixed(2))));
    }
    return 80;
  }, [selectedCountryObj, simDirectPercent, simStudentScore, simMaxScore, simScoreOutOf20]);

  const category1Countries = useMemo(
    () => COUNTRIES_EQUIVALENCY_DATA.filter((c) => c.category === 1),
    []
  );
  const category2Countries = useMemo(
    () => COUNTRIES_EQUIVALENCY_DATA.filter((c) => c.category === 2),
    []
  );
  const category3Countries = useMemo(
    () => COUNTRIES_EQUIVALENCY_DATA.filter((c) => c.category === 3),
    []
  );
  const category4Countries = useMemo(
    () => COUNTRIES_EQUIVALENCY_DATA.filter((c) => c.category === 4),
    []
  );

  const shouldShowPart = (partNum: number) =>
    selectedPartFilter === "all" || selectedPartFilter === partNum;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-surface text-primary-foreground border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
            <Globe2 className="size-3.5 text-accent" />
            <span>منظومة القبول الموحد للطلبة غير الأردنيين · ادرس في الأردن · 2026</span>
          </div>

          <h1 className="font-display mt-4 max-w-4xl text-3xl leading-snug font-extrabold sm:text-5xl text-white">
            مرشد الطلبة الوافدين الشامل للجامعات الأردنية
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-8 text-white/85">
            الدليل المرجعي المتكامل المكون من <strong>9 أجزاء مستقلة</strong> مع بطاقة توضيحية لكل جزء:
            يشرح هيكلية الحقول الأكاديمية الأربعة في الأردن، وقواعد حساب ومعادلة شهادات 22 دولة عربية
            والشهادات الأجنبية، والحدود الدنيا لمعدلات القبول واستثناء الـ 5 علامات، ومسارات التجسير
            والانتقال، وسلسلة التصديقات والرسوم المالية الرسمية.
          </p>

          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-md">
              <span className="font-mono text-2xl font-extrabold text-white block">9 أجزاء</span>
              <span className="text-xs text-white/80">أقسام مستقلة ببطاقات توضيحية</span>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-md">
              <span className="font-mono text-2xl font-extrabold text-white block">4 حقول</span>
              <span className="text-xs text-white/80">الحقول الأكاديمية الأردنية المعتمدة</span>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-md">
              <span className="font-mono text-2xl font-extrabold text-white block">22 دولة</span>
              <span className="text-xs text-white/80">معادلة وتسكين الشهادات العربية</span>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-md">
              <span className="font-mono text-2xl font-extrabold text-white block">5 علامات</span>
              <span className="text-xs text-white/80">استثناء خصم للطلبة الوافدين</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STICKY 9-PARTS SELECTOR BAR ================= */}
      <div className="sticky top-[61px] z-40 border-b border-border bg-background/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
              <Layers className="size-4 text-brand-ink" />
              فهرس الأجزاء التسعة المستقلة (اختر جزءاً للتركيز عليه أو استعرض الأجزاء التسعة كاملة):
            </span>
            <button
              type="button"
              onClick={() => setSelectedPartFilter("all")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                selectedPartFilter === "all"
                  ? "bg-brand text-brand-foreground shadow-xs"
                  : "bg-surface border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              عرض كافة الأجزاء التسعة (1 - 9)
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {GUIDE_PARTS_META.map((part) => {
              const active = selectedPartFilter === part.partNumber;
              return (
                <button
                  key={part.partNumber}
                  type="button"
                  onClick={() => {
                    setSelectedPartFilter(part.partNumber);
                    window.scrollTo({ top: 260, behavior: "smooth" });
                  }}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-right transition-all cursor-pointer ${
                    active
                      ? "border-brand bg-brand/15 text-foreground font-extrabold shadow-xs"
                      : "border-border bg-surface/60 text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span className="block text-[10px] font-mono font-bold text-brand-ink">
                    {part.partLabel}
                  </span>
                  <span className="block text-xs line-clamp-1 max-w-[180px]">
                    {part.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MAIN 9 INDEPENDENT SECTIONS ================= */}
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-16">
        {/* =====================================================================
            الجزء الأول: الإطار العام ومحاكي معادلة الشهادات الفوري للطلبة الوافدين
           ===================================================================== */}
        {shouldShowPart(1) && (
          <section
            id="part-1"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[0]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[0]} />

            {/* Overview of the 4 Categories of Arab Certificates */}
            <div className="mb-8">
              <h3 className="font-display text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
                <Compass className="size-5 text-brand-ink" />
                تصنيف الشهادات الثانوية العربية في النظام الأردني (4 فئات رئيسية):
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-border bg-surface/60 p-4">
                  <span className="inline-block rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-[11px] font-bold mb-2">
                    الفئة الأولى (9 دول)
                  </span>
                  <h4 className="font-bold text-sm text-foreground">النسبة المئوية الجاهزة (1:1)</h4>
                  <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                    الأردن، فلسطين، الكويت، قطر، سلطنة عُمان، البحرين، اليمن، السودان، وليبيا. تُعتمد النسبة كما هي.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/60 p-4">
                  <span className="inline-block rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-[11px] font-bold mb-2">
                    الفئة الثانية (5 دول)
                  </span>
                  <h4 className="font-bold text-sm text-foreground">المجموع الكلي للدرجات</h4>
                  <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                    مصر، سوريا، العراق، لبنان، والصومال. يُقسم مجموع الطالب على المجموع الكلي النهائي × 100.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/60 p-4">
                  <span className="inline-block rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[11px] font-bold mb-2">
                    الفئة الثالثة (6 دول)
                  </span>
                  <h4 className="font-bold text-sm text-foreground">النظام المغاربي والفرنكوفوني (من 20)</h4>
                  <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                    الجزائر، المغرب، تونس، موريتانيا، جيبوتي، وجزر القمر. يُضرب المعدل من 20 في 5 مع كتاب معادلة إلزامي.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/60 p-4">
                  <span className="inline-block rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 text-[11px] font-bold mb-2">
                    الفئة الرابعة (دولتان)
                  </span>
                  <h4 className="font-bold text-sm text-foreground">التقييم المدرسي والمسارات</h4>
                  <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                    السعودية (5 مسارات حديثة + قياس للمعادلة) والإمارات (مسارات النخبة والمتقدم والعام والتطبيقي).
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Equivalency & Field Simulator */}
            <div className="rounded-3xl border-2 border-primary/25 bg-surface/70 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <span className="text-xs font-extrabold text-brand-ink flex items-center gap-1.5">
                    <Calculator className="size-4" />
                    أداة تفاعلية للطلبة الوافدين
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-foreground mt-1">
                    محاكي معادلة الشهادة الثانوية وتسكين الحقول الأكاديمية الأربعة
                  </h3>
                </div>
                <span className="rounded-xl bg-brand/15 text-brand-ink border border-brand/30 px-3 py-1.5 text-xs font-bold">
                  يدعم جميع الدول العربية الـ 22
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-12">
                {/* Simulator Controls */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">
                      1. اختر دولة الشهادة الثانوية:
                    </label>
                    <select
                      value={simCountryNum}
                      onChange={(e) => {
                        const num = Number(e.target.value);
                        setSimCountryNum(num);
                        setSimTrackIdx(0);
                        const found = COUNTRIES_EQUIVALENCY_DATA.find((c) => c.number === num);
                        if (found?.defaultMaxScore) {
                          setSimMaxScore(found.defaultMaxScore);
                          setSimStudentScore(Math.round(found.defaultMaxScore * 0.85));
                        }
                      }}
                      className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      {COUNTRIES_EQUIVALENCY_DATA.map((c) => (
                        <option key={c.number} value={c.number}>
                          {c.number}. {c.country} — ({c.certificateName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">
                      2. اختر الشعبة / المسار في شهادتك:
                    </label>
                    <select
                      value={simTrackIdx}
                      onChange={(e) => setSimTrackIdx(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      {selectedCountryObj.tracks.map((t, idx) => (
                        <option key={idx} value={idx}>
                          {t.trackName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Score Input based on country formulaType */}
                  {selectedCountryObj.formulaType === "total_score" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          مجموع درجات الطالب:
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={simStudentScore}
                          onChange={(e) => setSimStudentScore(Number(e.target.value))}
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-mono font-bold text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          المجموع الكلي العظمى للشعبة:
                        </label>
                        <input
                          type="number"
                          value={simMaxScore}
                          onChange={(e) => setSimMaxScore(Number(e.target.value))}
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-mono font-bold text-foreground"
                        />
                      </div>
                    </div>
                  ) : selectedCountryObj.formulaType === "out_of_20" ? (
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        المعدل العام للبكالوريا (من 20 — علامة النجاح الصغرى 10):
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        min={10}
                        max={20}
                        value={simScoreOutOf20}
                        onChange={(e) => setSimScoreOutOf20(Number(e.target.value))}
                        className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-mono font-bold text-foreground"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        النسبة المئوية المدونة في الشهادة (%):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min={50}
                        max={100}
                        value={simDirectPercent}
                        onChange={(e) => setSimDirectPercent(Number(e.target.value))}
                        className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-mono font-bold text-foreground"
                      />
                    </div>
                  )}

                  <div className="rounded-2xl border border-border bg-card p-3.5 text-xs leading-6 text-muted-foreground">
                    <span className="font-bold text-foreground block mb-1">قاعدة الاحتساب لهذه الدولة:</span>
                    {selectedCountryObj.calculationRule}
                  </div>
                </div>

                {/* Simulator Output */}
                <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 flex flex-col justify-between space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <span className="text-xs text-muted-foreground block">
                        المعدل الأردني المكافئ المقدر:
                      </span>
                      <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-ink">
                        {calculatedJordanGpa.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="inline-block rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold">
                        {calculatedJordanGpa >= 65
                          ? "مؤهل للجامعات الرسمية والخاصة"
                          : calculatedJordanGpa >= 60
                          ? "مؤهل للجامعات الخاصة فقط (60% - 64.99%)"
                          : "أقل من السقف الأدنى المطلق للقبول (60%)"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-foreground block mb-2">
                      الحقول الأكاديمية الأردنية المفتوحة لشعبتك ({selectedTrackObj.trackName}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrackObj.mappedJordanFields.map((f) => (
                        <span
                          key={f}
                          className="rounded-xl bg-brand/15 text-brand-ink border border-brand/30 px-3 py-1.5 text-xs font-extrabold"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-6">
                      {selectedTrackObj.details}
                    </p>
                  </div>

                  <div className="rounded-xl bg-surface p-3.5 border border-border/80">
                    <span className="text-xs font-extrabold text-foreground block mb-1">
                      موقف وثيقة المعادلة:
                    </span>
                    <p className="text-xs text-muted-foreground leading-6">
                      {selectedCountryObj.equivalencyDocStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء الثاني: هيكلية المسارات والحقول الأكاديمية الأربعة في الأردن وآلية ربط الشهادات العربية بها
           ===================================================================== */}
        {shouldShowPart(2) && (
          <section
            id="part-2"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[1]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[1]} />

            {/* Introductory Official Paragraph */}
            <div className="rounded-2xl border border-border bg-surface/60 p-5 mb-8 text-sm leading-8 text-foreground">
              يعتمد النظام الأردني للثانوية العامة على مسارين رئيسيين (<strong>المسار الأكاديمي</strong> و<strong>المسار المهني التقني BTEC</strong>). وبموجب التعديل الوزاري المعتمد لطلبة جيلي <strong>2009 و2010 وما بعدهم</strong>، تم دمج وتقليص الحقول في المسار الأكاديمي لتصبح <strong>4 حقول أكاديمية رئيسية فقط</strong> (مع استمرار النظام في دعم خريجي جيل 2008 ذوي الـ 6 حقول، وخريجي السنوات الأقدم ذوي نظام الفروع التقليدي علمي وأدبي).
            </div>

            {/* The 4 Approved Academic Fields in Jordan */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="size-5 text-brand-ink" />
              أولاً: الحقول الأكاديمية الأربعة المعتمدة في الأردن:
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              {JORDAN_FOUR_ACADEMIC_FIELDS.map((field, idx) => (
                <div
                  key={field.id}
                  className="rounded-2xl border border-border bg-background p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-extrabold ${field.badgeColor}`}
                      >
                        الحقل 0{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">
                        المسار الأكاديمي الأردني المحدث
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-extrabold text-foreground">
                      {field.name}
                    </h4>
                    <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                      {field.eligibleMajors}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 text-xs font-bold text-brand-ink">
                    نطاق التقديم: {field.crossAccessNote}
                  </div>
                </div>
              ))}
            </div>

            {/* Rules for Mapping Traditional Arab Certificates to the 4 Fields */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Scale className="size-5 text-brand-ink" />
              ثانياً: قاعدة الربط والتسكين للشهادات العربية التقليدية على الحقول الأربعة:
            </h3>
            <div className="space-y-4">
              {ARAB_CERTIFICATE_MAPPING_RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-2xl border border-border bg-surface/50 p-5"
                >
                  <h4 className="font-display text-base sm:text-lg font-extrabold text-foreground">
                    {rule.categoryTitle}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {rule.description}
                  </p>

                  {rule.examples && rule.examples.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-foreground">أمثلة المسارات العربية:</span>
                      {rule.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-brand-ink">الحقول المفتوحة في الأردن:</span>
                    {rule.allowedFields.map((af) => (
                      <span
                        key={af}
                        className="rounded-full bg-brand/15 text-brand-ink border border-brand/30 px-3 py-1 text-xs font-bold"
                      >
                        {af}
                      </span>
                    ))}
                  </div>

                  {rule.notes && (
                    <p className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400">
                      تنبيه: {rule.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء الثالث: حساب ومعادلة شهادات الفئة الأولى (9 دول)
           ===================================================================== */}
        {shouldShowPart(3) && (
          <section
            id="part-3"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[2]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[2]} />

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <h4 className="font-display text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                  القاعدة الحسابية للفئة الأولى:
                </h4>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  المعدل الأردني المكافئ يساوي النسبة المئوية المدونة في الشهادة الأصلية كما هي (<strong>1 إلى 1</strong>).
                </p>
              </div>
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                <h4 className="font-display text-base font-extrabold text-blue-800 dark:text-blue-300">
                  الإجراء المعتمد:
                </h4>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  إذا كانت الشهادة وزارية حكومية بالدراسة النظامية، لا تحتاج إلى معادلة حسابية معقدة، وتُقبل بتصديق الأختام الرسمية.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl font-extrabold text-foreground mb-4">
              تفصيل الدول التسع وتسكين الحقول الأربعة (1 - 9):
            </h3>
            <div className="grid gap-5">
              {category1Countries.map((country) => (
                <CountryCard key={country.number} item={country} />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء الرابع: حساب ومعادلة شهادات الفئة الثانية (5 دول)
           ===================================================================== */}
        {shouldShowPart(4) && (
          <section
            id="part-4"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[3]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[3]} />

            <div className="rounded-2xl border border-brand/30 bg-brand/10 p-5 mb-8">
              <h4 className="font-display text-base font-extrabold text-brand-ink">
                القاعدة الحسابية للفئة الثانية (دول المجموع الكلي للدرجات):
              </h4>
              <p className="mt-2 text-sm leading-7 text-foreground">
                المعدل الأردني المكافئ بالمئة يساوي <strong>(مجموع درجات الطالب الحاصل عليها ÷ المجموع الكلي النهائي العظمى للشعبة) × 100</strong>، ويُقرب الناتج لأقرب منزلتين عشريتين.
              </p>
            </div>

            <h3 className="font-display text-xl font-extrabold text-foreground mb-4">
              تفصيل الدول الخمس وتسكين الحقول الأربعة (10 - 14):
            </h3>
            <div className="grid gap-5">
              {category2Countries.map((country) => (
                <CountryCard key={country.number} item={country} />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء الخامس: حساب ومعادلة شهادات الفئة الثالثة (6 دول)
           ===================================================================== */}
        {shouldShowPart(5) && (
          <section
            id="part-5"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[4]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[4]} />

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
                <h4 className="font-display text-base font-extrabold text-purple-800 dark:text-purple-300">
                  القاعدة الحسابية (النظام المغاربي والفرنكوفوني من 20):
                </h4>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  تعتمد هذه الدول نظام البكالوريا من 20 (حيث علامة النجاح الصغرى 10 من 20). يتم تحويل المعدل إلى نسبة مئوية بالضرب في 5، أي أن <strong>المعدل الأردني المكافئ بالمئة = المعدل العام للبكالوريا (من 20) × 5</strong> (مثال توضيحي: معدل 15.40 من 20 × 5 = 77%).
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <h4 className="font-display text-base font-extrabold text-amber-800 dark:text-amber-300">
                  الشرط الإجرائي الإلزامي:
                </h4>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  تتطلب هذه الشهادات <strong>استخراج وثيقة معادلة رسمية من وزارة التربية والتعليم الأردنية</strong> لتثبيت النسبة المئوية من 100 وتحديد الحقل الأكاديمي المناظر باللغة العربية.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl font-extrabold text-foreground mb-4">
              تفصيل الدول الست وتسكين الحقول الأربعة (15 - 20):
            </h3>
            <div className="grid gap-5">
              {category3Countries.map((country) => (
                <CountryCard key={country.number} item={country} />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء السادس: حساب ومعادلة شهادات الفئة الرابعة (السعودية والإمارات)
           ===================================================================== */}
        {shouldShowPart(6) && (
          <section
            id="part-6"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[5]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[5]} />

            <div className="grid gap-6">
              {category4Countries.map((country) => (
                <CountryCard key={country.number} item={country} />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء السابع: الحالات الإجبارية لطلب وثيقة معادلة رسمية في مرحلة البكالوريوس
           ===================================================================== */}
        {shouldShowPart(7) && (
          <section
            id="part-7"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[6]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[6]} />

            <div className="grid gap-5 sm:grid-cols-2">
              {/* 1. Exempt Certificates */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-display text-lg font-extrabold text-foreground">
                    1. الشهادات المعفاة من كتاب المعادلة
                  </h3>
                </div>
                <p className="text-sm leading-7 text-foreground">
                  <strong>الشهادات الثانوية العربية الحكومية الصادرة بالدراسة النظامية قبل العام الدراسي 2016/2017:</strong> معفاة من كتاب المعادلة وتُقبل بالتصديق المباشر فقط.
                </p>
              </div>

              {/* 2. Mandatory Equivalency Certificates */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-display text-lg font-extrabold text-foreground">
                    2. الشهادات العربية الخاضعة للمعادلة الإجبارية
                  </h3>
                </div>
                <p className="text-sm leading-7 text-foreground">
                  <strong>الشهادات الصادرة بعد 2016/2017</strong>، أو عن طريق <strong>الدراسة غير النظامية (منازل أو حرة)</strong>، أو من <strong>معاهد غير تابعة لوزارة التربية</strong>، أو <strong>شهادات المغرب العربي</strong>.
                </p>
              </div>

              {/* 3. Foreign & International Certificates */}
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <FileCheck2 className="size-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-display text-lg font-extrabold text-foreground">
                    3. الشهادات الأجنبية والدولية الصادرة من أي دولة عربية
                  </h3>
                </div>
                <p className="text-sm leading-7 text-foreground">
                  (<strong>البريطانية IGCSE/GCE، الدبلوما الأمريكية HSD + SAT/ACT/AP، البكالوريا الدولية IB، البكالوريا الفرنسية</strong>): لا تُحسب يدوياً، بل يجب إدخال المعدل المئوي والحقل الأكاديمي المكتوب في وثيقة المعادلة حصراً (حيث تحدد وزارة التربية الأردنية الحقل الأكاديمي من بين الحقول الأربعة بناءً على المواد العلمية أو الأدبية التي امتحنها الطالب).
                </p>
              </div>

              {/* 4. Special Legal Advantage for International Students */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck className="size-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-display text-lg font-extrabold text-foreground">
                    4. ميزة قانونية خاصة للطالب الوافد
                  </h3>
                </div>
                <p className="text-sm leading-7 text-foreground">
                  يُسمح للطالب الوافد (غير الأردني) بتقديم <strong>وثيقة معادلة رسمية صادرة من وزارة التربية والتعليم في بلده الأم</strong> تثبت أن شهادته تعادل الثانوية العامة الحكومية في بلده وتؤهله لدخول جامعاتها، أو استخراج وثيقة معادلة من وزارة التربية والتعليم الأردنية.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء الثامن: الحدود الدنيا لمعدلات القبول ومسارات التجسير والانتقال للبكالوريوس
           ===================================================================== */}
        {shouldShowPart(8) && (
          <section
            id="part-8"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[7]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[7]} />

            {/* First: Minimum Admission Thresholds Table */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Award className="size-5 text-brand-ink" />
              أولاً: الحدود الدنيا لمعدلات القبول للطلبة الوافدين وارتباطها بالحقول الأربعة:
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-border mb-6">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-surface border-b border-border text-foreground font-extrabold">
                  <tr>
                    <th className="p-3.5">التخصصات الجامعية</th>
                    <th className="p-3.5">الجامعات الرسمية</th>
                    <th className="p-3.5">الجامعات الخاصة</th>
                    <th className="p-3.5">بعد استثناء الوافدين (خصم حتى 5 علامات)</th>
                    <th className="p-3.5">الحقل الأكاديمي المطلوب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {ADMISSION_THRESHOLDS_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface/50 transition-colors">
                      <td className="p-3.5 font-extrabold text-foreground">{row.majorGroup}</td>
                      <td className="p-3.5 font-mono font-bold text-brand-ink">{row.publicUniMin}</td>
                      <td className="p-3.5 font-mono font-bold text-foreground">{row.privateUniMin}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 text-xs font-bold ${
                            row.exceptionAllowed
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : "bg-surface text-muted-foreground border border-border"
                          }`}
                        >
                          {row.withExpatException}
                        </span>
                      </td>
                      <td className="p-3.5 text-muted-foreground leading-6">{row.requiredFields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Absolute Minimum Floor Rule */}
            <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-500/10 p-5 mb-10">
              <h4 className="font-display text-base font-extrabold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle className="size-5" />
                قاعدة السقف الأدنى المطلق:
              </h4>
              <p className="mt-1.5 text-sm leading-7 text-foreground font-medium">
                لا يجوز تحت أي ظرف أو استثناء قبول أي طالب وافد في البكالوريوس بمعدل يقل عن <strong>65% في الجامعات الرسمية</strong> أو <strong>60% في الجامعات الخاصة</strong>.
              </p>
            </div>

            {/* Second & Third: Bridging (التجسير) & Transfer (الانتقال) */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="font-display text-lg font-extrabold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="size-5 text-brand-ink" />
                  ثانياً: مسار التجسير لمرحلة البكالوريوس (حملة الدبلوم المتوسط)
                </h3>
                <p className="text-sm leading-7 text-muted-foreground mb-4">
                  إذا كانت شهادة الدبلوم المتوسط صادرة من خارج الأردن: يجب معادلتها أولاً في وزارة التعليم العالي الأردنية (تتطلب أن تكون الكلية معترفاً بها، وإثبات إقامة في بلد الدراسة لمدة <strong>8 أشهر عن كل سنة دراسية</strong> في الدبلوم بحيث لا تقل أي فترة متصلة عن <strong>شهرين</strong>).
                </p>
                <div className="space-y-2.5">
                  <span className="text-xs font-extrabold text-foreground block">
                    الحد الأدنى لمعدل الدبلوم للتجسير:
                  </span>
                  <div className="rounded-xl border border-border bg-card p-3.5 text-xs sm:text-sm leading-6">
                    <strong className="text-brand-ink font-mono">70%</strong> لتخصصات (<strong>الهندسة، الصيدلة، الطب البيطري</strong>) مع اشتراط أن تكون شهادة الثانوية العامة ضمن الحقل الصحي أو العلمي لتخصص الصيدلة.
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3.5 text-xs sm:text-sm leading-6">
                    <strong className="text-brand-ink font-mono">68%</strong> لباقي التخصصات المناظرة لتخصص الدبلوم.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="font-display text-lg font-extrabold text-foreground mb-3 flex items-center gap-2">
                  <Building2 className="size-5 text-brand-ink" />
                  ثالثاً: مسار الطالب المنتقل أو احتساب الساعات للبكالوريوس (Transfer Student)
                </h3>
                <p className="text-sm leading-7 text-muted-foreground mb-4">
                  الطالب الذي درس فصولاً أو مواد في كلية أو جامعة معترف بها خارج الأردن دون الحصول على مؤهل علمي ويريد استكمال البكالوريوس في الأردن:
                </p>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-border bg-card p-3.5 text-xs sm:text-sm leading-6 flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-1" />
                    <span>يجب أن يحقق الحد الأدنى لمعدل الثانوية العامة والحقل الأكاديمي المطلوب للتخصص.</span>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3.5 text-xs sm:text-sm leading-6 flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-1" />
                    <span>
                      يجوز للجامعة الأردنية معادلة واحتساب ما درسه الطالب سابقاً بحد أقصى <strong>20 ساعة معتمدة</strong> (إذا كان قادماً من كلية دبلوم متوسط) أو وفق تعليمات الانتقال من الجامعات المعترف بها.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            الجزء التاسع: سلسلة التصديقات، الوثائق المطلوبة، والرسوم المالية
           ===================================================================== */}
        {shouldShowPart(9) && (
          <section
            id="part-9"
            className="scroll-mt-36 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm"
          >
            <SectionHeaderBanner meta={GUIDE_PARTS_META[8]} />
            <ExplanatoryPartCard meta={GUIDE_PARTS_META[8]} />

            {/* First: Official Authentication Chain */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Stamp className="size-5 text-brand-ink" />
              أولاً: سلسلة التصديقات الرسمية (Authentication Chain):
            </h3>
            <div className="grid gap-4 sm:grid-cols-3 mb-10">
              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="inline-block rounded-full bg-brand/15 text-brand-ink px-3 py-1 text-xs font-extrabold mb-2.5">
                  المسار الأول (بوجود مستشار ثقافي أردني)
                </span>
                <p className="text-sm leading-7 text-foreground">
                  تصديق وزارة التربية أو التعليم العالي والخارجية في بلد الدراسة، ثم <strong>تصديق المستشار الثقافي الأردني</strong>، ثم تصديق وزارة التربية أو التعليم العالي الأردنية في عمّان مباشرة.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="inline-block rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 px-3 py-1 text-xs font-extrabold mb-2.5">
                  المسار الثاني (بعدم وجود مستشار ثقافي)
                </span>
                <p className="text-sm leading-7 text-foreground">
                  تصديق التربية والخارجية في بلد الدراسة، ثم <strong>تصديق السفارة الأردنية هناك (أو سفارة بلد الطالب في عمّان)</strong>، ثم تصديق وزارة الخارجية الأردنية، ثم تصديق وزارة التربية أو التعليم العالي الأردنية.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <span className="inline-block rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 px-3 py-1 text-xs font-extrabold mb-2.5">
                  استثناء الشهادات الأجنبية
                </span>
                <p className="text-sm leading-7 text-foreground">
                  الشهادات البريطانية تُصدق من <strong>المجلس الثقافي البريطاني (British Council)</strong> أولاً، والأمريكية تُصدق من <strong>الأميديست (AMIDEAST)</strong> أولاً قبل تصديق مركز الوزارة.
                </p>
              </div>
            </div>

            {/* Second: Required Documents & Attachments */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <FileCheck2 className="size-5 text-brand-ink" />
              ثانياً: الوثائق والمرفقات المطلوبة لمرحلة البكالوريوس:
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
                <h4 className="font-display text-base font-extrabold text-foreground">
                  الوثائق الأساسية لطلبة البكالوريوس:
                </h4>
                <ul className="space-y-2.5 text-sm leading-7 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-1.5" />
                    <span><strong>كشف علامات الثانوية العامة الأصلي</strong> مصدقاً حسب الأصول.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-1.5" />
                    <span><strong>وثيقة المعادلة الأصلية</strong> (في الحالات التي تتطلب معادلة).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-1.5" />
                    <span>
                      <strong>صورة عن جواز السفر ساري المفعول</strong> (لإثبات الجنسية غير الأردنية) بالإضافة إلى <strong>شهادة الميلاد وصورة شخصية</strong>.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <h4 className="font-display text-base font-extrabold text-foreground mb-2">
                    إضافات خاصة لطلبة التجسير فقط:
                  </h4>
                  <p className="text-sm leading-7 text-muted-foreground">
                    شهادة الدبلوم وكشف العلامات المصدق، وثيقة معادلة الدبلوم من التعليم العالي، <strong>كشف حركات السفر بجواز السفر</strong> لإثبات الإقامة أثناء دراسة الدبلوم، وكتاب يبين سبب المعادلة لغير الأردني (إكمال الدراسة).
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <h4 className="font-display text-base font-extrabold text-emerald-800 dark:text-emerald-300 mb-1.5">
                    نظام القبول المشروط (Conditional Admission):
                  </h4>
                  <p className="text-sm leading-7 text-foreground">
                    يُسمح بمنح الطالب الوافد <strong>قبولاً مشروطاً</strong> بناءً على الوثائق المرفوعة إلكترونياً، ويُمهل خلال <strong>الفصل الدراسي الأول</strong> لتسليم الشهادات الأصلية المصدقة ووثيقة المعادلة ورقياً، وإلا يُلغى قبوله.
                  </p>
                </div>
              </div>
            </div>

            {/* Third: Technical Controls & Official Financial Fees */}
            <h3 className="font-display text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Wallet className="size-5 text-brand-ink" />
              ثالثاً: الضوابط التقنية والرسوم المالية الرسمية:
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="font-mono text-2xl font-extrabold text-brand-ink block">10 خيارات</span>
                <span className="text-xs font-bold text-foreground block mt-1">ضوابط طلب القبول الموحد</span>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  يتيح طلب القبول الموحد للوافدين إدخال ما يصل إلى <strong>10 خيارات</strong> في الجامعات الأردنية الرسمية، وتكون مهلة تخزين الطلب على النظام <strong>15 دقيقة</strong> قبل الاعتماد النهائي، وتُخصص نسبة <strong>50% زيادة على الطاقة الاستيعابية</strong> في البكالوريوس للطلبة الوافدين.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                  35 ديناراً / 50$
                </span>
                <span className="text-xs font-bold text-foreground block mt-1">
                  رسوم طلب الالتحاق الموحد (ادرس في الأردن)
                </span>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  <strong>35 ديناراً أردنياً (أو 50 دولاراً أمريكياً)</strong> غير مستردة، تُدفع عبر <strong>إي-فواتيركم (eFAWATEERcom)</strong> أو البطاقات الائتمانية العالمية.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="font-mono text-2xl font-extrabold text-amber-600 dark:text-amber-400 block">
                  50 ديناراً أردنياً
                </span>
                <span className="text-xs font-bold text-foreground block mt-1">
                  رسوم معادلة شهادة الثانوية العامة
                </span>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  تُدفع في <strong>وزارة التربية والتعليم الأردنية</strong> عند استخراج وثيقة معادلة شهادة الثانوية العامة.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <span className="font-mono text-2xl font-extrabold text-purple-600 dark:text-purple-400 block">
                  3 دنانير / للنسخة
                </span>
                <span className="text-xs font-bold text-foreground block mt-1">
                  رسوم تصديق ومعادلة التعليم العالي
                </span>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  رسوم تصديق الشهادات في وزارة التعليم العالي (لطلبة التجسير أو الانتقال): <strong>3 دنانير أردنية للنسخة الواحدة لغير الأردني</strong> (مقابل 1 دينار للأردني)، ورسوم معادلة الدبلوم لغير الأردني تبلغ <strong>3 أمثال الرسوم المقررة للأردني</strong>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA to explore Universities or Majors */}
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-extrabold text-foreground">
              هل حسبت معدلك الأردني المكافئ وعرفت حقلك الأكاديمي؟
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              انتقل الآن لاستكشاف الجامعات الأردنية الـ 19 أو تصفح دليل التخصصات الكامل أو اسأل المستشار الذكي.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/universities"
              className="inline-flex items-center gap-2 rounded-xl bg-brand text-brand-foreground px-5 py-3 text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
            >
              استكشاف الجامعات الأردنية
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              to="/majors"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card text-foreground px-5 py-3 text-sm font-bold hover:border-brand transition-colors"
            >
              دليل التخصصات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
