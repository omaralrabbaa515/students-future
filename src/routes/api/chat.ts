import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import { getAiModel } from "@/lib/ai-gateway.server";
import {
  buildAdvisorSystemPrompt,
  type AdvisorPersona,
  type AdvisorStudentContext,
} from "@/lib/advisor-prompt";
import { generateLocalAdvisorResponse } from "@/lib/local-advisor-ai";

type ChatRequestBody = {
  messages?: unknown;
  persona?: AdvisorPersona;
  studentContext?: AdvisorStudentContext;
  apiKey?: string;
};

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

/** توليد دفق استجابة محلي ذكي مستند إلى بيانات المنصة عند عدم توفر مفتاح خارجي */
function createLocalSmartStreamResponse(
  userQuery: string,
  persona?: AdvisorPersona,
  studentContext?: AdvisorStudentContext,
  originalMessages?: UIMessage[],
) {
  const fullText = generateLocalAdvisorResponse(userQuery, persona, studentContext);

  const stream = createUIMessageStream({
    originalMessages,
    execute({ writer }) {
      const partId = `part-${Date.now()}`;
      writer.write({ type: "text-start", id: partId });

      // Split text into words to simulate smooth AI streaming
      const words = fullText.split(" ");
      for (let i = 0; i < words.length; i += 3) {
        const chunk = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
        writer.write({
          type: "text-delta",
          id: partId,
          delta: chunk,
        });
      }

      writer.write({ type: "text-end", id: partId });
    },
  });

  return createUIMessageStreamResponse({ stream });
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
        if (!messages || messages.length === 0) {
          return new Response("الرسائل غير صالحة", { status: 400 });
        }

        // Extract last user message text
        const lastMsg = messages[messages.length - 1];
        const lastUserText =
          lastMsg.parts
            ?.map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim() || "";

        // Check for custom key in header or body
        const headerKey =
          request.headers.get("x-gemini-key") || request.headers.get("x-api-key");
        const customKey = body.apiKey || headerKey || undefined;

        const model = getAiModel(customKey);

        // If no remote AI key is configured, use local intelligent response engine
        if (!model) {
          return createLocalSmartStreamResponse(
            lastUserText,
            body.persona,
            body.studentContext,
            messages,
          );
        }

        try {
          const systemPrompt = buildAdvisorSystemPrompt(body.persona, body.studentContext);

          const result = streamText({
            model,
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
          });
        } catch (error) {
          console.error("[AI Chat API] Remote model error, falling back to local engine:", error);
          // Graceful fallback to local engine instead of throwing 500
          return createLocalSmartStreamResponse(
            lastUserText,
            body.persona,
            body.studentContext,
            messages,
          );
        }
      },
    },
  },
});
