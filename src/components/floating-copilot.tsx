import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  X,
  Send,
  Compass,
  Calculator,
  Award,
  BookOpen,
  ArrowLeft,
  Bot,
  User,
} from "lucide-react";

interface CopilotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  actionLink?: { to: string; label: string };
}

const INITIAL_MESSAGES: CopilotMessage[] = [
  {
    id: "welcome",
    sender: "bot",
    text: "أهلاً بك! أنا مُرافقك الأكاديمي الذكي 🎓. أعرف كل تفاصيل المنصة من معدلات التوجيهي، نسب التشغيل، حاسبة التكاليف، وحتى روابط الشهادات العالمية المجانية. كيف يمكنني مساعدتك الآن؟",
  },
];

const QUICK_ACTIONS = [
  { label: "حاسبة تكاليف الجامعة 💰", query: "أين أجد حاسبة تكاليف وميزانية الجامعة؟", link: "/dashboard" },
  { label: "شهادات هارفارد المجانية 🎓", query: "كيف أحصل على شهادات CS50 المجانية المعتمدة؟", link: "/certifications" },
  { label: "تخصصات الذكاء الاصطناعي 🤖", query: "ما مستقبل ونسب تشغيل الذكاء الاصطناعي والأمن السيبراني؟", link: "/majors" },
  { label: "مطابقة معدلي بالتوجيهي 🧭", query: "كيف أعرف التخصصات المناسبة لمعدلي وفرعي؟", link: "/dashboard" },
];

export function FloatingCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (userText: string, customLink?: string) => {
    const text = userText.trim();
    if (!text || isTyping) return;

    const userMsg: CopilotMessage = {
      id: String(Date.now()),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Call the server chat API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              parts: [
                {
                  type: "text",
                  text: `أنت المرافق الذكي السريع في زاوية منصة الطلاب والمستقبل الأردنية. أجب بإيجاز ذكي جداً ودود ومباشر (سطرين إلى 4 أسطر كحد أقصى) مع توجيهه للأقسام المناسبة بالمنصة (دليل التخصصات، الشهادات، لوحة التحكم، حاسبة التكاليف). سؤال الطالب: ${text}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          
          // Parse lines from TanStack/AI stream format or plain text
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const textPart = JSON.parse(line.slice(2));
                botResponse += textPart;
              } catch {
                // Ignore parse errors on raw stream fragments
              }
            } else if (!line.startsWith("d:") && !line.startsWith("e:")) {
              botResponse += line;
            }
          }
        }
      }

      const cleanResponse = botResponse.replace(/"/g, "").trim() || "يمكنك استكشاف هذا المسار مباشرة عبر أقسام المنصة أعلاه!";

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: cleanResponse,
          actionLink: customLink ? { to: customLink, label: "الانتقال للقسم الآن ⚡" } : undefined,
        },
      ]);
    } catch {
      // Fallback helpful message
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: "يسعدني مساعدتك! يمكنك فحص التخصصات مباشرة في دليل التخصصات أو استخدام لوحة تحكم الطالب لمطابقة معدلك وحساب التكاليف.",
          actionLink: customLink ? { to: customLink, label: "فتح الصفحة المطلوبة" } : { to: "/dashboard", label: "فتح لوحة التحكم" },
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 start-5 z-50 select-none">
      {/* Pop-up Chat Window */}
      {isOpen && (
        <div className="border-border bg-card text-foreground mb-3 flex h-[480px] w-[350px] sm:w-[380px] flex-col rounded-3xl border shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground flex items-center justify-between px-4 py-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 flex size-9 items-center justify-center rounded-2xl backdrop-blur-xs">
                <Bot className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold leading-tight">المرافق الذكي للمنصة</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  متصل ومستعد للمساعدة
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
              title="إغلاق النافذة"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Quick Shortcuts Pill Bar */}
          <div className="border-border/60 bg-surface/50 border-b p-2 overflow-x-auto">
            <div className="flex gap-1.5 w-max">
              {QUICK_ACTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSend(item.query, item.link)}
                  className="bg-card hover:bg-surface border-border text-foreground hover:border-primary/40 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`size-7 rounded-full flex shrink-0 items-center justify-center text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-2 text-foreground"
                  }`}
                >
                  {msg.sender === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-xs"
                      : "bg-surface-2 text-foreground rounded-tl-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.actionLink && (
                    <Link
                      to={msg.actionLink.to}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-flex items-center gap-1 font-bold text-primary dark:text-emerald-400 hover:underline pt-1 border-t border-border/40 w-full"
                    >
                      {msg.actionLink.label}
                      <ArrowLeft className="size-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Bot className="size-4 animate-spin text-primary" />
                <span>المرافق يكتب الإجابة…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="border-border bg-background flex items-center gap-2 border-t p-2.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اسأل المرافق عن أي شيء بالمنصة…"
              className="border-border bg-card w-full rounded-xl border px-3 py-2 text-xs focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 size-8 shrink-0 rounded-xl flex items-center justify-center transition-all shadow-xs"
            >
              <Send className="size-3.5 rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-primary text-primary-foreground hover:scale-105 active:scale-95 flex items-center gap-2.5 rounded-full px-4 py-3 shadow-2xl transition-all duration-300 font-bold text-xs cursor-pointer border-2 border-white/20"
        title="تحدث مع المرافق الذكي"
      >
        <span className="relative flex size-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-3 bg-emerald-500" />
        </span>
        <Sparkles className="size-4 group-hover:rotate-12 transition-transform" />
        <span>المرافق الذكي</span>
      </button>
    </div>
  );
}
