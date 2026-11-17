import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMyOrder } from "@/lib/orders/getMyOrder";
import { syncWirePayment } from "@/lib/orders/syncWirePayment";
import { PaymentStatusCard } from "./_components/PaymentStatusCard";
import { OrderDetails } from "./_components/OrderDetails";

export const metadata: Metadata = { title: "Захиалга" };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect(`/sign-in?redirect_url=/orders/${id}`);

  let order = await getMyOrder(id, userId);
  if (!order) notFound();

  // Back from Wire but the webhook is late: ask Wire directly once.
  if (order.paymentStatus === "UNPAID" && order.wireIntentId && order.status !== "CANCELLED") {
    if (await syncWirePayment(order.wireIntentId)) order = (await getMyOrder(id, userId)) ?? order;
  }

  return (
    <div className="container-x grid max-w-3xl gap-6 pt-8">
      <h1 className="text-[30px] font-extrabold tracking-[-0.03em] sm:text-[38px]">Захиалга #{order.number}</h1>
      <PaymentStatusCard
        paid={order.paymentStatus === "PAID"}
        cancelled={order.status === "CANCELLED"}
        total={order.total}
        checkoutUrl={order.wireCheckoutUrl ?? (order.paymentMethod === "DEMO" ? `/pay/demo/${order.id}` : null)}
      />
      <OrderDetails order={order} />
    </div>
  );
}
