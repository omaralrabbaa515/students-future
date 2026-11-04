export type CourseCategory =
  | "الدورات الطبية والصحية"
  | "الدورات الهندسية"
  | "دورات التكنولوجيا والذكاء الاصطناعي"
  | "دورات العلوم الاساسية والتطبيقية"
  | "الدورات الادارية والاقتصادية والمالية"
  | "دورات الحقوق والقانون"
  | "دورات الادب واللغات والعلوم الانسانية"
  | "دورات الشريعة والدراسات الاسلامية"
  | "دورات الاعلام والاتصال"
  | "دورات التربية مع العلوم التربوية"
  | "دورات الفنون والتصميم"
  | "دورات الزراعة والبيئة"
  | "دورات الرياضة والسياحة";

export type Course = {
  id: string;
  title: string;
  provider: string;
  url: string;
  category: CourseCategory;
  summary: string;
  /** طريقة التسجيل والحصول على الدورة والشهادة مجاناً */
  howToGet: string;
  /** المجالات والتخصصات المستفيدة */
  fields: string[];
};

// توافقية مع الملفات الموجودة
export type CertificationCategory = CourseCategory;
export type Certification = Course;

export const courseCategories: CourseCategory[] = [
  "الدورات الطبية والصحية",
  "الدورات الهندسية",
  "دورات التكنولوجيا والذكاء الاصطناعي",
  "دورات العلوم الاساسية والتطبيقية",
  "الدورات الادارية والاقتصادية والمالية",
  "دورات الحقوق والقانون",
  "دورات الادب واللغات والعلوم الانسانية",
  "دورات الشريعة والدراسات الاسلامية",
  "دورات الاعلام والاتصال",
  "دورات التربية مع العلوم التربوية",
  "دورات الفنون والتصميم",
  "دورات الزراعة والبيئة",
  "دورات الرياضة والسياحة"
];
export const certificationCategories = courseCategories;

export const courses: Course[] = [
  {
    "id": "health-01",
    "title": "أساسيات حماية الأطفال (Basics of Safeguarding Children)",
    "provider": "Alison",
    "url": "https://alison.com/course/basics-of-safeguarding-children",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول المبادئ الأساسية لحماية الأطفال من الإساءة والإهمال، والتعرف على المسؤوليات والإجراءات اللازمة لضمان سلامتهم.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات المساق والتقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "طب الأطفال",
      "التمريض",
      "الصحة العامة",
      "الرعاية النفسية والاجتماعية"
    ]
  },
  {
    "id": "health-02",
    "title": "خفض التصعيد اللفظي للعاملين في دعم الصحة النفسية (Verbal De-Escalation)",
    "provider": "Alison",
    "url": "https://alison.com/course/verbal-de-escalation-for-mental-health-support-workers",
    "category": "الدورات الطبية والصحية",
    "summary": "تعلّم أساليب التواصل اللفظي للتعامل مع المواقف الانفعالية والمتوترة في مجال الدعم النفسي، وتهدئة المواقف بطريقة آمنة.",
    "howToGet": "التسجيل المجاني عبر Alison وإتمام مساقات التواصل السلوكي واجتياز الاختبار النهائي.",
    "fields": [
      "الطب النفسي",
      "التمريض النفسي",
      "الإرشاد النفسي",
      "الرعاية الصحية"
    ]
  },
  {
    "id": "health-03",
    "title": "إدارة الأدوية وإعطاؤها (Medication Management and Administration)",
    "provider": "Alison",
    "url": "https://alison.com/course/medication-management-and-administration",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول الممارسات الأساسية لإدارة الأدوية وإعطائها بأمان، مع التركيز على التوثيق والمسؤوليات المهنية والقانونية.",
    "howToGet": "التسجيل في منصة Alison وإكمال مساقات السلامة الدوائية وبروتوكولات الإعطاء وتجاوز الاختبار بنجاح.",
    "fields": [
      "الصيدلة",
      "دكتور صيدلة",
      "التمريض",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-04",
    "title": "رعاية كبار السن والأشخاص ذوي الإعاقة (Elderly Care and Caring for the Disabled)",
    "provider": "Alison",
    "url": "https://alison.com/course/elderly-care-and-caring-for-the-disabled-revised",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم مبادئ الرعاية اليومية لكبار السن والأشخاص ذوي الإعاقة، ومساعدتهم في الأنشطة اليومية وتلبية احتياجاتهم الأساسية.",
    "howToGet": "إنشاء حساب مجاني في Alison وإنهاء المحاضرات واجتياز التقييم الختامي لتنزيل الشهادة.",
    "fields": [
      "العلاج الطبيعي",
      "العلاج الوظيفي",
      "التمريض",
      "التأهيل الطبي"
    ]
  },
  {
    "id": "health-05",
    "title": "مهارات تقديم الرعاية لمرضى الخرف (Caregiving Skills – Dementia Care)",
    "provider": "Alison",
    "url": "https://alison.com/course/caregiving-skills-dementia-care-revised",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول أساسيات رعاية المصابين بالخرف، والتعرف على احتياجاتهم، والتعامل مع التغيرات السلوكية والإدراكية المرتبطة بالحالة.",
    "howToGet": "إكمال فصول الدورة عبر Alison وحل الاختبار النهائي لإصدار شهادة الإنجاز.",
    "fields": [
      "الطب البشري",
      "طب الأعصاب",
      "التمريض",
      "علم النفس السريري"
    ]
  },
  {
    "id": "health-06",
    "title": "مقدمة في تقديم الرعاية (Introduction to Caregiving)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-caregiving-revised",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم مدخلًا إلى مهام مقدم الرعاية، وأساسيات التواصل مع المستفيدين، ومتابعة احتياجاتهم اليومية.",
    "howToGet": "التسجيل المجاني ومتابعة الدروس التعليمية واجتياز اختبار التقييم في منصة Alison.",
    "fields": [
      "التمريض",
      "المساعدة الطبية",
      "الرعاية الصحية المجتمعية"
    ]
  },
  {
    "id": "health-07",
    "title": "التوعية بصعوبات البلع (Dysphagia Awareness Training)",
    "provider": "Alison",
    "url": "https://alison.com/course/dysphagia-awareness-training",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح صعوبات البلع، وكيفية التعرف على علاماتها ومخاطرها، ومبادئ دعم التغذية الآمنة للأشخاص الذين يعانون منها.",
    "howToGet": "التسجيل المجاني وإتمام مساق صعوبات البلع واجتياز التقييم الختامي.",
    "fields": [
      "علاج النطق والسمع",
      "العلاج الوظيفي",
      "التغذية السريرية والحميات",
      "التمريض"
    ]
  },
  {
    "id": "health-09",
    "title": "مسببات الأمراض المنقولة بالدم (Bloodborne Pathogens - BBP)",
    "provider": "Alison",
    "url": "https://alison.com/course/bloodborne-pathogens-bbp",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول مخاطر مسببات الأمراض المنقولة بالدم، وطرق الوقاية من التعرض لها، ومبادئ الحماية الشخصية والتعامل الآمن مع المواد الملوثة.",
    "howToGet": "التسجيل في Alison وإكمال معايير السلامة المهنية ومكافحة العدوى والامتحان.",
    "fields": [
      "المختبرات والتحاليل الطبية",
      "طب الأسنان",
      "التمريض",
      "الطب البشري"
    ]
  },
  {
    "id": "health-10",
    "title": "الوقاية من العدوى ومكافحتها في تقديم الرعاية (Infection Prevention and Control)",
    "provider": "Alison",
    "url": "https://alison.com/course/infection-prevention-and-control-in-caregiving",
    "category": "الدورات الطبية والصحية",
    "summary": "توضح أساليب الحد من انتشار العدوى في بيئات الرعاية، بما يشمل النظافة الشخصية والتطهير والتعامل الآمن مع مصادر العدوى.",
    "howToGet": "التسجيل وإكمال وحدات التعقيم والسلامة ومكافحة العدوى عبر منصة Alison.",
    "fields": [
      "التمريض",
      "المختبرات الطبية",
      "طب الأسنان",
      "إدارة المستشفيات"
    ]
  },
  {
    "id": "health-11",
    "title": "الإسعافات الأولية للأطفال (Paediatric First Aid)",
    "provider": "Alison",
    "url": "https://alison.com/course/paediatric-first-aid",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم مقدمة عن التعامل الأولي مع الحالات الطارئة والحوادث التي قد تصيب الأطفال والرضع، إلى حين وصول المساعدة الطبية المناسبة.",
    "howToGet": "إتمام الدورة والاختبارات التفاعلية بنجاح في منصة Alison للحصول على شهادة إتمام.",
    "fields": [
      "طب الأطفال",
      "التمريض",
      "طب الطوارئ والإسعاف",
      "الرعاية الصحية الأولية"
    ]
  },
  {
    "id": "health-12",
    "title": "التحكم بالمواد الخطرة على الصحة (COSHH)",
    "provider": "Alison",
    "url": "https://alison.com/course/control-of-substances-hazardous-to-health-coshh",
    "category": "الدورات الطبية والصحية",
    "summary": "تركز على التعرف على المواد الكيميائية والبيولوجية الخطرة في بيئة العمل، وتقييم مخاطرها واتباع أساليب التعامل الآمن معها.",
    "howToGet": "التسجيل المجاني وإتمام مساق السلامة المهنية والمواد الخطرة واجتياز الاختبار.",
    "fields": [
      "الصيدلة",
      "المختبرات والتحاليل الطبية",
      "الصحة والسلامة المهنية",
      "الكيمياء الحيوية"
    ]
  },
  {
    "id": "health-13",
    "title": "التوعية بالسلامة من الحرائق (Fire Safety Awareness)",
    "provider": "Alison",
    "url": "https://alison.com/course/fire-safety-awareness",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول الوقاية من الحرائق، والتعرف على مخاطرها، ومبادئ الإخلاء وإجراءات السلامة في أماكن العمل والمنشآت.",
    "howToGet": "متابعة متطلبات المساق واجتياز التقييم النهائي عبر Alison للحصول على الشهادة الرقمية.",
    "fields": [
      "الصحة والسلامة المهنية",
      "إدارة المستشفيات والمراكز الطبية",
      "كافة الكوادر الصحية"
    ]
  },
  {
    "id": "health-14",
    "title": "معدات الحماية الشخصية في الصحة والسلامة (Personal Protective Equipment)",
    "provider": "Alison",
    "url": "https://alison.com/course/health-and-safety-personal-protective-equipment",
    "category": "الدورات الطبية والصحية",
    "summary": "توضح أنواع معدات الحماية الشخصية، وكيفية اختيار المعدات المناسبة واستخدامها للمساعدة في تقليل المخاطر المهنية.",
    "howToGet": "التسجيل في Alison وإكمال التدريب العملي على معدات الوقاية الشخصية واجتياز التقييم.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "طب الأسنان",
      "المختبرات والتحاليل الطبية"
    ]
  },
  {
    "id": "health-15",
    "title": "أنظمة الرعاية الصحية وتنظيمها (Healthcare Systems and Organization - BUS630)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus630",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم مقدمة عن مكونات أنظمة الرعاية الصحية، وكيفية تنظيم المؤسسات والخدمات الطبية والعلاقات بين الجهات العاملة في القطاع الصحي.",
    "howToGet": "الدراسة الذاتية مجاناً عبر Saylor Academy والتقدم للاختبار النهائي المعتمد بنسبة 70% فما فوق لإصدار الشهادة فوراً.",
    "fields": [
      "إدارة المستشفيات والرعاية الصحية",
      "الصحة العامة",
      "الطب البشري",
      "اقتصاديات الصحة"
    ]
  },
  {
    "id": "health-16",
    "title": "إدارة العمليات في الرعاية الصحية (Healthcare Operations Management - BUS632)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus632",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول إدارة العمليات اليومية في المنشآت الصحية، وتحسين كفاءة الخدمات وجودتها، وتنظيم الموارد والإجراءات التشغيلية.",
    "howToGet": "التسجيل المجاني في Saylor وإكمال الوحدات واجتياز الامتحان النهائي للحصول على شهادة مجانية معتمدة.",
    "fields": [
      "إدارة المستشفيات",
      "إدارة العمليات الصحية",
      "التمريض الإداري",
      "الصحة العامة"
    ]
  },
  {
    "id": "health-17",
    "title": "الجودة والسلامة في الرعاية الصحية (Healthcare Quality and Safety - BUS634)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus634",
    "category": "الدورات الطبية والصحية",
    "summary": "تركز على مبادئ تحسين جودة الخدمات الصحية، وتعزيز سلامة المرضى، وتقليل المخاطر والأخطاء في المؤسسات الطبية.",
    "howToGet": "إكمال منهج المساق عبر Saylor Academy واجتياز الاختبار النهائي بنجاح لتنزيل شهادة إنجاز معتمدة مجاناً.",
    "fields": [
      "إدارة الجودة الصحية",
      "الطب البشري",
      "التمريض",
      "سلامة المرضى والمنشآت الصحية"
    ]
  },
  {
    "id": "health-18",
    "title": "Anger Management a Guide to Emotional Regulation and Conflict Resolution",
    "provider": "Alison",
    "url": "https://alison.com/course/anger-management-a-guide-to-emotional-regulation-and-conflict-resolution",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمفاهيم الصحة النفسية والسلوك وأساليب الدعم أو تنظيم الانفعالات وفق الموضوع المحدد في الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-19",
    "title": "Asbestos Awareness for Health and Safety",
    "provider": "Alison",
    "url": "https://alison.com/course/asbestos-awareness-for-health-and-safety",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمخاطر الأسبستوس وطرق التعرف إلى احتمالات وجوده ومبادئ الوقاية والسلامة المهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-20",
    "title": "Basic First Aid Training",
    "provider": "Alison",
    "url": "https://alison.com/course/basic-first-aid-training",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمبادئ الإسعافات الأولية والاستجابة الأولية للطوارئ، ومتى ينبغي طلب المساعدة الطبية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-21",
    "title": "Basics of Motivational Interviewing",
    "provider": "Alison",
    "url": "https://alison.com/course/basics-of-motivational-interviewing",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرض مهارات المقابلة التحفيزية والتواصل الداعم لمساعدة الأفراد على التفكير في تغيير السلوك.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-22",
    "title": "Caregiver Strategies Challenging Behaviours",
    "provider": "Alison",
    "url": "https://alison.com/course/caregiver-strategies-challenging-behaviours",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول استراتيجيات دعم مقدمي الرعاية عند التعامل مع السلوكيات الصعبة، مع التركيز على التواصل والسلامة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-23",
    "title": "Core Principles of Manual Handling",
    "provider": "Alison",
    "url": "https://alison.com/course/core-principles-of-manual-handling",
    "category": "الدورات الطبية والصحية",
    "summary": "دورة تمهيدية تشرح المفاهيم الأساسية والموضوعات العملية المرتبطة بعنوانها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-24",
    "title": "CPR AED and First Aid",
    "provider": "Alison",
    "url": "https://alison.com/course/cpr-aed-and-first-aid",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمبادئ الإسعافات الأولية والاستجابة الأولية للطوارئ، ومتى ينبغي طلب المساعدة الطبية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-25",
    "title": "Drug and Alcohol Awareness: Mindful Decisions",
    "provider": "Alison",
    "url": "https://alison.com/course/drug-and-alcohol-awareness-mindful-decisions",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم توعية عامة حول اتخاذ قرارات واعية وتجنب مخاطر المخدرات والكحول وآثارها الصحية والاجتماعية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-26",
    "title": "Drugs and Alcohol Awareness and Prevention",
    "provider": "Alison",
    "url": "https://alison.com/course/drugs-and-alcohol-awareness-and-prevention",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول الوعي بمخاطر المخدرات والكحول ومبادئ الوقاية والتثقيف الصحي وطلب المساعدة المناسبة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-27",
    "title": "Food Safety and Hygiene",
    "provider": "Alison",
    "url": "https://alison.com/course/food-safety-and-hygien",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول مبادئ التغذية أو سلامة الغذاء والنظافة، وأثرها في الصحة والوقاية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-28",
    "title": "Fundamentals of Manual Handling",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-manual-handling",
    "category": "الدورات الطبية والصحية",
    "summary": "دورة تمهيدية تشرح المفاهيم الأساسية والموضوعات العملية المرتبطة بعنوانها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-29",
    "title": "Hazard Recognition and Risk Assessment",
    "provider": "Alison",
    "url": "https://alison.com/course/hazard-recognition-and-risk-assessment",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح أساليب التعليم والتدريس أو دعم المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-30",
    "title": "Hazardous Materials Safety Specialist",
    "provider": "Alison",
    "url": "https://alison.com/course/hazardous-materials-safety-specialist",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول مبادئ السلامة عند التعامل مع المواد الخطرة، والتعرف إلى المخاطر وإجراءات الوقاية والاستجابة المناسبة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-31",
    "title": "Health and Safety for Caregiving Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/health-and-safety-for-caregiving-revised",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدّم معرفة تمهيدية في موضوع صحي أو طبي، وتشمل المفاهيم الأساسية والوقاية والرعاية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-32",
    "title": "Hydrogen Sulphide Safety Training",
    "provider": "Alison",
    "url": "https://alison.com/course/hydrogen-sulphide-safety-training",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح مخاطر غاز كبريتيد الهيدروجين ومتطلبات الوعي والسلامة المهنية والوقاية من التعرض له.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-33",
    "title": "Infection Prevention and Control Masterclass",
    "provider": "Alison",
    "url": "https://alison.com/course/infection-prevention-and-control-masterclass",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول طرق الوقاية من العدوى ومبادئ النظافة ومكافحة انتقالها في بيئات الرعاية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-34",
    "title": "Introduction to Autism Awareness and Support",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-autism-awareness-and-support",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف باضطراب طيف التوحد وطرق الفهم والتواصل والدعم الملائم للأشخاص ذوي التوحد.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-35",
    "title": "Introduction to Biomedical Science",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-biomedical-science",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدّم معرفة تمهيدية في موضوع صحي أو طبي، وتشمل المفاهيم الأساسية والوقاية والرعاية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-36",
    "title": "ISO 13485 2016 Quality Management Systems for Medical Devices",
    "provider": "Alison",
    "url": "https://alison.com/course/iso-13485-2016-quality-management-systems-for-medical-devices",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدّم معرفة تمهيدية في موضوع صحي أو طبي، وتشمل المفاهيم الأساسية والوقاية والرعاية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-37",
    "title": "Laser Safety Awareness",
    "provider": "Alison",
    "url": "https://alison.com/course/laser-safety-awareness",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمخاطر الليزر ومبادئ الاستخدام الآمن ووسائل الوقاية في البيئات المهنية والتعليمية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-38",
    "title": "Managing Health and Safety in Healthcare",
    "provider": "Alison",
    "url": "https://alison.com/course/managing-health-and-safety-in-healthcare",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدّم معرفة تمهيدية في موضوع صحي أو طبي، وتشمل المفاهيم الأساسية والوقاية والرعاية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-39",
    "title": "Managing Safety and Health in Schools",
    "provider": "Alison",
    "url": "https://alison.com/course/managing-safety-and-health-in-schools",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدّم معرفة تمهيدية في موضوع صحي أو طبي، وتشمل المفاهيم الأساسية والوقاية والرعاية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-40",
    "title": "Managing Social Media Addiction",
    "provider": "Alison",
    "url": "https://alison.com/course/managing-social-media-addiction",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول الاستخدام المفرط لوسائل التواصل وآثاره السلوكية، ومبادئ بناء عادات رقمية أكثر توازنًا.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-41",
    "title": "Mastering Computer Workstation Safety",
    "provider": "Alison",
    "url": "https://alison.com/course/mastering-computer-workstation-safety",
    "category": "الدورات الطبية والصحية",
    "summary": "توضح مبادئ السلامة المهنية عند استخدام محطات عمل الحاسوب، وتهيئة بيئة العمل وتقليل الإجهاد والمخاطر المرتبطة بها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-42",
    "title": "Maternal Newborn Nursing Understanding Childbirth Education",
    "provider": "Alison",
    "url": "https://alison.com/course/maternal-newborn-nursing-understanding-childbirth-education",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول موضوعات الرعاية التمريضية واحتياجات المرضى، مع تركيز على المجال الصحي المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-43",
    "title": "Pet First Aid and CPR",
    "provider": "Alison",
    "url": "https://alison.com/course/pet-first-aid-and-cpr",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمبادئ الإسعافات الأولية والاستجابة الأولية للطوارئ، ومتى ينبغي طلب المساعدة الطبية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-44",
    "title": "Safe Practices for Working at Height",
    "provider": "Alison",
    "url": "https://alison.com/course/safe-practices-for-working-at-height",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول مخاطر العمل على الارتفاعات واحتياطات السلامة الأساسية وطرق الحد من الحوادث في مواقع العمل.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-45",
    "title": "Schizophrenia Unveiled Exploring the Science and Human Experience",
    "provider": "Alison",
    "url": "https://alison.com/course/schizophrenia-unveiled-exploring-the-science-and-human-experience",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بمفاهيم الصحة النفسية والسلوك وأساليب الدعم أو تنظيم الانفعالات وفق الموضوع المحدد في الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-46",
    "title": "Supporting Individuals with Intellectual Disabilities and Mental Illness",
    "provider": "Alison",
    "url": "https://alison.com/course/supporting-individuals-with-intellectual-disabilities-and-mental-illness",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم معرفة تمهيدية في الرعاية الصحية أو السلامة أو دعم الأفراد، وتركّز على المبادئ والممارسات العامة المرتبطة بالموضوع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-47",
    "title": "The Science and Practice of Intermittent Fasting",
    "provider": "Alison",
    "url": "https://alison.com/course/the-science-and-practice-of-intermittent-fasting",
    "category": "الدورات الطبية والصحية",
    "summary": "تستعرض الصيام المتقطع من منظور علمي عام، مع مناقشة المفاهيم والاعتبارات الصحية المرتبطة به.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-48",
    "title": "Understanding Epilepsy",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-epilepsy",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح أساسيات الصرع والتعرف إلى الحالة وطرق الدعم والسلامة للأشخاص المصابين بها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-49",
    "title": "Understanding Medication for Caregivers",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-medication-for-caregivers",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح معلومات عامة لمقدمي الرعاية حول الأدوية، وفهم تعليماتها ودعم الاستخدام الآمن بالتعاون مع المختصين.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-50",
    "title": "Adult Cardiovascular Disease Prevention",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=427",
    "category": "الدورات الطبية والصحية",
    "summary": "يركّز على الوقاية من أمراض القلب والأوعية لدى البالغين وعوامل الخطر والتوعية الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-51",
    "title": "Anatomy and Physiology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=434",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح تركيب جسم الإنسان ووظائف أجهزته الأساسية وعلاقة البنية بالوظيفة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-52",
    "title": "Biochemistry",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=257",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بالتفاعلات والجزيئات الكيميائية الحيوية التي تقوم عليها العمليات داخل الخلايا.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-53",
    "title": "Breast Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=236",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في صحة الثدي والتوعية والإرشاد الصحي، وموجهة للعاملين والدارسين في المجالات الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-54",
    "title": "Climate Change and Health Course for Health Professionals",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=474",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول آثار تغير المناخ على الصحة العامة ودور العاملين الصحيين في الاستجابة والتوعية والتكيف.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-55",
    "title": "Climate Change and Health Course for the Caribbean General Public",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=475",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح الصلة بين تغير المناخ وصحة الأفراد والمجتمعات، مع التركيز على آثار المناخ وطرق التكيف والوقاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-56",
    "title": "Climate Change and Public Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=307",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح المبادئ الأساسية لتغير المناخ وأثره في الصحة العامة، واستراتيجيات التكيف والتخفيف.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-57",
    "title": "Community Oriented Primary Care",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=405",
    "category": "الدورات الطبية والصحية",
    "summary": "يشرح الرعاية الأولية الموجهة للمجتمع وربط احتياجات السكان بالخدمات والبرامج الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-58",
    "title": "COVID-19 Orientation for Frontline Healthcare Providers in the Acute Care Setting",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=251",
    "category": "الدورات الطبية والصحية",
    "summary": "مادة توجيهية للعاملين الصحيين حول رعاية مرضى كوفيد-19 في بيئات الرعاية الحادة ومبادئ السلامة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-59",
    "title": "Didactic Emergency Medicine",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=37",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة تعليمية في طب الطوارئ ومبادئ تقييم الحالات الطبية الطارئة والاستجابة الأولية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-60",
    "title": "Environmental Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=272",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول تأثير البيئة والعوامل المحيطة على صحة الإنسان، ومبادئ تقييم المخاطر والوقاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-61",
    "title": "Epidemiology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=234",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في علم الأوبئة وقياس انتشار الأمراض وتحليل عوامل الخطر واستخدام البيانات في الصحة العامة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-62",
    "title": "Global Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=308",
    "category": "الدورات الطبية والصحية",
    "summary": "نظرة شاملة إلى التحديات الصحية العالمية وأنظمة الصحة والفوارق الصحية والتعاون الدولي.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-63",
    "title": "Global Mental Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=410",
    "category": "الدورات الطبية والصحية",
    "summary": "تقدم نظرة عامة على الصحة النفسية عالميًا والعوامل الاجتماعية والثقافية المؤثرة في خدمات الصحة النفسية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-64",
    "title": "Health Assessment (new)",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=473",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في التقييم الصحي وجمع المعلومات وملاحظة المؤشرات الأساسية ضمن الرعاية التمريضية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-65",
    "title": "Health Policy and Management",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=291",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في السياسات الصحية وإدارة المؤسسات والخدمات الصحية وصنع القرارات في القطاع الصحي.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-66",
    "title": "Health Promotion",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=451",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في تعزيز الصحة والوقاية والتوعية وتصميم تدخلات تساعد الأفراد والمجتمعات على تحسين صحتهم.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-67",
    "title": "Humanism in Health and Healthcare",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=412",
    "category": "الدورات الطبية والصحية",
    "summary": "يعرض مبادئ الرعاية الإنسانية والتواصل المتعاطف والتعاون مع المرضى لتحسين تجربة الرعاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-68",
    "title": "Introduction to Mental Health Professions",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=392",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرف بالمهن والتخصصات العاملة في مجال الصحة النفسية وأدوارها المهنية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-69",
    "title": "Leadership and Management in Nursing",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=486",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول القيادة وإدارة فرق التمريض وتنظيم العمل وتحسين جودة خدمات الرعاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-70",
    "title": "Lifestyle Medicine",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=205",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في أثر نمط الحياة والعادات اليومية على الصحة والوقاية وتعزيز العافية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-71",
    "title": "Management of Mental Health Disorders in Primary Care",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=298",
    "category": "الدورات الطبية والصحية",
    "summary": "يتناول مبادئ التعرف على اضطرابات الصحة النفسية والتعامل الأولي معها والإحالة ضمن الرعاية الأولية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-72",
    "title": "Maternal Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=286",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول صحة الأم ومراحل الرعاية المرتبطة بالحمل والولادة وما بعدها.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-73",
    "title": "Mathematics for Nursing Practice",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=650",
    "category": "الدورات الطبية والصحية",
    "summary": "تراجع المهارات الرياضية والحسابية المستخدمة في الدراسة والممارسة التمريضية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-74",
    "title": "Medical Terminology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=660",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بالمصطلحات الطبية الشائعة ومكوناتها واستخدامها في التواصل وفهم المعلومات الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-75",
    "title": "Medical-Surgical 1",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=436",
    "category": "الدورات الطبية والصحية",
    "summary": "مساق تمريضي في مبادئ الرعاية الطبية والجراحية وتقييم المرضى والتعامل مع احتياجاتهم.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-76",
    "title": "Mental Health Nursing",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=385",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في دور التمريض في دعم الصحة النفسية وتقديم رعاية تراعي احتياجات المرضى.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-77",
    "title": "Nurse's Aide",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=644",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في مهام مساعد التمريض ومبادئ دعم المرضى والرعاية اليومية الأساسية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-78",
    "title": "Nutrition in Nursing",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=455",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح أساسيات التغذية ودورها في رعاية المرضى ودعم الممارسات التمريضية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-79",
    "title": "Obstetrics and Gynecologic Clerkship for Medical Students",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=421",
    "category": "الدورات الطبية والصحية",
    "summary": "مساق سريري تعليمي لطلاب الطب حول أساسيات صحة المرأة والتوليد وأمراض النساء.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-80",
    "title": "Oncology Nursing",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=304",
    "category": "الدورات الطبية والصحية",
    "summary": "يتناول مبادئ الرعاية التمريضية لمرضى السرطان ودعم سلامة وجودة الرعاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-81",
    "title": "Outbreak Investigation",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=248",
    "category": "الدورات الطبية والصحية",
    "summary": "تعرّف بخطوات التحقيق في تفشي الأمراض، وجمع المعلومات وتحليلها وتحديد مصادر الانتشار والاستجابة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-82",
    "title": "Pediatric Oncology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=457",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في رعاية الأطفال المصابين بالسرطان واحتياجات التمريض المتخصص في هذا المجال.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-83",
    "title": "Population and Community Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=628",
    "category": "الدورات الطبية والصحية",
    "summary": "يتناول صحة السكان والمجتمعات وتقييم احتياجاتها وتصميم مبادرات الرعاية والوقاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-84",
    "title": "Preceptor Development for Healthcare Workers (Part I)",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=649",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول مهارات الإشراف والتوجيه العملي للمتدربين والعاملين في بيئات الرعاية الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-85",
    "title": "Psychiatric Clerkship for Medical Students",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=389",
    "category": "الدورات الطبية والصحية",
    "summary": "مساق سريري لطلاب الطب للتعرّف إلى أساسيات تقييم الصحة النفسية والرعاية في السياقات الطبية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-86",
    "title": "Public Health Leadership",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=264",
    "category": "الدورات الطبية والصحية",
    "summary": "تطوّر مهارات القيادة والتخطيط وإدارة الفرق والمبادرات في مجال الصحة العامة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-87",
    "title": "Public Health Nutrition",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=126",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول التغذية على مستوى السكان والصحة العامة، والعوامل المؤثرة في الأنماط الغذائية والوقاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-88",
    "title": "Research Methods for Health Sciences",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=275",
    "category": "الدورات الطبية والصحية",
    "summary": "تعلّم تصميم مشروع بحثي صحي وصياغة سؤال البحث وإعداد مقترح بحثي وعرضه.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-89",
    "title": "Rural Health and Aging",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=368",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول احتياجات الصحة في المناطق الريفية وقضايا التقدم في العمر وإمكانية الوصول إلى الرعاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-90",
    "title": "Social and Behavioral Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=290",
    "category": "الدورات الطبية والصحية",
    "summary": "تشرح العوامل الاجتماعية والسلوكية التي تؤثر في صحة الأفراد والمجتمعات وطرق تعزيز السلوك الصحي.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-91",
    "title": "Speech Language Pathology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=293",
    "category": "الدورات الطبية والصحية",
    "summary": "مقدمة في اضطرابات التواصل واللغة والكلام ومجال علاج النطق واللغة.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "health-92",
    "title": "War and Public Health",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=413",
    "category": "الدورات الطبية والصحية",
    "summary": "تتناول آثار النزاعات والنزوح والكوارث على الصحة العامة وتحديات تقديم الخدمات الصحية أثناء الأزمات.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الطب البشري",
      "التمريض",
      "الصحة العامة",
      "العلوم الطبية المساندة"
    ]
  },
  {
    "id": "eng-01",
    "title": "مبادئ الرياضيات الهندسية (ME101)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/me101-vv2/",
    "category": "الدورات الهندسية",
    "summary": "تقدم أساسيات الرياضيات اللازمة لفهم التطبيقات الهندسية والعلمية، وتساعد على بناء قاعدة رياضية للاستعداد لدراسة المواد الهندسية.",
    "howToGet": "التسجيل المجاني عبر منصة إدراك وإكمال مساقات التخصص وحل التقييمات بنجاح للحصول على شهادة الإتمام.",
    "fields": [
      "كافة التخصصات الهندسية",
      "الهندسة المدنية",
      "الهندسة الميكانيكية",
      "الهندسة الكهربائية"
    ]
  },
  {
    "id": "eng-02",
    "title": "الطباعة ثلاثية الأبعاد (3D Printing)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/223-%D8%A7%D9%84%D8%B7%D8%A8%D8%A7%D8%B9%D8%A9-%D8%AB%D9%84%D8%A7%D8%AB%D9%8A%D8%A9-%D8%A7%D9%84%D8%A3%D8%A8%D8%B9%D8%A7%D8%AF",
    "category": "الدورات الهندسية",
    "summary": "تعرف المتعلم بتقنيات الطباعة ثلاثية الأبعاد واستخدامها في إنتاج النماذج الأولية وتطوير المنتجات، بما يساعد على اختبار التصاميم قبل تصنيعها بصورة نهائية.",
    "howToGet": "التسجيل في منصة HP LIFE وإتمام الوحدات التعليمية التفاعلية وتنزيل شهادة الإنجاز المعتمدة مجاناً.",
    "fields": [
      "الهندسة الميكانيكية",
      "هندسة الميكاترونكس",
      "الهندسة الصناعية",
      "التصميم والتصنيع"
    ]
  },
  {
    "id": "eng-03",
    "title": "دورة تعليم أعمال وطرق البناء",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/5700/%D9%83%D9%88%D8%B1%D8%B3---%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85--%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D9%88%D8%B7%D8%B1%D9%82-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-video",
    "category": "الدورات الهندسية",
    "summary": "تتناول المراحل الأساسية لأعمال البناء، من تجهيز الموقع والأساسات إلى تنفيذ أجزاء المبنى وأعمال الإنشاء والتشطيب.",
    "howToGet": "متابعة الدروس المرئية عبر منصة معارف واستكمال متطلبات المساق لإصدار شهادة معتمدة من المنصة.",
    "fields": [
      "الهندسة المدنية",
      "هندسة البناء والإنشاءات",
      "إدارة المشاريع الإنشائية"
    ]
  },
  {
    "id": "eng-04",
    "title": "دورة تعليم صناعة المطابخ العصرية بسهولة",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/5712/%D9%83%D9%88%D8%B1%D8%B3---%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85--%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%B5%D9%86%D8%A7%D8%B9%D8%A9-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%A8%D8%AE-%D8%A7%D9%84%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9-%D8%A8%D8%B3%D9%87%D9%88%D9%84%D8%A9-video",
    "category": "الدورات الهندسية",
    "summary": "تشرح أساسيات تصميم المطابخ الحديثة وتصنيعها، بما يشمل أخذ المقاسات واختيار الأخشاب والخامات وآليات التجميع والتركيب.",
    "howToGet": "إنشاء حساب على منصة معارف ومتابعة الفيديوهات التعليمية حتى النهاية لإصدار الشهادة.",
    "fields": [
      "التصميم الداخلي والديكور",
      "الهندسة المعمارية",
      "التصنيع والإنتاج"
    ]
  },
  {
    "id": "eng-05",
    "title": "دورة تشطيب داخلي للحوائط",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6616/%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8-%D8%AF%D8%A7%D8%AE%D9%84%D9%8A-%D8%A7%D9%84%D8%AD%D9%88%D8%A7%D8%A6%D8%B7-video",
    "category": "الدورات الهندسية",
    "summary": "تقدم مهارات عملية في تجهيز الجدران الداخلية ومعالجتها وتشطيبها، من المعجون والتحضير الأولي إلى الدهان واللمسات النهائية.",
    "howToGet": "التسجيل في منصة معارف ومتابعة كامل الوحدات التطبيقية للحصول على شهادة إتمام المساق مجاناً.",
    "fields": [
      "الهندسة المعمارية",
      "الهندسة المدنية",
      "التصميم الداخلي",
      "إدارة الموقع الإنشائي"
    ]
  },
  {
    "id": "eng-06",
    "title": "مقدمة في ضبط الجودة (Introduction to Quality Control)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-quality-control",
    "category": "الدورات الهندسية",
    "summary": "تتناول أساسيات ضبط الجودة ومراقبة العمليات الإنتاجية باستخدام الأدوات الإحصائية والمخططات البيانية، بهدف اكتشاف الانحرافات وتحسين كفاءة الإنتاج.",
    "howToGet": "التسجيل المجاني في Alison وإتمام وحدات مراقبة العمليات واجتياز التقييم بنسبة 80% فما فوق.",
    "fields": [
      "الهندسة الصناعية",
      "هندسة الإنتاج والتصنيع",
      "إدارة الجودة"
    ]
  },
  {
    "id": "eng-07",
    "title": "إدارة المشاريع الهندسية (Engineering Project Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/engineering-project-management",
    "category": "الدورات الهندسية",
    "summary": "تشرح المبادئ الأساسية لتخطيط المشاريع الهندسية وتنفيذها ومراقبتها، مع التعرف على مسؤوليات مدير المشروع ومعايير تقييم نجاح المشروع.",
    "howToGet": "التسجيل في Alison وإكمال الفصول التدريبية والتقييم النهائي للحصول على الشهادة الرقمية.",
    "fields": [
      "الهندسة المدنية",
      "الهندسة الصناعية",
      "الهندسة الميكانيكية",
      "إدارة الإنشاءات"
    ]
  },
  {
    "id": "eng-08",
    "title": "أساسيات الإدارة الهندسية (Basics of Engineering Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/basics-of-engineering-management",
    "category": "الدورات الهندسية",
    "summary": "تركز على المهارات الإدارية والقيادية التي يحتاجها المهندسون، مثل التخطيط وإدارة المخاطر واتخاذ القرارات وإدارة الموارد والموردين.",
    "howToGet": "إكمال فصول الدورة عبر Alison واجتياز الامتحان النهائي لتنزيل شهادة الإنجاز.",
    "fields": [
      "الهندسة الصناعية",
      "كافة فروع الهندسة",
      "الإدارة الهندسية"
    ]
  },
  {
    "id": "eng-09",
    "title": "إدارة العقود الهندسية (Engineering Contract Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/engineering-contract-management",
    "category": "الدورات الهندسية",
    "summary": "تتناول إدارة العقود في المشاريع الهندسية، بما في ذلك فهم بنود العقود ومتابعة التغييرات والمطالبات المالية والتعامل مع النزاعات المهنية.",
    "howToGet": "التسجيل المجاني في Alison وإنهاء المنهج واجتياز الاختبار بنجاح.",
    "fields": [
      "الهندسة المدنية",
      "إدارة الإنشاءات",
      "الهندسة المعمارية",
      "العقود الهندسية FIDIC"
    ]
  },
  {
    "id": "eng-10",
    "title": "الإدارة الحديثة للمشاريع الهندسية (Modern Engineering Project Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/modern-engineering-project-management",
    "category": "الدورات الهندسية",
    "summary": "تتناول أساليب الإدارة الحديثة للمشاريع الهندسية، بما في ذلك جدولة المهام باستخدام المسار الحرج، وإدارة التكاليف والمخاطر والاستفادة من الأدوات الرقمية.",
    "howToGet": "إكمال متطلبات المساق عبر Alison والتقييم النهائي للحصول على الشهادة المعتمدة.",
    "fields": [
      "الهندسة المدنية",
      "الهندسة الصناعية",
      "إدارة المشاريع الهندسية"
    ]
  },
  {
    "id": "eng-11",
    "title": "أساسيات هندسة الاعتمادية (Reliability Engineering Fundamentals)",
    "provider": "Alison",
    "url": "https://alison.com/course/reliability-engineering-fundamentals-enhanced-performance-levels",
    "category": "الدورات الهندسية",
    "summary": "تعرف المتعلم بمبادئ هندسة الاعتمادية وطرق تحسين موثوقية الأنظمة والمعدات، وتقليل الأعطال من خلال الصيانة الوقائية والتنبؤية.",
    "howToGet": "التسجيل في Alison وإتمام المساق واجتياز الاختبار النهائي بنسبة 80% أو أعلى.",
    "fields": [
      "الهندسة الميكانيكية",
      "الهندسة الكهربائية",
      "هندسة الصيانة والاعتمادية"
    ]
  },
  {
    "id": "eng-12",
    "title": "أساسيات MATLAB وبصريات الحيود في الهندسة البصرية (MATLAB & Diffractive Optics)",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-matlab-and-diffractive-optics-in-optical-engineering",
    "category": "الدورات الهندسية",
    "summary": "تجمع بين استخدام MATLAB ومفاهيم البصريات الحيودية وتطبيقاتهما في تحليل الأنظمة البصرية وحل المسائل الهندسية ذات الصلة.",
    "howToGet": "التسجيل المجاني وإتمام التطبيقات العملية على MATLAB واجتياز الامتحان.",
    "fields": [
      "الهندسة البصرية",
      "الهندسة الكهربائية",
      "هندسة الاتصالات",
      "هندسة الميكاترونكس"
    ]
  },
  {
    "id": "eng-13",
    "title": "أساسيات مصفوفات تتبع الأشعة والمستويات الرئيسية (Ray Tracing Matrix in Optical Engineering)",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-ray-tracing-matrix-and-principal-planes-in-optical-engineering",
    "category": "الدورات الهندسية",
    "summary": "تتناول الأسس الرياضية والفيزيائية لتتبع الأشعة الضوئية واستخدام مصفوفات ABCD لتحليل الأنظمة البصرية وتصميم العدسات.",
    "howToGet": "إكمال فصول الدورة واجتياز التقييم النهائي عبر Alison لإصدار الشهادة.",
    "fields": [
      "الهندسة البصرية",
      "الهندسة الفيزيائية",
      "الهندسة الكهربائية"
    ]
  },
  {
    "id": "eng-14",
    "title": "هندسة التعافي من الكوارث (Disaster Recovery Engineering)",
    "provider": "Alison",
    "url": "https://alison.com/course/disaster-recovery-engineering",
    "category": "الدورات الهندسية",
    "summary": "تستعرض مبادئ التعافي من الكوارث واستمرارية الأعمال، وتحليل أثر الانقطاعات، وإعداد خطط تساعد المؤسسات على استعادة عملياتها وأنظمتها بعد الحوادث.",
    "howToGet": "التسجيل في Alison وإكمال مساق استمرارية الأعمال وهندسة الطوارئ واجتياز التقييم.",
    "fields": [
      "هندسة الحاسوب والشبكات",
      "الهندسة الصناعية",
      "إدارة البنى التحتية"
    ]
  },
  {
    "id": "eng-15",
    "title": "الرياضيات الهندسية: القطوع المخروطية والدوال اللوغاريتمية (Maths for Engineering)",
    "provider": "Alison",
    "url": "https://alison.com/course/maths-for-engineering-conic-sections-and-logarithmic-functions",
    "category": "الدورات الهندسية",
    "summary": "تشرح القطوع المخروطية والدوال اللوغاريتمية والأسية، وتعرض المفاهيم الرياضية المرتبطة باستخدامها في المسائل والتطبيقات الهندسية.",
    "howToGet": "إتمام الوحدات التدريبية واجتياز التقييم بنسبة 80% للحصول على شهادة إتمام رقمية.",
    "fields": [
      "كافة التخصصات الهندسية",
      "الهندسة الميكانيكية",
      "الهندسة المدنية",
      "الهندسة الكهربائية"
    ]
  },
  {
    "id": "eng-16",
    "title": "مهندس الجودة: تقييم جودة الموردين وإدارتها (Supplier Quality Evaluation & Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/quality-engineer-supplier-quality-evaluation-and-management",
    "category": "الدورات الهندسية",
    "summary": "تركز على تقييم الموردين ومراجعة جودة المنتجات والمواد الواردة، ومتابعة إجراءات التدقيق والتحسين لضمان استيفاء متطلبات الجودة.",
    "howToGet": "التسجيل في Alison وإكمال المساق التخصصي واجتياز التقييم النهائي.",
    "fields": [
      "الهندسة الصناعية",
      "هندسة سلاسل الإمداد",
      "إدارة الجودة الشاملة"
    ]
  },
  {
    "id": "eng-17",
    "title": "مقدمة في المولدات الكهربائية (Introduction to Alternators)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-alternators",
    "category": "الدورات الهندسية",
    "summary": "تشرح المبادئ الأساسية لعمل المولدات الكهربائية المتناوبة، وتوليد الجهد الكهربائي ثلاثي الأطوار، وتنظيم الجهد ومزامنة المولدات مع الشبكات الكهربائية.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار النهائي بنجاح عبر Alison.",
    "fields": [
      "الهندسة الكهربائية",
      "هندسة القوى والطاقة",
      "الهندسة الميكانيكية"
    ]
  },
  {
    "id": "eng-18",
    "title": "Diploma in Engineering Drawing and Computer Graphics",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-engineering-drawing-and-computer-graphics",
    "category": "الدورات الهندسية",
    "summary": "تقدّم مدخلًا إلى الحوسبة والبرمجة والأدوات الرقمية، وتشرح المهارات الأساسية المرتبطة بموضوع الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "الهندسة الصناعية",
      "الرسم الهندسي"
    ]
  },
  {
    "id": "eng-19",
    "title": "Fundamental of Basic Electrical Circuits",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamental-of-basic-electrical-circuits",
    "category": "الدورات الهندسية",
    "summary": "تشرح المبادئ الأساسية للدوائر الكهربائية، مثل الجهد والتيار والمقاومة والعلاقات بينها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "الهندسة الصناعية",
      "الرسم الهندسي"
    ]
  },
  {
    "id": "eng-20",
    "title": "Introduction to Material Science",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-material-science",
    "category": "الدورات الهندسية",
    "summary": "تقدم مقدمة إلى علم المواد وخصائصها وبنيتها وكيفية ارتباط هذه الخصائص باستخداماتها الهندسية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "الهندسة الصناعية",
      "الرسم الهندسي"
    ]
  },
  {
    "id": "eng-21",
    "title": "The Basic Science of Metallurgy",
    "provider": "Alison",
    "url": "https://alison.com/course/the-basic-science-of-metallurgy",
    "category": "الدورات الهندسية",
    "summary": "تعرّف بأساسيات علم الفلزات وخصائص المعادن والسبائك والعمليات المرتبطة بها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "الهندسة الصناعية",
      "الرسم الهندسي"
    ]
  },
  {
    "id": "tech-01",
    "title": "إدارة خوادم قاعدة البيانات MS SQL Server",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/the-ms-sql-server-administration-v1/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعلم أساسيات وتقنيات إدارة قواعد البيانات باستخدام Microsoft SQL Server، بما يشمل تشغيلها وإدارتها والمحافظة على كفاءتها وأمانها.",
    "howToGet": "التسجيل المجاني في منصة إدراك وإكمال مساقات التخصص وحل التقييمات لإصدار شهادة التخصص المعتمدة مجاناً.",
    "fields": [
      "علوم الحاسوب",
      "هندسة البرمجيات",
      "نظم المعلومات الحاسوبية",
      "إدارة قواعد البيانات"
    ]
  },
  {
    "id": "tech-02",
    "title": "تصميم وتنسيق المواقع باستخدام CSS",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/css-v1/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تركز على تعلم CSS لتنسيق صفحات الويب والتحكم في الألوان والخطوط والتخطيطات، وإنشاء واجهات متجاوبة مع أحجام الشاشات المختلفة.",
    "howToGet": "إكمال متطلبات الدورة والتطبيقات العملية عبر منصة إدراك لتنزيل شهادة إتمام المساق مجاناً.",
    "fields": [
      "تطوير الويب",
      "علوم الحاسوب",
      "هندسة البرمجيات",
      "تصميم الواجهات"
    ]
  },
  {
    "id": "tech-03",
    "title": "قواعد البيانات باستخدام SQL",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/sql1-v1/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعلم أساسيات لغة SQL لإنشاء قواعد البيانات والاستعلام عن البيانات وإضافتها وتعديلها وإدارتها.",
    "howToGet": "التسجيل في منصة إدراك وإتمام الوحدات التعليمية والاختبارات بنجاح للحصول على الشهادة الرقمية.",
    "fields": [
      "علوم الحاسوب",
      "علم البيانات",
      "هندسة البرمجيات",
      "نظم المعلومات الإدارية"
    ]
  },
  {
    "id": "tech-04",
    "title": "علوم الحاسوب وأساسيات البرمجة (CS101)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/cs101-vv2/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدم مدخلًا إلى علوم الحاسوب والتفكير الحاسوبي والمفاهيم الأساسية للبرمجة وتطوير البرمجيات.",
    "howToGet": "متابعة المساق عبر إدراك واجتياز التقييمات البرمجية لتنزيل الشهادة المعتمدة فوراً.",
    "fields": [
      "علوم الحاسوب",
      "هندسة البرمجيات",
      "الذكاء الاصطناعي",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-05",
    "title": "تصميم واجهات وتجربة المستخدم (UI/UX)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/uiux-v1/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ تصميم واجهات المواقع والتطبيقات، وفهم احتياجات المستخدمين، وتحسين سهولة الاستخدام وتجربتهم أثناء التفاعل مع المنتجات الرقمية.",
    "howToGet": "إتمام الوحدات التدريبية وتسليم التكليفات عبر إدراك للحصول على شهادة إتمام مجانية.",
    "fields": [
      "تصميم تجربة المستخدم UI/UX",
      "تطوير التطبيقات والويب",
      "الوسائط المتعددة"
    ]
  },
  {
    "id": "tech-06",
    "title": "الرخصة الدولية لقيادة الحاسوب (ICDL)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/icdlsp-vv2/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تغطي المهارات الرقمية الأساسية، مثل معالجة النصوص والجداول الإلكترونية والعروض التقديمية واستخدام الإنترنت.",
    "howToGet": "التسجيل وإكمال كافة المحاور الرقمية والاختبارات التفاعلية بنجاح عبر منصة إدراك.",
    "fields": [
      "كافة التخصصات والطلبة",
      "تكنولوجيا المعلومات",
      "إدارة الأعمال والمكاتب"
    ]
  },
  {
    "id": "tech-07",
    "title": "مقدمة للتوعية بالأمن السيبراني (Cybersecurity Awareness)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/376-%D9%85%D9%82%D8%AF%D9%85%D8%A9-%D9%84%D9%84%D8%AA%D9%88%D8%B9%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%A3%D9%85%D9%86-%D8%A7%D9%84%D8%B3%D9%8A%D8%A8%D8%B1%D8%A7%D9%86%D9%8A",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدم إرشادات أساسية لحماية البيانات والأجهزة والمؤسسات من التهديدات الرقمية والهجمات الإلكترونية.",
    "howToGet": "التسجيل في منصة HP LIFE وإتمام الوحدات التفاعلية بنجاح لتنزيل شهادة إنجاز معتمدة مجاناً.",
    "fields": [
      "الأمن السيبراني",
      "شبكات الحاسوب",
      "تكنولوجيا المعلومات",
      "أمن البيانات"
    ]
  },
  {
    "id": "tech-08",
    "title": "الذكاء الاصطناعي وتعزيز فرص التوظيف",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/ai-for-employment-v1/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تستعرض استخدامات أدوات الذكاء الاصطناعي في بيئة العمل، وكيفية الاستفادة منها لتحسين الإنتاجية وتعزيز المهارات المهنية.",
    "howToGet": "إكمال المساق عبر منصة إدراك واجتياز التقييمات لتنزيل شهادة إتمام معتمدة.",
    "fields": [
      "الذكاء الاصطناعي",
      "كافة التخصصات الأكاديمية",
      "التطوير المهني والإنتاجية"
    ]
  },
  {
    "id": "tech-09",
    "title": "الذكاء الاصطناعي للمبتدئين (AI for Beginners)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/399-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدم مدخلًا مبسطًا إلى مفاهيم الذكاء الاصطناعي الأساسية واستخداماته اليومية والمهنية دون اشتراط خبرة تقنية متقدمة.",
    "howToGet": "إنشاء حساب على HP LIFE ومتابعة الدروس التفاعلية وإصدار الشهادة فوراً.",
    "fields": [
      "الذكاء الاصطناعي",
      "علوم الحاسوب",
      "علم البيانات",
      "التكنولوجيا"
    ]
  },
  {
    "id": "tech-10",
    "title": "علم البيانات والتحليلات (Data Science & Analytics)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/361-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D8%AA%D8%AD%D9%84%D9%8A%D9%84%D8%A7%D8%AA",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرف المتعلم بكيفية جمع البيانات وتحليلها واستخراج معلومات مفيدة منها للمساعدة في اتخاذ القرارات.",
    "howToGet": "إكمال المساق عبر منصة HP LIFE وحل الأنشطة التطبيقية لتنزيل شهادة الإتمام.",
    "fields": [
      "علم البيانات",
      "ذكاء الأعمال Business Intelligence",
      "الإحصاء والبيانات الضخمة"
    ]
  },
  {
    "id": "tech-11",
    "title": "تكنولوجيا المعلومات لنجاح الأعمال (IT for Business Success)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/214-%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7-%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA-%D9%84%D9%86%D8%AC%D8%A7%D8%AD-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول كيفية اختيار الحلول التقنية المناسبة لاحتياجات المشروعات، وتحسين الكفاءة التشغيلية والإنتاجية من خلال التكنولوجيا.",
    "howToGet": "التسجيل في HP LIFE وإنهاء الوحدات الدراسية للحصول على شهادة معتمدة رقمياً.",
    "fields": [
      "تكنولوجيا المعلومات",
      "إدارة الأعمال",
      "ريادة الأعمال والشركات الناشئة"
    ]
  },
  {
    "id": "tech-12",
    "title": "مواقع الويب الفعالة (Effective Websites)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/203-%D9%85%D9%88%D8%A7%D9%82%D8%B9-%D8%A7%D9%84%D9%88%D9%8A%D8%A8-%D8%A7%D9%84%D9%81%D8%B9%D8%A7%D9%84%D8%A9",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح مبادئ إنشاء مواقع إلكترونية فعالة وسهلة التصفح، تساعد على عرض المنتجات والخدمات وتحويل الزوار إلى عملاء.",
    "howToGet": "إكمال مساق بناء المواقع الإلكترونية الفعالة وتنزيل شهادة الإنجاز مجاناً عبر HP LIFE.",
    "fields": [
      "تطوير الويب",
      "التسويق الرقمي",
      "التجارة الإلكترونية",
      "تصميم الويب"
    ]
  },
  {
    "id": "tech-13",
    "title": "نظم المعلومات الإدارية (Management Information Systems - BUS206)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus206",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "توضح كيفية استخدام نظم المعلومات والتكنولوجيا لدعم العمليات داخل المؤسسات وتحسين اتخاذ القرارات الإدارية والاستراتيجية.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار النهائي المعتمد بنسبة 70% فما فوق للحصول على شهادة Saylor Academy المجانية.",
    "fields": [
      "نظم المعلومات الإدارية MIS",
      "تكنولوجيا المعلومات",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "tech-14",
    "title": "دبلوم هندسة DevOps باستخدام Kubernetes وDocker وGoogle Cloud",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-devops-engineering-kubernetes-docker-and-google-cloud",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدم مقدمة تطبيقية إلى هندسة DevOps، مع التركيز على الحاويات باستخدام Docker، وإدارتها باستخدام Kubernetes، والاستفادة من خدمات Google Cloud في تشغيل التطبيقات ونشرها.",
    "howToGet": "التسجيل في منصة Alison وإكمال مساقات الحوسبة السحابية وDevOps واجتياز الامتحان النهائي بنسبة 80% فأكثر.",
    "fields": [
      "هندسة البرمجيات",
      "الحوسبة السحابية Cloud Computing",
      "هندسة DevOps",
      "علوم الحاسوب"
    ]
  },
  {
    "id": "tech-15",
    "title": "Digital Skills: Mobile",
    "provider": "Accenture / FutureLearn",
    "url": "https://www.futurelearn.com/courses/digital-skills-mobile",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بتطور تقنيات الهاتف المحمول ومبادئ تصميم التطبيقات وتجربتها وتطويرها والشبكات والأجهزة القابلة للارتداء. تاريخ الإيقاف المعلن على FutureLearn: 5 نوفمبر 2026.",
    "howToGet": "التسجيل المجاني عبر منصة FutureLearn وإتمام خطوات الدورة الأسبوعية للحصول على شهادة الإنجاز الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-16",
    "title": "Digital Skills: Artificial Intelligence",
    "provider": "Accenture / FutureLearn",
    "url": "https://www.classcentral.com/course/artificial-intelligence-16995",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة مبسطة إلى الذكاء الاصطناعي وتطبيقاته وتأثيره في العمل والحياة اليومية. تنبيه: أعلنت FutureLearn أن دورات Accenture Digital Skills تتقاعد في 5 نوفمبر 2026.",
    "howToGet": "التسجيل المجاني عبر منصة FutureLearn وإتمام خطوات الدورة الأسبوعية للحصول على شهادة الإنجاز الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-17",
    "title": "Advanced Diploma in Computer Networks and Internet Protocol",
    "provider": "Alison",
    "url": "https://alison.com/course/advanced-diploma-in-computer-networks-and-internet-protocol",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح أساسيات شبكات الحاسوب وبروتوكولات الاتصال والبنية التحتية، مع موضوعات مرتبطة بالإدارة والحماية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-18",
    "title": "Advanced Knowledge Representation and Reasoning",
    "provider": "Alison",
    "url": "https://alison.com/course/advanced-knowledge-representation-and-reasoning",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تمثيل المعرفة وأساليب الاستدلال المنطقي وكيفية تنظيم المعلومات لتدعم الأنظمة الذكية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-19",
    "title": "AI for Human Behavior Analysis",
    "provider": "Alison",
    "url": "https://alison.com/course/ai-for-human-behavior-analysis",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-20",
    "title": "Amazon Web Services Intermediate",
    "provider": "Alison",
    "url": "https://alison.com/course/amazon-web-services-intermediate",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بخدمات الحوسبة السحابية من Amazon Web Services واستخدامها في التطبيقات والبنية التقنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-21",
    "title": "App Development using Dart Programming Language",
    "provider": "Alison",
    "url": "https://alison.com/course/app-development-using-dart-programming-language",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-22",
    "title": "Artificial Intelligence for Beginners",
    "provider": "Alison",
    "url": "https://alison.com/course/artificial-intelligence-for-beginners",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-23",
    "title": "Artificial Intelligence Fundamentals and State Space Search",
    "provider": "Alison",
    "url": "https://alison.com/course/artificial-intelligence-fundamentals-and-state-space-search",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-24",
    "title": "Artificial Intelligence in Education and Learning",
    "provider": "Alison",
    "url": "https://alison.com/course/artificial-intelligence-in-education-and-learning",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-25",
    "title": "C Plus Plus Fundamentals",
    "provider": "Alison",
    "url": "https://alison.com/course/c-plus-plus-fundamentals",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-26",
    "title": "C Programming Introduction",
    "provider": "Alison",
    "url": "https://alison.com/course/c-programming-introduction",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-27",
    "title": "C Programming Numbers Variables and Arrays",
    "provider": "Alison",
    "url": "https://alison.com/course/c-programming-numbers-variables-and-arrays",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-28",
    "title": "C Programming Pointers Constants and Strings",
    "provider": "Alison",
    "url": "https://alison.com/course/c-programming-pointers-constants-and-strings",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-29",
    "title": "Computer Maintenance and PC Building",
    "provider": "Alison",
    "url": "https://alison.com/course/computer-maintenance-and-pc-building",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح صيانة الحاسوب ومكوّنات الحاسب الشخصي ومبادئ تجميع الأجهزة وتشخيص المشكلات الشائعة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-30",
    "title": "Data Analytics Introduction to Machine Learning Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/data-analytics-introduction-to-machine-learning-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-31",
    "title": "Data Science Fundamentals Essential Tools and Concepts",
    "provider": "Alison",
    "url": "https://alison.com/course/data-science-fundamentals-essential-tools-and-concepts",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-32",
    "title": "Data Science Regression and Clustering Models",
    "provider": "Alison",
    "url": "https://alison.com/course/data-science-regression-and-clustering-models",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-33",
    "title": "Data Science Visualizing Data and Exploring Models Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/data-science-visualizing-data-and-exploring-models-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-34",
    "title": "Data Science Working with Data Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/data-science-working-with-data-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-35",
    "title": "Digital Forensics Examiner",
    "provider": "Alison",
    "url": "https://alison.com/course/digital-forensics-examiner",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ أمن المعلومات وحماية الأنظمة أو التحقيق الرقمي، وطرق فهم المخاطر والتعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-36",
    "title": "Diploma in Advanced Python for Data Analysis",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-advanced-python-for-data-analysis",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدّم تدريبًا على استخدام لغة Python في البرمجة أو تحليل البيانات، من المفاهيم الأساسية إلى تطبيقات عملية بحسب مستوى الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-37",
    "title": "Diploma in Computer Networking Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-computer-networking-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح أساسيات شبكات الحاسوب وبروتوكولات الاتصال والبنية التحتية، مع موضوعات مرتبطة بالإدارة والحماية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-38",
    "title": "Diploma in Cyber Security Operations",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-cyber-security-operations",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ أمن المعلومات وحماية الأنظمة أو التحقيق الرقمي، وطرق فهم المخاطر والتعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-39",
    "title": "Diploma in Machine Learning with Python",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-machine-learning-with-python",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-40",
    "title": "Diploma in Models and Trends in Computer Vision",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-models-and-trends-in-computer-vision",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدّم مدخلًا إلى الحوسبة والبرمجة والأدوات الرقمية، وتشرح المهارات الأساسية المرتبطة بموضوع الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-41",
    "title": "Diploma in Programming using C Sharp",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-programming-using-c-sharp",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-42",
    "title": "Diploma in using Python for Data Science",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-using-python-for-data-science",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-43",
    "title": "Fundamentals of Computers and Code in iOS",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-computers-and-code-in-ios",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدّم مدخلًا إلى الحوسبة والبرمجة والأدوات الرقمية، وتشرح المهارات الأساسية المرتبطة بموضوع الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-44",
    "title": "Fundamentals of Human Computer Information Retrieval Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-human-computer-information-retrieval-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "دورة تمهيدية تشرح المفاهيم الأساسية والموضوعات العملية المرتبطة بعنوانها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-45",
    "title": "Generative AI and Large Language Models for Beginners",
    "provider": "Alison",
    "url": "https://alison.com/course/generative-ai-and-large-language-models-for-beginners",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بالمفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته، أو تعلم الآلة والنماذج التوليدية بحسب المجال المحدد في عنوان الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-46",
    "title": "Introduction to Data Science Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-data-science-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-47",
    "title": "Introduction to Data Structures",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-data-structures",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح هياكل البيانات وطرق تنظيم المعلومات داخل البرامج، وأهميتها في كتابة خوارزميات فعّالة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-48",
    "title": "Introduction to HTML and CSS",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-html-and-css",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح أساسيات بناء صفحات الويب باستخدام HTML لتنظيم المحتوى وCSS لتنسيق المظهر.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-49",
    "title": "Introduction to SAP",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-sap",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بمبادئ الإدارة وتحسين العمليات أو تنظيم العمل واتخاذ القرارات في بيئة مهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-50",
    "title": "Learn English Computer Functions and Comparing Adjectives to Adverbs",
    "provider": "Alison",
    "url": "https://alison.com/course/learn-english-computer-functions-and-comparing-adjectives-to-adverbs",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "دورة تمهيدية تشرح المفاهيم الأساسية والموضوعات العملية المرتبطة بعنوانها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-51",
    "title": "Mastering Maven Java Build Tool",
    "provider": "Alison",
    "url": "https://alison.com/course/mastering-maven-java-build-tool",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بلغة البرمجة أو أداة التطوير المذكورة في العنوان، ومفاهيم بناء البرامج وكتابة الشيفرات وتنظيم المشاريع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-52",
    "title": "Math for Data Science",
    "provider": "Alison",
    "url": "https://alison.com/course/math-for-data-science",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-53",
    "title": "Microsoft Access Masterclass",
    "provider": "Alison",
    "url": "https://alison.com/course/microsoft-access-masterclass",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بإنشاء قواعد البيانات وإدارتها باستخدام Microsoft Access وتنظيم الجداول والاستعلامات.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-54",
    "title": "Network Server Security Protecting the Server and Client Computers Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/network-server-security-protecting-the-server-and-client-computers-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح أساسيات شبكات الحاسوب وبروتوكولات الاتصال والبنية التحتية، مع موضوعات مرتبطة بالإدارة والحماية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-55",
    "title": "Operating Systems Introduction to Memory Management Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/operating-systems-introduction-to-memory-management-revised",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح أساسيات أنظمة التشغيل، مع التركيز على إدارة الذاكرة وآلية تعامل النظام مع الموارد.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-56",
    "title": "Python for Data Science from the Basics to Advanced",
    "provider": "Alison",
    "url": "https://alison.com/course/python-for-data-science-from-the-basics-to-advanced",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-57",
    "title": "R Programming for Data Science",
    "provider": "Alison",
    "url": "https://alison.com/course/r-programming-for-data-science",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول تحليل البيانات وتجهيزها واستكشافها، واستخدام الأدوات أو النماذج الإحصائية لاستخلاص الأنماط والنتائج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-58",
    "title": "REBT the Science of Re Programming Your Mind",
    "provider": "Alison",
    "url": "https://alison.com/course/rebt-the-science-of-re-programming-your-mind",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تقدّم مدخلًا إلى الحوسبة والبرمجة والأدوات الرقمية، وتشرح المهارات الأساسية المرتبطة بموضوع الدورة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-59",
    "title": "Sensory Virtual Reality",
    "provider": "Alison",
    "url": "https://alison.com/course/sensory-virtual-reality",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة في المجال الإبداعي أو التقني الوارد في العنوان، وتعرّف بالمفاهيم والأدوات الأساسية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-60",
    "title": "User Information Security Principles 10 Tips for a Secure Practice",
    "provider": "Alison",
    "url": "https://alison.com/course/user-information-security-principles-10-tips-for-a-secure-practice",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ أمن المعلومات وحماية الأنظمة أو التحقيق الرقمي، وطرق فهم المخاطر والتعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-61",
    "title": "VMware Vsphere 4 Licensing Creation and Security",
    "provider": "Alison",
    "url": "https://alison.com/course/vmware-vsphere-4-licensing-creation-and-security",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ أمن المعلومات وحماية الأنظمة أو التحقيق الرقمي، وطرق فهم المخاطر والتعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-62",
    "title": "VMware Vsphere 5 5 Storage Vm Creation and Security",
    "provider": "Alison",
    "url": "https://alison.com/course/vmware-vsphere-5-5-storage-vm-creation-and-security",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتناول مبادئ أمن المعلومات وحماية الأنظمة أو التحقيق الرقمي، وطرق فهم المخاطر والتعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-63",
    "title": "Build Your First Web App with Firebase",
    "provider": "Google",
    "url": "https://firebase.google.com/learn/pathways/firebase-web?hl=ar",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مسار عملي لبناء تطبيق ويب باستخدام Firebase وJavaScript، مع التعرف إلى خدمات Firebase ونشر تطبيق تفاعلي.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-64",
    "title": "Build Real World AI Applications with Gemini and Imagen",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/1076",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تطبيقات عملية في التعرف على الصور ومعالجة اللغة وتوليد الصور باستخدام Gemini وImagen ونشر التطبيقات على منصة Google Cloud.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-65",
    "title": "Prompt Design in Agent Platform",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/976",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تدريب عملي على هندسة الأوامر وتحليل الصور والتقنيات التوليدية متعددة الوسائط ضمن Agent Platform ونماذج Gemini.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-66",
    "title": "Store, Process, and Manage Data on Google Cloud - Console",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/658",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تدريب عملي على تخزين البيانات ومعالجتها باستخدام Cloud Storage وCloud Functions وPub/Sub في Google Cloud.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-67",
    "title": "Get Started with Google Maps Platform - Web",
    "provider": "Google",
    "url": "https://developers.google.com/learn/pathways/get-started-maps",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مسار يشرح تفعيل واجهات Google Maps Platform وإعداد مشروع Google Cloud ومفاتيح API وبناء خرائط ويب تفاعلية.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-68",
    "title": "Introduction to Generative AI",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/536",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة قصيرة تشرح الذكاء الاصطناعي التوليدي واستخداماته والفرق بينه وبين أساليب تعلم الآلة التقليدية.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-69",
    "title": "Introduction to Image Generation",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/541",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تشرح فكرة توليد الصور بالذكاء الاصطناعي، مع مقدمة إلى نماذج الانتشار التي تقف خلف كثير من أدوات إنشاء الصور.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-70",
    "title": "Introduction to Large Language Models",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/539",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة إلى نماذج اللغة الكبيرة واستخداماتها، مع شرح مبادئ تحسين مخرجاتها باستخدام prompt tuning.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-71",
    "title": "Introduction to Responsible AI",
    "provider": "Google",
    "url": "https://www.skills.google/course_templates/554",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعرّف بمفهوم الذكاء الاصطناعي المسؤول وأهميته ومبادئ Google في تطوير أنظمة ذكاء اصطناعي مسؤولة.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-72",
    "title": "Google Calendar",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/google-calendar-199675",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تعلّم إنشاء الأحداث والاجتماعات والمهام في Google Calendar وتعديلها ومشاركتها وتنظيم الجداول.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-73",
    "title": "Google Sheets",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/google-sheets-199679",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة إلى إنشاء جداول البيانات في Google Sheets وتحريرها واستخدام القوالب والعمل التعاوني عبر المتصفح.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-74",
    "title": "Google Sheets - Advanced Topics",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/google-sheets---advanced-topics-199681",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "تتوسع في استخدام Google Sheets، مثل تخصيص السمات والتنسيق الشرطي وبعض أدوات تنظيم البيانات.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-75",
    "title": "CS50's AP® Computer Science Principles",
    "provider": "Harvard University (CS50)",
    "url": "https://www.classcentral.com/course/ap-harvard-university-cs50-s-ap-r-computer-scienc-532554",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة أكاديمية في علوم الحاسوب ومبادئ البرمجة والخوارزميات، مهيأة لطلاب المرحلة الثانوية وفق إطار AP.",
    "howToGet": "التسجيل مجاناً في صفحة مساق CS50 الرسمية بجامعة هارفارد وإنجاز المشاريع المطلوبة للحصول على شهادة CS50 المجانية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-76",
    "title": "CS50's Introduction to Artificial Intelligence with Python",
    "provider": "Harvard University (CS50)",
    "url": "https://cs50.harvard.edu/ai/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مقدمة تطبيقية في الذكاء الاصطناعي باستخدام Python، تشمل البحث والمعرفة والاحتمالات والتحسين والتعلم والشبكات العصبية.",
    "howToGet": "التسجيل مجاناً في صفحة مساق CS50 الرسمية بجامعة هارفارد وإنجاز المشاريع المطلوبة للحصول على شهادة CS50 المجانية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "tech-77",
    "title": "CS50's Web Programming with Python and JavaScript",
    "provider": "Harvard University (CS50)",
    "url": "https://cs50.harvard.edu/web/",
    "category": "دورات التكنولوجيا والذكاء الاصطناعي",
    "summary": "مساق متقدم لتطوير الويب باستخدام HTML وCSS وPython وDjango وSQL وJavaScript، مع اختبار وأمان وتوسّع ومشروع نهائي.",
    "howToGet": "التسجيل مجاناً في صفحة مساق CS50 الرسمية بجامعة هارفارد وإنجاز المشاريع المطلوبة للحصول على شهادة CS50 المجانية.",
    "fields": [
      "علم الحاسوب",
      "الذكاء الاصطناعي",
      "علم البيانات",
      "هندسة البرمجيات",
      "الأمن السيبراني"
    ]
  },
  {
    "id": "science-01",
    "title": "مهارات البحث والتطوير (RD101)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/rd101-vv2/",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تقدم مدخلًا إلى البحث العلمي والتطوير التكنولوجي، وتوضح آليات البحث والتطوير وكيفية الاستفادة منها في تنفيذ المشاريع.",
    "howToGet": "التسجيل المجاني في منصة إدراك وإكمال مساقات التخصص وحل التقييمات بنجاح للحصول على شهادة إتمام التخصص.",
    "fields": [
      "كافة العلوم الأساسية والتطبيقية",
      "الفيزياء",
      "الكيمياء",
      "الرياضيات",
      "البحث والتطوير"
    ]
  },
  {
    "id": "science-03",
    "title": "أساسيات منهجية البحث العلمي (Essentials of Research Methodology)",
    "provider": "Alison",
    "url": "https://alison.com/course/essentials-of-research-methodology",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تشرح أساسيات منهجية البحث العلمي، بما يشمل تحديد مشكلة البحث واختيار العينات وجمع البيانات وتحليلها وإعداد المقترحات والأوراق البحثية.",
    "howToGet": "إكمال فصول الدورة عبر Alison واجتياز الامتحان النهائي بنجاح لإصدار شهادة الإنجاز المعتمدة.",
    "fields": [
      "كافة التخصصات العلمية",
      "العلوم التطبيقية",
      "الإحصاء والبيانات",
      "الدراسات العليا والبحث العلمي"
    ]
  },
  {
    "id": "sci-04",
    "title": "Forensic Science Simplified",
    "provider": "Alison",
    "url": "https://alison.com/course/forensic-science-simplified",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تقدم مدخلًا إلى المفاهيم والمبادئ العلمية الأساسية في المجال المذكور وتطبيقاته.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-05",
    "title": "Introduction to Earth Science",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-earth-science",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تقدم مدخلًا إلى المفاهيم والمبادئ العلمية الأساسية في المجال المذكور وتطبيقاته.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-06",
    "title": "Introduction to Linear Algebra",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-linear-algebra",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تشرح مفاهيم رياضية أساسية وتطبيقاتها في التحليل الكمي وعلوم البيانات.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-07",
    "title": "The Science of Food",
    "provider": "Alison",
    "url": "https://alison.com/course/the-science-of-food",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تقدم مدخلًا إلى علم الأغذية، وخصائص مكوناتها والتغيرات العلمية التي تحدث أثناء المعالجة والحفظ.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-08",
    "title": "Understanding Biological Science",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-biological-science",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تقدم المفاهيم العلمية الأساسية في المجال المذكور، وتعرّف بالمصطلحات والعمليات والتطبيقات العملية ذات الصلة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-09",
    "title": "Biology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=103",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مقدمة في المفاهيم والعمليات البيولوجية الأساسية المناسبة للتحضير للدراسة الصحية والعلمية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-10",
    "title": "Biostatistics",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=241",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مقدمة في الأساليب الإحصائية المستخدمة في الأبحاث الطبية والصحية وتحليل البيانات وتفسير النتائج.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-11",
    "title": "General Chemistry 1",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=289",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مقدمة في المبادئ الأساسية للكيمياء العامة وبنية المادة والتفاعلات.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-12",
    "title": "General Chemistry 2",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=418",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "استكمال لمبادئ الكيمياء العامة والتفاعلات والموضوعات الأساسية المرتبطة بها.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-13",
    "title": "Intro to Algebra & Trigonometry",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=386",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مراجعة لمبادئ الجبر والدوال والمعادلات والمثلثات كأساس للدراسة العلمية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-14",
    "title": "Intro to Statistics",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=417",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مقدمة في الإحصاء وتنظيم البيانات وتحليلها وفهم المقاييس والنتائج.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-15",
    "title": "Organic Chemistry 1",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=363",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "مقدمة في الكيمياء العضوية ومركبات الكربون وبنيتها وتفاعلاتها الأساسية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-16",
    "title": "Organic Chemistry 2",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=420",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "استكمال لمبادئ الكيمياء العضوية ومفاهيمها وتطبيقاتها في العلوم الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "sci-17",
    "title": "Physics",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=432",
    "category": "دورات العلوم الاساسية والتطبيقية",
    "summary": "تغطي مبادئ الفيزياء مثل قوانين نيوتن والطاقة والموجات والسوائل والكهرباء والضوء والمغناطيسية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الفيزياء",
      "الكيمياء",
      "العلوم الحياتية",
      "الرياضيات والإحصاء"
    ]
  },
  {
    "id": "biz-01",
    "title": "منهجية البحث لنجاح الأعمال (Research Methodology for Business Success)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/course/research-methodology-for-business-success-v1/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "توضح كيفية استخدام مناهج البحث العلمي والتطبيقي في دراسة مشكلات الأعمال وتحليل المعلومات لدعم القرارات الإدارية والاستراتيجية.",
    "howToGet": "التسجيل المجاني عبر منصة إدراك وإتمام متطلبات الدورة والاختبارات لتنزيل شهادة الإتمام فوراً.",
    "fields": [
      "إدارة الأعمال",
      "الاقتصاد",
      "التسويق",
      "العلوم المالية والمصرفية"
    ]
  },
  {
    "id": "biz-02",
    "title": "تخصص كابيتال بنك المالي",
    "provider": "إدراك / كابيتال بنك",
    "url": "https://www.edraak.org/programs/specialization/capitalbank-spec-v1/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "يهدف البرنامج إلى تطوير الثقافة المالية والتعرف على المبادئ والمهارات المصرفية الأساسية بالتعاون مع كابيتال بنك.",
    "howToGet": "إكمال كافة مساقات التخصص المصرفي والتقييمات بنجاح للحصول على شهادة التخصص المعتمدة مجاناً.",
    "fields": [
      "العلوم المالية والمصرفية",
      "المحاسبة",
      "إدارة الأعمال",
      "الاقتصاد والمال"
    ]
  },
  {
    "id": "biz-03",
    "title": "خطة العمل والتخطيط المالي (BP)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/bp-vv2/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية إعداد خطة عمل للمشروع وبناء نماذج مالية تساعد على تقدير التكاليف والإيرادات والتخطيط للنمو.",
    "howToGet": "التسجيل في منصة إدراك وإتمام مساقات بناء خطط العمل والمشاريع وتنزيل الشهادة.",
    "fields": [
      "ريادة الأعمال",
      "إدارة الأعمال",
      "العلوم المالية والمصرفية",
      "دراسات الجدوى"
    ]
  },
  {
    "id": "biz-04",
    "title": "إدارة المشاريع (PM)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/pm-v1/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم المفاهيم والأدوات الأساسية لإدارة المشاريع، بدءًا من التخطيط وتحديد الموارد وحتى التنفيذ والمتابعة والتسليم.",
    "howToGet": "إكمال وحدات إدارة المشاريع والمهام التفاعلية للحصول على شهادة إتمام التخصص المعتمدة.",
    "fields": [
      "إدارة الأعمال",
      "الإدارة العامة",
      "إدارة المشاريع",
      "الهندسة الصناعية"
    ]
  },
  {
    "id": "biz-05",
    "title": "تجربة العملاء (CX) لنجاح الأعمال",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/392-%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9-%D8%A7%D9%84%D8%B9%D9%85%D9%84%D8%A7%D8%A1-%28cx%29-%D9%84%D9%86%D8%AC%D8%A7%D8%AD-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية تحسين رحلة العميل وتطوير تجربته مع المؤسسة لتعزيز رضاه وولائه وزيادة فرص نمو الأعمال.",
    "howToGet": "التسجيل المجاني في HP LIFE ومتابعة الوحدات وحل الاختبارات لإصدار شهادة إنجاز معتمدة.",
    "fields": [
      "التسويق",
      "إدارة الأعمال",
      "خدمة العملاء",
      "التجارة الإلكترونية"
    ]
  },
  {
    "id": "biz-06",
    "title": "إدارة مشاريع Agile",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/381-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9-agile",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرف المتعلم بمنهجية أجايل المرنة لإدارة المشاريع، وتوضح كيفية تقسيم العمل إلى مراحل قصيرة والتكيف مع التغييرات وتحسين الإنتاجية.",
    "howToGet": "إكمال المساق عبر منصة HP LIFE وإصدار الشهادة الرقمية فوراً.",
    "fields": [
      "إدارة الأعمال",
      "إدارة المشاريع",
      "نظم المعلومات الإدارية",
      "تطوير المنتجات"
    ]
  },
  {
    "id": "biz-07",
    "title": "مقدمة إلى مهارات الأعمال الرقمية",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/352-%D9%85%D9%82%D8%AF%D9%85%D8%A9-%D8%A5%D9%84%D9%89-%D9%85%D9%87%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A%D8%A9",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم أساسيات استخدام التقنيات والأدوات الرقمية لتطوير بيئة العمل وتحسين العمليات وتنمية الأعمال.",
    "howToGet": "التسجيل وإكمال الدروس التفاعلية في منصة HP LIFE لتحميل الشهادة المجانية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "الأعمال والتجارة الإلكترونية"
    ]
  },
  {
    "id": "biz-08",
    "title": "التخطيط الاستراتيجي في عصر الذكاء الاصطناعي",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/451-%D8%A7%D9%84%D8%AA%D8%AE%D8%B7%D9%8A%D8%B7-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D9%81%D9%8A-%D8%B9%D8%B5%D8%B1-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول دمج أدوات الذكاء الاصطناعي في التخطيط الاستراتيجي، وتوظيف التقنيات الحديثة لتحسين الكفاءة ودعم القرارات التجارية.",
    "howToGet": "إكمال الدورة التدريبية واجتياز التقييم الذاتي على HP LIFE للحصول على الشهادة المعتمدة.",
    "fields": [
      "التخطيط الاستراتيجي",
      "إدارة الأعمال",
      "القيادة التنفيذية",
      "ذكاء الأعمال"
    ]
  },
  {
    "id": "biz-09",
    "title": "الذكاء الاصطناعي للمهنيين في مجال الأعمال",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/424-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A-%D9%84%D9%84%D9%85%D9%87%D9%86%D9%8A%D9%8A%D9%86-%D9%81%D9%8A-%D9%85%D8%AC%D8%A7%D9%84-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرف العاملين وأصحاب الأعمال بتطبيقات الذكاء الاصطناعي التي يمكن استخدامها لتحسين جودة العمل والإنتاجية وتطوير العمليات.",
    "howToGet": "إنهاء المساق التفاعلي على منصة HP LIFE وإصدار الشهادة المجانية مباشرة.",
    "fields": [
      "إدارة الأعمال",
      "المحاسبة والتمويل",
      "التسويق",
      "إدارة العمليات"
    ]
  },
  {
    "id": "biz-10",
    "title": "التطوير المهني والقيادة المهنية",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/careerleadership-v1/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تساعد على تخطيط المسار المهني وتنمية المهارات القيادية اللازمة للتطور الوظيفي وتحمل المسؤوليات المهنية.",
    "howToGet": "التسجيل في إدراك وإكمال محاور التخصص للحصول على شهادة إتمام التخصص المعتمدة.",
    "fields": [
      "الموارد البشرية",
      "إدارة الأعمال",
      "التطوير القيادي",
      "الإدارة العامة"
    ]
  },
  {
    "id": "biz-11",
    "title": "مهارات القيادة والسيطرة",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/leadershipsp-vv2/",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على تنمية مهارات التأثير في الآخرين وإدارة الفرق وتوجيهها نحو تحقيق الأهداف التنظيمية.",
    "howToGet": "إكمال مساقات برنامج القيادة وحل التقييمات عبر منصة إدراك للحصول على الشهادة.",
    "fields": [
      "إدارة الأعمال",
      "الإدارة العامة",
      "القيادة الإدارية",
      "إدارة الفرق"
    ]
  },
  {
    "id": "biz-12",
    "title": "ريادة الأعمال الاجتماعية (Social Entrepreneurship)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/321-%D8%B1%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A9-",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "توضح مفهوم المشروعات الاجتماعية وكيفية تأسيس مشروعات تحقق أثرًا إيجابيًا في المجتمع إلى جانب الاستدامة المالية.",
    "howToGet": "التسجيل في HP LIFE ومتابعة المحتوى وتنزيل شهادة الإتمام المجانية فوراً.",
    "fields": [
      "ريادة الأعمال",
      "إدارة الأعمال",
      "التنمية المستدامة",
      "المسؤولية الاجتماعية"
    ]
  },
  {
    "id": "biz-13",
    "title": "تأسيس مشروع صغير (Starting a Small Business)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/224-%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3-%D9%85%D8%B4%D8%B1%D9%88%D8%B9-%D8%B5%D8%BA%D9%8A%D8%B1",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح الخطوات الأساسية لإنشاء مشروع صغير، ودراسة الفكرة وإعداد خطة العمل اللازمة لبدء النشاط وتطويره.",
    "howToGet": "إكمال فصول الدورة والأنشطة التفاعلية في منصة HP LIFE وإصدار الشهادة.",
    "fields": [
      "ريادة الأعمال",
      "إدارة المشروعات الصغيرة",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-14",
    "title": "التفكير التصميمي (Design Thinking)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/225-%D8%A7%D9%84%D8%AA%D9%81%D9%83%D9%8A%D8%B1-%D8%A7%D9%84%D8%AA%D8%B5%D9%85%D9%8A%D9%85%D9%8A",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم منهجية لفهم احتياجات العملاء وتحديد المشكلات وتطوير الأفكار واختبار الحلول المناسبة.",
    "howToGet": "إكمال الدورة التفاعلية عبر منصة HP LIFE وتنزيل شهادة الإنجاز.",
    "fields": [
      "إدارة الابتكار",
      "ريادة الأعمال",
      "التسويق وتطوير المنتجات"
    ]
  },
  {
    "id": "biz-15",
    "title": "محركات النمو (Growth Engines)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/221-%D9%85%D8%AD%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D9%86%D9%85%D9%88",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول أساليب توسيع الأعمال وتنفيذ استراتيجيات النمو وتحويل المهتمين بالمنتجات أو الخدمات إلى عملاء.",
    "howToGet": "إنهاء وحدات المساق واختبار المعرفة على HP LIFE للحصول على الشهادة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق والمبيعات",
      "استراتيجيات النمو التجاري"
    ]
  },
  {
    "id": "biz-16",
    "title": "إدارة المخزون (Inventory Management)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/216-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%AE%D8%B2%D9%88%D9%86",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية تتبع المخزون وإدارته وتقليل الهدر والتلف، بما يساعد على تحسين كفاءة العمليات وربحية المشروع.",
    "howToGet": "التسجيل في HP LIFE وإكمال التدريب العملي على إدارة المخزون لتنزيل الشهادة.",
    "fields": [
      "سلاسل التوريد واللوجستيات",
      "إدارة العمليات",
      "المحاسبة"
    ]
  },
  {
    "id": "biz-17",
    "title": "الأرباح والخسائر (Profit and Loss)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/200-%D8%A7%D9%84%D8%A3%D8%B1%D8%A8%D8%A7%D8%AD-%D9%88%D8%A7%D9%84%D8%AE%D8%B3%D8%A7%D8%A6%D8%B1",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية فهم قائمة الأرباح والخسائر وقراءة الإيرادات والمصروفات لتقييم الأداء المالي للمشروع.",
    "howToGet": "إكمال مساق القوائم المالية والأرباح والخسائر وتنزيل شهادة إنجاز معتمدة مجاناً.",
    "fields": [
      "المحاسبة",
      "العلوم المالية والمصرفية",
      "التحليل المالي"
    ]
  },
  {
    "id": "biz-18",
    "title": "أساسيات التمويل (Finance Essentials)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/201-%D8%A3%D8%B3%D8%A7%D8%B3%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D9%85%D9%88%D9%8A%D9%84",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول المبادئ المالية الأساسية، وإدارة التكاليف والمصروفات، وفهم نقطة التعادل التي تساعد على تحديد متى يغطي المشروع تكاليفه.",
    "howToGet": "التسجيل في HP LIFE وإتمام وحدات التحليل المالي ونقطة التعادل للحصول على الشهادة.",
    "fields": [
      "العلوم المالية والمصرفية",
      "المحاسبة",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-19",
    "title": "التدفق النقدي (Cash Flow)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/198-%D8%A7%D9%84%D8%AA%D8%AF%D9%81%D9%82-%D8%A7%D9%84%D9%86%D9%82%D8%AF%D9%8A",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "توضح كيفية متابعة الأموال الداخلة والخارجة وإدارة السيولة النقدية لضمان القدرة على تغطية الالتزامات واستمرار النشاط.",
    "howToGet": "إنهاء محاور إدارة السيولة والتدفق النقدي وتنزيل شهادة HP LIFE المجانية.",
    "fields": [
      "المحاسبة",
      "العلوم المالية والمصرفية",
      "إدارة الخزينة"
    ]
  },
  {
    "id": "biz-20",
    "title": "البحث عن التمويل (Finding Funding)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/199-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB-%D8%B9%D9%86-%D8%A7%D9%84%D8%AA%D9%85%D9%88%D9%8A%D9%84",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تستعرض مصادر التمويل المتاحة للمشروعات وكيفية اختيار المصدر المناسب للاحتياجات المالية والتعرف على إجراءات التقديم.",
    "howToGet": "إكمال الدورة التفاعلية عبر منصة HP LIFE وإصدار الشهادة الرقمية.",
    "fields": [
      "ريادة الأعمال",
      "التمويل والاستثمار",
      "المصارف والمؤسسات التمويلية"
    ]
  },
  {
    "id": "biz-21",
    "title": "توقع المبيعات (Sales Forecasting)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/197-%D8%AA%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%85%D8%A8%D9%8A%D8%B9%D8%A7%D8%AA",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية جمع البيانات المتعلقة بالمبيعات وتحليلها لتقدير المبيعات المستقبلية وإعداد الخطط المالية والتجارية.",
    "howToGet": "إتمام وحدات الدورة بنجاح في HP LIFE لتنزيل شهادة الإتمام المعتمدة.",
    "fields": [
      "التسويق والمبيعات",
      "تحليلات الأعمال",
      "التخطيط المالي"
    ]
  },
  {
    "id": "biz-22",
    "title": "البيع عبر الإنترنت (Selling Online)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/205-%D8%A7%D9%84%D8%A8%D9%8A%D8%B9-%D8%B9%D8%A8%D8%B1-%D8%A7%D9%84%D8%A5%D9%86%D8%AA%D8%B1%D9%86%D8%AA",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم أساسيات التجارة الإلكترونية وعرض المنتجات والخدمات وبيعها عبر الإنترنت باستخدام القنوات الرقمية.",
    "howToGet": "التسجيل في HP LIFE ومتابعة إرشادات التجارة الإلكترونية وتنزيل الشهادة.",
    "fields": [
      "التجارة الإلكترونية",
      "التسويق الرقمي",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-23",
    "title": "البداية: ما جمهورك المستهدف؟ (Target Audience)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/206-%D8%A7%D9%84%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9-%D9%85%D8%A7-%D8%AC%D9%85%D9%87%D9%88%D8%B1%D9%83-%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%87%D8%AF%D9%81%D8%9F",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية تحديد الجمهور المستهدف وفهم احتياجات العملاء وسلوكهم لتوجيه جهود التسويق نحو الفئات المناسبة.",
    "howToGet": "إكمال المساق وحل التمارين التفاعلية عبر منصة HP LIFE للحصول على الشهادة.",
    "fields": [
      "التسويق",
      "أبحاث السوق",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-24",
    "title": "مقترح القيمة الفريدة (Unique Value Proposition)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/207-%D9%85%D9%82%D8%AA%D8%B1%D8%AD-%D8%A7%D9%84%D9%82%D9%8A%D9%85%D8%A9-%D8%A7%D9%84%D9%81%D8%B1%D9%8A%D8%AF%D8%A9",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "توضح كيفية تحديد القيمة التي يقدمها المنتج أو المشروع وصياغتها بطريقة تميزه عن المنافسين وتوضح فائدته للعملاء.",
    "howToGet": "إنهاء دروس تحديد الميزة التنافسية وإصدار شهادة HP LIFE مجاناً.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الاستراتيجي",
      "ريادة الأعمال"
    ]
  },
  {
    "id": "biz-25",
    "title": "أساسيات فن البيع (Sales Essentials)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/235-%D8%A3%D8%B3%D8%A7%D8%B3%D9%8A%D8%A7%D8%AA-%D9%81%D9%86-%D8%A7%D9%84%D8%A8%D9%8A%D8%B9",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول المهارات الأساسية للتفاوض والتواصل مع العملاء وفهم احتياجاتهم والمساعدة في تحويل فرص البيع إلى صفقات ناجحة.",
    "howToGet": "التسجيل في HP LIFE وإتمام وحدات فن البيع والتفاوض وتنزيل الشهادة.",
    "fields": [
      "المبيعات",
      "التسويق",
      "إدارة الأعمال",
      "العلاقات العامة"
    ]
  },
  {
    "id": "biz-26",
    "title": "مزايا التسويق مقارنة بالخصائص (Benefits vs Features)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/202-%D9%85%D8%B2%D8%A7%D9%8A%D8%A7-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A9%D9%8B-%D8%A8%D8%A7%D9%84%D8%AE%D8%B5%D8%A7%D8%A6%D8%B5",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تساعد على التمييز بين الخصائص الفنية للمنتج والفوائد التي يحصل عليها العميل، واستخدامها في عرض القيمة التسويقية بوضوح.",
    "howToGet": "إكمال المساق عبر HP LIFE وإصدار الشهادة الرقمية المعتمدة مجاناً.",
    "fields": [
      "التسويق",
      "كتابة الإعلانات والمحتوى",
      "إدارة المنتجات"
    ]
  },
  {
    "id": "biz-27",
    "title": "علاقات العملاء (Customer Relations)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/218-%D8%B9%D9%84%D8%A7%D9%82%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%85%D9%84%D8%A7%D8%A1",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح أساليب بناء علاقات قوية مع العملاء، وتحسين الخدمة، وتعزيز الرضا والاحتفاظ بالعملاء على المدى الطويل.",
    "howToGet": "التسجيل وإكمال الدروس التفاعلية في HP LIFE لتنزيل شهادة الإتمام.",
    "fields": [
      "إدارة علاقات العملاء CRM",
      "التسويق",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-28",
    "title": "مقدمة في إدارة الأعمال (Introduction to Business - BUS101)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus101",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم نظرة شاملة على مبادئ إدارة الأعمال ومجالاتها الأساسية، بما في ذلك الإدارة والتسويق والتمويل.",
    "howToGet": "الدراسة الذاتية عبر Saylor Academy والتقدم للاختبار النهائي المعتمد بنسبة 70% فما فوق للحصول على الشهادة المجانية.",
    "fields": [
      "إدارة الأعمال",
      "كافة تخصصات كلية الأعمال",
      "الإدارة العامة"
    ]
  },
  {
    "id": "biz-29",
    "title": "مقدمة في المحاسبة المالية (Introduction to Financial Accounting - BUS103)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus103",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح أساسيات المحاسبة المالية وإعداد القوائم المالية وقراءتها وتحليل المعلومات المحاسبية للمؤسسات.",
    "howToGet": "إكمال منهج المساق واجتياز الامتحان النهائي بنجاح لتنزيل شهادة معتمدة مجاناً.",
    "fields": [
      "المحاسبة",
      "العلوم المالية والمصرفية",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-30",
    "title": "المحاسبة الإدارية (Managerial Accounting - BUS105)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus105",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول استخدام البيانات المحاسبية في التخطيط الإداري وضبط التكاليف وتقييم الأداء ودعم القرارات داخل المؤسسات.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار النهائي بنسبة 70% فأكثر للحصول على شهادة Saylor Academy.",
    "fields": [
      "المحاسبة",
      "إدارة التكاليف",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-31",
    "title": "إدارة العمليات (Operations Management - BUS107)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus107",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على تصميم العمليات التشغيلية وإدارتها وتحسينها، بما يشمل الإنتاج وتقديم الخدمات وسلاسل التوريد.",
    "howToGet": "التسجيل المجاني وإتمام المنهج واجتياز الامتحان النهائي لإصدار الشهادة.",
    "fields": [
      "إدارة العمليات",
      "إدارة الأعمال",
      "سلاسل التوريد واللوجستيات"
    ]
  },
  {
    "id": "biz-32",
    "title": "مبادئ التسويق (Principles of Marketing - BUS203)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus203",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم أساسيات التسويق وتحديد الأسواق المستهدفة وتصميم المزيج التسويقي، بما يشمل المنتج والسعر والترويج والتوزيع.",
    "howToGet": "إكمال متطلبات الدورة واجتياز الامتحان النهائي في Saylor Academy لتنزيل الشهادة.",
    "fields": [
      "التسويق",
      "التسويق الرقمي",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-33",
    "title": "الاقتصاد الجزئي (Microeconomics - BUS204)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus204",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تدرس سلوك المستهلكين والشركات في الأسواق، وكيف يتحدد العرض والطلب والأسعار وتوزيع الموارد الاقتصادية.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار المعتمد للحصول على شهادة أكاديمية Saylor المجانية.",
    "fields": [
      "الاقتصاد",
      "العلوم المالية والمصرفية",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-34",
    "title": "الاقتصاد الكلي (Macroeconomics - BUS205)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus205",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول المؤشرات الاقتصادية العامة مثل التضخم والبطالة والنمو الاقتصادي، والعوامل المؤثرة في أداء الاقتصاد الوطني.",
    "howToGet": "إنهاء المنهج واجتياز الامتحان النهائي بنسبة 70% للحصول على الشهادة الرسمية.",
    "fields": [
      "الاقتصاد",
      "السياسات المالية والنقدية",
      "العلوم المالية والمصرفية"
    ]
  },
  {
    "id": "biz-35",
    "title": "تمويل الشركات (Corporate Finance - BUS208)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus208",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح أساليب الإدارة المالية للشركات، وتقييم الاستثمارات والأصول، وإعداد الموازنات الرأسمالية وإدارة المخاطر المالية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام الوحدات واجتياز الاختبار النهائي لتنزيل الشهادة.",
    "fields": [
      "العلوم المالية والمصرفية",
      "التمويل والاستثمار",
      "المحاسبة"
    ]
  },
  {
    "id": "biz-36",
    "title": "السلوك التنظيمي (Organizational Behavior - BUS209)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus209",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تدرس سلوك الأفراد والمجموعات داخل المؤسسات، وتأثير القيادة والتحفيز والعلاقات المهنية في الأداء التنظيمي.",
    "howToGet": "إكمال منهج المساق واجتياز الامتحان النهائي لإصدار شهادة إتمام المساق مجاناً.",
    "fields": [
      "الموارد البشرية",
      "إدارة الأعمال",
      "الإدارة العامة"
    ]
  },
  {
    "id": "biz-37",
    "title": "إحصاء الأعمال (Business Statistics - BUS210)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus210",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم الأساليب الإحصائية لجمع بيانات الأعمال وتنظيمها وتحليلها واستخدام النتائج في اتخاذ القرارات.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار النهائي المعتمد بنسبة 70% فما فوق.",
    "fields": [
      "إحصاء الأعمال",
      "تحليلات الأعمال",
      "الاقتصاد",
      "المالية"
    ]
  },
  {
    "id": "biz-38",
    "title": "الإدارة الاستراتيجية للأعمال (Business Strategic Management - BUS300)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus300",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول صياغة الاستراتيجيات طويلة الأمد وتنفيذها وتقييمها لتحقيق الأهداف المؤسسية وبناء ميزة تنافسية.",
    "howToGet": "إكمال متطلبات الدورة واجتياز الاختبار النهائي لتنزيل شهادة إنجاز معتمدة.",
    "fields": [
      "الإدارة الاستراتيجية",
      "إدارة الأعمال",
      "القيادة التنفيذية"
    ]
  },
  {
    "id": "biz-39",
    "title": "إدارة الموارد البشرية (Human Resource Management - BUS301)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus301",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح أساليب استقطاب الموظفين وتدريبهم وتقييم أدائهم وإدارة العلاقات بين العاملين والإدارة.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "إدارة الموارد البشرية HRM",
      "إدارة الأعمال",
      "الإدارة العامة"
    ]
  },
  {
    "id": "biz-40",
    "title": "ريادة الأعمال (Entrepreneurship - BUS303)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus303",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على تحويل الأفكار إلى مشروعات جديدة، وفهم الفرص السوقية، وتأسيس المشروعات الناشئة وتطويرها.",
    "howToGet": "إكمال وحدات الدورة واجتياز التقييم الختامي لإصدار الشهادة المجانية.",
    "fields": [
      "ريادة الأعمال",
      "إدارة الأعمال",
      "الابتكار التجاري"
    ]
  },
  {
    "id": "biz-41",
    "title": "إدارة المشروعات الصغيرة (Small Business Management - BUS305)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus305",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول إدارة الأعمال الصغيرة وتطويرها، بما يشمل التخطيط والتشغيل والتسويق والتعامل مع التحديات المالية والإدارية.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي المعتمد عبر Saylor Academy.",
    "fields": [
      "إدارة الأعمال",
      "المشروعات الصغيرة والمتوسطة",
      "ريادة الأعمال"
    ]
  },
  {
    "id": "biz-42",
    "title": "أخلاقيات الإدارة (Management Ethics - BUS401)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus401",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تدرس المبادئ الأخلاقية في الإدارة والمسؤولية الاجتماعية للشركات، وكيفية التعامل مع المعضلات الأخلاقية في بيئة العمل.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار بنسبة 70% للحصول على الشهادة المعتمدة.",
    "fields": [
      "أخلاقيات الأعمال",
      "الحوكمة المؤسسية",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-43",
    "title": "الأعمال الدولية (International Business - BUS402)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus402",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم مبادئ إدارة الأعمال عبر الحدود، والتجارة الدولية، والاستراتيجيات المستخدمة للعمل في الأسواق العالمية المختلفة.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "الأعمال الدولية",
      "التجارة الدولية",
      "إدارة الأعمال",
      "الاقتصاد الدولي"
    ]
  },
  {
    "id": "biz-44",
    "title": "القيادة واتخاذ القرارات الجماعية (Leadership and Team Decisions - BUS403)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus403",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول القيادة الفعالة وبناء فرق العمل وأساليب اتخاذ القرارات الجماعية وحل المشكلات داخل المؤسسات.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار النهائي لتنزيل شهادة الإنجاز.",
    "fields": [
      "القيادة الإدارية",
      "إدارة الفرق",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-45",
    "title": "الإدارة الاستراتيجية المتقدمة (Strategic Management Advanced - BUS502)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus502",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول موضوعات متقدمة في التفكير الاستراتيجي وتحليل بيئات الأعمال المعقدة واختيار الاستجابات المناسبة للتحديات التنافسية.",
    "howToGet": "الدراسة الذاتية لمستوى الدراسات العليا واجتياز الاختبار النهائي بنجاح للحصول على الشهادة.",
    "fields": [
      "الإدارة الاستراتيجية",
      "الماجستير وإدارة الأعمال MBA",
      "القيادة"
    ]
  },
  {
    "id": "biz-46",
    "title": "المحاسبة الإدارية لاتخاذ القرارات (Managerial Accounting for Decision Making - BUS602)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus602",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على تحليل المعلومات المحاسبية وتكاليف الأعمال واستخدام النتائج في اتخاذ القرارات الإدارية والتنفيذية.",
    "howToGet": "إكمال المنهج واجتياز الامتحان النهائي المعتمد لتنزيل الشهادة المجانية.",
    "fields": [
      "المحاسبة الإدارية",
      "اتخاذ القرارات المالية",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-47",
    "title": "إدارة التسويق (Marketing Management - BUS603)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus603",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول وضع الاستراتيجيات التسويقية وإدارة الحملات والعلامات التجارية وتوجيه الأنشطة التسويقية نحو أهداف المؤسسة.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الاختبار النهائي بنسبة 70%.",
    "fields": [
      "إدارة التسويق",
      "التسويق الرقمي",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-48",
    "title": "الإدارة المالية (Financial Management - BUS604)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus604",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تدرس إدارة الموارد المالية وتحليل الأسواق وهيكل رأس المال واتخاذ القرارات المتعلقة بالتمويل والاستثمار.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي لإصدار شهادة معتمدة من Saylor Academy.",
    "fields": [
      "العلوم المالية والمصرفية",
      "الإدارة المالية",
      "الاستثمار"
    ]
  },
  {
    "id": "biz-49",
    "title": "إدارة العمليات وسلاسل التوريد (Operations & Supply Chain Management - BUS605)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus605",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على إدارة العمليات وتخطيط سلاسل التوريد وتحسين الإنتاج والخدمات وتنسيق حركة المواد والموارد.",
    "howToGet": "إكمال المنهج واجتياز الاختبار النهائي لتنزيل شهادة إنجاز معتمدة.",
    "fields": [
      "سلاسل التوريد",
      "اللوجستيات",
      "إدارة العمليات الإنتاجية"
    ]
  },
  {
    "id": "biz-50",
    "title": "تحليلات الأعمال (Business Analytics - BUS606)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus606",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "توضح كيفية استخدام البيانات والأدوات الكمية لتحليل أداء الأعمال والتنبؤ بالاتجاهات ودعم القرارات الإدارية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام متطلبات تحليلات الأعمال واجتياز الاختبار النهائي.",
    "fields": [
      "تحليلات الأعمال",
      "ذكاء الأعمال",
      "علم البيانات وإدارة الأعمال"
    ]
  },
  {
    "id": "biz-51",
    "title": "السلوك التنظيمي والقيادة (Organizational Behavior and Leadership - BUS607)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus607",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول السلوك التنظيمي والقيادة وإدارة التغيير وفهم ديناميكيات الفرق والمؤسسات.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار النهائي بنجاح للحصول على الشهادة المعتمدة.",
    "fields": [
      "القيادة التنظيمية",
      "الموارد البشرية",
      "إدارة التغيير"
    ]
  },
  {
    "id": "biz-52",
    "title": "الإدارة الاستراتيجية (Strategic Management - BUS608)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus608",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم دراسة تكاملية للإدارة الاستراتيجية تربط بين وظائف المؤسسة المختلفة بهدف تحقيق أهدافها وميزتها التنافسية.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي المعتمد بنسبة 70% فما فوق.",
    "fields": [
      "الإدارة الاستراتيجية",
      "إدارة الأعمال",
      "التخطيط المؤسسي"
    ]
  },
  {
    "id": "biz-53",
    "title": "الأخلاقيات والمسؤولية الاجتماعية للشركات (Ethics and CSR - BUS610)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus610",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول القضايا الأخلاقية في الشركات وممارسات المسؤولية الاجتماعية والاستدامة وعلاقة المؤسسات بالمجتمع.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار لتنزيل شهادة Saylor Academy المجانية.",
    "fields": [
      "أخلاقيات الأعمال",
      "المسؤولية الاجتماعية للشركات CSR",
      "الحوكمة"
    ]
  },
  {
    "id": "biz-54",
    "title": "الإدارة العالمية (Global Management - BUS612)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus612",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على إدارة المؤسسات في بيئات دولية متعددة، والتعامل مع الاختلافات الثقافية والتنظيمية والتحديات العالمية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "الإدارة الدولية",
      "الأعمال العالمية",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-55",
    "title": "الابتكار وريادة الأعمال (Innovation and Entrepreneurship - BUS613)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus613",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح كيفية تطوير الأفكار الابتكارية وإدارة المنتجات والمشروعات الجديدة وتحويل الأفكار إلى فرص تجارية.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار النهائي بنجاح للحصول على الشهادة الرقمية.",
    "fields": [
      "ريادة الأعمال",
      "إدارة الابتكار",
      "تطوير الأعمال"
    ]
  },
  {
    "id": "biz-56",
    "title": "إدارة المشاريع (Project Management - BUS614)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus614",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تغطي أدوات إدارة المشاريع من التخطيط والتنفيذ إلى الإغلاق، مع التركيز على ضبط الميزانية والجدول الزمني والموارد.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي المعتمد عبر Saylor Academy.",
    "fields": [
      "إدارة المشاريع",
      "إدارة الأعمال",
      "إدارة الميزانيات والجدولة"
    ]
  },
  {
    "id": "biz-57",
    "title": "التفاوض وحل النزاعات (Negotiation and Conflict Resolution - BUS615)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus615",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تنمي مهارات التفاوض وإدارة الخلافات المهنية والوصول إلى حلول عملية تراعي مصالح الأطراف المختلفة.",
    "howToGet": "إكمال متطلبات الدورة واجتياز الاختبار النهائي لتنزيل شهادة الإنجاز.",
    "fields": [
      "مهارات التفاوض",
      "إدارة النزاعات",
      "الموارد البشرية",
      "العلاقات المهنية"
    ]
  },
  {
    "id": "biz-58",
    "title": "الإدارة المالية للرعاية الصحية (Healthcare Financial Management - BUS631)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus631",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول المبادئ المالية الخاصة بالمؤسسات الصحية، مثل إدارة الميزانيات والتكاليف والموارد المالية في المستشفيات والمنشآت الطبية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي للحصول على الشهادة المجانية.",
    "fields": [
      "إدارة المستشفيات",
      "التمويل الصحي",
      "اقتصاديات الصحة"
    ]
  },
  {
    "id": "biz-59",
    "title": "أسس التسويق (Foundations of Marketing - BUS640)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus640",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم المفاهيم الأساسية للتسويق، وفهم الأسواق والعملاء والمنتجات والاستراتيجيات المستخدمة في المؤسسات التجارية.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار بنسبة 70% للحصول على شهادة معتمدة مجاناً.",
    "fields": [
      "التسويق",
      "استراتيجيات التسويق",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-60",
    "title": "سلوك المستهلك (Consumer Behavior - BUS641)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus641",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تدرس العوامل النفسية والاجتماعية والثقافية التي تؤثر في قرارات المستهلكين وسلوكهم عند شراء المنتجات والخدمات.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي لإصدار شهادة Saylor Academy.",
    "fields": [
      "سلوك المستهلك",
      "أبحاث التسويق",
      "علم النفس التجاري"
    ]
  },
  {
    "id": "biz-61",
    "title": "استراتيجية التسويق الرقمي (Digital Marketing Strategy - BUS642)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus642",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول تخطيط استراتيجيات التسويق عبر الإنترنت، واستخدام محركات البحث والمنصات الرقمية ووسائل التواصل للوصول إلى العملاء.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار النهائي بنجاح لتنزيل الشهادة.",
    "fields": [
      "التسويق الرقمي",
      "التجارة الإلكترونية",
      "إدارة الحملات الرقمية"
    ]
  },
  {
    "id": "biz-62",
    "title": "إدارة العلامات التجارية (Brand Management - BUS643)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus643",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على بناء الهوية التجارية وتطوير العلامات التجارية وإدارتها بما يعزز تميز المؤسسة وقيمتها في السوق.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "إدارة العلامات التجارية Branding",
      "التسويق",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-63",
    "title": "أسس إدارة سلاسل التوريد (Foundations of Supply Chain Management - BUS650)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus650",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدم أساسيات إدارة حركة المواد والمنتجات والمعلومات من الموردين إلى المؤسسات ثم إلى العملاء.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار النهائي بنسبة 70% للحصول على الشهادة المعتمدة.",
    "fields": [
      "سلاسل التوريد",
      "اللوجستيات",
      "إدارة العمليات"
    ]
  },
  {
    "id": "biz-64",
    "title": "الخدمات اللوجستية والنقل (Logistics and Transportation - BUS651)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus651",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول تنظيم النقل والتوزيع والعمليات اللوجستية لضمان وصول المنتجات إلى وجهاتها بكفاءة وفي الوقت المناسب.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي لتنزيل شهادة إنجاز معتمدة.",
    "fields": [
      "الخدمات اللوجستية",
      "النقل والتوزيع",
      "سلاسل الإمداد"
    ]
  },
  {
    "id": "biz-65",
    "title": "المشتريات والتوريد الاستراتيجي (Procurement & Strategic Sourcing - BUS652)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus652",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح استراتيجيات الشراء واختيار الموردين وتقييمهم والتفاوض معهم لتلبية احتياجات المؤسسات وتحسين كفاءة التوريد.",
    "howToGet": "إكمال متطلبات الدورة واجتياز الاختبار النهائي في Saylor Academy.",
    "fields": [
      "المشتريات والتوريد",
      "إدارة سلاسل الإمداد",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-66",
    "title": "إدارة مخاطر سلاسل التوريد (Supply Chain Risk Management - BUS653)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus653",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركز على تحديد مخاطر سلاسل التوريد وتقييمها ووضع إجراءات للتعامل مع التعطلات والمشكلات التي قد تؤثر في استمرار الإمدادات.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "إدارة المخاطر",
      "سلاسل التوريد",
      "استمرارية الأعمال"
    ]
  },
  {
    "id": "biz-67",
    "title": "سلاسل التوريد المستدامة (Sustainable Supply Chains - BUS654)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus654",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول تطبيق ممارسات الاستدامة البيئية والاجتماعية في سلاسل التوريد، مع مراعاة كفاءة الموارد والمسؤولية في العمليات التجارية.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار بنسبة 70% للحصول على شهادة معتمدة مجاناً.",
    "fields": [
      "الاستدامة وسلاسل التوريد",
      "إدارة العمليات الخضراء",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "biz-68",
    "title": "Digital Skills: Reimagine Your Career",
    "provider": "Accenture / FutureLearn",
    "url": "https://www.futurelearn.com/courses/digital-skills-reimagine-your-career",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح أثر التقنية على سوق العمل، وعقلية النمو وحل المشكلات والذكاء العاطفي وتحديد المهارات وبناء خطة مهنية. تاريخ الإيقاف المعلن على FutureLearn: 5 نوفمبر 2026.",
    "howToGet": "التسجيل المجاني عبر منصة FutureLearn وإتمام خطوات الدورة الأسبوعية للحصول على شهادة الإنجاز الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-69",
    "title": "Behavioral Science Foundations for Product Management",
    "provider": "Alison",
    "url": "https://alison.com/course/behavioral-science-foundations-for-product-management",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف بمبادئ الإدارة وتحسين العمليات أو تنظيم العمل واتخاذ القرارات في بيئة مهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-70",
    "title": "Diploma in Social Media Marketing and Strategy",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-social-media-marketing-and-strategy",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول مبادئ التسويق وإدارة الحملات أو التجارة عبر القنوات الرقمية وبناء الاستراتيجية والوصول إلى الجمهور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-71",
    "title": "Diploma in Social Media Strategy",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-social-media-strategy",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-72",
    "title": "Introduction to Social Media Commerce",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-social-media-commerce",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول مبادئ التسويق وإدارة الحملات أو التجارة عبر القنوات الرقمية وبناء الاستراتيجية والوصول إلى الجمهور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-73",
    "title": "Lean Six Sigma Green Belt Fundamentals",
    "provider": "Alison",
    "url": "https://alison.com/course/lean-six-sigma-green-belt-fundamentals",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف بمبادئ الإدارة وتحسين العمليات أو تنظيم العمل واتخاذ القرارات في بيئة مهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-74",
    "title": "Lean Six Sigma Yellow Belt",
    "provider": "Alison",
    "url": "https://alison.com/course/lean-six-sigma-yellow-belt",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف بمبادئ الإدارة وتحسين العمليات أو تنظيم العمل واتخاذ القرارات في بيئة مهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-75",
    "title": "Management Education Accounting",
    "provider": "Alison",
    "url": "https://alison.com/course/management-education-accounting",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تقدّم مدخلًا إلى المحاسبة الإدارية واستخدام المعلومات المالية في التخطيط واتخاذ القرارات.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-76",
    "title": "Marketing Through the Internet and Social Media",
    "provider": "Alison",
    "url": "https://alison.com/course/marketing-through-the-internet-and-social-media",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول مبادئ التسويق وإدارة الحملات أو التجارة عبر القنوات الرقمية وبناء الاستراتيجية والوصول إلى الجمهور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-77",
    "title": "SAP ERP Logistics Overview",
    "provider": "Alison",
    "url": "https://alison.com/course/sap-erp-logistics-overview",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف بمبادئ الإدارة وتحسين العمليات أو تنظيم العمل واتخاذ القرارات في بيئة مهنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-78",
    "title": "Secretarial Education",
    "provider": "Alison",
    "url": "https://alison.com/course/secretarial-education",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول المهارات الإدارية والمكتبية الأساسية وتنظيم الأعمال والمراسلات والمهام الإدارية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-79",
    "title": "The Complete Social Media Marketing Course",
    "provider": "Alison",
    "url": "https://alison.com/course/the-complete-social-media-marketing-course",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول مبادئ التسويق وإدارة الحملات أو التجارة عبر القنوات الرقمية وبناء الاستراتيجية والوصول إلى الجمهور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-80",
    "title": "AI-Powered Performance Ads Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/skillshop-ai-powered-performance-ads-certification-494099",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف بكيفية استخدام أدوات Google المدعومة بالذكاء الاصطناعي لتحسين أداء الحملات الإعلانية وتحقيق أهدافها.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-81",
    "title": "AI-Powered Shopping Ads Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/skillshop-ai-powered-shopping-ads-certification-494096",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعرّف على حملات Shopping المعتمدة على الذكاء الاصطناعي للترويج للمنتجات وتحسين عرضها وأدائها.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-82",
    "title": "Google Ads Apps Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/skillshop-google-ads-apps-certification-86240",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تعلّم إنشاء حملات إعلانية للتطبيقات على Google Ads، وإدارتها وقياس نتائجها وتحسينها لزيادة التثبيت والتفاعل.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-83",
    "title": "Google Ads Display Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/google-ads-display-certification-98266",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح إنشاء حملات الإعلانات المصوّرة على مواقع الويب والتطبيقات، واستهداف الجمهور وقياس الأداء.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-84",
    "title": "Google Ads Search Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/google-ads-search-certification-98564",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تتناول إعلانات البحث، واختيار الكلمات المفتاحية، وإعداد الحملات وتحسينها وقياس نتائجها.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-85",
    "title": "Google Ads Video Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/skillshop-google-ads-video-certification-86242",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح تخطيط حملات إعلانات الفيديو وإدارتها وقياس أدائها، بما في ذلك إعلانات YouTube.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-86",
    "title": "Grow Offline Sales Certification",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/skillshop-grow-offline-sales-certification-494098",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تركّز على استخدام إعلانات Google لدعم المبيعات داخل المتاجر وقياس أثر الحملات على الزيارات والمشتريات.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "biz-87",
    "title": "Health Economics",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=452",
    "category": "الدورات الادارية والاقتصادية والمالية",
    "summary": "تشرح المبادئ الاقتصادية المرتبطة بالقطاع الصحي، وتخصيص الموارد وتكلفة الخدمات والسياسات الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "إدارة الأعمال",
      "التسويق الرقمي",
      "المحاسبة",
      "الاقتصاد والعلوم المالية"
    ]
  },
  {
    "id": "law-01",
    "title": "فهم القانون الإنجليزي (Understanding the English Law)",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-the-english-law",
    "category": "دورات الحقوق والقانون",
    "summary": "تقدم مقدمة عن مبادئ القانون الإنجليزي ومصادره، وسيادة القانون واستقلال القضاء، مع التعرف على أساسيات القانون الجنائي والعقود والعمل والملكية.",
    "howToGet": "التسجيل في منصة Alison وإكمال الفصول واجتياز التقييم بنسبة 80% للحصول على الشهادة الرقمية.",
    "fields": [
      "الحقوق (القانون)",
      "القانون المقارن",
      "الأنظمة القضائية"
    ]
  },
  {
    "id": "law-02",
    "title": "العدالة العالمية وحقوق الإنسان: إطار شامل (Global Justice and Human Rights)",
    "provider": "Alison",
    "url": "https://alison.com/course/global-justice-and-human-rights-a-comprehensive-framework",
    "category": "دورات الحقوق والقانون",
    "summary": "تستعرض مبادئ العدالة الدولية وحقوق الإنسان، والاتفاقيات والمعايير الدولية، والمؤسسات والآليات المعنية بحماية الحقوق وتطبيق العدالة.",
    "howToGet": "التسجيل المجاني عبر Alison وإتمام وحدات العدالة الدولية والامتحان النهائي.",
    "fields": [
      "القانون الدولي العام",
      "حقوق الإنسان",
      "العلوم السياسية والعلاقات الدولية"
    ]
  },
  {
    "id": "law-03",
    "title": "المساواة والتنوع وحقوق الإنسان (Equality, Diversity and Human Rights)",
    "provider": "Alison",
    "url": "https://alison.com/course/equality-diversity-and-human-rights",
    "category": "دورات الحقوق والقانون",
    "summary": "تتناول مبادئ المساواة والتنوع وحقوق الإنسان، والتعرف على التمييز والتحيز وطرق تعزيز المعاملة العادلة في المجتمع وبيئة العمل.",
    "howToGet": "إنهاء المنهج واجتياز التقييم الختامي لتنزيل شهادة إنجاز معتمدة مجاناً.",
    "fields": [
      "حقوق الإنسان",
      "قانون العمل",
      "العلوم الاجتماعية",
      "الحقوق"
    ]
  },
  {
    "id": "law-04",
    "title": "أساسيات تدريب المساعدين القانونيين (Basics of Paralegal Training UK)",
    "provider": "Alison",
    "url": "https://alison.com/course/basics-of-paralegal-training",
    "category": "دورات الحقوق والقانون",
    "summary": "تعرف المتعلم بمهام المساعد القانوني، والمهارات الإدارية والبحثية اللازمة للعمل في المكاتب القانونية، والمصطلحات والإجراءات القانونية الأساسية.",
    "howToGet": "التسجيل في Alison وإكمال التدريب العملي للمساعد القانوني واجتياز الاختبار بنجاح.",
    "fields": [
      "المساعد القانوني Paralegal",
      "المحاماة وإدارة المكاتب القانونية",
      "الحقوق"
    ]
  },
  {
    "id": "law-05",
    "title": "الدبلوم المتقدم في حقوق الملكية الفكرية وقانون المنافسة (Advanced Diploma in IPR)",
    "provider": "Alison",
    "url": "https://alison.com/course/advanced-diploma-in-intellectual-property-rights-and-competition-law",
    "category": "دورات الحقوق والقانون",
    "summary": "تتناول حقوق الملكية الفكرية، مثل العلامات التجارية وبراءات الاختراع وحقوق النشر، إلى جانب قواعد المنافسة ومنع الاحتكار والممارسات التجارية المقيدة.",
    "howToGet": "إكمال فصول الدبلوم والتقييم النهائي بنسبة 80% للحصول على شهادة دبلوم معتمدة رقمياً.",
    "fields": [
      "الملكية الفكرية",
      "قانون المنافسة ومنع الاحتكار",
      "القانون التجاري"
    ]
  },
  {
    "id": "law-06",
    "title": "مقدمة في حقوق الملكية الفكرية وقانون المنافسة (Introduction to IPR)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-intellectual-property-rights-and-competition-law",
    "category": "دورات الحقوق والقانون",
    "summary": "تقدم مدخلًا إلى أنواع الملكية الفكرية وأساليب حمايتها، مع شرح المبادئ الأساسية لقانون المنافسة والتكتلات التجارية ومكافحة الاحتكار.",
    "howToGet": "التسجيل المجاني ومتابعة المحاضرات واجتياز التقييم عبر منصة Alison.",
    "fields": [
      "الحقوق",
      "الملكية الفكرية",
      "القانون التجاري"
    ]
  },
  {
    "id": "law-07",
    "title": "قانون الأعمال (Business Law - BUS200)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus200",
    "category": "دورات الحقوق والقانون",
    "summary": "تقدم نظرة عامة على البيئة القانونية للأعمال، بما يشمل العقود والمسؤولية القانونية والتشريعات التي تنظم الأنشطة التجارية.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار النهائي بنسبة 70% للحصول على شهادة Saylor Academy المجانية.",
    "fields": [
      "القانون التجاري",
      "قانون الشركات",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "law-08",
    "title": "قانون الأعمال — المستوى المتقدم (Business Law Advanced - BUS501)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus501",
    "category": "دورات الحقوق والقانون",
    "summary": "تتناول موضوعات متقدمة في القانون التجاري، مثل النزاعات التجارية والمسؤوليات القانونية للشركات واللوائح المنظمة للأعمال.",
    "howToGet": "إنهاء المنهج المتقدم واجتياز الامتحان النهائي المعتمد لإصدار الشهادة.",
    "fields": [
      "القانون التجاري المتقدم",
      "قانون الشركات والنزاعات",
      "الماجستير والدراسات القانونية"
    ]
  },
  {
    "id": "law-09",
    "title": "السياسات الصحية والقانون (Healthcare Policy and Law - BUS633)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus633",
    "category": "دورات الحقوق والقانون",
    "summary": "تدرس السياسات الصحية والأطر القانونية والتشريعات التي تنظم قطاع الرعاية الصحية والمؤسسات والخدمات الطبية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الاختبار النهائي بنجاح.",
    "fields": [
      "القانون الطبي والصحي",
      "إدارة المستشفيات",
      "الحقوق"
    ]
  },
  {
    "id": "law-10",
    "title": "البيئة القانونية للأعمال (Legal Environment of Business - BUS611)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/bus611",
    "category": "دورات الحقوق والقانون",
    "summary": "تستعرض القواعد التنظيمية والقانونية والسياسات العامة المؤثرة في المؤسسات التجارية وقرارات الإدارة وممارسة الأعمال.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي المعتمد لتنزيل شهادة إنجاز معتمدة.",
    "fields": [
      "القانون التجاري",
      "الحوكمة والامتثال القانوني",
      "إدارة الأعمال"
    ]
  },
  {
    "id": "law-11",
    "title": "Comprehensive Child Protection Training Course",
    "provider": "Alison",
    "url": "https://alison.com/course/comprehensive-child-protection-training-course",
    "category": "دورات الحقوق والقانون",
    "summary": "تشرح مبادئ حماية الطفل والتعرف إلى مؤشرات الخطر والوقاية والإبلاغ وواجبات الجهات المعنية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الحقوق والقانون",
      "حقوق الإنسان",
      "الامتثال القانوني والحوكمة"
    ]
  },
  {
    "id": "law-12",
    "title": "Discussing Diversity Equity and Inclusion in the Workplace",
    "provider": "Alison",
    "url": "https://alison.com/course/discussing-diversity-equity-and-inclusion-in-the-workplace",
    "category": "دورات الحقوق والقانون",
    "summary": "تتناول مفاهيم التنوع والإنصاف والشمول في بيئة العمل، وطرق تعزيز المعاملة العادلة والاحترام.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الحقوق والقانون",
      "حقوق الإنسان",
      "الامتثال القانوني والحوكمة"
    ]
  },
  {
    "id": "health-08",
    "title": "الامتثال لقانون HIPAA وحماية المعلومات الصحية (HIPAA Compliance)",
    "provider": "Alison",
    "url": "https://alison.com/course/hipaa-compliance-a-complete-guide",
    "category": "دورات الحقوق والقانون",
    "summary": "تشرح مبادئ الخصوصية وسرية المعلومات الصحية وحماية بيانات المرضى وفق قانون HIPAA الأمريكي.",
    "howToGet": "إكمال مساق حماية وسرية السجلات الطبية الإلكترونية والتقييم النهائي عبر Alison.",
    "fields": [
      "المعلوماتية الصحية",
      "إدارة المستشفيات",
      "الطب البشري",
      "السجلات الطبية"
    ]
  },
  {
    "id": "law-14",
    "title": "Safeguarding Vulnerable Adults",
    "provider": "Alison",
    "url": "https://alison.com/course/safeguarding-vulnerable-adults",
    "category": "دورات الحقوق والقانون",
    "summary": "تشرح مبادئ حماية البالغين المعرّضين للخطر، والتعرف إلى مؤشرات الإساءة والإهمال وطرق الإبلاغ والحماية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الحقوق والقانون",
      "حقوق الإنسان",
      "الامتثال القانوني والحوكمة"
    ]
  },
  {
    "id": "law-15",
    "title": "Women Media Environment and Girls Rights Worldwide",
    "provider": "Alison",
    "url": "https://alison.com/course/women-media-environment-and-girls-rights-worldwide",
    "category": "دورات الحقوق والقانون",
    "summary": "تستعرض قضايا حقوق المرأة والفتيات عالميًا وعلاقتها بالإعلام والبيئة والمشاركة المجتمعية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الحقوق والقانون",
      "حقوق الإنسان",
      "الامتثال القانوني والحوكمة"
    ]
  },
  {
    "id": "law-16",
    "title": "Dismantling Structural Racism to Advance Health Equity",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=399",
    "category": "دورات الحقوق والقانون",
    "summary": "يناقش الإنصاف الصحي والمحددات الاجتماعية للصحة وتأثير السياسات التمييزية في فرص الرعاية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "الحقوق والقانون",
      "حقوق الإنسان",
      "الامتثال القانوني والحوكمة"
    ]
  },
  {
    "id": "human-01",
    "title": "اللغة الإنجليزية للمبتدئين (ESL001: Elementary English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl001",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على المستوى الأساسي في الإنجليزية، وتشمل أقسام الكلام والقواعد وبناء الجمل وتطوير القراءة والمفردات والكتابة عن الحياة اليومية.",
    "howToGet": "الدراسة الذاتية عبر Saylor Academy والتقدم للاختبار النهائي المعتمد بنسبة 70% للحصول على الشهادة المجانية.",
    "fields": [
      "اللغة الإنجليزية وآدابها",
      "الترجمة",
      "كافة التخصصات الجامعية"
    ]
  },
  {
    "id": "human-02",
    "title": "اللغة الإنجليزية للمستوى المتوسط (ESL002: Intermediate English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl002",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تساعد على تطوير القراءة والكتابة والمفردات، وفهم الأزمنة، واستخدام استراتيجيات القراءة المختلفة وكتابة فقرات عن التجارب الشخصية.",
    "howToGet": "إكمال منهج المساق واجتياز الامتحان النهائي بنجاح لتنزيل شهادة إنجاز معتمدة مجاناً.",
    "fields": [
      "اللغة الإنجليزية وآدابها",
      "الترجمة",
      "اللغات الحديثة"
    ]
  },
  {
    "id": "human-03",
    "title": "اللغة الإنجليزية فوق المتوسط (ESL003: Upper-Intermediate English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl003",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على تطوير القواعد والمفردات المتقدمة، وفهم النصوص، والتفكير النقدي والتعبير عن الرأي والتمهيد لكتابة المقالات.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الاختبار النهائي بنسبة 70% فما فوق.",
    "fields": [
      "اللغة الإنجليزية",
      "الترجمة الفورية والتحريرية",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "human-04",
    "title": "اللغة الإنجليزية المتقدمة (ESL004: Advanced English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl004",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تتناول القواعد المتقدمة وعلامات الترقيم والكتابة الأكاديمية، وتطوير القدرة على تقييم المصادر وتنظيم النصوص وتقديم الأفكار بوضوح.",
    "howToGet": "إنهاء المنهج المتقدم واجتياز التقييم الختامي لإصدار شهادة معتمدة من Saylor Academy.",
    "fields": [
      "الكتابة الأكاديمية",
      "اللغة الإنجليزية وآدابها",
      "اللسانيات"
    ]
  },
  {
    "id": "human-05",
    "title": "الإنجليزية المتخصصة في الأعمال (ESL005: Business-Proficient English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl005",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على استخدام الإنجليزية في بيئة الأعمال، بما يشمل كتابة رسائل البريد الإلكتروني والتقارير والمذكرات المهنية بأسلوب واضح ورسمي.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي بنسبة 70% لتنزيل الشهادة المعتمدة.",
    "fields": [
      "الإنجليزية للأعمال",
      "الترجمة",
      "إدارة الأعمال والاتصال"
    ]
  },
  {
    "id": "human-06",
    "title": "الإنجليزية في مجال الرعاية الصحية (ESL006: English in Healthcare)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/esl006",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تطور المفردات الإنجليزية المرتبطة بالرعاية الصحية وأعضاء الجسم والتواصل مع المرضى والزملاء وفهم المصطلحات والموضوعات الصحية الأساسية.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار النهائي عبر Saylor Academy.",
    "fields": [
      "المصطلحات الطبية",
      "اللغة الإنجليزية",
      "العلوم الطبية والصحية"
    ]
  },
  {
    "id": "human-07",
    "title": "الإنجليزية التحضيرية لما قبل الجامعة (ENGL095: Pre-College English)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/engl095",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تساعد على تطوير الكتابة الأساسية، وبناء الجمل والفقرات المترابطة والواضحة، استعدادًا للدراسة والكتابة الجامعية.",
    "howToGet": "التسجيل المجاني وإتمام مساق الكتابة الأساسية واجتياز التقييم.",
    "fields": [
      "اللغة الإنجليزية",
      "الكتابة التأسيسية",
      "كافة طلبة الجامعة الجدد"
    ]
  },
  {
    "id": "human-08",
    "title": "الكتابة الإنجليزية — المستوى الأول (ENGL101: English Composition I)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/engl101",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على تطوير مهارات الكتابة المنظمة والتفكير النقدي، وفهم العلاقة بين الكاتب والجمهور والهدف من النص.",
    "howToGet": "إنهاء المنهج واجتياز الامتحان النهائي المعتمد بنسبة 70% فما فوق.",
    "fields": [
      "الكتابة الإنجليزية",
      "الأدب الإنجليزي",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "human-09",
    "title": "الكتابة الإنجليزية — المستوى الثاني (ENGL102: English Composition II)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/engl102",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تتناول البحث الأكاديمي وجمع المصادر وتوثيقها وفق أسلوب MLA، وكتابة المقالات الإقناعية والأوراق البحثية.",
    "howToGet": "الدراسة الذاتية واجتياز الاختبار النهائي بنجاح للحصول على الشهادة الرسمية.",
    "fields": [
      "البحث الأكاديمي والتوثيق MLA",
      "اللغة الإنجليزية",
      "الترجمة"
    ]
  },
  {
    "id": "human-10",
    "title": "الكتابة التقنية (ENGL210: Technical Writing)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/engl210",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تعلم كتابة التقارير والمقترحات والتعليمات المهنية، وتقديم المعلومات التقنية بطريقة دقيقة ومنظمة تناسب بيئة العمل.",
    "howToGet": "إكمال فصول الدورة واجتياز الامتحان النهائي لتنزيل شهادة الإنجاز.",
    "fields": [
      "الكتابة التقنية",
      "الترجمة التقنية",
      "التواصل المهني"
    ]
  },
  {
    "id": "human-11",
    "title": "النهضة الأمريكية (ENGL405: The American Renaissance)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/engl405",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تدرس مرحلة مهمة من الأدب الأمريكي خلال القرن التاسع عشر، وأبرز كتابها وأعمالهم والظروف الاجتماعية والسياسية التي أثرت في الحركة الأدبية.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق المتقدم واجتياز الامتحان النهائي.",
    "fields": [
      "الأدب الأمريكي",
      "الأدب المقارن",
      "التاريخ والعلوم الإنسانية"
    ]
  },
  {
    "id": "human-12",
    "title": "مقدمة في التفكير النقدي والمنطق (PHIL102: Critical Thinking & Logic)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/phil102",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تقدم أساسيات التفكير النقدي والمنطق، وتعلم تحليل الحجج وتمييز الاستدلالات السليمة من الضعيفة وتقييم الأدلة.",
    "howToGet": "إنهاء المنهج واجتياز الاختبار بنسبة 70% للحصول على شهادة معتمدة مجاناً.",
    "fields": [
      "الفلسفة",
      "المنطق والتفكير النقدي",
      "كافة العلوم الإنسانية"
    ]
  },
  {
    "id": "human-13",
    "title": "الفلسفة الأخلاقية والسياسية (PHIL103: Moral and Political Philosophy)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/phil103",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تتناول مفاهيم العدالة والحرية والحقوق والأخلاق، وتناقش كيفية تطبيق المبادئ الفلسفية على القضايا الاجتماعية والسياسية.",
    "howToGet": "الدراسة الذاتية واجتياز الامتحان النهائي لإصدار شهادة Saylor Academy.",
    "fields": [
      "الفلسفة",
      "العلوم السياسية",
      "علم الاجتماع"
    ]
  },
  {
    "id": "human-14",
    "title": "الأخلاقيات البيئية والعدالة والرؤى العالمية (PHIL203: Environmental Ethics)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/phil203",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تدرس العلاقة بين الأخلاق والبيئة والعدالة البيئية والاستدامة، وتناقش المسؤوليات الإنسانية تجاه العالم الطبيعي.",
    "howToGet": "إكمال فصول الدورة واجتياز الاختبار النهائي بنجاح لتنزيل الشهادة.",
    "fields": [
      "الأخلاقيات البيئية",
      "الفلسفة",
      "التنمية المستدامة"
    ]
  },
  {
    "id": "human-15",
    "title": "الوجودية (PHIL304: Existentialism)",
    "provider": "Saylor Academy",
    "url": "https://learn.saylor.org/course/phil304",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تستعرض الفلسفة الوجودية وأفكار عدد من أبرز فلاسفتها، وتناقش موضوعات الوجود والحرية والمسؤولية الفردية والمعنى.",
    "howToGet": "التسجيل في Saylor Academy وإتمام المساق واجتياز الامتحان النهائي.",
    "fields": [
      "الفلسفة",
      "الآداب والعلوم الإنسانية",
      "الفكر المعاصر"
    ]
  },
  {
    "id": "human-16",
    "title": "التفكير النقدي في عصر الذكاء الاصطناعي (Critical Thinking in AI Age)",
    "provider": "HP LIFE",
    "url": "https://www.life-global.org/ar/course/440-%D8%A7%D9%84%D8%AA%D9%81%D9%83%D9%8A%D8%B1-%D8%A7%D9%84%D9%86%D9%82%D8%AF%D9%8A-%D9%81%D9%8A-%D8%B9%D8%B5%D8%B1-%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على استخدام التفكير النقدي في تقييم المعلومات والمخرجات التي تنتجها أدوات الذكاء الاصطناعي، وتحسين القدرة على تحليل المشكلات واتخاذ القرارات.",
    "howToGet": "إكمال المساق التفاعلي على HP LIFE وإصدار الشهادة الرقمية المعتمدة فوراً.",
    "fields": [
      "التفكير النقدي",
      "العلوم الإنسانية والتكنولوجيا",
      "الذكاء الاصطناعي"
    ]
  },
  {
    "id": "human-17",
    "title": "مهارات التواصل في العمل (ENG101)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/eng101-vv2/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تهدف إلى تطوير مهارات الإنجليزية الأساسية المستخدمة في بيئة العمل والتواصل المهني اليومي.",
    "howToGet": "التسجيل المجاني في إدراك وإكمال التخصص واجتياز التقييمات لتحميل الشهادة.",
    "fields": [
      "مهارات التواصل بالإنجليزية",
      "اللغة الإنجليزية",
      "التواصل المهني"
    ]
  },
  {
    "id": "human-18",
    "title": "المهارات الناعمة (Soft Skills)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/ss-v1/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تساعد على تطوير مهارات حل المشكلات والتفكير النقدي والعمل الجماعي والتواصل الفعال في البيئة المهنية.",
    "howToGet": "إتمام وحدات البرنامج بنجاح عبر منصة إدراك للحصول على شهادة إتمام التخصص.",
    "fields": [
      "المهارات الناعمة",
      "كافة التخصصات الجامعية",
      "التطوير الذاتي"
    ]
  },
  {
    "id": "human-19",
    "title": "الذكاء العاطفي (EI)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/ei-vv2/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تتناول فهم المشاعر والتعرف عليها وإدارتها، وتحسين العلاقات الشخصية والمهنية والتعامل مع المواقف المختلفة بوعي أكبر.",
    "howToGet": "متابعة المساق واجتياز الاختبار النهائي عبر إدراك لإصدار الشهادة.",
    "fields": [
      "علم النفس",
      "الإرشاد النفسي",
      "الذكاء العاطفي والتواصل"
    ]
  },
  {
    "id": "human-20",
    "title": "الابتكار والإبداع",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/creativitysp-vv2/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تركز على تنمية التفكير الإبداعي وتوليد الأفكار الجديدة، واستخدام أساليب مبتكرة في معالجة المشكلات والتحديات.",
    "howToGet": "التسجيل وإكمال المساقات التدريبية بنجاح عبر منصة إدراك.",
    "fields": [
      "التفكير الإبداعي",
      "الآداب والفنون",
      "حل المشكلات"
    ]
  },
  {
    "id": "human-21",
    "title": "مهارات النجاح والشغف",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/successsp-vv2/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تساعد على تحديد الأهداف وتحفيز الذات وتطوير العادات والعقلية التي تدعم النجاح الشخصي والمهني.",
    "howToGet": "إكمال فصول الدورة عبر إدراك وحل التقييمات لتنزيل شهادة إتمام المساق.",
    "fields": [
      "التطوير الشخصي",
      "العلوم الإنسانية",
      "علم النفس الإيجابي"
    ]
  },
  {
    "id": "human-22",
    "title": "التدريب الذاتي والمهني (TDH)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/tdh-0-v1/",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تعزز القدرة على التعلم المستقل والمستمر وإدارة الذات وتطوير المهارات الشخصية والمهنية على المدى الطويل.",
    "howToGet": "إنهاء المنهج واجتياز التقييمات بنجاح للحصول على شهادة إتمام البرنامج.",
    "fields": [
      "التطوير المهني والذاتي",
      "التعلم المستمر",
      "كافة الطلبة"
    ]
  },
  {
    "id": "human-23",
    "title": "تاريخ الثورة الصناعية في بريطانيا العظمى (Industrial Revolution in Great Britain)",
    "provider": "Alison",
    "url": "https://alison.com/course/the-history-of-the-industrial-revolution-in-great-britain",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تستعرض نشأة الثورة الصناعية في بريطانيا خلال القرن الثامن عشر وتطور التقنيات والصناعات، وأثر محركات البخار وصناعة الحديد والهندسة في التحولات الاقتصادية والاجتماعية.",
    "howToGet": "التسجيل في Alison وإكمال فصول الدورة التاريخية واجتياز التقييم بنسبة 80% للحصول على الشهادة الرقمية.",
    "fields": [
      "التاريخ",
      "العلوم الإنسانية والاجتماعية",
      "تاريخ العلوم والتكنولوجيا"
    ]
  },
  {
    "id": "hum-24",
    "title": "Basic Theory and Concepts of Forensic Psychology",
    "provider": "Alison",
    "url": "https://alison.com/course/basic-theory-and-concepts-of-forensic-psychology",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تشرح المفاهيم الأساسية لعلم النفس الجنائي، ودراسة السلوك وعلاقته بالسياقات القانونية والتحقيقية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-25",
    "title": "Basics of Social Science",
    "provider": "Alison",
    "url": "https://alison.com/course/basics-of-social-science",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تعرّف بالمفاهيم الأساسية في العلوم الاجتماعية والسلوك الإنساني والمجتمع والثقافة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-26",
    "title": "Hands on Behavioral Science Case Studies and Practical Exercises",
    "provider": "Alison",
    "url": "https://alison.com/course/hands-on-behavioral-science-case-studies-and-practical-exercises",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تستعرض مفاهيم السلوك أو المجتمع أو الصحة النفسية والعوامل المؤثرة فيها، مع شرح نظري وأمثلة مرتبطة بالموضوع.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-27",
    "title": "Introduction to Library and Information Science",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-library-and-information-science",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "دورة تمهيدية تشرح المفاهيم الأساسية والموضوعات العملية المرتبطة بعنوانها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-28",
    "title": "Critical and Systems Thinking",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=456",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تطوّر مهارات التفكير النقدي وفهم الأنظمة المعقدة وتحليل المشكلات والعلاقات بين أسبابها ونتائجها.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-29",
    "title": "Intro to Sociology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=431",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "مقدمة في علم الاجتماع ودراسة المجتمع والمؤسسات والعلاقات والسلوك الاجتماعي.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-30",
    "title": "Introduction to Psychology",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=375",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "مقدمة في علم النفس والسلوك والعمليات النفسية الأساسية ضمن مسار العلوم الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "hum-31",
    "title": "Writing for Health Sciences",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=435",
    "category": "دورات الادب واللغات والعلوم الانسانية",
    "summary": "تطوّر مهارات الكتابة الأكاديمية والعلمية والتواصل الكتابي في التخصصات الصحية.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "علم النفس",
      "علم الاجتماع",
      "اللغات والترجمة",
      "العلوم الإنسانية"
    ]
  },
  {
    "id": "sharia-01",
    "title": "مساق القوارير – الجزء الثاني",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/311722",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "مساق توعوي يتناول موضوعات شرعية وتربوية للمرأة المسلمة، ويعزز الوعي بالأحكام والآداب المنظمة لحياتها الأسرية والمجتمعية.",
    "howToGet": "التسجيل في منصة زادي للتعليم الشرعي، دراسة وحدات المساق واجتياز الاختبارات لإصدار شهادة الإتمام المجانية.",
    "fields": [
      "الشريعة والدراسات الإسلامية",
      "الفقه وأصوله",
      "التربية الأسرية"
    ]
  },
  {
    "id": "sharia-02",
    "title": "بدائع المعاني: آيات الصيام تدبر وتحليل",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/315327",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "دراسة معاني آيات الصيام والتدبر القرآني فيها وفهم دلالاتها الإيمانية والتشريعية واستنباط الفوائد التربوية.",
    "howToGet": "التسجيل المجاني في منصة زادي ومتابعة محاضرات التدبر وإتمام متطلبات المساق لنيل شهادة إنجاز مجانية.",
    "fields": [
      "الدراسات القرآنية",
      "التفسير وعلوم القرآن",
      "أصول الدين"
    ]
  },
  {
    "id": "sharia-03",
    "title": "دليل الشباب للزواج الواعي: من النية إلى العقد",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/dalil-shabab-lilzawaj-waei-min-niyah-ila-akid",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يتناول مقاصد الزواج الشرعية، وأحكام الخطبة والرؤية الشرعية، وضوابط اختيار شريك الحياة والتعامل مع المخطوبة برؤية شرعية وتربوية واعية.",
    "howToGet": "إنشاء حساب على منصة زادي، إكمال مشاهدة الدروس والاختبارات للحصول على شهادة إتمام معتمدة مجاناً.",
    "fields": [
      "الفقه وأصوله",
      "الأحوال الشخصية",
      "الإرشاد الأسري"
    ]
  },
  {
    "id": "sharia-04",
    "title": "من العقد إلى الزفاف: فقه العلاقة الزوجية في بدايتها",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/321215",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يشرح شروط عقد الزواج والحقوق المتبادلة بين الزوجين، وآداب العرس والتوجيهات الشرعية لبداية الحياة الزوجية القويمة وتجنب الخلافات.",
    "howToGet": "إكمال متطلبات المساق عبر منصة زادي واجتياز التقييمات لإصدار شهادة الإتمام الإلكترونية مجاناً.",
    "fields": [
      "الفقه الإسلامي",
      "الأحوال الشخصية",
      "التربية الأسرية"
    ]
  },
  {
    "id": "sharia-05",
    "title": "ما لا يسع المسلم جهله – العقيدة",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/291361",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "مساق تأسيسي في العقيدة الإسلامية، يشمل توحيد الله تعالى، وأركان الإيمان الستة، وتفاصيل الإيمان بالقدر وما يجب على كل مسلم اعتقاده.",
    "howToGet": "التسجيل ومتابعة دروس العقيدة واجتياز الاختبار النهائي بنجاح للحصول على شهادة معتمدة من زادي.",
    "fields": [
      "أصول الدين",
      "العقيدة الإسلامية",
      "الدراسات الإسلامية"
    ]
  },
  {
    "id": "sharia-06",
    "title": "أحكام الطهارة والوضوء والغسل",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/294644",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يتناول أحكام الطهارة والوضوء والغسل والتيمم والمسح على الخفين وما يرتبط بها من مسائل وفروع فقهية عملية تلزم كل مسلم ومسلمة.",
    "howToGet": "إتمام دراسة فصول الطهارة والاختبارات التقييمية عبر منصة زادي للحصول على شهادة إتمام مجانية.",
    "fields": [
      "الفقه وأصوله",
      "فقه العبادات",
      "الشريعة الإسلامية"
    ]
  },
  {
    "id": "sharia-07",
    "title": "مساق القوارير – الجزء الأول",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/299001",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يتناول أحكاماً وآداباً شرعية متنوعة تخص المرأة المسلمة، ومنها موضوعات الحجاب، والعبادات، والتعاملات اليومية، والتوجيهات الإيمانية.",
    "howToGet": "التسجيل في مساق القوارير عبر منصة زادي وإكمال كافة الأقسام لاكتساب شهادة إتمام معتمدة مجاناً.",
    "fields": [
      "الشريعة والدراسات الإسلامية",
      "فقه المرأة",
      "التربية الإسلامية"
    ]
  },
  {
    "id": "sharia-08",
    "title": "محبطات الأعمال",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/299123",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يتناول الأمور التي قد تؤثر في الأعمال الصالحة وثوابها من منظور شرعي، وكيفية صيانة الطاعات وحفظ الحسنات من الرياء والذنوب المحبطة للأجر.",
    "howToGet": "إنهاء محاضرات المساق والأنشطة التفاعلية بنجاح على منصة زادي للحصول على شهادة الإنجاز المجانية.",
    "fields": [
      "التزكية والأخلاق",
      "أصول الدين",
      "الدراسات الإسلامية"
    ]
  },
  {
    "id": "sharia-09",
    "title": "عظمة رب العالمين – الجزء الثاني",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/284415",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "مساق إيماني للتأمل في عظمة الله تعالى وأسمائه وصفاته وآياته الكونية، وتعزيز المعرفة الإيمانية واليقين القلبي ومحبة الخالق.",
    "howToGet": "مشاهدة المساق التعليمي وإتمام التقييم النهائي عبر منصة زادي للحصول على شهادة إتمام إلكترونية مجانية.",
    "fields": [
      "العقيدة الإسلامية",
      "التزكية والإيمان",
      "أصول الدين"
    ]
  },
  {
    "id": "sharia-10",
    "title": "عظمة رب العالمين – الجزء الثالث",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/285978",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "استكمال للسلسلة الإيمانية المباركة المتعلقة بالتفكر في عظمة الله تعالى وقدرته وتدبيره لشؤون خلقه وآثار رحمته وجلاله في الكون.",
    "howToGet": "التسجيل في الجزء الثالث على منصة زادي، ومتابعة الدروس والاختبارات لإصدار شهادة المساق مجاناً.",
    "fields": [
      "العقيدة الإسلامية",
      "التزكية والإيمان",
      "أصول الدين"
    ]
  },
  {
    "id": "sharia-11",
    "title": "كيف تحفظ القرآن",
    "provider": "منصة زادي للتعليم الشرعي المفتوح",
    "url": "https://zadi.net/home/courses/286211",
    "category": "دورات الشريعة والدراسات الاسلامية",
    "summary": "يتناول طرق حفظ القرآن الكريم المنهجية، وتنظيم جدول الحفظ والمراجعة وتثبيت المحفوظ، وأهمية التلقي والمشافهة عن معلم، والعادات الصحية لتقوية الذاكرة.",
    "howToGet": "إكمال فصول المساق والتطبيقات العملية عبر منصة زادي للحصول على شهادة إتمام المساق مجاناً.",
    "fields": [
      "الدراسات القرآنية",
      "حفظ وتجويد القرآن",
      "التربية الإسلامية"
    ]
  },
  {
    "id": "media-01",
    "title": "دراسات الإعلام: وسائل الإعلام المطبوعة والنشر (Media Studies - Print and Publishing Media)",
    "provider": "Alison",
    "url": "https://alison.com/course/media-studies-print-and-publishing-media-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تستكشف تاريخ الإعلام المطبوع، وتطور قوانين النشر وحقوق الملكية الفكرية، وتأثير الكتب الإلكترونية والإنترنت على صناعة النشر والصحافة والمجلات الرقمية.",
    "howToGet": "التسجيل مجاناً في Alison، إكمال وحدات الدورة واجتياز التقييم بنسبة 80% للحصول على شهادة معتمدة من CPD.",
    "fields": [
      "الصحافة والنشر",
      "الإعلام المطبوع والرقمي",
      "حقوق الملكية الفكرية والاتصال"
    ]
  },
  {
    "id": "media-02",
    "title": "إتقان التعامل مع وسائل الإعلام (Mastering the Media)",
    "provider": "Alison",
    "url": "https://alison.com/course/mastering-the-media",
    "category": "دورات الاعلام والاتصال",
    "summary": "تطوير المهارات اللازمة للتعامل الاحترافي مع وسائل الإعلام المختلفة، وصياغة الرسائل الإعلامية المؤثرة، وإدارة المقابلات والظهور الإعلامي بفعالية وثقة.",
    "howToGet": "التسجيل ومتابعة دروس الكورس عبر منصة Alison واجتياز الاختبار النهائي للحصول على الشهادة الرسمية.",
    "fields": [
      "العلاقات العامة",
      "الناطق الإعلامي والظهور التلفزيوني",
      "الاتصال الجماهيري"
    ]
  },
  {
    "id": "media-03",
    "title": "الإعلام والمجتمع والثقافة (Media, Society and Culture)",
    "provider": "Alison",
    "url": "https://alison.com/course/media-society-and-culture",
    "category": "دورات الاعلام والاتصال",
    "summary": "تبحث في العلاقة المتبادلة بين وسائل الإعلام والمجتمع والثقافة، وتناقش تأثير منصات التواصل الاجتماعي والتلفزيون والسينما والإعلانات على السلوك والوعي الإعلامي.",
    "howToGet": "إكمال دراسة وحدات المساق والتقييم على منصة Alison لإصدار شهادة إتمام إلكترونية معتمدة من CPD.",
    "fields": [
      "علم اجتماع الإعلام",
      "الثقافة والإعلام",
      "التربية الإعلامية والمعلوماتية"
    ]
  },
  {
    "id": "media-04",
    "title": "تحقيق التنمية المجتمعية وإشراك الجمهور (Delivering Community Development)",
    "provider": "Alison",
    "url": "https://alison.com/course/delivering-community-development-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "استراتيجيات التنمية المجتمعية، والتخطيط للمشاريع التنموية، وتوظيف القنوات الإعلامية لإشراك الجمهور وبناء الشراكات الناجحة، وإدارة برامج المتطوعين وجمع التبرعات.",
    "howToGet": "التسجيل في Alison وإكمال الفصول والتقييمات للحصول على شهادة الإنجاز المعتمدة.",
    "fields": [
      "الاتصال التنموي",
      "إشراك الجمهور والعلاقات المجتمعية",
      "إدارة الحملات الإعلامية"
    ]
  },
  {
    "id": "media-05",
    "title": "التواصل الدولي والأسواق العالمية (International Communication and the Marketplace)",
    "provider": "Alison",
    "url": "https://alison.com/course/international-communication-and-the-marketplace",
    "category": "دورات الاعلام والاتصال",
    "summary": "تحسين مهارات الاتصال الدولي والتواصل بين الثقافات، وتجاوز عوائق التمركز العرقي واللغوي لتحقيق النجاح والتفاوض في الأسواق العالمية وبيئات العمل متعددة الجنسيات.",
    "howToGet": "إتمام فصول الدورة واجتياز التقييم على منصة Alison لتحميل الشهادة الرقمية المعتمدة مجاناً.",
    "fields": [
      "الاتصال الدولي وتعدد الثقافات",
      "التسويق الدولي",
      "العلاقات الدولية والدبلوماسية العامة"
    ]
  },
  {
    "id": "media-06",
    "title": "Advanced Diploma in Literature Culture and Media",
    "provider": "Alison",
    "url": "https://alison.com/course/advanced-diploma-in-literature-culture-and-media",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-07",
    "title": "Anthropology of Media Digital Culture Representation and Identity",
    "provider": "Alison",
    "url": "https://alison.com/course/anthropology-of-media-digital-culture-representation-and-identity",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-08",
    "title": "Data Journalism and Media Standards Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/data-journalism-and-media-standards-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-09",
    "title": "Debunking Antisemitic Conspiracy Narratives in Digital Media",
    "provider": "Alison",
    "url": "https://alison.com/course/debunking-antisemitic-conspiracy-narratives-in-digital-media",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-10",
    "title": "Diploma in Journalism Revised 2018",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-journalism-revised-2018",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-11",
    "title": "Diploma in Media and its Development",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-media-and-its-development",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-12",
    "title": "Diploma in Media Studies Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-media-studies-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-13",
    "title": "Diploma in Print Electronic and Digital Media",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-print-electronic-and-digital-media",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-14",
    "title": "Diploma in Text Textuality and Digital Media",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-text-textuality-and-digital-media",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-15",
    "title": "English for Journalism",
    "provider": "Alison",
    "url": "https://alison.com/course/english-for-journalism",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-16",
    "title": "English for Media Literacy",
    "provider": "Alison",
    "url": "https://alison.com/course/english-for-media-literacy",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-17",
    "title": "Environmental Journalism Skills and Techniques",
    "provider": "Alison",
    "url": "https://alison.com/course/environmental-journalism-skills-and-techniques",
    "category": "دورات الاعلام والاتصال",
    "summary": "تشرح موضوعات البيئة والأنظمة البيئية وتغير المناخ وآثارها وسبل التعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-18",
    "title": "Fundamentals of Journalism",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-journalism",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-19",
    "title": "How to Be a Media Trainer",
    "provider": "Alison",
    "url": "https://alison.com/course/how-to-be-a-media-trainer",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-20",
    "title": "Internet and Social Media Safety",
    "provider": "Alison",
    "url": "https://alison.com/course/internet-and-social-media-safety",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-21",
    "title": "Introduction to Journalism Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-journalism-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-22",
    "title": "Introduction to Media and Culture Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-media-and-culture-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-23",
    "title": "Introduction to Newspaper Journalism",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-newspaper-journalism",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-24",
    "title": "Journalism and Print Media Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/journalism-and-print-media-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-25",
    "title": "Journalism in the Digital Age Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/journalism-in-the-digital-age-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-26",
    "title": "Media Interviews",
    "provider": "Alison",
    "url": "https://alison.com/course/media-interviews",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-27",
    "title": "Media Studies Entertainment and Broadcast Media Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/media-studies-entertainment-and-broadcast-media-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-28",
    "title": "Media Studies Gaming the Internet and Social Media Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/media-studies-gaming-the-internet-and-social-media-revised",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-29",
    "title": "Media Training Techniques",
    "provider": "Alison",
    "url": "https://alison.com/course/media-training-techniques",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-30",
    "title": "Understanding Digital Journalism",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-digital-journalism",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "media-31",
    "title": "Video Game Journalism Essentials",
    "provider": "Alison",
    "url": "https://alison.com/course/video-game-journalism-essentials",
    "category": "دورات الاعلام والاتصال",
    "summary": "تتناول مهارات الإعلام والاتصال أو الصحافة وإنتاج المحتوى وفهم الجمهور والمنصات الإعلامية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الصحافة والإعلام الرقمي",
      "الإذاعة والتلفزيون",
      "العلاقات العامة والاتصال"
    ]
  },
  {
    "id": "edu-01",
    "title": "تدريب معلمين للمرحلة الابتدائية (Primary Education Training for Teachers)",
    "provider": "Alison",
    "url": "https://alison.com/course/primary-education-training-for-teachers",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "دورة متخصصة في أساليب تدريس طلبة المرحلة الابتدائية، وإدارة العملية التعليمية داخل الصف، وتطوير مهارات التفاعل الصفي الإيجابي.",
    "howToGet": "التسجيل مجاناً في منصة Alison، إكمال الفصول الدراسية واجتياز التقييم بنسبة 80% على الأقل للحصول على الشهادة الرقمية.",
    "fields": [
      "التعليم الابتدائي",
      "معلم صف",
      "المناهج وطرق التدريس",
      "العلوم التربوية"
    ]
  },
  {
    "id": "edu-02",
    "title": "مقدمة في تدريب المدربين (Introduction to Training of Trainers)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-training-of-trainers",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "مقدمة شاملة في أساسيات تدريب المدربين (TOT)، وتصميم البرامج والحقائب التدريبية، وأساليب الإلقاء وتقديم المحتوى بكفاءة واحترافية.",
    "howToGet": "التسجيل في منصة Alison ومتابعة فصول الدورة واجتياز الاختبار النهائي للحصول على شهادة رقمية مجاناً.",
    "fields": [
      "تدريب المدربين (TOT)",
      "التنمية البشرية والتدريب",
      "العلوم التربوية",
      "إدارة الموارد البشرية"
    ]
  },
  {
    "id": "edu-03",
    "title": "دبلوم متقدم في تدريب المدربين (Advanced Diploma in Training of Trainers)",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-training-of-trainers",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "دورة دبلوم متقدمة تتناول تخطيط البرامج التدريبية طويلة وقصيرة المدى، واختيار أساليب التدريب الملائمة، وقياس وتقييم أثر التدريب.",
    "howToGet": "التسجيل مجاناً في منصة Alison، إكمال كافة متطلبات الدبلوم والتقييمات الذاتية للحصول على الشهادة المعتمدة.",
    "fields": [
      "تدريب المدربين (TOT)",
      "التصميم التعليمي",
      "القيادة والتدريب",
      "التطوير المهني"
    ]
  },
  {
    "id": "edu-04",
    "title": "أساليب التدريب للمدربين (Training of Trainers – Training Methods)",
    "provider": "Alison",
    "url": "https://alison.com/course/training-of-trainers-training-methods",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تتناول أساليب ونماذج التدريب المختلفة التفاعلية والعملية، وكيفية تطبيقها مع المتدربين لإثراء النقاش وتعزيز اكتساب المهارات.",
    "howToGet": "إنشاء حساب على Alison، دراسة موديولات أساليب التدريب والتقييم النهائي للحصول على شهادة الإنجاز.",
    "fields": [
      "أساليب التدريب",
      "تدريب المدربين",
      "إدارة ورش العمل",
      "العلوم التربوية"
    ]
  },
  {
    "id": "edu-05",
    "title": "أساسيات تعليم الكبار (The Essentials of Educating Adults)",
    "provider": "Alison",
    "url": "https://alison.com/course/the-essentials-of-educating-adults",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح المبادئ الأساسية لتعليم الكبار (الأندراغوجيا)، وتطوير طرق تعليمهم وتدريبهم بما يتناسب مع دوافعهم واحتياجاتهم المهنية والشخصية.",
    "howToGet": "التسجيل وإكمال وحدات المساق التعليمي في منصة Alison واجتياز الاختبار النهائي بنجاح للحصول على الشهادة.",
    "fields": [
      "تعليم الكبار والتعلم المستمر",
      "أندراغوجيا (Andragogy)",
      "المناهج وطرق التدريس"
    ]
  },
  {
    "id": "edu-06",
    "title": "تعليم STEM والعدالة في العصر الرقمي (STEM Education and Equity: Beyond Silos in the Digital Age)",
    "provider": "Alison",
    "url": "https://alison.com/course/stem-education-and-equity-beyond-silos-in-the-digital-age",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تتناول دمج العلوم والتكنولوجيا والهندسة والرياضيات في التعليم بصورة متكاملة، وتعزيز العدالة وتكافؤ فرص التعلم لجميع الفئات والطلبة.",
    "howToGet": "التسجيل في منصة Alison وإكمال مواد مساق STEM والتقييم النهائي لنيل شهادة إتمام رقمية.",
    "fields": [
      "تعليم STEM",
      "تكنولوجيا التعليم",
      "العدالة وتكافؤ الفرص التعليمية",
      "المناهج الحديثة"
    ]
  },
  {
    "id": "edu-07",
    "title": "تعليم STEM في الطفولة المبكرة (STEM Education in Early Childhood Settings)",
    "provider": "Alison",
    "url": "https://alison.com/course/stem-education-in-early-childhood-settings",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "توضح طرق تقديم مفاهيم العلوم والتكنولوجيا والهندسة والرياضيات للأطفال في مرحلة الطفولة المبكرة ورياض الأطفال بطرق مرحة ومبتكرة.",
    "howToGet": "التسجيل ومتابعة دروس تدريس STEM للأطفال في Alison واجتياز الاختبار للحصول على الشهادة.",
    "fields": [
      "تربية الطفولة المبكرة",
      "رياض الأطفال",
      "تعليم STEM",
      "طرق تدريس الأطفال"
    ]
  },
  {
    "id": "edu-08",
    "title": "تعليم الكبار: مفاهيم الرياضيات الأساسية للحياة اليومية (Everyday Basic Maths Concepts for Adults)",
    "provider": "Alison",
    "url": "https://alison.com/course/adult-basic-education-everyday-basic-maths-concepts-for-adults",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "دورة موجهة لتعليم الكبار وتزويدهم بالمهارات والمفاهيم الرياضية والحسابية الأساسية المستخدمة في شؤون الحياة والعمل اليومي.",
    "howToGet": "إكمال فصول الدورة واجتياز التقييمات في منصة Alison للحصول على شهادة إتمام مجانية.",
    "fields": [
      "تعليم الكبار ومحو الأمية",
      "أساليب تدريس الرياضيات",
      "العلوم التربوية"
    ]
  },
  {
    "id": "edu-09",
    "title": "تخصص التكنولوجيا في التعليم (EdTech)",
    "provider": "إدراك",
    "url": "https://www.edraak.org/programs/specialization/edtechsp-vv2/",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تتناول استخدام الأدوات الرقمية الحديثة والمنصات التكنولوجية في تطوير التدريس وتصميم بيئات التعلم المدمج وتحسين تجربة الطالب.",
    "howToGet": "التسجيل المجاني عبر منصة إدراك، دراسة مساقات التخصص وإنجاز التكليفات والامتحانات للحصول على شهادة التخصص المعتمدة مجاناً.",
    "fields": [
      "تكنولوجيا التعليم (EdTech)",
      "التعليم الرقمي المدمج",
      "المناهج وطرق التدريس",
      "كافة المعلمين والتربويين"
    ]
  },
  {
    "id": "edu-10",
    "title": "Diploma in Development and Education in Early Childhood",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-development-and-education-in-early-childhood",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-11",
    "title": "Diploma in Outcome Based Education and Academic Quality Assurance",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-outcome-based-education-and-academic-quality-assurance",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-12",
    "title": "Early Childhood Education Centre and Daycare Management Diploma",
    "provider": "Alison",
    "url": "https://alison.com/course/early-childhood-education-centre-and-daycare-management-diploma",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-13",
    "title": "Early Childhood Education with Art",
    "provider": "Alison",
    "url": "https://alison.com/course/early-childhood-education-with-art",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-14",
    "title": "Early Childhood Holistic Education",
    "provider": "Alison",
    "url": "https://alison.com/course/early-childhood-holistic-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-15",
    "title": "Early Childhood Special Education Needs",
    "provider": "Alison",
    "url": "https://alison.com/course/early-childhood-special-education-needs",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-16",
    "title": "Early Childhood Studies Development and Education",
    "provider": "Alison",
    "url": "https://alison.com/course/early-childhood-studies-development-and-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-17",
    "title": "Early Education the Role of Technology",
    "provider": "Alison",
    "url": "https://alison.com/course/early-education-the-role-of-technology",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-18",
    "title": "Education and Training Assessment Skills",
    "provider": "Alison",
    "url": "https://alison.com/course/education-and-training-assessment-skills",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-19",
    "title": "Education and Training the Essential Guide",
    "provider": "Alison",
    "url": "https://alison.com/course/education-and-training-the-essential-guide",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-20",
    "title": "Education Leadership and Collaboration",
    "provider": "Alison",
    "url": "https://alison.com/course/education-leadership-and-collaboration",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-21",
    "title": "Fundamentals of Pedagogy in Montessori Education",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-pedagogy-in-montessori-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-22",
    "title": "Gamification in Early Childhood Education ECE and Montessori",
    "provider": "Alison",
    "url": "https://alison.com/course/gamification-in-early-childhood-education-ece-and-montessori",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-23",
    "title": "Handling Disabilities and Special Education Needs",
    "provider": "Alison",
    "url": "https://alison.com/course/handling-disabilities-and-special-education-needs",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-24",
    "title": "Home Education Assessment and Methods",
    "provider": "Alison",
    "url": "https://alison.com/course/home-education-assessment-and-methods",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-25",
    "title": "Introduction to Outcome Based Education in the 21st Century",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-outcome-based-education-in-the-21st-century",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-26",
    "title": "Introduction to Shadow Teaching and Inclusive Education for Beginners",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-shadow-teaching-and-inclusive-education-for-beginners",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-27",
    "title": "Mastering Modern Day Parenting Techniques",
    "provider": "Alison",
    "url": "https://alison.com/course/mastering-modern-day-parenting-techniques",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-28",
    "title": "Montessori Method of Education",
    "provider": "Alison",
    "url": "https://alison.com/course/montessori-method-of-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-29",
    "title": "Positive Parenting Skills and Techniques",
    "provider": "Alison",
    "url": "https://alison.com/course/positive-parenting-skills-and-techniques",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-30",
    "title": "Preschool Education It S Importance and Effects",
    "provider": "Alison",
    "url": "https://alison.com/course/preschool-education-it-s-importance-and-effects",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-31",
    "title": "Preschool Education the High Scope Model",
    "provider": "Alison",
    "url": "https://alison.com/course/preschool-education-the-high-scope-model",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-32",
    "title": "Preschool Education the Reggio Emilia Approach",
    "provider": "Alison",
    "url": "https://alison.com/course/preschool-education-the-reggio-emilia-approach",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-33",
    "title": "Principles and Concepts of Montessori Education",
    "provider": "Alison",
    "url": "https://alison.com/course/principles-and-concepts-of-montessori-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-34",
    "title": "Project Based Learning in Early Childhood Education ECE",
    "provider": "Alison",
    "url": "https://alison.com/course/project-based-learning-in-early-childhood-education-ece",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-35",
    "title": "Special Education for Children with Dyslexia",
    "provider": "Alison",
    "url": "https://alison.com/course/special-education-for-children-with-dyslexia",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-36",
    "title": "Special Education Needs and Disabilities Send Inclusion in Schools",
    "provider": "Alison",
    "url": "https://alison.com/course/special-education-needs-and-disabilities-send-inclusion-in-schools",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-37",
    "title": "Special Education Shadow Teaching",
    "provider": "Alison",
    "url": "https://alison.com/course/special-education-shadow-teaching",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-38",
    "title": "Special Needs Education",
    "provider": "Alison",
    "url": "https://alison.com/course/special-needs-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "science-02",
    "title": "العدالة والشمول في تعليم STEM في العصر الرقمي (STEM Education and Equity)",
    "provider": "Alison",
    "url": "https://alison.com/course/stem-education-and-equity-beyond-silos-in-the-digital-age",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تتناول تعزيز العدالة والشمول في مجالات العلوم والتكنولوجيا والهندسة والرياضيات (STEM)، مع التركيز على إزالة الحواجز والاستفادة من التكنولوجيا ومراعاة التنوع الثقافي في التعليم.",
    "howToGet": "التسجيل في منصة Alison وإكمال وحدات المساق واجتياز التقييم بنسبة 80% للحصول على الشهادة الرقمية.",
    "fields": [
      "تعليم العلوم والرياضيات (STEM)",
      "العلوم الأساسية",
      "تكنولوجيا التعليم"
    ]
  },
  {
    "id": "edu-40",
    "title": "Teaching Special Needs Education",
    "provider": "Alison",
    "url": "https://alison.com/course/teaching-special-needs-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-41",
    "title": "Understanding Elementary Education",
    "provider": "Alison",
    "url": "https://alison.com/course/understanding-elementary-education",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-42",
    "title": "Working with Students with Special Educational Needs Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/working-with-students-with-special-educational-needs-revised",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح أساليب التعليم والتعلم أو نمو المتعلمين وإدارة البيئة التعليمية، مع تطبيقات مرتبطة بالفئة أو المنهج المذكور.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-43",
    "title": "Knowledge Translation",
    "provider": "NextGenU.org",
    "url": "https://courses.nextgenu.org/course/view.php?id=213",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تشرح تحويل نتائج الأبحاث والمعرفة العلمية إلى ممارسات وقرارات وسياسات قابلة للتطبيق.",
    "howToGet": "التسجيل المجاني في منصة NextGenU.org وإتمام الوحدات التعليمية والاختبارات للحصول على شهادة إتمام مجانية معتمدة.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "edu-44",
    "title": "Measuring What Matters: Transforming Assessment and Recognition of Complex Learning Competencies",
    "provider": "FutureLearn",
    "url": "https://www.classcentral.com/course/measuring-what-matters-98981",
    "category": "دورات التربية مع العلوم التربوية",
    "summary": "تتناول أساليب تقييم المهارات والكفاءات المعقدة والاعتراف بالتعلم الذي لا تقيسه الاختبارات التقليدية بسهولة.",
    "howToGet": "التسجيل المجاني عبر منصة FutureLearn وإتمام خطوات الدورة الأسبوعية للحصول على شهادة الإنجاز الرقمية.",
    "fields": [
      "العلوم التربوية",
      "تربية الطفل",
      "التربية الخاصة",
      "معلم صف"
    ]
  },
  {
    "id": "art-01",
    "title": "دورة تصميم أزياء للمبتدئين",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/7220/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A7%D8%B2%D9%8A%D8%A7%D8%A1-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86-video",
    "category": "دورات الفنون والتصميم",
    "summary": "دورة تمهيدية للتعرف على أساسيات تصميم الأزياء وتطوير الأفكار الفنية، ورسم المانيكان وتحويل الرسومات الأولية إلى تصاميم أزياء متكاملة.",
    "howToGet": "التسجيل المجاني في منصة معارف ومتابعة جميع الفيديوهات التعليمية بنسبة 100% للحصول على شهادة معتمدة مجانية فوراً.",
    "fields": [
      "تصميم الأزياء",
      "الفنون البصرية",
      "التصميم الجرافيكي والفني"
    ]
  },
  {
    "id": "art-02",
    "title": "كورس تعلم رسم أجزاء الوجه بالرصاص للمبتدئين",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/101/%D9%83%D9%88%D8%B1%D8%B3-%D8%AA%D8%B9%D9%84%D9%85-%D8%A7%D8%AC%D8%B2%D8%A7%D8%A1-%D8%A7%D9%84%D9%88%D8%AC%D9%87-%D8%A8%D8%A7%D9%84%D8%B1%D8%B5%D8%A7%D8%B5-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86-%D8%B4%D8%B1%D8%AD-%D8%B9%D8%B1%D8%A8%D9%89-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تعلّم رسم ملامح الوجه وتفاصيله الدقيقة (العينين، الأنف، الفم، الأذنين) باستخدام قلم الرصاص والتظليل للمبتدئين.",
    "howToGet": "التسجيل في منصة معارف وإكمال مشاهدة الدروس العملية كاملة لإصدار شهادة إتمام الدورة مجاناً.",
    "fields": [
      "الرسم والفنون التشكيلية",
      "الفنون البصرية",
      "الرسم التعبيري"
    ]
  },
  {
    "id": "art-03",
    "title": "دورة الرسم للاحتراف",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/7019/%D8%A7%D9%84%D8%B1%D8%B3%D9%85-%D9%84%D9%84%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81-video",
    "category": "دورات الفنون والتصميم",
    "summary": "دورة لتطوير مهارات الرسم والتدرب على التقنيات المتقدمة ونسب الأجسام والمنظور والضوء والظل لتحسين المستوى الفني.",
    "howToGet": "حضور كامل مقاطع المساق على منصة معارف للحصول على شهادة إتمام معتمدة مجاناً.",
    "fields": [
      "الفنون التشكيلية",
      "الرسم المتقدم",
      "التصميم الفني"
    ]
  },
  {
    "id": "art-04",
    "title": "دورة رسم بورتريه بالرصاص",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/100/%D8%B1%D8%B3%D9%85-%D8%A8%D9%88%D8%B1%D8%AA%D8%B1%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B1%D8%B5%D8%A7%D8%B5-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تعلّم رسم الوجوه البشرية (البورتريه) باستخدام أقلام الرصاص بدرجاتها المختلفة مع الاهتمام بالتظليل الواقعي وتفاصيل النظرات والتعابير.",
    "howToGet": "إنهاء متابعة دروس الكورس عبر منصة معارف وتنزيل شهادة الإتمام المجانية من لوحة التحكم.",
    "fields": [
      "رسم البورتريه",
      "الفنون البصرية",
      "الرسم بالرصاص"
    ]
  },
  {
    "id": "art-05",
    "title": "دورة رسم البورتريه من الصفر",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/7018/%D8%B1%D8%B3%D9%85-%D8%A7%D9%84%D8%A8%D9%88%D8%B1%D8%AA%D8%B1%D9%8A%D9%87-%D9%85%D9%86-%D8%A7%D9%84%D8%B5%D9%81%D8%B1-video",
    "category": "دورات الفنون والتصميم",
    "summary": "دورة متخصصة للمبتدئين تشرح أساسيات رسم البورتريه من الصفر، وتقسيم أبعاد الوجه الهندسي وضبط المسافات وملامح الوجه خطوة بخطوة.",
    "howToGet": "التسجيل في منصة معارف ومتابعة الدروس التطبيقية للحصول على شهادة إلكترونية معتمدة مجاناً.",
    "fields": [
      "الفنون التشكيلية",
      "رسم البورتريه",
      "التعليم الفني"
    ]
  },
  {
    "id": "art-06",
    "title": "كورس تعليم الرسم الشامل (أكثر من 250 فيديو)",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/1314/%D8%A3%D9%81%D8%B6%D9%84-%D9%83%D9%88%D8%B1%D8%B3-%D9%88--%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%81%D9%8A-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%B1%D8%B3%D9%85---%D9%83%D9%88%D8%B1%D8%B3-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%B1%D8%B3%D9%85-%D8%A3%D9%83%D8%AB%D8%B1-%D9%85%D9%86-250-%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%B1%D8%B3%D9%85-video",
    "category": "دورات الفنون والتصميم",
    "summary": "موسوعة تدريبية متكاملة لتعليم أساسيات ومستويات الرسم المختلفة عبر أكثر من 250 درساً فيديو تطبيقياً تغطي مختلف الأدوات والأساليب.",
    "howToGet": "إكمال فصول الدورة عبر منصة معارف والحصول على شهادة الإنجاز المعتمدة مجاناً.",
    "fields": [
      "الرسم الشامل",
      "الفنون التشكيلية",
      "الفنون البصرية"
    ]
  },
  {
    "id": "art-07",
    "title": "كورس تعلم رسم الشعر للمبتدئين",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/103/%D9%83%D9%88%D8%B1%D8%B3-%D8%AA%D8%B9%D9%84%D9%85-%D8%B1%D8%B3%D9%85-%D8%A7%D9%84%D8%B4%D8%B9%D8%B1-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86-%D8%B4%D8%B1%D8%AD-%D8%B9%D8%B1%D8%A8%D9%8ى-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تعلّم رسم الشعر وخصلاته وتحديد اتجاهاته ولمعانه وتفاصيله الواقعية بما يتناسب مع ملامح الوجه وزوايا الإضاءة.",
    "howToGet": "حضور مقاطع الكورس التعليمية على منصة معارف واستخراج الشهادة المجانية مباشرة.",
    "fields": [
      "رسم البورتريه",
      "الفنون البصرية",
      "تقنيات الرسم بالرصاص"
    ]
  },
  {
    "id": "art-08",
    "title": "دورة تعليم الرسم بالألوان المائية (Watercolor Painting)",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6605/%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%B1%D8%B3%D9%85-%D8%A8%D8%A7%D9%84%D8%A7%D9%84%D9%88%D8%A7%D9%86-%D8%A7%D9%84%D9%85%D8%A7%D8%A6%D9%8A%D8%A9-Watercolor-Painting-video",
    "category": "دورات الفنون والتصميم",
    "summary": "مقدمة عملية في استخدام الألوان المائية (الووتر كلر)، ومزج الألوان، وتقنيات التدرج والتبليل وتطبيقها في رسم اللوحات والمناظر الطبيعية.",
    "howToGet": "التسجيل في منصة معارف ومتابعة كامل محتوى الدورة للحصول على شهادة إتمام مجانية.",
    "fields": [
      "التلوين بالألوان المائية",
      "الفنون التشكيلية",
      "الرسم الحر"
    ]
  },
  {
    "id": "art-09",
    "title": "دورة الألوان في الديكور",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6617/%D8%A7%D9%84%D8%A7%D9%84%D9%88%D8%A7%D9%86-%D9%81%D9%8A-%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تتناول نظريات وتنسيق الألوان داخل المساحات المعمارية، واختيار المجموعات والباليتات اللونية المناسبة للديكور وأثرها النفسي والجمالي.",
    "howToGet": "إكمال فصول الدورة عبر منصة معارف وتنزيل شهادة إتمام المساق مجاناً.",
    "fields": [
      "التصميم الداخلي والديكور",
      "نظرية الألوان",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-10",
    "title": "دورة الديكور والتصميم الداخلي",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/7261/%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1-%D9%88-%D8%A7%D9%84%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A7%D9%84%D8%AF%D8%A7%D8%AE%D9%84%D9%8A-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تتناول أساسيات تصميم وتوزيع المساحات الداخلية، وتنسيق الأثاث، ومراعاة مسارات الحركة والعناصر الجمالية والوظيفية في المباني.",
    "howToGet": "مشاهدة الدروس التعليمية كاملة على منصة معارف للحصول على شهادة إتمام المساق مجاناً.",
    "fields": [
      "التصميم الداخلي",
      "العمارة والديكور",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-11",
    "title": "دورة الإضاءة في الديكور",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6614/%D8%A7%D9%84%D8%A7%D8%B6%D8%A7%D8%A1%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تشرح أنواع وتوزيع الإضاءة (المباشرة، غير المباشرة، الديكورية) ودورها المحوري في إبراز تفاصيل المكان وخلق الأجواء المناسبة.",
    "howToGet": "إكمال مشاهدة دروس الدورة في منصة معارف للحصول على الشهادة المعتمدة فوراً.",
    "fields": [
      "تصميم الإضاءة",
      "التصميم الداخلي",
      "الديكور المنزلي"
    ]
  },
  {
    "id": "art-12",
    "title": "دورة تعليم أعمال وطرق البناء",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/5700/%D9%83%D9%88%D8%B1%D8%B3---%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85--%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D9%88%D8%B7%D8%B1%D9%82-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تقدم معلومات تطبيقية عن أعمال البناء والتشييد، وطرق تنفيذ الهياكل والتشطيبات الأساسية والمواد المستخدمة في البناء.",
    "howToGet": "التسجيل في منصة معارف ومتابعة الفيديوهات كاملة لإصدار شهادة إتمام الدورة مجاناً.",
    "fields": [
      "التصميم المعماري",
      "أعمال البناء والتشييد",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-13",
    "title": "دورة تصميم ديكور المنازل الصغيرة",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6615/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D9%8A%D9%83%D9%88%D8%B1-%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B2%D9%84-%D8%A7%D9%84%D8%B5%D8%BA%D9%8A%D8%B1%D8%A9-video",
    "category": "دورات الفنون والتصميم",
    "summary": "توضح حيل وطرق استغلال المساحات الضيقة والصغيرة، وتنسيق الأثاث الذكي متعدد الاستخدامات وإعطاء إيحاء بالاتساع والراحة.",
    "howToGet": "حضور كافة حلقات الدورة في منصة معارف للحصول على شهادة رقمية معتمدة.",
    "fields": [
      "التصميم الداخلي",
      "ديكور الشقق الصغيرة",
      "استغلال المساحات"
    ]
  },
  {
    "id": "art-14",
    "title": "دورة تعليم الصباغة وطلاء أثاث الخشب القديم في البيت",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/5710/%D9%83%D9%88%D8%B1%D8%B3---%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85--%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%BA%D8%A9-%D9%88%D8%B7%D9%84%D8%A7%D8%A1-%D8%A3%D8%AB%D8%A7%D8%AB-%D8%A7%D9%84%D8%AE%D8%B4%D8%A8-%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85-%D8%A8%D8%B3%D9%87%D9%88%D9%84%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%A8%D9%8A%D8%AA-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تشرح خطوات صباغة وطلاء وتجديد الأثاث الخشبي القديم منزلياً، وتقنيات السنفرة واختيار الدهانات والورنيش لحماية الخشب وإحيائه.",
    "howToGet": "التسجيل في منصة معارف وإكمال دروس الكورس لإصدار شهادة مجانية معتمدة.",
    "fields": [
      "الأعمال اليدوية والحرفية",
      "تجديد الأثاث والديكور",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-15",
    "title": "دورة تعليم صناعة وتصميم المطابخ العصرية",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/5712/%D9%83%D9%88%D8%B1%D8%B3---%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85--%D8%AF%D9%88%D8%B1%D8%A9-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%B5%D9%86%D8%A7%D8%B9%D8%A9-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%A8%D8%AE-%D8%A7%D9%84%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9-%D8%A8%D8%B3%D9%87%D9%88%D9%84%D8%A9-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تتناول أسس ومعايير تصميم وتفصيل المطابخ العصرية المودرن، وتوزيع مثلث الحركة واستغلال زوايا المطبخ والخامات الحديثة.",
    "howToGet": "مشاهدة الدورة كاملة على منصة معارف واستخراج الشهادة المجانية مباشرة.",
    "fields": [
      "تصميم المطابخ",
      "التصميم الداخلي",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-16",
    "title": "دورة تشطيب داخلي للحوائط والجدران",
    "provider": "منصة معارف (M3aarf)",
    "url": "https://www.m3aarf.com/certificate/6616/%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8-%D8%AF%D8%A7%D8%AE%D9%84%D9%8A-%D9%84%D9%84%D8%AD%D9%88%D8%A7%D8%A6%D8%B7-video",
    "category": "دورات الفنون والتصميم",
    "summary": "تقدم دليلاً عملياً لطرق تشطيب الجدران الداخلية وتجهيزها (المعجون، الدهانات، بدائل الرخام والخشب، وورق الحائط) للمساحات السكنية والتجارية.",
    "howToGet": "إكمال فصول الدورة عبر منصة معارف وتنزيل شهادة إتمام المساق مجاناً.",
    "fields": [
      "التشطيبات الداخلية",
      "الديكور والتصميم الداخلي",
      "الفنون التطبيقية"
    ]
  },
  {
    "id": "art-17",
    "title": "Digital Skills: User Experience",
    "provider": "Accenture / FutureLearn",
    "url": "https://www.futurelearn.com/courses/digital-skills-user-experience",
    "category": "دورات الفنون والتصميم",
    "summary": "مقدمة في تجربة المستخدم UX والبحث عن احتياجات المستخدم وتصميم الرحلات والنماذج الأولية واختبار سهولة الاستخدام. تنبيه: تاريخ الإيقاف المعلن لهذه السلسلة على FutureLearn هو 5 نوفمبر 2026.",
    "howToGet": "التسجيل المجاني عبر منصة FutureLearn وإتمام خطوات الدورة الأسبوعية للحصول على شهادة الإنجاز الرقمية.",
    "fields": [
      "التصميم الجرافيكي",
      "تصميم تجربة المستخدم UX/UI",
      "الفنون الجميلة"
    ]
  },
  {
    "id": "art-18",
    "title": "Introduction to the Science of Drawing",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-the-science-of-drawing",
    "category": "دورات الفنون والتصميم",
    "summary": "مقدمة في المجال الإبداعي أو التقني الوارد في العنوان، وتعرّف بالمفاهيم والأدوات الأساسية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "التصميم الجرافيكي",
      "تصميم تجربة المستخدم UX/UI",
      "الفنون الجميلة"
    ]
  },
  {
    "id": "agri-01",
    "title": "العلوم الزراعية: البستنة وتربية الحيوانات والاستزراع المائي (Agricultural Science)",
    "provider": "Alison",
    "url": "https://alison.com/course/agricultural-science-gardening-animal-farming-and-aquaculture",
    "category": "دورات الزراعة والبيئة",
    "summary": "مقدمة شاملة في العلوم الزراعية تشمل زراعة النباتات والحدائق، وتربية الحيوانات والمواشي، وأساسيات الاستزراع المائي والسمكي.",
    "howToGet": "التسجيل مجاناً في Alison، دراسة موديولات الدورة واجتياز التقييم بنسبة 80% على الأقل لتحميل الشهادة الرقمية.",
    "fields": [
      "العلوم الزراعية",
      "الإنتاج الحيواني",
      "الاستزراع المائي",
      "البستنة والإنتاج النباتي"
    ]
  },
  {
    "id": "agri-02",
    "title": "إدارة المزارع وصيانتها (Farm Management and Maintenance)",
    "provider": "Alison",
    "url": "https://alison.com/course/farm-management-and-maintenance",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول التخطيط الإداري والمالي للمزارع، وصيانة المعدات والمنشآت الزراعية، وتطبيق أفضل الممارسات الزراعية المستدامة لزيادة الإنتاجية.",
    "howToGet": "التسجيل في منصة Alison ومتابعة فصول الدورة واجتياز الاختبار النهائي للحصول على شهادة رقمية مجاناً.",
    "fields": [
      "إدارة المزارع",
      "الهندسة الزراعية",
      "الاقتصاد الزراعي"
    ]
  },
  {
    "id": "agri-03",
    "title": "الزراعة المستدامة والأمن الغذائي (Sustainable Agriculture and Food Security)",
    "provider": "Alison",
    "url": "https://alison.com/course/sustainable-agriculture-and-food-security",
    "category": "دورات الزراعة والبيئة",
    "summary": "تشرح مفهوم الزراعة المستدامة ومنظومة الأمن الغذائي العالمي، وطرق تقليل هدر المحاصيل وتحسين كفاءة استغلال الموارد الطبيعية والمائية.",
    "howToGet": "إنشاء حساب على منصة Alison وإكمال وحدات المساق والتقييم للحصول على شهادة إتمام المساق.",
    "fields": [
      "الزراعة المستدامة",
      "الأمن الغذائي",
      "علوم الأغذية والبيئة"
    ]
  },
  {
    "id": "agri-04",
    "title": "نظرية الزراعة المستدامة: زراعة مستقبل أكثر اخضراراً (Sustainable Agriculture Theory)",
    "provider": "Alison",
    "url": "https://alison.com/course/sustainable-agriculture-theory-cultivating-a-greener-future",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول أساليب الزراعة العضوية والمستدامة، وصحة التربة والميكروبات المفيدة، والتنوع الحيوي، والإدارة المسؤولة للموارد الزراعية للأجيال القادمة.",
    "howToGet": "إكمال فصول الدورة عبر Alison واجتياز الامتحان الإلكتروني للحصول على الشهادة الرقمية.",
    "fields": [
      "علوم التربة والري",
      "الزراعة العضوية",
      "حماية التنوع الحيوي"
    ]
  },
  {
    "id": "agri-05",
    "title": "مقدمة في الزراعة الذكية مناخياً (Introduction to Climate-Smart Agriculture)",
    "provider": "منظمة الأغذية والزراعة للأمم المتحدة (FAO)",
    "url": "https://elearning.fao.org/course/view.php?id=439",
    "category": "دورات الزراعة والبيئة",
    "summary": "تشرح أثر تغير المناخ على المنظومات الزراعية والأمن الغذائي، وطرق التكيف والتعايش، وتطبيق ممارسات التخفيف لزيادة مرونة المحاصيل.",
    "howToGet": "التسجيل المجاني في أكاديمية الفاو للتعليم الإلكتروني (FAO elearning Academy) واجتياز التقييم بنسبة 75% للحصول على شهادة وشارة رقمية معتمدة.",
    "fields": [
      "الزراعة الذكية مناخياً",
      "التغير المناخي",
      "الموارد الطبيعية والبيئة",
      "الهندسة الزراعية"
    ]
  },
  {
    "id": "agri-06",
    "title": "مقدمة في الاستدامة البيئية (Introduction to Environmental Sustainability)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-environmental-sustainability-revised",
    "category": "دورات الزراعة والبيئة",
    "summary": "تقدم أساسيات الاستدامة البيئية وإدارة الموارد الطبيعية، والتفريق بين المواد والأنشطة المستدامة وغير المستدامة وأثرها البيئي طويل المدى.",
    "howToGet": "التسجيل ومتابعة دروس المساق في Alison واجتياز التقييم لإصدار الشهادة المجانية.",
    "fields": [
      "الاستدامة البيئية",
      "إدارة الموارد الطبيعية",
      "العلوم البيئية"
    ]
  },
  {
    "id": "agri-07",
    "title": "مفاهيم الاستدامة البيئية (Environmental Sustainability Concepts)",
    "provider": "Alison",
    "url": "https://alison.com/course/environmental-sustainability-concepts",
    "category": "دورات الزراعة والبيئة",
    "summary": "توضح المفاهيم الجوهرية للاستدامة البيئية، والموارد المتجددة وغير المتجددة، وتأثير التلوث الصناعي وتغير المناخ على النظم البيئية الحيوية.",
    "howToGet": "إكمال دراسة وحدات الكورس والتقييم النهائي على منصة Alison للحصول على شهادة إنجاز رقمية.",
    "fields": [
      "العلوم البيئية",
      "الطاقة والموارد المتجددة",
      "مكافحة التلوث"
    ]
  },
  {
    "id": "agri-08",
    "title": "بناء بصمة بيئية مستدامة (Creating a Sustainable Environmental Footprint)",
    "provider": "Alison",
    "url": "https://alison.com/course/creating-a-sustainable-environmental-footprint",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول البصمة الكربونية والبيئية وتأثير الأنشطة والأنماط الاستهلاكية البشرية، واستراتيجيات تقليل النفايات والمحافظة على الموارد الحيوية.",
    "howToGet": "التسجيل في Alison وإكمال الفصول بنجاح للحصول على الشهادة المعتمدة.",
    "fields": [
      "البصمة البيئية والكربونية",
      "الاقتصاد الأخضر",
      "إدارة النفايات والاستدامة"
    ]
  },
  {
    "id": "agri-09",
    "title": "الوعي البيئي والحفاظ على الطبيعة (Environmental Awareness and Conservation)",
    "provider": "Alison",
    "url": "https://alison.com/course/environmental-awareness-and-conservation",
    "category": "دورات الزراعة والبيئة",
    "summary": "تقدم مبادئ الوعي البيئي وأهمية المحافظة على الطبيعة والغابات والمحميات، والحد من الأضرار والممارسات المدمرة للبيئة الطبيعية.",
    "howToGet": "حضور دروس الدورة عبر Alison واجتياز التقييم لاستخراج شهادة إتمام الدورة مجاناً.",
    "fields": [
      "حماية الطبيعة والمحميات",
      "التنوع الحيوي",
      "التوعية البيئية"
    ]
  },
  {
    "id": "agri-10",
    "title": "مدخل إلى القضايا والمشكلات البيئية (Introduction to Environmental Issues)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-environmental-issues",
    "category": "دورات الزراعة والبيئة",
    "summary": "تناقش أبرز القضايا البيئية المعاصرة كالتلوث الهوائي والمائي، وفقدان التنوع الحيوي، والاحتباس الحراري، واستنزاف الموارد المائية والأرضية.",
    "howToGet": "التسجيل وإكمال متطلبات الدورة على منصة Alison وتحميل الشهادة بعد اجتياز التقييم.",
    "fields": [
      "القضايا البيئية المعاصرة",
      "التلوث البيئي",
      "علوم الأرض والبيئة"
    ]
  },
  {
    "id": "agri-11",
    "title": "المبادئ الأساسية للإدارة البيئية (Basic Principles of Environmental Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/basic-principles-of-environment-management",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول المبادئ والأطر الأساسية للإدارة البيئية، وتطبيق خطط الإصحاح البيئي، ودور التشريعات والسياسات في دعم مسارات التنمية المستدامة.",
    "howToGet": "إكمال فصول الدورة على Alison واجتياز الاختبار بنجاح للحصول على الشهادة الرقمية.",
    "fields": [
      "الإدارة البيئية",
      "التنمية المستدامة",
      "السياسات البيئية والتخطيط"
    ]
  },
  {
    "id": "agri-12",
    "title": "تغير المناخ: التحولات نحو الاستدامة (Climate Change: Transitions to Sustainability)",
    "provider": "الجامعة المفتوحة البريطانية (OpenLearn)",
    "url": "https://www.open.edu/openlearn/nature-environment/environmental-studies/climate-change-transitions-sustainability/content-section-0?intro=1",
    "category": "دورات الزراعة والبيئة",
    "summary": "تناقش أبعاد تغير المناخ العلمية والاجتماعية، وسبل التحول العادل إلى أنماط طاقة وتنمية أكثر استدامة وقدرة على التكيف مع الاضطرابات المناخية.",
    "howToGet": "التسجيل المجاني في منصة OpenLearn التابعة للجامعة المفتوحة وإتمام مسار الدورة للحصول على شهادة مشاركة معتمدة مجاناً.",
    "fields": [
      "تغير المناخ",
      "الاستدامة البيئية",
      "السياسات المناخية"
    ]
  },
  {
    "id": "agri-13",
    "title": "الغذاء من أجل البيئة (Eating for the Environment)",
    "provider": "الجامعة المفتوحة البريطانية (OpenLearn)",
    "url": "https://www.open.edu/openlearn/nature-environment/eating-the-environment/",
    "category": "دورات الزراعة والبيئة",
    "summary": "تستكشف العلاقة الوثيقة بين النظم الغذائية والتغذية والاستدامة البيئية، وأثر الخيارات الغذائية والإنتاج الحيواني والنباتي على كوكب الأرض.",
    "howToGet": "التسجيل في OpenLearn وإكمال المواد التعليمية والأنشطة التفاعلية للحصول على شهادة المشاركة الرسمية.",
    "fields": [
      "الأنظمة الغذائية المستدامة",
      "التغذية والبيئة",
      "الإنتاج الزراعي والحيواني"
    ]
  },
  {
    "id": "agri-14",
    "title": "Environmental Education Climate Change the Science",
    "provider": "Alison",
    "url": "https://alison.com/course/environmental-education-climate-change-the-science",
    "category": "دورات الزراعة والبيئة",
    "summary": "تشرح موضوعات البيئة والأنظمة البيئية وتغير المناخ وآثارها وسبل التعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-15",
    "title": "Fundamentals of Plant Science for Gardeners",
    "provider": "Alison",
    "url": "https://alison.com/course/fundamentals-of-plant-science-for-gardeners",
    "category": "دورات الزراعة والبيئة",
    "summary": "تعرّف بمبادئ العلوم الزراعية والنباتية أو الحيوانية وتطبيقاتها في الزراعة والإنتاج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-16",
    "title": "Introduction to Animal Science",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-animal-science",
    "category": "دورات الزراعة والبيئة",
    "summary": "تعرّف بمبادئ العلوم الزراعية والنباتية أو الحيوانية وتطبيقاتها في الزراعة والإنتاج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-17",
    "title": "Introduction to Applied Ecology",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-applied-ecology",
    "category": "دورات الزراعة والبيئة",
    "summary": "تشرح موضوعات البيئة والأنظمة البيئية وتغير المناخ وآثارها وسبل التعامل معها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-18",
    "title": "Introduction to Soil Science and Technology",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-soil-science-and-technology",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول خصائص التربة ومكوناتها وكيمياءها وطرق فحصها والتقنيات المستخدمة في إدارتها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-19",
    "title": "Pest Control and Management",
    "provider": "Alison",
    "url": "https://alison.com/course/pest-control-and-management",
    "category": "دورات الزراعة والبيئة",
    "summary": "تعرّف بأساسيات مكافحة الآفات وطرق إدارتها والحد من أضرارها على الإنسان والمحاصيل والبيئة.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-20",
    "title": "Soil Science and Technology Advanced Technologies for Soil Applications",
    "provider": "Alison",
    "url": "https://alison.com/course/soil-science-and-technology-advanced-technologies-for-soil-applications",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول خصائص التربة ومكوناتها وكيمياءها وطرق فحصها والتقنيات المستخدمة في إدارتها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-21",
    "title": "Soil Science and Technology Soil Chemistry and Testing Procedures",
    "provider": "Alison",
    "url": "https://alison.com/course/soil-science-and-technology-soil-chemistry-and-testing-procedures",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول خصائص التربة ومكوناتها وكيمياءها وطرق فحصها والتقنيات المستخدمة في إدارتها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-22",
    "title": "Soil Science and Technology Soil Properties and Chemical Processes",
    "provider": "Alison",
    "url": "https://alison.com/course/soil-science-and-technology-soil-properties-and-chemical-processes",
    "category": "دورات الزراعة والبيئة",
    "summary": "تتناول خصائص التربة ومكوناتها وكيمياءها وطرق فحصها والتقنيات المستخدمة في إدارتها.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-23",
    "title": "Theory of Plant Science for Beginners",
    "provider": "Alison",
    "url": "https://alison.com/course/theory-of-plant-science-for-beginners",
    "category": "دورات الزراعة والبيئة",
    "summary": "تعرّف بمبادئ العلوم الزراعية والنباتية أو الحيوانية وتطبيقاتها في الزراعة والإنتاج.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "agri-24",
    "title": "Planetary Scale Earth Observation with Google Earth Engine",
    "provider": "Google",
    "url": "https://www.classcentral.com/course/planetary-scale-earth-observation-with-google-ear-199858",
    "category": "دورات الزراعة والبيئة",
    "summary": "تعرّف بكيفية تحليل كميات ضخمة من بيانات رصد الأرض باستخدام Google Earth Engine لأبحاث البيئة والزراعة والمياه والاستدامة.",
    "howToGet": "تسجيل الدخول بحساب Google عبر المنصة الرسمية وإتمام المسار التدريبي والاختبارات للحصول على الشهادة أو الشارة الرقمية.",
    "fields": [
      "الهندسة الزراعية",
      "علوم التربة والبيئة",
      "التغير المناخي والاستدامة"
    ]
  },
  {
    "id": "sport-01",
    "title": "دليل احتراف وكالة لاعبي كرة القدم (Guide to Become a Football Agent)",
    "provider": "Alison",
    "url": "https://alison.com/course/guide-to-become-a-football-agent",
    "category": "دورات الرياضة والسياحة",
    "summary": "تشرح أساسيات العمل كوكيل معتمد ومحترف لكرة القدم، وإدارة عقود اللاعبين، وتقنيات التفاوض، والانتقالات الدولية، والتسويق الرياضي، والتعامل مع اللوائح والقوانين الرياضية والإعلام.",
    "howToGet": "التسجيل مجاناً في منصة Alison، دراسة موديولات الدورة واجتياز التقييم بنسبة 80% للحصول على شهادة معتمدة من CPD.",
    "fields": [
      "وكالة اللاعبين وإدارة الأعمال الرياضية",
      "القانون الرياضي",
      "التسويق الرياضي",
      "كرة القدم"
    ]
  },
  {
    "id": "sport-02",
    "title": "التربية البدنية: أساليب وتقنيات التدريب الرياضي (Physical Education - Coaching Styles and Techniques)",
    "provider": "Alison",
    "url": "https://alison.com/course/physical-education-coaching-styles-and-techniques-revised",
    "category": "دورات الرياضة والسياحة",
    "summary": "تشرح أنواع وأساليب التدريب الرياضي المختلفة في التربية البدنية، وطرق الارتقاء بأداء الفرق الرياضية، وأسس علم النفس الرياضي، والتعامل مع الإصابات والفئات العمرية المتنوعة.",
    "howToGet": "التسجيل ومتابعة دروس الكورس في Alison واجتياز الاختبار النهائي للحصول على شهادة CPD معتمدة.",
    "fields": [
      "التربية البدنية والرياضية",
      "التدريب الرياضي",
      "علم النفس الرياضي"
    ]
  },
  {
    "id": "sport-03",
    "title": "أساسيات التسويق الرياضي (Sports Marketing Fundamentals)",
    "provider": "Alison",
    "url": "https://alison.com/course/sports-marketing-fundamentals",
    "category": "دورات الرياضة والسياحة",
    "summary": "تغطي المبادئ والاستراتيجيات التسويقية لترويج العلامات التجارية والنوادي والفعاليات الرياضية، وإدارة حقوق الإعلام والبث، وقياس تفاعل وولاء المشجعين باستخدام تحليلات البيانات.",
    "howToGet": "إكمال فصول الدورة عبر Alison واجتياز التقييم النهائي للحصول على شهادة إتمام إلكترونية معتمدة من CPD.",
    "fields": [
      "التسويق الرياضي",
      "الإدارة الرياضية",
      "إدارة الفعاليات والرعاية الرياضية"
    ]
  },
  {
    "id": "sport-04",
    "title": "أساسيات الكشافة واكتشاف المواهب الرياضية (Essentials of Sports Scouting)",
    "provider": "Alison",
    "url": "https://alison.com/course/essentials-of-sports-scouting",
    "category": "دورات الرياضة والسياحة",
    "summary": "تعلّم أساسيات التنقيب واكتشاف المواهب الكروية والرياضية، والتفرقة بين الأداء الحالي والإمكانات المستقبلية طويلة الأمد، وتقييم اللاعبين، وبناء شبكات الكشافة للمواهب والناشئين.",
    "howToGet": "التسجيل في منصة Alison وإكمال وحدات المساق والتقييم للحصول على شهادة معتمدة.",
    "fields": [
      "كشافة المواهب الرياضية (Scouting)",
      "التدريب الرياضي",
      "تطوير قطاع الناشئين"
    ]
  },
  {
    "id": "sport-05",
    "title": "الإسعافات الأولية للإصابات الرياضية (First Aid for Sports)",
    "provider": "Alison",
    "url": "https://alison.com/course/first-aid-for-sports",
    "category": "دورات الرياضة والسياحة",
    "summary": "توفر المعرفة والمهارات العملية للتعامل الفوري مع الإصابات الرياضية الشائعة (الالتواءات، الكسور، الارتجاج)، وإجراءات الإسعافات الأولية الأساسية والإنعاش القلبي الرئوي (CPR) في الملاعب.",
    "howToGet": "متابعة الشرح العملي في Alison واجتياز اختبار الإسعافات بنسبة 80% للحصول على شهادة CPD الرقمية.",
    "fields": [
      "الطب الرياضي والإصابات",
      "الإسعافات الأولية",
      "التأهيل الرياضي"
    ]
  },
  {
    "id": "sport-06",
    "title": "مقدمة في أنماط السفر والوجهات السياحية (Tourism – Travel Patterns and Destinations)",
    "provider": "Alison",
    "url": "https://alison.com/course/tourism-introduction-to-travel-patterns-and-destinations-revised",
    "category": "دورات الرياضة والسياحة",
    "summary": "مقدمة متكاملة عن أنماط وحركات السفر السياحي، ودوافع اختيار الوجهات السياحية، وأنواع الرحلات البيئية والثقافية والترفيهية وسلوك المستهلك السياحي.",
    "howToGet": "التسجيل في Alison وإكمال المساق التفاعلي واجتياز التقييم لإصدار الشهادة الرقمية.",
    "fields": [
      "السياحة والسفر",
      "الإرشاد السياحي",
      "إدارة الوجهات السياحية"
    ]
  },
  {
    "id": "sport-07",
    "title": "دبلوم في الدراسات السياحية (Diploma in Tourism Studies)",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-tourism-studies-revised-2018",
    "category": "دورات الرياضة والسياحة",
    "summary": "دبلوم مهني يتناول أسس قطاع السياحة العالمي، وتخطيط وإدارة وتطوير الوجهات السياحية، والتسويق السياحي، وخدمات الزوار والمسافرين.",
    "howToGet": "إكمال كافة وحدات الدبلوم واجتياز التقييمات بنجاح في منصة Alison للحصول على شهادة الدبلوم المعتمدة من CPD.",
    "fields": [
      "إدارة السياحة",
      "التخطيط السياحي",
      "التسويق الفندقي والسياحي"
    ]
  },
  {
    "id": "sport-08",
    "title": "دبلوم في إدارة السياحة والضيافة (Diploma in Hospitality and Tourism Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-hospitality-and-tourism-management",
    "category": "دورات الرياضة والسياحة",
    "summary": "برنامج دبلوم متقدم في إدارة السياحة والضيافة، يشمل عمليات إدارة الفنادق والمنتجعات، وخدمات الأغذية والمشروبات، ومعايير الجودة وخدمة النزلاء.",
    "howToGet": "التسجيل في Alison وإتمام المسار التعليمي للدبلوم والتقييم الشامل للحصول على الشهادة الرسمية.",
    "fields": [
      "الإدارة الفندقية",
      "إدارة الضيافة",
      "السياحة والسفر"
    ]
  },
  {
    "id": "sport-09",
    "title": "إدارة السفر والعمليات السياحية (Travel and Tourism Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/travel-and-tourism-management",
    "category": "دورات الرياضة والسياحة",
    "summary": "تتناول إدارة وكالات ومكاتب السفر، وتصميم وتنظيم البرامج والجولات السياحية، وقنوات التوزيع وحجز التذاكر، وإدارة الأنشطة والفعاليات الترفيهية.",
    "howToGet": "دراسة مساقات الدورة واجتياز الاختبار على منصة Alison للحصول على شهادة إتمام معتمدة.",
    "fields": [
      "إدارة مكاتب السفر",
      "تنظيم الرحلات السياحية",
      "الخدمات اللوجستية السياحية"
    ]
  },
  {
    "id": "sport-10",
    "title": "مدخل إلى إدارة السياحة والضيافة (Introduction to Tourism and Hospitality Management)",
    "provider": "Alison",
    "url": "https://alison.com/course/introduction-to-tourism-and-hospitality-management",
    "category": "دورات الرياضة والسياحة",
    "summary": "تعريف شامل بأساسيات ومفاهيم قطاعي السياحة والضيافة، والمسارات والفرص الوظيفية المتاحة، وأصول تقديم تجربة عملاء فندقية وسياحية استثنائية.",
    "howToGet": "التسجيل المجاني في Alison وإكمال الفصول الدراسية والاختبار للحصول على الشهادة المعتمدة.",
    "fields": [
      "مبادئ السياحة والضيافة",
      "خدمة العملاء السياحية",
      "الإدارة الفندقية"
    ]
  },
  {
    "id": "sport-11",
    "title": "Comprehensive Guide to Defensive Driving",
    "provider": "Alison",
    "url": "https://alison.com/course/comprehensive-guide-to-defensive-driving",
    "category": "دورات الرياضة والسياحة",
    "summary": "تشرح مبادئ القيادة الوقائية والانتباه لمخاطر الطريق واتخاذ قرارات تقلل احتمالات الحوادث.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "التربية الرياضية",
      "التأهيل الرياضي",
      "السياحة والأنشطة الخارجية"
    ]
  },
  {
    "id": "sport-12",
    "title": "Diploma in Outdoor and Physical Education Studies Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/diploma-in-outdoor-and-physical-education-studies-revised",
    "category": "دورات الرياضة والسياحة",
    "summary": "تقدم موضوعات في التربية البدنية والأنشطة الخارجية ومبادئ النشاط والحركة ضمن السياقات التعليمية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "التربية الرياضية",
      "التأهيل الرياضي",
      "السياحة والأنشطة الخارجية"
    ]
  },
  {
    "id": "sport-13",
    "title": "Outdoor Education Adventure Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/outdoor-education-adventure-revised",
    "category": "دورات الرياضة والسياحة",
    "summary": "تتناول التعلم والأنشطة الخارجية والمغامرات التعليمية، مع الاهتمام بالتخطيط والسلامة واكتساب المهارات.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "التربية الرياضية",
      "التأهيل الرياضي",
      "السياحة والأنشطة الخارجية"
    ]
  },
  {
    "id": "sport-14",
    "title": "Physical Education Fitness Training Principles and Methods Revised",
    "provider": "Alison",
    "url": "https://alison.com/course/physical-education-fitness-training-principles-and-methods-revised",
    "category": "دورات الرياضة والسياحة",
    "summary": "تشرح مبادئ التربية البدنية واللياقة وطرق التدريب وتنظيم النشاط البدني بصورة تعليمية.",
    "howToGet": "التسجيل مجاناً في منصة Alison وإكمال وحدات الدورة واجتياز التقييم النهائي للحصول على شهادة إتمام رقمية.",
    "fields": [
      "التربية الرياضية",
      "التأهيل الرياضي",
      "السياحة والأنشطة الخارجية"
    ]
  }
];

export const certifications = courses;

export function getCoursesByIds(ids: string[]): Course[] {
  return ids
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is Course => c !== undefined);
}
export const getCertificationsByIds = getCoursesByIds;

export const courseProviders = Array.from(new Set(courses.map((c) => c.provider)));
export const certificationProviders = courseProviders;
