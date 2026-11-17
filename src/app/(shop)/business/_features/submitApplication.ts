"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { FormState } from "@/types/forms";
import { applicationSchema } from "./applicationSchema";

/** Saves (or re-sends after a rejection) the signed-in user's B2B application as PENDING. */
export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries([...formData].filter(([k]) => !k.startsWith("$"))) as Record<string, string>;
  const { userId } = await auth();
  if (!userId) return { values, error: "Нэвтэрч орно уу." };

  const parsed = applicationSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { values, fieldErrors };
  }

  const existing = await prisma.businessApplication.findUnique({ where: { clerkUserId: userId } });
  if (existing && existing.status !== "REJECTED") return { values, error: "Хүсэлт аль хэдийн илгээгдсэн байна." };

  const data = { ...parsed.data, address: parsed.data.address || null, status: "PENDING" as const };
  await prisma.businessApplication.upsert({
    where: { clerkUserId: userId },
    create: { clerkUserId: userId, ...data },
    update: { ...data, rejectReason: null, reviewedAt: null },
  });
  revalidatePath("/business");
  return { ok: true };
}
