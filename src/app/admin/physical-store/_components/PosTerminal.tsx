"use client";

import type { PosProduct } from "@/lib/catalog/getPosProducts";
import { usePosCart, type PosLine } from "../_features/usePosCart";
import { PosCartPanel } from "./PosCartPanel";
import { PosMobileBar } from "./PosMobileBar";
import { ProductPicker } from "./ProductPicker";

/** The cashier screen: products to tap on the left, the bill and payment on the right (below on phones). */
export function PosTerminal({ products, initialLines }: { products: PosProduct[]; initialLines: PosLine[] }) {
  const cart = usePosCart(initialLines);
  return (
    // minmax(0,1fr) on small screens too: without it the bill can widen the page and make it scroll sideways.
    <div className="mt-4 grid grid-cols-[minmax(0,1fr)] items-start gap-5 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:pb-0">
      <ProductPicker products={products} inBill={cart.quantities} onPick={cart.add} />
      <PosCartPanel cart={cart} />
      <PosMobileBar itemCount={cart.lines.length} total={cart.total} />
    </div>
  );
}
