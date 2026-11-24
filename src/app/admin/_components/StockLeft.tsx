import { adminStockLevel } from "@/lib/catalog/adminStockLevel";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { cn } from "@/lib/utils";

type Props = { stock: number; minQty: number; unit: string };

/** "Үлдэгдэл 585 шуудай" under an item name; clay with "· бага" / "· дууссан" when it runs out. */
export function StockLeft({ stock, minQty, unit }: Props) {
  const level = adminStockLevel(stock, minQty);
  const note = level === "out" ? " · дууссан" : level === "low" ? " · бага" : "";
  return (
    <span className={cn("block text-[13px]", level === "ok" ? "text-muted-foreground" : "font-semibold text-clay")}>
      Үлдэгдэл {stock} {cartUnitLabel(unit)}
      {note}
    </span>
  );
}
