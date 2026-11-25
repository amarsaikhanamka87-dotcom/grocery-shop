import "server-only";
import { z } from "zod";
import { callGemini } from "@/lib/ai/callGemini";
import { orderMatchPrompt } from "./orderMatchPrompt";

type MatchProduct = { id: string; name: string; unit: string };

const answerSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(10_000) })),
  unmatched: z.array(z.string()),
});

export type OrderMatch = z.infer<typeof answerSchema>;

// Gemini structured output: forces this JSON shape.
const responseSchema = {
  type: "OBJECT",
  properties: {
    items: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { productId: { type: "STRING" }, quantity: { type: "INTEGER" } },
        required: ["productId", "quantity"],
      },
    },
    unmatched: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["items", "unmatched"],
};

/**
 * Turns handwritten order text into product lines from our catalog. Ids the model made up are
 * dropped; returns null when the call fails.
 */
export async function matchOrderLines(model: string, text: string, products: MatchProduct[]): Promise<OrderMatch | null> {
  const answer = await callGemini(
    model,
    [{ text: `${orderMatchPrompt}\n\nБүтээгдэхүүн:\n${JSON.stringify(products)}\n\nЗахиалга:\n${text}` }],
    { temperature: 0, responseMimeType: "application/json", responseSchema },
  );
  if (!answer) return null;
  try {
    const parsed = answerSchema.safeParse(JSON.parse(answer));
    if (!parsed.success) return null;
    const knownIds = new Set(products.map((product) => product.id));
    return { ...parsed.data, items: parsed.data.items.filter((item) => knownIds.has(item.productId)) };
  } catch {
    return null;
  }
}
