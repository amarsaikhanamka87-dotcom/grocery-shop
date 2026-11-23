import Link from "next/link";
import { cn } from "@/lib/utils";
import { ordersHref } from "../_features/ordersHref";

const PAY_TABS = [
  { value: "", label: "Бүгд" },
  { value: "paid", label: "Төлөгдсөн" },
  { value: "unpaid", label: "Төлөгдөөгүй" },
  { value: "delivered", label: "Хүргэгдсэн" },
];

const TYPE_TABS = [
  { value: "", label: "Бүх төрөл" },
  { value: "delivery", label: "Хүргэлт" },
  { value: "pickup", label: "Очиж авах" },
];

const tab = (on: boolean) =>
  cn(
    "h-9 rounded-xl px-3.5 text-[13.5px] font-bold leading-9",
    on ? "bg-ink text-white" : "bg-cream-2 text-muted-foreground hover:text-ink",
  );

type Props = { pay: string; type: string; count: number };

/** Payment (all / paid / unpaid / delivered) and kind (delivery / pickup) filters, kept in the URL. */
export function OrderFilterTabs({ pay, type, count }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
      {PAY_TABS.map((t) => (
        <Link key={t.value} href={ordersHref(t.value, type)} className={tab(pay === t.value)}>
          {t.label}
        </Link>
      ))}
      <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
      {TYPE_TABS.map((t) => (
        <Link key={t.value} href={ordersHref(pay, t.value)} className={tab(type === t.value)}>
          {t.label}
        </Link>
      ))}
      <span className="ml-auto text-[13px] text-muted-foreground">{count} захиалга</span>
    </div>
  );
}
