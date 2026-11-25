"use server";

import { ocrModel } from "@/lib/ai/ocrModel";
import { getPosProducts } from "@/lib/catalog/getPosProducts";
import { matchOrderLines } from "@/lib/ocr/matchOrderLines";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { saveScanText } from "./saveScanText";
import { scanTextSchema, type ScanTextInput } from "./scanTextSchema";

type Result =
  | { ok: true; bill: string; matchedCount: number; unmatched: string[] }
  | { ok: false; error: string };

/**
 * "Касс руу оруулах": saves the text, matches its lines to our products with Gemini and returns
 * the bill for the Касс URL ("productId:qty,productId:qty").
 */
export async function sendScanToPos(input: ScanTextInput): Promise<Result> {
  await requireAdmin();
  const parsed = scanTextSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Текст хоосон эсвэл хэт урт байна." };

  await saveScanText(parsed.data);
  try {
    const products = await getPosProducts();
    const match = await matchOrderLines(
      ocrModel(),
      parsed.data.text,
      products.map(({ id, name, unit }) => ({ id, name, unit })),
    );
    if (!match) return { ok: false, error: "Бараа тааруулж чадсангүй. Дахин оролдоно уу." };
    if (match.items.length === 0) return { ok: false, error: "Текстээс манай бараа олдсонгүй." };
    const bill = match.items.map((item) => `${item.productId}:${item.quantity}`).join(",");
    return { ok: true, bill, matchedCount: match.items.length, unmatched: match.unmatched };
  } catch (err) {
    console.error("[ocr] could not match order", err);
    return { ok: false, error: "Бараа тааруулж чадсангүй. Дахин оролдоно уу." };
  }
}
