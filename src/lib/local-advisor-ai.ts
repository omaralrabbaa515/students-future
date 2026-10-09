import { majors, type Major } from "@/data/majors";
import { certifications, type Certification } from "@/data/certifications";
import { universities, type University } from "@/data/universities";

/** تطبيع النص العربي للبحث المرن */
export function normalizeArabic(text: string): string {
  return text
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // إزالة التشكيل
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

/** الكشف الدقيق عن المجال أو القطاع الأكاديمي لمنع تشتيت الطالب */
export function detectMajorField(query: string): string | null {
  const norm = normalizeArabic(query);

  // 1. الكليات الطبية والصحية
  if (
    norm.includes("طبي") ||
    norm.includes("طب") ||
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
    norm.includes("دكتور")
  ) {
    return "الكليات الطبية والصحية";
  }

  // 2. كليات تكنولوجيا المعلومات والذكاء الاصطناعي
  if (
    norm.includes("ذكاء اصطناعي") ||
    norm.includes("امن سيبراني") ||
    norm.includes("سيبراني") ||
    norm.includes("برمج") ||
    norm.includes("حاسوب") ||
    norm.includes("حوسب") ||
    norm.includes("كمبيوتر") ||
    norm.includes("علم بيانات") ||
    norm.includes("تكنولوجيا المعلومات") ||
    norm.includes("تقنيه المعلومات") ||
    norm.includes("اي تي") ||
    /\b(ai|it|cs|cyber)\b/i.test(query)
  ) {
    return "كليات تكنولوجيا المعلومات والذكاء الاصطناعي";
  }

  // 3. الكليات الهندسية
  if (
    norm.includes("هندس") ||
    norm.includes("مدني") ||
    norm.includes("ميكانيك") ||
    norm.includes("كهرباء") ||
    norm.includes("معماري") ||
    norm.includes("عمارة") ||
    norm.includes("ميكاترونكس") ||
    norm.includes("طاقه متجدده") ||
    norm.includes("طيران")
  ) {
    return "الكليات الهندسية";
  }

  // 4. الكليات الإدارية والاقتصادية والمالية
  if (
    norm.includes("اداره اعمال") ||
    norm.includes("محاسب") ||
    norm.includes("تمويل") ||
    norm.includes("تسويق") ||
    norm.includes("اقتصاد") ||
    norm.includes("مالي") ||
    norm.includes("اعمال") ||
    norm.includes("بنوك") ||
    norm.includes("لوجست")
  ) {
    return "الكليات الإدارية والاقتصادية والمالية";
  }

  // 5. كليات حقوق وقانون
  if (
    norm.includes("حقوق") ||
    norm.includes("قانون") ||
    norm.includes("محاماه") ||
    norm.includes("قضائ")
  ) {
    return "كليات حقوق وقانون";
  }

  // 6. كليات الإعلام والاتصال
  if (
    norm.includes("اعلام") ||
    norm.includes("صحاف") ||
    norm.includes("اذاع") ||
    norm.includes("تلفزيون") ||
    norm.includes("علاقات عامه")
  ) {
    return "كليات الإعلام والاتصال";
  }

  // 7. كليات الفنون والتصميم
  if (
    norm.includes("فنون") ||
    norm.includes("تصميم") ||
    norm.includes("جرافيك") ||
    norm.includes("ديكور") ||
    norm.includes("داخلي") ||
    norm.includes("سينما")
  ) {
    return "كليات الفنون والتصميم";
  }

  // 8. كليات الأدب واللغات والعلوم الإنسانية
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

  // 9. كليات الشريعة والدراسات الإسلامية
  if (
    norm.includes("شريع") ||
    norm.includes("فقه") ||
    norm.includes("اسلامي") ||
    norm.includes("اصول دين")
  ) {
    return "كليات الشريعة والدراسات الإسلامية";
  }

  // 10. كليات التربية والعلوم التربوية
  if (
    norm.includes("تربي") ||
    norm.includes("معلم صف") ||
    norm.includes("طفول") ||
    norm.includes("تربوي")
  ) {
    return "كليات التربية والعلوم التربوية";
  }

  // 11. كليات الرياضة والسياحة
  if (
    norm.includes("رياض") ||
    norm.includes("سياح") ||
    norm.includes("فندق")
  ) {
    return "كليات الرياضة والسياحة";
  }

  // 12. كليات الزراعة والبيئة
  if (
    norm.includes("زراع") ||
    norm.includes("نبات") ||
    norm.includes("بيئ")
  ) {
    return "كليات الزراعة والبيئة";
  }

  // 13. كليات العلوم الأساسية والتطبيقية
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

/** استخراج الشهادات الاحترافية المجانية المعتمدة الحصرية لمجال معين لمنع أي تشتيت */
export function getCertificationsForField(fieldName: string): Certification[] {
  const targetCategory = FIELD_TO_CERT_CATEGORY[fieldName];
  if (targetCategory) {
    const list = certifications.filter((c) => c.category === targetCategory);
    if (list.length > 0) return list;
  }
  return certifications.slice(0, 3);
}

/** استخراج الشهادات الاحترافية للتخصص مع الالتزام الصارم بمجاله ومساره الأكاديمي */
export function getCertificationsForMajor(major: Major): Certification[] {
  const fieldCerts = getCertificationsForField(major.field);
  const targetCategory = FIELD_TO_CERT_CATEGORY[major.field];

  // إذا كانت الشهادات المربوطة بالتخصص موجودة وتنتمي لنفس مجاله
  const linked = certifications.filter(
    (c) => major.certificationIds.includes(c.id) && (!targetCategory || c.category === targetCategory),
  );
  if (linked.length > 0) return linked.slice(0, 3);

  return fieldCerts.slice(0, 3);
}

const UNIVERSITY_KEYWORDS: { words: string[]; id: string }[] = [
  { words: ["الاردنيه", "الجامعه الاردنيه", "uj"], id: "uj" },
  { words: ["التكنو", "العلوم والتكنولوجيا", "just"], id: "just" },
  { words: ["الهاشميه", "الجامعه الهاشميه", "hu"], id: "hu" },
  { words: ["الالمانيه", "الالمانيه الاردنيه", "gju"], id: "gju" },
  { words: ["اليرموك", "جامعه اليرموك", "yu"], id: "yu" },
  { words: ["البلقاء", "البلقاء التطبيقيه", "السلط", "bau"], id: "bau" },
  { words: ["موته", "جامعه موته", "الجناح العسكري", "mutah"], id: "mutah" },
  { words: ["ال البيت", "جامعه ال البيت", "المفرق", "aabu"], id: "aabu" },
  { words: ["الحسين بن طلال", "جامعه الحسين", "معان", "ahu"], id: "ahu" },
  { words: ["الطفيله", "الطفيله التقنيه", "ttu"], id: "ttu" },
  { words: ["سميه", "الاميره سميه", "psut"], id: "psut" },
  { words: ["العلوم التطبيقيه", "التطبيقيه الخاصه", "asu"], id: "asu" },
  { words: ["البترا", "جامعه البترا", "uop"], id: "uop" },
  { words: ["عمان الاهليه", "الاهليه", "aau"], id: "aau" },
  { words: ["الزيتونه", "الزيتونه الاردنيه", "zuj"], id: "zuj" },
  { words: ["الشرق الاوسط", "meu"], id: "meu" },
  { words: ["فيلادلفيا", "philadelphia"], id: "philadelphia" },
  { words: ["الاسراء", "جامعه الاسراء", "isra"], id: "isra" },
  { words: ["العقبه", "العقبه للتكنولوجيا", "aut"], id: "aut" },
];

/** العثور على جميع الجامعات المذكورة في الاستعلام للمقارنة الدقيقة بينها */
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

/** العثور على أفضل جامعة مطابقة من قائمة الجامعات الأردنية المعتمدة */
export function findMatchingUniversity(query: string): University | undefined {
  const list = findMentionedUniversities(query);
  if (list.length > 0) return list[0];

  const normQuery = normalizeArabic(query);
  return universities.find((u) => {
    const normName = normalizeArabic(u.name);
    return normQuery.includes(normName) || normName.includes(normQuery);
  });
}

/** توليد ملف تفصيلي موجز وسلس لجامعة معينة دون تشتيت الطالب بأي جامعة أخرى */
export function generateUniversityDetailResponse(u: University): string {
  return `أهلاً بك! إليك الملف الرسمي المعتمد لـ **${u.name} (${u.englishName})** استناداً لبيانات **وزارة التعليم العالي** وهيئة الاعتماد (HEAC) وتصنيفات QS 🎓🏛️:

---

## 📌 1) بطاقة الجامعة وهوية التميز:
- **النوع والموقع:** جامعة **${u.type}** في مدينة **${u.location.city}** (إقليم ${u.location.region}).
- **السمعة والتصنيف:** ${u.rankingSummary}.
- **الموقع الرسمي:** [زيارة البوابة الرسمية للجامعة](${u.website}).

---

## 🌟 2) أبرز ما يميزها تنافسياً:
${u.uniqueAdvantages.slice(0, 3).map((adv) => `• **${adv}**`).join("\n")}

---

## 🏆 3) الكليات الرائدة والاعتمادات الدولية:
- **الكليات الأقوى:** ${u.flagshipColleges.slice(0, 3).join("، ")}.
- **الاعتمادات الدولية:** ${u.internationalAccreditations.join("، ")}.
- **المرافق التدريبية والميدانية:** ${u.trainingFacilities}.

---

## 🧭 4) نصيحة المستشار الذكي: لمن تناسب؟
${u.advisorRecommendation}

---

🤝 **خطوتك التالية لنصل لقرارك النهائي بخصوص ${u.name}:**
- ما هو التخصص الذي تنوي دراسته فيها؟
- كم معدلك في التوجيهي لنفحص فرص قبولك التنافسي والموازي ومعدلات السنوات السابقة؟
- هل تود مقارنتها مع جامعة أخرى في نفس التخصص حصراً؟`;
}

/** توليد مقارنة موضوعية دقيقة وحصرية بين جامعتين محددتين دون إقحام أي طرف ثالث */
export function generateUniversityComparisonResponse(u1: University, u2: University): string {
  return `أهلاً بك! إليك مقارنة رسمية موضوعية ومباشرة بين **${u1.name}** و **${u2.name}** وفق بيانات **وزارة التعليم العالي** وهيئة الاعتماد (HEAC) وتصنيفات الاعتماد الدولي 🎓⚖️:

---

## 🏛️ 1) الهوية والموقع والتصنيف:
- **${u1.name}:** جامعة **${u1.type}** في **${u1.location.city}** (${u1.location.region}) — التصنيف: ${u1.rankingSummary}.
- **${u2.name}:** جامعة **${u2.type}** في **${u2.location.city}** (${u2.location.region}) — التصنيف: ${u2.rankingSummary}.

---

## 🌟 2) أبرز ما يميز كل جامعة تنافسياً:
- **ما يميز ${u1.name}:** ${u1.uniqueAdvantages.slice(0, 2).join("؛ ")}.
- **ما يميز ${u2.name}:** ${u2.uniqueAdvantages.slice(0, 2).join("؛ ")}.

---

## 🏆 3) الكليات الرائدة والاعتمادات والمرافق:
- **${u1.name}:** كليات رائدة: ${u1.flagshipColleges.slice(0, 3).join("، ")} | اعتمادات دولية: ${u1.internationalAccreditations.join("، ")} | مرافق: ${u1.trainingFacilities}.
- **${u2.name}:** كليات رائدة: ${u2.flagshipColleges.slice(0, 3).join("، ")} | اعتمادات دولية: ${u2.internationalAccreditations.join("، ")} | مرافق: ${u2.trainingFacilities}.

---

## 🧭 4) توجيه المستشار للاختيار بينهما:
- **اختر ${u1.name} إذا:** ${u1.advisorRecommendation}
- **اختر ${u2.name} إذا:** ${u2.advisorRecommendation}

---

🤝 **خطوتك التالية لنحسم قرارك بين الجامعتين:**
- ما هو التخصص المحدد الذي تود دراسته فيهما؟
- كم معدلك في التوجيهي لنفحص الحدود الدنيا للقبول التنافسي والموازي بينهما؟
- أي المحافظتين أقرب لمقر سكنك وأنسب لتكاليف إقامتك ومواصلاتك؟`;
}

/** توليد دليل استعراض سلس ومرحلي لخريطة الجامعات الأردنية وما يميز كل فئة */
export function generateUniversitiesOverviewResponse(): string {
  return `أهلاً بك يا بطل! يسعدني مرافقتك لاكتشاف **خريطة الجامعات الأردنية (2026)** بكل سلاسة وبدون أي تشتت 🎓🏛️.

وفقاً لـ **وزارة التعليم العالي والبحث العلمي** و**هيئة الاعتماد (HEAC)**، تنقسم بيئات الجامعات الأردنية إلى **4 أقطاب رئيسية** يخدم كل منها أهدافاً محددة:

---

### 🏛️ 1) قمم الطب والهندسة والبحث المتقدم:
- **الجامعة الأردنية (عمان) & جامعة العلوم والتكنولوجيا (التكنو - إربد):**
  - *ما يميزهما:* أم الجامعات وعاصمة البحث العلمي، المستشفيات الجامعية الكبرى (مستشفى الجامعة ومستشفى الملك المؤسس)، اعتمادات ABET و WFME الطبية الدولية وتصنيفات QS المتقدمة عالمياً.

### 🌐 2) التكنولوجيا المتخصصة والنموذج الدولي:
- **جامعة الأميرة سمية (PSUT) & الجامعة الألمانية الأردنية (GJU):**
  - *ما يميزهما:* سمية هي الرائدة تخصصياً في الأمن السيبراني والحوسبة وربط الخريجين بكبرى الشركات العالمية؛ والألمانية تقدم نموذج السنة الكاملة الإلزامية في ألمانيا وتدريباً عملياً متقدماً في كبريات الشركات الصناعية الأوروبية.

### 🌿 3) كبرى الجامعات الحكومية وتنمية الأقاليم:
- **الهاشمية، اليرموك، البلقاء التطبيقية، مؤتة، آل البيت، الحسين بن طلال، والطفيلة التقنية:**
  - *ما يميزها:* تغطية شاملة لكافة المحافظات، ريادة في الطاقة والميكاترونكس (الهاشمية)، الإعلام والآداب (اليرموك)، التعليم التطبيقي والتقني (البلقاء)، والطب العسكري والجناح العسكري (مؤتة)، مع تنافسية تكاليف ورسوم ميسرة للطلبة.

### 🌟 4) الجامعات الخاصة ذات الاعتمادات الدولية:
- **العلوم التطبيقية، البترا، عمان الأهلية، والزيتونة:**
  - *ما يميزها:* تميز استثنائي واعتمادات دولية مرموقة مثل ACPE الأمريكي في الصيدلة، ومستشفيات تدريبية خاصة، ومختبرات مجهزة تواكب مستجدات التخصصات الحديثة.

---

📚 **المصادر الرسمية المعتمدة:** وزارة التعليم العالي (MOHE)، القبول الموحد (ADMHEC)، وهيئة الاعتماد (HEAC).

---

🤝 **لنكمل خطوتك التالية معاً بسلاسة؛ أي مسار تفضل الآن؟**
1. **استعراض ما يميز جامعة معينة بالتفصيل** (اكتب اسمها، مثل: *شو بيميز التكنو* أو *الجامعة الأردنية* أو *سمية*).
2. **مقارنة جامعتين تتردد بينهما** في تخصصك المفضل (مثل: *قارن بين الأردنية والتكنو*).
3. **أو شاركني معدلك في التوجيهي وتخصصك المفضل** لنحدد الجامعة الأنسب فوراً!`;
}

/** توليد دليل استعراض شامل وحصري لقطاع أو مجال أكاديمي كامل مع التركيز الصارم بنسبة 100% عليه */
export function generateSectorOverviewResponse(fieldName: string): string {
  const fieldMajors = majors.filter((m) => m.field === fieldName);
  const demanded = fieldMajors.filter((m) => m.classification === "مطلوب");
  const saturated = fieldMajors.filter((m) => m.classification === "مشبع" || m.classification === "راكد");
  const certs = getCertificationsForField(fieldName).slice(0, 2);

  // استخراج الاعتمادات البارزة للقطاع
  const accreditations = Array.from(
    new Set(
      fieldMajors
        .map((m) => m.accreditation)
        .filter(Boolean)
        .flatMap((a) => {
          const list: string[] = [];
          if (a.includes("WFME")) list.push("الاعتراف الدولي الطبي WFME / ECFMG لكليات الطب");
          if (a.includes("ACPE")) list.push("الاعتماد الأمريكي المرموق للصيدلة ACPE");
          if (a.includes("ABET")) list.push("اعتماد ABET الدولي لبرامج الهندسة والتكنولوجيا والحوسبة");
          if (a.includes("AACSB")) list.push("اعتماد AACSB الدولي لكليات الأعمال والإدارة");
          if (a.includes("مجلس التمريض")) list.push("اعتماد مجلس التمريض الأردني");
          if (a.includes("هيئة الاعتماد")) list.push("شهادات ضمان الجودة من هيئة اعتماد مؤسسات التعليم العالي (HEAC)");
          return list;
        }),
    ),
  );

  return `أهلاً بك يا بطل! يسعدني إرشادك في **${fieldName}** لمساعدتك في اتخاذ القرار الأنسب لمستقبلك المهني والأكاديمي 🎓📋:

---

## 🌟 1) التخصصات الأكثر طلباً وأماناً وظيفياً في هذا المجال:
${demanded
  .slice(0, 4)
  .map(
    (m) =>
      `• **${m.name}:** نسبة تشغيل تقديرية **${m.employmentRate}** (مخاطرة ${m.risk}) — ${m.summary}`,
  )
  .join("\n")}

---

## ⚠️ 2) تخصصات مشبعة أو راكدة في هذا المجال (تتطلب الحذر والتميز الميداني):
${saturated
  .slice(0, 4)
  .map(
    (m) =>
      `• **${m.name}:** مصنف **[${m.classification}]** في تقارير العرض والطلب (نسبة تشغيل تقديرية ${m.employmentRate} - مخاطرة ${m.risk}).`,
  )
  .join("\n")}

---

## 🏛️ 3) أهم الاعتمادات الرسمية والدولية لهذا القطاع:
${accreditations.length > 0 ? accreditations.map((a) => `• **${a}**`).join("\n") : "• اعتماد هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها (HEAC)."}

---

## 📜 4) شهادات احترافية عالمية مجانية معتمدة لدعم هذا المسار:
${certs
  .map(
    (c) =>
      `• **[${c.title}](${c.url})** | الجهة المانحة: ${c.provider}  \n  - **طريقة الحصول مجاناً:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
  )
  .join("\n\n")}

---

🤝 **لنكمل خطوتك التالية معاً بسلاسة وبدون أي تشتيت؛ أخبرني:**
1. ما هو التخصص المحدد الذي تميل إليه أكثر من بين تخصصات **${fieldName}**؟
2. كم معدلك المتوقع في التوجيهي، وهل تفضل القبول التنافسي أم الموازي في الجامعات الرسمية؟
3. هل تود التعرف على أفضل الجامعات الأردنية المانحة لهذا المجال تحديداً؟`;
}

/** توليد نصيحة استشارية سلسة ومركزة لمجال أو قطاع محدد */
export function generateSectorAdviceResponse(fieldName: string): string {
  const fieldMajors = majors.filter((m) => m.field === fieldName);
  const demanded = fieldMajors.filter((m) => m.classification === "مطلوب");
  const saturated = fieldMajors.filter((m) => m.classification === "مشبع" || m.classification === "راكد");

  return `أهلاً بك يا بطل! يسعدني إرشادك وتقديم النصيحة الدقيقة في **${fieldName}** من واقع فرص العمل الحقيقية والاعتمادات في الأردن (2026) 🎯:

---

## 🌟 1) التخصصات التي أنصحك بالتركيز عليها في هذا المجال:
${demanded
  .slice(0, 4)
  .map(
    (m) =>
      `• **${m.name}:** نسبة تشغيل تقديرية **${m.employmentRate}** (مخاطرة ${m.risk}) — ${m.summary}`,
  )
  .join("\n")}

---

## ⚠️ 2) تخصصات في هذا المجال ينبغي الحذر منها (تشبع وركود):
${saturated
  .slice(0, 3)
  .map(
    (m) =>
      `• **${m.name}:** تشهد فائضاً كبيراً في أعداد الخريجين ومنافسة صعبة في التوظيف.`,
  )
  .join("\n")}

---

💡 **نصيحة المستشار الخاصة بـ ${fieldName}:**
النجاح في هذا القطاع لا يعتمد على الشهادة الجامعية وحدها، بل على الاعتمادات الدولية (مثل ABET أو ACPE أو AACSB أو WFME) وبناء سيرة ذاتية تضم تدريباً عملياً وشهادات مهنية معتمدة خلال سنوات دراستك.

---

🤝 **خطوتك التالية لنحدد أفضل تخصص لك في ${fieldName}:**
1. كم معدلك المتوقع في التوجيهي؟
2. هل ترغب بمعرفة أفضل الجامعات الأردنية (الحكومية والخاصة) التي تمنح هذه التخصصات؟
3. هل تفضل القبول التنافسي الموحد أم الموازي؟`;
}

/** توليد نصيحة أكاديمية ومهنية شاملة وسلسة لأبرز التخصصات الواعدة في الأردن دون قيود جافة */
export function generateTopMajorsAdviceResponse(userQuery: string = ""): string {
  const norm = normalizeArabic(userQuery);
  const isLiterary = norm.includes("ادبي") || norm.includes("الادبي");

  if (isLiterary) {
    return `أهلاً بك يا بطل! لطلبة **الفرع الأدبي**، هناك مسارات عصرية ممتازة تبتعد عن الركود وتفتح آفاقاً وظيفية رحبة محلياً وعالمياً 🚀:

---

## 🌟 1) أبرز المسارات الواعدة والمطلوبة لطلبة الأدبي:
1. **التسويق الرقمي والتجارة الإلكترونية (Digital Marketing):**
   - من أسرع المجالات نمواً في القطاع الخاص والشركات الريادية، مع فرص عمل حرة وعن بُعد برواتب ممتازة.
2. **اللغات التطبيقية والترجمة المتخصصة (الإنجليزية، الألمانية، الصينية):**
   - التركيز على الترجمة التقنية والفورية ومراكز خدمة العملاء والشركات الدولية.
3. **التصميم الجرافيكي والوسائط الرقمية (UI/UX & Graphic Design):**
   - يجمع بين الشغف الإبداعي والمهارات الرقمية المطلوبة بكثافة في شركات التكنولوجيا والتسويق.
4. **العلوم اللوجستية وإدارة سلاسل الإمداد (Logistics & Supply Chain):**
   - قطاع حيوي متسارع في النقل والموانئ وشركات التجارة الإقليمية بنسب تشغيل عالية.
5. **القانون والحقوق (مع التخصص في الملكية الفكرية والجرائم الإلكترونية والعقود الدولية):**
   - خيار متفوق للمحاماة والاستشارات القانونية لمن يدمج المعرفة القانونية باللغات أو التكنولوجيا.

---

## ⚠️ 2) تخصصات ينصح بالحذر منها للفرع الأدبي:
- التخصصات التربوية والتعليمية التقليدية (معلم صف، تربية خاصة، الآداب العامة دون مهارات رقمية)، نظراً لوجود مخزون خريجين كبير ومنافسة عالية في التعيينات.

---

🤝 **حتى نحدد خيارك الأنسب خطوة بخطوة:**
• **كم معدلك المتوقع في التوجيهي؟**
• **هل تميل أكثر لـ: إدارة الأعمال الرقمية، اللغات، أم التصميم والإبداع؟**
شاركني اهتمامك وسأقترح عليك أفضل الجامعات الأردنية المناسبة لمعدلك!`;
  }

  return `أهلاً بك يا بطل! سؤالك ذكي وفي محله تماماً، واختيارك للتخصص هو أهم استثمار لمستقبلك. بصفتي مرشدك الأكاديمي، سأعطيك خلاصة واقع سوق العمل والفرص الحقيقية بالأردن والإقليم اليوم، مرتبة حسب الأمان الوظيفي ومستقبل التشغيل 🚀:

---

## 🌟 1) قطاع تكنولوجيا المعلومات والذكاء الاصطناعي (الأعلى طلباً ونمواً عالمياً ومحلياً):
• **الأمن السيبراني (Cybersecurity):** طلب متزايد لحماية الأنظمة والبنوك والشركات، أمان وظيفي ممتاز وفرص عمل عن بُعد برواتب مجزية.
• **الذكاء الاصطناعي وعلم البيانات (AI & Data Science):** عصب الاقتصاد الرقمي القادم، ويتمتع بحصانة قوية أمام الأتمتة.
• **هندسة البرمجيات (Software Engineering):** تخصص مرن يفتح أبواب الشركات المحلية والإقليمية والدولية.

---

## 🩺 2) القطاع الصحي والطبي التطبيقي (فرص تشغيل مضمونة ومستقرة):
• **التمريض:** التخصص الصحي الأكثر طلباً وسرعة في التوظيف محلياً، وبفرص تعاقد فورية وسريعة في دول الخليج وألمانيا وأوروبا.
• **دكتور صيدلة والتقنيات الطبية المساندة:** (تكنولوجيا الأجهزة الطبية، العلاج الوظيفي، البصريات) بدائل صحية ذكية بعيداً عن التشبع.

---

## 💼 3) قطاع الأعمال الحديثة واللوجستيات:
• **التسويق الرقمي والتجارة الإلكترونية (Digital Marketing):** مطلوب بكثافة في كافة الشركات والأنشطة الاقتصادية.
• **إدارة سلاسل الإمداد والخدمات اللوجستية (Logistics):** قطاع حيوي متسارع في الأردن ومحطات التجارة الإقليمية.

---

## ⚡ 4) قطاع الهندسة العصرية والطاقة:
• **هندسة الطاقة المتجددة وهندسة الميكاترونكس والأنظمة الذكية:** بدائل هندسية حديثة تتفوق بفرصها ومستقبلها على الهندسة التقليدية.

---

## 💡 نصيحة ذهبية لتجنب الركود:
احرص على تجنب التخصصات التي تعاني من فائض خريجين تراكمي (مثل: معظم التخصصات التربوية والتعليمية التقليدية، العلوم الإنسانية البحتة، والهندسة المدنية أو الميكانيكية التقليدية لكثرة أعداد الخريجين)، إلا إذا كان لديك شغف استثنائي ومشروع خاص.

---

🤝 **حتى نحدد الخيار الأنسب لك تماماً خطوة بخطوة وبكل سلاسة:**
• **شو فرعك بالثانوية العامة (علمي، أدبي، مهني)؟**
• **كم معدلك في التوجيهي (أو المتوقع)؟**
• **شو المجال اللي تشعر إنه الأقرب لشغفك (تكنولوجيا، صحة، أعمال، هندسة)؟**

شاركني تفاصيلك لأقترح عليك التخصصات والجامعات الأنسب لمعدلك فوراً!`;
}

/** العثور على أفضل تخصص مطابق من قائمة الـ 121 تخصصاً */
export function findBestMatchingMajor(query: string): Major | undefined {
  const normQuery = normalizeArabic(query);

  // 1. مطابقة دقيقة أولاً
  for (const m of majors) {
    const normName = normalizeArabic(m.name);
    if (normQuery === normName || normQuery === `تخصص ${normName}` || normQuery === `تخصص ${normName.replace(/^ال/, "")}`) {
      return m;
    }
  }

  // 2. مطابقة بالكلمات المفتاحية الدقيقة لكل تخصص
  const keywords: { words: string[]; slug: string }[] = [
    { words: ["ذكاء اصطناعي", "artificial intelligence"], slug: "artificial-intelligence" },
    { words: ["امن سيبراني", "الامن السيبراني", "cybersecurity"], slug: "cybersecurity" },
    { words: ["هندسه برمجيات", "برمجيات", "software engineering"], slug: "software-engineering" },
    { words: ["علوم حاسوب", "علوم الحاسوب", "كمبيوتر", "computer science"], slug: "computer-science" },
    { words: ["طب بشري", "الطب البشري", "دكتور بشري"], slug: "medicine" },
    { words: ["طب اسنان", "طب الاسنان", "جراحه اسنان"], slug: "dentistry" },
    { words: ["دكتور صيدله", "pharmd"], slug: "pharm-d" },
    { words: ["صيدله", "الصيدله"], slug: "pharmacy" },
    { words: ["تمريض", "التمريض"], slug: "nursing" },
    { words: ["علم بيانات", "علم البيانات", "data science"], slug: "data-science" },
    { words: ["هندسه شبكات", "شبكات الحاسوب"], slug: "computer-networks" },
    { words: ["هندسه حاسوب", "هندسة الحاسوب"], slug: "computer-engineering" },
    { words: ["هندسه مدنيه", "الهندسه المدنيه"], slug: "civil-engineering" },
    { words: ["هندسه ميكانيك", "الهندسه الميكانيكيه"], slug: "mechanical-engineering" },
    { words: ["هندسه كهربائيه", "الهندسه الكهربائيه"], slug: "electrical-engineering" },
    { words: ["هندسه ميكاترونكس", "ميكاترونكس"], slug: "mechatronics-engineering" },
    { words: ["هندسه معماري", "عمارة", "الهندسة المعمارية"], slug: "architecture" },
    { words: ["طاقه متجدده", "هندسه الطاقه"], slug: "renewable-energy-engineering" },
    { words: ["علاج طبيعي", "العلاج الطبيعي"], slug: "physical-therapy" },
    { words: ["علاج وظيفي", "العلاج الوظيفي"], slug: "occupational-therapy" },
    { words: ["اشعه", "تصوير اشعاعي", "الاشعه"], slug: "radiology" },
    { words: ["مختبرات طبيه", "المختبرات الطبيه"], slug: "medical-laboratories" },
    { words: ["سمع ونطق", "السمع والنطق"], slug: "speech-and-hearing" },
    { words: ["محاسبه", "المحاسبه"], slug: "accounting" },
    { words: ["اداره اعمال", "ادارة الاعمال"], slug: "business-administration" },
    { words: ["تسويق رقمي", "التسويق الرقمي"], slug: "digital-marketing" },
    { words: ["تمويل", "العلوم الماليه والمصرفيه"], slug: "finance-banking" },
    { words: ["حقوق", "قانون", "المحاماه"], slug: "law" },
    { words: ["تصميم داخلي", "الديكور"], slug: "interior-design" },
    { words: ["تصميم جرافيكي", "الجرافيك"], slug: "graphic-design" },
    { words: ["اعلام رقمي", "الصحافه والاعلام"], slug: "digital-media" },
    { words: ["لغه انجليزيه", "اللغه الانجليزيه والترجمه"], slug: "english-language-and-literature" },
  ];

  for (const item of keywords) {
    if (item.words.some((w) => normQuery.includes(normalizeArabic(w)))) {
      const found = majors.find((m) => m.slug === item.slug);
      if (found) return found;
    }
  }

  // 3. مطابقة بالاسم الجزئي
  for (const m of majors) {
    const normName = normalizeArabic(m.name);
    if (normQuery.includes(normName) || normName.includes(normQuery)) {
      return m;
    }
  }

  return undefined;
}

/** توليد استجابة مخصصة وموجهة حسب معدل التوجيهي مع الالتزام بالمجال المطلوب إن وُجد */
export function generateGradeResponse(grade: number, detectedField: string | null): string {
  if (detectedField) {
    const fieldMajors = majors.filter((m) => m.field === detectedField);
    const demanded = fieldMajors.filter((m) => m.classification === "مطلوب");
    const certs = getCertificationsForField(detectedField).slice(0, 2);

    let gradeAnalysis = "";
    if (detectedField === "الكليات الطبية والصحية") {
      if (grade >= 90) {
        gradeAnalysis = `معدلك (**${grade}**) ممتاز ويؤهلك للمنافسة بقوة على القبول الموحد والموازي في كليات الطب البشري، طب وجراحة الأسنان، دكتور صيدلة، والتمريض.`;
      } else if (grade >= 80) {
        gradeAnalysis = `معدلك (**${grade}**) يؤهلك للمنافسة التنافسية العالية على التمريض (مطلوب جداً محلياً وخارجياً)، السمع والنطق، العلاج الوظيفي، وتكنولوجيا الأجهزة الطبية، ومنافسة قوية في الموازي للصيدلة.`;
      } else if (grade >= 70) {
        gradeAnalysis = `معدلك (**${grade}**) يفتح أمامك فرصاً ممتازة للتمريض، تكنولوجيا الأجهزة الطبية، البصريات، والعلاج الوظيفي في الجامعات الحكومية والخاصة.`;
      } else {
        gradeAnalysis = `معدلك (**${grade}**) يؤهلك لبرامج الدبلوم والمهن الطبية المساندة التطبيقية في الكليات والجامعات المعتمدة.`;
      }
    } else if (detectedField === "الكليات الهندسية") {
      if (grade >= 80) {
        gradeAnalysis = `معدلك (**${grade}**) يؤهلك للمنافسة على التخصصات الهندسية الحديثة والمطلوبة (هندسة الحاسوب، الميكاترونكس، الطاقة المتجددة، وإدارة السلامة والمخاطر). ننصحك بتجنب التخصصات المشبعة مثل المدنية والميكانيك التقليدي.`;
      } else {
        gradeAnalysis = `معدلك (**${grade}**) يؤهلك للبرامج الهندسية التطبيقية والتقنية في جامعة البلقاء التطبيقية والطفيلة التقنية والجامعات الخاصة.`;
      }
    } else if (detectedField === "كليات تكنولوجيا المعلومات والذكاء الاصطناعي") {
      gradeAnalysis = `معدلك (**${grade}**) يؤهلك للمنافسة على أبرز تخصصات الثورة الرقمية (الذكاء الاصطناعي، الأمن السيبراني، علم البيانات، وهندسة البرمجيات). فرص القبول التنافسي والموازي متاحة بكثرة.`;
    } else {
      gradeAnalysis = `معدلك (**${grade}**) يمنحك فرص قبول تنافسية وموازية ممتازة في مختلف تخصصات **${detectedField}**.`;
    }

    return `أهلاً بك يا بطل! مبارك لك وصولك لمعدل **${grade}** في الثانوية العامة (التوجيهي) 🎓.

وبما أن اهتمامك ينصب على **${detectedField}**، إليك التحليل الأكاديمي الحصري لهذا المجال بتركيز تام وبدون أي تشتت:

---

## 🎯 1) تقييم فرص قبولك بمعدل (${grade}):
${gradeAnalysis}

---

## 🌟 2) أبرز التخصصات الأكثر طلباً وأماناً وظيفياً في **${detectedField}**:
${demanded
  .slice(0, 3)
  .map(
    (m, i) => `### ${i + 1}. تخصص: ${m.name}
- **تصنيف سوق العمل:** **${m.classification}** (نسبة التشغيل التقديرية **${m.employmentRate}** - مخاطرة **${m.risk}**).
- **أبرز الجامعات المانحة:** ${m.publicUniversities.slice(0, 3).join("، ")} (اعتماد: ${m.accreditation}).
- **خلاصة المستشار:** ${m.summary}`,
  )
  .join("\n\n")}

---

## 📜 3) شهادات احترافية عالمية مجانية معتمدة لدعم هذا المسار:
${certs
  .map(
    (c) =>
      `• **[${c.title}](${c.url})** | الجهة: ${c.provider}  \n  - **طريقة الحصول مجاناً:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
  )
  .join("\n\n")}

---

🤝 **كيف نتابع خطوتك القادمة معاً في مسار ${detectedField}؟**
1. هل تفضل جامعات قريبة من محافظتك (الوسط، الشمال، الجنوب)؟
2. هل ترغب بحساب فرص القبول التنافسي مقابل الموازي في جامعة معينة؟
3. ما هو التخصص المحدد الذي تميل إليه أكثر لنضع له خطة قبول خطوة بخطوة؟`;
  }

  // إذا لم يحدد الطالب أي مجال مع المعدل
  const topPicks = majors
    .filter((m) => m.classification === "مطلوب" && (m.risk === "منخفض" || m.risk === "متوسط"))
    .slice(0, 3);

  return `أهلاً بك يا بطل! مبارك لك وصولك لمعدل **${grade}** في الثانوية العامة (التوجيهي) 🎓.

وفقاً لدراسات العرض والطلب الصادرة عن **ديوان الخدمة المدنية** و**وزارة التعليم العالي (2026)**، إليك نماذج لأبرز التخصصات المحصنة والمطلوبة في سوق العمل:

---

${topPicks
  .map(
    (m, i) => `### ${i + 1}. تخصص: ${m.name} (${m.field})
- **تصنيف سوق العمل:** **${m.classification}** (نسبة التشغيل التقديرية **${m.employmentRate}** - مخاطرة **${m.risk}**).
- **أبرز الجامعات المانحة:** ${m.publicUniversities.slice(0, 3).join("، ")} (اعتماد: ${m.accreditation}).
- **خلاصة المستشار:** ${m.summary}`,
  )
  .join("\n\n")}

---

🎯 **لنقفل على المجال الأقرب لميولك ونحقق لك أعلى درجات التركيز، أخبرني:**
- هل تميل أكثر نحو: **الكليات الطبية والصحية**، أم **الكليات الهندسية**، أم **تكنولوجيا المعلومات والذكاء الاصطناعي**، أم **العلوم الإدارية والمالية**؟
- اكتب لي المجال الذي تفضله وسأحصر كل التوجيهات والجامعات والشهادات فيه بالكامل!`;
}

/** توليد استجابة المستشار الذكي المعتمدة المرتكزة حصراً على بيانات المنصة مع منع التشتيت والتركيز الموضوعي الصارم */
export function generateLocalAdvisorResponse(userQuery: string): string {
  const norm = normalizeArabic(userQuery);

  // 1) استعلام عن معدل التوجيهي
  const gradeMatch = userQuery.match(/(?:معدلي|معدل|جبت|علامتي|حصلت على)\s*(?:في التوجيهي|بالتوجيهي)?\s*([6-9]\d(?:\.\d+)?)/);
  if (gradeMatch && gradeMatch[1]) {
    const grade = parseFloat(gradeMatch[1]);
    const detectedField = detectMajorField(userQuery);
    return generateGradeResponse(grade, detectedField);
  }

  // 2) استعلام مقارنة بين جامعتين محددتين
  const mentionedUnis = findMentionedUniversities(userQuery);
  if (
    mentionedUnis.length >= 2 &&
    (norm.includes("مقارن") ||
      norm.includes("ولا") ||
      norm.includes("او") ||
      norm.includes("بين") ||
      norm.includes("احسن") ||
      norm.includes("افضل") ||
      norm.includes("مين"))
  ) {
    return generateUniversityComparisonResponse(mentionedUnis[0], mentionedUnis[1]);
  }

  // 3) استعلام عن جامعة واحدة محددة
  if (
    mentionedUnis.length === 1 &&
    (norm.includes("جامع") ||
      norm.includes("تكنو") ||
      norm.includes("سميه") ||
      norm.includes("اليرموك") ||
      norm.includes("موته") ||
      norm.includes("البلقاء") ||
      norm.includes("بترا") ||
      norm.includes("اهليه") ||
      norm.includes("زيتونه") ||
      norm.includes("الماني") ||
      norm.includes("هاشمي") ||
      norm.includes("طفيل") ||
      norm.includes("معان") ||
      norm.includes("مفرق") ||
      norm.includes("عقبه"))
  ) {
    return generateUniversityDetailResponse(mentionedUnis[0]);
  }

  // 4) استعلام عام أو مقارنة شاملة عن خريطة الجامعات الأردنية
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

  // 5) استعلام عن النصائح والاستشارات والتخصصات الموصى بها (Advice & Guidance)
  const isAdviceQuery =
    norm.includes("بتنصح") ||
    norm.includes("تنصح") ||
    norm.includes("نصيح") ||
    norm.includes("انصحني") ||
    norm.includes("نصح") ||
    norm.includes("افضل تخصص") ||
    norm.includes("احسن تخصص") ||
    norm.includes("اقوى تخصص") ||
    norm.includes("تخصصات المستقبل") ||
    norm.includes("تخصصات مطلوبه") ||
    norm.includes("تخصصات مطلوبة") ||
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
    if (detectedSector) {
      return generateSectorAdviceResponse(detectedSector);
    }
    return generateTopMajorsAdviceResponse(userQuery);
  }

  // 5) استعلام قطاعي/مجالي عام (مثل: "التخصصات الطبية"، "تخصصات الهندسة"، "تخصصات IT"، "إدارة الأعمال"، "القانون")
  const isExplicitSector =
    norm.includes("تخصصات") ||
    norm.includes("مجال") ||
    norm.includes("قطاع") ||
    norm.includes("كليات") ||
    norm.includes("كليه") ||
    norm.includes("فروع") ||
    norm.includes("مسارات") ||
    norm.includes("شو وضع") ||
    norm === "التخصصات الطبية" ||
    norm === "التخصصات الهندسية" ||
    norm === "تكنولوجيا المعلومات" ||
    norm === "ادارة الاعمال" ||
    norm === "الحقوق" ||
    norm === "القانون";

  const matchedExactMajor = findBestMatchingMajor(userQuery);

  if (isExplicitSector && detectedSector && (!matchedExactMajor || norm.includes("تخصصات") || norm.includes("مجال") || norm.includes("كليات"))) {
    return generateSectorOverviewResponse(detectedSector);
  }

  // 6) استعلام خاص عن الدورات أو الشهادات
  if (
    norm.includes("شهادات") ||
    norm.includes("دورات") ||
    norm.includes("شهاده") ||
    norm.includes("دوره") ||
    norm.includes("كورس")
  ) {
    if (matchedExactMajor) {
      const certs = getCertificationsForMajor(matchedExactMajor);
      const certsText = certs
        .map(
          (c) =>
            `• **[${c.title}](${c.url})** | المانح: ${c.provider}  \n  - **طريقة الحصول مجاناً:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
        )
        .join("\n\n");

      return `ممتاز! إليك مسار **الشهادات العالمية المجانية المعتمدة** لتخصص **${matchedExactMajor.name}** لبناء سيرة ذاتية تنافسية تسبق بها زملاءك 📜🚀:

---

${certsText}

---

💡 **توجيه المستشار:** هذه الشهادات مجانية 100% ومطلوبة في سوق العمل الأردني والإقليمي لمجال **${matchedExactMajor.field}**.

🎯 **الخطوة التالية:** هل تريد معرفة الجامعات الأنسب لدراسة ${matchedExactMajor.name}، أم حساب فرص قبولك فيه بمعدلك؟`;
    }

    if (detectedSector) {
      const certs = getCertificationsForField(detectedSector).slice(0, 3);
      const certsText = certs
        .map(
          (c) =>
            `• **[${c.title}](${c.url})** | المانح: ${c.provider}  \n  - **طريقة الحصول مجاناً:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
        )
        .join("\n\n");

      return `ممتاز! إليك مسار **الشهادات العالمية المجانية المعتمدة** الحصرية لـ **${detectedSector}** لدعم مسارك المهني 📜🚀:

---

${certsText}

---

💡 **توجيه المستشار:** هذه الشهادات مجانية 100% ومعتمدة عالمياً وتمنحك أفضلية تنافسية مباشرة.

🎯 **الخطوة التالية:** ما هو التخصص المحدد في ${detectedSector} الذي ترغب بربط هذه الشهادات به؟`;
    }
  }

  // 7) استعلام خاص عن البدائل
  if (norm.includes("بدائل") || norm.includes("بديل") || norm.includes("خيارات ثانيه")) {
    if (matchedExactMajor) {
      const fieldAlternatives =
        matchedExactMajor.alternatives && matchedExactMajor.alternatives.length > 0
          ? matchedExactMajor.alternatives
          : majors
              .filter(
                (m) =>
                  m.field === matchedExactMajor.field &&
                  m.slug !== matchedExactMajor.slug &&
                  m.classification === "مطلوب",
              )
              .slice(0, 3)
              .map((m) => ({
                name: m.name,
                reason: `بديل معتمد عالي الطلب في نفس المجال بنسبة تشغيل ${m.employmentRate}`,
              }));

      const alternativesText = fieldAlternatives
        .map((a) => `• **${a.name}:** ${a.reason}`)
        .join("\n");

      return `بالتأكيد! إذا كنت تبحث عن خيارات موازية لتخصص **${matchedExactMajor.name}** لتجنب الركود وزيادة فرص التوظيف، إليك **البدائل الأكاديمية الذكية المعتمدة** ضمن نفس المجال 🎯:

---

${alternativesText}

---

🤝 **الخطوة التالية:** أي من هذه البدائل تشعر أنه الأقرب لميولك لنحلل فرصه والجامعات المانحة له معاً؟`;
    }
  }

  // 8) استعلام عن مقارنة عامة بين خيارين أو تخصصين
  if (norm.includes("مقارن") || norm.includes("محتار") || norm.includes("الفرق بين")) {
    return `أهلاً بك! مقارنة التخصصات خطوة استراتيجية في غاية الأهمية لتجنب الركود الأكاديمي ⚖️.

في سوق العمل الأردني والإقليمي (2026)، يعتمد تقييم أي تخصص على **3 ركائز رسمية**:

---

## 📌 المعايير الرسمية للمقارنة في منصتنا:
1. **تصنيف ديوان الخدمة المدنية:** هل التخصص **مطلوب** (تشغيل 70%-85%) أم **راكد** يعاني من مخزون تراكمي يزيد عن 10 سنوات؟
2. **الاعتمادات الدولية (ABET و WFME و ACPE و AACSB):** توفر لخريجيها سهولة معادلة الشهادة للعمل عن بُعد وفي الخليج العربي وأوروبا.
3. **أثر الأتمتة والذكاء الاصطناعي:** مدى تعرض المهام الروتينية للأتمتة مقابل الحصانة التحليلية.

---

🚀 **أداة المقارنة المباشرة:**
يمكنك فتح **[مختبر المقارنة اللحظية](/compare)** في شريط التنقل العلوي لمقارنة أي تخصصين بنقرة واحدة جنباً إلى جنب مع كامل الإحصائيات الرسمية.

**أو شاركني التخصصين اللذين تتردد بينهما الآن لأقارن لك بينهما خطوة بخطوة!**`;
  }

  // 9) استعلام عن تخصص محدد
  if (matchedExactMajor) {
    const certs = getCertificationsForMajor(matchedExactMajor).slice(0, 2);
    const certsSnippet =
      certs.length > 0
        ? `\n\n---\n\n📜 **شهادات مجانية معتمدة مقترحة:**\n${certs.map((c) => `• [${c.title}](${c.url}) (${c.provider})`).join("\n")}`
        : "";

    return `أهلاً بك! إليك التحليل الأكاديمي والمهني المركز لتخصص **${matchedExactMajor.name}** استناداً لبيانات **ديوان الخدمة المدنية** و**التعليم العالي** (2026) 🎓:

---

## 📊 1) مؤشر الطلب والتشغيل في سوق العمل:
- **التصنيف الرسمي:** مصنف بأنه **[${matchedExactMajor.classification}]** في دراسات العرض والطلب.
- **نسبة التشغيل التقديرية:** **${matchedExactMajor.employmentRate}** خلال أول سنتين من التخرج.
- **مستوى المخاطرة الوظيفية:** مخاطرة **${matchedExactMajor.risk}**.
- **التعرض للأتمتة والذكاء الاصطناعي:** **${matchedExactMajor.automation.exposure}** (${matchedExactMajor.automation.note}).

---

## 🏛️ 2) الجامعات والاعتمادات الرسمية:
- **المجال الأكاديمي:** ${matchedExactMajor.field}.
- **الاعتمادات الموصى بها:** ${matchedExactMajor.accreditation}.
- **أبرز الجامعات الحكومية المانحة:** ${matchedExactMajor.publicUniversities.slice(0, 3).join("، ")}.
- **أبرز الجامعات الخاصة المانحة:** ${matchedExactMajor.privateUniversities.slice(0, 2).join("، ")}.${certsSnippet}

---

💡 **خلاصة المستشار:** ${matchedExactMajor.summary}

---

🎯 **لنكمل معك خطوة بخطوة للوصول لقرارك النهائي بخصوص ${matchedExactMajor.name}:**
- **الخيار 1:** اكتب معدلك في التوجيهي لأخبرك بفرص قبولك في هذه الجامعات (تنافس وموازي).
- **الخيار 2:** هل تود استعراض **بدائل أكاديمية معتمدة في نفس المجال** ذات أمان وظيفي أعلى؟
- **الخيار 3:** هل تفضل معرفة أفضل الجامعات الأردنية لدراسة هذا التخصص تحديداً؟

**أخبرني بخطوتك القادمة لنواصل معاً بكل سلاسة!**`;
  }

  // 11) استعلام عام أو ترحيب
  return `أهلاً بك يا بطل في **المستشار الذكي** لمنصة «الطلاب والمستقبل» 🎓✨!

أنا هنا لأكون مرشدك الأكاديمي والمهني، لمساعدتك في اختيار التخصص والجامعة الأنسب لطموحك ومعدلك، بناءً على واقع سوق العمل الأردني وفرص التشغيل الحقيقية.

---

### كيف أساعدك للوصول لقرارك الجامعي بثقة وبكل سلاسة؟
1. 💡 **نصائح بالتخصصات:** اسألني عن التخصصات الأكثر طلباً ومستقبلاً في سوق العمل (أو في أي قطاع كالصحة، التكنولوجيا، الهندسة، الأعمال).
2. 🎯 **توجيه مخصص حسب معدلك:** شاركني معدلك في التوجيهي واهتمامك وسأقترح عليك أفضل المسارات والجامعات.
3. 🏛️ **دليل ومقارنة الجامعات:** اسألني عما يميز أي جامعة أردنية (مثل: *الأردنية، التكنو، سمية، الألمانية*) أو قارن بين جامعتين.
4. 📊 **تحليل أي تخصص:** اكتب اسم أي تخصص (مثل: *الأمن السيبراني، التمريض، الذكاء الاصطناعي، الطب*) وسأحلل لك فرصه بدقة.

---

**أخبرني: شو التخصص أو الجامعة اللي بتفكر فيها حالياً؟ أو كم معدلك وفرعك في التوجيهي؟**`;
}
