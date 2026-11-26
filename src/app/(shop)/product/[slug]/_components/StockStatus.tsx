import type { Product } from "@/types/catalog";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { stockLabel } from "../_features/stockLabel";

/** Stock left + the minimum order, worded the same as on product cards. */
export function StockStatus({ product: p }: { product: Product }) {
  const stock = stockLabel(p);
  return (
    <div className="mt-2 text-[16px] text-muted-foreground">
      <p className={stock.inStock ? undefined : "font-bold text-ink"}>{stock.text}</p>
      {p.minQty > 1 && (
        <p>
          Хамгийн багадаа {p.minQty} {cartUnitLabel(p.unit)}
        </p>
      )}
    </div>
  );
}
