"use server";

import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { monthlyOrderSchema, type MonthlyOrderInput } from "./monthlyOrderSchema";

/** Saves the B2B customer's monthly list (replaces all items). B2B role is checked on the server. */
export async function saveMonthlyOrder(input: MonthlyOrderInput): Promise<{ error?: string }> {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  if (!userId || user?.publicMetadata.role !== "b2b") return { error: "Зөвхөн B2B хэрэглэгч хадгална." };

  const parsed = monthlyOrderSchema.safeParse(input);
  if (!parsed.success) return { error: "Мэдээлэл буруу байна. Тоо хэмжээгээ шалгана уу." };
  const { dayOfMonth, active, items } = parsed.data;

  // Each product's own minimum order still applies.
  const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });
  const tooSmall = items.find((i) => (products.find((p) => p.id === i.productId)?.minQty ?? Infinity) > i.quantity);
  if (tooSmall || products.length !== items.length) return { error: "Бүтээгдэхүүний хамгийн бага захиалгаас бага байна." };

  await prisma.$transaction(async (tx) => {
    const order = await tx.standingOrder.upsert({
      where: { clerkUserId: userId },
      create: { clerkUserId: userId, dayOfMonth, active },
      update: { dayOfMonth, active },
    });
    await tx.standingOrderItem.deleteMany({ where: { standingOrderId: order.id } });
    await tx.standingOrderItem.createMany({ data: items.map((i) => ({ standingOrderId: order.id, ...i })) });
  });
  revalidatePath("/business");
  return {};
}
