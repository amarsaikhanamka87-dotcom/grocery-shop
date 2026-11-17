import "server-only";
import { prisma } from "@/lib/prisma";

export async function countPendingApplications(): Promise<number> {
  return prisma.businessApplication.count({ where: { status: "PENDING" } });
}
