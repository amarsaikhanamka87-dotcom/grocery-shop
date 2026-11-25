"use server";

import { revalidatePath } from "next/cache";
import { PICKUP_POINT } from "@/lib/constants";
import { payOrder } from "@/lib/orders/payOrder";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { storeSaleSchema, type StoreSaleInput } from "./storeSaleSchema";

type Result =
  | { ok: true; orderNumber: number; total: number; receiptId: string | null }
  | { ok: false; error: string };

/**
 * POS "Төлбөр авах": saves a walk-in sale as an Order (deliveryType "store", already handed over)
 * priced from the DB, then pays it through payOrder, which issues the receipt and takes the stock.
 * So the sale counts in the dashboard income like any paid order.
 */
export async function recordStoreSale(input: StoreSaleInput): Promise<Result> {
  await requireAdmin();
  const parsed = storeSaleSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Сагс хоосон эсвэл тоо буруу байна." };

  // The same product twice in the list → one line.
  const quantities = new Map<string, number>();
  for (const item of parsed.data.items) {
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
  }

  try {
    const products = await prisma.product.findMany({
      where: { id: { in: [...quantities.keys()] } },
      select: { id: true, name: true, image: true, unit: true, price: true, stock: true },
    });
    if (products.length !== quantities.size) return { ok: false, error: "Зарим бараа олдсонгүй. Хуудсаа шинэчилнэ үү." };

    const short = products.find((p) => (quantities.get(p.id) ?? 0) > p.stock);
    if (short) return { ok: false, error: `${short.name}: үлдэгдэл ${short.stock} л байна.` };

    const items = products.map((p) => ({
      productId: p.id,
      name: p.name,
      image: p.image,
      unit: p.unit,
      price: p.price,
      quantity: quantities.get(p.id) ?? 0,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        customerName: parsed.data.customerName || "Дэлгүүрийн худалдан авагч",
        phone: "",
        district: PICKUP_POINT.district,
        address: PICKUP_POINT.detail,
        deliverySlot: "",
        deliveryType: "store",
        paymentMethod: parsed.data.paymentMethod,
        status: "DELIVERED",
        subtotal: total,
        deliveryFee: 0,
        total,
        items: { create: items },
      },
      select: { id: true, number: true },
    });
    const paid = await payOrder(order.id);
    if (!paid) return { ok: false, error: "Төлбөр бүртгэж чадсангүй. Дахин оролдоно уу." };

    const receipt = await prisma.receipt.findUnique({ where: { orderId: order.id }, select: { id: true } });
    revalidatePath("/admin/physical-store");
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    return { ok: true, orderNumber: order.number, total, receiptId: receipt?.id ?? null };
  } catch (err) {
    console.error("[pos] store sale failed", err);
    return { ok: false, error: "Борлуулалт хадгалж чадсангүй. Дахин оролдоно уу." };
  }
}
