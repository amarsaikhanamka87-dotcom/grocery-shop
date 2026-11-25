import type { Metadata } from "next";
import { ReceiptText } from "lucide-react";
import { listAdminOrders } from "@/lib/orders/listAdminOrders";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { OrderFilterTabs } from "./_components/OrderFilterTabs";
import { AdminOrderRow } from "./_components/AdminOrderRow";
import { groupOrdersByDay } from "./_features/groupOrdersByDay";

export const metadata: Metadata = { title: "Захиалга" };

type Params = Promise<{ pay?: string; type?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminOrdersPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const pay = ["paid", "unpaid", "delivered"].includes(params.pay ?? "") ? (params.pay ?? "") : "";
  const type = params.type === "delivery" || params.type === "pickup" ? params.type : "";
  const orders = await listAdminOrders({
    payment: pay === "paid" ? "PAID" : pay === "unpaid" ? "UNPAID" : undefined,
    method: type || undefined,
    delivered: pay === "delivered",
  });

  return (
    <>
      <AdminPageHeader title="Захиалга" description="Онлайн захиалга, өдрөөр нь. Захиалга дээр дарж дэлгэрэнгүйг харна." />
      <section className="card mt-6 overflow-hidden">
        <OrderFilterTabs pay={pay} type={type} count={orders.length} />
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
            <ReceiptText className="size-8" />
            Захиалга алга.
          </div>
        ) : (
          groupOrdersByDay(orders).map((group) => (
            <section key={group.key} aria-label={group.title}>
              <h2 className="border-b border-line bg-cream px-4 py-2 text-[14px] font-extrabold sm:px-5">
                {group.title} <span className="font-semibold text-muted-foreground">· {group.orders.length} захиалга</span>
              </h2>
              <ul className="divide-y divide-line">
                {group.orders.map((o) => (
                  <AdminOrderRow key={o.id} order={o} />
                ))}
              </ul>
            </section>
          ))
        )}
      </section>
    </>
  );
}
