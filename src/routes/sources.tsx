import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Building2,
  GraduationCap,
  Globe,
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

import { EMPTY_PLATFORM_META, formatDate, formatDateTime, type PlatformMeta } from "@/lib/platform-data";
import { getPlatformMeta } from "@/lib/public-data.functions";
import { officialSources, type SourceCategory } from "@/data/sources";

export const Route = createFileRoute("/sources")({
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
    <p className="mx-auto max-w-3xl px-4 py-12 text-sm text-foreground">الصفحة غير موجودة.</p>
  ),
  head: () => ({
    meta: [
      { title: "المصادر الرسمية المعتمدة | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "المصادر الرسمية الحكومية والدولية والأكاديمية التي تُبنى عليها بيانات الجامعات ونسب التشغيل وتصنيف التخصصات في منصة الطلاب والمستقبل، مع تعليل ما تم استخراجه من كل مصدر.",
      },
      { property: "og:title", content: "المصادر الرسمية المعتمدة | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "وزارة التعليم العالي، القبول الموحد، هيئة الاعتماد، ديوان الخدمة، تصنيفات QS و THE، واعتمادات ABET و ACPE و WFME، ودليل الجامعات الأردنية الـ 19.",
      },
    ],
  }),
  component: Sources,
});

const CATEGORIES: { id: "all" | SourceCategory; label: string; icon: typeof Building2 }[] = [
  { id: "all", label: "كافة المصادر (34)", icon: FileCheck },
  { id: "جهات حكومية وتنظيمية ونقابية", label: "جهات حكومية وتنظيمية (8)", icon: Building2 },
  { id: "هيئات الاعتماد والتصنيف الدولية", label: "هيئات الاعتماد والتصنيف الدولية (7)", icon: Award },
  { id: "مراجع أكاديمية وبوابات الجامعات الأردنية المعتمدة", label: "بوابات الجامعات الأردنية (19)", icon: GraduationCap },
];

function Sources() {
  const { meta } = Route.useLoaderData();
  const statuses = new Map(meta.sources.map((row) => [row.key, row]));
  const lastScan = meta.lastScan;

  const [selectedCategory, setSelectedCategory] = useState<"all" | SourceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSources = useMemo(() => {
    return officialSources.filter((source) => {
      const matchesCategory =
        selectedCategory === "all" || source.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        source.name.toLowerCase().includes(q) ||
        (source.englishName && source.englishName.toLowerCase().includes(q)) ||
        source.note.toLowerCase().includes(q) ||
        source.extractedData.toLowerCase().includes(q) ||
        source.sectors.some((sec) => sec.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* رأس الصفحة */}
      <div className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand mb-3">
          <ShieldCheck className="size-3.5" />
          <span>المصادر المرجعية الرسمية 2026</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl text-foreground">
          المصادر الرسمية المعتمدة
        </h1>
        <p className="pill tone-neutral mt-3 inline-flex items-center gap-2">
          <CheckCircle2 className="size-3.5 text-accent" />
          <span>آخر فحص ومراجعة دورية للمصادر: {formatDateTime(lastScan?.finished_at ?? lastScan?.started_at)}</span>
        </p>
        <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-8 max-w-4xl">
          تعتمد منصة «الطلاب والمستقبل» على شبكة موثقة من **34 مصدراً رسمياً** تضم الوزارات والجهات التنظيمية الوطنية، وهيئات الاعتماد والتصنيف الدولية المعيارية (QS, THE, ABET, ACPE, WFME)، إلى جانب البوابات الأكاديمية الرسمية لكافة الجامعات الأردنية الـ 19 المرخصة.
          لكل مصدر أدناه **تعليل صريح وتفصيلي** يوضح البيانات والمؤشرات الدقيقة التي تم استخراجها وتوظيفها في بناء ملفات الجامعات وتصنيف التخصصات.
        </p>

        {/* كروت الإحصاءات السريعة */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          <div className="card-surface p-4 border border-border/80">
            <span className="text-xs text-muted-foreground font-semibold">إجمالي المصادر المعتمدة</span>
            <p className="font-display text-2xl font-black text-brand mt-1">34 مصدراً</p>
            <span className="text-[11px] text-muted-foreground">تغطية شاملة وموثقة 100%</span>
          </div>
          <div className="card-surface p-4 border border-border/80">
            <span className="text-xs text-muted-foreground font-semibold">جهات حكومية وتنظيمية</span>
            <p className="font-display text-2xl font-black text-foreground mt-1">8 جهات</p>
            <span className="text-[11px] text-muted-foreground">قرارات القبول وسوق العمل</span>
          </div>
          <div className="card-surface p-4 border border-border/80">
            <span className="text-xs text-muted-foreground font-semibold">اعتمادات وتصنيفات دولية</span>
            <p className="font-display text-2xl font-black text-secondary mt-1">7 هيئات</p>
            <span className="text-[11px] text-muted-foreground">QS, ABET, ACPE, WFME</span>
          </div>
          <div className="card-surface p-4 border border-border/80">
            <span className="text-xs text-muted-foreground font-semibold">بوابات الجامعات الأردنية</span>
            <p className="font-display text-2xl font-black text-foreground mt-1">19 جامعة</p>
            <span className="text-[11px] text-muted-foreground">حكومية، خاصة، ونموذج دولي</span>
          </div>
        </div>
      </div>

      {/* شريط الفلترة والبحث */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* أزرار الفئات */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-muted/60 rounded-xl border border-border shrink-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-brand text-brand-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* مربع البحث */}
        <div className="relative min-w-[260px]">
          <Search className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المصادر أو الاعتمادات (مثال: ABET، التكنو، WFME)…"
            className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-brand shadow-xs"
          />
        </div>
      </div>

      {/* استعراض المصادر */}
      <div className="mt-8 space-y-10">
        {filteredSources.length === 0 ? (
          <div className="card-surface p-10 text-center text-muted-foreground text-sm">
            لا توجد مصادر مطابقة لبحثك الحالي. جرب كلمة بحث أخرى.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredSources.map((source) => {
              const status = statuses.get(source.key);
              return (
                <div
                  key={source.key}
                  className="card-surface flex flex-col justify-between p-6 border border-border/80 hover:border-brand/40 transition-all shadow-xs"
                >
                  <div>
                    {/* رأس الكرت */}
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/60 pb-3">
                      <div>
                        <h2 className="font-display text-base font-bold text-foreground">
                          {source.name}
                        </h2>
                        {source.englishName && (
                          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                            {source.englishName}
                          </p>
                        )}
                      </div>
                      <span
                        className={`pill text-[11px] font-semibold shrink-0 ${
                          source.category === "جهات حكومية وتنظيمية ونقابية"
                            ? "tone-neutral"
                            : source.category === "هيئات الاعتماد والتصنيف الدولية"
                            ? "bg-secondary/15 text-secondary border border-secondary/30"
                            : "bg-brand/10 text-brand border border-brand/25"
                        }`}
                      >
                        {source.category === "جهات حكومية وتنظيمية ونقابية"
                          ? "جهة حكومية/نقابية"
                          : source.category === "هيئات الاعتماد والتصنيف الدولية"
                          ? "اعتماد/تصنيف دولي"
                          : "مرجع وبوابة جامعية"}
                      </span>
                    </div>

                    {/* وسوم القطاعات */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {source.sectors.map((sec) => (
                        <span
                          key={sec}
                          className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-[11px] font-medium"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>

                    {/* النبذة التعريفية العامة */}
                    <p className="text-muted-foreground mt-3 text-xs leading-6">
                      {source.note}
                    </p>

                    {/* الصندوق البارز: التعليل الصريح لما تم استخراجه لملف الجامعات والتخصصات */}
                    <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-3.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-brand mb-1.5">
                        <FileCheck className="size-3.5 shrink-0" />
                        <span>ما تم استخراجه واعتماده لملف الجامعات والتخصصات:</span>
                      </div>
                      <p className="text-foreground leading-6 text-[12px]">
                        {source.extractedData}
                      </p>
                    </div>
                  </div>

                  {/* تذييل الكرت ورابط المصدر */}
                  <div className="border-border/60 mt-5 border-t pt-3 flex items-center justify-between">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand hover:text-brand-ink text-xs font-bold inline-flex items-center gap-1 hover:underline break-all"
                    >
                      <span>زيارة المصدر الرسمي</span>
                      <ExternalLink className="size-3" />
                    </a>
                    <span className="text-muted-foreground text-[11px]">
                      المراجعة: {formatDate(status?.last_reviewed_at ?? null)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
