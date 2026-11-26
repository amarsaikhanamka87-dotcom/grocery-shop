import Link from "next/link";
import { cn } from "@/lib/utils";
import { ordersHref } from "../_features/ordersHref";

const KINDS = [
  { value: "", label: "Бүгд" },
  { value: "delivery", label: "Хүргэлт" },
  { value: "pickup", label: "Ирж авах" },
];

/** "Төрөл": a 3-part switch (looks different from the status tabs, so they don't read as one filter). */
export function OrderKindSwitch({ view, type }: { view: string; type: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[14px] font-semibold text-muted-foreground">Төрөл</span>
      <div className="grid flex-1 grid-cols-3 rounded-xl bg-ink/5 p-1 sm:flex-none">
        {KINDS.map((kind) => (
          <Link
            key={kind.value}
            href={ordersHref(view, kind.value)}
            aria-current={type === kind.value ? "page" : undefined}
            className={cn(
              "flex h-11 items-center justify-center rounded-lg px-3 text-[14px] font-bold whitespace-nowrap",
              type === kind.value ? "bg-white text-ink shadow-sm" : "text-ink-2 hover:text-ink",
            )}
          >
            {kind.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
