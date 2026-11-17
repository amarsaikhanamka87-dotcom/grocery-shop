"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";

/** Approves a B2B application and gives the user the "b2b" role (free delivery). */
export async function approveApplication(id: string): Promise<void> {
  await requireAdmin();
  const app = await prisma.businessApplication.findUniqueOrThrow({ where: { id } });
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(app.clerkUserId);
  // Never downgrade an admin to b2b.
  if (user.publicMetadata.role !== "admin") {
    await clerk.users.updateUserMetadata(app.clerkUserId, { publicMetadata: { role: "b2b" } });
  }
  await prisma.businessApplication.update({
    where: { id },
    data: { status: "APPROVED", rejectReason: null, reviewedAt: new Date() },
  });
  revalidatePath("/admin", "layout");
}
