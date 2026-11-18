import type { Metadata } from "next";
import { ReceiptText } from "lucide-react";
import { listAdminOrders } from "@/lib/orders/listAdminOrders";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { OrderFilterTabs } from "./_components/OrderFilterTabs";
import { AdminOrderRow } from "./_components/AdminOrderRow";

export const metadata: Metadata = { title: "Захиалга" };

type Params = Promise<{ pay?: string; type?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminOrdersPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const pay = params.pay === "paid" || params.pay === "unpaid" ? params.pay : "";
  const type = params.type === "delivery" || params.type === "pickup" ? params.type : "";
  const orders = await listAdminOrders({
    payment: pay === "paid" ? "PAID" : pay === "unpaid" ? "UNPAID" : undefined,
    method: type || undefined,
  });

  return (
    <>
      <AdminPageHeader title="Захиалга" description="Захиалгыг төлбөр болон хүргэлт / очиж авах төрлөөр нь шүүж харах." />
      <section className="card mt-6 overflow-hidden">
        <OrderFilterTabs pay={pay} type={type} count={orders.length} />
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
            <ReceiptText className="size-8" />
            Захиалга алга.
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {orders.map((o) => (
              <AdminOrderRow key={o.id} order={o} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
