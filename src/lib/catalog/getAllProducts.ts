import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

export async function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany({ orderBy: { name: "asc" } });
}
