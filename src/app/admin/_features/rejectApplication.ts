"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

const RejectInput = z.object({ id: idSchema, reason: z.string().trim().max(300) });

/** Rejects (or revokes) a B2B application with a reason, and removes the "b2b" role. */
export async function rejectApplication(applicationId: string, reason: string): Promise<{ error: string | null }> {
  await requireAdmin();
  const parsed = RejectInput.safeParse({ id: applicationId, reason });
  if (!parsed.success) return { error: "Шалтгаан 300 тэмдэгтээс хэтрэхгүй байна." };

  const application = await prisma.businessApplication.findUnique({ where: { id: parsed.data.id } });
  if (!application) return { error: "Хүсэлт олдсонгүй." };

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(application.clerkUserId);
    if (user.publicMetadata.role === "b2b") {
      await clerk.users.updateUserMetadata(application.clerkUserId, { publicMetadata: { role: null } });
    }
  } catch (err) {
    console.error("[admin] reject: Clerk failed", err);
    return { error: "Эрх хасаж чадсангүй. Дахин оролдоно уу." };
  }

  await prisma.businessApplication.update({
    where: { id: parsed.data.id },
    data: { status: "REJECTED", rejectReason: parsed.data.reason || null, reviewedAt: new Date() },
  });
  revalidatePath("/admin", "layout");
  return { error: null };
}
