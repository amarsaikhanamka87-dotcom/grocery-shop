"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { scanTextSchema, type ScanTextInput } from "./scanTextSchema";

type Result = { ok: true } | { ok: false; error: string };

/** "Хадгалах": stores the admin's corrected text on the scan. */
export async function saveScanText(input: ScanTextInput): Promise<Result> {
  await requireAdmin();
  const parsed = scanTextSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Текст хоосон эсвэл хэт урт байна." };
  try {
    await prisma.handwritingScan.update({
      where: { id: parsed.data.scanId },
      data: { finalText: parsed.data.text },
    });
  } catch (err) {
    console.error("[ocr] could not save text", err);
    return { ok: false, error: "Хадгалж чадсангүй. Дахин оролдоно уу." };
  }
  revalidatePath("/admin/handwriting");
  return { ok: true };
}
