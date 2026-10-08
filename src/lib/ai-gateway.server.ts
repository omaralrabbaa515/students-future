import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

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

/** استرجاع نموذج الذكاء الاصطناعي المناسب بناءً على المفاتيح المتوفرة */
export function getAvailableAiModel(customKey?: string) {
  const lovableKey = customKey || process.env["LOVABLE_API_KEY"];
  if (lovableKey) {
    const provider = createLovableAiGatewayProvider(lovableKey);
    return provider("google/gemini-2.5-flash");
  }

  const geminiKey = process.env["GEMINI_API_KEY"] || process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
  if (geminiKey) {
    const provider = createOpenAICompatible({
      name: "gemini",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: geminiKey,
    });
    return provider("gemini-2.5-flash");
  }

  const openAiKey = process.env["OPENAI_API_KEY"];
  if (openAiKey) {
    const provider = createOpenAICompatible({
      name: "openai",
      baseURL: "https://api.openai.com/v1",
      apiKey: openAiKey,
    });
    return provider("gpt-4o-mini");
  }

  return null;
}
