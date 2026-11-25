import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getMyOrder } from "@/lib/orders/getMyOrder";
import { idSchema } from "@/lib/validation/idSchema";
import { PayCard } from "./_components/PayCard";
import { requirePaySignIn } from "./_middleware/requirePaySignIn";

export const metadata: Metadata = { title: "Төлбөр" };

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const orderId = idSchema.safeParse((await searchParams).order);
  if (!orderId.success) notFound();

  const userId = await requirePaySignIn(orderId.data);

  const order = await getMyOrder(orderId.data, userId);
  if (!order) notFound();
  if (order.paymentStatus === "PAID" || order.status === "CANCELLED")
    redirect(`/orders/${order.id}`);
  if (order.wireCheckoutUrl) redirect(order.wireCheckoutUrl);

  return (
    <div className="container-x grid max-w-md pt-10">
      <PayCard
        orderId={order.id}
        orderNumber={order.number}
        total={order.total}
        lineCount={order.items.length}
      />
    </div>
  );
}
