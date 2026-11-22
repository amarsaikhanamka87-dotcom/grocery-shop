"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

/**
 * Deletes a product. Past order lines keep their copied name/price (productId → null);
 * the product is removed from B2B monthly order lists (cascade).
 */
export async function deleteProduct(productId: string): Promise<void> {
  await requireAdmin();
  const id = idSchema.safeParse(productId);
  if (!id.success) return;
  await prisma.product.deleteMany({ where: { id: id.data } });
  revalidatePath("/", "layout");
}
