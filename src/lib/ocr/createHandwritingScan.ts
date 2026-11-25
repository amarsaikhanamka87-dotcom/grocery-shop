import "server-only";
import { prisma } from "@/lib/prisma";

/** Saves what the model read from one photo; returns the new scan's id. */
export async function createHandwritingScan(adminUserId: string, model: string, readText: string): Promise<string> {
  const scan = await prisma.handwritingScan.create({
    data: { adminUserId, model, readText },
    select: { id: true },
  });
  return scan.id;
}
