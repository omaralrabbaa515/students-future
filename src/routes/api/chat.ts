import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { ADVISOR_SYSTEM_PROMPT } from "@/lib/advisor-prompt";

type ChatRequestBody = { messages?: unknown };

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 4000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

/** التحقق من الرسائل القادمة: أدوار مسموحة فقط، وحد أقصى للعدد والطول */
function sanitizeMessages(input: unknown): UIMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    return null;
  }
  const cleaned: UIMessage[] = [];
  for (const raw of input) {
    if (typeof raw !== "object" || raw === null) return null;
    const msg = raw as Record<string, unknown>;
    if (typeof msg["role"] !== "string" || !ALLOWED_ROLES.has(msg["role"])) return null;
    if (!Array.isArray(msg["parts"])) return null;
    let chars = 0;
    for (const part of msg["parts"] as unknown[]) {
      if (typeof part !== "object" || part === null) return null;
      const p = part as Record<string, unknown>;
      if (p["type"] === "text" && typeof p["text"] === "string") {
        chars += p["text"].length;
      }
    }
    if (chars > MAX_MESSAGE_CHARS) return null;
    cleaned.push(raw as UIMessage);
  }
  return cleaned;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("طلب غير صالح", { status: 400 });
        }

        const messages = sanitizeMessages(body.messages);
        if (!messages) {
          return new Response("الرسائل غير صالحة", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("مفتاح خدمة الذكاء الاصطناعي غير مهيأ", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3.8-flash"),
          system: ADVISOR_SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
        });
      },
    },
  },
});
