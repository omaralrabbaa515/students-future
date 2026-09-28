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

type OfficialSource = {
  key: string;
  name: string;
  url: string;
  category: "جهات حكومية وتنظيمية" | "مراجع أكاديمية وجامعية قطاعية";
  sectors: string[];
  note: string;
};

const sources: OfficialSource[] = [
  // ١) جهات حكومية وتنظيمية ونقابية
  {
    key: "admhec",
    name: "وحدة تنسيق القبول الموحد",
    url: "http://www.admhec.gov.jo/",
    category: "جهات حكومية وتنظيمية",
    sectors: ["الكليات الطبية والصحية", "كافة القطاعات الأكاديمية"],
    note: "المصدر الرسمي المعتمد للتحقق من التخصصات الأكاديمية المطروحة سنوياً، وبوابات القبول والحدود الدنيا لمعدلات القبول التنافسي والمقاعد المقررة.",
  },
  {
    key: "heac",
    name: "هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها",
    url: "https://www.heac.org.jo/",
    category: "جهات حكومية وتنظيمية",
    sectors: ["كافة الكليات والجامعات الأردنية"],
    note: "المرجع الوطني الأول للتحقق من الاعتماد العام والخاص للتخصصات، والطاقات الاستيعابية وضمان معايير الجودة في الجامعات الحكومية والخاصة.",
  },
  {
    key: "csb",
    name: "ديوان الخدمة المدنية والإدارة العامة (هيئة الخدمة)",
    url: "https://csb.gov.jo",
    category: "جهات حكومية وتنظيمية",
    sectors: ["كافة التخصصات في سوق العمل الأردني"],
    note: "تقرير دراسة العرض والطلب السنوي للتخصصات العلمية والإنسانية، وأعداد المتقدمين والمعيّنين في الأجهزة الحكومية والمخزون التراكمي.",
  },
  {
    key: "dos",
    name: "دائرة الإحصاءات العامة",
    url: "https://dosweb.dos.gov.jo",
    category: "جهات حكومية وتنظيمية",
    sectors: ["كافة التخصصات ومسوح البطالة"],
    note: "المسوح الوطنية الدورية لمعدلات البطالة والتشغيل وتوزعها الجغرافي حسب المستوى التعليمي والتخصص الأكاديمي والمحافظة.",
  },
  {
    key: "mohe",
    name: "وزارة التعليم العالي والبحث العلمي",
    url: "https://mohe.gov.jo",
    category: "جهات حكومية وتنظيمية",
    sectors: ["كافة مؤسسات التعليم العالي الأردنية"],
    note: "البيانات الإحصائية الرسمية لأعداد الطلبة الملتحقين والخريجين، والقرارات التنظيمية لاستحداث التخصصات وتجميد التخصصات الراكدة.",
  },
  {
    key: "sajjil",
    name: "منصة سجّل الوطنية للتشغيل",
    url: "https://sajjil.gov.jo",
    category: "جهات حكومية وتنظيمية",
    sectors: ["القطاع الخاص وسوق العمل الفعلي"],
    note: "مؤشرات فرص العمل الحقيقية المطلوبة من قِبل منشآت القطاع الخاص الأردني، والمهن الأكثر طلباً حسب القطاعات الإنتاجية والخدمية.",
  },
  {
    key: "jea",
    name: "نقابة المهندسين الأردنيين",
    url: "https://www.jea.org.jo/",
    category: "جهات حكومية وتنظيمية",
    sectors: ["الكليات الهندسية (19 تخصصاً)"],
    note: "المرجع المهني المعتمد للتحقق من تصنيف التخصصات الهندسية، ونسب الإشباع والبطالة المسجلة لدى الشعب الهندسية المختلفة، وتوصيات مسار التدريب والتأهيل.",
  },

  // ٢) مراجع أكاديمية وجامعية معتمدة حسب القطاعات
  {
    key: "ju",
    name: "الجامعة الأردنية (المرجع الأكاديمي الشامل)",
    url: "https://ju.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: [
      "الكليات الطبية والصحية",
      "الكليات الهندسية",
      "كليات العلوم الأساسية",
      "الكليات الإدارية والمالية",
      "كليات الحقوق",
      "كليات الآداب واللغات",
      "كليات الشريعة",
      "كليات العلوم التربوية",
      "كليات الفنون والتصميم",
      "كليات الزراعة",
      "كليات الرياضة",
    ],
    note: "المرجع الأكاديمي الرئيسي لتوثيق ومطابقة الخطط الدراسية، والتدريب السريري والميداني لمختلف الكليات الطبية والهندسية والإنسانية في الأردن.",
  },
  {
    key: "just",
    name: "جامعة العلوم والتكنولوجيا الأردنية",
    url: "https://www.just.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: [
      "الكليات الهندسية (19 تخصصاً)",
      "الكليات الطبية والصحية (17 تخصصاً)",
      "كليات الزراعة والبيئة (6 تخصصات)",
    ],
    note: "المصدر الأكاديمي المعتمد لمطابقة تخصصات الهندسة والتكنولوجيا، والعلوم الطبية والتمريضية، والإنتاج النباتي والحيواني وعلوم الأغذية.",
  },
  {
    key: "psut",
    name: "جامعة الأميرة سمية للتكنولوجيا",
    url: "https://www.psut.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["كليات تكنولوجيا المعلومات والذكاء الاصطناعي (11 تخصصاً)"],
    note: "المرجع الأكاديمي التخصصي المعتمد للتحقق من مسارات علوم الحاسوب، وهندسة البرمجيات، والذكاء الاصطناعي، والأمن السيبراني، والحوسبة السحابية.",
  },
  {
    key: "hu",
    name: "الجامعة الهاشمية",
    url: "https://hu.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: [
      "كليات IT والذكاء الاصطناعي",
      "كليات التربية والعلوم التربوية",
      "كليات الرياضة والسياحة والآثار",
    ],
    note: "المرجع المعتمد للتحقق من تخصصات كلية تكنولوجيا المعلومات والأنظمة الذكية، والتربية والطفولة المبكرة، والإرشاد السياحي والموارد التراثية.",
  },
  {
    key: "yu",
    name: "جامعة اليرموك",
    url: "https://www.yu.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: [
      "كليات العلوم الأساسية والتطبيقية (9 تخصصات)",
      "كليات الأدب واللغات والعلوم الإنسانية (17 تخصصاً)",
      "كليات الإعلام والاتصال (4 تخصصات)",
    ],
    note: "المرجع الوطني الرائد لمطابقة خطط العلوم الأساسية (الفيزياء، الكيمياء، الرياضيات)، واللغات العالمية الحديثة، وكلية الإعلام العريقة بمساراتها الرقمية.",
  },
  {
    key: "amman",
    name: "جامعة عمان الأهلية",
    url: "https://www.amman.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["الكليات الإدارية والاقتصادية والمالية (14 تخصصاً)"],
    note: "المرجع الأكاديمي المعتمد في قطاع الجامعات الخاصة للتحقق من مسارات إدارة الأعمال، والتسويق الرقمي، واللوجستيات، والتجارة الإلكترونية والعلوم المالية.",
  },
  {
    key: "mutah",
    name: "جامعة مؤتة",
    url: "https://www.mutah.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["كليات حقوق وقانون (3 تخصصات)", "العلوم الاجتماعية والإنسانية"],
    note: "المرجع المعتمد للتحقق من برامج القانون العام والخاص، والدراسات القضائية والتشريعية في الجامعات الأردنية.",
  },
  {
    key: "aabu",
    name: "جامعة آل البيت",
    url: "https://www.aabu.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["كليات الشريعة والدراسات الإسلامية (6 تخصصات)"],
    note: "المرجع المتخصص للتحقق من تخصصات الفقه وأصوله، وأصول الدين، والمصارف الإسلامية، والقضاء الشرعي والدراسات القرآنية.",
  },
  {
    key: "meu",
    name: "جامعة الشرق الأوسط",
    url: "https://www.meu.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["كليات الإعلام والاتصال (4 تخصصات)"],
    note: "المرجع التخصصي المعتمد لمطابقة برامج الإعلام الرقمي، والوسائط المتعددة، والعلاقات العامة، وتقنيات الإنتاج الإذاعي والتلفزيوني الحديث.",
  },
  {
    key: "asu",
    name: "جامعة العلوم التطبيقية الخاصة",
    url: "https://www.asu.edu.jo/",
    category: "مراجع أكاديمية وجامعية قطاعية",
    sectors: ["كليات الفنون والتصميم (7 تخصصات)"],
    note: "المرجع الأكاديمي المعتمد لمطابقة تخصصات التصميم الداخلي، والتصميم الجرافيكي، وتصميم الأزياء، والتحريك والوسائط المتعددة (Animation).",
  },
];

function Sources() {
  const { meta } = Route.useLoaderData();
  const statuses = new Map(meta.sources.map((row) => [row.key, row]));
  const lastScan = meta.lastScan;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">المصادر الرسمية المعتمدة</h1>
      <p className="pill tone-neutral mt-3">
        آخر فحص شامل للمصادر: {formatDateTime(lastScan?.finished_at ?? lastScan?.started_at)}
      </p>
      <p className="text-muted-foreground mt-3 text-sm leading-8">
        تعتمد منصة «الطلاب والمستقبل» على قائمة موثقة من المصادر الحكومية والجهات التنظيمية الرسمية
        بالإضافة إلى المرجعيات الأكاديمية للجامعات الأردنية المعتمدة للتحقق من تصنيفات الـ 121
        تخصصاً أكاديمياً وخططها التدريبية وسوق عملها. تُفحص الروابط دورياً وتُراجع البيانات وفق
        أحدث المستجدات الرسمية.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <div className="border-border/70 border-b pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              ١. الجهات الحكومية والتنظيمية والنقابية
            </h2>
            <p className="text-muted-foreground text-xs leading-6">
              المصادر الرسمية لتصنيفات سوق العمل، والقبول الموحد، والاعتماد الأكاديمي، ومسوح البطالة
              والتشغيل.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {sources
              .filter((s) => s.category === "جهات حكومية وتنظيمية")
              .map((source) => {
                const status = statuses.get(source.key);
                return (
                  <div key={source.key} className="card-surface flex flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-base font-bold text-foreground">
                          {source.name}
                        </h3>
                        <span className="pill text-xs">رسمي</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {source.sectors.map((sec) => (
                          <span
                            key={sec}
                            className="bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 text-xs"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-3 text-xs leading-6">{source.note}</p>
                    </div>

                    <div className="border-border/50 mt-4 border-t pt-3 flex items-center justify-between">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-ink text-xs font-semibold underline break-all"
                      >
                        زيارة المصدر ↗
                      </a>
                      <span className="text-muted-foreground text-[11px]">
                        آخر مراجعة: {formatDate(status?.last_reviewed_at ?? null)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <section>
          <div className="border-border/70 border-b pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              ٢. المرجعيات الأكاديمية والجامعية القطاعية
            </h2>
            <p className="text-muted-foreground text-xs leading-6">
              الجامعات الأردنية المعتمدة رسمياً لمطابقة الخطط الدراسية والمناهج والكليات التخصصية الـ
              13.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {sources
              .filter((s) => s.category === "مراجع أكاديمية وجامعية قطاعية")
              .map((source) => {
                const status = statuses.get(source.key);
                return (
                  <div key={source.key} className="card-surface flex flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-base font-bold text-foreground">
                          {source.name}
                        </h3>
                        <span className="pill tone-neutral text-xs">مرجع قطاعي</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {source.sectors.map((sec) => (
                          <span
                            key={sec}
                            className="bg-brand/10 text-brand rounded-md px-2 py-0.5 text-xs font-medium"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-3 text-xs leading-6">{source.note}</p>
                    </div>

                    <div className="border-border/50 mt-4 border-t pt-3 flex items-center justify-between">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-ink text-xs font-semibold underline break-all"
                      >
                        بوابة الجامعة الرسمية ↗
                      </a>
                      <span className="text-muted-foreground text-[11px]">
                        آخر مراجعة: {formatDate(status?.last_reviewed_at ?? null)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}
