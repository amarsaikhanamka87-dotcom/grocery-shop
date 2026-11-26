"use client";

import { Info } from "lucide-react";
import type { CartItem } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format/formatPrice";
import { TRANSFER_HOLD_HOURS } from "@/lib/constants";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { useIsB2B } from "@/lib/roles/useIsB2B";
import type { PaymentChoice } from "../_features/usePaymentChoice";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { SummaryLine } from "./SummaryLine";
import { FreeDeliveryHint } from "./FreeDeliveryHint";

type Props = {
  pickup: boolean;
  items: CartItem[];
  subtotal: number;
  notice: string | null;
  pending: boolean;
  paymentMethod: PaymentChoice;
  onPaymentChange: (method: PaymentChoice) => void;
};

export function OrderSummary({
  pickup,
  items,
  subtotal,
  notice,
  pending,
  paymentMethod,
  onPaymentChange,
}: Props) {
  const isTransfer = paymentMethod === "TRANSFER";
  const isB2B = useIsB2B();
  const fee = pickup ? 0 : deliveryFeeFor(subtotal, isB2B);

  // Desktop: sticky, but never taller than the screen, so it doesn't jump while the form grows.
  return (
    <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[180px] lg:max-h-[calc(100vh-196px)] lg:overflow-y-auto">
      <h2 className="text-[16px] font-bold">Таны захиалга</h2>
      <ul className="mt-5 grid max-h-72 grid-cols-1 gap-3 overflow-y-auto pr-1">
        {items.map((i) => (
          <SummaryLine key={i.productId} item={i} />
        ))}
      </ul>
      <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-[16px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Бүтээгдэхүүн</dt>
          <dd className="font-bold tabular-nums">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{pickup ? "Очиж авах" : "Хүргэлт"}</dt>
          <dd className="font-bold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
        </div>
        {fee > 0 && <FreeDeliveryHint subtotal={subtotal} />}
        <div className="mt-1 flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-bold">Нийт</dt>
          <dd className="text-[34px] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
            {formatPrice(subtotal + fee)}
          </dd>
        </div>
      </dl>
      <PaymentMethodSection paymentMethod={paymentMethod} onChange={onPaymentChange} />
      {notice && (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-clay-50 px-4 py-3 text-[16px] text-clay">
          <Info className="mt-0.5 size-4 shrink-0" /> {notice}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary mt-6 h-[52px] w-full text-[16px] disabled:opacity-60">
        {pending
          ? isTransfer
            ? "Захиалж байна…"
            : "Төлбөр рүү шилжиж байна…"
          : `${isTransfer ? "Захиалах" : "Төлөх"} · ${formatPrice(subtotal + fee)}`}
      </button>

      <p className="mt-3 text-center text-[16px] text-ink-2">
        {isTransfer
          ? `Дараагийн хуудсанд дансны дугаар гарна. ${TRANSFER_HOLD_HOURS} цагийн дотор шилжүүлээгүй бол захиалга цуцлагдана.`
          : "Дараагийн алхамд QR кодоор эсвэл банкны аппаар төлнө."}
      </p>
    </aside>
  );
}
