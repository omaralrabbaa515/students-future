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
        <div className="mt-6 space-y-5">
          <div>
            <p className="text-foreground text-sm font-bold mb-2.5 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-lg p-1 text-xs">🚀 أوضاع استشارية متقدمة:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() =>
                  submit("أنا متردد بين تخصص الذكاء الاصطناعي والأمن السيبراني، ومعدلي 85%، قارن بينهما في سوق العمل الأردني ورواتب البداية ومخاطر الأتمتة لأحسم قراري.")
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-xl border p-3.5 text-right transition-all text-xs space-y-1 shadow-xs"
              >
                <span className="font-bold text-foreground block">⚖️ مقارنة تخصصين وحسم التردد</span>
                <span className="text-muted-foreground block leading-5">
                  مقارنة ذكية ومحايدة بين الذكاء الاصطناعي والأمن السيبراني بمعدل 85%.
                </span>
              </button>

              <button
                onClick={() =>
                  submit("أنا طالب سنة أولى في تخصص هندسة البرمجيات، رتّب لي خارطة طريق تفصيلية للمهارات والشهادات المجانية المعتمدة من السنة الأولى حتى سنة التخرج.")
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-xl border p-3.5 text-right transition-all text-xs space-y-1 shadow-xs"
              >
                <span className="font-bold text-foreground block">🗺️ توليد خارطة طريق المهارات (Roadmap)</span>
                <span className="text-muted-foreground block leading-5">
                  خطة سنوية عملية لبناء سيرة ذاتية قوية ومشاريع تؤهلك للتوظيف المباشر.
                </span>
              </button>

              <button
                onClick={() =>
                  submit("أريد محاكاة لمقابلة عمل واقعية (Mock Interview) في تخصص علم البيانات والذكاء الاصطناعي في الأردن. اطرح علي السؤال الأول وانتظر إجابتي لتقييمها.")
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-xl border p-3.5 text-right transition-all text-xs space-y-1 shadow-xs"
              >
                <span className="font-bold text-foreground block">🎙️ محاكاة مقابلة وظيفية ذكية (AI Mock Interview)</span>
                <span className="text-muted-foreground block leading-5">
                  تدرب على أسئلة المقابلات الواقعية الشائعة واحصل على تقييم فوري لأدائك.
                </span>
              </button>

              <button
                onClick={() =>
                  submit("ما هي التخصصات الأردنية الأكثر أماناً من الركود والتي توفر أعلى فرص عمل عن بُعد للخليج والخارج ورواتب ممتازة بالدينار الأردني؟")
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-xl border p-3.5 text-right transition-all text-xs space-y-1 shadow-xs"
              >
                <span className="font-bold text-foreground block">💼 كشف التخصصات الأعلى عائداً وأماناً</span>
                <span className="text-muted-foreground block leading-5">
                  استعراض التخصصات التي تحمي الطالب من فترات الانتظار الطويلة في ديوان الخدمة.
                </span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground text-xs font-semibold mb-2">أو اختر تخصصاً للتحليل الشامل الفوري:</p>
            <div className="flex flex-wrap gap-2">
              {majors.slice(0, 10).map((major) => (
                <button
                  key={major.slug}
                  onClick={() => submit(`أرغب بتحليل كامل لتخصص: ${major.name}`)}
                  className="border-border bg-card hover:border-primary hover:text-primary rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-xs"
                >
                  {major.name}
                </button>
              ))}
            </div>
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
        {messages.length > 0 && !isLoading && (
          <div className="border-border/60 bg-surface/40 mt-4 rounded-xl border p-3">
            <span className="text-muted-foreground text-xs font-semibold block mb-2">أسئلة متابعة ذكية مقترحة:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => submit("ما هي الشهادات المهنية المجانية المعتمدة عالمياً التي تنصحني بالبدء بها فوراً لرفع فرصة توظيفي؟")}
                className="bg-card hover:bg-surface border-border text-foreground rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors text-right shadow-2xs"
              >
                🎓 ما أفضل الشهادات المجانية الموصى بها؟
              </button>
              <button
                type="button"
                onClick={() => submit("كيف أجهز نفسي للعمل عن بُعد (Remote Work) لشركات في الخليج أو الخارج أثناء سنوات دراستي؟")}
                className="bg-card hover:bg-surface border-border text-foreground rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors text-right shadow-2xs"
              >
                🌐 كيف أبدأ العمل عن بُعد مع شركات الخليج؟
              </button>
              <button
                type="button"
                onClick={() => submit("ما هي كبرى الشركات والبنوك المشغلة لهذا التخصص في الأردن وما هي المهارات الأكثر طلباً فيها؟")}
                className="bg-card hover:bg-surface border-border text-foreground rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors text-right shadow-2xs"
              >
                🏢 ما هي أبرز الشركات المشغلة في الأردن؟
              </button>
            </div>
          </div>
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
