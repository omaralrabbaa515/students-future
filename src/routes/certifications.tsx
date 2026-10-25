import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, GraduationCap, Search, Sparkles } from "lucide-react";

import {
  courseCategories,
  courseProviders,
  courses,
  type CourseCategory,
} from "@/data/certifications";
import { getPlatformMeta } from "@/lib/public-data.functions";
import { EMPTY_PLATFORM_META, formatDate, type PlatformMeta } from "@/lib/platform-data";
import { buildMetaTags, buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/certifications")({
  staleTime: 1000 * 60 * 5, // كاش فوري 5 دقائق لتسريع التنقل
  loader: async () => {
    let meta: PlatformMeta = EMPTY_PLATFORM_META;
    try {
      meta = await getPlatformMeta();
    } catch {
      meta = EMPTY_PLATFORM_META;
    }
    return { meta };
  },
  errorComponent: ErrorComponent,
  notFoundComponent: () => (
    <p className="mx-auto max-w-3xl px-4 py-12 text-sm">الصفحة غير موجودة.</p>
  ),
  head: () => ({
    meta: buildMetaTags({
      title: "بنك الدورات والشهادات العالمية المجانية المعتمدة (215+ دورة)",
      description:
        "دليل الدورات التدريبية والشهادات المهنية المجانية المعتمدة في 13 قطاعاً أكاديمياً: الطبية، الهندسية، البرمجيات، الذكاء الاصطناعي، والإدارة، من جامعات Harvard و Google و Cisco مع روابط الالتحاق المباشرة.",
      keywords:
        "دورات مجانية معتمدة، شهادات مجانية، كورسات برمجة مجانية، دورات طبية مجانية، هارفارد مجانا، شهادات سيسكو مجانية، مهارات سوق العمل، الطلاب والمستقبل",
      path: "/certifications",
    }),
    links: [{ rel: "canonical", href: `${SITE_URL}/certifications` }],
  }),
  component: FreeCoursesPage,
});

const ALL_CATEGORY = "جميع الدورات";

function FreeCoursesPage() {
  const { meta } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);
  const [provider, setProvider] = useState("الكل");
  const [query, setQuery] = useState("");

  const brokenLinks = useMemo(() => {
    const map = new Map<string, string>();
    for (const check of meta.linkChecks) {
      if (!check.ok) map.set(check.certification_id, check.error ?? "تعذّر الوصول إلى الرابط");
    }
    return map;
  }, [meta]);

  const lastLinkCheck = useMemo(() => {
    const dates = meta.linkChecks.map((check) => check.checked_at).sort();
    return dates.at(-1) ?? meta.lastScan?.finished_at ?? meta.lastScan?.started_at ?? null;
  }, [meta]);

  // حساب عدد الدورات في كل تصنيف
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { [ALL_CATEGORY]: courses.length };
    for (const cat of courseCategories) {
      counts[cat] = courses.filter((c) => c.category === cat).length;
    }
    return counts;
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          (selectedCategory === ALL_CATEGORY || course.category === selectedCategory) &&
          (provider === "الكل" || course.provider === provider) &&
          (!query.trim() ||
            course.title.includes(query.trim()) ||
            course.summary.includes(query.trim()) ||
            course.fields.some((field) => field.includes(query.trim()))),
      ),
    [selectedCategory, provider, query],
  );

  const breadcrumbsSchema = buildBreadcrumbSchema([
    { name: "الرئيسية", path: "/" },
    { name: "دورات مجانية", path: "/certifications" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand w-fit">
          <BookOpen className="size-3.5" />
          <span>منظومة التطوير والتعليم المستمر 2026</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl text-foreground">
          دليل الدورات المجانية المعتمدة
        </h1>
        <p className="text-muted-foreground text-sm leading-7 max-w-3xl">
          قاعدة متكاملة تضم <span className="font-bold text-foreground">{courses.length} دورة تدريبية مجانية</span> من جهات وجامعات مرموقة، مصنفة حسب التخصصات الأكاديمية مع روابط التسجيل المباشرة وطرق الحصول على الشهادات.
        </p>
        {lastLinkCheck && (
          <p className="pill tone-neutral w-fit text-xs">
            آخر فحص نشط لروابط الدورات: {formatDate(lastLinkCheck)}
          </p>
        )}
      </div>

      {/* Category Tabs (تقسيمات الدورات) */}
      <div className="mt-8 space-y-3">
        <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-brand" />
          <span>اختر التصنيف الأكاديمي للدورات:</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {/* تبويب جميع الدورات */}
          <button
            type="button"
            onClick={() => setSelectedCategory(ALL_CATEGORY)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs ${
              selectedCategory === ALL_CATEGORY
                ? "bg-brand text-brand-foreground shadow-md ring-2 ring-brand/30"
                : "border border-border bg-card text-foreground hover:border-brand/60 hover:text-brand"
            }`}
          >
            <span>{ALL_CATEGORY}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                selectedCategory === ALL_CATEGORY
                  ? "bg-black/20 text-white"
                  : "bg-surface-2 text-muted-foreground"
              }`}
            >
              {categoryCounts[ALL_CATEGORY]}
            </span>
          </button>

          {/* التقسيمات الـ 13 المعتمدة */}
          {courseCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-brand text-brand-foreground shadow-md ring-2 ring-brand/30"
                    : "border border-border bg-card text-foreground hover:border-brand/60 hover:text-brand"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isSelected
                      ? "bg-black/20 text-white"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 card-surface p-4 rounded-2xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="size-4 text-muted-foreground absolute end-3.5 top-3.5 pointer-events-none" />
          <input
            aria-label="ابحث باسم الدورة أو الكلمات المفتاحية"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث باسم الدورة أو التخصص أو المهارة…"
            className="w-full border-border bg-background focus:border-brand rounded-xl border pe-10 ps-4 py-2.5 text-sm focus:outline-none"
          />
        </div>

        <select
          aria-label="تصفية حسب المنصة أو الجامعة"
          value={provider}
          onChange={(event) => setProvider(event.target.value)}
          className="border-border bg-background focus:border-brand rounded-xl border px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
        >
          <option value="الكل">جميع الجهات والجامعات المانحة</option>
          {courseProviders.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Active Results Summary */}
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          عرض <strong className="text-foreground">{filteredCourses.length}</strong> دورة تدريبية في قِسم:{" "}
          <strong className="text-brand-ink">{selectedCategory}</strong>
        </span>
      </div>

      {/* Course Cards Grid */}
      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="card-surface card-hover flex flex-col justify-between p-5 rounded-2xl border border-border/80 shadow-xs transition-all hover:border-brand/50"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-2.5 py-1 text-[11px] font-bold text-brand-ink">
                  <GraduationCap className="size-3" />
                  <span>{course.category}</span>
                </span>
              </div>

              <h2 className="font-display text-base font-bold text-foreground leading-snug mt-1">
                {course.title}
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                الجهة المانحة: <span className="font-semibold text-foreground/90">{course.provider}</span>
              </p>

              {brokenLinks.has(course.id) && (
                <p className="tone-bad mt-2 rounded-xl px-3 py-1.5 text-xs leading-5">
                  تنبيه: تعذّر الوصول إلى الرابط في آخر فحص ({brokenLinks.get(course.id)}).
                </p>
              )}

              <p className="mt-3 text-xs leading-6 text-foreground/85 line-clamp-3">
                {course.summary}
              </p>

              <div className="bg-background/80 border border-border/60 mt-3.5 rounded-xl p-3 text-xs leading-5">
                <span className="font-bold text-brand block mb-1">طريقة التسجيل والحصول على الشهادة:</span>
                <span className="text-muted-foreground">{course.howToGet}</span>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/75">التخصصات المستفيدة: </span>
                <span>{course.fields.join("، ")}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-accent">مجانية 100%</span>
              <a
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand/10 hover:bg-brand text-brand hover:text-brand-foreground px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>رابط الدورة</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="col-span-full py-16 text-center card-surface rounded-2xl">
            <BookOpen className="size-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm font-bold text-foreground">لا توجد دورات مطابقة لبحثك في هذا القسم حالياً.</p>
            <p className="text-xs text-muted-foreground mt-1">جرّب اختيار تصنيف آخر أو مسح عبارة البحث.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(ALL_CATEGORY);
                setQuery("");
                setProvider("الكل");
              }}
              className="mt-4 rounded-xl bg-brand text-brand-foreground px-4 py-2 text-xs font-bold cursor-pointer"
            >
              عرض جميع الدورات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
