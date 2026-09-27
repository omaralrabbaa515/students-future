import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  Eye,
  CheckCircle,
  Share2,
  Bookmark,
  ArrowLeft,
  ChevronLeft,
  FileText,
  BadgeCheck,
  TrendingUp,
  Award,
  Compass,
  X,
  ExternalLink,
} from "lucide-react";

import {
  INITIAL_MAGAZINE_ARTICLES,
  type ExpertArticle,
  type ArticleCategory,
} from "@/data/magazine";
import { AppLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/magazine")({
  head: () => ({
    meta: [
      {
        title: "المجلة الخبيرية الأكاديمية | مقالات وتحليلات سوق العمل الأردني والتوجيهي",
      },
      {
        name: "description",
        content:
          "مقالات وتحليلات معمقة بأقلام كبار المرشدين الأكاديميين وخبراء التوظيف في الأردن: القبول الموحد، الذكاء الاصطناعي، التخصصات الراكدة، والعمل عن بُعد.",
      },
      {
        property: "og:title",
        content: "المجلة الخبيرية الأكاديمية | منصة الطلاب والمستقبل",
      },
      {
        property: "og:description",
        content: "تحليلات حصرية ودراسات موثقة لسوق العمل والتعليم الجامعي في الأردن.",
      },
    ],
  }),
  component: MagazinePage,
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
        <h2 className="text-xl font-bold text-foreground">المجلة الخبيرية الأكاديمية</h2>
        <p className="text-sm text-muted-foreground mt-2">
          تم تحديث بيانات المقالات. اضغط على الزر أدناه لإعادة التحميل الفوري.
        </p>
        <button
          onClick={() => {
            reset();
            window.location.reload();
          }}
          className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md cursor-pointer"
        >
          إعادة التحميل
        </button>
      </div>
    </div>
  ),
});

const CATEGORIES: { id: ArticleCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "كافة المقالات والدراسات", icon: "📚" },
  { id: "tawjihi_advice", label: "نصائح التوجيهي والركود", icon: "🎓" },
  { id: "ai_and_tech", label: "الذكاء الاصطناعي والتقنية", icon: "🤖" },
  { id: "admissions_and_grants", label: "القبول الموحد والموازي", icon: "🏛️" },
  { id: "remote_work", label: "العمل عن بُعد بالدولار", icon: "💻" },
  { id: "healthcare_careers", label: "القطاع الصحي والمهن الطبية", icon: "🩺" },
  { id: "market_trends", label: "مقارنات الجامعات والمسارات", icon: "📊" },
];

function sanitizeArticle(raw: any, index: number = 0): ExpertArticle {
  const fallbackAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const authorName =
    typeof raw?.author === "string"
      ? raw.author
      : raw?.author?.name || "د. سفيان الهنداوي (مستشار أكاديمي)";
  const authorTitle =
    typeof raw?.author === "object" && raw?.author?.title
      ? raw.author.title
      : "مستشار التخطيط الأكاديمي وسوق العمل";
  const authorAvatar =
    typeof raw?.author === "object" && raw?.author?.avatar
      ? raw.author.avatar
      : fallbackAvatar;

  return {
    id: raw?.id || `art-${Date.now()}-${index}`,
    slug: raw?.slug || `art-${index}`,
    title: raw?.title || "تحليل أكاديمي وتوجيهي",
    summary: raw?.summary || "",
    category: raw?.category || "tawjihi_advice",
    categoryLabel: raw?.categoryLabel || "تحليل خبير موثق",
    categoryColor: raw?.categoryColor || "bg-primary/10 text-primary border-primary/20",
    author: {
      name: authorName,
      title: authorTitle,
      avatar: authorAvatar,
      verified: true,
    },
    readTime: raw?.readTime || "4 دقائق",
    publishedAt: raw?.publishedAt || "2026/09/27",
    views: typeof raw?.views === "number" ? raw.views : 140,
    featured: !!raw?.featured,
    tags: Array.isArray(raw?.tags) ? raw.tags : ["توجيهي 2026", "سوق العمل"],
    keyTakeaways: Array.isArray(raw?.keyTakeaways) ? raw.keyTakeaways : [],
    content: Array.isArray(raw?.content) ? raw.content : [raw?.summary || ""],
    sourceReference: raw?.sourceReference || "منصة الطلاب والمستقبل",
  };
}

function MagazinePage() {
  const [articles, setArticles] = useState<ExpertArticle[]>(() =>
    INITIAL_MAGAZINE_ARTICLES.map((a, i) => sanitizeArticle(a, i))
  );
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<ExpertArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("platform_magazine_articles");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed.map((a: any, i: number) => sanitizeArticle(a, i)));
          }
        } catch (e) {
          console.error("Error loading articles from localStorage", e);
        }
      }
    }
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title?.toLowerCase()?.includes(q) ||
        article.summary?.toLowerCase()?.includes(q) ||
        article.author?.name?.toLowerCase()?.includes(q) ||
        (Array.isArray(article.tags) && article.tags.some((t) => t?.toLowerCase()?.includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShare = (article: ExpertArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(
        `${window.location.origin}/magazine#${article.slug}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-surface to-background pt-12 pb-16">
        <div className="absolute inset-0 bg-radial-[circle_at_top] from-primary/15 via-transparent to-transparent opacity-70 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-4 shadow-2xs">
              <Sparkles className="size-3.5" />
              المجلة الخبيرية الأكاديمية والمهنية المعتمدة
            </span>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground max-w-3xl leading-tight">
              نبض سوق العمل والتوجيهي بأقلام كبار الخبراء والأكاديميين
            </h1>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              دراسات تحليلية، استراتيجيات القبول الموحد، توجيهات تجنب التخصصات الراكدة،
              وخارطة طريق الوظائف الرقمية والعمل عن بُعد في الأردن والمنطقة العربية.
            </p>

            {/* Live Search Bar */}
            <div className="mt-8 w-full max-w-xl relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالعنوان، الكاتب، التخصص، أو الكلمات الدلالية…"
                className="w-full bg-card border border-border shadow-lg rounded-2xl py-3.5 pe-12 ps-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              <Search className="absolute end-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 pt-8">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-[1.02]"
                    : "bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Article Hero (Shown when no search query and 'all' or matching category) */}
        {!searchQuery && selectedCategory === "all" && featuredArticle && (
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="group mt-6 relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-surface to-primary/5 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                ⭐ مقال الخبير الموصى به
              </span>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {featuredArticle.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3.5" />
                  {featuredArticle.views.toLocaleString()} قراءة
                </span>
              </div>
            </div>

            <h2 className="font-display text-xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
              {featuredArticle.title}
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-4xl">
              {featuredArticle.summary}
            </p>

            {/* Author and Action Row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
              <div className="flex items-center gap-3">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="size-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-foreground">
                      {featuredArticle.author.name}
                    </span>
                    <BadgeCheck className="size-4 text-primary fill-primary/20" />
                  </div>
                  <span className="text-[11px] text-muted-foreground block">
                    {featuredArticle.author.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                  className={`p-2 rounded-xl border border-border transition-colors ${
                    bookmarkedIds.includes(featuredArticle.id)
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-surface hover:bg-surface-2 text-muted-foreground"
                  }`}
                  title="حفظ المقال"
                >
                  <Bookmark className="size-4" />
                </button>

                <button
                  onClick={(e) => handleShare(featuredArticle, e)}
                  className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-2 text-muted-foreground transition-colors"
                  title="مشاركة الرابط"
                >
                  <Share2 className="size-4" />
                </button>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary ms-2 group-hover:-translate-x-1 transition-transform">
                  <span>قراءة التحليل الكامل</span>
                  <ArrowLeft className="size-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
              {searchQuery ? `نتائج البحث عن "${searchQuery}"` : "أحدث المقالات والدراسات التوجيهية"}
            </h3>
            <span className="text-xs text-muted-foreground">
              {filteredArticles.length} مقال متوفر
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-3xl bg-card">
              <FileText className="size-12 mx-auto text-muted-foreground/50 mb-3" />
              <h4 className="font-bold text-foreground text-sm">لم يتم العثور على مقالات مطابقة</h4>
              <p className="text-xs text-muted-foreground mt-1">
                جرب تغيير كلمات البحث أو اختر تصنيفاً آخر من القائمة أعلاه.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => {
                const isBookmarked = bookmarkedIds.includes(article.id);
                return (
                  <article
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      {/* Category and Read time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${article.categoryColor}`}
                        >
                          {article.categoryLabel}
                        </span>

                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-display font-extrabold text-foreground text-base group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>

                      {/* Summary */}
                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      {/* Author Card */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="size-7 rounded-full object-cover border border-border"
                          />
                          <div>
                            <span className="text-xs font-bold text-foreground block">
                              {article.author.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground block truncate max-w-[130px]">
                              {article.author.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className={`p-1.5 rounded-lg border border-border transition-colors ${
                              isBookmarked
                                ? "bg-primary/20 text-primary border-primary/40"
                                : "text-muted-foreground hover:bg-surface"
                            }`}
                          >
                            <Bookmark className="size-3.5" />
                          </button>

                          <button
                            onClick={(e) => handleShare(article, e)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-surface transition-colors"
                          >
                            <Share2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Full Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-surface/50">
              <div className="flex items-center gap-2.5">
                <AppLogo size={28} />
                <div>
                  <span className="text-xs font-bold text-primary block">
                    المجلة الخبيرية الأكاديمية
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    تاريخ النشر: {activeArticle.publishedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(activeArticle, e)}
                  className="p-2 rounded-xl border border-border bg-card hover:bg-surface text-muted-foreground transition-colors flex items-center gap-1 text-xs"
                >
                  <Share2 className="size-4" />
                  <span>{copiedLink ? "تم النسخ!" : "مشاركة"}</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl border border-border bg-card hover:bg-surface text-foreground transition-colors"
                  aria-label="إغلاق المقال"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-right">
              {/* Category pill and metadata */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${activeArticle.categoryColor}`}
                >
                  {activeArticle.categoryLabel}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 ms-2">
                  <Clock className="size-3.5" />
                  زمن القراءة: {activeArticle.readTime}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Eye className="size-3.5" />
                  {activeArticle.views.toLocaleString()} قراءة
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-3xl font-black text-foreground leading-snug">
                {activeArticle.title}
              </h2>

              {/* Author Box */}
              <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3.5">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="size-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-foreground">
                      {activeArticle.author.name}
                    </span>
                    <BadgeCheck className="size-4 text-primary fill-primary/20" />
                  </div>
                  <span className="text-xs text-muted-foreground block">
                    {activeArticle.author.title}
                  </span>
                </div>
              </div>

              {/* Key Takeaways Box (خلاصة الخبير) */}
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-2.5">
                <h4 className="font-display text-xs sm:text-sm font-extrabold text-primary flex items-center gap-2">
                  <Sparkles className="size-4" />
                  خلاصة الخبير وأهم التوصيات العملية:
                </h4>
                <ul className="space-y-2">
                  {activeArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground leading-relaxed">
                      <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 pt-2">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base leading-8 text-foreground/90 font-normal">
                    {p}
                  </p>
                ))}
              </div>

              {/* Source Verification Badge */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-emerald-500" />
                  <span>المصدر المرجعي: {activeArticle.sourceReference}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeArticle.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-semibold text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform Action Links */}
              <div className="p-4 rounded-2xl bg-surface-2 border border-border flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="font-bold text-foreground block">
                    هل تريد استشارة مخصصة لمعدلك؟
                  </span>
                  <span className="text-muted-foreground block text-[11px]">
                    اسأل المستشار الذكي أو تفقد دليل التخصصات الشامل
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/advisor"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90"
                  >
                    <span>المستشار الذكي</span>
                    <ArrowLeft className="size-3.5" />
                  </Link>

                  <Link
                    to="/majors"
                    className="px-4 py-2 rounded-xl bg-card border border-border text-foreground font-bold text-xs hover:bg-surface"
                  >
                    دليل التخصصات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
