import { createFileRoute, ErrorComponent, Link, notFound } from "@tanstack/react-router";

import {
  getRecommendedCoursesForMajor,
  getCourseCountForMajorField,
} from "@/data/certifications";
import { getMajor, majors } from "@/data/majors";
import { getPlatformMeta } from "@/lib/public-data.functions";
import {
  EMPTY_PLATFORM_META,
  formatDate,
  lastUpdatedFor,
  majorReviewedAt,
  overridesFor,
  type PlatformMeta,
} from "@/lib/platform-data";
import {
  buildMetaTags,
  buildMajorSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/majors/$slug")({
  staleTime: 1000 * 60 * 5, // كاش فوري 5 دقائق لتسريع التنقل الفوري بين التخصصات
  loader: async ({ params }) => {
    const major = getMajor(params.slug);
    if (!major) throw notFound();
    let meta: PlatformMeta = EMPTY_PLATFORM_META;
    try {
      meta = await getPlatformMeta();
    } catch {
      meta = EMPTY_PLATFORM_META;
    }
    return { major, meta };
  },
  errorComponent: ErrorComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-8">
      <h1 className="font-display text-xl font-bold">هذا التخصص غير متوفر في الدليل</h1>
      <Link to="/majors" className="text-brand-ink mt-3 inline-block underline">
        رجوع إلى دليل التخصصات
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "تخصص غير متوفر | الطلاب والمستقبل" }, { name: "robots", content: "noindex" }],
      };
    }
    const { major } = loaderData;
    const description = `دليل تخصص ${major.name} (${major.field}) في الجامعات الأردنية وسوق العمل: تصنيف ديوان الخدمة [${major.classification}]، نسبة التشغيل ${major.employmentRate}، مستوى الخطر ${major.risk}، اعتمادات ${major.accreditation}، مع مسار شهادات عالمية مجانية معتمدة ومؤشرات الرواتب.`;
    const keywords = `تخصص ${major.name}، دراسة ${major.name} في الأردن، رواتب ${major.name}، سعر ساعة ${major.name}، معدل قبول ${major.name}، ${major.publicUniversities.slice(0, 3).join("، ")}، الطلاب والمستقبل`;

    return {
      meta: buildMetaTags({
        title: `تخصص ${major.name} في الجامعات الأردنية 2026 | نسبة التشغيل والرسوم والشهادات`,
        description,
        keywords,
        path: `/majors/${major.slug}`,
        ogType: "article",
      }),
      links: [
        { rel: "canonical", href: `${SITE_URL}/majors/${major.slug}` },
      ],
    };
  },
  component: MajorPage,
});

function badge(value: string) {
  if (value === "مطلوب" || value === "منخفض") return "tone-good";
  if (value === "مشبع" || value === "متوسط") return "tone-warn";
  return "tone-bad";
}

function MajorPage() {
  const { major, meta } = Route.useLoaderData();
  const certs = getRecommendedCoursesForMajor(major, 6);
  const sectorCourseInfo = getCourseCountForMajorField(major.field);
  const rows = Math.max(major.publicUniversities.length, major.privateUniversities.length);
  const overrides = overridesFor(meta, "major", major.slug);
  const employmentRate = overrides["employmentRate"]?.value ?? major.employmentRate;
  const risk = overrides["risk"]?.value ?? major.risk;
  const classification = overrides["classification"]?.value ?? major.classification;
  const lastUpdated = lastUpdatedFor(meta, "major", major.slug);
  const reviewedAt = majorReviewedAt(meta, major.slug);

  const majorSchema = buildMajorSchema(major);
  const breadcrumbsSchema = buildBreadcrumbSchema([
    { name: "الرئيسية", path: "/" },
    { name: "دليل التخصصات", path: "/majors" },
    { name: major.name, path: `/majors/${major.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(majorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <Link to="/majors" className="text-muted-foreground text-sm underline">
        رجوع إلى دليل التخصصات
      </Link>
      <h1 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">{major.name}</h1>
      <p className="text-muted-foreground mt-1 text-sm">{major.field}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="pill tone-neutral">آخر تحديث للبيانات: {formatDate(lastUpdated)}</span>
        <span className="pill tone-neutral">
          آخر مراجعة للحالة: {formatDate(reviewedAt)}
        </span>
      </div>
      <p className="mt-4 leading-8">{major.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/advisor"
          search={{ q: major.name }}
          className="bg-brand text-brand-foreground rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
        >
          اسأل المستشار الذكي عن هذا التخصص
        </Link>
        <a
          href="#certs"
          className="border-border hover:border-brand rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors"
        >
          الدورات المجانية المقترحة ({certs.length} من أصل {sectorCourseInfo.count})
        </a>
        <Link
          to="/compare"
          className="border-border hover:border-brand rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors"
        >
          قارن في مختبر المقارنة
        </Link>
        <Link
          to="/international-guide"
          className="border-border hover:border-brand rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors"
        >
          شروط القبول للطلبة الوافدين
        </Link>
      </div>

      <Section title="1) مؤشر التشغيل والطلب">
        <div className="grid gap-3 sm:grid-cols-3">
          <Fact
            label="تقدير التشغيل (أول سنتين)"
            value={employmentRate}
            updatedAt={overrides["employmentRate"]?.updated_at ?? null}
          />
          <Fact
            label="مستوى الخطر"
            value={risk}
            tone={badge(risk)}
            updatedAt={overrides["risk"]?.updated_at ?? null}
          />
          <Fact
            label="التصنيف في سوق العمل"
            value={classification}
            tone={badge(classification)}
            updatedAt={overrides["classification"]?.updated_at ?? null}
          />
        </div>
      </Section>

      <Section title="2) خريطة التخصص في الجامعات الأردنية">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2">
                <th className="border-border border p-2 text-right">جامعات حكومية (اضغط للاستكشاف)</th>
                <th className="border-border border p-2 text-right">جامعات خاصة (اضغط للاستكشاف)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, index) => {
                const pubUni = major.publicUniversities[index];
                const privUni = major.privateUniversities[index];
                return (
                  <tr key={index}>
                    <td className="border-border border p-2">
                      {pubUni ? (
                        <Link
                          to="/universities"
                          search={{ q: pubUni }}
                          className="text-brand-ink hover:underline font-semibold"
                        >
                          {pubUni}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="border-border border p-2">
                      {privUni ? (
                        <Link
                          to="/universities"
                          search={{ q: privUni }}
                          className="text-brand-ink hover:underline font-semibold"
                        >
                          {privUni}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-8">
          <span className="font-bold">الاعتمادات: </span>
          {major.accreditation}
        </p>
        <p className="mt-2 leading-8">
          <span className="font-bold">التدريب العملي والمختبرات: </span>
          {major.trainingNotes}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/universities"
            className="text-brand-ink hover:underline text-xs font-bold inline-flex items-center gap-1 rounded-xl border border-brand/30 bg-brand/5 px-3.5 py-2"
          >
            <span>استكشف تفاصيل الجامعات الحاضنة وما يميز كل جامعة في مستكشف الجامعات ←</span>
          </Link>
          <Link
            to="/international-guide"
            className="text-foreground hover:border-brand text-xs font-bold inline-flex items-center gap-1 rounded-xl border border-border bg-surface px-3.5 py-2"
          >
            <span>معادلة الشهادات العربية واستثناء الـ 5 علامات للوافدين ←</span>
          </Link>
        </div>
      </Section>

      <Section title="3) أثر الذكاء الاصطناعي والأتمتة">
        <p className="mb-2">
          <span className="font-bold">مدى التعرض للأتمتة: </span>
          <span className={`pill ${badge(major.automation.exposure)}`}>
            {major.automation.exposure}
          </span>
        </p>
        <p className="leading-8">{major.automation.note}</p>
      </Section>

      <Section title="4) مسار الدورات المجانية المعززة للتنافسية" id="certs">
        <p className="text-muted-foreground mb-4 text-xs sm:text-sm leading-7">
          أقوى الدورات والشهادات المجانية المعتمدة المقترحة خصيصاً لطلبة{" "}
          <span className="font-bold text-foreground">{major.name}</span> من قسم{" "}
          <span className="font-bold text-brand-ink">{sectorCourseInfo.category}</span> (يضم القسم{" "}
          <span className="font-bold text-foreground">{sectorCourseInfo.count} دورة مجانية</span>):
        </p>
        <div className="space-y-3">
          {certs.map((cert) => (
            <div key={cert.id} className="card-surface p-5 rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display font-bold text-foreground">{cert.title}</h3>
                <span className="rounded-full bg-brand/10 text-brand-ink px-2.5 py-0.5 text-[11px] font-bold">
                  {cert.category}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                الجهة المانحة: <span className="font-semibold text-foreground">{cert.provider}</span>
              </p>
              <p className="mt-2 text-sm leading-7">{cert.summary}</p>
              <p className="bg-surface text-foreground mt-2 rounded-xl px-3 py-2 text-xs leading-6">
                <span className="font-bold text-brand">طريقة التسجيل والحصول على الدورة: </span>
                {cert.howToGet}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-ink hover:underline text-sm break-all font-bold"
                >
                  رابط الدورة المباشر: {cert.url}
                </a>
                <Link
                  to="/advisor"
                  search={{ q: `كيف تفيدني دورة ${cert.title} في تخصص ${major.name}؟` }}
                  className="text-xs font-bold text-muted-foreground hover:text-brand underline"
                >
                  اسأل المستشار عن هذه الدورة
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4">
          <p className="text-xs sm:text-sm font-semibold text-foreground">
            هل تبحث عن المزيد من الدورات المجانية في مجال{" "}
            <span className="font-bold text-brand-ink">{major.field}</span>؟
          </p>
          <Link
            to="/certifications"
            search={{ category: sectorCourseInfo.category }}
            className="bg-brand text-brand-foreground rounded-xl px-4 py-2 text-xs font-bold shadow-xs transition-transform hover:-translate-y-0.5"
          >
            استعرض جميع {sectorCourseInfo.category} ({sectorCourseInfo.count} دورة) ←
          </Link>
        </div>
      </Section>

      <Section title="5) البدائل الأكاديمية الذكية">
        <ul className="space-y-2.5">
          {major.alternatives.map((alt) => {
            const matchedAltMajor = majors.find(
              (m) => m.name === alt.name || m.name.includes(alt.name) || alt.name.includes(m.name),
            );
            return (
              <li key={alt.name} className="leading-8">
                {matchedAltMajor ? (
                  <Link
                    to="/majors/$slug"
                    params={{ slug: matchedAltMajor.slug }}
                    className="font-bold text-brand-ink hover:underline"
                  >
                    {alt.name}:{" "}
                  </Link>
                ) : (
                  <span className="font-bold">{alt.name}: </span>
                )}
                {alt.reason}
              </li>
            );
          })}
        </ul>
      </Section>

      <div className="border-brand/40 bg-surface/60 mt-12 rounded-2xl border border-dashed p-6 text-sm leading-8">
        للحصول على توجيه مخصص بالكامل، أخبر المستشار الذكي بمعدل الثانوية العامة (التوجيهي)،
        والجامعات المفضلة لديك، وميولك المهنية.
        <Link to="/advisor" search={{ q: major.name }} className="text-brand-ink ms-2 font-bold underline">
          ابدأ المحادثة مع المستشار الذكي ←
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-border mt-10 border-t pt-7">
      <h2 className="font-display text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
        <span className="bg-brand inline-block h-5 w-1 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Fact({
  label,
  value,
  tone,
  updatedAt,
}: {
  label: string;
  value: string;
  tone?: string;
  updatedAt?: string | null;
}) {
  return (
    <div className="card-surface p-5">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={`mt-1 inline-block rounded-full px-2.5 py-0.5 font-bold ${tone ?? ""}`}>
        {value}
      </p>
      {updatedAt && (
        <p className="text-muted-foreground mt-1 text-[11px]">
          محدَّث في {formatDate(updatedAt)}
        </p>
      )}
    </div>
  );
}
