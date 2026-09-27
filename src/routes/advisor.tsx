import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  HeartHandshake,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Copy,
  Check,
  Send,
  UserCheck,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { majors } from "@/data/majors";
import { useStudent } from "@/hooks/use-student";
import type { AdvisorPersona } from "@/lib/advisor-prompt";
import { generateLocalAdvisorResponse } from "@/lib/local-advisor-ai";

type AdvisorSearch = { q?: string | undefined };

export const Route = createFileRoute("/advisor")({
  validateSearch: (search: Record<string, unknown>): AdvisorSearch => {
    const raw = search["q"];
    return { q: typeof raw === "string" && raw.trim() ? raw.trim() : undefined };
  },

  head: () => ({
    meta: [
      { title: "المستشار الذكي المتطور | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "استشر الذكاء الاصطناعي الأكاديمي والمهني المتطور وفق معدلك وفرع التوجيهي، مع تخصيص نبرة الاستشارة (مرشد رسمي، مدرب توظيف، رائد أعمال، رفيق دراسي).",
      },
      { property: "og:title", content: "المستشار الذكي المتطور | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "تحليل عربي شامل ومخصص لأي تخصص أكاديمي في الجامعات الأردنية.",
      },
    ],
  }),
  component: Advisor,
});

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const PERSONAS: {
  id: AdvisorPersona;
  title: string;
  badge: string;
  icon: typeof GraduationCap;
  desc: string;
}[] = [
  {
    id: "formal_advisor",
    title: "المرشد الأكاديمي والتنافسي",
    badge: "مؤسسي دقيق",
    icon: GraduationCap,
    desc: "تحليل الحدود الدنيا للقبول التنافسي والموازي وسياسات القبول الموحد والاعتمادات الرسمية.",
  },
  {
    id: "career_coach",
    title: "مدرب التوظيف وسوق العمل",
    badge: "رواتب وفرص عمل",
    icon: Briefcase,
    desc: "التركيز على الرواتب بالدينار والدولار، وفرص العمل عن بُعد للخليج، وتجهيز السيرة الذاتية.",
  },
  {
    id: "tech_entrepreneur",
    title: "رائد الأعمال والتقني",
    badge: "ابتكار وذكاء اصطناعي",
    icon: Rocket,
    desc: "أثر الذكاء الاصطناعي، البرمجيات الحديثة، العمل الحر والمشاريع الناشئة المستقلة.",
  },
  {
    id: "supportive_mentor",
    title: "الأخ الأكبر والمرشد التربوي",
    badge: "أسلوب دافئ وداعم",
    icon: HeartHandshake,
    desc: "تفكيك حيرة ما بعد التوجيهي، تخفيف القلق والتوتر، وتقديم خطوات عملية مريحة ومبسطة.",
  },
];

function Advisor() {
  const { q } = Route.useSearch();
  const student = useStudent();
  const [selectedPersona, setSelectedPersona] = useState<AdvisorPersona>("formal_advisor");
  const [useStudentData, setUseStudentData] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sentInitial = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessageDirect = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading) return;

    setError(null);
    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now() + 1}`;

    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", text },
      { id: botMsgId, role: "assistant", text: "" },
    ];

    setMessages(newMessages);
    setIsLoading(true);

    try {
      const studentContext = useStudentData
        ? {
            name: student.profile.name,
            role: student.profile.role,
            branch: student.profile.tawjihiBranch,
            gpa: student.profile.tawjihiGpa,
            governorate: student.profile.governorate,
            bookmarkedMajors: student.bookmarkedMajors,
          }
        : undefined;

      const customKey =
        typeof window !== "undefined"
          ? localStorage.getItem("user_custom_gemini_key") || undefined
          : undefined;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customKey ? { "x-gemini-key": customKey } : {}),
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.role,
              parts: [{ type: "text", text: m.text }],
            })),
            {
              role: "user",
              parts: [{ type: "text", text }],
            },
          ],
          persona: selectedPersona,
          studentContext,
          apiKey: customKey,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          const lines = chunk.split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const raw = trimmed.slice(6).trim();
              if (raw === "[DONE]") continue;
              try {
                const parsed = JSON.parse(raw);
                if (parsed.type === "text-delta" && parsed.delta) {
                  accumulated += parsed.delta;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMsgId ? { ...msg, text: accumulated } : msg,
                    ),
                  );
                }
              } catch {
                // Ignore parse errors on partial streams
              }
            } else if (trimmed.startsWith("0:")) {
              try {
                const textPart = JSON.parse(trimmed.slice(2));
                accumulated += textPart;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId ? { ...msg, text: accumulated } : msg,
                  ),
                );
              } catch {
                // Ignore
              }
            }
          }
        }
      }

      // If stream didn't accumulate anything, use smart local engine fallback
      if (!accumulated.trim()) {
        const fallbackText = generateLocalAdvisorResponse(text, selectedPersona, studentContext);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMsgId ? { ...msg, text: fallbackText } : msg)),
        );
      }
    } catch (err) {
      console.warn("[Advisor Chat] Falling back to intelligent local engine:", err);
      // Instant graceful local fallback: NEVER fails the user
      const studentContext = useStudentData
        ? {
            name: student.profile.name,
            role: student.profile.role,
            branch: student.profile.tawjihiBranch,
            gpa: student.profile.tawjihiGpa,
            governorate: student.profile.governorate,
            bookmarkedMajors: student.bookmarkedMajors,
          }
        : undefined;

      const fallbackText = generateLocalAdvisorResponse(text, selectedPersona, studentContext);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === botMsgId ? { ...msg, text: fallbackText } : msg)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (q && !sentInitial.current) {
      sentInitial.current = true;
      void sendMessageDirect(`أرغب بتحليل شامل ومفصل لتخصص: ${q}`);
    }
  }, [q]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const copyText = (id: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Title & Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              مستشار الذكاء الاصطناعي الأكاديمي 2.0
            </span>
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" title="متصل وجاهز" />
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold mt-2">
            المستشار الأكاديمي والمهني الذكي
          </h1>
          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm leading-6">
            حلّل أي تخصص، قارن الخيارات، واحصل على خارطة طريق للمهارات ورواتب ديوان الخدمة وسوق العمل.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="self-start sm:self-center border-border hover:bg-surface text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            بدء جلسة جديدة
          </button>
        )}
      </div>

      {/* Persona Selection Bar */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <SlidersHorizontal className="size-4 text-primary" />
            اختر شخصية ونبرة المستشار الأنسب لك:
          </span>
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            يتم تخصيص هيكل الإجابة والنصائح وفق النمط المختار
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PERSONAS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPersona === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPersona(item.id)}
                className={`flex flex-col p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary shadow-xs"
                    : "border-border/70 bg-surface/40 hover:bg-surface hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon
                    className={`size-4 ${isSelected ? "text-primary font-bold" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-2 text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <span className="font-bold text-xs text-foreground mt-1">{item.title}</span>
                <span className="text-[11px] text-muted-foreground leading-4 mt-1 line-clamp-2">
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Student Context Toggle Banner */}
        <div className="mt-3.5 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <UserCheck className="size-4 text-emerald-500 shrink-0" />
            <span className="text-foreground">
              تخصيص الإجابات بناءً على ملفك:{" "}
              <strong className="text-primary font-bold">{student.profile.name}</strong> (
              معدل: <strong>{student.profile.tawjihiGpa}%</strong> | فرع:{" "}
              <strong>{student.profile.tawjihiBranch}</strong> | المحافظة:{" "}
              <strong>{student.profile.governorate}</strong>)
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-muted-foreground hover:text-foreground">
            <input
              type="checkbox"
              checked={useStudentData}
              onChange={(e) => setUseStudentData(e.target.checked)}
              className="accent-primary rounded"
            />
            <span>تضمين بياناتي الأكاديمية في الاستشارة</span>
          </label>
        </div>
      </div>

      {/* Initial Suggestions (Empty State) */}
      {messages.length === 0 && (
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-foreground text-xs sm:text-sm font-bold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-lg px-2 py-1 text-xs">
                🚀 سيناريوهات واستشارات جاهزة للتجربة المباشرة:
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() =>
                  sendMessageDirect(
                    "أنا محتار بين تخصص الذكاء الاصطناعي والأمن السيبراني، ومعدلي الحالي مناسب للاثنين. قارن بينهما من حيث رواتب البداية بالدينار الأردني وفرص العمل عن بُعد ومخاطر الأتمتة.",
                  )
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-2xl border p-4 text-right transition-all text-xs space-y-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors block">
                  ⚖️ مقارنة تخصصين وحسم التردد
                </span>
                <span className="text-muted-foreground block leading-5 text-[11px]">
                  مقارنة محايدة ودقيقة بين الذكاء الاصطناعي والأمن السيبراني في سوق العمل الأردني والإقليمي.
                </span>
              </button>

              <button
                onClick={() =>
                  sendMessageDirect(
                    "أريد خارطة طريق تفصيلية لبناء مهاراتي في البرمجة وتطوير البرمجيات بالاستفادة من الشهادات المجانية المعتمدة من هارفارد و freeCodeCamp حتى التخرج.",
                  )
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-2xl border p-4 text-right transition-all text-xs space-y-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors block">
                  🗺️ خارطة طريق الشهادات والمهارات (Roadmap)
                </span>
                <span className="text-muted-foreground block leading-5 text-[11px]">
                  خطة سنوية عملية لتسليح سيرتك الذاتية بشهادات مجانية معتمدة عالمياً وبناء سيرة ذاتية منافسة.
                </span>
              </button>

              <button
                onClick={() =>
                  sendMessageDirect(
                    "ما هي التخصصات الأردنية الأكثر أماناً من الركود والتي توفر أعلى فرص عمل عن بُعد للخليج والخارج ورواتب ممتازة بالدينار الأردني والدولار؟",
                  )
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-2xl border p-4 text-right transition-all text-xs space-y-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors block">
                  💼 كشف التخصصات الأعلى عائداً وأماناً
                </span>
                <span className="text-muted-foreground block leading-5 text-[11px]">
                  استعراض التخصصات التي تحميك من طوابير الانتظار الطويلة وتوفر العمل الحر والعمل عن بُعد.
                </span>
              </button>

              <button
                onClick={() =>
                  sendMessageDirect(
                    "أريد إجراء محاكاة مقابلة عمل واقعية (Mock Interview) في تخصص تكنولوجيا المعلومات أو التسويق الرقمي في الأردن. اطرح علي السؤال الأول وانتظر إجابتي لتقييمها بدقة.",
                  )
                }
                className="border-border bg-card hover:border-primary/50 hover:bg-surface/50 rounded-2xl border p-4 text-right transition-all text-xs space-y-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors block">
                  🎙️ محاكاة مقابلة عمل ذكية (AI Mock Interview)
                </span>
                <span className="text-muted-foreground block leading-5 text-[11px]">
                  تدرب على أسئلة المقابلات الوظيفية الحقيقية واكتشف كيف تقيّمك لجان التوظيف الأردنية.
                </span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground text-xs font-semibold mb-2.5">
              أو اختر تخصصاً لتحليله فورياً بضغطة واحدة:
            </p>
            <div className="flex flex-wrap gap-2">
              {majors.slice(0, 12).map((major) => (
                <button
                  key={major.slug}
                  onClick={() => sendMessageDirect(`أرغب بتحليل شامل ومفصل لتخصص: ${major.name}`)}
                  className="border-border bg-card hover:border-primary hover:text-primary rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  {major.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="mt-6 space-y-5">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={
                isUser
                  ? "bg-primary text-primary-foreground ms-auto max-w-[85%] rounded-3xl rounded-br-xs px-5 py-3.5 text-sm shadow-md"
                  : "card-surface rounded-3xl p-6 border border-border/80 shadow-xs"
              }
            >
              {isUser ? (
                <p className="leading-7 font-medium">{message.text}</p>
              ) : (
                <>
                  <div className="prose-ar text-sm leading-7 space-y-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                  </div>
                  {message.text && (
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                      <span>إجابة استرشادية مستندة إلى بيانات المنصة الرسمية</span>
                      <button
                        onClick={() => copyText(message.id, message.text)}
                        className="hover:text-foreground inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="size-3.5 text-emerald-500" />
                            تم النسخ!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            نسخ الرد
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="card-surface rounded-2xl p-5 border border-primary/20 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>المستشار يحلل البيانات ويصيغ الرد المخصص…</span>
          </div>
        )}

        {messages.length > 0 && !isLoading && (
          <div className="border-border/70 bg-card rounded-2xl border p-4 shadow-2xs">
            <span className="text-muted-foreground text-xs font-bold block mb-2.5">
              💡 أسئلة استكمال وتعميق مقترحة:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  sendMessageDirect(
                    "ما هي الشهادات المهنية المجانية المعتمدة عالمياً التي تنصحني بالبدء بها فوراً لرفع فرصة توظيفي وقبول سيرتي الذاتية؟",
                  )
                }
                className="bg-surface hover:bg-surface-2 border-border text-foreground rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors text-right shadow-2xs cursor-pointer"
              >
                🎓 ما أفضل الشهادات المجانية الموصى بها؟
              </button>
              <button
                type="button"
                onClick={() =>
                  sendMessageDirect(
                    "كيف أجهز نفسي للعمل عن بُعد (Remote Work) لشركات في الخليج أو الخارج أثناء سنوات دراستي الجامعية؟",
                  )
                }
                className="bg-surface hover:bg-surface-2 border-border text-foreground rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors text-right shadow-2xs cursor-pointer"
              >
                🌐 كيف أبدأ العمل عن بُعد مع شركات الخليج؟
              </button>
              <button
                type="button"
                onClick={() =>
                  sendMessageDirect(
                    "ما هي كبرى الشركات والبنوك المشغلة لهذا التخصص في الأردن وما هي المهارات الأكثر طلباً فيها؟",
                  )
                }
                className="bg-surface hover:bg-surface-2 border-border text-foreground rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors text-right shadow-2xs cursor-pointer"
              >
                🏢 ما هي أبرز الشركات المشغلة في الأردن؟
              </button>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <form
        className="bg-background/90 sticky bottom-0 mt-6 flex gap-2.5 py-4 backdrop-blur-xl"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessageDirect(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`اكتب سؤالك لـ (${PERSONAS.find((p) => p.id === selectedPersona)?.title})…`}
          className="border-border bg-card focus:border-primary min-w-0 flex-1 rounded-2xl border px-4 py-3.5 text-sm focus:outline-none shadow-xs"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary text-primary-foreground rounded-2xl px-6 py-3.5 text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40 flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <span>إرسال</span>
          <Send className="size-4 rotate-180" />
        </button>
      </form>
    </div>
  );
}
