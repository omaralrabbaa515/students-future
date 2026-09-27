export type ScoutCategory =
  | "news_magazine"
  | "certifications"
  | "majors_market"
  | "admissions_cutoffs";

export interface ScoutPendingItem {
  id: string;
  category: ScoutCategory;
  categoryLabel: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  discoveredAt: string;
  confidenceScore: number; // e.g. 96 = 96%
  summary: string;
  details: {
    // For news_magazine:
    author?: string;
    readTime?: string;
    categoryTag?: string;
    keyTakeaways?: string[];
    content?: string[];
    sourceReference?: string;
    // For certifications:
    provider?: string;
    hours?: number;
    freeStatus?: boolean;
    certLevel?: string;
    directUrl?: string;
    domain?: string;
    // For majors_market:
    majorSlug?: string;
    field?: string;
    classification?: "مطلوب" | "مشبع" | "راكد";
    employmentRate?: string;
    risk?: "منخفض" | "متوسط" | "مرتفع";
    entrySalary?: number;
    experiencedSalary?: number;
    remoteWorkIndex?: "مرتفع" | "متوسط" | "نادر";
    gulfDemand?: "مرتفع" | "متوسط" | "محدود";
    // For admissions_cutoffs:
    university?: string;
    majorName?: string;
    cutoffGpa?: number;
    hourPriceCompetitive?: number;
    hourPriceParallel?: number;
  };
  status: "pending" | "approved" | "rejected";
}

export interface ScoutAgentConfig {
  activeCategories: ScoutCategory[];
  keywords: string[];
  crawlIntervalHours: number;
  autoAnalyzeDepth: "deep" | "fast";
  strictOfficialSourcesOnly: boolean;
  notifyOnNewFindings: boolean;
  lastRunAt: string | null;
  itemsFoundTotal: number;
}

export const DEFAULT_SCOUT_CONFIG: ScoutAgentConfig = {
  activeCategories: [
    "news_magazine",
    "certifications",
    "majors_market",
    "admissions_cutoffs",
  ],
  keywords: [
    "معدلات القبول التنافسي الأردن 2025 2026",
    "هيئة الخدمة والإدارة العامة التخصصات الراكدة والمطلوبة",
    "CS50 Harvard Free Certificate AI",
    "Google Professional Certificates Jordan free",
    "int@j رواتب وظائف تكنولوجيا المعلومات عمان",
    "وحدة تنسيق القبول الموحد الحدود الدنيا للجامعات الرسمية",
  ],
  crawlIntervalHours: 24,
  autoAnalyzeDepth: "deep",
  strictOfficialSourcesOnly: true,
  notifyOnNewFindings: true,
  lastRunAt: null,
  itemsFoundTotal: 6,
};

export const INITIAL_SCOUT_FINDINGS: ScoutPendingItem[] = [
  {
    id: "scout-item-1",
    category: "news_magazine",
    categoryLabel: "📰 مقال وتحليل للمجلة الخبيرية",
    title:
      "مجلس التعليم العالي يقر تخفيض القبول في التخصصات الراكدة بنسبة 50% وتوسيع مقاعد الذكاء الاصطناعي والأمن السيبراني",
    sourceName: "وزارة التعليم العالي والبحث العلمي — تصريح رسمي",
    sourceUrl: "https://mohe.gov.jo",
    discoveredAt: "اليوم 08:30 ص",
    confidenceScore: 98,
    summary:
      "قرار رسمي استراتيجي يهدف إلى إعادة هيكلة مقاعد الجامعات الأردنية عبر خفض نسب القبول في التخصصات التعليمية والإنسانية الراكدة وتوجيه الدعم المالي نحو التخصصات التقنية التطبيقية.",
    details: {
      author: "د. سفيان الهنداوي (خبير سياسات القبول الجامعي)",
      readTime: "5 دقائق",
      categoryTag: "قرارات التعليم العالي",
      sourceReference: "قرار مجلس التعليم العالي الأردني رقم 42/2025",
      keyTakeaways: [
        "خفض المقاعد المخصصة للتخصصات الراكدة في ديوان الخدمة بنسبة 50% لتقليل البطالة.",
        "استحداث 12 مساراً تطبيقياً جديداً في الجامعات الرسمية تركز على الحوسبة السحابية وأشباه الموصلات.",
        "تقديم حوافز مالية ومنح تغطي 30% من رسوم الساعات للتخصصات ذات الأولوية الوطنية.",
      ],
      content: [
        "في خطوة تاريخية لإصلاح منظومة التعليم العالي والحد من تراكم طلبات التوظيف في ديوان الخدمة المدنية، أقر مجلس التعليم العالي رسمياً حزمة قرارات لعام 2025/2026 تشمل تقليص الطاقة الاستيعابية للتخصصات الراكدة والمشبعة بنسبة 50%.",
        "تأتي هذه الخطوة بالتنسيق مع هيئة الخدمة والإدارة العامة والبنك الدولي، لتوجيه خريجي الثانوية العامة نحو تخصصات الثورة الصناعية الرابعة والشهادات المهنية العالمية.",
      ],
    },
    status: "pending",
  },
  {
    id: "scout-item-2",
    category: "certifications",
    categoryLabel: "🎓 شهادة عالمية مجانية معتمدة",
    title: "Google Cloud Computing Fundamentals — شهادة معتمدة مجانية 100% باللغة العربية والإنجليزية",
    sourceName: "Google Cloud Skills Boost & Grow with Google",
    sourceUrl: "https://cloud.google.com/training",
    discoveredAt: "اليوم 09:15 ص",
    confidenceScore: 99,
    summary:
      "مسار تعليمي تفاعلي كامل من Google يغطي أساسيات الحوسبة السحابية، إدارة البنى التحتية، ونماذج السحاب للشركات، مع شهادة إتمام رقمية معتمدة ومجانية بالكامل للطلبة الأردنيين.",
    details: {
      provider: "Google Cloud",
      hours: 32,
      freeStatus: true,
      certLevel: "مبتدئ إلى متوسط",
      directUrl: "https://cloud.google.com/training",
      domain: "الحوسبة السحابية والشبكات",
    },
    status: "pending",
  },
  {
    id: "scout-item-3",
    category: "majors_market",
    categoryLabel: "📊 تحديث تخصص ومؤشر سوق عمل",
    title: "تحديث مؤشرات: هندسة النظم المدمجة وإنترنت الأشياء (IoT & Embedded Systems)",
    sourceName: "جمعية شركات تقنية المعلومات (int@j) وموقع سجّل",
    sourceUrl: "https://intaj.net",
    discoveredAt: "أمس 04:45 م",
    confidenceScore: 95,
    summary:
      "قفزة في الطلب على مهندسي النظم المدمجة في قطاع صناعة السيارات الكهربائية والأجهزة الذكية في الأردن والخليج، مع تسجيل متوسط راتب بداية 650 دينار ونسبة تشغيل تتجاوز 84%.",
    details: {
      majorSlug: "iot-embedded-systems",
      field: "الهندسة الإلكترونية وتقنية المعلومات",
      classification: "مطلوب",
      employmentRate: "84% خلال أول 12 شهراً",
      risk: "منخفض",
      entrySalary: 650,
      experiencedSalary: 1800,
      remoteWorkIndex: "مرتفع",
      gulfDemand: "مرتفع",
    },
    status: "pending",
  },
  {
    id: "scout-item-4",
    category: "admissions_cutoffs",
    categoryLabel: "🏛️ معدلات قبول تنافسية رسمية",
    title: "تحديث الحدود الدنيا الرسمية: تخصص الأمن السيبراني وعلم التشفير في جامعة اليرموك",
    sourceName: "وحدة تنسيق القبول الموحد الأردنية",
    sourceUrl: "https://admhec.gov.jo",
    discoveredAt: "أمس 02:10 م",
    confidenceScore: 97,
    summary:
      "تثبيت الحد الأدنى التنافسي الرسمي للقبول في تخصص الأمن السيبراني بجامعة اليرموك عند 84.15% للفرع العلمي و 85.80% لفرع تكنولوجيا المعلومات، بسعر 35 دينار للساعة التنافسية.",
    details: {
      university: "جامعة اليرموك",
      majorName: "الأمن السيبراني والشبكات",
      cutoffGpa: 84.15,
      hourPriceCompetitive: 35,
      hourPriceParallel: 70,
    },
    status: "pending",
  },
  {
    id: "scout-item-5",
    category: "certifications",
    categoryLabel: "🎓 شهادة عالمية مجانية معتمدة",
    title: "IBM Full Stack Software Developer Career Certificate — منحة مجانية كاملة",
    sourceName: "IBM SkillsBuild & edX",
    sourceUrl: "https://skillsbuild.org",
    discoveredAt: "منذ يومين",
    confidenceScore: 94,
    summary:
      "منحة تدريبية كاملة من IBM تشمل 10 مقررات تغطي HTML, CSS, JavaScript, React, Node.js, Python, Django, و Microservices مع شارة رقمية رسمية معتمدة على LinkedIn.",
    details: {
      provider: "IBM SkillsBuild",
      hours: 60,
      freeStatus: true,
      certLevel: "متوسط إلى متقدم",
      directUrl: "https://skillsbuild.org",
      domain: "تطوير البرمجيات وتطبيقات الويب",
    },
    status: "pending",
  },
  {
    id: "scout-item-6",
    category: "news_magazine",
    categoryLabel: "📰 مقال وتحليل للمجلة الخبيرية",
    title: "خارطة رواتب المبرمجين في عمان 2026: لغات البرمجة الأعلى دخلاً ومقارنة العمل المحلي بالعمل عن بُعد",
    sourceName: "استطلاع رواتب قطاع الاتصالات الأردني 2026",
    sourceUrl: "https://sajjil.gov.jo",
    discoveredAt: "منذ يومين",
    confidenceScore: 96,
    summary:
      "دراسة استقصائية حصرية ترصد الفجوة بين متوسط الرواتب في الشركات المحلية (500 - 900 دينار) وعقود العمل عن بُعد مع شركات الخليج وأوروبا (1200 - 3000 دولار شهرياً) لخريجي الأردن.",
    details: {
      author: "م. ليث العبداللات (مستشار التوظيف التقني)",
      readTime: "7 دقائق",
      categoryTag: "رواتب وسوق العمل",
      sourceReference: "استطلاع رواتب قطاع التكنولوجيا الأردني 2026",
      keyTakeaways: [
        "بايثون وجافاسكريبت/تايب سكريبت وجو (Go) هي اللغات الأكثر طلباً في السوق الإقليمي.",
        "الشركات السعودية والإماراتية تستقطب أكثر من 40% من الكفاءات الأردنية بنظام العمل عن بُعد.",
        "الشهادات العالمية في بنك شهادات المنصة تزيد فرصة اجتياز المقابلة التقنية الأولى بنسبة 65%.",
      ],
      content: [
        "يشهد سوق التوظيف التقني في الأردن تحولاً غير مسبوق؛ حيث لم يعد الخريج محصوراً في سلم الرواتب المحلي الذي يتراوح لحديث التخرج بين 450 و 700 دينار.",
        "إن انفتاح شركات الخليج العربي على توظيف الكفاءات الأردنية عن بُعد خلق منافسة قوية رفعت متوسط أجور المطورين المتقنين لتقنيات السحاب والذكاء الاصطناعي.",
      ],
    },
    status: "pending",
  },
];
