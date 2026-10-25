import { majors, type Major } from "@/data/majors";
import { certifications, type Certification } from "@/data/certifications";
import { universities, type University } from "@/data/universities";
import {
  OFFICIAL_ADMISSIONS_DATA,
  CIVIL_SERVICE_BENCHMARK_2025,
  SECTOR_SALARY_BENCHMARKS,
  type SectorSalaryBenchmark,
  type CivilServiceMetric,
} from "@/data/official-market-stats";

/** تطبيع النص العربي للبحث المرن وفهم اللهجة الأردنية والعربية الفصحى */
export function normalizeArabic(text: string): string {
  return text
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // إزالة التشكيل
    .replace(/[؟?!.,،؛:"'()[\]{}-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** ربط حقول التخصصات الـ 13 بالتصنيفات الحصرية للشهادات والدورات المعتمدة */
const FIELD_TO_CERT_CATEGORY: Record<string, string> = {
  "الكليات الطبية والصحية": "الدورات الطبية والصحية",
  "الكليات الهندسية": "الدورات الهندسية",
  "كليات تكنولوجيا المعلومات والذكاء الاصطناعي": "دورات التكنولوجيا والذكاء الاصطناعي",
  "الكليات الإدارية والاقتصادية والمالية": "الدورات الادارية والاقتصادية والمالية",
  "كليات حقوق وقانون": "دورات الحقوق والقانون",
  "كليات الإعلام والاتصال": "دورات الاعلام والاتصال",
  "كليات الفنون والتصميم": "دورات الفنون والتصميم",
  "كليات الأدب واللغات والعلوم الإنسانية": "دورات الادب واللغات والعلوم الانسانية",
  "كليات الشريعة والدراسات الإسلامية": "دورات الشريعة والدراسات الاسلامية",
  "كليات العلوم الأساسية والتطبيقية": "دورات العلوم الاساسية والتطبيقية",
  "كليات التربية والعلوم التربوية": "دورات التربية مع العلوم التربوية",
  "كليات الرياضة والسياحة": "دورات الرياضة والسياحة",
  "كليات الزراعة والبيئة": "دورات الزراعة والبيئة",
};

/** الكشف الدقيق عن المجال أو القطاع الأكاديمي */
export function detectMajorField(query: string): string | null {
  const norm = normalizeArabic(query);

  if (
    norm.includes("طبي") ||
    norm.includes("الطب") ||
    /\bطب\b/.test(norm) ||
    norm.includes("صحي") ||
    norm.includes("صيدل") ||
    norm.includes("تمريض") ||
    norm.includes("اسنان") ||
    norm.includes("علاج طبيعي") ||
    norm.includes("علاج وظيفي") ||
    norm.includes("اشعه") ||
    norm.includes("مختبرات") ||
    norm.includes("تحاليل") ||
    norm.includes("بصريات") ||
    norm.includes("قباله") ||
    norm.includes("تخدير") ||
    norm.includes("سمع ونطق")
  ) {
    return "الكليات الطبية والصحية";
  }

  if (
    norm.includes("ذكاء اصطناعي") ||
    norm.includes("امن سيبراني") ||
    norm.includes("سيبراني") ||
    norm.includes("سايبر") ||
    norm.includes("برمج") ||
    norm.includes("حاسوب") ||
    norm.includes("حوسب") ||
    norm.includes("كمبيوتر") ||
    norm.includes("علم بيانات") ||
    norm.includes("تكنولوجيا المعلومات") ||
    norm.includes("تقنيه المعلومات") ||
    norm.includes("اي تي") ||
    /\b(ai|it|cs|cyber|software|data)\b/i.test(query)
  ) {
    return "كليات تكنولوجيا المعلومات والذكاء الاصطناعي";
  }

  if (
    norm.includes("هندس") ||
    norm.includes("مدني") ||
    norm.includes("ميكانيك") ||
    norm.includes("كهرباء") ||
    norm.includes("معماري") ||
    norm.includes("عماره") ||
    norm.includes("ميكاترونكس") ||
    norm.includes("طاقه متجدده") ||
    norm.includes("طيران") ||
    norm.includes("صناعيه")
  ) {
    return "الكليات الهندسية";
  }

  if (
    norm.includes("اداره اعمال") ||
    norm.includes("محاسب") ||
    norm.includes("تمويل") ||
    norm.includes("تسويق") ||
    norm.includes("اقتصاد") ||
    norm.includes("ماليه") ||
    norm.includes("اعمال") ||
    norm.includes("بنوك") ||
    norm.includes("لوجست") ||
    norm.includes("سلاسل امداد") ||
    norm.includes("تكنولوجيا ماليه")
  ) {
    return "الكليات الإدارية والاقتصادية والمالية";
  }

  if (
    norm.includes("حقوق") ||
    norm.includes("قانون") ||
    norm.includes("محاماه") ||
    norm.includes("قضائ")
  ) {
    return "كليات حقوق وقانون";
  }

  if (
    norm.includes("اعلام") ||
    norm.includes("صحاف") ||
    norm.includes("اذاع") ||
    norm.includes("تلفزيون") ||
    norm.includes("علاقات عامه")
  ) {
    return "كليات الإعلام والاتصال";
  }

  if (
    norm.includes("فنون") ||
    norm.includes("تصميم") ||
    norm.includes("جرافيك") ||
    norm.includes("ديكور") ||
    norm.includes("داخلي") ||
    norm.includes("سينما") ||
    norm.includes("انيميشن")
  ) {
    return "كليات الفنون والتصميم";
  }

  const isLiteraryStream =
    norm.includes("فرع ادبي") ||
    norm.includes("الفرع الادبي") ||
    norm.includes("توجيهي ادبي") ||
    norm.includes("لفرع الادبي") ||
    norm.includes("للادبي") ||
    norm.includes("بالادبي") ||
    norm === "ادبي" ||
    norm === "الادبي";

  if (
    !isLiteraryStream &&
    (norm.includes("لغات") ||
      norm.includes("ترجم") ||
      norm.includes("انجليزي") ||
      norm.includes("اداب") ||
      norm.includes("ادب عربي") ||
      norm.includes("ادب انجليزي") ||
      (norm.includes("الماني") && !norm.includes("الجامعه الالمانيه")) ||
      norm.includes("فرنسي"))
  ) {
    return "كليات الأدب واللغات والعلوم الإنسانية";
  }

  if (
    norm.includes("شريع") ||
    norm.includes("فقه") ||
    norm.includes("اسلامي") ||
    norm.includes("اصول دين")
  ) {
    return "كليات الشريعة والدراسات الإسلامية";
  }

  if (
    norm.includes("تربي") ||
    norm.includes("معلم صف") ||
    norm.includes("طفول") ||
    norm.includes("تربوي") ||
    norm.includes("ارشاد نفسي")
  ) {
    return "كليات التربية والعلوم التربوية";
  }

  if (
    norm.includes("رياضه") ||
    norm.includes("تاهيل رياضي") ||
    norm.includes("سياح") ||
    norm.includes("فندق")
  ) {
    return "كليات الرياضة والسياحة";
  }

  if (
    norm.includes("زراع") ||
    norm.includes("نبات") ||
    norm.includes("بيئ") ||
    norm.includes("تغذيه")
  ) {
    return "كليات الزراعة والبيئة";
  }

  if (
    norm.includes("فيزياء") ||
    norm.includes("كيمياء") ||
    norm.includes("رياضيات") ||
    norm.includes("احياء") ||
    norm.includes("جيولوجيا")
  ) {
    return "كليات العلوم الأساسية والتطبيقية";
  }

  return null;
}

/** استخراج الشهادات الاحترافية المجانية المعتمدة لمجال معين */
export function getCertificationsForField(fieldName: string): Certification[] {
  const targetCategory = FIELD_TO_CERT_CATEGORY[fieldName];
  if (targetCategory) {
    const list = certifications.filter((c) => c.category === targetCategory);
    if (list.length > 0) return list;
  }
  return certifications.slice(0, 3);
}

/** استخراج الشهادات الاحترافية للتخصص مع الالتزام بمجاله */
export function getCertificationsForMajor(major: Major): Certification[] {
  const fieldCerts = getCertificationsForField(major.field);
  const targetCategory = FIELD_TO_CERT_CATEGORY[major.field];

  const linked = certifications.filter(
    (c) =>
      major.certificationIds.includes(c.id) &&
      (!targetCategory || c.category === targetCategory),
  );
  if (linked.length > 0) return linked.slice(0, 3);

  return fieldCerts.slice(0, 3);
}

const UNIVERSITY_KEYWORDS: { words: string[]; id: string }[] = [
  { words: ["الاردنيه", "الجامعه الاردنيه", "ام الجامعات", "uj"], id: "uj" },
  { words: ["التكنو", "تكنو", "العلوم والتكنولوجيا", "just"], id: "just" },
  { words: ["الهاشميه", "الجامعه الهاشميه", "hu"], id: "hu" },
  { words: ["الالمانيه", "الالمانيه الاردنيه", "gju"], id: "gju" },
  { words: ["اليرموك", "جامعه اليرموك", "yu"], id: "yu" },
  { words: ["البلقاء", "البلقاء التطبيقيه", "بوليتكنك", "السلط", "bau"], id: "bau" },
  { words: ["موته", "جامعه موته", "الجناح العسكري", "mutah"], id: "mutah" },
  { words: ["ال البيت", "جامعه ال البيت", "المفرق", "aabu"], id: "aabu" },
  { words: ["الحسين بن طلال", "جامعه الحسين", "معان", "ahu"], id: "ahu" },
  { words: ["الطفيله", "الطفيله التقنيه", "ttu"], id: "ttu" },
  { words: ["سميه", "الاميره سميه", "psut"], id: "psut" },
  { words: ["العلوم التطبيقيه", "التطبيقيه الخاصه", "التطبيقيه", "asu"], id: "asu" },
  { words: ["البترا", "البتراء", "جامعه البترا", "uop"], id: "uop" },
  { words: ["عمان الاهليه", "الاهليه", "aau"], id: "aau" },
  { words: ["الزيتونه", "الزيتونه الاردنيه", "zuj"], id: "zuj" },
  { words: ["الشرق الاوسط", "meu"], id: "meu" },
  { words: ["فيلادلفيا", "philadelphia"], id: "philadelphia" },
  { words: ["الاسراء", "جامعه الاسراء", "isra"], id: "isra" },
  { words: ["العقبه", "العقبه للتكنولوجيا", "aut"], id: "aut" },
];

/** العثور على جميع الجامعات المذكورة في الاستعلام */
export function findMentionedUniversities(query: string): University[] {
  const normQuery = normalizeArabic(query);
  const found: University[] = [];
  const foundIds = new Set<string>();

  for (const item of UNIVERSITY_KEYWORDS) {
    if (item.words.some((w) => normQuery.includes(normalizeArabic(w)))) {
      if (!foundIds.has(item.id)) {
        const u = universities.find((x) => x.id === item.id);
        if (u) {
          found.push(u);
          foundIds.add(item.id);
        }
      }
    }
  }

  return found;
}

export function findMatchingUniversity(query: string): University | undefined {
  const list = findMentionedUniversities(query);
  if (list.length > 0) return list[0];

  const normQuery = normalizeArabic(query);
  return universities.find((u) => {
    const normName = normalizeArabic(u.name);
    return normQuery.includes(normName) || (normQuery.length > 5 && normName.includes(normQuery));
  });
}

/** خريطة المرادفات والكلمات المفتاحية للتخصصات (للكشف عن تخصص واحد أو عدة تخصصات للمقارنة) */
const MAJOR_KEYWORD_MAP: { words: string[]; slugs: string[] }[] = [
  {
    words: ["ذكاء اصطناعي", "الذكاء الاصطناعي", "علم بيانات", "علم البيانات", "data science", "artificial intelligence"],
    slugs: ["data-science-ai", "artificial-intelligence", "data-science"],
  },
  {
    words: ["امن سيبراني", "الامن السيبراني", "سيبراني", "سايبر", "امن معلومات", "cybersecurity", "cyber security"],
    slugs: ["cybersecurity"],
  },
  {
    words: ["هندسه برمجيات", "هندسه البرمجيات", "برمجيات", "سوفتوير", "software engineering"],
    slugs: ["software-engineering"],
  },
  {
    words: ["علوم حاسوب", "علوم الحاسوب", "علم حاسوب", "كمبيوتر ساينس", "computer science"],
    slugs: ["computer-science"],
  },
  {
    words: ["نظم معلومات اداريه", "نظم المعلومات الاداريه", "mis"],
    slugs: ["management-information-systems", "cis"],
  },
  {
    words: ["نظم معلومات حاسوبيه", "نظم المعلومات الحاسوبيه", "cis"],
    slugs: ["cis", "computer-science"],
  },
  {
    words: ["تكنولوجيا معلومات الاعمال", "bit"],
    slugs: ["business-information-technology", "management-information-systems"],
  },
  {
    words: ["طب بشري", "الطب البشري", "دكتور طب", "كليه الطب", "دراسه الطب", "تخصص الطب", "medicine"],
    slugs: ["medicine"],
  },
  {
    words: ["طب اسنان", "طب الاسنان", "جراحه اسنان", "اسنان", "dentistry"],
    slugs: ["dentistry"],
  },
  {
    words: ["دكتور صيدله", "فارم دي", "pharmd", "pharm-d"],
    slugs: ["pharm-d", "pharmacy"],
  },
  {
    words: ["صيدله", "الصيدله", "كليه الصيدله", "pharmacy"],
    slugs: ["pharmacy"],
  },
  {
    words: ["تمريض", "التمريض", "ممرض", "كليه التمريض", "nursing"],
    slugs: ["nursing"],
  },
  {
    words: ["هندسه حاسوب", "هندسه الحاسوب", "computer engineering"],
    slugs: ["computer-engineering"],
  },
  {
    words: ["هندسه شبكات", "شبكات الحاسوب", "امن وشبكات"],
    slugs: ["computer-networks", "cybersecurity"],
  },
  {
    words: ["هندسه مدنيه", "الهندسه المدنيه", "هندسه مدني", "مدني", "civil engineering"],
    slugs: ["civil-engineering"],
  },
  {
    words: ["هندسه ميكانيك", "الهندسه الميكانيكيه", "ميكانيك", "mechanical engineering"],
    slugs: ["mechanical-engineering"],
  },
  {
    words: ["هندسه كهرباء", "هندسه كهربائيه", "الهندسه الكهربائيه", "electrical engineering"],
    slugs: ["electrical-engineering"],
  },
  {
    words: ["ميكاترونكس", "هندسه ميكاترونكس", "mechatronics"],
    slugs: ["mechatronics-engineering", "mechatronics"],
  },
  {
    words: ["هندسه صناعيه", "الهندسه الصناعيه", "industrial engineering"],
    slugs: ["industrial-engineering"],
  },
  {
    words: ["هندسه معماريه", "الهندسه المعماريه", "عماره", "هندسه عماره", "architecture"],
    slugs: ["architecture"],
  },
  {
    words: ["طاقه متجدده", "هندسه الطاقه", "الطاقه المتجدده", "renewable energy"],
    slugs: ["renewable-energy-engineering", "renewable-energy"],
  },
  {
    words: ["هندسه طبيه", "اجهزه طبيه", "الهندسه الطبيه الحيويه", "biomedical"],
    slugs: ["biomedical-engineering"],
  },
  {
    words: ["علاج طبيعي", "العلاج الطبيعي", "physiotherapy", "physical therapy"],
    slugs: ["physical-therapy", "rehabilitation-sciences"],
  },
  {
    words: ["علاج وظيفي", "العلاج الوظيفي", "occupational therapy"],
    slugs: ["occupational-therapy", "rehabilitation-sciences"],
  },
  {
    words: ["اشعه", "تصوير اشعاعي", "الاشعه", "تكنولوجيا الاشعه", "radiology"],
    slugs: ["radiology", "medical-imaging"],
  },
  {
    words: ["مختبرات طبيه", "المختبرات الطبيه", "تحاليل طبيه", "التحاليل الطبيه"],
    slugs: ["medical-laboratories", "medical-laboratory-sciences"],
  },
  {
    words: ["تخدير", "التخدير والانعاش", "فني تخدير"],
    slugs: ["anesthesia-resuscitation", "nursing"],
  },
  {
    words: ["سمع ونطق", "السمع والنطق"],
    slugs: ["speech-and-hearing", "rehabilitation-sciences"],
  },
  {
    words: ["تغذيه", "التغذيه والحميات", "تغذيه سريريه"],
    slugs: ["clinical-nutrition", "nutrition"],
  },
  {
    words: ["محاسبه", "المحاسبه", "محاسب", "accounting"],
    slugs: ["accounting"],
  },
  {
    words: ["اداره اعمال", "اداره الاعمال", "business administration"],
    slugs: ["business-administration"],
  },
  {
    words: ["تسويق رقمي", "التسويق الرقمي", "تسويق الكتروني", "digital marketing"],
    slugs: ["digital-marketing", "marketing"],
  },
  {
    words: ["تكنولوجيا ماليه", "الفنتك", "fintech"],
    slugs: ["fintech", "finance-banking", "finance"],
  },
  {
    words: ["تمويل", "العلوم الماليه والمصرفيه", "ماليه ومصرفيه", "بنوك", "finance"],
    slugs: ["finance", "finance-banking"],
  },
  {
    words: ["لوجستيات", "العلوم اللوجستيه", "سلاسل الامداد", "logistics", "supply chain"],
    slugs: ["logistics-supply-chain", "business-administration"],
  },
  {
    words: ["حقوق", "قانون", "القانون", "المحاماه", "كليه الحقوق", "law"],
    slugs: ["law"],
  },
  {
    words: ["تصميم داخلي", "الديكور", "التصميم الداخلي"],
    slugs: ["interior-design", "graphic-design"],
  },
  {
    words: ["تصميم جرافيكي", "الجرافيك", "التصميم الجرافيكي", "جرافيك ديزاين", "وسائط متعدده"],
    slugs: ["graphic-design", "multimedia-design"],
  },
  {
    words: ["اعلام", "الاعلام الرقمي", "الصحافه والاعلام", "صحافه"],
    slugs: ["digital-media", "journalism-media"],
  },
  {
    words: ["لغه انجليزيه", "اللغه الانجليزيه", "ادب انجليزي", "ترجمه", "انجليزي وترجمه"],
    slugs: ["english-language-and-literature", "translation-applied-languages", "english-translation"],
  },
  {
    words: ["لغه عربيه", "اللغه العربيه", "ادب عربي"],
    slugs: ["arabic-language-and-literature", "arabic-literature"],
  },
  {
    words: ["معلم صف", "تربيه خاصه", "التربيه الخاصه", "ارشاد نفسي", "تربيه طفل"],
    slugs: ["class-teacher-education", "special-education", "education-class-teacher"],
  },
  {
    words: ["شريعه", "اصول الدين", "الفقه واصوله", "مصارف اسلاميه"],
    slugs: ["sharia-islamic-studies"],
  },
  {
    words: ["رياضيات", "تخصص الرياضيات"],
    slugs: ["mathematics"],
  },
  {
    words: ["فيزياء", "تخصص الفيزياء"],
    slugs: ["physics"],
  },
  {
    words: ["كيمياء", "تخصص الكيمياء"],
    slugs: ["chemistry"],
  },
  {
    words: ["احياء", "علوم حياتيه", "التكنولوجيا الحيويه"],
    slugs: ["biology-biotechnology", "biology"],
  },
];

/** استخراج كافة التخصصات المذكورة في النص (مهم جداً للمقارنة بين تخصصين!) */
export function findMentionedMajors(query: string): Major[] {
  const normQuery = normalizeArabic(query);
  const found: Major[] = [];
  const seenSlugs = new Set<string>();

  const addMajor = (m: Major | undefined) => {
    if (m && !seenSlugs.has(m.slug)) {
      seenSlugs.add(m.slug);
      found.push(m);
    }
  };

  // 1. البحث عبر خريطة الكلمات المفتاحية والمرادفات
  for (const item of MAJOR_KEYWORD_MAP) {
    if (item.words.some((w) => normQuery.includes(normalizeArabic(w)))) {
      for (const candidateSlug of item.slugs) {
        const m = majors.find((x) => x.slug === candidateSlug);
        if (m) {
          addMajor(m);
          break;
        }
      }
    }
  }

  // 2. البحث المباشر في قائمة الـ 143 تخصصاً
  for (const m of majors) {
    const normName = normalizeArabic(m.name);
    const shortName = normName.replace(/^تخصص /, "").replace(/^ال/, "");
    if (
      normQuery.includes(normName) ||
      (shortName.length >= 5 && normQuery.includes(shortName))
    ) {
      addMajor(m);
    }
  }

  // حالة خاصة إذا كتب "الطب" أو "طب" بدون "أسنان" أو "بيطري"
  if (
    found.length === 0 &&
    /\b(الطب|طب)\b/.test(normQuery) &&
    !normQuery.includes("اسنان") &&
    !normQuery.includes("بيطري") &&
    !normQuery.includes("طبيعي") &&
    !normQuery.includes("طبيه")
  ) {
    addMajor(majors.find((x) => x.slug === "medicine"));
  }

  return found;
}

/** العثور على أفضل تخصص مطابق */
export function findBestMatchingMajor(query: string): Major | undefined {
  const list = findMentionedMajors(query);
  return list[0];
}

/** ذاكرة السياق الحواري متعدد الأدوار (Multi-Turn Conversation Memory) */
export interface ConversationMemory {
  activeMajor?: Major;
  secondMajor?: Major;
  activeUniversity?: University;
  secondUniversity?: University;
  activeSector?: string;
  studentGrade?: number;
  studentStream?: "علمي" | "أدبي" | "صناعي" | "شرعي" | "فندقي";
  previousAssistantText?: string;
  turnCount: number;
}

/** استخراج نص الرسالة من كائن الرسالة بغض النظر عن هيكلها */
function extractMessageText(msg: unknown): { role: string; text: string } {
  if (!msg || typeof msg !== "object") return { role: "", text: "" };
  const rec = msg as Record<string, unknown>;
  const role = typeof rec["role"] === "string" ? rec["role"] : "";

  if (Array.isArray(rec["parts"])) {
    const text = (rec["parts"] as unknown[])
      .map((p) => {
        if (p && typeof p === "object" && (p as Record<string, unknown>)["type"] === "text") {
          return String((p as Record<string, unknown>)["text"] ?? "");
        }
        return "";
      })
      .join(" ")
      .trim();
    return { role, text };
  }

  if (typeof rec["content"] === "string") {
    return { role, text: rec["content"].trim() };
  }

  return { role, text: "" };
}

/** استخراج معدل التوجيهي من النص (يدعم حتى كتابة الرقم وحده مثل "85" أو "92.4 علمي") */
export function extractGradeFromText(text: string, allowBareNumber = false): number | undefined {
  const norm = normalizeArabic(text);

  // نمط صريح: "معدلي 85"، "جبت 91.5"، "علامتي 78"
  const explicitMatch = norm.match(
    /(?:معدلي|معدل|جبت|علامتي|حصلت علي|توجيهي|نسبتي)\s*(?:في التوجيهي|بالتوجيهي|هو|تقريبا|حوالي)?\s*([5-9]\d(?:\.\d+)?|100)/,
  );
  if (explicitMatch && explicitMatch[1]) {
    return parseFloat(explicitMatch[1]);
  }

  // نمط مع الفرع: "85 علمي"، "78 ادبي"، "94%"
  const branchOrPercentMatch = norm.match(
    /\b([5-9]\d(?:\.\d+)?)\s*(?:%|بالميه|علمي|ادبي|صناعي|شرعي|فندقي|توجيهي)\b/,
  );
  if (branchOrPercentMatch && branchOrPercentMatch[1]) {
    return parseFloat(branchOrPercentMatch[1]);
  }

  // إذا كان الرد قصيراً جداً ويحتوي على رقم معدل (مثلاً سأله المستشار "كم معدلك؟" فأجاب الطالب: "86" أو "انا 84")
  if (allowBareNumber && norm.length <= 28) {
    const bareMatch = norm.match(/\b([5-9]\d(?:\.\d+)?)\b/);
    if (bareMatch && bareMatch[1]) {
      const val = parseFloat(bareMatch[1]);
      if (val >= 50 && val <= 100) return val;
    }
  }

  return undefined;
}

/** استخراج فرع الثانوية العامة */
function extractStreamFromText(
  text: string,
): "علمي" | "أدبي" | "صناعي" | "شرعي" | "فندقي" | undefined {
  const norm = normalizeArabic(text);
  if (norm.includes("علمي") || norm.includes("العلمي")) return "علمي";
  if (norm.includes("ادبي") || norm.includes("الادبي")) return "أدبي";
  if (norm.includes("صناعي") || norm.includes("الصناعي")) return "صناعي";
  if (norm.includes("شرعي") || norm.includes("الشرعي")) return "شرعي";
  if (norm.includes("فندقي") || norm.includes("الفندقي")) return "فندقي";
  return undefined;
}

/** بناء ذاكرة المحادثة الذكية من سجل الرسائل */
export function buildConversationMemory(
  currentQuery: string,
  rawMessages?: unknown[],
): ConversationMemory {
  const memory: ConversationMemory = { turnCount: 1 };

  if (Array.isArray(rawMessages) && rawMessages.length > 0) {
    const userMessages: string[] = [];
    let lastAssistant = "";

    for (let i = 0; i < rawMessages.length; i++) {
      const { role, text } = extractMessageText(rawMessages[i]);
      if (!text) continue;

      if (role === "user") {
        userMessages.push(text);
        const mList = findMentionedMajors(text);
        if (mList.length >= 2) {
          memory.activeMajor = mList[0];
          memory.secondMajor = mList[1];
        } else if (mList.length === 1) {
          if (memory.activeMajor && memory.activeMajor.slug !== mList[0].slug) {
            memory.secondMajor = memory.activeMajor;
          }
          memory.activeMajor = mList[0];
        }

        const uList = findMentionedUniversities(text);
        if (uList.length >= 2) {
          memory.activeUniversity = uList[0];
          memory.secondUniversity = uList[1];
        } else if (uList.length === 1) {
          if (memory.activeUniversity && memory.activeUniversity.id !== uList[0].id) {
            memory.secondUniversity = memory.activeUniversity;
          }
          memory.activeUniversity = uList[0];
        }

        const sec = detectMajorField(text);
        if (sec) memory.activeSector = sec;

        const grade = extractGradeFromText(text, i > 0);
        if (grade !== undefined) memory.studentGrade = grade;

        const stream = extractStreamFromText(text);
        if (stream) memory.studentStream = stream;
      } else if (role === "assistant") {
        lastAssistant = text;
        // إذا لم يُلتقط التخصص من سؤال المستخدم القصير، التقطه من آخر رد للمستشار
        if (!memory.activeMajor) {
          const assistantMajors = findMentionedMajors(text.slice(0, 350));
          if (assistantMajors.length > 0) {
            memory.activeMajor = assistantMajors[0];
          }
        }
      }
    }

    memory.turnCount = userMessages.length;
    memory.previousAssistantText = lastAssistant;
  }

  // تحديث الذاكرة بأحدث رسالة حالية
  const currentMajors = findMentionedMajors(currentQuery);
  if (currentMajors.length >= 2) {
    memory.activeMajor = currentMajors[0];
    memory.secondMajor = currentMajors[1];
  } else if (currentMajors.length === 1) {
    if (memory.activeMajor && memory.activeMajor.slug !== currentMajors[0].slug) {
      memory.secondMajor = memory.activeMajor;
    }
    memory.activeMajor = currentMajors[0];
  }

  const currentUnis = findMentionedUniversities(currentQuery);
  if (currentUnis.length >= 2) {
    memory.activeUniversity = currentUnis[0];
    memory.secondUniversity = currentUnis[1];
  } else if (currentUnis.length === 1) {
    if (memory.activeUniversity && memory.activeUniversity.id !== currentUnis[0].id) {
      memory.secondUniversity = memory.activeUniversity;
    }
    memory.activeUniversity = currentUnis[0];
  }

  const currentSec = detectMajorField(currentQuery);
  if (currentSec) memory.activeSector = currentSec;
  else if (memory.activeMajor && !memory.activeSector) {
    memory.activeSector = memory.activeMajor.field;
  }

  const currentGrade = extractGradeFromText(currentQuery, true);
  if (currentGrade !== undefined) memory.studentGrade = currentGrade;

  const currentStream = extractStreamFromText(currentQuery);
  if (currentStream) memory.studentStream = currentStream;

  return memory;
}

/** الحصول على بيانات الرواتب القطاعية المطابقة للتخصص أو المجال */
function getSalaryBenchmarkForMajorOrField(
  major?: Major,
  field?: string,
): {
  entryJOD: number;
  midJOD: number;
  seniorJOD: number;
  gulfRangeSAR: string;
  remoteUSD: string;
  remotePotential: string;
  gulfDemand: string;
  waitMonths: number;
  notes: string;
} {
  const slug = major?.slug || "";
  const targetField = major?.field || field || "";

  if (slug === "cybersecurity") {
    const b = SECTOR_SALARY_BENCHMARKS[1]!;
    return {
      entryJOD: b.entrySalaryJOD,
      midJOD: b.midCareerSalaryJOD,
      seniorJOD: b.seniorSalaryJOD,
      gulfRangeSAR: "12,000 – 28,000 ريال سعودي (أو درهم إماراتي)",
      remoteUSD: "$1,800 – $4,500 شهرياً للشركات العالمية",
      remotePotential: b.remotePotential,
      gulfDemand: b.gulfDemandRating,
      waitMonths: b.averageWaitTimeMonths,
      notes: "البنوك الأردنية، شركات الاتصالات، المركز الوطني للأمن السيبراني، وشركات الاستشارات الأمنية هي الأعلى دفعاً.",
    };
  }

  if (targetField === "كليات تكنولوجيا المعلومات والذكاء الاصطناعي") {
    const b = SECTOR_SALARY_BENCHMARKS[0]!;
    return {
      entryJOD: b.entrySalaryJOD,
      midJOD: b.midCareerSalaryJOD,
      seniorJOD: b.seniorSalaryJOD,
      gulfRangeSAR: "10,000 – 25,000 ريال سعودي",
      remoteUSD: "$1,500 – $4,000 شهرياً (عمل عن بُعد مع شركات خارجية)",
      remotePotential: b.remotePotential,
      gulfDemand: b.gulfDemandRating,
      waitMonths: b.averageWaitTimeMonths,
      notes: "المهندس الذي يمتلك مشاريع عملية على GitHub وإتقان للإنجليزية يقفز راتبه سريعاً فوق المعدل المحلي.",
    };
  }

  if (slug === "medicine" || slug === "dentistry") {
    return {
      entryJOD: 650,
      midJOD: 1600,
      seniorJOD: 3800,
      gulfRangeSAR: "18,000 – 45,000 ريال سعودي (بعد البورد والاختصاص)",
      remoteUSD: "استشارات طبية عن بُعد (محدود مقارنة بالعمل السريري)",
      remotePotential: "نادر",
      gulfDemand: "مرتفع بعد الاختصاص (البورد)",
      waitMonths: 6,
      notes: "العائد المالي الحقيقي للطبيب يبدأ بعد إنهاء سنة الامتياز واجتياز برنامج الإقامة والاختصاص (البورد الأردني أو الأمريكي USMLE أو الألماني).",
    };
  }

  if (slug === "pharmacy" || slug === "pharm-d") {
    return {
      entryJOD: 380,
      midJOD: 750,
      seniorJOD: 1500,
      gulfRangeSAR: "7,500 – 15,000 ريال سعودي (خاصة في الدعاية الطبية والمستشفيات)",
      remotePotential: "متوسط (في اليقظة الدوائية والأبحاث السريرية)",
      remoteUSD: "$1,000 – $2,200 في شركات الأبحاث الدوائية (CROs)",
      gulfDemand: "متوسط إلى مرتفع (لخريجي ACPE)",
      waitMonths: 8,
      notes: "العمل في مصانع الأدوية الأردنية المصدّرة (الحكمة، دار الدواء)، اليقظة الدوائية (Pharmacovigilance)، والإعلام الدوائي يمنح رواتب تزيد بـ 60% عن صيدليات المجتمع.",
    };
  }

  if (targetField === "الكليات الطبية والصحية") {
    const b = SECTOR_SALARY_BENCHMARKS[2]!;
    return {
      entryJOD: b.entrySalaryJOD,
      midJOD: b.midCareerSalaryJOD,
      seniorJOD: b.seniorSalaryJOD,
      gulfRangeSAR: "7,000 – 14,500 ريال سعودي (مع بدلات السكن والتأمين)",
      remoteUSD: "عمل ميداني صحي (عقود دولية في الخليج وألمانيا وبريطانيا)",
      remotePotential: b.remotePotential,
      gulfDemand: b.gulfDemandRating,
      waitMonths: b.averageWaitTimeMonths,
      notes: "التمريض والتخدير والعلاج التنفسي هي الأسرع توظيفاً على الإطلاق (أقل من شهرين انتظار) مع طلب هائل في مستشفيات الخليج وألمانيا.",
    };
  }

  if (targetField === "الكليات الهندسية") {
    const isModernEng =
      slug.includes("mechatronics") ||
      slug.includes("renewable") ||
      slug.includes("computer") ||
      slug.includes("industrial");
    if (isModernEng) {
      return {
        entryJOD: 480,
        midJOD: 1050,
        seniorJOD: 2200,
        gulfRangeSAR: "9,500 – 20,000 ريال سعودي",
        remoteUSD: "$1,200 – $2,800 (في التصميم الهندسي والأتمتة وإدارة المشاريع)",
        remotePotential: "متوسط إلى مرتفع",
        gulfDemand: "مرتفع",
        waitMonths: 5,
        notes: "المهندسون الذين يجمعون بين الهندسة والبرمجة أو الطاقة الشمسية والأتمتة يحصلون على فرص أسرع بـ 3 أضعاف من الهندسة التقليدية.",
      };
    }
    const b = SECTOR_SALARY_BENCHMARKS[4]!;
    return {
      entryJOD: b.entrySalaryJOD,
      midJOD: b.midCareerSalaryJOD,
      seniorJOD: b.seniorSalaryJOD,
      gulfRangeSAR: "7,000 – 16,000 ريال سعودي (لمن يتقن BIM و PMP)",
      remoteUSD: "$900 – $2,000 (حساب كميات وتصميم BIM عن بُعد)",
      remotePotential: b.remotePotential,
      gulfDemand: b.gulfDemandRating,
      waitMonths: b.averageWaitTimeMonths,
      notes: "الهندسة التقليدية مشبعة في الديوان، لكن إتقان نمذجة معلومات البناء (BIM / Revit) وإدارة المشاريع (PMP) يفتح لك أبواب شركات المقاولات الإقليمية.",
    };
  }

  if (targetField === "الكليات الإدارية والاقتصادية والمالية") {
    const b = SECTOR_SALARY_BENCHMARKS[3]!;
    return {
      entryJOD: 420,
      midJOD: 920,
      seniorJOD: 2100,
      gulfRangeSAR: "8,500 – 19,000 ريال سعودي",
      remoteUSD: "$1,000 – $2,800 (في التسويق الرقمي، تحليل البيانات المالية، والتجارة الإلكترونية)",
      remotePotential: "مرتفع",
      gulfDemand: "مرتفع",
      waitMonths: 5,
      notes: "في قطاع الأعمال والمحاسبة، الشهادات المهنية (مثل CMA، CFA، Google Digital Marketing، أو SAP) تضاعف راتبك وتجعلك مطلوباً في البنوك والشركات الكبرى.",
    };
  }

  const b = SECTOR_SALARY_BENCHMARKS[5]!;
  return {
    entryJOD: 350,
    midJOD: 680,
    seniorJOD: 1350,
    gulfRangeSAR: "6,500 – 13,000 ريال سعودي",
    remoteUSD: "$700 – $1,800 (ترجمة، صناعة محتوى، استشارات، أو تعليم عن بُعد)",
    remotePotential: "متوسط",
    gulfDemand: "متوسط",
    waitMonths: 10,
    notes: "دمج تخصصك بالمهارات الرقمية واللغة الإنجليزية المتقدمة هو المفتاح للانتقال من الرواتب التقليدية إلى رواتب الشركات الإقليمية والعمل الحر.",
  };
}

/** الحصول على بيانات القبول والرسوم للتخصص */
function getAdmissionInfoForMajor(major: Major) {
  const exactMatches = OFFICIAL_ADMISSIONS_DATA.filter(
    (item) =>
      item.slug === major.slug ||
      normalizeArabic(item.majorName).includes(normalizeArabic(major.name)) ||
      normalizeArabic(major.name).includes(normalizeArabic(item.majorName)),
  );

  // تقديرات واقعية مبنية على القطاع إذا لم يكن التخصص ضمن جدول العينات المباشر
  let estCutoffRange = "75% – 85%";
  let estRegularHour = "20 – 35 دينار";
  let estParallelHour = "50 – 80 دينار";
  let estPrivateHour = "55 – 90 دينار";
  let totalHours = 132;

  if (major.slug === "medicine" || major.slug === "dentistry") {
    estCutoffRange = "96.5% – 98.5% (تنافس) | 90%+ (موازي ودولي)";
    estRegularHour = "36 – 45 دينار";
    estParallelHour = "150 – 175 دينار";
    estPrivateHour = "180 – 250 دينار";
    totalHours = 256;
  } else if (major.slug === "pharmacy" || major.slug === "pharm-d") {
    estCutoffRange = "90% – 95.5% (تنافس) | 80%+ (موازي وخاص)";
    estRegularHour = "30 – 40 دينار";
    estParallelHour = "80 – 110 دينار";
    estPrivateHour = "85 – 115 دينار";
    totalHours = major.slug === "pharm-d" ? 216 : 160;
  } else if (major.field === "الكليات الطبية والصحية") {
    estCutoffRange = "82% – 92% (تنافس في الأردنية والتكنو) | 70%+ (في باقي الجامعات والخاص)";
    estRegularHour = "22 – 30 دينار";
    estParallelHour = "55 – 70 دينار";
    estPrivateHour = "60 – 85 دينار";
    totalHours = 136;
  } else if (major.field === "الكليات الهندسية") {
    estCutoffRange = "80% – 93% (حسب الجامعة والتخصص، والحد الأدنى للقبول في الهندسة 80%)";
    estRegularHour = "28 – 35 دينار";
    estParallelHour = "65 – 85 دينار";
    estPrivateHour = "70 – 100 دينار";
    totalHours = 160;
  } else if (major.field === "كليات تكنولوجيا المعلومات والذكاء الاصطناعي") {
    estCutoffRange = "84% – 95% (في الأردنية والتكنو) | 72% – 85% (في باقي الجامعات الحكومية والخاصة)";
    estRegularHour = "25 – 35 دينار";
    estParallelHour = "65 – 85 دينار";
    estPrivateHour = "65 – 100 دينار";
    totalHours = 132;
  }

  return {
    exactMatches,
    estCutoffRange,
    estRegularHour,
    estParallelHour,
    estPrivateHour,
    totalHours,
  };
}

/** الحصول على بيانات ديوان الخدمة المدنية للقطاع */
function getCivilServiceMetric(major?: Major, field?: string): CivilServiceMetric | undefined {
  const f = major?.field || field || "";
  if (f.includes("الطبية") || f.includes("الصحية")) return CIVIL_SERVICE_BENCHMARK_2025[3];
  if (f.includes("تكنولوجيا") || f.includes("الذكاء")) return CIVIL_SERVICE_BENCHMARK_2025[2];
  if (f.includes("الهندسية")) return CIVIL_SERVICE_BENCHMARK_2025[1];
  if (f.includes("الإدارية") || f.includes("المالية")) return CIVIL_SERVICE_BENCHMARK_2025[4];
  if (f.includes("التربية") || f.includes("الأدب") || f.includes("الشريعة"))
    return CIVIL_SERVICE_BENCHMARK_2025[0];
  return undefined;
}

// ============================================================================
// مولدات الإجابات التفاعلية المتخصصة حسب نية السؤال (Intent-Specific Generators)
// ============================================================================

/** 1) الرد على الأسئلة عن الرواتب والدخل والعائد المالي */
function generateSalaryIntentResponse(major?: Major, sector?: string): string {
  const salary = getSalaryBenchmarkForMajorOrField(major, sector);
  const title = major ? `تخصص **${major.name}**` : sector ? `قطاع **${sector}**` : "سوق العمل الأردني والإقليمي";

  if (!major && !sector) {
    return `سؤال ممتاز! الرواتب في الأردن والخليج تختلف بشكل كبير حسب القطاع والمهارات العملية (بيانات **منصة سجّل** و**الضمان الاجتماعي** 2026) 💰📊:

| القطاع المهني | راتب البداية (الأردن) | خبرة 3-5 سنوات | خبرة متقدمة (Senior) | فرص العمل عن بُعد (بالدولار) |
| :--- | :--- | :--- | :--- | :--- |
| **الأمن السيبراني والذكاء الاصطناعي** | 600 – 750 د.أ | 1,400 – 1,800 د.أ | 2,800 – 3,500+ د.أ | مرتفعة جداً ($1,800 – $4,500) |
| **هندسة البرمجيات وعلوم الحاسوب** | 550 – 700 د.أ | 1,200 – 1,600 د.أ | 2,500 – 3,200 د.أ | مرتفعة جداً ($1,500 – $4,000) |
| **التمريض والتخصصات الصحية المساندة** | 420 – 500 د.أ | 750 – 950 د.أ | 1,400 – 1,700 د.أ | عقود فورية بالخليج وألمانيا |
| **اللوجستيات، FinTech والتسويق الرقمي** | 450 – 550 د.أ | 900 – 1,200 د.أ | 1,800 – 2,400 د.أ | متوسطة إلى مرتفعة ($1,000+) |
| **الهندسة المدنية والميكانيكية التقليدية** | 300 – 380 د.أ | 600 – 800 د.أ | 1,200 – 1,600 د.أ | محدودة (تتطلب BIM/PMP) |

💡 **أخبرني: عن أي تخصص تحديداً تسأل لأعطيك تفاصيل رواتبه الدقيقة في الأردن والخليج والعمل عن بُعد؟**`;
  }

  return `بخصوص العائد المالي والرواتب لـ ${title}، إليك الأرقام الواقعية من بيانات **منصة سجّل الوطنية** و**المؤسسة العامة للضمان الاجتماعي** وأسواق الخليج 💰📈:

### 🇯🇴 1) سلم الرواتب الشهري داخل الأردن:
- **حديث التخرج (أول سنة - Entry Level):** يبدأ المتوسط من **${salary.entryJOD} دينار أردني** شهرياً (وقد يصل إلى **${salary.entryJOD + 180} د.أ** في الشركات الكبرى والبنوك).
- **متوسط الخبرة (3 إلى 5 سنوات - Mid-Level):** يرتفع إلى **${salary.midJOD} دينار أردني** شهرياً.
- **الخبرة المتقدمة والقيادية (Senior / Lead):** يصل إلى **${salary.seniorJOD} دينار أردني** فأكثر.
- **متوسط فترة البحث عن أول وظيفة:** حوالي **${salary.waitMonths} أشهر** بعد التخرج.

### 🌍 2) الرواتب في دول الخليج والعمل عن بُعد (Remote):
- **في السعودية والإمارات وقطر:** تتراوح الرواتب بين **${salary.gulfRangeSAR}** شهرياً (مستوى الطلب الخليجي: **${salary.gulfDemand}**).
- **العمل عن بُعد والشركات الدولية:** ${salary.remoteUSD} (إمكانية العمل عن بُعد: **${salary.remotePotential}**).

### 🚀 3) كيف ترفع راتبك في ${major ? major.name : "هذا المجال"} منذ السنة الأولى؟
${salary.notes}

---
💬 **هل تحب أن نحسب تكلفة دراسة ${major ? major.name : "التخصص"} وأسعار الساعات في الجامعات الأردنية لمقارنتها بالعائد المالي؟ أم نستعرض أقوى الشهادات المجانية التي ترفع راتبك؟**`;
}

/** 2) الرد على الأسئلة عن تكلفة الدراسة، سعر الساعة، ومعدلات القبول (تنافس وموازي) */
function generateCostAndCutoffResponse(major?: Major, uni?: University, studentGrade?: number): string {
  if (!major && uni) {
    const uniCutoffs = OFFICIAL_ADMISSIONS_DATA.filter((x) =>
      normalizeArabic(x.university).includes(normalizeArabic(uni.name)),
    );
    const rows =
      uniCutoffs.length > 0
        ? uniCutoffs
            .map(
              (c) =>
                `| **${c.majorName}** | ${c.cutoff2024}% | ${c.regularHourPriceJOD} د.أ | ${c.parallelHourPriceJOD} د.أ | ${c.totalCreditHours} ساعة |`,
            )
            .join("\n")
        : "";

    return `بخصوص الرسوم الدراسية ومعدلات القبول في **${uni.name}** (${uni.type} - ${uni.location.city}) 🏛️💳:

${
  rows
    ? `### 📊 نماذج أسعار الساعات ومعدلات القبول التنافسي في ${uni.name}:
| التخصص | معدل القبول التنافسي | ساعة التنافس | ساعة الموازي | عدد الساعات المعتمدة |
| :--- | :--- | :--- | :--- | :--- |
${rows}
`
    : `- **نوع الجامعة:** ${uni.type} (${uni.location.city}).\n- **الاعتمادات:** ${uni.internationalAccreditations.join("، ")}.`
}
- **رسوم التسجيل الفصلية:** تتراوح عادةً بين **60 إلى 125 ديناراً** للفصل العادي في الجامعات الحكومية، وحوالي **150 إلى 250 ديناراً** في الجامعات الخاصة أو البرنامج الموازي.

💬 **ما هو التخصص المحدد الذي تريد حساب تكلفته الإجمالية وفرص قبوله في ${uni.name}؟**`;
  }

  if (!major) {
    return `يسعدني أن أحسب لك **التكلفة الدراسية الدقيقة (تنافس، موازي، أو خاص) ومعدلات القبول الموحد** 💳📐!

تعتمد التكلفة في الجامعات الأردنية على:
1. **البرنامج العادي (التنافس الموحد):** الأقل تكلفة، وتتراوح الساعة في معظم التخصصات بين **16 إلى 36 ديناراً**.
2. **البرنامج الموازي (في الجامعات الحكومية):** يقبل بمعدلات أقل بـ **3 إلى 8 علامات** من التنافس، وتتراوح الساعة بين **45 إلى 85 ديناراً** (و175 ديناراً للطب).
3. **الجامعات الخاصة:** تقبل من الحدود الدنيا لوزارة التعليم العالي (مثلاً 80% للهندسة والصيدلة، 65% لتكنولوجيا المعلومات والأعمال)، مع خصومات تشجيعية تصل إلى **30% - 50%** لأصحاب المعدلات العالية.

👇 **اكتب لي اسم التخصص (مثال: *كم سعر ساعة الأمن السيبراني؟* أو *كم يكلف التمريض؟*) وسأحسب لك التكلفة الكاملة ومعدلات القبول فوراً!**`;
  }

  const info = getAdmissionInfoForMajor(major);
  const tableRows = info.exactMatches
    .map((c) => {
      const regTotal = c.regularHourPriceJOD * c.totalCreditHours;
      const parTotal = c.parallelHourPriceJOD * c.totalCreditHours;
      return `| **${c.university}** | **${c.cutoff2024}%** | ${c.regularHourPriceJOD} د.أ (≈ ${regTotal.toLocaleString()} د.أ كاملة) | ${c.parallelHourPriceJOD} د.أ (≈ ${parTotal.toLocaleString()} د.أ كاملة) | ${c.totalCreditHours} ساعة |`;
    })
    .join("\n");

  let gradeVerdict = "";
  if (studentGrade !== undefined) {
    gradeVerdict = `\n### 🎯 موقفك بمعدل (${studentGrade}%):
${
  studentGrade >= 94
    ? `✅ معدلك (**${studentGrade}%**) ممتاز جداً ويؤهلك للمنافسة القوية على **القبول التنافسي العادي** في كبرى الجامعات الحكومية (مثل الأردنية والتكنو) بأقل رسوم ممكنة!`
    : studentGrade >= 85
      ? `✅ معدلك (**${studentGrade}%**) يمنحك فرصة ممتازة للقبول **التنافسي** في العديد من الجامعات الحكومية (مثل الهاشمية، اليرموك، البلقاء، مؤتة)، وفرصة مضمونة في **الموازي** أو بخصم تفوق في الجامعات الخاصة!`
      : studentGrade >= 75
        ? `💡 بمعدل (**${studentGrade}%**)، فرصتك الأقوى تكون عبر **البرنامج الموازي** في الجامعات الحكومية أو في **جامعات الأطراف** أو **الجامعات الخاصة** المتميزة.`
        : `💡 بمعدل (**${studentGrade}%**)، يمكنك الالتحاق عبر **الجامعات الخاصة** أو البرامج التطبيقية في **جامعة البلقاء التطبيقية** (حسب الحد الأدنى المسموح من التعليم العالي لهذا التخصص).`
}\n`;
  }

  return `إليك الحسبة المالية الدقيقة ومعدلات القبول لتخصص **${major.name}** وفق بيانات **وحدة تنسيق القبول الموحد** ورسوم الجامعات الأردنية 💳📐:

### 📌 1) ملخص الساعات والرسوم ومعدلات القبول:
- **إجمالي الساعات المعتمدة للتخرج:** حوالي **${info.totalHours} ساعة معتمدة** (تُنجز في ${Math.round(info.totalHours / 33)} سنوات دراسية).
- **معدل القبول التنافسي التقريبي:** **${info.estCutoffRange}**.
- **سعر الساعة في التنافس (حكومي عادي):** **${info.estRegularHour}**.
- **سعر الساعة في البرنامج الموازي:** **${info.estParallelHour}**.
- **سعر الساعة في الجامعات الخاصة:** **${info.estPrivateHour}** (قبل خصومات التفوق والمنح الجزئية).
${
  tableRows
    ? `\n### 🏛️ 2) جدول مقارنة الرسوم والحدود الدنيا المعتمدة في الجامعات:
| الجامعة | معدل التنافس | سعر ساعة التنافس (والتكلفة الكلية) | سعر ساعة الموازي (والتكلفة الكلية) | الساعات |
| :--- | :--- | :--- | :--- | :--- |
${tableRows}\n`
    : ""
}${gradeVerdict}
---
💬 **هل تريد أن نقارن بين جامعتين محددتين لدراسة ${major.name}؟ أم تود معرفة الرواتب المتوقعة بعد التخرج لاسترداد تكلفة الدراسة؟**`;
}

/** 3) الرد على المقارنة المباشرة بين تخصصين (Head-to-Head Major Comparison) */
function generateTwoMajorsComparisonResponse(
  m1: Major,
  m2: Major,
  studentGrade?: number,
): string {
  const sal1 = getSalaryBenchmarkForMajorOrField(m1);
  const sal2 = getSalaryBenchmarkForMajorOrField(m2);
  const adm1 = getAdmissionInfoForMajor(m1);
  const adm2 = getAdmissionInfoForMajor(m2);

  // تحديد أيهما أقوى تشغيلياً
  const score = (m: Major) =>
    (m.classification === "مطلوب" ? 3 : m.classification === "مشبع" ? 1 : 0) +
    (m.risk === "منخفض" ? 2 : m.risk === "متوسط" ? 1 : 0);
  const s1 = score(m1);
  const s2 = score(m2);

  let verdict = "";
  if (s1 > s2) {
    verdict = `🏆 **حكم المستشار المباشر:** يتفوق تخصص **${m1.name}** بوضوح من حيث الأمان الوظيفي وسرعة التوظيف (مصنف **${m1.classification}** بنسبة تشغيل **${m1.employmentRate}** مقابل **${m2.classification}** و**${m2.employmentRate}** لتخصص ${m2.name}). إذا كان هدفك التوظيف الأسرع والعائد المالي الأعلى، فإن **${m1.name}** هو الخيار الأذكى استراتيجياً.`;
  } else if (s2 > s1) {
    verdict = `🏆 **حكم المستشار المباشر:** يتفوق تخصص **${m2.name}** بوضوح من حيث الأمان الوظيفي وسرعة التوظيف (مصنف **${m2.classification}** بنسبة تشغيل **${m2.employmentRate}** مقابل **${m1.classification}** و**${m1.employmentRate}** لتخصص ${m1.name}). إذا كان هدفك التوظيف الأسرع والعائد المالي الأعلى، فإن **${m2.name}** هو الخيار الأذكى استراتيجياً.`;
  } else {
    verdict = `⚖️ **حكم المستشار المباشر:** التخصصان متقاربان جداً في القوة السوقية (**${m1.classification}** / **${m2.classification}**)! الفيصل الحقيقي بينهما هو **شغفك الشخصي وطبيعة المواد**: اختر **${m1.name}** إذا كنت تميل إلى (${m1.summary.slice(0, 80)}...)، واختر **${m2.name}** إذا كنت تفضل (${m2.summary.slice(0, 80)}...).`;
  }

  return `مقارنة ذكية جداً! دعنا نضع **${m1.name}** وجهاً لوجه أمام **${m2.name}** بالأرقام الرسمية ليصبح قرارك واضحاً 100% ⚖️📊:

| معيار المقارنة | 🔹 ${m1.name} | 🔸 ${m2.name} |
| :--- | :--- | :--- |
| **القطاع الأكاديمي** | ${m1.field} | ${m2.field} |
| **تصنيف ديوان الخدمة والسوق** | **${m1.classification}** | **${m2.classification}** |
| **نسبة التشغيل (أول سنتين)** | **${m1.employmentRate}** | **${m2.employmentRate}** |
| **مستوى المخاطرة الوظيفية** | مخاطرة **${m1.risk}** | مخاطرة **${m2.risk}** |
| **متوسط راتب البداية (الأردن)** | **${sal1.entryJOD} د.أ** (ومع الخبرة ${sal1.midJOD} د.أ) | **${sal2.entryJOD} د.أ** (ومع الخبرة ${sal2.midJOD} د.أ) |
| **إمكانية العمل عن بُعد / الخليج** | عن بُعد: ${sal1.remotePotential} \| الخليج: ${sal1.gulfDemand} | عن بُعد: ${sal2.remotePotential} \| الخليج: ${sal2.gulfDemand} |
| **تأثير الذكاء الاصطناعي والأتمتة** | **${m1.automation.exposure}** — ${m1.automation.note} | **${m2.automation.exposure}** — ${m2.automation.note} |
| **عدد الساعات ومعدل القبول** | ${adm1.totalHours} ساعة (${adm1.estCutoffRange}) | ${adm2.totalHours} ساعة (${adm2.estCutoffRange}) |
| **أقوى الجامعات الحكومية** | ${m1.publicUniversities.slice(0, 3).join("، ")} | ${m2.publicUniversities.slice(0, 3).join("، ")} |
| **أقوى الجامعات الخاصة** | ${m1.privateUniversities.slice(0, 2).join("، ")} | ${m2.privateUniversities.slice(0, 2).join("، ")} |

---

### 💡 خلاصة الفروقات الجوهرية:
- **في ${m1.name}:** ${m1.summary}
- **في ${m2.name}:** ${m2.summary}

${verdict}${
    studentGrade
      ? `\n\n📌 **بالنسبة لمعدلك (${studentGrade}%):** يمكنك الآن اختيار التخصص الأقرب لطموحك وسأحدد لك فوراً أفضل جامعة تقبلك بهذا المعدل!`
      : ""
  }

---
💬 **بعد هذه المقارنة، أيهما شعرت أنه الأقرب لشخصيتك: ${m1.name} أم ${m2.name}؟ (أخبرني لنفصّل لك أفضل جامعة وخطته الدراسية)**`;
}

/** 4) الرد على سؤال: ما هي أفضل جامعة لدراسة تخصص معين؟ */
function generateBestUniForMajorResponse(major: Major, studentGrade?: number): string {
  const pubUnis = major.publicUniversities;
  const privUnis = major.privateUniversities;
  const adm = getAdmissionInfoForMajor(major);

  // مطابقة بيانات الجامعات التفصيلية
  const matchedUniDetails = [...pubUnis.slice(0, 3), ...privUnis.slice(0, 2)]
    .map((uName) => universities.find((u) => normalizeArabic(u.name).includes(normalizeArabic(uName)) || normalizeArabic(uName).includes(normalizeArabic(u.name))))
    .filter((u): u is University => Boolean(u));

  return `لدراسة تخصص **${major.name}** في الأردن، إليك ترتيب وتفصيل **أفضل الجامعات الحكومية والخاصة** التي تطرحه بناءً على قوة التدريب والاعتمادات الدولية (${major.accreditation}) 🏛️🎓:

### 🥇 1) أفضل الجامعات الحكومية لدراسة ${major.name}:
${pubUnis
  .map((uName, idx) => {
    const uObj = universities.find(
      (u) =>
        normalizeArabic(u.name).includes(normalizeArabic(uName)) ||
        normalizeArabic(uName).includes(normalizeArabic(u.name)),
    );
    const cutoffItem = adm.exactMatches.find((c) =>
      normalizeArabic(c.university).includes(normalizeArabic(uName)),
    );
    const cutoffText = cutoffItem
      ? ` — *(معدل التنافس: ${cutoffItem.cutoff2024}% | الساعة: ${cutoffItem.regularHourPriceJOD} د.أ تنافس / ${cutoffItem.parallelHourPriceJOD} د.أ موازي)*`
      : "";
    return `${idx + 1}. **${uName}**${cutoffText}${
      uObj ? `\n   - *لماذا تتميز؟* ${uObj.uniqueAdvantages[0]} (${uObj.trainingFacilities.slice(0, 110)}...).` : ""
    }`;
  })
  .join("\n")}

### 🌟 2) أفضل الجامعات الخاصة / الدولية المتميزة في ${major.name}:
${privUnis
  .map((uName, idx) => {
    const uObj = universities.find(
      (u) =>
        normalizeArabic(u.name).includes(normalizeArabic(uName)) ||
        normalizeArabic(uName).includes(normalizeArabic(u.name)),
    );
    return `${idx + 1}. **${uName}**${
      uObj
        ? ` (${uObj.location.city}) — *ما يميزها:* ${uObj.uniqueAdvantages[0]}.`
        : ""
    }`;
  })
  .join("\n")}

### 🔬 3) الفرق العملي في التدريب بين الحكومي والخاص لهذا التخصص:
- **ملاحظة التدريب الميداني:** ${major.trainingNotes}
- **الاعتماد الأهم الذي يجب أن تبحث عنه:** ${major.accreditation}
${
  matchedUniDetails.length > 0 && matchedUniDetails[0]
    ? `- **نصيحة الاختيار:** إذا كان معدلك عالياً وتبحث عن أقوى سمعة أكاديمية، ابدأ بـ **${pubUnis[0]}** أو **${pubUnis[1] || pubUnis[0]}**؛ أما إذا كنت تبحث عن بيئة تطبيقية حديثة أو لم يحالفك الحظ بالتنافس، فإن **${privUnis[0]}** خيار ممتاز.`
    : ""
}${
    studentGrade
      ? `\n\n🎯 **بمعدلك الحالي (${studentGrade}%):** أنصحك بوضع **${
          studentGrade >= 90 ? pubUnis[0] : pubUnis[pubUnis.length - 1] || privUnis[0]
        }** كخيار أول! هل تريد أن أحسب لك التكلفة الكاملة فيها؟`
      : "\n\n💬 **كم معدلك المتوقع في التوجيهي وفي أي محافظة تسكن؟ (لأرشح لك الجامعة رقم 1 الأنسب لمعدلك ومكان سكنك)**"
  }`;
}

/** 5) الرد على سؤال عن صعوبة التخصص، طبيعة الدراسة، المواد، وعدد السنوات */
function generateStudyNatureAndDifficultyResponse(major: Major): string {
  const adm = getAdmissionInfoForMajor(major);
  const years = Math.round(adm.totalHours / 33);

  let difficultyProfile = "";
  let coreSubjects: string[] = [];
  let successTips = "";

  if (major.field === "كليات تكنولوجيا المعلومات والذكاء الاصطناعي") {
    difficultyProfile =
      "متوسط إلى متقدم فكرياً؛ **لا يعتمد على الحفظ إطلاقاً**، بل يعتمد 80% على الفهم المنطقي، حل المشكلات (Problem Solving)، والتطبيق العملي أمام الحاسوب.";
    coreSubjects = [
      "أساسيات البرمجة وهياكل البيانات والخوارزميات (Data Structures & Algorithms)",
      "قواعد البيانات (SQL) وهندسة البرمجيات وتطوير الويب والتطبيقات",
      "الرياضيات المتقطعة، الاحتمالات، والجبر الخطي (أساسية للذكاء الاصطناعي)",
      "أمن الشبكات، التشفير، والحوسبة السحابية (Cloud & Security)",
    ];
    successTips =
      "لا تنتظر مواد الجامعة فقط! ابدأ بتعلم لغة Python أو JavaScript من أول فصل، وابنِ 3 إلى 4 مشاريع حقيقية تضعها على حسابك في GitHub.";
  } else if (major.field === "الكليات الطبية والصحية") {
    difficultyProfile =
      major.slug === "medicine" || major.slug === "dentistry"
        ? "مرتفع ويتطلب نفساً طويلاً والتزاماً يومياً؛ يجمع بين **الحفظ المكثف الدقيق والفهم السريري العميق** باللغة الإنجليزية."
        : "متوسط وممتع عملياً؛ يوازن بين **العلوم الطبية التأسيسية والتدريب السريري الميداني** داخل المستشفيات والمختبرات.";
    coreSubjects = [
      "علم التشريح (Anatomy)، علم وظائف الأعضاء (Physiology)، وعلم الأمراض (Pathology)",
      "علم الأدوية (Pharmacology) والأحياء الدقيقة (Microbiology)",
      "المهارات السريرية والتشخيصية والتدريب الميداني في المستشفيات المعتمدة",
      "أخلاقيات المهن الصحية والتعامل مع المرضى والطوارئ",
    ];
    successTips =
      "تقوية لغتك الإنجليزية الطبية في السنة الأولى تسهل عليك 70% من الدراسة، والتركيز في التدريب السريري بالمستشفيات هو ما يصنع اسمك المهني.";
  } else if (major.field === "الكليات الهندسية") {
    difficultyProfile =
      "يميل إلى الصعوبة التحليلية في أول سنتين (بسبب مواد الرياضيات والفيزياء الهندسية)، ثم يصبح ممتعاً وتطبيقياً جداً في سنوات التخصص ومشاريع التخرج.";
    coreSubjects = [
      "التفاضل والتكامل المتقدم (Calculus 1, 2, 3) والمعادلات التفاضلية والفيزياء",
      "التصميم الهندسي بمساعدة الحاسوب (AutoCAD / SolidWorks / Revit / MATLAB)",
      "مواد التخصص الدقيقة والمختبرات العملية وتصميم الأنظمة",
      "إدارة المشاريع الهندسية، الاقتصاد الهندسي، والتدريب الميداني (فصل كامل)",
    ];
    successTips =
      "أتقن البرامج الهندسية الحاسوبية منذ السنة الثانية، واحرص على اختيار مشروع تخرج يحل مشكلة حقيقية في السوق الأردني.";
  } else if (major.field === "الكليات الإدارية والاقتصادية والمالية") {
    difficultyProfile =
      "سلس وعملي ومناسب جداً لمن يمتلك مهارات تواصل، تفكير إداري، أو حب للأرقام والتسويق؛ يجمع بين الفهم التطبيقي ودراسات الحالة (Case Studies).";
    coreSubjects = [
      "مبادئ الإدارة الحديثة، المحاسبة المالية، والاقتصاد الجزئي والكلي",
      "تحليل البيانات، الإحصاء التطبيقي، واستخدام Excel و Power BI",
      "التسويق الرقمي، سلوك المستهلك، وإدارة سلاسل الإمداد والعمليات",
      "ريادة الأعمال، القانون التجاري، وإدارة المشاريع",
    ];
    successTips =
      "التخصصات الإدارية سهلة التخرج، لذا ما يميزك عن آلاف الخريجين هو إتقان اللغة الإنجليزية، تحليل البيانات، والحصول على شهادة مهنية أثناء الدراسة.";
  } else {
    difficultyProfile =
      "متوازن وميسر لمن يمتلك الشغف بالمجال؛ يركز على الفهم التحليلي، المهارات اللغوية أو الإبداعية، والتطبيق الميداني.";
    coreSubjects = [
      "المساقات التأسيسية النظرية والتطبيقية الخاصة بالتخصص",
      "مهارات البحث العلمي، التحليل النقدي، والصياغة المهنية",
      "التطبيقات العملية والتدريب الميداني في المؤسسات المعتمدة",
      "مشروع التخرج التطبيقي ومهارات التواصل والعرض",
    ];
    successTips =
      "ادمج دراستك الأكاديمية بالمهارات الرقمية الحديثة واللغة الإنجليزية لتضاعف فرصك الوظيفية فور التخرج.";
  }

  return `سؤال مهم جداً! إليك الصورة الحقيقية لطبيعة دراسة تخصص **${major.name}** من داخل المدرجات الجامعية الأردنية 📚🎓:

### ⏱️ 1) مدة الدراسة والساعات المعتمدة:
- **عدد الساعات:** **${adm.totalHours} ساعة معتمدة** (تستغرق عادةً **${years} سنوات**، ويمكن ضغطها في ${years - 0.5} سنوات مع الفصول الصيفية).
- **لغة التدريس:** تُدرّس معظم المساقات التخصصية العلمية والطبية والهندسية والتقنية باللغة **الإنجليزية**، بينما تُدرّس متطلبات الجامعة والتخصصات الإنسانية والقانونية باللغة **العربية** (مع مساقات إنجليزية).

### 🧠 2) هل تخصص ${major.name} صعب؟
- **مستوى الصعوبة:** ${difficultyProfile}
- **واقع التدريب في الجامعات:** ${major.trainingNotes}

### 📖 3) أبرز المواد والمهارات التي ستدرسها:
${coreSubjects.map((s) => `• ${s}`).join("\n")}

### 🌟 4) نصيحة ذهبية للتفوق فيه من السنة الأولى:
> ${successTips}

---
💬 **هل ترغب بمعرفة مجالات العمل والرواتب بعد التخرج من ${major.name}؟ أم تود رؤية الدورات المجانية التي تهيئك لمواد هذا التخصص قبل دخول الجامعة؟**`;
}

/** 6) الرد على سؤال عن مجالات العمل، الوظائف، وديوان الخدمة المدنية */
function generateJobsAndCareerPathResponse(major: Major): string {
  const cs = getCivilServiceMetric(major);
  const sal = getSalaryBenchmarkForMajorOrField(major);

  return `إليك خريطة الوظائف ومجالات العمل الفعلية لخريج **${major.name}** في الأردن والخارج 💼🚀:

### 📊 1) وضع التخصص في سوق العمل وديوان الخدمة المدنية:
- **التصنيف الرسمي:** **[${major.classification}]** — بنسبة تشغيل تقديرية **${major.employmentRate}** خلال أول سنتين.
- **مستوى المخاطرة:** مخاطرة **${major.risk}**.
${
  cs
    ? `- **مؤشر هيئة الخدمة والإدارة العامة (${cs.field}):** إجمالي طلبات القطاع **${cs.totalStockApplications.toLocaleString()}** طلب مقابل **${cs.annualAppointments.toLocaleString()}** تعيين حكومي سنوياً (نسبة استيعاب القطاع العام **${cs.absorptionRatePercent}%** فقط، مما يعني أن **القطاع الخاص والشركات الإقليمية هي المحرك الرئيسي للتوظيف**!).`
    : ""
}

### 🏢 2) أين يعمل خريجو ${major.name}؟
- **ملخص الفرص:** ${major.summary}
- **متوسط الانتظار لأول وظيفة:** حوالي **${sal.waitMonths} أشهر** لمن يمتلك مهارات عملية، وبراتب بداية يبلغ **${sal.entryJOD} د.أ** ويرتفع مع الخبرة إلى **${sal.midJOD} – ${sal.seniorJOD} د.أ**.
- **الفرص الإقليمية والدولية:** الطلب في الخليج (**${sal.gulfDemand}**) وإمكانية العمل عن بُعد (**${sal.remotePotential}**).

### 🤖 3) مستقبل الوظيفة مع الذكاء الاصطناعي:
- **درجة التأثر بالأتمتة:** **${major.automation.exposure}** — ${major.automation.note}

---
💬 **هل تود أن أعرض لك الشهادات المجانية التي تطلبها الشركات عند التوظيف في ${major.name}؟ أم نقارنه مع تخصص بديل؟**`;
}

/** 7) الرد على سؤال عن تأثير الذكاء الاصطناعي والأتمتة على التخصص */
function generateAiAutomationResponse(major?: Major): string {
  if (!major) {
    return `سؤالك ينم عن وعي مستقبلي عالٍ! 🤖⚡

وفقاً لتحليلات سوق العمل 2026–2030 في منصتنا، تنقسم التخصصات أمام الذكاء الاصطناعي إلى **3 فئات**:

1. 🛡️ **تخصصات تقود الذكاء الاصطناعي أو محصنة بـ 90%+ ضده (منخفضة التأثر):**
   - **الأمن السيبراني، الذكاء الاصطناعي وعلم البيانات، هندسة الميكاترونكس والروبوتات، الطاقة المتجددة.**
   - **التمريض، الطب البشري، العلاج الطبيعي والوظيفي، والتخدير** (لأنها تتطلب رعاية إنسانية وتدخلاً سريرياً مباشراً لا يمكن للآلة استبداله).
2. ⚖️ **تخصصات ستتحول أدواتها جذرياً (متوسطة التأثر - من يتقن الـ AI فيها يتضاعف راتبه):**
   - **هندسة البرمجيات، التصميم الجرافيكي، التسويق الرقمي، القانون، الهندسة المعمارية.** (الذكاء الاصطناعي لن يلغي المهندس أو المصمم، لكن المهندس الذي يستخدم الذكاء الاصطناعي سيستبدل المهندس الذي لا يستخدمه!).
3. ⚠️ **تخصصات روتينية معرضة للأتمتة العالية (مرتفعة التأثر):**
   - **إدخال البيانات، المحاسبة الدفترية التقليدية، الترجمة النصية الحرفية، والأعمال المكتبية الإدارية الروتينية.**

💬 **أي تخصص تفكر فيه حالياً لأفحص لك درجة مناعته أمام الذكاء الاصطناعي بالتفصيل؟**`;
  }

  return `تحليل مستقبل تخصص **${major.name}** في عصر الذكاء الاصطناعي والأتمتة (2026 – 2035) 🤖🔍:

### 📊 1) مؤشر التعرض للأتمتة: **[${major.automation.exposure}]**
- **التشخيص الدقيق:** ${major.automation.note}

### 🛡️ 2) كيف تجعل نفسك غير قابل للاستبدال بالذكاء الاصطناعي في ${major.name}؟
1. **انتقل من التنفيذ الروتيني إلى التصميم والقرار:** المهام المتكررة في ${major.name} ستقوم بها أدوات الذكاء الاصطناعي، بينما تبقى **هندسة الحلول، التدقيق، والأخلاقيات المهنية** بيد الخبير البشري.
2. **استخدم أدوات الـ AI كمساعد مضاعف لإنتاجيتك:** الخريج الذي يدمج أدوات الذكاء الاصطناعي في تخصصه ينجز عمل 3 موظفين ويكون أول من تبحث عنه الشركات.
3. **احصل على اعتمادات وشهادات تطبيقية:** (${major.accreditation}).

---
💬 **هل تحب أن أعطيك أهم الدورات المجانية المعتمدة لدمج المهارات الحديثة بتخصص ${major.name}؟**`;
}

/** 8) الرد على سؤال عن العمل عن بُعد (Remote / Freelance) أو السفر للخليج وألمانيا */
function generateRemoteAndAbroadResponse(major?: Major): string {
  if (!major) {
    return `إذا كان هدفك **العمل عن بُعد بالدولار (Remote/Freelance) أو السفر للخليج وأوروبا**، فإليك أقوى التخصصات الأردنية لتحقيق ذلك 🌍✈️:

### 💻 1) الأفضل للعمل عن بُعد من داخل الأردن برواتب عالمية ($1,500 – $4,500/شهر):
- **هندسة البرمجيات وعلوم الحاسوب** (تطوير المواقع والتطبيقات والنظم السحابية).
- **الأمن السيبراني وعلم البيانات والذكاء الاصطناعي**.
- **التسويق الرقمي، تصميم واجهات المستخدم (UI/UX)، وتحليل الأعمال والمالية**.

### ✈️ 2) الأسرع في عقود السفر للخليج وألمانيا وأوروبا:
- **التمريض القانوني والتخصصات الصحية المساندة (تخدير، أشعة، علاج طبيعي):** طلب فوري في السعودية، الإمارات، قطر، وألمانيا (بشرط لغة ألمانية B2).
- **الطب البشري ودكتور صيدلة:** سفر مضمون بعد اجتياز امتحانات المعادلة الدولية (USMLE لأمريكا، Approbation لألمانيا، أو البورد للخليج) بفضل اعتراف **WFME** و **ACPE** في الجامعات الأردنية.
- **الهندسة والتكنولوجيا من الجامعات المعتمدة بـ ABET أو الجامعة الألمانية الأردنية (GJU)** التي تمنحك سنة كاملة في ألمانيا!

💬 **هل تميل أكثر للتخصصات التقنية (عمل عن بُعد بالدولار) أم الصحية والهندسية (عقود سفر للخليج وألمانيا)؟**`;
  }

  const sal = getSalaryBenchmarkForMajorOrField(major);

  return `إليك فرص **العمل عن بُعد (Remote) والسفر للخليج والخارج** لتخصص **${major.name}** 🌍✈️:

- **قابلية العمل عن بُعد (Remote / Freelance):** **${sal.remotePotential}** — (${sal.remoteUSD}).
- **مستوى الطلب في دول الخليج (السعودية، الإمارات، قطر):** **${sal.gulfDemand}** — بمتوسط رواتب **${sal.gulfRangeSAR}**.
- **الاعتمادات الدولية الداعمة لشهادتك الأردنية:** ${major.accreditation}.
  *(وجود هذا الاعتماد في جامعتك يسهل معادلة شهادتك فوراً في الخليج وأمريكا وأوروبا دون تعقيدات)*.

### 🚀 خطوات عملية للوصول لفرص خارجية في ${major.name}:
1. اختر جامعة أردنية تمتلك الاعتماد الدولي في هذا التخصص (مثل: **${major.publicUniversities.slice(0, 2).join(" أو ")}** أو **${major.privateUniversities[0]}**).
2. أتقن اللغة الإنجليزية المهنية (أو الألمانية B1/B2 إذا كان هدفك ألمانيا).
3. عزز سيرتك الذاتية بالشهادات العالمية المجانية المعتمدة في منصتنا.

💬 **هل تريد معرفة أي جامعة أردنية تمتلك أقوى اعتراف دولي في ${major.name}؟**`;
}

/** 9) توليد ملف تفصيلي لجامعة معينة (مع ربطه بالتخصص النشط إن وُجد!) */
export function generateUniversityDetailResponse(u: University, activeMajor?: Major): string {
  const majorNote = activeMajor
    ? `\n### 🎯 دراسة **${activeMajor.name}** في ${u.name}:\n- ${
        activeMajor.publicUniversities.some((x) => normalizeArabic(x).includes(normalizeArabic(u.name))) ||
        activeMajor.privateUniversities.some((x) => normalizeArabic(x).includes(normalizeArabic(u.name)))
          ? `تُعد **${u.name}** من الجامعات البارزة المعتمدة التي تطرح أو تدعم مجال **${activeMajor.name}** (${activeMajor.field})، وتستفيد فيها من ${u.trainingFacilities}.`
          : `ينتمي تخصص **${activeMajor.name}** إلى **${activeMajor.field}**، وأبرز الجامعات المانحة له مباشرة هي: ${activeMajor.publicUniversities.slice(0, 3).join("، ")}.`
      }\n`
    : "";

  return `إليك الدليل المعتمد لـ **${u.name} (${u.englishName})** بتركيز مباشر وواضح 🏛️🎓:

- **النوع والموقع:** جامعة **${u.type}** في **${u.location.city}** (إقليم ${u.location.region}) — تأسست عام ${u.establishedYear}.
- **التصنيف العالمي والعربي:** ${u.rankingSummary}
- **الكليات الأقوى والرائدة:** ${u.flagshipColleges.join("، ")}.
- **الاعتمادات الدولية:** ${u.internationalAccreditations.join("، ")}.
- **المرافق التدريبية والمستشفيات/المختبرات:** ${u.trainingFacilities}

### 🌟 ما الذي يميز ${u.name} عن غيرها؟
${u.uniqueAdvantages.map((adv) => `• ${adv}`).join("\n")}
${majorNote}
### 🧭 نصيحة المستشار: متى تختار ${u.name}؟
> ${u.advisorRecommendation}

🔗 **الموقع الرسمي:** [${u.website}](${u.website})

---
💬 **ما هو التخصص الذي تفكر بدراسته في ${u.name}؟ وكم معدلك لنفحص فرص قبولك وأسعار الساعات فيها؟**`;
}

/** 10) توليد مقارنة بين جامعتين (مع مراعاة التخصص النشط إن وُجد) */
export function generateUniversityComparisonResponse(
  u1: University,
  u2: University,
  activeMajor?: Major,
): string {
  const majorContext = activeMajor
    ? `\n### 🎯 أيهما أفضل لدراسة **${activeMajor.name}**؟
- كلا الصرحين خياران محترمان، لكن لدراسة **${activeMajor.name}** (${activeMajor.field}): انظر إلى **الاعتمادات الدولية الخاصة بالكلية** (${activeMajor.accreditation})، و**قرب الجامعة من سكنك** لتوفير تكاليف المواصلات والسكن، و**الحد الأدنى لمعدل القبول**.\n`
    : "";

  return `مقارنة مباشرة وحاسمة بين **${u1.name}** و **${u2.name}** ⚖️🏛️:

| وجه المقارنة | 🏛️ ${u1.name} | 🏛️ ${u2.name} |
| :--- | :--- | :--- |
| **النوع والموقع** | ${u1.type} — ${u1.location.city} (${u1.location.region}) | ${u2.type} — ${u2.location.city} (${u2.location.region}) |
| **التصنيف والسمعة** | ${u1.rankingSummary} | ${u2.rankingSummary} |
| **الكليات الأقوى** | ${u1.flagshipColleges.slice(0, 3).join("، ")} | ${u2.flagshipColleges.slice(0, 3).join("، ")} |
| **الاعتمادات الدولية** | ${u1.internationalAccreditations.join("، ")} | ${u2.internationalAccreditations.join("، ")} |
| **المرافق والتدريب** | ${u1.trainingFacilities} | ${u2.trainingFacilities} |

### 🌟 أبرز نقاط القوة لكل جامعة:
- **ما يميز ${u1.name}:** ${u1.uniqueAdvantages.slice(0, 2).join(" | ")}.
- **ما يميز ${u2.name}:** ${u2.uniqueAdvantages.slice(0, 2).join(" | ")}.
${majorContext}
### 🧭 الخلاصة: أيهما تختار؟
- **اختر ${u1.name} إذا:** ${u1.advisorRecommendation}
- **اختر ${u2.name} إذا:** ${u2.advisorRecommendation}

---
💬 **ما هو التخصص المحدد الذي تريد دراسته فيهما، وكم معدلك في التوجيهي لنحسم أيهما تقبلك بالتنافس أو الموازي؟**`;
}

/** 11) استعراض خريطة الجامعات الأردنية */
export function generateUniversitiesOverviewResponse(): string {
  return `دليل **خريطة الجامعات الأردنية (2026)** باختصار ووضوح لتعرف كيف تختار جامعتك بذكاء 🎓🏛️:

### 🏛️ 1) قمم الطب والهندسة والبحث العلمي الشامل:
- **الجامعة الأردنية (عمان) & جامعة العلوم والتكنولوجيا (التكنو - إربد):**
  الأعلى تصنيفاً عالمياً في QS، وتضمان أكبر المستشفيات الجامعية (مستشفى الجامعة ومستشفى الملك المؤسس) واعتمادات **WFME** الطبية و **ABET** الهندسية والتقنية.

### 💻 2) قمم التكنولوجيا وريادة الأعمال والشراكة الدولية:
- **جامعة الأميرة سمية للتكنولوجيا (PSUT - عمان):** الأولى تخصصياً في الأمن السيبراني، علم البيانات، البرمجيات، وتنافس عالمياً في مسابقات البرمجة ICPC.
- **الجامعة الألمانية الأردنية (GJU - مادبا):** جامعة حكومية بنموذج دولي فريد يمنحك **سنة دراسية وتدريبية كاملة في ألمانيا** ويفتح لك سوق العمل الأوروبي.

### 🌿 3) الجامعات الحكومية الكبرى في الأقاليم:
- **الهاشمية (الزرقاء):** رائدة في الطاقة المتجددة، الميكاترونكس، الطب، وتكنولوجيا معلومات الأعمال وبنظام فصول مرن.
- **اليرموك (إربد):** عريقة في الإعلام، اللغات، القانون، الاقتصاد، وتكنولوجيا المعلومات.
- **البلقاء التطبيقية (السلط وكلياتها):** المظلة الوطنية للتعليم التطبيقي والتقني والهندسي (البوليتكنك).
- **مؤتة (الكرك)، آل البيت (المفرق)، الحسين بن طلال (معان)، والطفيلة التقنية:** قلاع أكاديمية حكومية برسوم تنافسية ومعدلات قبول ميسرة.

### 🌟 4) أبرز الجامعات الخاصة ذات الاعتمادات الدولية:
- **العلوم التطبيقية، البترا، عمان الأهلية، الزيتونة، الشرق الأوسط، وفيلادلفيا:** تتميز باعتمادات دولية قوية (مثل **ACPE** الأمريكي في الصيدلة و **ABET** في الحاسوب والهندسة) ومختبرات حديثة.

---
💬 **أخبرني: ما هو التخصص الذي تفكر فيه أو في أي محافظة تسكن؟ (أو سمِّ لي جامعتين لأقارن لك بينهما فوراً!)**`;
}

/** 12) استعراض قطاع أكاديمي كامل */
export function generateSectorOverviewResponse(fieldName: string): string {
  const fieldMajors = majors.filter((m) => m.field === fieldName);
  const demanded = fieldMajors.filter((m) => m.classification === "مطلوب");
  const saturated = fieldMajors.filter(
    (m) => m.classification === "مشبع" || m.classification === "راكد",
  );
  const sal = getSalaryBenchmarkForMajorOrField(undefined, fieldName);

  return `إليك الخلاصة الصريحة والدقيقة لـ **${fieldName}** في الأردن (2026) 📋🎯:

### ✅ 1) التخصصات المطلوبة والواعدة في هذا القطاع (أنصحك بها):
${demanded
  .slice(0, 5)
  .map(
    (m) =>
      `• **${m.name}:** نسبة تشغيل **${m.employmentRate}** (مخاطرة ${m.risk}) — ${m.summary}`,
  )
  .join("\n")}

### ⚠️ 2) تخصصات مشبعة أو راكدة في نفس القطاع (احذر منها إلا بخطة تميز قوية):
${
  saturated.length > 0
    ? saturated
        .slice(0, 4)
        .map(
          (m) =>
            `• **${m.name}:** مصنف **[${m.classification}]** (نسبة تشغيل ${m.employmentRate}).`,
        )
        .join("\n")
    : "• معظم تخصصات هذا القطاع حديثة ومطلوبة، لكن العبرة دائماً بالمهارات العملية."
}

### 💰 3) مؤشر الرواتب والفرص في ${fieldName}:
- **متوسط راتب البداية في الأردن:** **${sal.entryJOD} د.أ**، ويرتفع مع الخبرة (3-5 سنوات) إلى **${sal.midJOD} د.أ**.
- **الطلب في الخليج:** **${sal.gulfDemand}** | **العمل عن بُعد:** **${sal.remotePotential}**.

---
💬 **أي تخصص من تخصصات ${fieldName} لفت انتباهك أكثر لنفصّل معدلات قبوله وأفضل جامعة لدراسته؟**`;
}

/** 13) تقديم نصيحة عامة أو مخصصة للتخصصات الأفضل */
export function generateTopMajorsAdviceResponse(
  userQuery = "",
  stream?: string,
  grade?: number,
): string {
  const norm = normalizeArabic(userQuery);
  const isLiterary =
    stream === "أدبي" || norm.includes("ادبي") || norm.includes("الادبي");

  if (grade !== undefined) {
    return generateGradeResponse(grade, detectMajorField(userQuery), stream);
  }

  if (isLiterary) {
    return `إذا كنت من طلبة **الفرع الأدبي** وتبحث عن تخصصات قوية ومطلوبة فعلاً في سوق العمل بعيداً عن البطالة والتخصصات الراكدة، فإليك **أقوى 5 مسارات أنصحك بها في 2026** 🚀:

1. **التسويق الرقمي والتجارة الإلكترونية (Digital Marketing):**
   - مطلوب في كل شركة ومتجر وبنك، ويفتح لك باب العمل الحر وعن بُعد برواتب ممتازة (450 – 1,200+ د.أ).
2. **نظم المعلومات الإدارية (MIS) أو تكنولوجيا معلومات الأعمال (BIT):**
   - الجسر الذهبي الذي يدخلك عالم التكنولوجيا وتحليل البيانات وإدارة المشاريع التقنية.
3. **العلوم اللوجستية وإدارة سلاسل الإمداد (Logistics & Supply Chain):**
   - من أسرع القطاعات نمواً في الأردن والموانئ والمطارات وشركات التجارة الإقليمية.
4. **اللغات الحديثة والترجمة التطبيقية (الألمانية، الإنجليزية، الصينية):**
   - اللغة الألمانية تحديداً تفتح لك فرص عمل فورية في الشركات الدولية وعقود عمل في ألمانيا.
5. **التصميم الجرافيكي وتصميم واجهات المستخدم (UI/UX & Multimedia):**
   - ممتاز جداً لأصحاب الحس الإبداعي، ومطلوب بشدة في شركات البرمجة والإعلام الرقمي.

⚠️ **تخصصات أنصحك بتجنبها في الأدبي لتكدس الخريجين:** (معلم صف، التربية الابتدائية، التاريخ، الجغرافيا، والعلوم السياسية التقليدية).

---
💬 **كم معدلك المتوقع في التوجيهي الأدبي؟ وأي هذه المسارات الخمسة تشعر أنه الأقرب لشغفك؟**`;
  }

  return `بكل صراحة ومن واقع أرقام التوظيف الفعلية في الأردن والخليج (2026)، إليك **أقوى التخصصات التي أنصحك بها اليوم** مقسمة حسب اهتمامك 🚀🎯:

### 💻 1) إذا كنت تحب التكنولوجيا والعمل عن بُعد بالدولار (الأعلى رواتب):
- **الأمن السيبراني (Cybersecurity):** تشغيل **75%–85%**، راتب بداية **620 د.أ**، وعجز كبير في الكوادر بالبنوك والخليج.
- **علم البيانات والذكاء الاصطناعي (Data Science & AI):** تخصص المستقبل الأول والأكثر مناعة ضد الأتمتة.
- **هندسة البرمجيات (Software Engineering):** مرونة عالية جداً للعمل مع شركات عالمية من بيتك في الأردن.

### 🩺 2) إذا كنت تميل للمجال الصحي والطبي (الأسرع توظيفاً وسفراً):
- **التمريض القانوني (ذكور وإناث):** أسرع تخصص توظيفاً في الأردن (أقل من شهرين انتظار) وعقود فورية في الخليج وألمانيا وأوروبا.
- **تكنولوجيا الأشعة، التخدير والإنعاش، والعلاج الوظيفي:** تخصصات طبية مساندة مطلوبة جداً وبمعدلات قبول أقل من الطب البشري.

### ⚡ 3) إذا كنت تميل للهندسة والأعمال الحديثة:
- **هندسة الميكاترونكس والروبوتات & هندسة الطاقة المتجددة:** بدائل عصرية تتفوق بمراحل على الهندسة المدنية والميكانيكية المشبعة.
- **التكنولوجيا المالية (FinTech) & سلاسل الإمداد واللوجستيات & التسويق الرقمي:** قمم قطاع الأعمال الحديث.

---
💬 **حتى أعطيك توصية مفصلة على مقاسك تماماً: كم معدلك في التوجيهي (أو المتوقع)، وما هو فرعك (علمي / أدبي / صناعي)؟**`;
}

/** 14) تقييم معدل التوجيهي (مع مراعاة التخصص النشط أو القطاع أو الفرع) */
export function generateGradeResponse(
  grade: number,
  detectedField: string | null,
  stream?: string,
  activeMajor?: Major,
): string {
  // إذا كان الطالب يسأل عن تخصص محدد ثم كتب معدله!
  if (activeMajor) {
    return generateCostAndCutoffResponse(activeMajor, undefined, grade);
  }

  const isLiterary = stream === "أدبي";

  if (detectedField) {
    const fieldMajors = majors.filter((m) => m.field === detectedField);
    const demanded = fieldMajors.filter((m) => m.classification === "مطلوب");

    let verdict = "";
    if (detectedField === "الكليات الطبية والصحية") {
      if (grade >= 96.5) {
        verdict = `معدلك (**${grade}%**) استثنائي ويؤهلك للمنافسة القوية على **الطب البشري وطب الأسنان** تنافسياً في الجامعات الحكومية، بالإضافة إلى الصيدلة ودكتور صيدلة والتمريض!`;
      } else if (grade >= 90) {
        verdict = `معدلك (**${grade}%**) ممتاز جداً! يفتح لك **دكتور صيدلة، الصيدلة، والتمريض، وعلوم التأهيل** تنافسياً في كبرى الجامعات الحكومية، كما يتيح لك الطب البشري وطب الأسنان عبر البرنامج الموازي/الدولي.`;
      } else if (grade >= 80) {
        verdict = `بمعدل (**${grade}%**)، فرصتك الذهبية والأقوى توظيفاً في القطاع الصحي هي **التمريض، التخدير والإنعاش، الأشعة، المختبرات الطبية، والعلاج الطبيعي/الوظيفي** في الجامعات الحكومية، أو **الصيدلة** في الجامعات الخاصة والموازي.`;
      } else {
        verdict = `بمعدل (**${grade}%**)، يمكنك دراسة **التمريض والعلوم الطبية المساندة** في الجامعات الخاصة أو كليات جامعة البلقاء التطبيقية المعتمدة.`;
      }
    } else if (detectedField === "الكليات الهندسية") {
      if (grade >= 80) {
        verdict = `معدلك (**${grade}%**) يحقق شرط القبول الرسمي للهندسة (80% فما فوق)! نصيحتي الذهبية لك: استثمر معدلك في **هندسة الحاسوب، الميكاترونكس، الطاقة المتجددة، أو الهندسة الصناعية**، وتجنب الهندسة المدنية والميكانيكية التقليدية المشبعة.`;
      } else {
        verdict = `تنبيه مهم: الحد الأدنى الرسمي لقبول الهندسة في الأردن هو **80%**. بمعدل (**${grade}%**)، البديل الأذكى والأقوى تشغيلياً لك هو **تخصصات تكنولوجيا المعلومات والبرمجيات والأمن السيبراني** (تقبل من 65%+ في الخاص و75%+ في الحكومي ورواتبها أعلى من الهندسة التقليدية!) أو الدبلوم التقني الهندسي في البلقاء التطبيقية.`;
      }
    } else {
      verdict = `معدلك (**${grade}%**) يمنحك فرص قبول ممتازة جداً (تنافس وموازي وخصومات جامعات خاصة) في أبرز تخصصات **${detectedField}**.`;
    }

    return `مبارك! معدلك (**${grade}%**) نقطة انطلاق ممتازة 🎓✨.
بما أن اهتمامك في **${detectedField}**، إليك تقييم فرصك الدقيق:

### 🎯 1) ماذا يفتح لك معدل (${grade}%) في هذا القطاع؟
${verdict}

### 🌟 2) أفضل التخصصات المطلوبة التي أنصحك باختيارها في ${detectedField}:
${demanded
  .slice(0, 4)
  .map(
    (m, i) =>
      `${i + 1}. **${m.name}** — نسبة التشغيل: **${m.employmentRate}** | أبرز الجامعات: ${m.publicUniversities.slice(0, 3).join("، ")}.`,
  )
  .join("\n")}

---
💬 **أي تخصص من هذه القائمة أعجبك أكثر لأحسب لك رسومه الدراسية وأفضل جامعة تقبلك بمعدل ${grade}%؟**`;
  }

  if (isLiterary) {
    return `مبارك! بمعدل **${grade}%** في **الفرع الأدبي**، إليك أفضل الخيارات الذكية المفتوحة أمامك في الجامعات الأردنية 🎓🚀:

- ${
      grade >= 85
        ? `🌟 **فرصتك التنافسية عالية جداً** في الجامعات الحكومية الكبرى (الأردنية، اليرموك، الهاشمية) لتخصصات: **التسويق الرقمي، نظم المعلومات الإدارية (MIS)، اللغات الحديثة (الألمانية/الإنجليزية)، القانون، والعلوم اللوجستية**.`
        : `💡 **فرصتك ممتازة** في الجامعات الحكومية (الهاشمية، آل البيت، البلقاء، مؤتة، الحسين) والجامعات الخاصة المتميزة لدراسة: **التسويق الرقمي، إدارة سلاسل الإمداد واللوجستيات، التصميم الجرافيكي، والترجمة**.`
    }

⚠️ **نصيحة المستشار لمعدل ${grade}% أدبي:** ابتعد عن التخصصات التربوية المشبعة (مثل معلم صف والتاريخ والجغرافيا)، وركّز على التخصصات الإدارية التقنية أو اللغات لأنها الأسرع توظيفاً في القطاع الخاص.

💬 **أي مجال تفضل أن نفصّل لك جامعاته وأسعار ساعاته: (الأعمال والتسويق الرقمي) أم (اللغات والترجمة) أم (التصميم والإعلام) أم (القانون)؟**`;
  }

  // تقييم شامل لمعدل التوجيهي (علمي / عام)
  let tierAdvice = "";
  if (grade >= 95) {
    tierAdvice = `🌟 **الفئة الماسية (${grade}%):** جميع أبواب الجامعات الأردنية مفتوحة أمامك!
- **في القطاع الطبي:** تنافس بقوة على **الطب البشري، طب الأسنان، ودكتور صيدلة** (الأردنية، التكنو، الهاشمية، اليرموك، مؤتة).
- **في قطاع التكنولوجيا والهندسة:** قبول تنافسي مضمون في **الأمن السيبراني، الذكاء الاصطناعي، وعلم البيانات** في (الأردنية، التكنو، وسمية).`;
  } else if (grade >= 85) {
    tierAdvice = `🚀 **الفئة الذهبية (${grade}%):** معدلك ممتاز جداً ويفتح لك أقوى تخصصات المستقبل!
- **في التكنولوجيا (الأعلى رواتب):** **الأمن السيبراني، الذكاء الاصطناعي، هندسة البرمجيات، وعلوم الحاسوب** (في التكنو، الهاشمية، اليرموك، البلقاء، سمية، أو موازي الأردنية).
- **في القطاع الصحي:** **التمريض القانوني، دكتور صيدلة/الصيدلة، العلاج الطبيعي، وتكنولوجيا الأشعة**.
- **في الهندسة الحديثة:** **هندسة الحاسوب، الميكاترونكس، والطاقة المتجددة**.`;
  } else if (grade >= 75) {
    tierAdvice = `💡 **الفئة الذكية (${grade}%):** يمكنك بهذا المعدل التفوق على أصحاب المعدلات الأعلى إذا اخترت تخصصاً عملياً مطلوباً!
- **في التكنولوجيا:** **علوم الحاسوب، هندسة البرمجيات، الأمن السيبراني، وتكنولوجيا معلومات الأعمال (BIT)** في (الهاشمية، آل البيت، البلقاء، الحسين، الطفيلة، أو الجامعات الخاصة بخصم تفوق).
- **في الصحة:** **التمريض، التحاليل الطبية، البصريات، والتخدير والإنعاش**.
- **في الأعمال:** **التكنولوجيا المالية (FinTech)، التسويق الرقمي، والعلوم اللوجستية**.`;
  } else {
    tierAdvice = `🎯 **فئة المهارات العملية (${grade}%):** في سوق العمل اليوم، الشركات توظف على **المهارة** لا على معدل التوجيهي!
- يمكنك دراسة **البرمجيات، الأمن السيبراني، التصميم الجرافيكي، التسويق الرقمي، إدارة الأعمال، أو التمريض المساند** في الجامعات الخاصة المعتمدة أو كليات جامعة البلقاء التطبيقية، وبناء ملف مشاريع قوي يجعلك في الصدارة.`;
  }

  return `مبارك! معدلك (**${grade}%**) في التوجيهي يمنحك خيارات استراتيجية ممتازة 🎓✨:

${tierAdvice}

---
💬 **لأعطيك ترشيحاً دقيقاً بالأسماء والأسعار: هل تميل أكثر إلى (التكنولوجيا والبرمجة) أم (القطاع الصحي والطبي) أم (الهندسة) أم (الأعمال والتسويق)؟**`;
}

/** 15) عرض شامل وطبيعي لتخصص محدد عند السؤال عنه لأول مرة */
function generateMajorConversationalOverview(major: Major, studentGrade?: number): string {
  const sal = getSalaryBenchmarkForMajorOrField(major);
  const adm = getAdmissionInfoForMajor(major);
  const certs = getCertificationsForMajor(major).slice(0, 2);

  const badge =
    major.classification === "مطلوب"
      ? "🟢 **مطلوب في سوق العمل**"
      : major.classification === "مشبع"
        ? "🟡 **مشبع (يتطلب تميزاً ومهارات عملية)**"
        : "🔴 **راكد في التعيين التقليدي (يحتاج مساراً حديثاً أو بديلاً)**";

  return `اختيار رائع للبحث! دعني أعطيك الخلاصة الصريحة والمتكاملة لتخصص **${major.name}** (${major.field}) كما هي في سوق العمل الأردني والإقليمي لعام 2026 🎓📊:

### 📌 1) النظرة السريعة والواقع الوظيفي:
- **حالة الطلب:** ${badge} — نسبة التشغيل التقديرية **${major.employmentRate}** خلال أول سنتين، ومخاطرة التخصص **${major.risk}**.
- **خلاصة الواقع المهني:** ${major.summary}
- **الرواتب المتوقعة:** يبدأ متوسط الراتب في الأردن من **${sal.entryJOD} د.أ** لحديث التخرج، ويرتفع مع الخبرة إلى **${sal.midJOD} – ${sal.seniorJOD} د.أ** (وفي الخليج: **${sal.gulfRangeSAR}** | العمل عن بُعد: **${sal.remotePotential}**).
- **تأثير الذكاء الاصطناعي:** **${major.automation.exposure}** — ${major.automation.note}

### 🏛️ 2) الدراسة والجامعات والرسوم:
- **مدة الدراسة ومعدل القبول:** **${adm.totalHours} ساعة معتمدة** | معدل القبول التقريبي: **${adm.estCutoffRange}**.
- **سعر الساعة التقريبي:** **${adm.estRegularHour}** (تنافس) | **${adm.estParallelHour}** (موازي) | **${adm.estPrivateHour}** (جامعات خاصة).
- **أقوى الجامعات الحكومية:** ${major.publicUniversities.slice(0, 4).join("، ")}.
- **أقوى الجامعات الخاصة:** ${major.privateUniversities.slice(0, 3).join("، ")}.
- **الاعتماد الرسمي والدولي:** ${major.accreditation}${
    certs.length > 0
      ? `\n\n### 📜 3) أقوى شهادتين مجانيتين لدعمك في ${major.name}:\n${certs
          .map((c) => `• **[${c.title}](${c.url})** (${c.provider}) — *${c.howToGet}*`)
          .join("\n")}`
      : ""
  }${
    studentGrade
      ? `\n\n🎯 **بالنسبة لمعدلك (${studentGrade}%):** هل تود أن نحسب التكلفة الإجمالية لدراسة ${major.name} في الجامعة الأقرب لك؟`
      : ""
  }

---
💬 **اسألني بحرية عن أي تفصيل يهمك في ${major.name}، مثلاً:**
- *"كم يكلف دراسة التخصص بالتفصيل وكم سعر الساعة؟"*
- *"أيهما أفضل لدراسته: ${major.publicUniversities[0] || "الأردنية"} أم ${major.publicUniversities[1] || "التكنو"}؟"*
- *"هل دراسة ${major.name} صعبة وشو المواد اللي فيه؟"*
- *"قارن لي بين ${major.name} وتخصص آخر"*`;
}

// ============================================================================
// المحرك الرئيسي الذكي (يدعم السياق الكامل للمحادثة ويفهم 18+ نية مختلفة)
// ============================================================================

export function generateLocalAdvisorResponse(
  userQuery: string,
  conversationMessages?: unknown[],
): string {
  const norm = normalizeArabic(userQuery);
  const memory = buildConversationMemory(userQuery, conversationMessages);

  // -------------------------------------------------------------------------
  // 0) التعامل مع ردود اختيار الخيارات التفاعلية ("الخيار 1"، "الأول"، "نعم"، "اه")
  // -------------------------------------------------------------------------
  if (
    memory.activeMajor &&
    (norm === "1" ||
      norm === "الخيار 1" ||
      norm === "الاول" ||
      norm.includes("فرص قبولي") ||
      norm.includes("حساب التكلفه"))
  ) {
    return generateCostAndCutoffResponse(
      memory.activeMajor,
      memory.activeUniversity,
      memory.studentGrade,
    );
  }
  if (
    memory.activeMajor &&
    (norm === "2" || norm === "الخيار 2" || norm === "الثاني")
  ) {
    // عرض البدائل
    const alts =
      memory.activeMajor.alternatives && memory.activeMajor.alternatives.length > 0
        ? memory.activeMajor.alternatives
        : majors
            .filter(
              (m) =>
                m.field === memory.activeMajor!.field &&
                m.slug !== memory.activeMajor!.slug &&
                m.classification === "مطلوب",
            )
            .slice(0, 3)
            .map((m) => ({
              name: m.name,
              reason: `نسبة تشغيل ${m.employmentRate} ومخاطرة ${m.risk}`,
            }));
    return `إليك أفضل **البدائل الأكاديمية الذكية** لتخصص **${memory.activeMajor.name}** ضمن نفس القطاع 🎯:\n\n${alts
      .map((a) => `• **${a.name}:** ${a.reason}`)
      .join("\n")}\n\n💬 **هل تود أن أقارن لك في جدول مباشر بين ${memory.activeMajor.name} وأحد هذه البدائل؟**`;
  }
  if (
    memory.activeMajor &&
    (norm === "3" || norm === "الخيار 3" || norm === "الثالث")
  ) {
    return generateBestUniForMajorResponse(memory.activeMajor, memory.studentGrade);
  }

  // -------------------------------------------------------------------------
  // 1) الترحيب، الشكر، والأسئلة الحوارية السريعة (Greetings & Appreciation)
  // -------------------------------------------------------------------------
  const isPureGreeting =
    /^(مرحبا|اهلا|السلام عليكم|سلام|صباح الخير|مساء الخير|كيفك|كيف حالك|شو اخبارك|هاي|هلا|يا هلا|يعطيك العافيه|من انت|مين انت|شو بتعمل)$/.test(
      norm,
    );

  if (isPureGreeting) {
    if (memory.activeMajor) {
      return `يا هلا بك! يسعدني متابعة الحديث معك 😊🎓. كنا نتحدث عن تخصص **${memory.activeMajor.name}** — هل تحب أن نكمل في حساب تكاليفه ومعدلات قبوله، أم نقارنه مع تخصص آخر، أم تسألني عن موضوع جديد؟`;
    }
    return `يا أهلاً وسهلاً بك! أنا مرشدك الأكاديمي والمهني الذكي في منصة **«الطلاب والمستقبل»** 😊🎓.

تحدث معي بشكل طبيعي تماماً كما تتحدث مع مستشار خبير؛ يمكنك أن تسألني مباشرة مثلاً:
- *"محتار بين الأمن السيبراني والذكاء الاصطناعي، مين أحسن؟"*
- *"معدلي 86 علمي، شو أفضل تخصص إله مستقبل ورواتب عالية؟"*
- *"كم راتب الممرض أو مهندس البرمجيات في الأردن والخليج؟"*
- *"كم سعر ساعة الطب أو الحاسوب في الأردنية والتكنو؟"*

**بماذا تفكر حالياً؟ شاركني سؤالك أو معدلك ولنبدأ!**`;
  }

  const isThanks =
    /^(شكرا|شكرا جزيلا|يسلمو|يعطيك العافيه|مشكور|ما قصرت|ممتاز|تمام|حلو|رائع|شكرا لك)$/.test(
      norm,
    );

  if (isThanks) {
    return `العفو يا بطل، واجبي وأتمنى لك كل التوفيق والنجاح في مسيرتك الجامعية والمهنية 🌟🎓!${
      memory.activeMajor
        ? `\n\nإذا خطر ببالك أي سؤال إضافي حول **${memory.activeMajor.name}** (مثل أسعار الساعات، المنح، أو المقارنة مع تخصص آخر)، أنا جاهز فوراً!`
        : "\n\nأنا هنا دائماً إذا احتجت أي مقارنة أو استشارة أخرى."
    }`;
  }

  // -------------------------------------------------------------------------
  // 2) المقارنة المباشرة بين تخصصين (سواء ذُكرا في نفس الرسالة أو أحدهما في الذاكرة!)
  // -------------------------------------------------------------------------
  const currentMajors = findMentionedMajors(userQuery);
  const isComparisonIntent =
    norm.includes("مقارن") ||
    norm.includes("قارن") ||
    norm.includes("الفرق بين") ||
    norm.includes("شو الفرق") ||
    norm.includes("محتار بين") ||
    norm.includes("ايهما افضل") ||
    norm.includes("مين احسن") ||
    norm.includes("مين افضل") ||
    norm.includes(" ولا ") ||
    norm.includes(" ام ");

  if (currentMajors.length >= 2) {
    return generateTwoMajorsComparisonResponse(
      currentMajors[0]!,
      currentMajors[1]!,
      memory.studentGrade,
    );
  }

  if (
    isComparisonIntent &&
    currentMajors.length === 1 &&
    memory.secondMajor &&
    memory.secondMajor.slug !== currentMajors[0]!.slug
  ) {
    return generateTwoMajorsComparisonResponse(
      memory.secondMajor,
      currentMajors[0]!,
      memory.studentGrade,
    );
  }

  // -------------------------------------------------------------------------
  // 3) المقارنة بين جامعتين (سواء في نفس الرسالة أو مع الجامعة السابقة في الذاكرة)
  // -------------------------------------------------------------------------
  const currentUnis = findMentionedUniversities(userQuery);
  if (currentUnis.length >= 2) {
    return generateUniversityComparisonResponse(
      currentUnis[0]!,
      currentUnis[1]!,
      memory.activeMajor,
    );
  }
  if (
    isComparisonIntent &&
    currentUnis.length === 1 &&
    memory.secondUniversity &&
    memory.secondUniversity.id !== currentUnis[0]!.id
  ) {
    return generateUniversityComparisonResponse(
      memory.secondUniversity,
      currentUnis[0]!,
      memory.activeMajor,
    );
  }

  // -------------------------------------------------------------------------
  // 4) نية السؤال عن الرواتب والدخل المالي (Salary & Income Intent)
  // -------------------------------------------------------------------------
  const isSalaryIntent =
    norm.includes("راتب") ||
    norm.includes("رواتب") ||
    norm.includes("كم بياخذ") ||
    norm.includes("كم بيقبض") ||
    norm.includes("كم دخل") ||
    norm.includes("الدخل") ||
    norm.includes("فلوس") ||
    norm.includes("مصاري") ||
    norm.includes("مربح") ||
    norm.includes("العائد المالي") ||
    norm.includes("اجور");

  if (isSalaryIntent) {
    return generateSalaryIntentResponse(memory.activeMajor, memory.activeSector);
  }

  // -------------------------------------------------------------------------
  // 5) نية السؤال عن سعر الساعة، التكلفة، الأقساط، الموازي، ومعدلات القبول
  // -------------------------------------------------------------------------
  const isCostOrCutoffIntent =
    norm.includes("سعر الساعه") ||
    norm.includes("اسعار الساعات") ||
    norm.includes("كم الساعه") ||
    norm.includes("بكم الساعه") ||
    norm.includes("تكلفه") ||
    norm.includes("التكلفه") ||
    norm.includes("كم بيكلف") ||
    norm.includes("كم يكلف") ||
    norm.includes("رسوم") ||
    norm.includes("اقساط") ||
    norm.includes("موازي") ||
    norm.includes("الموازي") ||
    norm.includes("معدل قبول") ||
    norm.includes("معدلات القبول") ||
    norm.includes("كم معدله") ||
    norm.includes("الحد الادني") ||
    norm.includes("حدود دنيا") ||
    norm.includes("تنافس");

  if (isCostOrCutoffIntent) {
    return generateCostAndCutoffResponse(
      memory.activeMajor,
      memory.activeUniversity,
      memory.studentGrade,
    );
  }

  // -------------------------------------------------------------------------
  // 6) نية السؤال عن طبيعة الدراسة، الصعوبة، المواد، وعدد السنوات
  // -------------------------------------------------------------------------
  const isStudyNatureIntent =
    norm.includes("صعب") ||
    norm.includes("صعوب") ||
    norm.includes("سهل") ||
    norm.includes("شو بيدرسو") ||
    norm.includes("ماذا يدرس") ||
    norm.includes("مواد") ||
    norm.includes("طبيعه الدراسه") ||
    norm.includes("طبيعه التخصص") ||
    norm.includes("كم سنه") ||
    norm.includes("كم ساعه") ||
    norm.includes("عدد ساعات") ||
    norm.includes("انجليزي") ||
    norm.includes("يحتاج رياضيات") ||
    norm.includes("حفظ ولا فهم");

  if (isStudyNatureIntent && memory.activeMajor) {
    return generateStudyNatureAndDifficultyResponse(memory.activeMajor);
  }

  // -------------------------------------------------------------------------
  // 7) نية السؤال عن العمل عن بُعد، الفريلانس، أو السفر للخليج وألمانيا
  // -------------------------------------------------------------------------
  const isRemoteOrAbroadIntent =
    norm.includes("عن بعد") ||
    norm.includes("ريموت") ||
    norm.includes("فريلانس") ||
    norm.includes("عمل حر") ||
    norm.includes("بالدولار") ||
    norm.includes("الخليج") ||
    norm.includes("السعوديه") ||
    norm.includes("الامارات") ||
    norm.includes("قطر") ||
    norm.includes("سفر") ||
    norm.includes("خارج الاردن") ||
    norm.includes("بره الاردن") ||
    (norm.includes("المانيا") && !norm.includes("الجامعه الالمانيه"));

  if (isRemoteOrAbroadIntent) {
    return generateRemoteAndAbroadResponse(memory.activeMajor);
  }

  // -------------------------------------------------------------------------
  // 8) نية السؤال عن تأثير الذكاء الاصطناعي والأتمتة وهل سينقرض التخصص
  // -------------------------------------------------------------------------
  const isAutomationIntent =
    norm.includes("اتمته") ||
    norm.includes("الذكاء الاصطناعي يلغي") ||
    norm.includes("رح يلغيه") ||
    norm.includes("ينقرض") ||
    norm.includes("يستبدل") ||
    norm.includes("مناعه امام الذكاء") ||
    norm.includes("امام الذكاء الاصطناعي") ||
    norm.includes("مع الذكاء الاصطناعي") ||
    norm.includes("خطر الذكاء الاصطناعي");

  if (isAutomationIntent) {
    return generateAiAutomationResponse(memory.activeMajor);
  }

  // -------------------------------------------------------------------------
  // 9) نية السؤال عن أفضل جامعة لتخصص معين (بما فيها أزرار المتابعة السريعة!)
  // -------------------------------------------------------------------------
  const isBestUniForMajorIntent =
    (norm.includes("افضل جامعه") ||
      norm.includes("احسن جامعه") ||
      norm.includes("اي جامعه") ||
      norm.includes("وين ادرس") ||
      norm.includes("وين بيدرسو") ||
      norm.includes("تطرح هذا التخصص") ||
      norm.includes("تطرح التخصص") ||
      norm.includes("جامعات تدرس")) &&
    Boolean(memory.activeMajor);

  if (isBestUniForMajorIntent && memory.activeMajor) {
    return generateBestUniForMajorResponse(memory.activeMajor, memory.studentGrade);
  }

  // -------------------------------------------------------------------------
  // 10) نية السؤال عن الشهادات والدورات المجانية (مع دعم كامل لذاكرة المحادثة!)
  // -------------------------------------------------------------------------
  const isCertsIntent =
    norm.includes("شهادات") ||
    norm.includes("دورات") ||
    norm.includes("شهاده") ||
    norm.includes("دوره") ||
    norm.includes("كورس") ||
    norm.includes("كورسات") ||
    norm.includes("اطور نفسي") ||
    norm.includes("مهارات مطلوبه");

  if (isCertsIntent) {
    if (memory.activeMajor) {
      const certs = getCertificationsForMajor(memory.activeMajor);
      const certsText = certs
        .map(
          (c, i) =>
            `${i + 1}. **[${c.title}](${c.url})** — *(المانح: ${c.provider})*\n   - **كيف تحصل عليها مجاناً؟** ${c.howToGet}\n   - **ماذا تضيف لسيرتك الذاتية؟** ${c.summary}`,
        )
        .join("\n\n");

      return `لدعم سيرتك الذاتية في تخصص **${memory.activeMajor.name}** والتفوق على الخريجين في المقابلات، إليك أقوى **الشهادات والدورات العالمية المجانية المعتمدة** 📜🚀:

${certsText}

---
💡 **نصيحة عملية:** ابدأ بأخذ الشهادة الأولى خلال فصلك الدراسي القادم وأضفها مباشرة إلى حسابك على **LinkedIn**!
💬 **هل تريد معرفة أفضل الجامعات لدراسة ${memory.activeMajor.name} أم حساب تكاليفه الدراسية؟**`;
    }

    if (memory.activeSector) {
      const certs = getCertificationsForField(memory.activeSector).slice(0, 4);
      const certsText = certs
        .map(
          (c, i) =>
            `${i + 1}. **[${c.title}](${c.url})** — *(المانح: ${c.provider})*\n   - **طريقة الحصول مجاناً:** ${c.howToGet}\n   - **الفائدة المهنية:** ${c.summary}`,
        )
        .join("\n\n");

      return `إليك أقوى **الشهادات والدورات العالمية المجانية المعتمدة** لـ **${memory.activeSector}** 📜🚀:

${certsText}

---
💬 **ما هو التخصص المحدد داخل ${memory.activeSector} الذي تود التركيز عليه؟**`;
    }

    return `منصتنا توفر لك **أكثر من 215 دورة وشهادة عالمية مجانية معتمدة** (من Harvard و Google و Cisco و Edraak و Alison و Saylor) مقسمة على 13 قطاعاً أكاديمياً 📜✨!

أخبرني فقط: **ما هو تخصصك أو المجال الذي تهتم به (مثل: الأمن السيبراني، الطب والتمريض، الهندسة، إدارة الأعمال، القانون، التصميم)؟** وسأعطيك الروابط المباشرة لأقوى الشهادات المجانية الخاصة به فوراً!`;
  }

  // -------------------------------------------------------------------------
  // 11) نية السؤال عن البدائل الذكية (مع دعم كامل لذاكرة المحادثة!)
  // -------------------------------------------------------------------------
  const isAlternativesIntent =
    norm.includes("بدائل") ||
    norm.includes("بديل") ||
    norm.includes("خيارات ثانيه") ||
    norm.includes("تخصصات قريبه") ||
    norm.includes("لو ما طلعلي");

  if (isAlternativesIntent) {
    if (memory.activeMajor) {
      const fieldAlternatives =
        memory.activeMajor.alternatives && memory.activeMajor.alternatives.length > 0
          ? memory.activeMajor.alternatives
          : majors
              .filter(
                (m) =>
                  m.field === memory.activeMajor!.field &&
                  m.slug !== memory.activeMajor!.slug &&
                  m.classification === "مطلوب",
              )
              .slice(0, 3)
              .map((m) => ({
                name: m.name,
                reason: `تخصص مطلوب في نفس القطاع بنسبة تشغيل ${m.employmentRate} ومخاطرة ${m.risk}`,
              }));

      return `إذا كنت تبحث عن **بدائل ذكية وأكثر أماناً وظيفياً** لتخصص **${memory.activeMajor.name}** ضمن نفس القطاع (**${memory.activeMajor.field}**)، فإليك أفضل الخيارات المعتمدة 🎯:

${fieldAlternatives.map((a, i) => `${i + 1}. **${a.name}:** ${a.reason}.`).join("\n")}

---
💬 **أي من هذه البدائل تود أن أقارنه لك في جدول مباشر مع ${memory.activeMajor.name}؟**`;
    }

    return `يسعدني أن أقترح عليك **بدائل أكاديمية ذكية وعالية التشغيل**! 🎯
فقط أخبرني: **ما هو التخصص الذي تفكر فيه حالياً أو تخشى أنه مشبع/راكد؟** (مثال: *شو بديل الهندسة المدنية؟* أو *شو بديل الصيدلة؟* أو *شو بديل معلم صف؟*)`;
  }

  // -------------------------------------------------------------------------
  // 12) نية السؤال عن الوظائف ومجالات العمل وديوان الخدمة
  // -------------------------------------------------------------------------
  const isJobsIntent =
    norm.includes("وين بيشتغل") ||
    norm.includes("شو بيشتغل") ||
    norm.includes("مجالات العمل") ||
    norm.includes("مجالات شغل") ||
    norm.includes("فرص عمل") ||
    norm.includes("وظائف") ||
    norm.includes("ديوان الخدمه") ||
    norm.includes("التوظيف");

  if (isJobsIntent && memory.activeMajor) {
    return generateJobsAndCareerPathResponse(memory.activeMajor);
  }

  // -------------------------------------------------------------------------
  // 13) استعلام معدل التوجيهي (في الرسالة الحالية)
  // -------------------------------------------------------------------------
  const currentGrade = extractGradeFromText(userQuery, true);
  if (currentGrade !== undefined) {
    return generateGradeResponse(
      currentGrade,
      detectMajorField(userQuery) || memory.activeSector || null,
      memory.studentStream,
      currentMajors.length === 1 ? currentMajors[0] : undefined,
    );
  }

  // -------------------------------------------------------------------------
  // 14) استعلام عن جامعة واحدة محددة
  // -------------------------------------------------------------------------
  if (currentUnis.length === 1 && currentMajors.length === 0) {
    return generateUniversityDetailResponse(currentUnis[0]!, memory.activeMajor);
  }

  // إذا ذكر الطالب تخصصاً وجامعة معاً في نفس السؤال (مثلاً: "كيف تخصص الأمن السيبراني في جامعة العلوم والتكنولوجيا؟")
  if (currentUnis.length === 1 && currentMajors.length === 1) {
    const u = currentUnis[0]!;
    const m = currentMajors[0]!;
    const adm = getAdmissionInfoForMajor(m);
    const cutoff = adm.exactMatches.find((x) =>
      normalizeArabic(x.university).includes(normalizeArabic(u.name)),
    );

    return `دراسة تخصص **${m.name}** في **${u.name}** (${u.location.city}) خيار مميز جداً! إليك التفاصيل الدقيقة 🎓🏛️:

- **قوة التخصص في الجامعة:** تُصنف **${u.name}** (${u.rankingSummary}) ضمن أبرز الجامعات المعتمدة، وتتميز بـ: ${u.uniqueAdvantages[0]}.
- **المرافق التدريبية والمختبرات:** ${u.trainingFacilities}
- **الاعتمادات الرسمية والدولية:** ${u.internationalAccreditations.join("، ")} | (${m.accreditation}).
- **مؤشر التوظيف للتخصص:** مصنف **${m.classification}** بنسبة تشغيل **${m.employmentRate}** ومخاطرة **${m.risk}**.
${
  cutoff
    ? `- **معدل القبول التنافسي والرسوم في ${u.name}:** معدل التنافس **${cutoff.cutoff2024}%** | سعر ساعة التنافس **${cutoff.regularHourPriceJOD} د.أ** | سعر ساعة الموازي **${cutoff.parallelHourPriceJOD} د.أ** (${cutoff.totalCreditHours} ساعة معتمدة).`
    : `- **الساعات والرسوم التقريبية:** ${adm.totalHours} ساعة معتمدة (${adm.estRegularHour} للتنافس / ${adm.estParallelHour} للموازي).`
}

---
💬 **كم معدلك في التوجيهي لنفحص فرصة قبولك في ${u.name}؟ أم تود مقارنتها مع جامعة أخرى تطرح ${m.name}؟**`;
  }

  // -------------------------------------------------------------------------
  // 15) استعلام عام عن خريطة الجامعات الأردنية
  // -------------------------------------------------------------------------
  const isGeneralUniQuery =
    norm.includes("جامع") &&
    (norm.includes("معلومات") ||
      norm.includes("بيميز") ||
      norm.includes("يميز") ||
      norm.includes("ميزه") ||
      norm.includes("اختار") ||
      norm.includes("احسن") ||
      norm.includes("افضل") ||
      norm.includes("حكومي") ||
      norm.includes("خاص") ||
      norm.includes("دليل") ||
      norm.includes("قائمه") ||
      norm.includes("ترتيب") ||
      norm.includes("تصنيف") ||
      norm.includes("شو الفرق"));

  if (isGeneralUniQuery) {
    return generateUniversitiesOverviewResponse();
  }

  // -------------------------------------------------------------------------
  // 16) استعلام عن النصائح والتوصيات ("بشو بتنصحني"، "شو أدرس"، "أفضل تخصص")
  // -------------------------------------------------------------------------
  const isAdviceQuery =
    norm.includes("بتنصح") ||
    norm.includes("تنصح") ||
    norm.includes("نصيح") ||
    norm.includes("انصحني") ||
    norm.includes("نصح") ||
    norm.includes("افضل تخصص") ||
    norm.includes("احسن تخصص") ||
    norm.includes("اقوي تخصص") ||
    norm.includes("تخصصات المستقبل") ||
    norm.includes("تخصصات مطلوبه") ||
    norm.includes("شو ادرس") ||
    norm.includes("ايش ادرس") ||
    norm.includes("شو اختار") ||
    norm.includes("ايش اختار") ||
    norm.includes("محتار شو") ||
    norm.includes("محتار باختيار") ||
    norm.includes("شو التخصصات الكويسه") ||
    norm.includes("تخصصات لها مستقبل") ||
    norm.includes("اله مستقبل") ||
    norm.includes("شو بتشوف احسن") ||
    (norm.includes("شو التخصصات") && !norm.includes("كليه")) ||
    (norm.includes("اقتراح") && norm.includes("تخصص"));

  const detectedSector = detectMajorField(userQuery);

  if (isAdviceQuery) {
    if (detectedSector && currentMajors.length === 0) {
      return generateSectorOverviewResponse(detectedSector);
    }
    if (currentMajors.length === 0) {
      return generateTopMajorsAdviceResponse(
        userQuery,
        memory.studentStream,
        memory.studentGrade,
      );
    }
  }

  // -------------------------------------------------------------------------
  // 17) استعلام قطاعي عام ("التخصصات الطبية"، "تخصصات الهندسة"، "كلية الأعمال")
  // -------------------------------------------------------------------------
  const isExplicitSector =
    norm.includes("تخصصات") ||
    norm.includes("مجال") ||
    norm.includes("قطاع") ||
    norm.includes("كليات") ||
    norm.includes("كليه") ||
    norm.includes("فروع") ||
    norm.includes("مسارات") ||
    norm.includes("شو وضع");

  if (isExplicitSector && detectedSector && currentMajors.length === 0) {
    return generateSectorOverviewResponse(detectedSector);
  }

  // -------------------------------------------------------------------------
  // 18) استعلام عن تخصص محدد
  // -------------------------------------------------------------------------
  if (currentMajors.length > 0) {
    return generateMajorConversationalOverview(currentMajors[0]!, memory.studentGrade);
  }

  // إذا سأل عن قطاع بدون كلمة "تخصصات" (مثلاً كتب "الهندسة" أو "تكنولوجيا المعلومات")
  if (detectedSector) {
    return generateSectorOverviewResponse(detectedSector);
  }

  // -------------------------------------------------------------------------
  // 19) إذا طلب مقارنة عامة ولم يذكر التخصصين بعد
  // -------------------------------------------------------------------------
  if (isComparisonIntent) {
    if (memory.activeMajor) {
      return `أنت الآن تستعرض تخصص **${memory.activeMajor.name}** ⚖️.\n**اكتب لي اسم التخصص الثاني** الذي تريد مقارنته مع **${memory.activeMajor.name}** (مثلاً: *${
        memory.activeMajor.alternatives[0]?.name || "علم البيانات والذكاء الاصطناعي"
      }*) وسأضع لك جدول مقارنة شامل بينهما فوراً!`;
    }
    return `يسعدني جداً أن أقارن لك بين أي تخصصين أو جامعتين بالأرقام الرسمية! ⚖️📊
فقط **اكتب لي اسم التخصصين** (مثال: *قارن بين الأمن السيبراني وهندسة البرمجيات* أو *الفرق بين التمريض ودكتور صيدلة*) وسأعطيك جدول مقارنة شامل مع حكم صريح أيهما أنسب لك!`;
  }

  // -------------------------------------------------------------------------
  // 20) رد ذكي مرن لأي سؤال آخر (يرتبط بالسياق النشط إن وُجد ولا يكرر قوالب جامدة)
  // -------------------------------------------------------------------------
  if (memory.activeMajor) {
    return `بخصوص استفسارك حول تخصص **${memory.activeMajor.name}** (${memory.activeMajor.field}) 🎯:
يمكنني تزويدك فوراً بالتفصيل الذي تبحث عنه بدقة؛ اختر أو اكتب ما يهمك الآن:
1. 💰 **الرواتب والدخل:** *"كم راتب ${memory.activeMajor.name} في الأردن والخليج؟"*
2. 💳 **التكلفة ومعدلات القبول:** *"كم سعر ساعة ${memory.activeMajor.name} وكم معدله تنافس وموازي؟"*
3. 🏛️ **أفضل الجامعات:** *"أي جامعة أفضل لدراسة ${memory.activeMajor.name}؟"*
4. 📚 **طبيعة الدراسة والمواد:** *"هل دراسة ${memory.activeMajor.name} صعبة وشو مواده؟"*
5. ⚖️ **المقارنة والبدائل:** *"قارن بين ${memory.activeMajor.name} وتخصص آخر"*`;
  }

  return `أهلاً بك في **المستشار الذكي التفاعلي** لمنصة «الطلاب والمستقبل» 🎓✨!

حتى أعطيك إجابة دقيقة ومفصلة بدون أي عموميات، يمكنك سؤالي مباشرة بأي صيغة تحبها، مثلاً:
- 🎯 **حسب معدلك:** *"معدلي 85 علمي، شو أفضل التخصصات المطلوبة؟"*
- ⚖️ **مقارنة تخصصين أو جامعتين:** *"قارن بين الأمن السيبراني والذكاء الاصطناعي"* أو *"الأردنية ولا التكنو؟"*
- 💰 **الرواتب والتكاليف:** *"كم راتب مهندس البرمجيات أو الممرض؟"* أو *"كم سعر ساعة الطب؟"*
- 📚 **تفاصيل أي تخصص:** اكتب اسم التخصص (مثل: *التمريض، دكتور صيدلة، هندسة الميكاترونكس، التسويق الرقمي، القانون*) وسأحلله لك بالكامل!`;
}
