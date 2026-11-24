import { formatPrice } from "@/lib/format/formatPrice";
import type { ReceiptData } from "@/types/receipts";

/**
 * Phones: the receipt's money first, in readable type: each line (qty × price = amount), delivery and
 * the total. The paper БМ-3 form is below it, folded (it scrolls sideways on a phone).
 */
export function ReceiptSummary({ receipt }: { receipt: ReceiptData }) {
  return (
    <section className="card mt-4 p-4 sm:hidden">
      <ul className="divide-y divide-line">
        {receipt.lines.map((line) => (
          <li key={line.no} className="flex items-start justify-between gap-3 py-2.5">
            <span className="min-w-0">
              <span className="block text-[16px] font-bold text-ink">{line.name}</span>
              <span className="block text-[14px] text-muted-foreground tabular-nums">
                {line.quantity} {line.unit} × {formatPrice(line.price)}
              </span>
            </span>
            <span className="text-[16px] font-extrabold whitespace-nowrap tabular-nums">{formatPrice(line.total)}</span>
          </li>
        ))}
      </ul>
      {receipt.deliveryFee > 0 && (
        <p className="flex justify-between border-t border-line pt-2.5 text-[15px] text-muted-foreground">
          <span>Хүргэлт</span>
          <span className="tabular-nums">{formatPrice(receipt.deliveryFee)}</span>
        </p>
      )}
      <p className="mt-2 flex items-baseline justify-between rounded-xl bg-ink px-4 py-3 text-white">
        <span className="text-[16px] font-bold">Нийт</span>
        <span className="text-[26px] font-extrabold tabular-nums">{formatPrice(receipt.total)}</span>
      </p>
    </section>
  );
}
