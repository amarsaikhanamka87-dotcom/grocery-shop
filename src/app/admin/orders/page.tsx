import type { Metadata } from "next";
import { ReceiptText } from "lucide-react";
import { cancelExpiredTransfers } from "@/lib/orders/cancelExpiredTransfers";
import { countAdminOrderViews } from "@/lib/orders/countAdminOrderViews";
import { listAdminOrders } from "@/lib/orders/listAdminOrders";
import type { OrderKind, OrderView } from "@/types/orders";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { OrderViewTabs } from "./_components/OrderViewTabs";
import { OrderKindSwitch } from "./_components/OrderKindSwitch";
import { AdminOrderRow } from "./_components/AdminOrderRow";
import { groupOrdersByHandOverDay } from "./_features/groupOrdersByHandOverDay";
import { ORDER_VIEWS } from "./_features/orderViews";

export const metadata: Metadata = { title: "Захиалга" };

type Params = Promise<{ view?: string; type?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminOrdersPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const view: OrderView = ORDER_VIEWS.find((v) => v.value === params.view)?.value ?? "todo";
  const type: OrderKind = params.type === "delivery" || params.type === "pickup" ? params.type : "";

  await cancelExpiredTransfers();
  const [orders, counts] = await Promise.all([listAdminOrders(view, type), countAdminOrderViews(type)]);

  return (
    <>
      <AdminPageHeader title="Захиалга" />
      <div className="mt-4 grid gap-3">
        <OrderViewTabs view={view} type={type} counts={counts} />
        <OrderKindSwitch view={view} type={type} />
      </div>
      <section className="card mt-4 overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
            <ReceiptText className="size-8" />
            Энд захиалга алга.
          </div>
        ) : (
          groupOrdersByHandOverDay(orders).map((group) => (
            <section key={group.key} aria-label={group.title}>
              <h2 className="border-b border-line bg-cream px-4 py-2 text-[14px] font-extrabold sm:px-5">
                {group.title} <span className="font-semibold text-muted-foreground">· {group.orders.length} захиалга</span>
              </h2>
              <ul className="divide-y divide-line">
                {group.orders.map((order) => (
                  <AdminOrderRow key={order.id} order={order} />
                ))}
              </ul>
            </section>
          ))
        )}
      </section>
    </>
  );
}
