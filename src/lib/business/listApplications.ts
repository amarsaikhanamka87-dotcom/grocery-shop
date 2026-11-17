import "server-only";
import type { BusinessApplication } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** Admin list: pending first, then newest. */
export async function listApplications(): Promise<BusinessApplication[]> {
  const rows = await prisma.businessApplication.findMany({ orderBy: { createdAt: "desc" } });
  const pendingFirst = (s: string) => (s === "PENDING" ? 0 : 1);
  return rows.sort((a, b) => pendingFirst(a.status) - pendingFirst(b.status));
}
