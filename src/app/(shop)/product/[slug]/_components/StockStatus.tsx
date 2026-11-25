import type { Product } from "@/types/catalog";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { stockLabel } from "../_features/stockLabel";

/** Stock left + the minimum order, worded the same as on product cards ("Багадаа 1 шуудай"). */
export function StockStatus({ product: p }: { product: Product }) {
  const stock = stockLabel(p);
  return (
    <p className="mt-2 text-[15px]">
      <span className={`font-semibold ${stock.inStock ? "text-brand" : "text-clay"}`}>{stock.text}</span>
      {p.minQty > 1 && (
        <span className="text-muted-foreground">
          {" · "}Багадаа {p.minQty} {cartUnitLabel(p.unit)}
        </span>
      )}
    </p>
  );
}
