import "server-only";
import type { BusinessApplication } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getMyApplication(clerkUserId: string): Promise<BusinessApplication | null> {
  return prisma.businessApplication.findUnique({ where: { clerkUserId } });
}
