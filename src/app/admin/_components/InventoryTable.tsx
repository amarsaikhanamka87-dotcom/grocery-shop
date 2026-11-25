import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import type { OutgoingRow } from "@/lib/orders/getDayOutgoing";
import { IncomeBreakdown } from "./IncomeBreakdown";

type Props = { dayTitle: string; rows: OutgoingRow[]; deliveryFees: number };

/** "<day> гарсан бараа": products in orders paid that day (most income first) as one money table. */
export function InventoryTable({ dayTitle, rows, deliveryFees }: Props) {
  return (
    <section className="card mt-6 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">
          {dayTitle} гарсан бараа <span className="text-muted-foreground">({rows.length})</span>
        </h2>
        <Link
          href="/admin/products"
          className="flex h-11 shrink-0 items-center gap-1 text-[14px] font-bold whitespace-nowrap text-brand hover:underline"
        >
          Бүх үлдэгдэл <ArrowRight className="size-4" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <PackageSearch className="size-7" /> Энэ өдөр төлөгдсөн захиалгад бараа алга.
        </p>
      ) : (
        // One table (item, stock left, quantity, price, money, total) instead of photo cards plus a
        // table that repeated the same numbers: one short scroll on a phone.
        <IncomeBreakdown rows={rows} deliveryFees={deliveryFees} />
      )}
    </section>
  );
}
