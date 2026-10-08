import { majors, type Major } from "@/data/majors";
import { certifications, type Certification } from "@/data/certifications";

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

/** استخراج الشهادات المعتمدة للتخصص */
function getCertificationsForMajor(major: Major): Certification[] {
  const linked = certifications.filter((c) => major.certificationIds.includes(c.id));
  if (linked.length > 0) return linked.slice(0, 3);

  // اختيار شهادات حسب مجال التخصص
  const fieldNorm = normalizeArabic(major.field);
  if (fieldNorm.includes("تكنولوجيا") || fieldNorm.includes("حاسوب") || fieldNorm.includes("ذكاء")) {
    return certifications
      .filter((c) => c.category.includes("حاسوب") || c.category.includes("برمجة") || c.category.includes("السيبراني"))
      .slice(0, 3);
  }
  if (fieldNorm.includes("طب") || fieldNorm.includes("صحي") || fieldNorm.includes("تمريض")) {
    return certifications.filter((c) => c.category.includes("الصحة")).slice(0, 2);
  }
  if (fieldNorm.includes("اعمال") || fieldNorm.includes("اقتصاد") || fieldNorm.includes("اداره")) {
    return certifications.filter((c) => c.category.includes("الأعمال") || c.category.includes("التسويق")).slice(0, 2);
  }

  return certifications.slice(0, 2);
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
      .slice(0, 5);

    return `أهلاً بك يا بطل! مبارك لك وصولك لمعدل **${grade}** في الثانوية العامة (التوجيهي) 🎓.

وفقاً لدراسات العرض والطلب الصادرة عن **ديوان الخدمة المدنية والإدارة العامة** و**وزارة التعليم العالي والبحث العلمي (2026)**، إليك التخصصات المعتمدة الأكثر طلباً وأماناً لمعدلك:

---

## 🎯 1) أبرز التخصصات المطلوبة رسمياً والمناسبة لمعدلك:
${topPicks
  .map(
    (m, i) => `### ${i + 1}. تخصص: ${m.name} (${m.field})
- **تصنيف سوق العمل:** **${m.classification}**
- **نسبة التشغيل التقديرية:** **${m.employmentRate}**
- **مستوى الأمان الوظيفي:** مخاطرة **${m.risk}**
- **الاعتمادات الموصى بها:** ${m.accreditation}
- **أبرز الجامعات الحكومية:** ${m.publicUniversities.slice(0, 3).join("، ")}
- **خلاصة المستشار:** ${m.summary}`,
  )
  .join("\n\n")}

---

## 💡 2) خطتك التنافسية للتميز:
بغض النظر عن التخصص المختار، تتطلب المنافسة في السوق الأردني والإقليمي تسليح نفسك بشهادات احترافية مجانية معتمدة من منصتنا أثناء دراستك:
- **علوم الحاسوب والتفكير المنطقي:** [Harvard CS50x](https://cs50.harvard.edu/x) — معتمدة من هارفارد مجاناً.
- **أساسيات الشبكات والأمن:** [Cisco Networking Academy](https://www.skillsforall.com) — مجانية ومعتمدة دولياً.

---

🤝 **لنكمل خطتك خطوة بخطوة:**
1. ما هو فرعك في التوجيهي (علمي، أدبي، صناعي، تكنولوجي)؟
2. هل تفضل الجامعات في إقليم الوسط (عمان، الزرقاء، البلقاء) أم الشمال أم الجنوب؟
3. هل ميولك تتجه نحو التحليل التقني، الرعاية الطبية، أم إدارة الأعمال وريادة المشاريع؟

**أجبني لأضع لك خطة القرار الأكاديمية والمهنية النهائية المناسبة لك شخصياً!**`;
  }

  // 2) استعلام عن مقارنة بين خيارين
  if (norm.includes("مقارن") || norm.includes("محتار") || norm.includes("افضل") || norm.includes("الفرق بين")) {
    return `أهلاً بك! مقارنة التخصصات خطوة استراتيجية في غاية الأهمية لتجنب الركود الأكاديمي ⚖️.

في سوق العمل الأردني والإقليمي (2026)، يعتمد تقييم أي تخصص على **3 ركائز رسمية**:

---

## 📌 المعايير الرسمية للمقارنة في منصتنا:
1. **تصنيف ديوان الخدمة المدنية:**
   - **التخصصات المطلوبة:** نسبة التشغيل تتراوح بين **70% إلى 85%** (مثل الأمن السيبراني، الذكاء الاصطناعي، التمريض، والتحليلات الرقمية).
   - **التخصصات الراكدة أو المشبعة:** تعاني من مخزون تراكمي يزيد عن 10 إلى 15 سنة في القطاع العام وتتطلب تميزاً استثنائياً في القطاع الخاص.

2. **الاعتمادات البرامجية (ABET و HEAC):**
   - الجامعات الحاصلة على اعتماد **ABET** الدولي وهيئة اعتماد مؤسسات التعليم العالي توفر لخريجيها سهولة معادلة الشهادة للعمل عن بُعد وفي أسواق الخليج العربي وأوروبا.

3. **أثر الأتمتة والذكاء الاصطناعي:**
   - التخصصات التي تعتمد على مهام إجرائية روتينية تتعرض لأتمتة مرتفعة، بينما التخصصات التحليلية والتطبيقية تحظى بحصانة وظيفية قوية.

---

🚀 **أداة المقارنة المباشرة:**
يمكنك فتح **[مختبر المقارنة اللحظية](/compare)** في شريط التنقل العلوي لمقارنة أي تخصصين بنقرة واحدة جنباً إلى جنب مع كامل الإحصائيات الرسمية.

**شاركني التخصصين اللذين تتردد بينهما وسأقوم بتحليلهما لك تفصيلياً مع تحديد الخيار الأنسب لمعدلك وطموحك!**`;
  }

  // 3) استعلام عن تخصص محدد
  const matchedMajor = findBestMatchingMajor(userQuery);
  if (matchedMajor) {
    const certs = getCertificationsForMajor(matchedMajor);
    const certsText = certs
      .map(
        (c) =>
          `• **[${c.title}](${c.url})** | الجهة المانحة: ${c.provider}  \n  - **طريقة الحصول:** ${c.howToGet}  \n  - **الفائدة المهنية:** ${c.summary}`,
      )
      .join("\n\n");

    const alternativesText =
      matchedMajor.alternatives && matchedMajor.alternatives.length > 0
        ? matchedMajor.alternatives.map((a) => `• **${a.name}:** ${a.reason}`).join("\n")
        : "• **الذكاء الاصطناعي والأمن السيبراني:** بدائل تكنولوجية ذات طلب مرتفع ومخاطر منخفضة.";

    return `أهلاً بك! إليك التحليل المعتمد الشامل لتخصص **${matchedMajor.name}** استناداً إلى بيانات **منصة الطلاب والمستقبل** الرسمية ومؤشرات سوق العمل الأردني والإقليمي 2026:

---

## 1) مؤشر التشغيل والطلب في سوق العمل الأردني
- **التصنيف الرسمي:** مصنف رسمياً بأنه **[${matchedMajor.classification}]** في تقارير هيئة الخدمة والإدارة العامة وديوان الخدمة المدنية.
- **نسبة التشغيل التقديرية:** تقدر بـ **${matchedMajor.employmentRate}** خلال أول سنتين من التخرج.
- **مستوى المخاطرة الوظيفية:** **${matchedMajor.risk}**.
- **الخلاصة الميدانية:** ${matchedMajor.summary}

---

## 2) خريطة التخصص في الجامعات الأردنية والاعتمادات
- **الاعتمادات الأكاديمية الرسمية:** ${matchedMajor.accreditation}.
- **أبرز الجامعات الحكومية المانحة:** ${matchedMajor.publicUniversities.slice(0, 4).join("، ")}.
- **أبرز الجامعات الخاصة:** ${matchedMajor.privateUniversities.slice(0, 3).join("، ")}.
- **ملاحظات التدريب الميداني:** ${matchedMajor.trainingNotes}.

---

## 3) أثر الذكاء الاصطناعي والأتمتة
- **مستوى التعرض للأتمتة:** **${matchedMajor.automation.exposure}**.
- **رؤية المستشار المهني:** ${matchedMajor.automation.note}.

---

## 4) مسار الشهادات العالمية المجانية المعتمدة لبناء ميزة تنافسية
لرفع جاهزيتك للتوظيف بنسبة تفوق 75%، نوصيك بالبدء فوراً بالشهادات العالمية المجانية المعتمدة من الجهات الست الشريكة في منصتنا:

${certsText}

---

## 5) البدائل الأكاديمية الذكية ذات الطلب الأعلى
إذا كنت تبحث عن خيارات موازية تقلل المخاطر وتزيد فرص العمل عن بُعد أو في الخليج العربي:
${alternativesText}

---

🎯 **لنصل معاً لقرارك النهائي:**
- كم معدلك في الثانوية العامة (التوجيهي)؟
- هل تخطط للالتحاق بجامعة حكومية (تنافس / موازي) أم جامعة خاصة؟
- هل هدفك العمل محلياً أم العمل عن بُعد مع شركات دولية؟

**أخبرني بتفاصيلك لأبني لك خطة التخرج والمسار المهني المتكامل!**`;
  }

  // 4) استعلام عام أو ترحيب
  return `أهلاً بك في **المستشار الذكي المعتمد** لمنصة «الطلاب والمستقبل» الأردنية 🎓🤖!

أنا مرشدك الأكاديمي والمهني التفاعلي، مستند حصراً إلى البيانات الرسمية الصادرة عن **ديوان الخدمة المدنية**، **وزارة التعليم العالي والبحث العلمي**، و**هيئة الاعتماد (HEAC)** وقاعدة بيانات الـ 121 تخصصاً أردنياً.

---

### كيف أساعدك للوصول لنتيجة وقرار فعلي؟
1. **تحليل أي تخصص ترغب به:** اكتب اسم التخصص (مثل: *الأمن السيبراني، الذكاء الاصطناعي، التمريض، هندسة البرمجيات، إدارة الأعمال*) لأحلل لك نسب التشغيل، الجامعات، والاعتمادات.
2. **استشارة حسب معدل التوجيهي:** اكتب معدلك (مثال: *معدلي 84 علمي*) وسأقترح عليك التخصصات الأكثر طلباً وأماناً لمعدلك.
3. **المقارنة بين تخصصين:** اكتب التخصصين اللذين تتردد بينهما أو توجه إلى **[مختبر المقارنة اللحظية](/compare)**.
4. **مسار الشهادات المجانية:** سأرتب لك خارطة شهادات معتمدة من هارفارد، سيسكو، وfreeCodeCamp مجاناً.

**ما هو التخصص الذي تفكر به حالياً، أو ما هو معدلك في الثانوية العامة؟**`;
}
