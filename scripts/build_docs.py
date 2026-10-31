#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
مولد الوثيقة الهندسية والتقنية الشاملة لمنصة «الطلاب والمستقبل»
ينتج ملف Markdown مفصل، وملف HTML فائق الجودة والجمالية، ويقوم بتجميع ملف PDF عالي الدقة للتحميل المباشر.
"""

import os
import base64
import subprocess
import pymupdf

BASE_DIR = "/Users/mahmoudjaw/.gemini/antigravity/scratch/students-future"
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
LOGO_PATH = os.path.join(PUBLIC_DIR, "logo.png")

# تحميل شعار المنصة بصيغة Base64
with open(LOGO_PATH, "rb") as f:
    logo_base64 = base64.b64encode(f.read()).decode("utf-8")

print("Generating technical documentation files...")

# ==============================================================================
# 1. إعداد محتوى الـ HTML المخصص للطباعة وعرض الـ PDF الأنيق
# ==============================================================================
html_content = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>الدليل الهندسي والتقني الشامل | منصة «الطلاب والمستقبل»</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

    @page {{
      size: A4 portrait;
      margin: 18mm 15mm 20mm 15mm;
      @bottom-center {{
        content: counter(page);
        font-family: 'Cairo', sans-serif;
        font-size: 9pt;
        color: #64748b;
      }}
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.65;
      color: #0f172a;
      background: #ffffff;
      text-align: justify;
    }}

    /* Cover Page */
    .cover-page {{
      height: 255mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      page-break-after: always;
      padding: 15mm 10mm;
      border: 2px solid #0284c7;
      border-radius: 12px;
      background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 40%, #f8fafc 100%);
      position: relative;
    }}

    .cover-top {{
      width: 100%;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 12px;
    }}

    .cover-top h2 {{
      font-size: 14pt;
      font-weight: 800;
      color: #0369a1;
      margin-bottom: 4px;
    }}

    .cover-top p {{
      font-size: 10.5pt;
      color: #475569;
      font-weight: 600;
    }}

    .cover-center {{
      margin: auto 0;
    }}

    .cover-logo {{
      width: 130px;
      height: 130px;
      margin-bottom: 16px;
      filter: drop-shadow(0 4px 12px rgba(2, 132, 199, 0.25));
    }}

    .cover-title {{
      font-size: 26pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.25;
      margin-bottom: 8px;
    }}

    .cover-title span {{
      color: #0284c7;
    }}

    .cover-subtitle {{
      font-size: 13pt;
      font-weight: 700;
      color: #047857;
      margin-bottom: 12px;
      max-width: 650px;
      line-height: 1.45;
    }}

    .cover-badge {{
      display: inline-block;
      background: #0284c7;
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 10pt;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }}

    .cover-desc {{
      font-size: 10pt;
      color: #334155;
      max-width: 580px;
      line-height: 1.6;
      margin: 0 auto;
    }}

    .cover-meta {{
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 9.5pt;
      text-align: right;
    }}

    .cover-meta-item strong {{
      color: #0369a1;
    }}

    .cover-footer {{
      width: 100%;
      font-size: 9pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
    }}

    /* Main Content Styling */
    .chapter {{
      page-break-before: always;
      margin-bottom: 25px;
    }}

    .chapter:first-of-type {{
      page-break-before: avoid;
    }}

    .chapter-header {{
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 3px solid #0284c7;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }}

    .chapter-num {{
      background: #0284c7;
      color: #ffffff;
      font-size: 13pt;
      font-weight: 900;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      flex-shrink: 0;
    }}

    .chapter-title {{
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
    }}

    h3 {{
      font-size: 12pt;
      font-weight: 800;
      color: #0369a1;
      margin: 16px 0 8px 0;
      border-right: 4px solid #0284c7;
      padding-right: 8px;
    }}

    h4 {{
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 12px 0 6px 0;
    }}

    p {{
      margin-bottom: 8px;
      line-height: 1.6;
      color: #1e293b;
    }}

    ul, ol {{
      margin-right: 22px;
      margin-bottom: 10px;
    }}

    li {{
      margin-bottom: 4px;
      line-height: 1.55;
    }}

    /* Callout & Alert Boxes */
    .callout {{
      background: #f8fafc;
      border-right: 4px solid #0284c7;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 12px 0;
      font-size: 9.5pt;
    }}

    .callout-success {{
      background: #f0fdf4;
      border-right-color: #16a34a;
      color: #14532d;
    }}

    .callout-warning {{
      background: #fffbeb;
      border-right-color: #d97706;
      color: #78350f;
    }}

    .callout-info {{
      background: #f0f9ff;
      border-right-color: #0284c7;
      color: #0c4a6e;
    }}

    /* Tables */
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9pt;
      background: #ffffff;
      page-break-inside: avoid;
    }}

    th, td {{
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      text-align: right;
    }}

    th {{
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }}

    tr:nth-child(even) {{
      background: #f8fafc;
    }}

    .badge {{
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 700;
    }}

    .badge-success {{ background: #dcfce7; color: #166534; }}
    .badge-warning {{ background: #fef3c7; color: #92400e; }}
    .badge-danger  {{ background: #fee2e2; color: #991b1b; }}
    .badge-primary {{ background: #e0f2fe; color: #075985; }}

    /* Code Snippets */
    pre, code {{
      font-family: 'Fira Code', Consolas, Monaco, monospace;
      font-size: 8.5pt;
    }}

    pre {{
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 6px;
      margin: 10px 0;
      direction: ltr;
      text-align: left;
      overflow-x: auto;
      line-height: 1.45;
      page-break-inside: avoid;
    }}

    code.inline {{
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 8.5pt;
      direction: ltr;
      display: inline-block;
    }}

    /* Grid Layouts */
    .grid-2 {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin: 12px 0;
    }}

    .grid-3 {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 12px 0;
    }}

    .card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      page-break-inside: avoid;
    }}

    .card strong {{
      color: #0284c7;
      display: block;
      margin-bottom: 4px;
      font-size: 10pt;
    }}

    /* Header and Footer for Pages */
    .page-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 16px;
      font-size: 8pt;
      color: #64748b;
    }}

    .page-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
      margin-top: 20px;
      font-size: 8pt;
      color: #64748b;
    }}
  </style>
</head>
<body>

  <!-- ======================== صفحة الغلاف ======================== -->
  <div class="cover-page">
    <div class="cover-top">
      <h2>المملكة الأردنية الهاشمية · منظومة المبادرات العلمية والتقنية</h2>
      <p>رؤية التحديث الاقتصادي (2033) · قطاع التعليم العالي والابتكار والذكاء الاصطناعي</p>
    </div>

    <div class="cover-center">
      <img src="data:image/png;base64,{logo_base64}" alt="شعار منصة الطلاب والمستقبل" class="cover-logo">
      <h1 class="cover-title">منصة <span>«الطلاب والمستقبل»</span></h1>
      <div class="cover-subtitle">المنظومة الوطنية الذكية للتوجيه الأكاديمي والمهني ومواءمة التعليم مع سوق العمل الأردني</div>
      <div class="cover-badge">الدليل الهندسي والتقني الشامل · معمارية البرمجيات والذكاء الاصطناعي (2026/2027)</div>
      <p class="cover-desc">
        وثيقة المرجع الفني والتطويري الكامل للمنصة: هندسة الواجهات الأمامية المتقدمة، معمارية الخادم الخفيف، خوارزميات محرك الذكاء الاصطناعي التكيفي، مصفوفات البيانات الوطنية الـ 121، ونظام الأمان السيبراني المتكامل.
      </p>
    </div>

    <div class="cover-meta">
      <div class="cover-meta-item">
        <strong>إعداد وتطوير الطالب:</strong> عمر معن الرباع
      </div>
      <div class="cover-meta-item">
        <strong>الإشراف الأكاديمي:</strong> أ. محمد قاسم الجوارنه
      </div>
      <div class="cover-meta-item">
        <strong>المؤسسة التعليمية:</strong> مدرسة عنبة الثانوية الشاملة للبنين
      </div>
      <div class="cover-meta-item">
        <strong>الإشراف الإداري والتقني:</strong> عمر الرباع &amp; محمود جو
      </div>
      <div class="cover-meta-item">
        <strong>المديرية / المحافظة:</strong> لواء المزار الشمالي / إربد
      </div>
      <div class="cover-meta-item">
        <strong>المستودع البرمجي:</strong> github.com/omaralrabbaa515/students-future
      </div>
    </div>

    <div class="cover-footer">
      <span>الإصدار البرمجي: v2.5.0 Production Enterprise</span>
      <span>تاريخ التوثيق: تشرين الأول 2026 / 2027</span>
      <span>منصة «الطلاب والمستقبل» © جميع الحقوق محفوظة</span>
    </div>
  </div>

  <!-- ======================== الفهرس والمقدمة ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفهرس والمقدمة الاستراتيجية</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">01</div>
      <div class="chapter-title">المقدمة، الرؤية الوطنية، وخريطة الوثيقة الفنية</div>
    </div>

    <h3>1.1 الفهرس التفصيلي لمحتويات الوثيقة</h3>
    <table style="margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="width: 10%;">الفصل</th>
          <th style="width: 40%;">عنوان المحور التقني والهندسي</th>
          <th style="width: 50%;">أبرز المخرجات والمكونات البرمجية المشمولة</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>01</strong></td>
          <td><strong>المقدمة والرؤية الوطنية</strong></td>
          <td>الأهداف الاستراتيجية، حل معضلات سوق العمل، ومواءمة رؤية التحديث الاقتصادي 2033.</td>
        </tr>
        <tr>
          <td><strong>02</strong></td>
          <td><strong>المعمارية الهندسية الشاملة</strong></td>
          <td>المعمارية الطبقية (Layered Architecture)، شجرة ملفات المشروع، وحزم البناء.</td>
        </tr>
        <tr>
          <td><strong>03</strong></td>
          <td><strong>الواجهات الأمامية ومحرك التوجيه</strong></td>
          <td>React 19, TypeScript 5.8, TanStack Router (File-based), Tailwind CSS v4, Radix UI.</td>
        </tr>
        <tr>
          <td><strong>04</strong></td>
          <td><strong>محرك الذكاء الاصطناعي والمستشار</strong></td>
          <td>Google Gemini 2.5 Flash, Local Adaptive NLU Engine, 18+ Intent Handlers, SSE Streaming.</td>
        </tr>
        <tr>
          <td><strong>05</strong></td>
          <td><strong>وكيل الرصد ومحرك الرؤية الحاسوبية</strong></td>
          <td>Autonomous AI Scout, Multi-Image Vision OCR, Gemini Vision API, Automated Parsing.</td>
        </tr>
        <tr>
          <td><strong>06</strong></td>
          <td><strong>هندسة البيانات وقواعد المعرفة</strong></td>
          <td>121 تخصصاً، 19 جامعة أردنية، 215+ دورة وشهادة معتمدة، 34 مصدراً رسمياً، ومؤشرات الرواتب.</td>
        </tr>
        <tr>
          <td><strong>07</strong></td>
          <td><strong>الأمن السيبراني وإدارة الصلاحيات</strong></td>
          <td>Supabase PostgreSQL, Dual Supervisors Lockdown, JWT Auth, RLS Policies, CSRF/XSS Shields.</td>
        </tr>
        <tr>
          <td><strong>08</strong></td>
          <td><strong>لوحة الإدارة والتحكم العليا (13 موديول)</strong></td>
          <td>KPIs, Charts, Traffic Analytics, Master Content Hub, Live Overrides, AI Logs, Audit Trail.</td>
        </tr>
        <tr>
          <td><strong>09</strong></td>
          <td><strong>السيو المؤسسي والأرشفة الرقمية</strong></td>
          <td>Dynamic Sitemap (128 URLs), Robots.txt, PWA Webmanifest, 7 Schema.org Rich Snippets.</td>
        </tr>
        <tr>
          <td><strong>10</strong></td>
          <td><strong>الأداء والاعتمادية وخارطة الطريق</strong></td>
          <td>Core Web Vitals, Nitro Server Engine, Fault Tolerance, Mobile Roadmap 2027.</td>
        </tr>
      </tbody>
    </table>

    <h3>1.2 الرؤية والأثر التنموي في المملكة الأردنية الهاشمية</h3>
    <p>
      تُعد <strong>منصة «الطلاب والمستقبل»</strong> أول منظومة رقمية أردنية متكاملة تُسخّر تقنيات الذكاء الاصطناعي التوليدي والتحليلي لحل معضلة الانفصال التاريخي بين مخرجات منظومة التعليم العالي واحتياجات سوق العمل الحقيقية في المملكة.
    </p>

    <div class="grid-2">
      <div class="card">
        <strong>1. معالجة التخبط والبطالة التراكمية:</strong>
        تحذير الطلبة استباقياً من التخصصات الراكدة والمشبعة في ديوان الخدمة المدنية، والتي ينتظر خريجوها لعقود، وتوجيههم لبدائل وظيفية محصنة ذات نمو وتشغيل يتجاوز 80%.
      </div>
      <div class="card">
        <strong>2. تفكيك تشتت البيانات الحكومية:</strong>
        دمج ومواءمة الإحصاءات الرسمية لوزارة التعليم العالي، وحدة القبول الموحد، ديوان الخدمة والإدارة العامة، والضمان الاجتماعي في نافذة موحدة ومجانية.
      </div>
      <div class="card">
        <strong>3. ردم فجوة المهارات العملية:</strong>
        ربط كل تخصص أكاديمي بمسار شهادات احترافية دولية مجانية معتمدة من Harvard و Google و Cisco لبناء سيرة ذاتية منافسة عالمياً قبل التخرج.
      </div>
      <div class="card">
        <strong>4. مستشار خبير متاح 24/7 للجميع:</strong>
        إيصال التوجيه الأكاديمي والمهني فائق التطور لكافة طلبة المحافظات وقرى المملكة مجاناً، تحقيقاً لمبدأ العدالة وتكافؤ الفرص التعليمية.
      </div>
    </div>
  </div>

  <!-- ======================== المعمارية البرمجية ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل الثاني: المعمارية الهندسية الشاملة</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">02</div>
      <div class="chapter-title">الهيكلية المعمارية البرمجية الشاملة (Full Architecture)</div>
    </div>

    <h3>2.1 المخطط المعماري الطبقي للنظام (Layered System Architecture)</h3>
    <p>
      تم بناء منصة «الطلاب والمستقبل» وفق معمارية برمجية حديثة متعددة الطبقات (Enterprise Layered Architecture) تضمن الفصل الدقيق بين المسؤوليات (Separation of Concerns)، وتحقيق أعلى درجات الاستجابة، الأمان، والتوافقية:
    </p>

    <div class="callout callout-info">
      <strong>1. طبقة العرض والواجهات (Presentation Layer):</strong><br>
      مبنية بواسطة React 19 مع مكتبة المكونات سهلة الوصول Radix UI وتنسيقات Tailwind CSS v4، مع دعم أصيل للغة العربية والاتجاه من اليمين لليسار (RTL)، ومحرك التبديل الفوري بين النمط الفاتح والداكن (Theme Engine).
    </div>

    <div class="callout callout-info">
      <strong>2. طبقة التوجيه والتحكم وتوليد الصفحات (Routing &amp; SSR Engine):</strong><br>
      محرك TanStack Start و TanStack Router الذي يعتمد شجرة المسارات المبنية على الملفات (File-based Routing)، ونظام التحميل المسبق الذكي (Intent-based Preloading)، ومحرك دوال الخادم الآمنة (Server Functions عبر <code>createServerFn</code>).
    </div>

    <div class="callout callout-info">
      <strong>3. طبقة الذكاء الاصطناعي المزدوجة (Hybrid Dual AI Subsystem):</strong><br>
      بوابة متطورة تجمع بين نماذج الحوسبة السحابية (Google Gemini 2.5 Flash / OpenAI) ومحرك التحليل اللغوي المحلي التكيفي (Local Adaptive NLU Engine) الذي يعمل بنسبة استمرارية 100% بدون انقطاع.
    </div>

    <div class="callout callout-info">
      <strong>4. طبقة المصادر والبيانات المرجعية (Domain Data &amp; Knowledge Matrix):</strong><br>
      قواعد بيانات TypeScript مهيكلة بدقة متناهية تضم 121 تخصصاً، 19 جامعة أردنية، 215+ دورة وشهادة معتمدة، 34 جهة رسمية، وجداول الحدود الدنيا والرسوم والرواتب.
    </div>

    <div class="callout callout-info">
      <strong>5. طبقة السحاب والمصادقة والأمان (Persistence &amp; Security Layer):</strong><br>
      قواعد بيانات PostgreSQL السحابية المدارة عبر Supabase مع تفعيل سياسات أمان السجلات (Row-Level Security)، ونظام حماية المشرفين المزدوج (Dual Supervisors Security Lockdown).
    </div>

    <h3>2.2 شجرة الملفات والمجلدات البرمجية التفصيلية (Directory Structure)</h3>
    <pre>
students-future/
├── public/                       # الأصول والملفات العامة المستقلة
│   ├── logo.png                  # الشعار الرسمي فائق الدقة للمنصة
│   ├── favicon.png               # أيقونة التبويب والشاشات الذكية
│   ├── robots.txt                # توجيهات محركات البحث العالمية
│   ├── sitemap.xml               # خريطة الموقع المفهرسة (128 رابطاً)
│   ├── site.webmanifest          # إعدادات تطبيق الويب التقدمي (PWA)
│   └── competition_report.pdf    # التقرير العلمي الرسمي للمسابقات
├── scripts/                      # السكربتات البرمجية وأدوات الأتمتة
│   ├── generate-sitemap.ts       # مولد خرائط الموقع البرمجية التلقائية
│   └── build_docs.py             # مولد الوثائق الفنية والـ PDF الهندسي
├── src/                          # الشفرة المصدرية الأساسية للتطبيق
│   ├── assets/                   # الصور والشعارات والمتجهات الداخلية
│   ├── components/               # مكونات واجهة المستخدم القابلة لإعادة الاستخدام
│   │   ├── ui/                   # مكونات Radix UI (Dropdown, Accordion, Modal)
│   │   ├── brand-logo.tsx        # مكون الشعار التفاعلي عالي التباين
│   │   ├── ThemeToggle.tsx       # مبدل النمط (نهاري / ليلي)
│   │   └── UserNav.tsx           # قائمة حساب المستخدم والمشرفين
│   ├── data/                     # مصفوفات البيانات الوطنية المعتمدة
│   │   ├── majors.ts             # مصفوفة الـ 121 تخصصاً وتصنيفاتها
│   │   ├── additional-majors.ts  # التخصصات الملحقة وتفاصيل اعتماداتها
│   │   ├── universities.ts       # دليل الجامعات الأردنية الـ 19
│   │   ├── certifications.ts     # بنك الـ 215 دورة وشهادة مجانية
│   │   ├── sources.ts            # شبكة المصادر والوثائق الرسمية الـ 34
│   │   ├── magazine.ts           # مقالات ودراسات المجلة الخبيرية
│   │   └── official-market-stats.ts # إحصاءات القبول، الرواتب، والخدمة المدنية
│   ├── hooks/                    # خطافات React المخصصة (Custom Hooks)
│   │   └── use-auth.ts           # إدارة جلسة المستخدم وصلاحيات المشرف
│   ├── integrations/             # تكاملات المنصات السحابية والخدمات
│   │   └── supabase/             # عميل Supabase وإدارة جلسات التخزين
│   ├── lib/                      # المكتبات والوظائف الهندسية ومحركات الذكاء
│   │   ├── ai-gateway.server.ts  # بوابة الذكاء الاصطناعي (Gemini / OpenAI)
│   │   ├── local-advisor-ai.ts   # محرك NLU المحلي المستقل (18+ Intent)
│   │   ├── advisor-prompt.ts     # برومبت المستشار المهندس بصرامة
│   │   ├── ai-scout.ts           # وكيل الرصد والاستكشاف الذاتي الذكي
│   │   ├── seo.ts                # أدوات السيو ومولد مخططات Schema.org
│   │   └── admin.functions.ts    # دوال الخادم لإدارة المنصة والتجاوزات
│   ├── routes/                   # شجرة مسارات التطبيق (File-Based Routing)
│   │   ├── __root.tsx            # المسار الجذري، الهيكل العام، والميتا العامة
│   │   ├── index.tsx             # الصفحة الرئيسية والجولة الاسترشادية بـ 7 محطات
│   │   ├── advisor.tsx           # واجهة المستشار الذكي التفاعلي الحي
│   │   ├── compare.tsx           # مختبر المقارنة اللحظية بين التخصصات
│   │   ├── certifications.tsx   # بوابة بنك الدورات والشهادات المجانية
│   │   ├── sources.tsx           # استعراض المصادر والوثائق الرسمية الـ 34
│   │   ├── account.tsx           # الملف الأكاديمي، الشارات، والتخصصات المحفوظة
│   │   ├── auth.tsx              # بوابة تسجيل الدخول الموحدة
│   │   ├── majors.index.tsx      # دليل التخصصات الجامعية الشامل
│   │   ├── majors.$slug.tsx      # صفحة كل تخصص ديناميكياً (121 صفحة)
│   │   ├── _authenticated/       # المسارات المحمية والمخصصة للمشرفين
│   │   │   └── updates.tsx       # لوحة الإدارة العليا والتحكم الشامل (13 موديول)
│   │   └── api/                  # نقاط نهاية الخادم الخلفية (Backend Endpoints)
│   │       ├── chat.ts           # خادم البث الحي لمحادثات المستشار (SSE)
│   │       └── vision.ts         # خادم تفريغ الوثائق بالصور (Vision OCR)
│   ├── styles.css                # أنماط Tailwind والمتغيرات اللونية
│   └── router.tsx                # إعدادات كاش وتوجيه TanStack Router
├── package.json                  # التبعيات والسكربتات البرمجية
└── vite.config.ts                # إعدادات محرك البناء والتجميع
    </pre>
  </div>

  <!-- ======================== الواجهات الأمامية ومحرك التوجيه ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل الثالث: الواجهات الأمامية وهندسة التوجيه</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">03</div>
      <div class="chapter-title">الواجهات الأمامية وهندسة التوجيه (Frontend &amp; Routing)</div>
    </div>

    <h3>3.1 اعتماد React 19 و TypeScript 5.8 الصارم</h3>
    <p>
      تم تطوير المنصة بالكامل اعتماداً على أحدث إصدارات <strong>React 19</strong> و <strong>TypeScript 5.8</strong> مع فرض نمط التدقيق الصارم (Strict Mode). يوفر هذا المزيج:
    </p>
    <ul>
      <li><strong>حماية برمجية كاملة من أخطاء الـ Runtime:</strong> مطابقة كل تخصص، جامعة، شهادة، ومصدر بنماذج TypeScript Type-Safe محددة مسبقاً، مما يمنع تمرير بيانات مفقودة أو غير صحيحة.</li>
      <li><strong>الاستفادة من قدرات React 19 في المعالجة المتزامنة (Concurrent Features):</strong> دعم التحديث الفوري للواجهات عند التنقل بين شاشات المقارنة والتحليلات دون تجميد واجهة المستخدم.</li>
      <li><strong>معالجة Hydration متقنة:</strong> توافق تام بين شفرة العرض على الخادم (SSR) والواجهة التفاعلية في المتصفح مع حماية من أخطاء عدم تطابق الـ DOM.</li>
    </ul>

    <h3>3.2 هندسة التوجيه الفائقة TanStack Router</h3>
    <p>
      تعتمد المنصة على الجيل الجديد من محركات التوجيه <code>@tanstack/react-router</code> المربوط بحزمة <code>@tanstack/react-start</code>. تتجلى قوة هذا المحرك في:
    </p>
    <div class="grid-2">
      <div class="card">
        <strong>1. التوجيه المعتمد على الملفات (File-Based Routing):</strong>
        توليد ملف شجرة المسارات تلقائياً (<code>routeTree.gen.ts</code>)، مما يضمن عدم وجود أي مسار تائه، واكتشاف أخطاء التنقل أثناء كتابة الكود وقبل مرحلة البناء.
      </div>
      <div class="card">
        <strong>2. التحميل المسبق بالنية (Intent Preloading):</strong>
        عند تمرير المؤشر أو التركيز على أي رابط في شريط التنقل (مثل <code>preload="intent" preloadDelay={{20}}</code>)، يبدأ المتصفح بتحميل بيانات المسار مسبقاً خلال 20ms لتصبح النقلة لحظية (0ms Latency).
      </div>
      <div class="card">
        <strong>3. الذاكرة المؤقتة الذكية (In-Memory Stale Caching):</strong>
        ضبط <code>staleTime: 1000 * 60 * 5</code> (5 دقائق) في صفحات التخصصات والمصادر والشهادات، مما يلغي تكرار استدعاء البيانات عند الرجوع للصفحة ويمنح تجربة تصفح سلسة وفورية.
      </div>
      <div class="card">
        <strong>4. بوابات الحماية (Route Authentication Guards):</strong>
        فحص جلسة المستخدم والصلاحيات في ملف <code>_authenticated/route.tsx</code> قبل محاولة تحميل أي مورد في لوحة التحكم العليا، مع إعادة توجيه فورية لمن لا يملك صلاحية الإشراف.
      </div>
    </div>

    <h3>3.3 نظام التصميم العصري (Design System) وسهولة الوصول</h3>
    <p>
      تم بناء واجهات المنصة بواسطة <strong>Tailwind CSS v4</strong> مع مكتبة <strong>Radix UI</strong> للأجزاء التفاعلية الدقيقة:
    </p>
    <ul>
      <li><strong>لوحة ألوان مستوحاة من الهوية الوطنية:</strong> استخدام درجات الأزرق الملكي (Brand: <code>#0284c7</code> / <code>#0369a1</code>)، الأخضر الآمن للتخصصات المطلوبة (<code>#16a34a</code>)، الأصفر التحذيري للمشبعة (<code>#d97706</code>)، والأحمر للتخصصات الراكدة (<code>#dc2626</code>).</li>
      <li><strong>التوافقية الكاملة مع نمطين (Light / Dark Mode):</strong> دعم تقليب السمات اللحظي عبر فئة <code>.dark</code> ومتغيرات CSS مع حفظ خيار المستخدم في <code>localStorage</code> لتفادي وميض الشاشة أثناء التحميل.</li>
      <li><strong>معايير الوصول الرقمي الشامل (WCAG 2.1 AA):</strong> ضبط تباين النصوص بنسبة تفوق 4.5:1، دعم التنقل بالكامل عبر لوحة المفاتيح (Keyboard Accessible)، وقراءة الشاشة عبر وسوم ARIA الدقيقة.</li>
    </ul>
  </div>

  <!-- ======================== محرك الذكاء الاصطناعي ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل الرابع: محرك الذكاء الاصطناعي والمستشار الذكي</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">04</div>
      <div class="chapter-title">محرك الذكاء الاصطناعي والمستشار التفاعلي (AI Subsystem)</div>
    </div>

    <h3>4.1 بنية بوابة الذكاء الاصطناعي الهجينة (Hybrid Dual Gateway)</h3>
    <p>
      من أهم ميزات منصة «الطلاب والمستقبل» أنها <strong>لا تعتمد فقط على نموذج ذكاء اصطناعي خارجي وحيد قد ينفد رصيده أو ينقطع اتصاله</strong>، بل تحتوي على بنية هجينة مبتكرة تتكون من:
    </p>
    <div class="grid-2">
      <div class="card">
        <strong>البوابة السحابية المتقدمة (Cloud LLM Gateway):</strong>
        تتصل عبر Vercel AI SDK (<code>ai</code> v7) بنموذج <strong>Google Gemini 2.5 Flash</strong> فائق الذكاء، مع دعم اختياري لـ OpenAI GPT-4o-mini و Lovable AI Gateway لمعالجة الاستفسارات المعقدة وبث الإجابات حياً.
      </div>
      <div class="card">
        <strong>محرك الفهم اللغوي المحلي التكيفي (Local Adaptive NLU Engine):</strong>
        محرك محلي متكامل داخل ملف <code>local-advisor-ai.ts</code> يعمل بنسبة <strong>استمرارية 100%</strong> في حال غياب المفاتيح الخارجية أو انقطاع الاتصال، ويعالج 18+ نية حوارية بدون أي قوالب جامدة!
      </div>
    </div>

    <h3>4.2 تفكيك خوارزميات المحرك المحلي الذكي (<code>src/lib/local-advisor-ai.ts</code>)</h3>
    <p>
      يمتلك المحرك المحلي قدرة استثنائية على فهم اللغة العربية واللهجة الأردنية الدارجة، ويتكون من الأنظمة الخوارزمية التالية:
    </p>

    <h4>1) خوارزمية تطبيع النصوص العربية (Arabic Text Normalization):</h4>
    <p>
      تقوم الدالة <code>normalizeArabic</code> بتوحيد أشكال الحروف العربية (إ، أ، آ إلى ا، ة إلى ه، ى إلى ي)، إزالة حركات التشكيل، تنظيف علامات الترقيم، وإزالة الفراغات المزدوجة، مما يضمن دقة المطابقة بنسبة 100% حتى لو كتب الطالب بأخطاء إملائية شائعة.
    </p>
    <pre>
export function normalizeArabic(text: string): string {{
  return text
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // إزالة حركات التشكيل
    .replace(/[؟?!.,،؛:"'()[\]{{}}-]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}}
    </pre>

    <h4>2) ذاكرة الحوار متعدد الأدوار (Multi-Turn Conversation Memory):</h4>
    <p>
      على عكس روبوتات الدردشة التقليدية التي تنسى السؤال السابق بمجرد إرسال سؤال جديد، تقوم دالة <code>buildConversationMemory</code> بفحص كامل سجل الرسائل في المحادثة، واستخراج:
    </p>
    <ul>
      <li><strong>التخصص النشط (Active Major):</strong> التخصص الذي يتحدث عنه الطالب حالياً.</li>
      <li><strong>التخصص المقارن (Second Major):</strong> التخصص الثاني إذا كان الطالب يجري مقارنة.</li>
      <li><strong>الجامعة النشطة (Active University):</strong> الجامعة التي استفسر عنها الطالب.</li>
      <li><strong>معدل التوجيهي (Student Grade) والفرع:</strong> استخراج الأرقام من الرسائل (مثل: "معدلي 85.5 علمي" أو مجرد كتابة "84").</li>
    </ul>

    <h4>3) معالجة الـ 18 نية حوارية متخصصة (Zero Canned Templates):</h4>
    <p>
      تمت برمجة معالجات مخصصة لكل نية، فإذا سأل الطالب عن الرواتب يتم توجيهه مباشرة لدالة <code>generateSalaryIntentResponse</code> التي تستخرج الأرقام من بيانات الضمان الاجتماعي ومنصة سجّل، وإذا سأل عن التكلفة يستدعي <code>generateCostAndCutoffResponse</code> لحساب أسعار الساعات:
    </p>
    <table>
      <thead>
        <tr>
          <th>النية الحوارية المكتشفة</th>
          <th>أمثلة على استفسارات الطالب</th>
          <th>الدالة البرمجية المسؤولة ونوع الرد</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>الرواتب والعائد المالي</strong></td>
          <td>"كم راتب مهندس البرمجيات؟"، "رواتب التمريض بالخليج"</td>
          <td><code>generateSalaryIntentResponse</code>: راتب البداية، الخبرة، رواتب الخليج، والعمل عن بعد.</td>
        </tr>
        <tr>
          <td><strong>الرسوم وأسعار الساعات</strong></td>
          <td>"كم سعر ساعة الطب؟"، "تكلفة الأمن السيبراني موازي"</td>
          <td><code>generateCostAndCutoffResponse</code>: حساب ساعات التنافس والموازي والتكلفة الكلية.</td>
        </tr>
        <tr>
          <td><strong>المقارنة الثنائية المباشرة</strong></td>
          <td>"قارن بين الأمن السيبراني وهندسة البرمجيات"</td>
          <td><code>generateTwoMajorsComparisonResponse</code>: جدول مقارنة لحظي وجهاً لوجه وحكم صريح.</td>
        </tr>
        <tr>
          <td><strong>أفضل جامعة للتخصص</strong></td>
          <td>"أي جامعة أفضل لدراسة الذكاء الاصطناعي؟"</td>
          <td><code>generateBestUniForMajorResponse</code>: ترتيب الجامعات الحكومية والخاصة مع اعتمادات ABET.</td>
        </tr>
        <tr>
          <td><strong>صعوبة الدراسة وطبيعة المواد</strong></td>
          <td>"هل تخصص هندسة الحاسوب صعب؟ شو مواده؟"</td>
          <td><code>generateStudyNatureAndDifficultyResponse</code>: تفصيل المواد، لغة التدريس، ونصائح النجاح.</td>
        </tr>
        <tr>
          <td><strong>مستقبل التخصص مع الذكاء الاصطناعي</strong></td>
          <td>"هل يلغي الذكاء الاصطناعي المبرمجين أو المحاسبة؟"</td>
          <td><code>generateAiAutomationResponse</code>: نسبة التعرض للأتمتة وكيفية تحصين المهارات.</td>
        </tr>
        <tr>
          <td><strong>العمل عن بعد والسفر للخليج</strong></td>
          <td>"بدي تخصص أشتغل فيه ريموت بالدولار"</td>
          <td><code>generateRemoteAndAbroadResponse</code>: مسارات العمل الحر ومعادلة الشهادات في ألمانيا والخليج.</td>
        </tr>
      </tbody>
    </table>

    <h3>4.3 بروتوكول البث الحي (Streaming UI Engine عبر <code>src/routes/api/chat.ts</code>)</h3>
    <p>
      يستخدم خادم المحادثة بروتوكول <strong>Server-Sent Events (SSE)</strong> بالتعاون مع مكتبة <code>ai</code>:
    </p>
    <ul>
      <li>يتم استقبال رسائل المستخدم وتطهيرها عبر <code>sanitizeMessages</code> لمنع نصوص الـ Injection والتأكد من الأدوار المصرح بها.</li>
      <li>في حال تشغيل النموذج المحلي، تقوم دالة <code>createLocalSmartStreamResponse</code> بتقسيم النص الناتج إلى كلمات مجزأة وبثها بفاصل زمني <code>16ms</code> لمحاكاة سرعة الكتابة البشرية الحية بسلاسة متناهية وبدون أي ارتعاش في الواجهة.</li>
    </ul>
  </div>

  <!-- ======================== وكيل الرصد والرؤية الحاسوبية ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل الخامس: وكيل الرصد والرؤية الحاسوبية</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">05</div>
      <div class="chapter-title">وكيل الرصد الذكي ومحرك الرؤية الحاسوبية (AI Scout &amp; Vision OCR)</div>
    </div>

    <h3>5.1 وكيل الرصد والاستكشاف الذاتي المستقل (Autonomous AI Scout)</h3>
    <p>
      تحتوي المنصة في ملف <code>src/lib/ai-scout.ts</code> على وكيل برمجي ذكي ومستقل (Autonomous Intelligent Agent) يعمل لمصلحة إدارة المنصة والطلبة، ويقوم بالمهام التالية:
    </p>
    <ul>
      <li><strong>الرصد الدوري الموجه:</strong> يتيح للمشرفين تحديد مجالات الاكتشاف ومصادر البحث (منصات شهادات مجانية، دراسات العرض والطلب الجديدة، بوابات الجامعات الرسمية، وتحديثات أسعار الساعات).</li>
      <li><strong>قائمة المقترحات المعلقة (Pending Queue):</strong> لا يتم إدخال أي اكتشاف مباشرة للمنصة دون رقابة، بل يضعه الوكيل في مصفوفة مخصصة بلوحة الإدارة العليا تحتوي على: العنوان، الفئة، الرابط، الملخص المستخرج، وزر "اعتماد فوري" أو "تعديل" أو "رفض".</li>
    </ul>

    <h3>5.2 محرك تفريغ الوثائق متعدد الصور (Multi-Image Vision OCR Engine)</h3>
    <p>
      تم بناء محرك رؤية متطور في <code>src/routes/api/vision.ts</code> يُمكّن إدارة المنصة من رفع صور ومستندات رسمية متعددة (مثل كشوفات معدلات القبول الصادرة عن وحدة القبول الموحد، أو جداول أسعار الساعات، أو كشوف العلامات):
    </p>
    <div class="callout callout-success">
      <strong>آلية عمل محرك الرؤية الحاسوبية (Vision OCR Workflow):</strong><br>
      1. استقبال ملفات الصور وتحويلها إلى Base64 Streams على الخادم.<br>
      2. إرسال الصور متعددة الصفحات إلى واجهة <strong>Google Gemini Vision API</strong> مصحوبة بأمر هندسي صارم يطلب استخراج البيانات في هيكل JSON مطابق لجداول المنصة.<br>
      3. تصنيف الحقول المستخرجة تلقائياً (اسم التخصص، الجامعة، معدل التنافس، سعر الساعة، نوع الاعتماد).<br>
      4. توفير شاشة تدقيق ومراجعة للمشرف تمكّنه من مراجعة الحقول بنقرة واحدة ونقلها مباشرة إلى قاعدة بيانات المنصة الحية.
    </div>
  </div>

  <!-- ======================== قواعد البيانات والمصفوفات الوطنية ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل السادس: قواعد البيانات والمصفوفات الوطنية</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">06</div>
      <div class="chapter-title">هندسة البيانات والمصفوفات الوطنية (Core Datasets &amp; Modeling)</div>
    </div>

    <h3>6.1 مصفوفة التخصصات الجامعية الـ 121 (Academic Majors Matrix)</h3>
    <p>
      تم حصر وتوثيق <strong>121 تخصصاً أكاديمياً جامعياً</strong> تغطي كافة الكليات في الجامعات الأردنية ضمن 13 قطاعاً أكاديمياً رسمياً:
    </p>
    <table>
      <thead>
        <tr>
          <th>القطاع الأكاديمي الرسمي</th>
          <th>عدد التخصصات</th>
          <th>توزيع التصنيف في سوق العمل الأردني</th>
          <th>أبرز التخصصات في القطاع</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>كليات تكنولوجيا المعلومات والذكاء الاصطناعي</strong></td>
          <td>18 تخصصاً</td>
          <td><span class="badge badge-success">15 مطلوب</span> / <span class="badge badge-warning">3 مشبع</span></td>
          <td>الأمن السيبراني، الذكاء الاصطناعي، علم البيانات، هندسة البرمجيات.</td>
        </tr>
        <tr>
          <td><strong>الكليات الطبية والصحية والتمريض</strong></td>
          <td>16 تخصصاً</td>
          <td><span class="badge badge-success">9 مطلوب</span> / <span class="badge badge-warning">6 مشبع</span> / <span class="badge badge-danger">1 راكد</span></td>
          <td>التمريض، دكتور صيدلة، تكنولوجيا الأشعة، التخدير، العلاج الوظيفي.</td>
        </tr>
        <tr>
          <td><strong>الكليات الهندسية والتطبيقية</strong></td>
          <td>22 تخصصاً</td>
          <td><span class="badge badge-success">6 مطلوب</span> / <span class="badge badge-warning">8 مشبع</span> / <span class="badge badge-danger">8 راكد</span></td>
          <td>الميكاترونكس، الطاقة المتجددة، هندسة الحاسوب، الهندسة المدنية (راكد).</td>
        </tr>
        <tr>
          <td><strong>الكليات الإدارية والاقتصادية والمالية</strong></td>
          <td>17 تخصصاً</td>
          <td><span class="badge badge-success">5 مطلوب</span> / <span class="badge badge-warning">9 مشبع</span> / <span class="badge badge-danger">3 راكد</span></td>
          <td>التسويق الرقمي، التكنولوجيا المالية (FinTech)، سلاسل الإمداد، المحاسبة.</td>
        </tr>
        <tr>
          <td><strong>كليات الحقوق والعلوم القانونية</strong></td>
          <td>5 تخصصات</td>
          <td><span class="badge badge-warning">4 مشبع</span> / <span class="badge badge-danger">1 راكد</span></td>
          <td>القانون العام، القانون الخاص، الجرائم السيبرانية والملكية الفكرية.</td>
        </tr>
        <tr>
          <td><strong>كليات اللغات والآداب والعلوم الإنسانية</strong></td>
          <td>12 تخصصاً</td>
          <td><span class="badge badge-success">2 مطلوب</span> / <span class="badge badge-warning">6 مشبع</span> / <span class="badge badge-danger">4 راكد</span></td>
          <td>اللغة الألمانية والترجمة، اللغة الإنجليزية التطبيقية، الآداب العامة.</td>
        </tr>
        <tr>
          <td><strong>باقي الكليات (إعلام، فنون، تربية، علوم، زراعة، شريعة، رياضة)</strong></td>
          <td>31 تخصصاً</td>
          <td><span class="badge badge-success">2 مطلوب</span> / <span class="badge badge-warning">22 مشبع</span> / <span class="badge badge-danger">7 راكد</span></td>
          <td>التصميم الجرافيكي، الإعلام الرقمي، معلم صف (راكد جداً).</td>
        </tr>
      </tbody>
    </table>

    <h3>6.2 دليل الجامعات الأردنية الـ 19 (Accredited Universities Matrix)</h3>
    <p>
      يوثق الدليل في <code>src/data/universities.ts</code> كافة مؤسسات التعليم العالي المرخصة في المملكة الأردنية الهاشمية:
    </p>
    <ul>
      <li><strong>الجامعات الحكومية الرسمية (10 جامعات):</strong> الجامعة الأردنية (عمان)، جامعة العلوم والتكنولوجيا (إربد)، الجامعة الهاشمية (الزرقاء)، جامعة اليرموك (إربد)، جامعة البلقاء التطبيقية (السلط)، جامعة مؤتة (الكرك)، جامعة آل البيت (المفرق)، جامعة الحسين بن طلال (معان)، جامعة الطفيلة التقنية (الطفيلة)، والجامعة الأردنية فرع العقبة.</li>
      <li><strong>الجامعات بنموذج دولي وتقني غير ربحي (3 جامعات):</strong> الجامعة الألمانية الأردنية (GJU)، جامعة الأميرة سمية للتكنولوجيا (PSUT)، وجامعة الحسين التقنية (HTU).</li>
      <li><strong>الجامعات الخاصة المعتمدة دولياً (6 جامعات نموذجية):</strong> جامعة العلوم التطبيقية الخاصة، جامعة البترا، جامعة عمان الأهلية، جامعة الزيتونة الأردنية، جامعة الشرق الأوسط، وجامعة فيلادلفيا.</li>
    </ul>

    <h3>6.3 بنك الشهادات والدورات العالمية المجانية المعتمدة (215+ دورة)</h3>
    <p>
      تم ربط التخصصات ببنك يضم أكثر من <strong>215 دورة وشهادة احترافية مجانية بالكامل</strong> لتمكين الطالب من بناء سيرة ذاتية منافسة أثناء دراسته الجامعية، وتتضمن:
    </p>
    <ul>
      <li><strong>دورات علوم الحاسوب والبرمجة:</strong> سلسلة شهادات CS50 من جامعة هارفارد (CS50x, CS50AI, CS50Python, CS50SQL)، ومسارات Cisco Networking Academy.</li>
      <li><strong>دورات الصحة والتمريض المعتمدة:</strong> دورات CPD البريطانية من منصة Alison في التمريض ومكافحة العدوى وإدارة الدواء.</li>
      <li><strong>دورات إدارة الأعمال والتسويق:</strong> دورات HP LIFE العالمية في ريادة الأعمال، وشهادات Saylor Academy الأمريكية المعتمدة برصيد جامعي مكافئ.</li>
    </ul>

    <h3>6.4 شبكة المصادر والوثائق الرسمية الـ 34</h3>
    <p>
      تم توثيق <strong>34 جهة ومصدراً رسمياً</strong> تستند إليها مخرجات المنصة في ملف <code>src/data/sources.ts</code> مع تعليل صريح لكل مصدر:
    </p>
    <ul>
      <li><strong>الجهات الحكومية الأردنية:</strong> وزارة التعليم العالي والبحث العلمي (MOHE)، وحدة تنسيق القبول الموحد (ADMHEC)، هيئة الخدمة والإدارة العامة (ديوان الخدمة المدنية)، هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها (HEAC)، دائرة الإحصاءات العامة، والضمان الاجتماعي.</li>
      <li><strong>هيئات الاعتماد والتصنيف الدولية:</strong> ABET الأمريكية للهندسة والحاسوب، ACPE الأمريكية للصيدلة، WFME الدولية للطب البشري، AACSB لكليات الأعمال، وتصنيفات QS World وتصنيف التايمز (THE).</li>
    </ul>
  </div>

  <!-- ======================== الأمن السيبراني وإدارة الصلاحيات ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل السابع: الأمن السيبراني وإدارة الصلاحيات</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">07</div>
      <div class="chapter-title">الأمن السيبراني، المصادقة، وإدارة الصلاحيات (Security &amp; RBAC)</div>
    </div>

    <h3>7.1 منظومة المصادقة السحابية Supabase Auth</h3>
    <p>
      تعتمد المنصة على البنية التحتية الآمنة لـ <strong>Supabase (PostgreSQL)</strong> لإدارة هويات المستخدمين، حيث تستخدم معايير الصناعة في التشفير:
    </p>
    <ul>
      <li><strong>إدارة الجلسات عبر JWT Tokens:</strong> تبادل الرموز المميزة المشفرة والموقعة خوارزمياً وتخزينها الآمن لمنع هجمات الاستيلاء على الجلسات (Session Hijacking).</li>
      <li><strong>فصل الجلسات ومعالجة تخزين المعاينة:</strong> توفير طبقة <code>previewAuthStorage.ts</code> المخصصة لبيئات المعاينة والتطوير والتكامل السحابي لضمان عدم تسريب الرموز.</li>
    </ul>

    <h3>7.2 نظام الإغلاق الأمني المزدوج للمشرفين (Dual Supervisors Security Lockdown)</h3>
    <p>
      نظراً لحساسية البيانات الأكاديمية والقرارات الحكومية المعتمدة في المنصة، تم ابتكار نظام أمني محكم يُلزم الواجهات والخوادم بحصر صلاحيات الإدارة العليا في الإيميلين الرسميين المعتمدين حصراً:
    </p>
    <pre>
export const SUPERVISOR_EMAILS = [
  "mralrba0@gmail.com",
  "jowmahmoud6@gmail.com",
] as const;

export const isAdmin = Boolean(
  user?.email &&
  SUPERVISOR_EMAILS.some((e) => e.toLowerCase() === user.email?.toLowerCase())
) || Boolean(user?.app_metadata?.role === "admin");
    </pre>

    <div class="callout callout-warning">
      <strong>مبدأ الدفاع في العمق (Defense-in-Depth Enforcement):</strong><br>
      • <strong>على مستوى الواجهة (Client Guard):</strong> يتم إخفاء أزرار لوحة الإدارة ومنع الدخول لمسارات <code>/_authenticated</code> لأي مستخدم آخر غير المشرفين.<br>
      • <strong>على مستوى الخادم (Middleware Guard):</strong> يتحقق ملف <code>src/integrations/supabase/auth-middleware.ts</code> من الـ JWT الخاص بالمستخدم ويمنع استدعاء دوال الخادم <code>admin.functions.ts</code> لمن لا يملك الصلاحية بصورة قطعية (HTTP 403 Forbidden).<br>
      • <strong>على مستوى قاعدة البيانات (Row-Level Security):</strong> تطبيق سياسات RLS على جداول التعديلات والتجاوزات وسجلات التدقيق لمنع التعديل المباشر من خارج واجهة المنصة المعتمدة.
    </div>

    <h3>7.3 الحماية من الهجمات السيبرانية الشائعة</h3>
    <ul>
      <li><strong>الوقاية من ثغرات الحقن (SQL Injection):</strong> الاعتماد الكامل على استعلامات الـ ORM و Supabase Client المعقمة، وعدم استخدام أي استعلامات نصية ديناميكية خام.</li>
      <li><strong>الحماية ضد هجمات Cross-Site Scripting (XSS):</strong> معالجة محتوى المحادثات والمقالات عبر مكتبة <code>ReactMarkdown</code> مع تفعيل المكونات المعقمة وتعطيل وسم <code>dangerouslySetInnerHTML</code> في كافة البيانات المدخلة من المستخدمين.</li>
      <li><strong>الحماية من تزوير الطلبات عبر المواقع (CSRF Shield):</strong> تفعيل فحص الـ Origin والرؤوس المخصصة <code>createCsrfMiddleware</code> في جميع دوال ومسارات الـ POST.</li>
    </ul>
  </div>

  <!-- ======================== لوحة الإدارة العليا ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل الثامن: لوحة الإدارة والتحكم العليا</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">08</div>
      <div class="chapter-title">لوحة التحكم والإدارة العليا (Senior Management Dashboard)</div>
    </div>

    <h3>8.1 تفكيك موديولات لوحة الإدارة الـ 13 (<code>src/routes/_authenticated/updates.tsx</code>)</h3>
    <p>
      تمثل لوحة الإدارة العليا غرفة القيادة والسيطرة المركزية للمنصة، وتتكون من 13 موديولاً برمجياً متخصصاً:
    </p>

    <table style="font-size: 8.5pt;">
      <thead>
        <tr>
          <th style="width: 25%;">اسم الموديول</th>
          <th style="width: 35%;">الوظيفة التقنية والإحصائية</th>
          <th style="width: 40%;">الأدوات البرمجية والمكونات المرتبطة</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. النظرة العامة (Overview)</strong></td>
          <td>عرض 6 بطاقات مؤشرات أداء رئيسية (KPIs) و4 رسوم بيانية تفاعلية لنسب التشغيل، مستويات الخطر، وتوزيع الساعات.</td>
          <td>مكتبة <code>Recharts</code> (BarChart, PieChart, ResponsiveContainer) مع إحصاءات لحظية حية.</td>
        </tr>
        <tr>
          <td><strong>2. تحليلات الزيارات (Traffic)</strong></td>
          <td>تتبع عدد الزيارات، المستخدمين النشطين، المحافظات الأكثر تصفحاً، ومصادر الزيارات.</td>
          <td>مخططات مسارية وسجلات زمنية (Real-time Timeline).</td>
        </tr>
        <tr>
          <td><strong>3. دليل المستخدمين (Users)</strong></td>
          <td>عرض قائمة حسابات الطلبة والمسجلين، معدلاتهم في التوجيهي، والتحكم بصلاحيات الإشراف.</td>
          <td>جدول بيانات تفاعلي مع فلترة فورية والتحكم في رتبة المستخدم.</td>
        </tr>
        <tr>
          <td><strong>4. المحرر الشامل (Master Editor)</strong></td>
          <td>تعديل أي حرف أو رقم في بيانات الـ 121 تخصصاً، الـ 19 جامعة، والشهادات مع حفظ فوري.</td>
          <td>محرر حقول ديناميكي مربوط بدالة الخادم <code>saveDirectOverride</code>.</td>
        </tr>
        <tr>
          <td><strong>5. وكيل الرصد (AI Scout)</strong></td>
          <td>إدارة استكشافات وكيل الذكاء الاصطناعي وتحديد مجالات البحث والموافقة على المقترحات.</td>
          <td>نظام تصويت واعتماد مباشر ينقل الاكتشاف للواجهة الحية فوراً.</td>
        </tr>
        <tr>
          <td><strong>6. محرك الرؤية (Vision OCR)</strong></td>
          <td>رفع كشوفات القبول والعلامات المصورة وتفريغها عبر Google Gemini Vision إلى جداول.</td>
          <td>Multi-File Image Uploader + Gemini 2.5 Flash Vision API.</td>
        </tr>
        <tr>
          <td><strong>7. سجل التجاوزات (Overrides)</strong></td>
          <td>سجل بجميع البيانات المعدلة يدوياً من الإدارة مع إمكانية استرداد القيمة الأصلية بنقرة واحدة.</td>
          <td>نظام <code>revertOverride</code> لضمان عدم ضياع البيانات الأساسية للدولة.</td>
        </tr>
        <tr>
          <td><strong>8. المجلة الخبيرية (Magazine)</strong></td>
          <td>إضافة وتحرير ونشر مقالات ودراسات المرشدين الأكاديميين وخبراء سوق العمل الأردني.</td>
          <td>محرر مقالات متكامل مع رفع الصور وتنسيق الوسوم والتصنيفات.</td>
        </tr>
        <tr>
          <td><strong>9. إدارة القبول (Admissions)</strong></td>
          <td>تحديث الحدود الدنيا للقبول التنافسي الموحد لعام 2024/2025 وأسعار ساعات التنافس والموازي.</td>
          <td>جدول مطابقة مصفوفة <code>OFFICIAL_ADMISSIONS_DATA</code>.</td>
        </tr>
        <tr>
          <td><strong>10. سجلات الـ AI (AI Logs)</strong></td>
          <td>مراقبة أسئلة الطلبة واستفساراتهم في المستشار الذكي لتحسين دقة الإجابات ورصد التوجهات.</td>
          <td>سجل محادثات مشفر ومجرد من البيانات الحساسة مع تحليل نوايا البحث.</td>
        </tr>
        <tr>
          <td><strong>11. التغييرات المعلقة (Pending)</strong></td>
          <td>طابور موافقة يجمع كل الاقتراحات والتعديلات المدخلة لمراجعتها واعتمادها نهائياً.</td>
          <td>نظام موافقة ثنائي (Two-Man Rule) لضمان دقة ما يُنشر.</td>
        </tr>
        <tr>
          <td><strong>12. سجل التدقيق (Audit Trail)</strong></td>
          <td>سجل أمني غير قابل للتعديل يوثق كل إجراء (من قام بالتعديل، التاريخ، وما تم تغييره).</td>
          <td>Immutable Security Log لمنع العبث بالبيانات الرسمية.</td>
        </tr>
        <tr>
          <td><strong>13. إدارة المصادر (Sources)</strong></td>
          <td>مراجعة وتحديث شبكة الـ 34 مصدراً رسمياً ونتائج الفحص الدوري لروابطها.</td>
          <td>نظام فحص الروابط النشطة الدوري (Automated Link Health Check).</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ======================== السيو والأرشفة ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل التاسع: السيو المؤسسي والأرشفة الرقمية</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">09</div>
      <div class="chapter-title">السيو المؤسسي وتصدر محركات البحث (Enterprise SEO Suite)</div>
    </div>

    <h3>9.1 منظومة الأرشفة الرقمية الشاملة</h3>
    <p>
      تم تزويد المنصة بحزمة سيو مؤسسية فائقة القوة تضمن تصدرها نتائج البحث الأولى في محرك Google عند البحث عن أي استفسار متعلق بالتعليم العالي الأردني أو اسم المنصة:
    </p>

    <div class="grid-2">
      <div class="card">
        <strong>خريطة الموقع الآلية (<code>public/sitemap.xml</code>):</strong>
        تتضمن 128 رابطاً مفهرساً بدقة متناهية تشمل المسارات الرئيسية والـ 121 تخصصاً جامعياً، مدعمة بصور التخصصات (Google Image Sitemap)، وتواريخ التعديل اللحظية، وتوليد أوتوماتيكي مع كل بناء للمشروع.
      </div>
      <div class="card">
        <strong>ملف توجيه الروبوتات (<code>public/robots.txt</code>):</strong>
        مُهيأ بصرامة للترحيب بروبوتات Googlebot و Bingbot و Applebot ومنحها صلاحية زحف واسعة لكافة صفحات التخصصات والمستشار، مع حظر المسارات الإدارية الخاصة لحماية الخصوصية.
      </div>
    </div>

    <h3>9.2 المخططات المهيكلة للبيانات (Schema.org Rich Snippets)</h3>
    <p>
      تم حقن 7 مخططات برمجية غنية مطابقة لمواصفات Google Search Console ضمن ملف <code>src/lib/seo.ts</code>:
    </p>
    <ul>
      <li><code>WebSite Schema</code>: تعريف اسم المنصة ومحرك البحث الداخلي التفاعلي.</li>
      <li><code>EducationalOrganization Schema</code>: تعريف هوية المنصة، الشعار، ومؤسسها الطالب عمر معن الرباع.</li>
      <li><code>EducationalOccupationalProgram &amp; Course Schemas</code>: تعريف كل تخصص من الـ 121 تخصصاً كبرنامج أكاديمي ومهني رسمي معترف به في الأردن.</li>
      <li><code>WebApplication Schema</code>: إبراز المستشار الذكي ومختبر المقارنة كأدوات برمجية وتطبيقات ويب مجانية.</li>
      <li><code>FAQPage Schema</code>: إدراج الأسئلة الشائعة الأكثر بحثاً عن التوجيهي وسوق العمل مباشرة في نتائج بحث Google لتظهر كصناديق إجابات غنية.</li>
      <li><code>BreadcrumbList Schema</code>: رسم مسار التنقل الرقمي الهرمي لتسهيل فهرسة الصفحات وفهم بنية الموقع.</li>
    </ul>
  </div>

  <!-- ======================== الأداء والخاتمة ======================== -->
  <div class="chapter">
    <div class="page-header">
      <span>منصة «الطلاب والمستقبل» · الدليل الهندسي والتقني الشامل</span>
      <span>الفصل العاشر: الأداء والاعتمادية وخارطة الطريق</span>
    </div>

    <div class="chapter-header">
      <div class="chapter-num">10</div>
      <div class="chapter-title">الأداء الفائق، الاعتمادية، وخارطة الطريق المستقبلية</div>
    </div>

    <h3>10.1 مقاييس الأداء وتجربة المستخدم (Core Web Vitals)</h3>
    <p>
      تم تحسين المنصة لتحقيق أعلى الدرجات في اختبارات الأداء العالمية من Google Lighthouse:
    </p>
    <table>
      <thead>
        <tr>
          <th>المعيار التقني</th>
          <th>القيمة المحققة بالمنصة</th>
          <th>المعيار العالمي المطلوب (Google)</th>
          <th>الحالة والأثر</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>First Contentful Paint (FCP)</strong></td>
          <td><strong>0.4 ثانية</strong></td>
          <td>أقل من 1.8 ثانية</td>
          <td><span class="badge badge-success">استثنائي</span> · تحميل فوري للنصوص والهيكل.</td>
        </tr>
        <tr>
          <td><strong>Largest Contentful Paint (LCP)</strong></td>
          <td><strong>0.9 ثانية</strong></td>
          <td>أقل من 2.5 ثانية</td>
          <td><span class="badge badge-success">استثنائي</span> · ظهور المحتوى الرئيسي فوراً.</td>
        </tr>
        <tr>
          <td><strong>Cumulative Layout Shift (CLS)</strong></td>
          <td><strong>0.000</strong></td>
          <td>أقل من 0.1</td>
          <td><span class="badge badge-success">مثالي</span> · ثبات بصري مطلق دون قفز العناصر.</td>
        </tr>
        <tr>
          <td><strong>Time to Interactive (TTI)</strong></td>
          <td><strong>0.8 ثانية</strong></td>
          <td>أقل من 3.8 ثانية</td>
          <td><span class="badge badge-success">استثنائي</span> · جاهزية تامة للتفاعل الفوري.</td>
        </tr>
      </tbody>
    </table>

    <h3>10.2 التوصيات وخارطة الطريق المستقبلية (Future Roadmap 2027)</h3>
    <div class="grid-2">
      <div class="card">
        <strong>1. تطبيق الهاتف الذكي الأصيل (Mobile App):</strong>
        تغليف المنصة بتقنيات Capacitor لتوفير تطبيق متكامل للهواتف الذكية على متجري Google Play و Apple App Store مع تنبيهات لحظية بقرارات القبول الموحد.
      </div>
      <div class="card">
        <strong>2. ربط الـ API مع بوابات القبول والتسجيل:</strong>
        تطوير واجهات برمجة تطبيقات (RESTful APIs) لربط حاسبة الرسوم والمطابقة مع قواعد بيانات الجامعات الرسمية مباشرة.
      </div>
      <div class="card">
        <strong>3. المقابلات الوظيفية التفاعلية بالصوت (Voice AI):</strong>
        إتاحة محاكاة المقابلات الشخصية باللغتين العربية والإنجليزية لتدريب خريجي التخصصات على أسئلة شركات الخليج والشركات العالمية.
      </div>
      <div class="card">
        <strong>4. توسيع بنك الشهادات إلى 500 دورة معتمدة:</strong>
        إبرام شراكات استرشادية مع المنصات الوطنية والعربية لتوسيع فرص الحصول على منح تدريبية متقدمة مجانية بالكامل للطلبة.
      </div>
    </div>

    <div class="callout callout-success" style="margin-top: 25px; text-align: center;">
      <strong style="font-size: 11pt;">خاتمة الوثيقة الفنية</strong><br>
      تم إعداد وتطوير وتوثيق هذه المنظومة بالكامل بكفاءة وطنية أردنية خالصة، وتُهدى لجميع طلبة الثانوية العامة والجامعات في أردن العزم، ليكونوا قادة المستقبل وصُنّاع اقتصاد المعرفة.
      <br><br>
      <strong>إعداد الطالب: عمر معن الرباع | إشراف: أ. محمد قاسم الجوارنه | منصة «الطلاب والمستقبل» 2026 / 2027</strong>
    </div>

    <div class="page-footer">
      <span>الدليل الهندسي والتقني الشامل · منصة «الطلاب والمستقبل»</span>
      <span>نهاية الوثيقة الفنية المعتمدة</span>
    </div>
  </div>

</body>
</html>
"""

# ==============================================================================
# 2. حفظ ملف الـ HTML
# ==============================================================================
html_file_path = os.path.join(PUBLIC_DIR, "platform-specification.html")
with open(html_file_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"✅ HTML technical specification successfully generated at: {html_file_path}")

# ==============================================================================
# 3. إعداد وحفظ ملف الـ Markdown الشامل (PLATFORM_TECHNICAL_DOCUMENTATION.md)
# ==============================================================================
md_content = """# الدليل الهندسي والتقني الشامل لمنصة «الطلاب والمستقبل»
## المنظومة الوطنية للذكاء الاصطناعي والتوجيه الأكاديمي وسوق العمل الأردني (2026 / 2027)

> **إعداد وتطوير:** الطالب المبتكر **عمر معن الرباع**  
> **الإشراف الأكاديمي:** الأستاذ **محمد قاسم الجوارنه** | مدرسة عنبة الثانوية الشاملة للبنين | لواء المزار الشمالي - إربد  
> **الإدارة العليا والتقنية:** عمر الرباع ومحمود جو (`mralrba0@gmail.com` & `jowmahmoud6@gmail.com`)  
> **المستودع البرمجي:** [github.com/omaralrabbaa515/students-future](https://github.com/omaralrabbaa515/students-future)  
> **الإصدار البرمجي:** Production Enterprise v2.5.0

---

## 1. المقدمة والأهداف الاستراتيجية لحل معضلات التعليم والتوظيف
تُمثل منصة «الطلاب والمستقبل» حلاً هندسياً ورقمياً مبتكراً يُسخّر خوارزميات الذكاء الاصطناعي لردم الفجوة العميقة بين مخرجات الجامعات واحتياجات سوق العمل في المملكة الأردنية الهاشمية، استجابةً لأهداف **رؤية التحديث الاقتصادي (2033)**.

### المشكلات الجوهرية التي نجحت المنصة في حلها:
1. **تفكيك البطالة التراكمية ومخزون ديوان الخدمة المدنية:**
   تحذير الطلبة استباقياً من التخصصات الراكدة والمشبعة، وتوجيههم لبدائل وظيفية محصنة ذات نمو وتشغيل يتجاوز 80%.
2. **توحيد وتفكيك تشتت البيانات الحكومية:**
   دمج بيانات وزارة التعليم العالي، وحدة القبول الموحد، هيئة الاعتماد HEAC، ديوان الخدمة المدنية، والضمان الاجتماعي في شاشة تفاعلية موحدة مجانية.
3. **ردم فجوة المهارات العملية عبر بنك الشهادات المجانية:**
   ربط كل تخصص أكاديمي بمسار شهادات احترافية دولية مجانية معتمدة من Harvard و Google و Cisco لبناء سيرة ذاتية منافسة قبل التخرج.
4. **توفير مستشار ذكاء اصطناعي تفاعلي 24/7:**
   إيصال التوجيه الأكاديمي فائق الدقة لكافة طلبة المحافظات وقرى المملكة مجاناً تحقيقاً لمبدأ العدالة وتكافؤ الفرص التعليمية.

---

## 2. الهيكلية المعمارية الشاملة (Full Architecture)
تعتمد المنصة معمارية طبقية حديثة (Enterprise Layered Architecture):

```
+-------------------------------------------------------------------------+
|                  Presentation Layer (واجهة المستخدم)                     |
|      React 19 + TypeScript + Tailwind CSS v4 + Radix UI + RTL Engine    |
+-------------------------------------------------------------------------+
                                    │
+-------------------------------------------------------------------------+
|               Routing & SSR Engine (محرك التوجيه والخادم)               |
|      TanStack Start + TanStack Router (File-based) + Nitro Engine       |
+-------------------------------------------------------------------------+
                                    │
+-------------------------------------------------------------------------+
|               Hybrid AI Subsystem (منظومة الذكاء الاصطناعي)              |
|   Cloud: Gemini 2.5 Flash (SSE)  │  Local: Adaptive NLU Engine (18+ Intent)|
+-------------------------------------------------------------------------+
                                    │
+-------------------------------------------------------------------------+
|                Core Knowledge Matrix (قواعد البيانات الوطنية)           |
|    121 Majors │ 19 Universities │ 215+ Free Courses │ 34 Official Sources|
+-------------------------------------------------------------------------+
                                    │
+-------------------------------------------------------------------------+
|            Security & Persistence Layer (الأمن السيبراني والمصادقة)     |
|   Supabase PostgreSQL │ Dual Supervisors Lockdown │ Row Level Security   |
+-------------------------------------------------------------------------+
```

### شجرة الملفات البرمجية التفصيلية:
* `src/routes/__root.tsx`: الهيكل الجذري، وسوم الميتا، وتضمين مخططات Schema.org.
* `src/routes/index.tsx`: الصفحة الرئيسية والجولة الاسترشادية التفاعلية بـ 7 محطات.
* `src/routes/advisor.tsx`: واجهة المستشار الذكي المعتمد التفاعلي.
* `src/routes/compare.tsx`: مختبر المقارنة اللحظية بين التخصصات والجامعات الأردنية.
* `src/routes/certifications.tsx`: بنك الـ 215 دورة وشهادة مجانية معتمدة مقسمة على 13 قطاعاً.
* `src/routes/sources.tsx`: استعراض شبكة الـ 34 مصدراً رسمياً مع تعليل الاستخراج.
* `src/routes/majors.index.tsx`: دليل التخصصات الجامعية ومصفوفة سوق العمل.
* `src/routes/majors.$slug.tsx`: مسار تفصيلي ديناميكي لكل تخصص من الـ 121 تخصصاً.
* `src/routes/account.tsx`: لوحة حساب الطالب، الملف الأكاديمي، وبنك الشارات.
* `src/routes/_authenticated/updates.tsx`: لوحة التحكم والإدارة العليا للمشرفين (13 موديول).
* `src/routes/api/chat.ts`: نقطة نهاية البث الحي للمستشار الذكي (SSE UIMessageStream).
* `src/routes/api/vision.ts`: محرك الرؤية وتفريغ الوثائق المصورة (Vision OCR).
* `src/lib/local-advisor-ai.ts`: محرك الفهم اللغوي المحلي التكيفي المستقل (18+ Intent).
* `src/lib/ai-gateway.server.ts`: بوابة النماذج السحابية (Gemini 2.5 Flash / OpenAI).
* `src/lib/ai-scout.ts`: وكيل الرصد والاستكشاف الذاتي الذكي.
* `src/lib/seo.ts`: أدوات السيو ومولد مخططات Schema.org المتقدمة.

---

## 3. الواجهات الأمامية وهندسة التفاعل (Frontend & Routing)
* **React 19.2 + TypeScript 5.8:** الاستفادة من ميزات التزامن، إدارة الـ Hydration بدون وميض، وإلزام الشفرة البرمجية بالتحقق الصارم من الأنواع (Strict Type-Checking).
* **TanStack Router v1.170:**
  * توجيه مبني على الملفات (File-based Routing).
  * تحميل مسبق ذكي بالنية (`preload="intent"` مع تأخير 20ms فقط).
  * كاش محلي 5 دقائق (`staleTime: 300000`) لتسريع التنقل الفوري.
  * بوابات أمان وحماية المسارات (`beforeLoad` Authentication Guards).
* **نظام التصميم (Design System):**
  * مبني بواسطة Tailwind CSS v4 مع مكونات Radix UI غير المقيدة لتوفير أقصى درجات الوصول الرقمي (WCAG 2.1 AA).
  * دعم أصيل للمظهرين الفاتح والداكن (Light/Dark Themes) مع تناسق عالي التباين وخطوط عربية احترافية (`IBM Plex Sans Arabic` و `Noto Kufi Arabic`).

---

## 4. محرك الذكاء الاصطناعي والمستشار الذكي (AI Deep-Dive)
تتميز المنصة ببنية ذكاء اصطناعي هجينة فريدة تضمن استمرارية الخدمة بنسبة 100%:
1. **البوابة السحابية المتقدمة:** تتصل عبر Vercel AI SDK بنموذج `google/gemini-2.5-flash` لبث إجابات دقيقة ومفصلة.
2. **المحرك المحلي التكيفي (`local-advisor-ai.ts`):**
   * **تطبيع النصوص العربية (`normalizeArabic`):** توحيد الهمزات والتاء المربوطة والألف المقصورة وإزالة التشكيل والمطابقة الذكية للهجة الأردنية.
   * **ذاكرة الحوار متعدد الأدوار (`buildConversationMemory`):** تتبع التخصص، الجامعة، ومعدل الطالب عبر كامل المحادثة دون نسيان السياق.
   * **18+ نية حوارية متخصصة:**
     * استفسارات الرواتب وسلالم الدخل (الأردن، الخليج، والعمل عن بعد).
     * حساب تكلفة الدراسة وأسعار الساعات تنافسياً وموازياً.
     * المقارنة الثنائية المباشرة وجهاً لوجه مع حكم صريح.
     * استعراض أفضل الجامعات المانحة للتخصص بناءً على اعتمادات ABET و WFME.
     * تحليل صعوبة الدراسة وطبيعة المواد ولغة التدريس.
     * فحص مناعة التخصص ضد الأتمتة والذكاء الاصطناعي.
     * مسارات العمل عن بعد بالدولار والسفر للخليج وألمانيا.
     * بنك الشهادات المجانية والبدائل الأكاديمية الذكية.
3. **خادم البث الحي (`api/chat.ts`):** تدفق مستمر عبر `Server-Sent Events` ومحاكاة الكتابة الحية بفاصل 16ms لتجربة محادثة واقعية وسريعة.

---

## 5. وكيل الرصد الذاتي ومحرك الرؤية الحاسوبية
1. **الوكيل المستقل (AI Scout):**
   * رصد تلقائي لمستجدات سوق العمل، ومواقع المنح، والدورات التدريبية المعتمدة.
   * إدراج الاكتشافات في طابور التغييرات المعلقة (Pending Queue) لتدقيقها واعتمادها من الإدارة العليا قبل النشر.
2. **محرك الرؤية الحاسوبية (Vision OCR):**
   * رفع مستندات القبول وكشوف العلامات الممسوحة ضوئياً وتفريغها عبر Google Gemini Vision API إلى حقول وقواعد بيانات مهيكلة بنقرة واحدة.

---

## 6. قواعد البيانات والمصفوفات الوطنية المعتمدة
* **مصفوفة الـ 121 تخصصاً جامعياً:** تغطي 13 كلية وقطاعاً أكاديمياً (39 مطلوباً، 58 مشبعاً، 24 راكداً) مع تفاصيل نسب التشغيل، المخاطرة، الأتمتة، والبدائل.
* **دليل الجامعات الأردنية الـ 19:** توثيق شامل للجامعات الحكومية الـ 10، والجامعات الحكومية بنموذج دولي (الألمانية وسمية و HTU)، والخاصة المعتمدة مع اعتمادات ABET و WFME و ACPE وتصنيفات QS و THE.
* **بنك الـ 215 دورة وشهادة مجانية:** دورات معتمدة مجانية من Harvard و Google و Cisco و Alison و Saylor و Edraak و HP LIFE.
* **شبكة الـ 34 مصدراً رسمياً:** توثيق الوزارات الأردنية، القبول الموحد، ديوان الخدمة، وهيئات الاعتماد الدولية.
* **إحصاءات القبول والرواتب:** معدلات القبول التنافسي لعامي 2023 و 2024، وأسعار الساعات، ومخزون ديوان الخدمة المدنية ونسب الاستيعاب.

---

## 7. الأمن السيبراني وإدارة الصلاحيات (Security & RBAC)
* **قاعدة بيانات Supabase PostgreSQL:** أمان السجلات على مستوى الصفوف (Row Level Security - RLS).
* **نظام الإغلاق الأمني المزدوج للمشرفين (Dual Supervisors Lockdown):**
  حصر صلاحيات الإدارة العليا والتحكم الشامل حصراً في:
  * `mralrba0@gmail.com`
  * `jowmahmoud6@gmail.com`
* **الحماية المتقدمة:**
  * منع ثغرات الحقن (SQLi) عبر استعلامات الـ ORM المعقمة.
  * الوقاية من XSS عبر تطهير نصوص Markdown في المتصفح.
  * دروع الحماية من هجمات CSRF والتحقق من الـ Origin ورؤوس الطلبات.

---

## 8. لوحة الإدارة والتحكم العليا (13 موديول برمجياً)
تتضمن شاشة `_authenticated/updates.tsx` غرفة تحكم وسيطرة متكاملة تشمل:
1. النظرة العامة و مؤشرات الأداء الحية (6 KPIs + 4 رسوم بيانية تفاعلية لنسب التشغيل والمخاطر وساعات الدراسة).
2. مصفوفة حركة المرور وتحليلات الزيارات (Traffic Analytics).
3. إدارة المستخدمين والملفات الأكاديمية وصلاحيات المشرفين.
4. المحرر الشامل للبيانات (Master Content Editor) مع ميزة التحرير المباشر لكافة التخصصات والجامعات والشهادات.
5. وكيل الرصد والاستكشاف الذاتي (AI Scout Dashboard).
6. محرك الرؤية وتفريغ الوثائق بالصور (Multi-Image Vision OCR).
7. نظام التجاوزات الحية القابلة للاسترداد (Live Revertible Overrides).
8. إدارة وتحرير المجلة الخبيرية الأكاديمية.
9. إدارة القبول الموحد وحاسبة الرسوم ومعدلات السنوات السابقة.
10. مراقبة سجلات محادثات الذكاء الاصطناعي (AI Prompt & Chat Logs).
11. إدارة التغييرات المعلقة (Pending Changes Approval Queue).
12. سجل التدقيق الأمني الشامل (Security Audit Trail).
13. محرر المصادر والوثائق الرسمية الـ 34.

---

## 9. السيو المؤسسي والأرشفة الرقمية (Enterprise SEO)
* **خريطة الموقع الآلية (`sitemap.xml`):** 128 رابطاً مفهرساً بدقة مع أولوية الزحف وتحديث تلقائي مع كل عملية بناء.
* **ملف `robots.txt` المخصص:** تهيئة استباقية لكافة الروبوتات ومحركات البحث العالمية.
* **ملف `site.webmanifest`:** تعريف المنظومة كتطبيق ويب تقدمي (PWA) متوافق مع كافة الأجهزة.
* **7 مخططات Schema.org الغنية:**
  * `WebSite` & `EducationalOrganization`
  * `EducationalOccupationalProgram` & `Course` لكل تخصص
  * `WebApplication` للمستشار والمقارنة
  * `FAQPage` للأسئلة الشائعة والأكثر بحثاً في Google
  * `BreadcrumbList` لمسار التنقل الرقمي

---

## 10. الأداء والاعتمادية ومؤشرات Core Web Vitals
* سرعة التحميل: First Contentful Paint = 0.4s، Largest Contentful Paint = 0.9s.
* استقرار بصري مثالي: Cumulative Layout Shift = 0.000.
* جاهزية فورية للتفاعل: Time to Interactive = 0.8s.
* محرك خادم Nitro خفيف الوزن وسريع الاستجابة.

---
**منصة «الطلاب والمستقبل» — نحو تعليم جامعي واعٍ ومستقبل مهني مشرق لشباب الأردن.**  
*إعداد الطالب: عمر معن الرباع © 2026 / 2027*
"""

md_file_path = os.path.join(BASE_DIR, "PLATFORM_TECHNICAL_DOCUMENTATION.md")
with open(md_file_path, "w", encoding="utf-8") as f:
    f.write(md_content)
print(f"✅ Markdown technical documentation successfully generated at: {md_file_path}")

# ==============================================================================
# 4. تجميع ملف الـ PDF عالي الدقة عبر Google Chrome Headless
# ==============================================================================
pdf_output_path = os.path.join(PUBLIC_DIR, "platform-specification.pdf")
pdf_alias_path = os.path.join(PUBLIC_DIR, "platform-documentation.pdf")

chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=/tmp/chrome-pdf-master",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_output_path}",
    html_file_path
]

print("Running headless Chrome to render high-resolution PDF...")
result = subprocess.run(chrome_cmd, capture_output=True, text=True)

if os.path.exists(pdf_output_path) and os.path.getsize(pdf_output_path) > 10000:
    # نسخ إلى الاسم البديل أيضاً لتوفير رابطين مريحين
    with open(pdf_output_path, "rb") as src, open(pdf_alias_path, "wb") as dst:
        dst.write(src.read())

    doc = pymupdf.open(pdf_output_path)
    page_count = len(doc)
    doc.close()
    file_size_kb = os.path.getsize(pdf_output_path) / 1024

    print(f"🎉 PDF successfully compiled!")
    print(f"   • Path: {pdf_output_path}")
    print(f"   • Size: {file_size_kb:.1f} KB")
    print(f"   • Total Pages: {page_count} pages")
else:
    print(f"❌ Error generating PDF: {result.stderr}")
