"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";

/** Rejects (or revokes) a B2B application with a reason, and removes the "b2b" role. */
export async function rejectApplication(id: string, reason: string): Promise<void> {
  await requireAdmin();
  const app = await prisma.businessApplication.findUniqueOrThrow({ where: { id } });
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(app.clerkUserId);
  if (user.publicMetadata.role === "b2b") {
    await clerk.users.updateUserMetadata(app.clerkUserId, { publicMetadata: { role: null } });
  }
  await prisma.businessApplication.update({
    where: { id },
    data: { status: "REJECTED", rejectReason: reason.trim().slice(0, 300) || null, reviewedAt: new Date() },
  });
  revalidatePath("/admin", "layout");
}
