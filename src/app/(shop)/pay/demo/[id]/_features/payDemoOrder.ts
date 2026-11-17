"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { isDemoPayment } from "@/lib/wire/isDemoPayment";
import { getMyOrder } from "@/lib/orders/getMyOrder";
import { payOrder } from "@/lib/orders/payOrder";

/** Demo only (no WIRE_API_KEY): the buyer "pays" their own unpaid order; stock is taken for real. */
export async function payDemoOrder(orderId: string): Promise<void> {
  const { userId } = await auth();
  if (!userId || !isDemoPayment()) redirect("/");

  const order = await getMyOrder(orderId, userId);
  if (!order || order.status === "CANCELLED" || order.paymentMethod !== "DEMO") redirect("/");

  await payOrder(order.id);
  revalidatePath("/", "layout"); // product pages and admin show the new stock
  redirect(`/orders/${order.id}`);
}
