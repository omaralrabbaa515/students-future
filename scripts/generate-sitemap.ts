import fs from "node:fs";
import path from "node:path";
import { majors } from "../src/data/majors";

const SITE_URL = process.env.VITE_SITE_URL || "https://students-future.com";
const TODAY = new Date().toISOString().split("T")[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
  image?: {
    loc: string;
    title: string;
    caption: string;
  };
}

const staticRoutes: SitemapUrl[] = [
  {
    loc: `${SITE_URL}/`,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "1.0",
    image: {
      loc: `${SITE_URL}/logo.png`,
      title: "منصة الطلاب والمستقبل",
      caption: "منظومة الذكاء الاصطناعي الوطنية للتوجيه الأكاديمي والمهني ومواءمة التعليم مع سوق العمل الأردني",
    },
  },
  {
    loc: `${SITE_URL}/advisor`,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "0.95",
    image: {
      loc: `${SITE_URL}/logo.png`,
      title: "المستشار الأكاديمي والمهني الذكي - منصة الطلاب والمستقبل",
      caption: "مرشد تفاعلي ذكي مدعوم بالذكاء الاصطناعي لإرشاد طلبة التوجيهي والجامعات في الأردن",
    },
  },
  {
    loc: `${SITE_URL}/majors`,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "0.95",
  },
  {
    loc: `${SITE_URL}/compare`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.90",
  },
  {
    loc: `${SITE_URL}/certifications`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.90",
  },
  {
    loc: `${SITE_URL}/sources`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    loc: `${SITE_URL}/auth`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.50",
  },
];

const majorRoutes: SitemapUrl[] = majors.map((major) => ({
  loc: `${SITE_URL}/majors/${major.slug}`,
  lastmod: TODAY,
  changefreq: "weekly",
  priority: major.classification === "مطلوب" ? "0.90" : "0.80",
  image: {
    loc: `${SITE_URL}/logo.png`,
    title: `تخصص ${major.name} - منصة الطلاب والمستقبل`,
    caption: `دليل تخصص ${major.name} في الجامعات الأردنية: نسبة التشغيل ${major.employmentRate}، التصنيف ${major.classification}، وأسعار الساعات`,
  },
}));

const allUrls = [...staticRoutes, ...majorRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map((u) => {
    let item = `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>`;
    if (u.image) {
      item += `
    <image:image>
      <image:loc>${u.image.loc}</image:loc>
      <image:title>${u.image.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>
      <image:caption>${u.image.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:caption>
    </image:image>`;
    }
    item += `
  </url>`;
    return item;
  })
  .join("\n")}
</urlset>
`;

const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf-8");
console.log(`✅ Sitemap successfully written to ${outputPath} with ${allUrls.length} URLs!`);
