import type { LucideIcon } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  amount: number;
  hint: string;
  icon: LucideIcon;
  tone: "brand" | "clay" | "ink";
};

const TONES = {
  brand: "bg-brand-50 text-brand",
  clay: "bg-clay-50 text-clay",
  ink: "bg-cream-2 text-ink",
};

/** One money tile on the admin dashboard (орлого / зарлага / үлдэгдэл). */
export function MoneyCard({ label, amount, hint, icon: Icon, tone }: Props) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xl",
          TONES[tone],
        )}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] text-muted-foreground">{label}</span>
        <span className="block text-[24px] font-extrabold leading-tight tabular-nums">
          {formatPrice(amount)}
        </span>
        <span className="block text-[12.5px] text-muted-foreground">
          {hint}
        </span>
      </span>
    </div>
  );
}
