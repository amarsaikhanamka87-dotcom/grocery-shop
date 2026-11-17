import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "", label: "Бүгд" },
  { value: "paid", label: "Төлөгдсөн" },
  { value: "unpaid", label: "Төлөгдөөгүй" },
];

/** All / paid / unpaid, kept in the URL (?pay=paid). */
export function OrderFilterTabs({ active, count }: { active: string; count: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
      {TABS.map((t) => (
        <Link
          key={t.value}
          href={t.value ? `/admin/orders?pay=${t.value}` : "/admin/orders"}
          className={cn(
            "h-9 rounded-xl px-3.5 text-[13.5px] font-bold leading-9",
            active === t.value ? "bg-ink text-white" : "bg-cream-2 text-muted-foreground hover:text-ink",
          )}
        >
          {t.label}
        </Link>
      ))}
      <span className="ml-auto text-[13px] text-muted-foreground">{count} захиалга</span>
    </div>
  );
}
