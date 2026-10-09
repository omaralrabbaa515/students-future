import { majors, type Major } from "@/data/majors";
import { certifications, type Certification } from "@/data/certifications";
import { universities, type University } from "@/data/universities";

/** تطبيع النص العربي للبحث المرن */
function normalizeArabic(text: string): string {
  return text
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // إزالة التشكيل
    .trim();
}

/** العثور على أفضل جامعة مطابقة من قائمة الجامعات الأردنية المعتمدة */
function findMatchingUniversity(query: string): University | undefined {
  const normQuery = normalizeArabic(query);

  const keywords: { words: string[]; id: string }[] = [
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

  for (const item of keywords) {
    if (item.words.some((w) => normQuery.includes(normalizeArabic(w)))) {
      const found = universities.find((u) => u.id === item.id);
      if (found) return found;
    }
  }

  return universities.find((u) => {
    const normName = normalizeArabic(u.name);
    return normQuery.includes(normName) || normName.includes(normQuery);
  });
}

/** توليد ملف تفصيلي موجز وسلس لجامعة معينة */
function generateUniversityDetailResponse(u: University): string {
  return `أهلاً بك! إليك الملف الرسمي الموجز لـ **${u.name} (${u.englishName})** استناداً لبيانات **وزارة التعليم العالي** وهيئة الاعتماد (HEAC) 🎓🏛️:

---

## 📌 بطاقة الجامعة وهوية التميز:
- **النوع والموقع:** جامعة **${u.type}** في مدينة **${u.location.city}** (إقليم ${u.location.region}).
- **السمعة والتصنيف:** ${u.rankingSummary}.
- **الموقع الرسمي:** [زيارة الموقع الرسمي للجامعة](${u.website}).

---

## 🌟 أبرز ما يميزها تنافسياً:
${u.uniqueAdvantages.slice(0, 3).map((adv) => `• **${adv}**`).join("\n")}

---

## 🏆 الكليات الرائدة والاعتمادات:
- **الكليات الأقوى:** ${u.flagshipColleges.slice(0, 3).join("، ")}.
- **الاعتمادات الدولية:** ${u.internationalAccreditations.join("، ")}.
- **المرافق التدريبية:** ${u.trainingFacilities}.

---

## 🧭 نصيحة المستشار الذكي: لمن تناسب؟
${u.advisorRecommendation}

---

🤝 **خطوتك التالية لنصل لقرارك النهائي:**
- ما هو التخصص الذي تنوي دراسته في **${u.name}**؟
- كم معدلك في التوجيهي، وهل تفضل القبول التنافسي أم الموازي؟
- هل تود مقارنتها مع جامعة أخرى في نفس التخصص؟

**أخبرني بخطوتك القادمة لنكمل معاً بسلاسة!**`;
}

/** توليد دليل استعراض سلس ومرحلي للجامعات الأردنية وما يميز كل فئة */
function generateUniversitiesOverviewResponse(): string {
  return `أهلاً بك يا بطل! يسعدني جداً مرافقتك لاكتشاف **خريطة الجامعات الأردنية (2026)** بكل سلاسة وبدون تشتت 🎓🏛️.

وفقاً لـ **وزارة التعليم العالي والبحث العلمي** و**هيئة الاعتماد (HEAC)**، تنقسم بيئات الجامعات الأردنية إلى **4 أقطاب رئيسية** يخدم كل منها أهدافاً محددة:

---

### 🏛️ 1) قمم الطب والهندسة والبحث المتقدم:
- **الجامعة الأردنية (عمان) & جامعة العلوم والتكنولوجيا (التكنو - إربد):**
  - *ما يميزهما:* أم الجامعات وعاصمة البحث العلمي، المستشفيات الجامعية الكبرى (مستشفى الجامعة ومستشفى الملك المؤسس)، اعتمادات ABET و WFME الطبية الدولية وتصنيفات QS المتقدمة.

### 🌐 2) التكنولوجيا المتخصصة والنموذج الدولي:
- **جامعة الأميرة سمية (PSUT) & الجامعة الألمانية الأردنية (GJU):**
  - *ما يميزهما:* سمية هي الرائدة تخصصياً في الأمن السيبراني والحوسبة وتوظيف الشركات العالمية؛ والألمانية تقدم سنة إلزامية كاملة في ألمانيا وتدريباً عملياً في كبرى الشركات الأوروبية.

### 🌿 3) كبرى الجامعات الحكومية وتنمية الأقاليم:
- **الهاشمية، اليرموك، البلقاء التطبيقية، مؤتة، آل البيت، الحسين بن طلال، والطفيلة التقنية:**
  - *ما يميزها:* تغطية شاملة لكافة المحافظات، ريادة في الطاقة والميكاترونكس (الهاشمية)، الإعلام والآداب (اليرموك)، التعليم التطبيقي والتقني (البلقاء)، والطب العسكري والجناح العسكري (مؤتة)، مع تنافسية تكاليف ورسوم ميسرة.

### 🌟 4) الجامعات الخاصة ذات الاعتمادات الدولية:
- **العلوم التطبيقية، البترا، عمان الأهلية، والزيتونة:**
  - *ما يميزها:* تميز استثنائي واعتمادات دولية مرموقة مثل ACPE الأمريكي في الصيدلة، مستشفيات تدريبية خاصة، وتجهيزات حديثة.

---

📚 **المصادر الرسمية المعتمدة:** وزارة التعليم العالي (MOHE)، القبول الموحد (ADMHEC)، هيئة الاعتماد (HEAC)، واعتمادات ABET و ACPE.

---

🤝 **لنكمل خطوتك التالية معاً بسلاسة؛ أي خيار تفضل الآن؟**
1. **استعراض ما يميز جامعة معينة بالتفصيل** (اكتب اسمها، مثل: *شو بيميز التكنو* أو *الجامعة الأردنية* أو *سمية*).
2. **مقارنة جامعتين تتردد بينهما** في تخصصك المفضل.
3. **أو شاركني معدلك في التوجيهي وتخصصك المفضل** لأحدد لك أفضل خيار فوري يناسبك!`;
}

/** العثور على أفضل تخصص مطابق من قائمة الـ 121 تخصصاً */
function findBestMatchingMajor(query: string): Major | undefined {
  const normQuery = normalizeArabic(query);

  // 1. مطابقة دقيقة أولاً
  for (const m of majors) {
    const normName = normalizeArabic(m.name);
    if (normQuery.includes(normName) || normName.includes(normQuery)) {
      return m;
    }
  }

  // 2. مطابقة بالكلمات المفتاحية
  const keywords: { words: string[]; slug: string }[] = [
    { words: ["ذكاء اصطناعي", "ai", "artificial"], slug: "artificial-intelligence" },
    { words: ["امن سيبراني", "سيبراني", "cyber"], slug: "cybersecurity" },
    { words: ["برمجيات", "هندسه برمجيات", "software"], slug: "software-engineering" },
    { words: ["علوم حاسوب", "كمبيوتر", "حاسب", "cs"], slug: "computer-science" },
    { words: ["طب بشري", "طب", "دكتور"], slug: "medicine" },
    { words: ["طب اسنان", "اسنان"], slug: "dentistry" },
    { words: ["صيدله", "صيدلي"], slug: "pharmacy" },
    { words: ["تمريض", "ممرض"], slug: "nursing" },
    { words: ["علم بيانات", "بيانات", "data"], slug: "data-science" },
    { words: ["شبكات", "هندسه شبكات"], slug: "computer-networks" },
    { words: ["مدنيه", "هندسه مدنيه"], slug: "civil-engineering" },
    { words: ["ميكانيك", "هندسه ميكانيك"], slug: "mechanical-engineering" },
    { words: ["كهرباء", "هندسه كهربائيه"], slug: "electrical-engineering" },
    { words: ["علاج طبيعي", "فيزيو"], slug: "physical-therapy" },
    { words: ["اشعه", "تصوير اشعاعي"], slug: "radiology" },
    { words: ["محاسبه", "محاسب"], slug: "accounting" },
    { words: ["اداره اعمال", "اداره"], slug: "business-administration" },
    { words: ["تسويق رقمي", "تسويق"], slug: "digital-marketing" },
    { words: ["حقوق", "قانون", "محاماه"], slug: "law" },
    { words: ["تصميم داخلي", "ديكور"], slug: "interior-design" },
    { words: ["اعلام رقمي", "اعلام", "صحافه"], slug: "digital-media" },
    { words: ["لغه انجليزيه", "ترجمه"], slug: "english-language-and-literature" },
  ];

  for (const item of keywords) {
    if (item.words.some((w) => normQuery.includes(normalizeArabic(w)))) {
      const found = majors.find((m) => m.slug === item.slug);
      if (found) return found;
    }
  }

  // 3. مطابقة بالاسم الجزئي
  return majors.find((m) => {
    const parts = normalizeArabic(m.name).split(" ");
    return parts.some((p) => p.length > 3 && normQuery.includes(p));
  });
}

/** استخراج الدورات المعتمدة للتخصص */
function getCertificationsForMajor(major: Major): Certification[] {
  const linked = certifications.filter((c) => major.certificationIds.includes(c.id));
  if (linked.length > 0) return linked.slice(0, 3);

  // اختيار دورات حسب مجال التخصص
  const fieldNorm = normalizeArabic(major.field);
  if (fieldNorm.includes("تكنولوجيا") || fieldNorm.includes("حاسوب") || fieldNorm.includes("ذكاء")) {
    return certifications
      .filter((c) => c.category === "دورات التكنولوجيا والذكاء الاصطناعي")
      .slice(0, 3);
  }
  if (fieldNorm.includes("طب") || fieldNorm.includes("صحي") || fieldNorm.includes("تمريض") || fieldNorm.includes("صيدل")) {
    return certifications.filter((c) => c.category === "الدورات الطبية والصحية").slice(0, 3);
  }
  if (fieldNorm.includes("هندس")) {
    return certifications.filter((c) => c.category === "الدورات الهندسية").slice(0, 3);
  }
  if (fieldNorm.includes("اعمال") || fieldNorm.includes("اقتصاد") || fieldNorm.includes("اداره") || fieldNorm.includes("مالي")) {
    return certifications.filter((c) => c.category === "الدورات الادارية والاقتصادية والمالية").slice(0, 3);
  }
  if (fieldNorm.includes("قانون") || fieldNorm.includes("حقوق")) {
    return certifications.filter((c) => c.category === "دورات الحقوق والقانون").slice(0, 3);
  }
  if (fieldNorm.includes("اعلام") || fieldNorm.includes("صحاف")) {
    return certifications.filter((c) => c.category === "دورات الاعلام والاتصال").slice(0, 3);
  }
  if (fieldNorm.includes("فنون") || fieldNorm.includes("تصميم")) {
    return certifications.filter((c) => c.category === "دورات الفنون والتصميم").slice(0, 3);
  }

  return certifications.slice(0, 3);
}

/** توليد استجابة المستشار الذكي المعتمدة المرتكزة حصراً على بيانات المنصة */
export function generateLocalAdvisorResponse(userQuery: string): string {
  const norm = normalizeArabic(userQuery);

  // 1) استعلام عن معدل التوجيهي
  const gradeMatch = userQuery.match(/(?:معدلي|معدل|جبت|علامتي|حصلت على)\s*(?:في التوجيهي|بالتوجيهي)?\s*([6-9]\d(?:\.\d+)?)/);
  if (gradeMatch && gradeMatch[1]) {
    const grade = parseFloat(gradeMatch[1]);
    const topPicks = majors
      .filter((m) => m.classification === "مطلوب" && (m.risk === "منخفض" || m.risk === "متوسط"))
      .slice(0, 3);

    return `أهلاً بك يا بطل! مبارك لك وصولك لمعدل **${grade}** في الثانوية العامة (التوجيهي) 🎓.

وفقاً لدراسات العرض والطلب الصادرة عن **ديوان الخدمة المدنية** و**وزارة التعليم العالي (2026)**، إليك أفضل 3 مسارات مطلوبة ومحصنة لمعدلك:

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

🎯 **كيف نتابع خطوتك القادمة معاً بسلاسة؟**
1. هل يلفت انتباهك أحد هذه التخصصات لنحدد لك أفضل جامعة وفرص قبولك فيها؟
2. هل ترغب بالتعرف على الشهادات الاحترافية المجانية المعتمدة لدعم هذا المسار؟
3. هل تفضل جامعات قريبة من محافظتك (الوسط، الشمال، الجنوب)؟

**أخبرني باختيارك لنضع خطة قبولك خطوة بخطوة!**`;
  }

  // 2) استعلام عن جامعة محددة
  const matchedUni = findMatchingUniversity(userQuery);
  if (matchedUni && (norm.includes("جامع") || norm.includes("تكنو") || norm.includes("سميه") || norm.includes("اليرموك") || norm.includes("موته") || norm.includes("البلقاء") || norm.includes("بترا") || norm.includes("اهليه") || norm.includes("زيتونه") || norm.includes("الماني") || norm.includes("هاشمي") || norm.includes("طفيل") || norm.includes("معان") || norm.includes("مفرق") || norm.includes("عقبه"))) {
    return generateUniversityDetailResponse(matchedUni);
  }

  // 3) استعلام عام أو مقارنة عن الجامعات الأردنية وما يميزها
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

  // 4) استعلام خاص عن الدورات أو الشهادات
  if (norm.includes("شهادات") || norm.includes("دورات") || norm.includes("شهاده") || norm.includes("دوره") || norm.includes("كورس")) {
    const matched = findBestMatchingMajor(userQuery);
    if (matched) {
      const certs = getCertificationsForMajor(matched);
      const certsText = certs
        .map(
          (c) =>
            `• **[${c.title}](${c.url})** | المانح: ${c.provider}  \n  - **طريقة الحصول مجاناً:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
        )
        .join("\n\n");

      return `ممتاز! إليك مسار **الشهادات العالمية المجانية المعتمدة** لتخصص **${matched.name}** لبناء سيرة ذاتية تنافسية تسبق بها زملاءك 📜🚀:

---

${certsText}

---

💡 **توجيه المستشار:** هذه الشهادات مجانية 100% ومطلوبة في سوق العمل الأردني والإقليمي.

🎯 **الخطوة التالية:** هل تريد معرفة الجامعات الأنسب لدراسة ${matched.name}، أم مقارنة فرصه مع تخصص آخر؟`;
    }
  }

  // 5) استعلام خاص عن البدائل
  if (norm.includes("بدائل") || norm.includes("بديل") || norm.includes("خيارات ثانيه")) {
    const matched = findBestMatchingMajor(userQuery);
    if (matched) {
      const alternativesText =
        matched.alternatives && matched.alternatives.length > 0
          ? matched.alternatives.map((a) => `• **${a.name}:** ${a.reason}`).join("\n")
          : "• **الذكاء الاصطناعي والأمن السيبراني:** تخصصات ذات طلب مرتفع ومخاطر منخفضة.";

      return `بالتأكيد! إذا كنت تبحث عن خيارات موازية لتخصص **${matched.name}** لتجنب الركود وزيادة فرص التوظيف، إليك **البدائل الأكاديمية الذكية المعتمدة** 🎯:

---

${alternativesText}

---

🤝 **الخطوة التالية:** أي من هذه البدائل تشعر أنه الأقرب لميولك لنحلل فرصه والجامعات المانحة له معاً؟`;
    }
  }

  // 6) استعلام عن مقارنة بين خيارين أو تخصصين
  if (norm.includes("مقارن") || norm.includes("محتار") || norm.includes("افضل") || norm.includes("الفرق بين")) {
    return `أهلاً بك! مقارنة التخصصات خطوة استراتيجية في غاية الأهمية لتجنب الركود الأكاديمي ⚖️.

في سوق العمل الأردني والإقليمي (2026)، يعتمد تقييم أي تخصص على **3 ركائز رسمية**:

---

## 📌 المعايير الرسمية للمقارنة في منصتنا:
1. **تصنيف ديوان الخدمة المدنية:** هل التخصص **مطلوب** (تشغيل 70%-85%) أم **راكد** يعاني من مخزون تراكمي يزيد عن 10 سنوات؟
2. **الاعتمادات الدولية (ABET و HEAC):** توفر لخريجيها سهولة معادلة الشهادة للعمل عن بُعد وفي الخليج العربي وأوروبا.
3. **أثر الأتمتة والذكاء الاصطناعي:** مدى تعرض المهام الروتينية للأتمتة مقابل الحصانة التحليلية.

---

🚀 **أداة المقارنة المباشرة:**
يمكنك فتح **[مختبر المقارنة اللحظية](/compare)** في شريط التنقل العلوي لمقارنة أي تخصصين بنقرة واحدة جنباً إلى جنب مع كامل الإحصائيات الرسمية.

**أو شاركني التخصصين اللذين تتردد بينهما الآن لأقارن لك بينهما خطوة بخطوة!**`;
  }

  // 7) استعلام عن تخصص محدد
  const matchedMajor = findBestMatchingMajor(userQuery);
  if (matchedMajor) {
    return `أهلاً بك! إليك التحليل الأكاديمي والمهني المركز لتخصص **${matchedMajor.name}** استناداً لبيانات **ديوان الخدمة المدنية** و**التعليم العالي** (2026) 🎓:

---

## 📊 1) مؤشر الطلب والتشغيل في سوق العمل:
- **التصنيف الرسمي:** مصنف بأنه **[${matchedMajor.classification}]** في دراسات العرض والطلب.
- **نسبة التشغيل التقديرية:** **${matchedMajor.employmentRate}** خلال أول سنتين من التخرج.
- **مستوى المخاطرة الوظيفية:** مخاطرة **${matchedMajor.risk}**.
- **التعرض للأتمتة والذكاء الاصطناعي:** **${matchedMajor.automation.exposure}** (${matchedMajor.automation.note}).

---

## 🏛️ 2) الجامعات والاعتمادات الرسمية:
- **الاعتمادات الموصى بها:** ${matchedMajor.accreditation}.
- **أبرز الجامعات الحكومية:** ${matchedMajor.publicUniversities.slice(0, 3).join("، ")}.
- **أبرز الجامعات الخاصة:** ${matchedMajor.privateUniversities.slice(0, 2).join("، ")}.

---

💡 **خلاصة المستشار:** ${matchedMajor.summary}

---

🎯 **لنكمل معك خطوة بخطوة للوصول لقرارك النهائي:**
- **الخيار 1:** اكتب معدلك في التوجيهي لأخبرك بفرص قبولك في هذه الجامعات (تنافس وموازي).
- **الخيار 2:** هل تود أن أعرض لك **الشهادات العالمية المجانية** لتبدأ بها أثناء دراستك؟
- **الخيار 3:** هل تفضل استعراض **بدائل أكاديمية ذات أمان وظيفي أعلى**؟

**أخبرني بخطوتك القادمة لنواصل معاً بكل سلاسة!**`;
  }

  // 8) استعلام عام أو ترحيب
  return `أهلاً بك في **المستشار الذكي المعتمد** لمنصة «الطلاب والمستقبل» الأردنية 🎓🤖!

أنا مرشدك الأكاديمي والمهني التفاعلي، مستند حصراً إلى البيانات الرسمية الصادرة عن **ديوان الخدمة المدنية**، **وزارة التعليم العالي والبحث العلمي**، **وحدة تنسيق القبول الموحد**، و**هيئة الاعتماد (HEAC)** وقاعدة بيانات الـ 121 تخصصاً ودليل الجامعات الأردنية المعتمدة.

---

### كيف نسير معاً خطوة بخطوة للوصول لقرارك النهائي؟
1. **دليل الجامعات الأردنية وما يميزها:** اسألني عن أي جامعة (مثل: *شو بيميز التكنو، الأردنية، سمية، الألمانية*) أو اكتب *«شو بيميز كل جامعة»*.
2. **استشارة حسب معدل التوجيهي:** اكتب معدلك (مثال: *معدلي 84 علمي*) وسأقترح عليك التخصصات الأكثر طلباً وأماناً لمعدلك.
3. **تحليل أي تخصص ترغب به:** اكتب اسم التخصص (مثل: *الأمن السيبراني، الذكاء الاصطناعي، التمريض*) لنحلله تدريجياً.
4. **المقارنة والبدائل:** شاركني أي تخصصين تتردد بينهما أو توجه إلى **[مختبر المقارنة اللحظية](/compare)**.

**ما هو التخصص أو الجامعة التي تفكر بها حالياً، أو ما هو معدلك في الثانوية العامة؟**`;
}
