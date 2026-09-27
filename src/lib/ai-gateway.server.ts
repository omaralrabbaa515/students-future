import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * مزود ذكاء اصطناعي متعدد ومرن لا يعتمد حصراً على مزود واحد:
 * - يدعم Google Gemini عبر GEMINI_API_KEY أو المفتاح المخصص
 * - يدعم OpenAI عبر OPENAI_API_KEY
 * - يدعم Groq عبر GROQ_API_KEY
 * - يدعم Lovable AI Gateway عبر LOVABLE_API_KEY كخيار بديل
 */
export function getAiModel(customKey?: string) {
  const geminiKey =
    customKey ||
    process.env["GEMINI_API_KEY"] ||
    process.env["GOOGLE_GENERATIVE_AI_API_KEY"];

  if (geminiKey) {
    const provider = createOpenAICompatible({
      name: "google",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      headers: {
        Authorization: `Bearer ${geminiKey}`,
      },
    });
    return provider("gemini-2.5-flash");
  }

  const openAiKey = process.env["OPENAI_API_KEY"];
  if (openAiKey) {
    const provider = createOpenAICompatible({
      name: "openai",
      baseURL: "https://api.openai.com/v1",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
      },
    });
    return provider("gpt-4o-mini");
  }

  const groqKey = process.env["GROQ_API_KEY"];
  if (groqKey) {
    const provider = createOpenAICompatible({
      name: "groq",
      baseURL: "https://api.groq.com/openai/v1",
      headers: {
        Authorization: `Bearer ${groqKey}`,
      },
    });
    return provider("llama-3.3-70b-versatile");
  }

  const lovableKey = process.env["LOVABLE_API_KEY"];
  if (lovableKey) {
    const provider = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: {
        "Lovable-API-Key": lovableKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });
    return provider("google/gemini-2.5-flash");
  }

  return null;
}

export function createLovableAiGatewayProvider(lovableApiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
