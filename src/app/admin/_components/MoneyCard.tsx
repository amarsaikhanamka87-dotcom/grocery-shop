import type { LucideIcon } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  amount: number;
  hint: string;
  icon: LucideIcon;
  tone: "brand" | "clay" | "ink";
  /** Phones: take the whole row (the day's total); the others sit two per row without an icon. */
  wide?: boolean;
};

const TONES = {
  brand: "bg-brand-50 text-brand",
  clay: "bg-clay-50 text-clay",
  ink: "bg-cream-2 text-ink",
};

/** One money tile on the admin dashboard (орлого / зарлага / үлдэгдэл). */
export function MoneyCard({ label, amount, hint, icon: Icon, tone, wide = false }: Props) {
  return (
    <div className={cn("card flex min-w-0 items-center gap-4 p-4 sm:col-span-1 sm:p-5", wide && "col-span-2")}>
      <span
        className={cn(
          "size-11 shrink-0 place-items-center rounded-xl sm:grid",
          wide ? "grid" : "hidden",
          TONES[tone],
        )}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] text-muted-foreground">{label}</span>
        <span className="block text-[22px] font-extrabold leading-tight tabular-nums sm:text-[24px]">
          {formatPrice(amount)}
        </span>
        <span className="block text-[13px] text-muted-foreground">
          {hint}
        </span>
      </span>
    </div>
  );
}
