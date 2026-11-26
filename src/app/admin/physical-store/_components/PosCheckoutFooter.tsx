"use client";

import { useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { paymentBlockReason } from "../_features/paymentBlockReason";
import type { StorePaymentMethod } from "../_features/storePaymentMethods";
import { CashChange } from "./CashChange";
import { PaymentMethodPicker } from "./PaymentMethodPicker";

type Props = {
  total: number;
  isEmpty: boolean;
  method: StorePaymentMethod;
  onMethod: (method: StorePaymentMethod) => void;
  received: string;
  onReceived: (value: string) => void;
  customerName: string;
  onCustomerName: (name: string) => void;
  isSaving: boolean;
  error: string | null;
  onCheckout: () => void;
};

/** Bottom of the bill, always in view: big "Нийт", payment method, cash + change, "Төлбөр авах". */
export function PosCheckoutFooter(props: Props) {
  const { total, isEmpty, method, received, isSaving } = props;
  const [isNameOpen, setNameOpen] = useState(false);
  const blockReason = paymentBlockReason({ isEmpty, total, method, received });
  return (
    <div className="mt-3 shrink-0 space-y-3 border-t border-line pt-3">
      <div className="flex items-baseline justify-between rounded-2xl bg-ink px-5 py-3 text-white">
        <span className="text-[18px] font-bold">Нийт</span>
        <span className="text-[34px] font-extrabold leading-none tabular-nums">{formatPrice(total)}</span>
      </div>
      <PaymentMethodPicker value={method} onChange={props.onMethod} />
      {method === "CASH" && !isEmpty && <CashChange total={total} received={received} onReceived={props.onReceived} />}
      {/* Same height as the cash box, so switching Бэлэн ↔ Карт doesn't make the page jump. */}
      {method !== "CASH" && !isEmpty && (
        <p className="flex min-h-[7.5rem] items-center rounded-xl bg-brand-50 px-4 text-[15px] text-brand">
          {method === "CARD" ? "Картаар" : "Дансаар"} {formatPrice(total)} авсны дараа доорх товчийг дарна уу.
        </p>
      )}
      {isNameOpen || props.customerName ? (
        <input
          value={props.customerName}
          onChange={(e) => props.onCustomerName(e.target.value)}
          maxLength={100}
          placeholder="Худалдан авагчийн нэр"
          className="input h-11 w-full"
          autoFocus
        />
      ) : (
        <button
          type="button"
          onClick={() => setNameOpen(true)}
          className="flex min-h-11 items-center gap-1.5 text-[16px] font-bold text-muted-foreground hover:text-brand"
        >
          <UserRound className="size-4" /> Худалдан авагчийн нэр нэмэх (заавал биш)
        </button>
      )}
      {props.error && <p className="text-[15px] font-semibold text-clay">{props.error}</p>}
      <button
        type="button"
        disabled={blockReason !== null || isSaving}
        onClick={props.onCheckout}
        className="btn btn-primary h-14 w-full rounded-2xl text-[20px]"
      >
        {isSaving && <Loader2 className="size-5 animate-spin" />}
        {isEmpty ? "Төлбөр авах" : `${formatPrice(total)} авах`}
      </button>
      {/* Says why the button is off, right under it (an empty bill already says to add items). */}
      {blockReason && !isEmpty && (
        <p className={`text-center text-[16px] font-bold ${received === "" ? "text-ink-2" : "text-clay"}`}>{blockReason}</p>
      )}
    </div>
  );
}
