import Link from "next/link";
import { cn } from "@/lib/utils";
import { ordersHref } from "../_features/ordersHref";

// Same words as the status badge on each row (orderState).
const PAY_TABS = [
  { value: "", label: "Бүгд" },
  { value: "unpaid", label: "Төлбөр хүлээж буй" },
  { value: "paid", label: "Төлсөн" },
  { value: "delivered", label: "Хүргэгдсэн" },
];

const TYPE_TABS = [
  { value: "", label: "Бүх төрөл" },
  { value: "delivery", label: "Хүргэлт" },
  { value: "pickup", label: "Очиж авах" },
];

const tab = (on: boolean) =>
  cn(
    "h-10 shrink-0 rounded-xl px-3.5 text-[14px] font-bold leading-10 whitespace-nowrap",
    on ? "bg-ink text-white" : "bg-cream-2 text-ink-2 hover:text-ink",
  );

type Props = { pay: string; type: string; count: number };

/**
 * Status (all / waiting for money / paid / delivered) and kind (delivery / pickup) filters, kept in
 * the URL. Phones: each group is one row that scrolls sideways instead of wrapping into a block.
 */
export function OrderFilterTabs({ pay, type, count }: Props) {
  return (
    <div className="grid gap-2 border-b border-line px-4 py-3 sm:flex sm:flex-wrap sm:items-center sm:px-5">
      {/* Count first (it used to be cut off at the end of a scrolling row on phones). */}
      <p className="text-[14px] text-muted-foreground sm:order-last sm:ml-auto">{count} захиалга</p>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {PAY_TABS.map((t) => (
          <Link key={t.value} href={ordersHref(t.value, type)} className={tab(pay === t.value)}>
            {t.label}
          </Link>
        ))}
      </div>
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {TYPE_TABS.map((t) => (
          <Link key={t.value} href={ordersHref(pay, t.value)} className={tab(type === t.value)}>
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
