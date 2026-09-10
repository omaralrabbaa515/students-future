export type CertificationCategory =
  | "برمجة وعلوم الحاسوب"
  | "تطوير الويب والتطبيقات"
  | "الذكاء الاصطناعي وتعلم الآلة"
  | "قواعد البيانات والتحليلات"
  | "الأمن السيبراني والشبكات ودعم تقنية المعلومات"
  | "الصحة العامة والخدمات الطبية"
  | "التسويق الرقمي وتطوير الأعمال"
  | "الإنسانيات والقانون والمحاسبة";

export type Certification = {
  id: string;
  title: string;
  provider: string;
  url: string;
  category: CertificationCategory;
  summary: string;
  /** طريقة الحصول على الشهادة كما تنص عليها الجهة المانحة */
  howToGet: string;
  /** أسماء المجالات الأكاديمية التي تستفيد من الشهادة */
  fields: string[];
};

export const certificationCategories: CertificationCategory[] = [
  "برمجة وعلوم الحاسوب",
  "تطوير الويب والتطبيقات",
  "الذكاء الاصطناعي وتعلم الآلة",
  "قواعد البيانات والتحليلات",
  "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
  "الصحة العامة والخدمات الطبية",
  "التسويق الرقمي وتطوير الأعمال",
  "الإنسانيات والقانون والمحاسبة",
];

const HARVARD = "التسجيل بحساب GitHub، وتسليم المهام بنسبة ٧٠٪ أو أكثر للحصول على شهادة إتمام رسمية مجاناً.";
const FCC = "إكمال المشاريع الخمسة الإلزامية في المسار، ثم طلب الشهادة فوراً من لوحة الحساب.";
const HELSINKI = "حل التمارين وتسليم المشاريع المطلوبة للحصول على الشهادة الرقمية.";
const CISCO = "اجتياز الاختبار النهائي للدورة للحصول على الشهادة وشارة Credly.";
const HUBSPOT = "اجتياز الاختبار النهائي بنسبة ٧٥٪ أو أكثر للحصول على الشهادة فوراً.";
const OPENWHO = "إنهاء المسار وتحقيق ٨٠٪ أو أكثر في الاختبارات لتحميل شهادة الإنجاز.";
const OPENLEARN = "الضغط على Enrol now مجاناً وإتمام المنهج لتحميل شهادة المشاركة.";

export const certifications: Certification[] = [
  // ١) جامعة هارفارد (CS50)
  {
    id: "cs50x",
    title: "مقدمة علوم الحاسب — CS50x",
    provider: "جامعة هارفارد (CS50)",
    url: "https://cs50.harvard.edu/x",
    category: "برمجة وعلوم الحاسوب",
    summary:
      "أساسات التفكير الحاسوبي والخوارزميات وهياكل البيانات مع لغات C وPython وSQL وأساسيات الويب، وتنتهي بمشروع نهائي عملي.",
    howToGet: HARVARD,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات", "الرياضيات", "الهندسة"],
  },
  {
    id: "cs50p",
    title: "بايثون — CS50P",
    provider: "جامعة هارفارد (CS50)",
    url: "https://cs50.harvard.edu/python",
    category: "برمجة وعلوم الحاسوب",
    summary:
      "إتقان لغة بايثون من الصفر: الدوال، الاستثناءات، المكتبات، التعبيرات النمطية، والاختبارات الآلية.",
    howToGet: HARVARD,
    fields: ["علوم الحاسوب", "الرياضيات", "الإحصاء", "الهندسة", "العلوم الأساسية", "الاقتصاد"],
  },
  {
    id: "cs50w",
    title: "تطوير الويب — CS50W",
    provider: "جامعة هارفارد (CS50)",
    url: "https://cs50.harvard.edu/web",
    category: "تطوير الويب والتطبيقات",
    summary: "بناء تطبيقات ويب باستخدام Django وSQL وJavaScript مع الاختبارات والنشر ومشروع نهائي.",
    howToGet: HARVARD,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },
  {
    id: "cs50ai",
    title: "الذكاء الاصطناعي — CS50AI",
    provider: "جامعة هارفارد (CS50)",
    url: "https://cs50.harvard.edu/ai",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary:
      "خوارزميات البحث، تمثيل المعرفة، الاحتمالات، التعلم الآلي والشبكات العصبية عملياً بلغة بايثون.",
    howToGet: HARVARD,
    fields: ["علوم الحاسوب", "الرياضيات", "الهندسة", "الفيزياء"],
  },
  {
    id: "cs50sql",
    title: "قواعد البيانات SQL — CS50SQL",
    provider: "جامعة هارفارد (CS50)",
    url: "https://cs50.harvard.edu/sql",
    category: "قواعد البيانات والتحليلات",
    summary: "تصميم قواعد البيانات، الاستعلامات المتقدمة، الفهارس، والتعامل مع بيانات حقيقية كبيرة.",
    howToGet: HARVARD,
    fields: ["نظم المعلومات", "المحاسبة", "إدارة الأعمال", "الإحصاء", "علوم الحاسوب"],
  },

  // ٢) freeCodeCamp
  {
    id: "fcc-responsive-web",
    title: "تصميم الويب المتجاوب",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design",
    category: "تطوير الويب والتطبيقات",
    summary: "إتقان HTML وCSS والتصميم المتجاوب وإمكانية الوصول عبر مشاريع عملية كاملة.",
    howToGet: FCC,
    fields: ["أي تخصص", "الإعلام الرقمي", "التصميم الجرافيكي", "نظم المعلومات", "علوم الحاسوب"],
  },
  {
    id: "fcc-javascript",
    title: "جافاسكريبت والخوارزميات وهياكل البيانات",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8",
    category: "تطوير الويب والتطبيقات",
    summary: "أساسيات لغة جافاسكريبت والبرمجة الكائنية والوظيفية والخوارزميات وهياكل البيانات.",
    howToGet: FCC,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },
  {
    id: "fcc-frontend-libraries",
    title: "مكتبات الواجهة الأمامية",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/front-end-development-libraries",
    category: "تطوير الويب والتطبيقات",
    summary: "بناء واجهات حديثة باستخدام React وRedux وBootstrap وSass مع خمسة مشاريع.",
    howToGet: FCC,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "التصميم", "نظم المعلومات"],
  },
  {
    id: "fcc-csharp",
    title: "أساسيات لغة C# مع مايكروسوفت",
    provider: "freeCodeCamp (بالتعاون مع مايكروسوفت)",
    url: "https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft",
    category: "برمجة وعلوم الحاسوب",
    summary: "مسار كامل في لغة C# مع اختبار نهائي معتمد من مايكروسوفت وشهادة مشتركة.",
    howToGet: FCC,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "هندسة الحاسوب", "نظم المعلومات"],
  },
  {
    id: "fcc-infosec",
    title: "أمن المعلومات",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/information-security",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "أمن التطبيقات وHelmetJS واختبار الاختراق وبناء أنظمة مصادقة آمنة.",
    howToGet: FCC,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "هندسة الشبكات", "نظم المعلومات"],
  },

  // ٣) جامعة هلسنكي
  {
    id: "elements-of-ai",
    title: "مفاهيم الذكاء الاصطناعي — Elements of AI",
    provider: "جامعة هلسنكي",
    url: "https://www.elementsofai.com",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary:
      "مدخل عالمي غير تقني إلى مفاهيم الذكاء الاصطناعي وتطبيقاته وأثره على المهن والمجتمع، مناسب لكل التخصصات.",
    howToGet: HELSINKI,
    fields: ["أي تخصص", "الإنسانيات", "إدارة الأعمال", "التربية", "الحقوق", "الإعلام"],
  },
  {
    id: "building-ai",
    title: "بناء تطبيقات الذكاء الاصطناعي — Building AI",
    provider: "جامعة هلسنكي",
    url: "https://buildingai.elementsofai.com",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "المستوى المتقدم: خوارزميات التعلم والتحسين وبناء حل ذكي متكامل خطوة بخطوة.",
    howToGet: HELSINKI,
    fields: ["علوم الحاسوب", "الهندسة", "الرياضيات", "إدارة الأعمال"],
  },
  {
    id: "helsinki-java",
    title: "لغة جافا — Java Programming MOOC",
    provider: "جامعة هلسنكي",
    url: "https://java-programming.mooc.fi",
    category: "برمجة وعلوم الحاسوب",
    summary: "مسار متدرج في لغة جافا والبرمجة الكائنية وهياكل البيانات مع مئات التمارين المصححة آلياً.",
    howToGet: HELSINKI,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "هندسة الحاسوب", "نظم المعلومات"],
  },
  {
    id: "fullstackopen",
    title: "تطوير الويب الشامل — Full Stack Open",
    provider: "جامعة هلسنكي",
    url: "https://fullstackopen.com",
    category: "تطوير الويب والتطبيقات",
    summary: "تطوير كامل الحزمة بتقنيات React وNode.js وGraphQL وTypeScript وMongoDB مع ساعات معتمدة.",
    howToGet: HELSINKI,
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },

  // ٤) أكاديمية سيسكو
  {
    id: "cisco-intro-cyber",
    title: "مقدمة في الأمن السيبراني",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/introduction-to-cybersecurity",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "مدخل إلى التهديدات الرقمية وحماية البيانات والهوية والوعي الأمني في المؤسسات.",
    howToGet: CISCO,
    fields: ["أي تخصص", "نظم المعلومات", "إدارة الأعمال", "الحقوق"],
  },
  {
    id: "cisco-cyber-essentials",
    title: "أساسيات الأمن السيبراني",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/cybersecurity-essentials",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "التشفير وإدارة المخاطر وضبط الوصول والدفاع عن الشبكات والاستجابة للحوادث.",
    howToGet: CISCO,
    fields: ["هندسة الشبكات", "علوم الحاسوب", "نظم المعلومات", "هندسة الحاسوب"],
  },
  {
    id: "cisco-networking-basics",
    title: "أساسيات الشبكات",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/networking-basics",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "بروتوكولات الشبكات والعنونة والتوجيه وبناء شبكة صغيرة عملياً.",
    howToGet: CISCO,
    fields: ["هندسة الشبكات", "هندسة الحاسوب", "علوم الحاسوب", "الهندسة الكهربائية"],
  },
  {
    id: "cisco-python-1",
    title: "بايثون ١ — Python Essentials 1",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/python-essentials-1",
    category: "برمجة وعلوم الحاسوب",
    summary: "أساسيات بايثون معتمدة من سيسكو مع شارة رقمية معترف بها في سوق العمل.",
    howToGet: CISCO,
    fields: ["أي تخصص", "علوم الحاسوب", "الهندسة", "العلوم", "الرياضيات"],
  },
  {
    id: "cisco-hardware-basics",
    title: "صيانة الحاسوب",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/computer-hardware-basics",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "مكونات الحاسوب وتجميعه وتشخيص الأعطال ومهارات الدعم الفني الأساسية.",
    howToGet: CISCO,
    fields: ["هندسة الحاسوب", "نظم المعلومات", "أي تخصص"],
  },
  {
    id: "cisco-linux-basics",
    title: "أساسيات لينكس",
    provider: "أكاديمية سيسكو (Skills for All)",
    url: "https://www.skillsforall.com/course/linux-basics",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "سطر الأوامر وإدارة الملفات والمستخدمين والخدمات على أنظمة لينكس.",
    howToGet: CISCO,
    fields: ["علوم الحاسوب", "هندسة الشبكات", "نظم المعلومات", "هندسة البرمجيات"],
  },

  // ٥) أكاديمية HubSpot
  {
    id: "hubspot-digital-marketing",
    title: "التسويق الرقمي",
    provider: "أكاديمية HubSpot",
    url: "https://academy.hubspot.com/courses/digital-marketing",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "بناء استراتيجية تسويق رقمي متكاملة: القنوات، البريد، الإعلانات، وقياس الأداء.",
    howToGet: HUBSPOT,
    fields: ["التسويق", "إدارة الأعمال", "الإعلام", "أي تخصص"],
  },
  {
    id: "hubspot-content-marketing",
    title: "التسويق بالمحتوى",
    provider: "أكاديمية HubSpot",
    url: "https://academy.hubspot.com/courses/content-marketing",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "تخطيط المحتوى وكتابته وإعادة توظيفه لبناء جمهور دائم للعلامة التجارية.",
    howToGet: HUBSPOT,
    fields: ["الصحافة", "الإعلام", "اللغة العربية", "اللغة الإنجليزية", "التسويق"],
  },
  {
    id: "hubspot-inbound-marketing",
    title: "التسويق الجاذب",
    provider: "أكاديمية HubSpot",
    url: "https://academy.hubspot.com/courses/inbound-marketing",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "منهجية التسويق الجاذب: الجذب والتفاعل والإسعاد ورحلة العميل الكاملة.",
    howToGet: HUBSPOT,
    fields: ["التسويق", "إدارة الأعمال", "العلاقات العامة", "السياحة والفندقة"],
  },
  {
    id: "hubspot-seo",
    title: "تحسين محركات البحث SEO",
    provider: "أكاديمية HubSpot",
    url: "https://academy.hubspot.com/courses/seo-training",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "أبحاث الكلمات المفتاحية والتحسين التقني وبناء الروابط وقياس الظهور في البحث.",
    howToGet: HUBSPOT,
    fields: ["التسويق", "الإعلام", "الصحافة", "نظم المعلومات", "أي تخصص"],
  },

  // ٦) منظمة الصحة العالمية
  {
    id: "openwho-ipc",
    title: "مكافحة العدوى",
    provider: "منظمة الصحة العالمية (OpenWHO)",
    url: "https://openwho.org/courses/IPC-intro-en",
    category: "الصحة العامة والخدمات الطبية",
    summary: "مبادئ الوقاية من العدوى ومكافحتها في المرافق الصحية ومعايير السلامة المعتمدة دولياً.",
    howToGet: OPENWHO,
    fields: ["التمريض", "الطب", "الصيدلة", "المختبرات الطبية", "الصحة العامة"],
  },
  {
    id: "openwho-ims",
    title: "إدارة طوارئ الصحة العامة",
    provider: "منظمة الصحة العالمية (OpenWHO)",
    url: "https://openwho.org/courses/ims-tier1-en",
    category: "الصحة العامة والخدمات الطبية",
    summary: "نظام إدارة الحوادث الصحية وتنسيق الاستجابة للطوارئ والأوبئة.",
    howToGet: OPENWHO,
    fields: ["التمريض", "الصحة العامة", "الطب", "الإدارة الصحية", "الخدمة الاجتماعية"],
  },
  {
    id: "openwho-health-logistics",
    title: "سلاسل التوريد الصحية",
    provider: "منظمة الصحة العالمية (OpenWHO)",
    url: "https://openwho.org/courses/health-logistics",
    category: "الصحة العامة والخدمات الطبية",
    summary: "إدارة اللوجستيات الطبية والمخزون الدوائي وسلاسل التبريد في القطاع الصحي.",
    howToGet: OPENWHO,
    fields: ["الصيدلة", "التمريض", "الإدارة الصحية", "إدارة الأعمال", "المختبرات الطبية"],
  },

  // ٧) الجامعة المفتوحة البريطانية
  {
    id: "openlearn-law",
    title: "مقدمة في القانون والعدالة",
    provider: "الجامعة المفتوحة البريطانية (OpenLearn)",
    url: "https://www.open.edu/openlearn/society-politics-law/introduction-english-law-and-justice/content-section-0",
    category: "الإنسانيات والقانون والمحاسبة",
    summary: "بنية النظام القانوني ومصادر التشريع ومفاهيم العدالة والمحاكمة العادلة.",
    howToGet: OPENLEARN,
    fields: ["الحقوق", "العلوم السياسية", "الإدارة العامة", "الخدمة الاجتماعية"],
  },
  {
    id: "openlearn-psychology",
    title: "مبادئ علم النفس",
    provider: "الجامعة المفتوحة البريطانية (OpenLearn)",
    url: "https://www.open.edu/openlearn/health-sports-psychology/starting-psychology/content-section-0",
    category: "الإنسانيات والقانون والمحاسبة",
    summary: "مدارس علم النفس ومناهج البحث السلوكي وتطبيقاتها في التعليم والصحة والعمل.",
    howToGet: OPENLEARN,
    fields: ["علم النفس", "التربية", "الخدمة الاجتماعية", "التمريض", "الإنسانيات"],
  },
  {
    id: "openlearn-forensic",
    title: "الأدلة الجنائية",
    provider: "الجامعة المفتوحة البريطانية (OpenLearn)",
    url: "https://www.open.edu/openlearn/science-maths-technology/introduction-forensic-science/content-section-0",
    category: "الإنسانيات والقانون والمحاسبة",
    summary: "جمع الأدلة وتحليلها مخبرياً وسلسلة الحفظ ودورها في الإجراءات القضائية.",
    howToGet: OPENLEARN,
    fields: ["الحقوق", "المختبرات الطبية", "العلوم الأساسية", "علم النفس"],
  },
  {
    id: "openlearn-bookkeeping",
    title: "المحاسبة ومسك الدفاتر",
    provider: "الجامعة المفتوحة البريطانية (OpenLearn)",
    url: "https://www.open.edu/openlearn/money-business/introduction-bookkeeping-and-accounting/content-section-0",
    category: "الإنسانيات والقانون والمحاسبة",
    summary: "القيود المزدوجة والميزانية وقائمة الدخل وأساسيات التقارير المالية.",
    howToGet: OPENLEARN,
    fields: ["المحاسبة", "إدارة الأعمال", "الاقتصاد", "التمويل", "السياحة والفندقة"],
  },
];

export function getCertificationsByIds(ids: string[]): Certification[] {
  return ids
    .map((id) => certifications.find((c) => c.id === id))
    .filter((c): c is Certification => Boolean(c));
}

export const certificationProviders = Array.from(
  new Set(certifications.map((c) => c.provider)),
).sort((a, b) => a.localeCompare(b, "ar"));
