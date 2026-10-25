import type { Major } from "@/data/majors";

export const SITE_URL = "https://students-future.com";
export const BRAND_NAME = "منصة الطلاب والمستقبل";
export const BRAND_TAGLINE = "منظومة الذكاء الاصطناعي الوطنية للتوجيه الأكاديمي والمهني ومواءمة التعليم مع سوق العمل الأردني";
export const AUTHOR_NAME = "عمر معن الرباع - منصة الطلاب والمستقبل";

export const MASTER_KEYWORDS = [
  "الطلاب والمستقبل",
  "منصة الطلاب والمستقبل",
  "الطلاب والمستقبل الأردن",
  "مستشار الطلاب والمستقبل",
  "التوجيه الأكاديمي والمهني الأردن",
  "تخصصات التوجيهي الأردن 2026",
  "معدلات القبول الموحد الأردن 2026",
  "الحدود الدنيا للقبول التنافسي",
  "التخصصات الراكدة والمشبعة في ديوان الخدمة المدنية",
  "التخصصات الأكثر طلباً في سوق العمل الأردني",
  "دليل الجامعات الأردنية الحكومية والخاصة",
  "أسعار ساعات التخصصات في الجامعات الأردنية",
  "البرنامج الموازي والتنافسي في الأردن",
  "المستشار الأكاديمي الذكي",
  "رواتب التخصصات في الأردن والخليج",
  "دورات تدريبية وشهادات مجانية معتمدة",
  "تخصصات المستقبل والذكاء الاصطناعي",
  "مقارنة التخصصات والجامعات الأردنية",
  "وزارة التعليم العالي والبحث العلمي الأردنية",
  "وحدة تنسيق القبول الموحد",
  "هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها",
  "عمر معن الرباع",
].join("، ");

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
}

/** توليد حزمة وسوم الميتا الشاملة لأي صفحة فرعية لضمان تصدر محركات البحث */
export function buildMetaTags(props: SeoProps = {}) {
  const title = props.title
    ? `${props.title} | ${BRAND_NAME}`
    : `${BRAND_NAME} | منظومة الذكاء الاصطناعي للتوجيه الأكاديمي وسوق العمل الأردني`;

  const description =
    props.description ||
    "المنصة الوطنية الأردنية الأولى لتحليل نسب تشغيل التخصصات الجامعية ومعدلات القبول الموحد والرسوم، مع مستشار ذكاء اصطناعي تفاعلي ومسار شهادات عالمية مجانية معتمدة.";

  const keywords = props.keywords
    ? `${props.keywords}، ${MASTER_KEYWORDS}`
    : MASTER_KEYWORDS;

  const fullUrl = props.path ? `${SITE_URL}${props.path.startsWith("/") ? "" : "/"}${props.path}` : SITE_URL;
  const imageUrl = props.image ? (props.image.startsWith("http") ? props.image : `${SITE_URL}${props.image}`) : `${SITE_URL}/logo.png`;
  const ogType = props.ogType || "website";

  const metaList: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: AUTHOR_NAME },
    { name: "publisher", content: BRAND_NAME },
    { name: "robots", content: props.noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { name: "googlebot", content: props.noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { name: "bingbot", content: props.noIndex ? "noindex, nofollow" : "index, follow" },
    { name: "application-name", content: BRAND_NAME },
    { name: "apple-mobile-web-app-title", content: BRAND_NAME },
    { name: "theme-color", content: "#0284c7" },
    { name: "geo.region", content: "JO" },
    { name: "geo.placename", content: "Amman, Jordan" },
    { name: "geo.position", content: "31.9539;35.9106" },
    { name: "ICBM", content: "31.9539, 35.9106" },

    // OpenGraph (Facebook, WhatsApp, LinkedIn)
    { property: "og:site_name", content: BRAND_NAME },
    { property: "og:locale", content: "ar_JO" },
    { property: "og:type", content: ogType },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: fullUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:image:alt", content: `شعار ${BRAND_NAME}` },

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: `شعار ${BRAND_NAME}` },
  ];

  return metaList;
}

/** مخطط الموقع الإلكتروني ومحرك البحث الداخلي (Schema.org WebSite) */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": BRAND_NAME,
    "alternateName": [
      "الطلاب والمستقبل",
      "منصة الطلاب والمستقبل الذكية",
      "Students and Future",
      "Students Future Jordan"
    ],
    "description": BRAND_TAGLINE,
    "inLanguage": "ar-JO",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/majors?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/** مخطط المؤسسة التعليمية الوطنية (Schema.org EducationalOrganization) */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    "name": BRAND_NAME,
    "alternateName": "الطلاب والمستقبل",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`,
      "width": 512,
      "height": 512,
      "caption": `شعار ${BRAND_NAME}`
    },
    "description": BRAND_TAGLINE,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "عمان / إربد",
      "addressCountry": "JO"
    },
    "founder": {
      "@type": "Person",
      "name": "عمر معن الرباع",
      "jobTitle": "مبتكر ومطور منصة الطلاب والمستقبل"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Jordan"
    },
    "sameAs": [
      "https://github.com/omaralrabbaa515/students-future"
    ]
  };
}

/** مخطط مسار التنقل التفاعلي (Schema.org BreadcrumbList) */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.path.startsWith("/") ? "" : "/"}${item.path}`
    }))
  };
}

/** مخطط الأسئلة الشائعة والأكثر بحثاً (Schema.org FAQPage) */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/** مخطط التخصص الأكاديمي والبرنامج المهني (Schema.org Course & EducationalOccupationalProgram) */
export function buildMajorSchema(major: Major) {
  const majorUrl = `${SITE_URL}/majors/${major.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": `${majorUrl}/#program`,
    "name": `تخصص ${major.name}`,
    "alternateName": major.name,
    "description": `دراسة تخصص ${major.name} في الجامعات الأردنية: تصنيف سوق العمل [${major.classification}]، نسبة التشغيل ${major.employmentRate}، مستوى المخاطرة ${major.risk}. ${major.summary}`,
    "url": majorUrl,
    "educationalProgramMode": "Full-time",
    "timeToComplete": "P4Y",
    "occupationalCategory": major.field,
    "provider": major.publicUniversities.map((uniName) => ({
      "@type": "CollegeOrUniversity",
      "name": uniName
    })),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "JOD",
      "category": major.classification,
      "description": `تصنيف ديوان الخدمة المدنية: ${major.classification} - نسبة التشغيل ${major.employmentRate}`
    },
    "hasCourse": {
      "@type": "Course",
      "name": `الخطة الأكاديمية والمهنية لتخصص ${major.name}`,
      "description": major.summary,
      "provider": {
        "@type": "Organization",
        "name": BRAND_NAME,
        "url": SITE_URL
      }
    }
  };
}

/** مخطط التطبيق والبرمجية الذكية (Schema.org WebApplication) */
export function buildWebApplicationSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${name} | ${BRAND_NAME}`,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": `${SITE_URL}${path}`,
    "description": description,
    "creator": {
      "@type": "Organization",
      "name": BRAND_NAME,
      "url": SITE_URL
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JOD"
    }
  };
}
