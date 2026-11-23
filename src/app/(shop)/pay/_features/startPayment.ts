"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getMyOrder } from "@/lib/orders/getMyOrder";
import { createWireCheckout } from "@/lib/wire/createWireCheckout";
import { idSchema } from "@/lib/validation/idSchema";

type PayState = { error: string | null };

export async function startPayment(orderId: string): Promise<PayState> {
  const id = idSchema.safeParse(orderId);
  if (!id.success) return { error: "Захиалга олдсонгүй." };

  const { userId } = await auth();
  if (!userId) return { error: "Төлөхийн тулд нэвтэрнэ үү." };

  const order = await getMyOrder(id.data, userId);
  if (!order) return { error: "Захиалга олдсонгүй." };
  if (order.paymentStatus === "PAID" || order.status === "CANCELLED")
    redirect(`/orders/${order.id}`);
  if (order.wireCheckoutUrl) redirect(order.wireCheckoutUrl);

  const origin = (await headers()).get("origin") ?? "";
  let checkoutUrl: string;
  try {
    const wire = await createWireCheckout({
      orderId: order.id,
      orderNumber: order.number,
      amount: order.total,
      successUrl: `${origin}/orders/${order.id}`,
      cancelUrl: `${origin}/orders/${order.id}`,
    });
    await prisma.order.update({
      where: { id: order.id },
      data: { wireIntentId: wire.intentId, wireCheckoutUrl: wire.url },
    });
    checkoutUrl = wire.url;
  } catch (err) {
    console.error("[wire] pay page checkout failed", err);
    return {
      error: "Төлбөрийн систем түр ажиллахгүй байна. Дахин оролдоно уу.",
    };
  }
  redirect(checkoutUrl);
}
