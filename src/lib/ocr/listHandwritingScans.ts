import "server-only";
import { prisma } from "@/lib/prisma";

/** The latest handwriting scans, newest first, for the list under /admin/handwriting. */
export function listHandwritingScans(limit = 20) {
  return prisma.handwritingScan.findMany({
    select: { id: true, model: true, readText: true, finalText: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type HandwritingScanRow = Awaited<ReturnType<typeof listHandwritingScans>>[number];
