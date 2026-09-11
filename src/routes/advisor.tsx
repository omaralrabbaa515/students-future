import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { majors } from "@/data/majors";

type AdvisorSearch = { q?: string | undefined };

export const Route = createFileRoute("/advisor")({
  validateSearch: (search: Record<string, unknown>): AdvisorSearch => {
    const raw = search["q"];
    return { q: typeof raw === "string" && raw.trim() ? raw.trim() : undefined };
  },

  head: () => ({
    meta: [
      { title: "المستشار الذكي | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "اسأل المستشار الذكي عن أي تخصص أردني واحصل على تحليل نسبة التشغيل والاعتمادات وأثر الأتمتة ومسار الشهادات المجانية والبدائل الأكاديمية.",
      },
      { property: "og:title", content: "المستشار الذكي | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "تحليل عربي كامل لأي تخصص أكاديمي في الجامعات الأردنية.",
      },
    ],
  }),
  component: Advisor,
});

function Advisor() {
  const { q } = Route.useSearch();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
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
      void sendMessage({ text: `أرغب بتحليل كامل لتخصص: ${q}` });
    }
  }, [q, sendMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    setError(null);
    setInput("");
    void sendMessage({ text: value });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">المستشار الأكاديمي والمهني</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-7">
        اكتب اسم أي تخصص أكاديمي، وسيأتيك التحليل بخمسة أقسام: مؤشر التشغيل والطلب، خريطة التخصص في
        الجامعات الأردنية، أثر الذكاء الاصطناعي والأتمتة، مسار الشهادات التنافسية، والبدائل
        الأكاديمية الذكية.
      </p>

      {messages.length === 0 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold">ابدأ من تخصص شائع:</p>
          <div className="flex flex-wrap gap-2">
            {majors.slice(0, 8).map((major) => (
              <button
                key={major.slug}
                onClick={() => submit(`أرغب بتحليل كامل لتخصص: ${major.name}`)}
                className="border-border bg-card hover:border-brand hover:text-brand rounded-full border px-4 py-2 text-sm transition-colors"
              >
                {major.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {messages.map((message) => {
          const text = message.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join("");
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={
                isUser
                  ? "bg-brand text-brand-foreground ms-auto max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-[var(--shadow-card)]"
                  : "card-surface p-5"
              }
            >
              {isUser ? (
                <p className="leading-7">{text}</p>
              ) : (
                <>
                  <div className="prose-ar text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                  {text && (
                    <button
                      onClick={() => void navigator.clipboard.writeText(text)}
                      className="text-muted-foreground hover:text-foreground mt-3 text-xs underline"
                    >
                      نسخ الرد
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
        {isLoading && (
          <p className="text-muted-foreground text-sm">يجري تحليل البيانات وإعداد الرد…</p>
        )}
        {error && (
          <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border p-3 text-sm">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="bg-background/90 sticky bottom-0 mt-6 flex gap-2 py-4 backdrop-blur-xl"
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="اكتب سؤالك… مثال: ما مستقبل تخصص الهندسة المدنية في الأردن؟"
          className="border-border bg-card focus:border-brand min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand text-brand-foreground rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
