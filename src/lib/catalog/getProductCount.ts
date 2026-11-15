import "server-only";
import { prisma } from "@/lib/prisma";

export async function getProductCount(): Promise<number> {
  return prisma.product.count();
}
