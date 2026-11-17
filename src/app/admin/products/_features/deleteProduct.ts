"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";

/**
 * Deletes a product. Past order lines keep their copied name/price (productId → null);
 * the product is removed from B2B monthly order lists (cascade).
 */
export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  await prisma.product.deleteMany({ where: { id } });
  revalidatePath("/", "layout");
}
