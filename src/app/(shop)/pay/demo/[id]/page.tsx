import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMyOrder } from "@/lib/orders/getMyOrder";
import { isDemoPayment } from "@/lib/wire/isDemoPayment";
import { DemoPayCard } from "./_components/DemoPayCard";

export const metadata: Metadata = { title: "Төлбөр (демо)" };

export default async function DemoPayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isDemoPayment()) notFound();
  const { userId } = await auth();
  if (!userId) redirect(`/sign-in?redirect_url=/pay/demo/${id}`);

  const order = await getMyOrder(id, userId);
  if (!order || order.paymentMethod !== "DEMO") notFound();
  if (order.paymentStatus === "PAID" || order.status === "CANCELLED") redirect(`/orders/${id}`);

  return (
    <div className="container-x grid max-w-md pt-10">
      <DemoPayCard orderId={order.id} number={order.number} total={order.total} lines={order.items.length} />
    </div>
  );
}
