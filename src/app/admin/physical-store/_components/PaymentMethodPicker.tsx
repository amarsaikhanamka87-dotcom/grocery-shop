import { ArrowLeftRight, Banknote, CreditCard, type LucideIcon } from "lucide-react";
import { PAYMENT_METHOD_LABEL } from "@/lib/orders/paymentMethodLabel";
import { cn } from "@/lib/utils";
import { STORE_PAYMENT_METHODS, type StorePaymentMethod } from "../_features/storePaymentMethods";

type Props = { value: StorePaymentMethod; onChange: (method: StorePaymentMethod) => void };

const ICONS: Record<StorePaymentMethod, LucideIcon> = { CASH: Banknote, CARD: CreditCard, TRANSFER: ArrowLeftRight };

/** Бэлэн / Карт / Шилжүүлэг: large buttons with icons, in one compact row. */
export function PaymentMethodPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Төлбөрийн хэлбэр">
      {STORE_PAYMENT_METHODS.map((method) => {
        const Icon = ICONS[method];
        const active = value === method;
        return (
          <button
            key={method}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(method)}
            className={cn(
              "flex h-12 items-center justify-center gap-2 rounded-xl border-2 text-[16px] font-bold transition",
              active ? "border-brand bg-brand text-white" : "border-line text-ink hover:border-brand",
            )}
          >
            <Icon className="size-5" />
            {PAYMENT_METHOD_LABEL[method]}
          </button>
        );
      })}
    </div>
  );
}
