import "server-only";

export type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } };

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

/**
 * One Gemini generateContent call (REST, no SDK). Returns the answer text, or null when the key is
 * missing or the call fails; callers show a friendly message. Env: GEMINI_API_KEY.
 */
export async function callGemini(
  model: string,
  parts: GeminiPart[],
  generationConfig: Record<string, unknown> = {},
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[gemini] GEMINI_API_KEY is not set");
    return null;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ parts }], generationConfig }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!response.ok) {
      console.error(`[gemini] ${model} rejected: HTTP ${response.status}`);
      return null;
    }
    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
    return text || null;
  } catch (err) {
    console.error(`[gemini] ${model} call failed`, err);
    return null;
  }
}
