"use server";

import { z } from "zod";
import { ocrModel } from "@/lib/ai/ocrModel";
import { createHandwritingScan } from "@/lib/ocr/createHandwritingScan";
import { readHandwrittenImage } from "@/lib/ocr/readHandwrittenImage";
import { requireAdmin } from "@/lib/roles/requireAdmin";

const imageSchema = z.object({
  // Base64 without the "data:" prefix; the browser shrinks photos, so ~1.3 MB is plenty.
  imageBase64: z.string().min(100).max(1_400_000).regex(/^[A-Za-z0-9+/=]+$/),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
});

type Result = { ok: true; text: string; scanId: string | null } | { ok: false; error: string };

/** "Текст болгох": admin only, reads a handwritten photo with Gemini and saves the result. */
export async function readHandwriting(input: z.infer<typeof imageSchema>): Promise<Result> {
  const adminUserId = await requireAdmin();
  const parsed = imageSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Зураг буруу эсвэл хэт том байна." };

  const model = ocrModel();
  const text = await readHandwrittenImage(model, parsed.data.imageBase64, parsed.data.mimeType);
  if (!text) return { ok: false, error: "Зургийг уншиж чадсангүй. Дахин оролдоно уу." };

  // The text is still useful when saving fails; the page then just can't store edits.
  try {
    return { ok: true, text, scanId: await createHandwritingScan(adminUserId, model, text) };
  } catch (err) {
    console.error("[ocr] could not save scan", err);
    return { ok: true, text, scanId: null };
  }
}
