import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "المصادر الرسمية | الطلبة والمستقبل" },
      {
        name: "description",
        content:
          "المصادر الرسمية التي تُبنى عليها تقديرات نسب التشغيل وتصنيف التخصصات في منصة الطلبة والمستقبل.",
      },
      { property: "og:title", content: "المصادر الرسمية | الطلبة والمستقبل" },
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
    name: "ديوان الخدمة المدنية والإدارة العامة",
    url: "https://csb.gov.jo",
    note: "أعداد المتقدمين والمعيّنين لكل تخصص في القطاع العام، وهو المؤشر الأدق على التشبع.",
  },
  {
    name: "دائرة الإحصاءات العامة",
    url: "https://dosweb.dos.gov.jo",
    note: "مسوح البطالة والتشغيل وتوزّعها حسب المستوى التعليمي والتخصص والمحافظة.",
  },
  {
    name: "وزارة التعليم العالي والبحث العلمي",
    url: "https://mohe.gov.jo",
    note: "أعداد الطلبة والخريجين، والبرامج المطروحة في الجامعات الحكومية والخاصة، وقرارات الاعتماد.",
  },
  {
    name: "منصة سجّل الوطنية للتشغيل",
    url: "https://sajjil.gov.jo",
    note: "الطلب الفعلي على الوظائف من قِبَل المنشآت والفرص المتاحة حسب المهنة.",
  },
  {
    name: "البوابات الرسمية والخطط الدراسية للجامعات الأردنية",
    url: "https://mohe.gov.jo",
    note: "مقارنة الخطط والمختبرات والتدريب العملي والاعتمادات البرامجية مثل ABET.",
  },
  {
    name: "منصات تحليل سوق العمل الإقليمية",
    url: "https://www.bayt.com",
    note: "مؤشرات الطلب على المهارات والرواتب في الأردن والخليج (بيت.كوم وLinkedIn).",
  },
];

function Sources() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-2xl font-extrabold">المصادر الرسمية</h1>
      <p className="text-muted-foreground mt-3 text-sm leading-8">
        كل رقم وتصنيف في هذه المنصة تقدير استرشادي مبني على أحدث البيانات المتاحة من الجهات أدناه،
        وليس رقماً مسحوباً آنياً؛ إذ لا تتيح هذه الجهات واجهات بيانات مباشرة. تُراجَع التقديرات
        دورياً مع صدور البيانات الجديدة.
      </p>

      <div className="mt-8 space-y-4">
        {sources.map((source) => (
          <div key={source.name} className="border-border bg-card rounded-lg border p-5">
            <h2 className="font-display font-bold">{source.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-7">{source.note}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary mt-2 inline-block text-sm underline"
            >
              {source.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
