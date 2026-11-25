import "server-only";
import { callGemini } from "@/lib/ai/callGemini";
import { handwritingPrompt } from "./handwritingPrompt";

/**
 * Sends one photo to Gemini and returns the handwritten text it read, or null on failure.
 * Low temperature: copy what is written, don't invent.
 */
export function readHandwrittenImage(model: string, imageBase64: string, mimeType: string): Promise<string | null> {
  return callGemini(
    model,
    [{ inline_data: { mime_type: mimeType, data: imageBase64 } }, { text: handwritingPrompt }],
    { temperature: 0.1 },
  );
}
