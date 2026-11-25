import { CheckCircle2, Printer } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";

type Props = { orderNumber: number; total: number; receiptId: string | null; onNext: () => void };

/** Shown after a sale is saved: order №, total, print the receipt, start the next sale. */
export function SaleDone({ orderNumber, total, receiptId, onNext }: Props) {
  return (
    <div className="py-6 text-center">
      <CheckCircle2 className="mx-auto size-12 text-brand" />
      <p className="mt-3 text-lg font-extrabold text-ink">Борлуулалт бүртгэгдлээ</p>
      <p className="text-muted-foreground">
        Захиалга #{orderNumber} · {formatPrice(total)}
      </p>
      <div className="mt-5 grid gap-2">
        {receiptId && (
          <a href={`/admin/receipts/${receiptId}/print`} target="_blank" rel="noreferrer" className="btn btn-outline h-11">
            <Printer className="size-4" /> Баримт хэвлэх
          </a>
        )}
        <button type="button" onClick={onNext} className="btn btn-primary h-11">
          Дараагийн худалдан авагч
        </button>
      </div>
    </div>
  );
}
