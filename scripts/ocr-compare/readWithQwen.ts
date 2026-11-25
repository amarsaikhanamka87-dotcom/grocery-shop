import { handwritingPrompt } from "../../src/lib/ocr/handwritingPrompt";

/**
 * Reads one photo with a Qwen vision model through Alibaba DashScope's OpenAI-compatible API.
 * Env: QWEN_API_KEY, optional QWEN_BASE_URL. Returns null on failure.
 */
export async function readWithQwen(model: string, imageBase64: string, mimeType: string): Promise<string | null> {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) return null;
  const baseUrl = process.env.QWEN_BASE_URL || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
              { type: "text", text: handwritingPrompt },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!response.ok) {
      console.error(`[qwen] ${model} rejected: HTTP ${response.status}`);
      return null;
    }
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error(`[qwen] ${model} call failed`, err);
    return null;
  }
}
