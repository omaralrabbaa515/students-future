import { createFileRoute, ErrorComponent, Link, notFound } from "@tanstack/react-router";

import { getCertificationsByIds } from "@/data/certifications";
import { getMajor } from "@/data/majors";
import { getPlatformMeta } from "@/lib/public-data.functions";
import {
  EMPTY_PLATFORM_META,
  formatDate,
  lastUpdatedFor,
  overridesFor,
  type PlatformMeta,
} from "@/lib/platform-data";

export const Route = createFileRoute("/majors/$slug")({
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
      <Link to="/majors" className="text-primary mt-3 inline-block underline">
        رجوع إلى دليل التخصصات
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "تخصص غير متوفر | الطلبة والمستقبل" }, { name: "robots", content: "noindex" }],
      };
    }
    const { major } = loaderData;
    const description = `تصنيف تخصص ${major.name} في سوق العمل الأردني: ${major.classification}، تقدير التشغيل ${major.employmentRate}، مستوى الخطر ${major.risk}، مع مسار شهادات مجانية معتمدة.`;
    return {
      meta: [
        { title: `${major.name} | نسبة التشغيل والشهادات — الطلبة والمستقبل` },
        { name: "description", content: description },
        { property: "og:title", content: `${major.name} | الطلبة والمستقبل` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MajorPage,
});

function badge(value: string) {
  if (value === "مطلوب" || value === "منخفض") return "bg-emerald-100 text-emerald-800";
  if (value === "مشبع" || value === "متوسط") return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

function MajorPage() {
  const { major } = Route.useLoaderData();
  const certs = getCertificationsByIds(major.certificationIds);
  const rows = Math.max(major.publicUniversities.length, major.privateUniversities.length);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/majors" className="text-muted-foreground text-sm underline">
        رجوع إلى دليل التخصصات
      </Link>
      <h1 className="font-display mt-3 text-2xl font-extrabold">{major.name}</h1>
      <p className="text-muted-foreground mt-1 text-sm">{major.field}</p>
      <p className="mt-4 leading-8">{major.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/advisor"
          search={{ q: major.name }}
          className="bg-primary text-primary-foreground rounded-md px-5 py-2.5 text-sm font-bold"
        >
          اسأل المستشار عن هذا التخصص
        </Link>
        <a
          href="#certs"
          className="border-border rounded-md border px-5 py-2.5 text-sm font-bold"
        >
          الشهادات الموصى بها
        </a>
      </div>

      <Section title="1) مؤشر التشغيل والطلب">
        <div className="grid gap-3 sm:grid-cols-3">
          <Fact label="تقدير التشغيل (أول سنتين)" value={major.employmentRate} />
          <Fact label="مستوى الخطر" value={major.risk} tone={badge(major.risk)} />
          <Fact
            label="التصنيف في سوق العمل"
            value={major.classification}
            tone={badge(major.classification)}
          />
        </div>
      </Section>

      <Section title="2) خريطة التخصص في الجامعات الأردنية">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="border-border border p-2 text-right">جامعات حكومية</th>
                <th className="border-border border p-2 text-right">جامعات خاصة</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index}>
                  <td className="border-border border p-2">
                    {major.publicUniversities[index] ?? "—"}
                  </td>
                  <td className="border-border border p-2">
                    {major.privateUniversities[index] ?? "—"}
                  </td>
                </tr>
              ))}
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
      </Section>

      <Section title="3) أثر الذكاء الاصطناعي والأتمتة">
        <p className="mb-2">
          <span className="font-bold">مدى التعرض للأتمتة: </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badge(major.automation.exposure)}`}>
            {major.automation.exposure}
          </span>
        </p>
        <p className="leading-8">{major.automation.note}</p>
      </Section>

      <Section title="4) مسار المهارات والشهادات التنافسية" id="certs">
        <div className="space-y-3">
          {certs.map((cert) => (
            <div key={cert.id} className="border-border bg-card rounded-lg border p-4">
              <h3 className="font-display font-bold">{cert.title}</h3>
              <p className="text-muted-foreground mt-1 text-xs">
                الجهة المانحة: {cert.provider} · {cert.category}
              </p>
              <p className="mt-2 text-sm leading-7">{cert.summary}</p>
              <p className="bg-secondary text-secondary-foreground mt-2 rounded-md px-3 py-2 text-xs leading-6">
                <span className="font-bold">طريقة الحصول على الشهادة: </span>
                {cert.howToGet}
              </p>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary mt-2 inline-block text-sm break-all underline"
              >
                {cert.url}
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="5) البدائل الأكاديمية الذكية">
        <ul className="space-y-2">
          {major.alternatives.map((alt) => (
            <li key={alt.name} className="leading-8">
              <span className="font-bold">{alt.name}: </span>
              {alt.reason}
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-border mt-10 rounded-lg border border-dashed p-5 text-sm leading-8">
        للحصول على توجيه مخصص بالكامل، أخبر المستشار الذكي بمعدل الثانوية العامة (التوجيهي)،
        والجامعات المفضلة لديك، وميولك المهنية.
        <Link to="/advisor" search={{ q: major.name }} className="text-primary ms-2 underline">
          ابدأ المحادثة
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
    <section id={id} className="border-border mt-8 border-t pt-6">
      <h2 className="font-display text-primary mb-3 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="border-border bg-card rounded-lg border p-4">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={`mt-1 inline-block rounded-full px-2.5 py-0.5 font-bold ${tone ?? ""}`}>
        {value}
      </p>
    </div>
  );
}
