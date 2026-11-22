"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

/** Approves a B2B application and gives the user the "b2b" role (free delivery). */
export async function approveApplication(applicationId: string): Promise<{ error: string | null }> {
  await requireAdmin();
  const id = idSchema.safeParse(applicationId);
  if (!id.success) return { error: "Хүсэлт олдсонгүй." };

  const application = await prisma.businessApplication.findUnique({ where: { id: id.data } });
  if (!application) return { error: "Хүсэлт олдсонгүй." };

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(application.clerkUserId);
    // Never downgrade an admin to b2b.
    if (user.publicMetadata.role !== "admin") {
      await clerk.users.updateUserMetadata(application.clerkUserId, { publicMetadata: { role: "b2b" } });
    }
  } catch (err) {
    console.error("[admin] approve: Clerk failed", err);
    return { error: "Эрх өгч чадсангүй. Дахин оролдоно уу." };
  }

  await prisma.businessApplication.update({
    where: { id: id.data },
    data: { status: "APPROVED", rejectReason: null, reviewedAt: new Date() },
  });
  revalidatePath("/admin", "layout");
  return { error: null };
}
