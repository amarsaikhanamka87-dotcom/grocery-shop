import { Landmark } from "lucide-react";
import { BANK_TRANSFER, TRANSFER_HOLD_HOURS } from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";
import { transferReference } from "@/lib/orders/transferReference";
import { CopyButton } from "./CopyButton";

type Props = { orderNumber: number; total: number };

/** Bank transfer details for an unpaid order: account, amount and the order's transfer code. */
export function BankTransferCard({ orderNumber, total }: Props) {
  const reference = transferReference(orderNumber);
  return (
    <section className="grid gap-3 rounded-2xl border border-line p-4 text-left">
      <p className="flex items-center gap-2 text-[15px] font-extrabold">
        <Landmark className="size-5 text-brand" /> Дансаар шилжүүлэх
      </p>
      <dl className="grid gap-2 text-[14.5px]">
        {BANK_TRANSFER.bankName && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Банк</dt>
            <dd className="font-semibold">{BANK_TRANSFER.bankName}</dd>
          </div>
        )}
        {BANK_TRANSFER.accountNumber && (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-muted-foreground">Дансны дугаар</dt>
              <dd className="font-semibold tabular-nums break-all">
                {BANK_TRANSFER.accountNumber}
              </dd>
            </div>
            <CopyButton text={BANK_TRANSFER.accountNumber} label="Дансны дугаар" />
          </div>
        )}
        {BANK_TRANSFER.iban && (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-muted-foreground">IBAN (өөр банкнаас)</dt>
              <dd className="font-semibold tabular-nums break-all">{BANK_TRANSFER.iban}</dd>
            </div>
            <CopyButton text={BANK_TRANSFER.iban} label="IBAN" />
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Хүлээн авагч</dt>
          <dd className="text-right font-semibold">{BANK_TRANSFER.accountName}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <dt className="text-muted-foreground">Дүн</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(total)}</dd>
          </div>
          <CopyButton text={String(total)} label="Дүн" />
        </div>
      </dl>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-brand-50 p-3">
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">Гүйлгээний утга</p>
          <p className="text-[22px] font-extrabold tracking-wider text-brand">
            {reference}
          </p>
        </div>
        <CopyButton text={reference} label="Гүйлгээний утга" />
      </div>
      <p className="text-[13.5px] text-muted-foreground">
        Гүйлгээний утга дээр зөвхөн энэ кодыг бичнэ үү. Шилжүүлгийг шалгаад
        захиалгыг баталгаажуулна. {TRANSFER_HOLD_HOURS} цагийн дотор мөнгө
        ороогүй бол захиалга автоматаар цуцлагдана.
      </p>
    </section>
  );
}
