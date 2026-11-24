"use client";

import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import type { StorePaymentMethod } from "../_features/storePaymentMethods";
import type { usePosCart } from "../_features/usePosCart";
import { useStoreCheckout } from "../_features/useStoreCheckout";
import { PosCheckoutFooter } from "./PosCheckoutFooter";
import { PosCartLine } from "./PosCartLine";
import { SaleDone } from "./SaleDone";

type Props = { cart: ReturnType<typeof usePosCart> };

// Max height = the screen minus what sits above the panel at scroll 0 (top bar + title row), so
// the footer ("Нийт", payment, "Төлбөр авах") is visible without scrolling the page.
const panel = "card flex flex-col p-4 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-10.5rem)]";

/**
 * The bill. Lines take the free height (they scroll only when there are many); the total and the
 * payment part below them always stay in view, so the lines, total and button are seen together.
 */
export function PosCartPanel({ cart }: Props) {
  const [method, setMethod] = useState<StorePaymentMethod>("CASH");
  const [received, setReceived] = useState("");
  const [customerName, setCustomerName] = useState("");
  const sale = useStoreCheckout(() => {
    cart.clear();
    setReceived("");
    setCustomerName("");
  });

  if (sale.doneSale) {
    return (
      <aside id="pos-bill" className={panel}>
        <SaleDone {...sale.doneSale} onNext={sale.startNext} />
      </aside>
    );
  }

  const itemCount = cart.lines.length;
  return (
    <aside id="pos-bill" className={panel}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-extrabold text-ink">
          <ShoppingBasket className="size-6" /> Тооцоо
          {itemCount > 0 && <span className="text-[16px] font-bold text-muted-foreground">· {itemCount} бараа</span>}
        </h2>
        {itemCount > 0 && !sale.isSaving && (
          <button type="button" onClick={cart.clear} className="text-[14px] font-semibold text-muted-foreground hover:text-clay">
            Цэвэрлэх
          </button>
        )}
      </div>
      {itemCount === 0 ? (
        <p className="py-10 text-center text-[16px] text-muted-foreground">Бараан дээр дарж тооцоонд нэмнэ үү.</p>
      ) : (
        <ul className="mt-1 min-h-0 flex-1 divide-y divide-line overflow-y-auto">
          {cart.lines.map((line) => (
            <PosCartLine key={line.product.id} line={line} onQuantity={cart.setQuantity} />
          ))}
        </ul>
      )}
      <PosCheckoutFooter
        total={cart.total}
        isEmpty={itemCount === 0}
        method={method}
        onMethod={setMethod}
        received={received}
        onReceived={setReceived}
        customerName={customerName}
        onCustomerName={setCustomerName}
        isSaving={sale.isSaving}
        error={sale.error}
        onCheckout={() => sale.checkout(cart.lines, method, customerName)}
      />
    </aside>
  );
}
