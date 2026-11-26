import { Wallet } from "lucide-react";
import { TRANSFER_HOLD_HOURS } from "@/lib/constants";
import type { PaymentChoice } from "../_features/usePaymentChoice";
import { ChoiceRow } from "./ChoiceRow";

type Props = { paymentMethod: PaymentChoice; onChange: (method: PaymentChoice) => void };

/** "Төлбөрийн хэлбэр" in the order summary, right above the pay button: Wire.mn or a bank transfer. */
export function PaymentMethodSection({ paymentMethod, onChange }: Props) {
  const isTransfer = paymentMethod === "TRANSFER";
  return (
    <fieldset className="mt-5 border-t border-line pt-5">
      <legend className="sr-only">Төлбөрийн хэлбэр</legend>
      <p className="flex items-center gap-2 text-[16px] font-bold">
        <Wallet className="size-5 text-brand" /> Хэрхэн төлөх вэ?
      </p>
      <input type="hidden" name="paymentMethod" value={paymentMethod} />
      <div className="mt-3 grid gap-2">
        <ChoiceRow type="radio" name="pickPayment" label="QR код эсвэл банкны апп" hint="Одоо төлнө" checked={!isTransfer} onChange={() => onChange("WIRE")} />
        <ChoiceRow type="radio" name="pickPayment" label="Дансаар шилжүүлэх" hint={`${TRANSFER_HOLD_HOURS} цагийн дотор шилжүүлнэ`} checked={isTransfer} onChange={() => onChange("TRANSFER")} />
      </div>
    </fieldset>
  );
}
