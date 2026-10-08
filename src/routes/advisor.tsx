import { useChat } from "@ai-sdk/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Scale, Sparkles, User, Bot, Copy, Check, ArrowRight } from "lucide-react";

import { majors } from "@/data/majors";

type AdvisorSearch = { q?: string | undefined };

export const Route = createFileRoute("/advisor")({
  validateSearch: (search: Record<string, unknown>): AdvisorSearch => {
    const raw = search["q"];
    return { q: typeof raw === "string" && raw.trim() ? raw.trim() : undefined };
  },

  head: () => ({
    meta: [
      { title: "المستشار الذكي التفاعلي | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "المستشار الأكاديمي والمهني الذكي التفاعلي: تحليل نِسَب التشغيل والاعتمادات الرسمية للتخصصات الأردنية مع مسار شهادات عالمية مجانية معتمدة وخطة قرار نهائية.",
      },
      { property: "og:title", content: "المستشار الأكاديمي الذكي" },
    ],
  }),
  component: Advisor,
});

const QUICK_FOLLOWUPS = [
  "ما هي أفضل جامعة أردنية تطرح هذا التخصص؟",
  "ما هي الشهادات العالمية المجانية التي تبني لي ميزة تنافسية؟",
  "معدلي في التوجيهي 85.. هل أحصل على فرصة تشغيل قوية؟",
  "ما هي البدائل الأكاديمية الذكية ذات الطلب الأعلى؟",
];

function Advisor() {
  const { q } = Route.useSearch();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sentInitial = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) =>
      setError(
        err.message.includes("402")
          ? "انتهى رصيد خدمة الذكاء الاصطناعي في هذه المنصة. يرجى إبلاغ مسؤول المنصة لتعبئة الرصيد."
          : "تعذّر الحصول على رد من المستشار الآن. حاول مرة أخرى بعد قليل.",
      ),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (q && !sentInitial.current) {
      sentInitial.current = true;
      void sendMessage({ text: `أرغب بتحليل شامل واستشارة تفاعلية لتخصص: ${q}` });
    }
  }, [q, sendMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    setError(null);
    setInput("");
    void sendMessage({ text: value });
  };

  const handleCopy = (id: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand mb-2">
            <Bot className="size-3.5" />
            <span>مرشدك الأكاديمي والمهني التفاعلي 2026</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl text-foreground">
            المستشار الذكي المعتمد
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7 max-w-2xl">
            استشر المستشار عن أي تخصص في الجامعات الأردنية ليحلل لك مؤشرات التشغيل، خريطة الجامعات والاعتمادات، أثر الأتمتة، والشهادات العالمية المجانية للوصول لخطة قرار عملية متكاملة.
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0">
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/40 bg-secondary/10 px-3.5 py-2 text-xs font-bold text-secondary hover:bg-secondary/20 transition-colors"
          >
            <Scale className="size-3.5" />
            <span>مختبر المقارنة اللحظية</span>
          </Link>
          <Link
            to="/account"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <User className="size-3.5 text-brand" />
            <span>ملفي الأكاديمي</span>
          </Link>
        </div>
      </div>

      {/* Suggested Starter Majors */}
      {messages.length === 0 && (
        <div className="mt-8 card-surface p-6">
          <p className="text-xs font-bold text-muted-foreground mb-3 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-brand" />
            <span>اختر تخصصاً للبدء الفوري بالاستشارة التفاعلية:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {majors.slice(0, 10).map((major) => (
              <button
                key={major.slug}
                type="button"
                onClick={() => submit(`أرغب بتحليل كامل لتخصص: ${major.name}`)}
                className="border-border bg-card hover:border-brand hover:text-brand rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer shadow-xs"
              >
                {major.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="mt-6 space-y-5">
        {messages.map((message) => {
          const text =
            message.parts && message.parts.length > 0
              ? message.parts.map((part) => (part.type === "text" ? part.text : "")).join("")
              : ((message as Record<string, unknown>)["content"] as string) || "";
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={
                isUser
                  ? "bg-brand text-brand-foreground ms-auto max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-md"
                  : "card-surface p-6 shadow-sm"
              }
            >
              {isUser ? (
                <p className="leading-7 font-medium">{text}</p>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60 text-xs font-bold text-brand">
                    <Bot className="size-4" />
                    <span>تحليل المستشار الذكي لمنصة الطلاب والمستقبل</span>
                  </div>

                  <div className="prose-ar text-sm leading-8 text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>

                  {text && (
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleCopy(message.id, text)}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="size-3.5 text-accent" />
                            <span className="text-accent font-bold">تم نسخ الرد!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>نسخ التحليل</span>
                          </>
                        )}
                      </button>

                      <Link
                        to="/compare"
                        className="text-brand-ink hover:underline font-bold inline-flex items-center gap-1"
                      >
                        <span>مقارنة هذا التخصص بمختبر المقارنة ←</span>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="card-surface p-4 text-xs text-muted-foreground flex items-center gap-2 animate-pulse">
            <Bot className="size-4 text-brand animate-spin" />
            <span>يجري مطابقة بيانات ديوان الخدمة المدنية ومصادر المنصة وإعداد الرد التفاعلي…</span>
          </div>
        )}

        {error && (
          <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-xl border p-4 text-sm font-medium">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Follow-up chips when conversation is active */}
      {messages.length > 0 && !isLoading && (
        <div className="mt-5 space-y-2">
          <p className="text-xs text-muted-foreground font-bold">اقتراحات لمواصلة الحوار:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_FOLLOWUPS.map((followUp) => (
              <button
                key={followUp}
                type="button"
                onClick={() => submit(followUp)}
                className="rounded-full border border-brand/30 bg-brand/5 hover:bg-brand/15 hover:border-brand text-foreground px-3 py-1 text-xs transition-colors cursor-pointer"
              >
                {followUp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form
        className="bg-background/95 sticky bottom-0 mt-6 flex gap-2 py-4 backdrop-blur-xl border-t border-border"
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="اكتب سؤالك أو اذكر معدلك بالتوجيهي… مثال: معدلي 82، ما أفضل تخصص مطلوب؟"
          className="border-border bg-card focus:border-brand min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm text-foreground focus:outline-none shadow-xs"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-brand text-brand-foreground rounded-xl px-6 py-3 text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer shrink-0"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
