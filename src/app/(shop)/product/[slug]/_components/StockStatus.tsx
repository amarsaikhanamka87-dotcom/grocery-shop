import type { Product } from "@/types/catalog";
import { stockLabel } from "../_features/stockLabel";

export function StockStatus({ product: p }: { product: Product }) {
  const stock = stockLabel(p);
  return (
    <>
      <p className={`mt-6 text-sm font-semibold ${stock.inStock ? "text-brand" : "text-clay"}`}>{stock.text}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Хамгийн бага захиалга:{" "}
        <b className="text-ink">
          {p.minQty} {p.unit}
        </b>
      </p>
    </>
  );
}
