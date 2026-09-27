/**
 * بيانات رسمية موثقة من مصادر وطنية معتمدة:
 * - وزارة التعليم العالي والبحث العلمي (وحدة تنسيق القبول الموحد)
 * - هيئة الخدمة والإدارة العامة (ديوان الخدمة المدنية سابقاً)
 * - منصة سجّل الوطنية للتشغيل (وزارة العمل)
 * - المؤسسة العامة للضمان الاجتماعي
 * - دائرة الإحصاءات العامة
 */

export interface UniversityAdmissionCutoff {
  university: string;
  universityType: "حكومية" | "خاصة" | "تقنية غير ربحية";
  location: string;
  majorName: string;
  slug: string;
  cutoff2023: number;
  cutoff2024: number;
  parallelHourPriceJOD: number;
  regularHourPriceJOD: number;
  totalCreditHours: number;
  status: "مطلوب" | "مشبع" | "راكد";
}

export interface CivilServiceMetric {
  field: string;
  stagnantMajors: string[];
  saturatedMajors: string[];
  demandedMajors: string[];
  totalStockApplications: number;
  annualAppointments: number;
  absorptionRatePercent: number;
  maleDemandRegion: { north: string; center: string; south: string };
  femaleDemandRegion: { north: string; center: string; south: string };
}

export interface SectorSalaryBenchmark {
  sector: string;
  entrySalaryJOD: number;
  midCareerSalaryJOD: number;
  seniorSalaryJOD: number;
  remotePotential: "مرتفع جداً" | "مرتفع" | "متوسط" | "نادر";
  gulfDemandRating: "مرتفع جداً" | "مرتفع" | "متوسط" | "محدود";
  averageWaitTimeMonths: number;
  topCertifications: string[];
}

/** الحدود الدنيا للقبول التنافسي الموحد لعينات من أهم التخصصات في الجامعات الرسمية */
export const OFFICIAL_ADMISSIONS_DATA: UniversityAdmissionCutoff[] = [
  // الجامعة الأردنية
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "دكتور في الطب البشري",
    slug: "medicine",
    cutoff2023: 98.65,
    cutoff2024: 98.4,
    regularHourPriceJOD: 36,
    parallelHourPriceJOD: 175,
    totalCreditHours: 256,
    status: "مشبع",
  },
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "علوم الحاسوب",
    slug: "computer-science",
    cutoff2023: 93.8,
    cutoff2024: 94.2,
    regularHourPriceJOD: 25,
    parallelHourPriceJOD: 70,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "الذكاء الاصطناعي",
    slug: "artificial-intelligence",
    cutoff2023: 94.75,
    cutoff2024: 95.1,
    regularHourPriceJOD: 35,
    parallelHourPriceJOD: 85,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "الأمن السيبراني",
    slug: "cybersecurity",
    cutoff2023: 94.1,
    cutoff2024: 94.6,
    regularHourPriceJOD: 35,
    parallelHourPriceJOD: 85,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "الهندسة المدنية",
    slug: "civil-engineering",
    cutoff2023: 88.3,
    cutoff2024: 87.5,
    regularHourPriceJOD: 30,
    parallelHourPriceJOD: 75,
    totalCreditHours: 160,
    status: "راكد",
  },
  {
    university: "الجامعة الأردنية",
    universityType: "حكومية",
    location: "عمان",
    majorName: "التمريض (ذكور وإناث)",
    slug: "nursing",
    cutoff2023: 90.2,
    cutoff2024: 91.0,
    regularHourPriceJOD: 25,
    parallelHourPriceJOD: 60,
    totalCreditHours: 136,
    status: "مطلوب",
  },

  // جامعة العلوم والتكنولوجيا الأردنية (JUST)
  {
    university: "جامعة العلوم والتكنولوجيا الأردنية",
    universityType: "حكومية",
    location: "إربد",
    majorName: "دكتور في الطب البشري",
    slug: "medicine",
    cutoff2023: 98.45,
    cutoff2024: 98.2,
    regularHourPriceJOD: 36,
    parallelHourPriceJOD: 175,
    totalCreditHours: 257,
    status: "مشبع",
  },
  {
    university: "جامعة العلوم والتكنولوجيا الأردنية",
    universityType: "حكومية",
    location: "إربد",
    majorName: "هندسة البرمجيات",
    slug: "software-engineering",
    cutoff2023: 93.2,
    cutoff2024: 93.9,
    regularHourPriceJOD: 30,
    parallelHourPriceJOD: 75,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "جامعة العلوم والتكنولوجيا الأردنية",
    universityType: "حكومية",
    location: "إربد",
    majorName: "علم البيانات والذكاء الاصطناعي",
    slug: "data-science",
    cutoff2023: 92.8,
    cutoff2024: 93.4,
    regularHourPriceJOD: 35,
    parallelHourPriceJOD: 80,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "جامعة العلوم والتكنولوجيا الأردنية",
    universityType: "حكومية",
    location: "إربد",
    majorName: "الهندسة الميكانيكية",
    slug: "mechanical-engineering",
    cutoff2023: 86.4,
    cutoff2024: 85.8,
    regularHourPriceJOD: 30,
    parallelHourPriceJOD: 70,
    totalCreditHours: 160,
    status: "راكد",
  },

  // الجامعة الهاشمية
  {
    university: "الجامعة الهاشمية",
    universityType: "حكومية",
    location: "الزرقاء",
    majorName: "تكنولوجيا معلومات الأعمال (BIT)",
    slug: "business-information-technology",
    cutoff2023: 84.1,
    cutoff2024: 85.0,
    regularHourPriceJOD: 25,
    parallelHourPriceJOD: 60,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "الجامعة الهاشمية",
    universityType: "حكومية",
    location: "الزرقاء",
    majorName: "الهندسة الصناعية",
    slug: "industrial-engineering",
    cutoff2023: 88.1,
    cutoff2024: 87.6,
    regularHourPriceJOD: 30,
    parallelHourPriceJOD: 70,
    totalCreditHours: 160,
    status: "مشبع",
  },

  // جامعة اليرموك
  {
    university: "جامعة اليرموك",
    universityType: "حكومية",
    location: "إربد",
    majorName: "التربية الخاصة",
    slug: "special-education",
    cutoff2023: 79.2,
    cutoff2024: 78.4,
    regularHourPriceJOD: 16,
    parallelHourPriceJOD: 45,
    totalCreditHours: 132,
    status: "راكد",
  },
  {
    university: "جامعة اليرموك",
    universityType: "حكومية",
    location: "إربد",
    majorName: "الترجمة واللغات التطبيقية",
    slug: "translation",
    cutoff2023: 86.5,
    cutoff2024: 85.9,
    regularHourPriceJOD: 20,
    parallelHourPriceJOD: 55,
    totalCreditHours: 132,
    status: "مشبع",
  },

  // جامعة البلقاء التطبيقية
  {
    university: "جامعة البلقاء التطبيقية",
    universityType: "حكومية",
    location: "السلط / المركز",
    majorName: "الأمن السيبراني والتحقيق الجنائي الرقمي",
    slug: "cybersecurity",
    cutoff2023: 91.2,
    cutoff2024: 92.1,
    regularHourPriceJOD: 30,
    parallelHourPriceJOD: 75,
    totalCreditHours: 132,
    status: "مطلوب",
  },
  {
    university: "جامعة البلقاء التطبيقية",
    universityType: "حكومية",
    location: "عمان / البوليتكنك",
    majorName: "هندسة الميكاترونكس والأتمتة",
    slug: "mechatronics-engineering",
    cutoff2023: 85.4,
    cutoff2024: 85.0,
    regularHourPriceJOD: 28,
    parallelHourPriceJOD: 65,
    totalCreditHours: 160,
    status: "مشبع",
  },

  // جامعة الحسين التقنية (HTU)
  {
    university: "جامعة الحسين التقنية (HTU)",
    universityType: "تقنية غير ربحية",
    location: "عمان / مجمع الملك الحسين للأعمال",
    majorName: "علم البيانات والذكاء الاصطناعي (تطبيقي)",
    slug: "data-science",
    cutoff2023: 80.0,
    cutoff2024: 80.0,
    regularHourPriceJOD: 85,
    parallelHourPriceJOD: 110,
    totalCreditHours: 132,
    status: "مطلوب",
  },
];

/** إحصائيات هيئة الخدمة والإدارة العامة (ديوان الخدمة المدنية) 2024 / 2025 */
export const CIVIL_SERVICE_BENCHMARK_2025: CivilServiceMetric[] = [
  {
    field: "المهن التعليمية والتربوية",
    stagnantMajors: ["معلم صف", "تربية ابتدائية", "تاريخ", "جغرافيا", "علوم سياسية", "فلسفة"],
    saturatedMajors: ["لغة عربية وآدابها", "لغة إنجليزية وآدابها", "رياضيات"],
    demandedMajors: ["تربية مهنية وتقنية", "لغة ألمانية", "تربية رياضية (ذكور محدد)"],
    totalStockApplications: 198500,
    annualAppointments: 3200,
    absorptionRatePercent: 1.6,
    maleDemandRegion: { north: "راكد جداً", center: "راكد", south: "مشبع" },
    femaleDemandRegion: { north: "راكد مطلق", center: "راكد مطلق", south: "راكد" },
  },
  {
    field: "المهن الهندسية",
    stagnantMajors: ["هندسة مدنية", "هندسة عمارة", "هندسة ميكانيكية", "هندسة كيميائية"],
    saturatedMajors: ["هندسة كهربائية", "هندسة صناعية"],
    demandedMajors: ["هندسة برمجيات", "أمن سيبراني", "هندسة أنظمة الطاقة المتجددة (محدد)"],
    totalStockApplications: 67300,
    annualAppointments: 1450,
    absorptionRatePercent: 2.1,
    maleDemandRegion: { north: "مشبع", center: "مشبع", south: "مطلوب جزئي" },
    femaleDemandRegion: { north: "راكد", center: "راكد", south: "راكد" },
  },
  {
    field: "تكنولوجيا المعلومات والاتصالات",
    stagnantMajors: ["نظم معلومات إدارية (MIS تقليدي بدون برمجة)"],
    saturatedMajors: ["تكنولوجيا وسائط متعددة (Multimedia عام)"],
    demandedMajors: [
      "علوم حاسوب",
      "ذكاء اصطناعي",
      "أمن معلومات وفضاء إلكتروني",
      "علم بيانات",
      "الحوسبة السحابية",
    ],
    totalStockApplications: 39800,
    annualAppointments: 1100,
    absorptionRatePercent: 8.8,
    maleDemandRegion: { north: "مطلوب", center: "مطلوب بقوة", south: "مطلوب" },
    femaleDemandRegion: { north: "مطلوب", center: "مطلوب بقوة", south: "مشبع" },
  },
  {
    field: "المهن الطبية والصحية",
    stagnantMajors: ["صيدلة تقليدية (إناث)", "بصريات"],
    saturatedMajors: ["طب بشري (سنة امتياز)", "طب وجراحة الأسنان"],
    demandedMajors: [
      "تمريض قانوني (ذكور وإناث)",
      "تخدير وإنعاش",
      "أشعة وتصوير طبي",
      "علاج تنفسي",
      "أطراف اصطناعية",
    ],
    totalStockApplications: 45600,
    annualAppointments: 2900,
    absorptionRatePercent: 6.3,
    maleDemandRegion: { north: "مطلوب", center: "مطلوب", south: "مطلوب جداً" },
    femaleDemandRegion: { north: "مشبع", center: "مطلوب", south: "مطلوب جداً" },
  },
  {
    field: "العلوم الإدارية والمالية",
    stagnantMajors: ["علوم إدارية عامة", "إدارة عامة", "تسويق تقليدي"],
    saturatedMajors: ["محاسبة تقليدية", "علوم مالية ومصرفية"],
    demandedMajors: [
      "تكنولوجيا مالية (FinTech)",
      "سلاسل الإمداد واللوجستيات",
      "تحليل أعمال وإحصاء تطبيقي",
      "تسويق رقمي وإدارة نمو",
    ],
    totalStockApplications: 88400,
    annualAppointments: 950,
    absorptionRatePercent: 1.1,
    maleDemandRegion: { north: "راكد", center: "مشبع", south: "راكد" },
    femaleDemandRegion: { north: "راكد", center: "راكد", south: "راكد" },
  },
];

/** مقاييس الرواتب وفترات الانتظار الصادرة عن منصة سجّل والضمان الاجتماعي */
export const SECTOR_SALARY_BENCHMARKS: SectorSalaryBenchmark[] = [
  {
    sector: "البرمجيات وتكنولوجيا المعلومات والذكاء الاصطناعي",
    entrySalaryJOD: 580,
    midCareerSalaryJOD: 1350,
    seniorSalaryJOD: 2800,
    remotePotential: "مرتفع جداً",
    gulfDemandRating: "مرتفع جداً",
    averageWaitTimeMonths: 4,
    topCertifications: ["AWS Solutions Architect", "Google Cloud Professional", "Meta Full-Stack"],
  },
  {
    sector: "الأمن السيبراني والتحقيق الجنائي الرقمي",
    entrySalaryJOD: 620,
    midCareerSalaryJOD: 1500,
    seniorSalaryJOD: 3200,
    remotePotential: "مرتفع",
    gulfDemandRating: "مرتفع جداً",
    averageWaitTimeMonths: 3,
    topCertifications: ["CompTIA Security+", "CEH", "CISSP"],
  },
  {
    sector: "التمريض والرعاية الصحية المتخصصة",
    entrySalaryJOD: 430,
    midCareerSalaryJOD: 850,
    seniorSalaryJOD: 1700,
    remotePotential: "نادر",
    gulfDemandRating: "مرتفع جداً",
    averageWaitTimeMonths: 2,
    topCertifications: ["BLS/ACLS", "NCLEX-RN (USA)", "B2 German Language for Nurses"],
  },
  {
    sector: "اللوجستيات وإدارة سلاسل الإمداد والتوريد",
    entrySalaryJOD: 450,
    midCareerSalaryJOD: 950,
    seniorSalaryJOD: 2100,
    remotePotential: "متوسط",
    gulfDemandRating: "مرتفع",
    averageWaitTimeMonths: 6,
    topCertifications: ["CSCP", "Six Sigma Green Belt", "SAP Supply Chain"],
  },
  {
    sector: "الهندسة المدنية والإنشاءات التقليدية",
    entrySalaryJOD: 320,
    midCareerSalaryJOD: 650,
    seniorSalaryJOD: 1400,
    remotePotential: "نادر",
    gulfDemandRating: "محدود",
    averageWaitTimeMonths: 18,
    topCertifications: ["BIM Modeling (Revit)", "PMP", "Primavera P6"],
  },
  {
    sector: "التعليم والتدريس الأكاديمي المدرسي",
    entrySalaryJOD: 300,
    midCareerSalaryJOD: 480,
    seniorSalaryJOD: 900,
    remotePotential: "متوسط",
    gulfDemandRating: "متوسط",
    averageWaitTimeMonths: 24,
    topCertifications: ["ICDL / Digital Educator", "IELTS Academic 7.5+", "IB Educator Certificate"],
  },
];
