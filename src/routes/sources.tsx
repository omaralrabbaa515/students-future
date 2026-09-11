import { createFileRoute, ErrorComponent } from "@tanstack/react-router";

import { EMPTY_PLATFORM_META, formatDate, formatDateTime, type PlatformMeta } from "@/lib/platform-data";
import { getPlatformMeta } from "@/lib/public-data.functions";

export const Route = createFileRoute("/sources")({
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
    meta: [
      { title: "المصادر الرسمية | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "المصادر الرسمية التي تُبنى عليها تقديرات نسب التشغيل وتصنيف التخصصات في منصة الطلاب والمستقبل، مع تاريخ آخر مراجعة لكل مصدر.",
      },
      { property: "og:title", content: "المصادر الرسمية | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "ديوان الخدمة المدنية، دائرة الإحصاءات العامة، وزارة التعليم العالي، ومنصة سجّل.",
      },
    ],
  }),
  component: Sources,
});

const sources = [
  {
    key: "csb",
    name: "ديوان الخدمة المدنية والإدارة العامة",
    url: "https://csb.gov.jo",
    note: "أعداد المتقدمين والمعيّنين لكل تخصص في القطاع العام، وهو المؤشر الأدق على التشبع.",
  },
  {
    key: "dos",
    name: "دائرة الإحصاءات العامة",
    url: "https://dosweb.dos.gov.jo",
    note: "مسوح البطالة والتشغيل وتوزّعها حسب المستوى التعليمي والتخصص والمحافظة.",
  },
  {
    key: "mohe",
    name: "وزارة التعليم العالي والبحث العلمي",
    url: "https://mohe.gov.jo",
    note: "أعداد الطلبة والخريجين، والبرامج المطروحة في الجامعات الحكومية والخاصة، وقرارات الاعتماد.",
  },
  {
    key: "sajjil",
    name: "منصة سجّل الوطنية للتشغيل",
    url: "https://sajjil.gov.jo",
    note: "الطلب الفعلي على الوظائف من قِبَل المنشآت والفرص المتاحة حسب المهنة.",
  },
  {
    key: "universities",
    name: "البوابات الرسمية والخطط الدراسية للجامعات الأردنية",
    url: "https://mohe.gov.jo",
    note: "مقارنة الخطط والمختبرات والتدريب العملي والاعتمادات البرامجية مثل ABET.",
  },
  {
    key: "labor-market",
    name: "منصات تحليل سوق العمل الإقليمية",
    url: "https://www.bayt.com",
    note: "مؤشرات الطلب على المهارات والرواتب في الأردن والخليج (بيت.كوم وLinkedIn).",
  },
];

function Sources() {
  const { meta } = Route.useLoaderData();
  const statuses = new Map(meta.sources.map((row) => [row.key, row]));
  const lastScan = meta.lastScan;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">المصادر الرسمية</h1>
      <p className="pill tone-neutral mt-3">
        آخر فحص شامل للمصادر: {formatDateTime(lastScan?.finished_at ?? lastScan?.started_at)}
      </p>
      <p className="text-muted-foreground mt-3 text-sm leading-8">
        كل رقم وتصنيف في هذه المنصة تقدير استرشادي مبني على أحدث البيانات المتاحة من الجهات أدناه،
        وليس رقماً مسحوباً آنياً؛ إذ لا تتيح هذه الجهات واجهات بيانات مباشرة. يُفحَص كل مصدر أسبوعياً
        آلياً، ولا يظهر أي تعديل على الأرقام قبل مراجعته واعتماده.
      </p>

      <div className="mt-8 space-y-4">
        {sources.map((source) => {
          const status = statuses.get(source.key);
          return (
            <div key={source.key} className="card-surface p-6">
              <h2 className="font-display font-bold">{source.name}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-7">{source.note}</p>
              <p className="text-muted-foreground mt-2 text-xs leading-6">
                آخر مراجعة: {formatDate(status?.last_reviewed_at ?? null)} · الحالة:{" "}
                {status?.last_status ?? "لم يُفحَص بعد"}
              </p>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-brand mt-2 inline-block text-sm underline"
              >
                {source.url}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
