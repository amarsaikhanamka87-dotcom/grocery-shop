"use server";

import { headers } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { createWireCheckout } from "@/lib/wire/createWireCheckout";
import { isDemoPayment } from "@/lib/wire/isDemoPayment";
import { checkoutSchema, type CheckoutInput } from "./checkoutSchema";
import { priceOrderLines } from "./priceOrderLines";

type Result = { url: string; orderId: string } | { error: string };

/**
 * Saves the order (UNPAID) with DB prices, creates a Wire.mn checkout for its total and returns
 * the Wire payment page URL. The order turns PAID only from the verified webhook.
 */
export async function placeOrder(input: CheckoutInput): Promise<Result> {
  const { userId } = await auth();
  if (!userId) return { error: "Захиалахын тулд нэвтэрнэ үү." };

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Мэдээллээ шалгана уу." };
  const f = parsed.data;

  const priced = await priceOrderLines(f.items);
  if ("error" in priced) return priced;

  const user = await currentUser();
  const deliveryFee = deliveryFeeFor(priced.subtotal, user?.publicMetadata.role === "b2b");
  const total = priced.subtotal + deliveryFee;

  const order = await prisma.order.create({
    data: {
      clerkUserId: userId,
      customerName: f.customerName || user?.fullName || "",
      phone: f.phone,
      district: f.district,
      address: f.address,
      note: f.note || null,
      deliveryType: f.deliveryType,
      deliveryDate: new Date(`${f.deliveryDate}T00:00:00Z`),
      deliverySlot: f.deliverySlot,
      paymentMethod: isDemoPayment() ? "DEMO" : "WIRE",
      subtotal: priced.subtotal,
      deliveryFee,
      total,
      items: { create: priced.lines },
    },
  });

  // No Wire key yet: pay on our demo page (no real money, but stock is really taken).
  if (isDemoPayment()) return { url: `/pay/demo/${order.id}`, orderId: order.id };

  const origin = (await headers()).get("origin") ?? "";
  try {
    const wire = await createWireCheckout({
      orderId: order.id,
      orderNumber: order.number,
      amount: total,
      successUrl: `${origin}/orders/${order.id}`,
      cancelUrl: `${origin}/orders/${order.id}`,
    });
    await prisma.order.update({
      where: { id: order.id },
      data: { wireIntentId: wire.intentId, wireCheckoutUrl: wire.url },
    });
    return { url: wire.url, orderId: order.id };
  } catch (err) {
    console.error("[wire] checkout failed", err);
    await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
    return { error: "Төлбөрийн систем түр ажиллахгүй байна. Дахин оролдоно уу." };
  }
}
