import { createFileRoute, Link, ErrorComponent } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Building2,
  MapPin,
  Award,
  GraduationCap,
  Search,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Compass,
  ShieldCheck,
  BookOpen,
  Bot,
  ArrowLeft,
  Layers,
  Globe,
} from "lucide-react";

import {
  universities,
  type University,
  type UniversityRegion,
} from "@/data/universities";
import { majors } from "@/data/majors";

export const Route = createFileRoute("/universities")({
  errorComponent: ErrorComponent,
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-4 py-12 text-sm">الصفحة غير موجودة.</p>
  ),
  head: () => ({
    meta: [
      { title: "استكشاف الجامعات الأردنية الحكومية والخاصة | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "دليل شامل لاستكشاف الجامعات الأردنية الحكومية والخاصة، ما يميز كل جامعة عن الأخرى، مناطقها الجغرافية، كلياتها الرائدة، واعتماداتها الدولية.",
      },
      { property: "og:title", content: "استكشاف الجامعات الأردنية | الطلاب والمستقبل" },
      {
        property: "og:description",
        content:
          "قارن واستكشف الجامعات الحكومية والخاصة في الأردن، مواقعها، نقاط قوتها، واعتماداتها الرسمية.",
      },
    ],
  }),
  component: UniversitiesExplorerPage,
});

type FilterType = "الكل" | "حكومية" | "خاصة";
type FilterRegion = "الكل" | UniversityRegion;

const DISTINCTION_HIGHLIGHTS = [
  {
    title: "الريادة الطبية والسريرية",
    universities: "الجامعة الأردنية · العلوم والتكنولوجيا · الهاشمية · مؤتة",
    detail:
      "تضم مستشفيات جامعية تعليمية كبرى (مستشفى الجامعة الأردنية ومستشفى الملك المؤسس) واعتمادات دولية (WFME / ACPE) وتفوق في امتحانات المعادلة الطبية.",
    badge: "الطب والصيدلة والتمريض",
  },
  {
    title: "القوة التكنولوجية وهندسة البرمجيات",
    universities: "الأميرة سمية (PSUT) · العلوم والتكنولوجيا · الألمانية الأردنية · الأردنية",
    detail:
      "تتصدر مسابقات البرمجة العالمية (ICPC) وتنفرد باعتمادات ABET الأمريكية وشراكات مباشرة مع كبرى شركات التقنية والاتصالات.",
    badge: "الذكاء الاصطناعي والحاسوب",
  },
  {
    title: "الشراكات الدولية واللغات والصناعة",
    universities: "الألمانية الأردنية (GJU) · الشرق الأوسط · اليرموك",
    detail:
      "تتيح الجامعة الألمانية سنة دراسية وتدريبية كاملة في ألمانيا، بينما توفر الشرق الأوسط برامج بريطانية مستضافة، وتتميز اليرموك باللغات والإعلام.",
    badge: "اعتمادات وشراكات دولية",
  },
  {
    title: "التميز في الجامعات الخاصة والاعتمادات",
    universities: "العلوم التطبيقية · البترا · عمان الأهلية · الزيتونة · فيلادلفيا",
    detail:
      "تجمع بين الحرم الجامعي العصري، والمختبرات المتطورة، والاعتمادات الأمريكية (ABET / ACPE / AACSB)، وتصدر نتائج امتحانات الكفاءة الجامعية.",
    badge: "بيئة تطبيقية حديثة",
  },
];

function UniversitiesExplorerPage() {
  const [selectedType, setSelectedType] = useState<FilterType>("الكل");
  const [selectedRegion, setSelectedRegion] = useState<FilterRegion>("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);

  const publicCount = useMemo(
    () =>
      universities.filter(
        (u) => u.type === "حكومية" || u.type === "حكومية بنموذج دولي"
      ).length,
    []
  );

  const privateCount = useMemo(
    () => universities.filter((u) => u.type === "خاصة").length,
    []
  );

  const regionCounts = useMemo(() => {
    return {
      الكل: universities.length,
      الوسط: universities.filter((u) => u.location.region === "الوسط").length,
      الشمال: universities.filter((u) => u.location.region === "الشمال").length,
      الجنوب: universities.filter((u) => u.location.region === "الجنوب").length,
    };
  }, []);

  const filteredUniversities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return universities.filter((uni) => {
      const matchesType =
        selectedType === "الكل"
          ? true
          : selectedType === "حكومية"
            ? uni.type === "حكومية" || uni.type === "حكومية بنموذج دولي"
            : uni.type === "خاصة";

      const matchesRegion =
        selectedRegion === "الكل" ? true : uni.location.region === selectedRegion;

      const matchesQuery =
        !q ||
        uni.name.toLowerCase().includes(q) ||
        uni.englishName.toLowerCase().includes(q) ||
        uni.location.city.toLowerCase().includes(q) ||
        uni.overview.toLowerCase().includes(q) ||
        uni.flagshipColleges.some((c) => c.toLowerCase().includes(q)) ||
        uni.uniqueAdvantages.some((a) => a.toLowerCase().includes(q)) ||
        uni.internationalAccreditations.some((acc) => acc.toLowerCase().includes(q));

      return matchesType && matchesRegion && matchesQuery;
    });
  }, [selectedType, selectedRegion, searchQuery]);

  // ربط كل جامعة بالتخصصات المتوفرة لها في دليل التخصصات
  const getRelatedMajors = (uni: University) => {
    const shortNames = [
      uni.name,
      uni.name.replace("الجامعة ", ""),
      uni.name.replace("جامعة ", ""),
    ];
    return majors
      .filter((m) => {
        const list =
          uni.type === "خاصة" ? m.privateUniversities : m.publicUniversities;
        return list.some((uName) =>
          shortNames.some((sn) => uName.includes(sn) || sn.includes(uName))
        );
      })
      .slice(0, 6);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* ================= 1. HEADER & HERO BANNER ================= */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand w-fit">
          <Building2 className="size-3.5" />
          <span>الخريطة الأكاديمية الشاملة · المملكة الأردنية الهاشمية 2026</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold sm:text-5xl text-foreground leading-tight">
          استكشاف الجامعات الأردنية الحكومية والخاصة
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-8 max-w-3xl">
          دليلك الموثق لاستكشاف ومقارنة <span className="font-bold text-foreground">{universities.length} جامعة أردنية معتمدة</span>، ومعرفة ما يميز كل جامعة عن الأخرى، ومناطقها الجغرافية، وكلياتها الرائدة، والمستشفيات والمرافق التدريبية، والاعتمادات الدولية (ABET, ACPE, AACSB, WFME).
        </p>

        {/* Quick Stats Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="card-surface p-4 rounded-2xl border border-border">
            <span className="text-xs font-bold text-muted-foreground block">إجمالي الجامعات الموثقة</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1 block">
              {universities.length} جامعة
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              مرخصة ومعتمدة من التعليم العالي
            </span>
          </div>

          <div className="card-surface p-4 rounded-2xl border border-border">
            <span className="text-xs font-bold text-muted-foreground block">الجامعات الحكومية</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">
              {publicCount} جامعات
            </span>
            <span className="text-[11px] text-muted-foreground">
              تشمل الجامعات الرسمية والألمانية الأردنية
            </span>
          </div>

          <div className="card-surface p-4 rounded-2xl border border-border">
            <span className="text-xs font-bold text-muted-foreground block">الجامعات الخاصة</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 block">
              {privateCount} جامعات
            </span>
            <span className="text-[11px] text-muted-foreground">
              حائزة على اعتمادات دولية وضمان الجودة
            </span>
          </div>

          <div className="card-surface p-4 rounded-2xl border border-border">
            <span className="text-xs font-bold text-muted-foreground block">التغطية الجغرافية</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 block">
              3 أقاليم
            </span>
            <span className="text-[11px] text-muted-foreground">
              الوسط ({regionCounts.الوسط}) · الشمال ({regionCounts.الشمال}) · الجنوب ({regionCounts.الجنوب})
            </span>
          </div>
        </div>
      </div>

      {/* ================= 2. WHAT DISTINGUISHES UNIVERSITIES OVERVIEW ================= */}
      <section className="mt-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
              <Sparkles className="size-5 text-brand" />
              <span>ملخص سريع: بماذا تتميز الجامعات الأردنية عن بعضها؟</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              نظرة مقارنة سريعة تساعدك على معرفة نقاط التفوق الكبرى قبل اختيار جامعتك
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DISTINCTION_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="card-surface p-5 rounded-2xl border border-border flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold bg-brand/10 text-brand px-2.5 py-1 rounded-full mb-2.5">
                  {item.badge}
                </span>
                <h3 className="font-display font-bold text-base text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {item.detail}
                </p>
              </div>
              <div className="pt-3 border-t border-border/60">
                <span className="text-[10px] font-bold text-muted-foreground block mb-1">
                  أبرز الجامعات المتصدرة:
                </span>
                <span className="text-xs font-bold text-foreground block">
                  {item.universities}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. INTERACTIVE FILTERS & SEARCH ================= */}
      <section className="mt-10 card-surface p-5 rounded-3xl border border-border space-y-5 shadow-xs">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Filter by University Type */}
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Building2 className="size-3.5 text-brand" />
              <span>تصفية حسب نوع الجامعة (حكومية / خاصة):</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "الكل", label: `جميع الجامعات (${universities.length})` },
                  { id: "حكومية", label: `الجامعات الحكومية (${publicCount})` },
                  { id: "خاصة", label: `الجامعات الخاصة (${privateCount})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedType(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedType === tab.id
                      ? "bg-brand text-brand-foreground shadow-sm ring-2 ring-brand/30"
                      : "bg-surface border border-border text-foreground hover:border-brand/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Region */}
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5">
              <MapPin className="size-3.5 text-brand" />
              <span>تصفية حسب الإقليم والمنطقة الجغرافية:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "الكل", label: "كافة الأقاليم" },
                  { id: "الوسط", label: `إقليم الوسط (${regionCounts.الوسط})` },
                  { id: "الشمال", label: `إقليم الشمال (${regionCounts.الشمال})` },
                  { id: "الجنوب", label: `إقليم الجنوب (${regionCounts.الجنوب})` },
                ] as const
              ).map((reg) => (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRegion === reg.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-surface border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="size-4 text-muted-foreground absolute end-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الجامعة، المحافظة/المدينة (عمان، إربد، الزرقاء، الكرك...)، الكلية، أو الاعتماد الدولي (ABET, ACPE)..."
            className="w-full rounded-2xl border border-border bg-background pe-11 ps-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground absolute left-3 top-3.5 px-2 py-0.5 rounded-md bg-surface"
            >
              مسح البحث
            </button>
          )}
        </div>
      </section>

      {/* ================= 4. UNIVERSITIES DETAILED CARDS ================= */}
      <section className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-bold text-muted-foreground">
            عرض <span className="text-foreground font-extrabold">{filteredUniversities.length}</span> جامعة مطابقة لخيارات الاستكشاف:
          </p>
        </div>

        {filteredUniversities.length === 0 ? (
          <div className="card-surface p-12 text-center rounded-3xl border border-border">
            <Building2 className="size-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-display font-bold text-lg text-foreground">
              لم يتم العثور على جامعات مطابقة لبحثك
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              جرّب تغيير فلتر الإقليم أو نوع الجامعة أو البحث بكلمات أخرى.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedType("الكل");
                setSelectedRegion("الكل");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredUniversities.map((uni) => {
              const isPublic =
                uni.type === "حكومية" || uni.type === "حكومية بنموذج دولي";
              const isExpanded = selectedUniId === uni.id;
              const relatedMajors = getRelatedMajors(uni);

              return (
                <article
                  key={uni.id}
                  className="card-surface rounded-3xl border border-border p-6 sm:p-8 transition-all hover:border-brand/40 shadow-xs"
                >
                  {/* Top Bar: Badges, Location, Year, Website */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                          uni.type === "حكومية"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                            : uni.type === "حكومية بنموذج دولي"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                        }`}
                      >
                        جامعة {uni.type}
                      </span>

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-surface-2 text-foreground border border-border">
                        <MapPin className="size-3.5 text-brand" />
                        <span>
                          {uni.location.city} · إقليم {uni.location.region}
                        </span>
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface text-muted-foreground border border-border">
                        تأسست عام {uni.establishedYear}
                      </span>
                    </div>

                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                    >
                      <Globe className="size-3.5" />
                      <span>الموقع الرسمي للجامعة</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>

                  {/* University Name & Overview */}
                  <div className="mt-5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                        {uni.name}
                      </h2>
                      <span className="text-xs font-mono text-muted-foreground">
                        {uni.englishName}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-7 text-foreground/90">
                      {uni.overview}
                    </p>

                    {/* Ranking Banner */}
                    <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                      <Award className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300 leading-relaxed">
                        <span className="underline ml-1">التصنيف والسمعة الأكاديمية:</span>
                        {uni.rankingSummary}
                      </p>
                    </div>
                  </div>

                  {/* Core Comparison Grid: What distinguishes this university + Flagship Colleges */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* What distinguishes this university */}
                    <div className="bg-surface-2 p-5 rounded-2xl border border-border">
                      <h3 className="font-display text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
                        <Sparkles className="size-4 text-emerald-500" />
                        <span>ما الذي يميز {uni.name} عن غيرها؟</span>
                      </h3>
                      <ul className="space-y-2.5">
                        {uni.uniqueAdvantages.map((adv, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs leading-6 text-foreground"
                          >
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-1" />
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Flagship Colleges & Accreditations */}
                    <div className="space-y-4">
                      <div className="bg-surface p-4 rounded-2xl border border-border">
                        <h3 className="font-display text-xs font-extrabold text-foreground mb-2.5 flex items-center gap-1.5">
                          <GraduationCap className="size-4 text-brand" />
                          <span>أقوى الكليات والتخصصات الرائدة بالجامعة:</span>
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {uni.flagshipColleges.map((col, ci) => (
                            <span
                              key={ci}
                              className="text-xs bg-card border border-border px-2.5 py-1 rounded-xl text-foreground font-medium"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-surface p-4 rounded-2xl border border-border">
                        <h3 className="font-display text-xs font-extrabold text-foreground mb-2.5 flex items-center gap-1.5">
                          <ShieldCheck className="size-4 text-blue-500" />
                          <span>الاعتمادات الدولية والمحلية وشهادات الجودة:</span>
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {uni.internationalAccreditations.map((acc, ai) => (
                            <span
                              key={ai}
                              className="text-[11px] bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 px-2.5 py-1 rounded-lg font-semibold"
                            >
                              ✓ {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Training Facilities & Advisor Recommendation */}
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-2xl bg-card border border-border">
                      <span className="text-xs font-extrabold text-foreground block mb-1">
                        🏥 المرافق التدريبية والسريرية والمختبرات:
                      </span>
                      <p className="text-xs text-muted-foreground leading-6">
                        {uni.trainingFacilities}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand/5 border border-brand/20">
                      <span className="text-xs font-extrabold text-brand flex items-center gap-1.5 mb-1">
                        <Compass className="size-3.5" />
                        <span>توصية المستشار: متى تختار {uni.name}؟</span>
                      </span>
                      <p className="text-xs text-foreground leading-6">
                        {uni.advisorRecommendation}
                      </p>
                    </div>
                  </div>

                  {/* Related Majors in Platform & Action Links */}
                  <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-muted-foreground ml-1">
                        تخصصات بارزة في الدليل:
                      </span>
                      {relatedMajors.map((m) => (
                        <Link
                          key={m.slug}
                          to="/majors/$slug"
                          params={{ slug: m.slug }}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-surface hover:bg-brand/10 hover:text-brand border border-border transition-colors font-semibold"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to="/advisor"
                        search={{
                          q: `ما رأيك بالدراسة في ${uni.name} وما هي أفضل التخصصات فيها؟`,
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-2xs hover:opacity-90"
                      >
                        <Bot className="size-3.5" />
                        <span>اسأل المستشار عن هذه الجامعة</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
