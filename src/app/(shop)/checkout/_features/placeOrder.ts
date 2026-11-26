"use server";

import { headers } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { PICKUP_POINT } from "@/lib/constants";
import { createWireCheckout } from "@/lib/wire/createWireCheckout";
import { checkoutSchema, type CheckoutInput } from "./checkoutSchema";
import { priceOrderLines } from "./priceOrderLines";
import { cancelExpiredTransfers } from "@/lib/orders/cancelExpiredTransfers";
import { createOrderHoldingStock } from "./createOrderHoldingStock";

type Result = { url: string; orderId: string } | { error: string };

export async function placeOrder(input: CheckoutInput): Promise<Result> {
  const { userId } = await auth();
  if (!userId) return { error: "Захиалахын тулд нэвтэрнэ үү." };

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success)
    return {
      error: parsed.error.issues[0]?.message ?? "Мэдээллээ шалгана уу.",
    };
  const f = parsed.data;

  await cancelExpiredTransfers(); // frees stock held by unpaid transfers older than 24 h
  const priced = await priceOrderLines(f.items);
  if ("error" in priced) return priced;

  const user = await currentUser();
  const pickup = f.deliveryType === "pickup";
  const deliveryFee = pickup
    ? 0
    : deliveryFeeFor(priced.subtotal, user?.publicMetadata.role === "b2b");
  const total = priced.subtotal + deliveryFee;

  const data: Prisma.OrderCreateInput = {
    clerkUserId: userId,
    customerName: f.customerName || user?.fullName || "",
    phone: f.phone,
    email: user?.primaryEmailAddress?.emailAddress ?? null,

    companyRegNo: f.invoiceType === "company" ? f.companyRegNo : null,
    companyName: f.invoiceType === "company" ? f.companyName : null,

    district: pickup ? PICKUP_POINT.district : f.district,
    address: pickup ? PICKUP_POINT.detail : f.address,
    note: f.note || null,
    deliveryType: f.deliveryType,
    deliveryDate: new Date(`${f.deliveryDate}T00:00:00Z`),
    deliverySlot: f.deliverySlot,
    ...(f.deliveryType === "recurring" &&
      f.recurrence && {
        recurrence: f.recurrence.frequency,
        recurrenceDays: f.recurrence.days,
        recurrenceStart: new Date(`${f.recurrence.start}T00:00:00Z`),
        recurrenceEnd: new Date(`${f.recurrence.end}T00:00:00Z`),
      }),
    paymentMethod: f.paymentMethod,
    subtotal: priced.subtotal,
    deliveryFee,
    total,
    items: { create: priced.lines },
  };

  // Bank transfer: hold the stock now; no Wire page, the order page shows the account and code.
  if (f.paymentMethod === "TRANSFER") {
    try {
      const held = await createOrderHoldingStock(data);
      if (!held) return { error: "Зарим бүтээгдэхүүн дөнгөж сая дууссан байна. Сагсаа шинэчилнэ үү." };
      return { url: `/orders/${held.id}`, orderId: held.id };
    } catch (err) {
      console.error("[transfer] order not saved", err);
      return { error: "Захиалга хадгалж чадсангүй. Дахин оролдоно уу." };
    }
  }

  const order = await prisma.order.create({ data });

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
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });
    return {
      error: "Төлбөрийн систем түр ажиллахгүй байна. Дахин оролдоно уу.",
    };
  }
}
