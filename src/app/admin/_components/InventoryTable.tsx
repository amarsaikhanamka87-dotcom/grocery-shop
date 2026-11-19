import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import type { InventoryRow } from "@/lib/catalog/getInventory";
import { InventoryItem } from "./InventoryItem";

/** "Агуулахын үлдэгдэл": every product's stock in columns, lowest stock first. */
export function InventoryTable({ rows }: { rows: InventoryRow[] }) {
  return (
    <section className="card mt-6 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">
          Агуулахын үлдэгдэл <span className="text-muted-foreground">({rows.length})</span>
        </h2>
        <Link href="/admin/products" className="flex items-center gap-1 text-[14px] font-bold text-brand hover:underline">
          Бүтээгдэхүүн <ArrowRight className="size-4" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <PackageSearch className="size-7" /> Одоогоор бүтээгдэхүүн алга.
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
