import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import type { OutgoingRow } from "@/lib/orders/getDayOutgoing";
import { InventoryItem } from "./InventoryItem";

/** "<day> гарсан бараа": products in orders paid that day, most outgoing first. */
export function InventoryTable({ dayTitle, rows }: { dayTitle: string; rows: OutgoingRow[] }) {
  return (
    <section className="card mt-6 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">
          {dayTitle} гарсан бараа <span className="text-muted-foreground">({rows.length})</span>
        </h2>
        <Link href="/admin/products" className="flex items-center gap-1 text-[14px] font-bold text-brand hover:underline">
          Бүх үлдэгдэл <ArrowRight className="size-4" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <PackageSearch className="size-7" /> Энэ өдөр төлөгдсөн захиалгад бараа алга.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {rows.map((p) => (
            <InventoryItem key={p.id} product={p} />
          ))}
        </ul>
      )}
    </section>
  );
}
