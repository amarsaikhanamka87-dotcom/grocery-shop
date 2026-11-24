import { AlertTriangle, Package, PackageX, Star } from "lucide-react";
import type { Product } from "@/types/catalog";
import { countProductStats } from "../_features/countProductStats";

type Props = { products: Product[]; total: number; filtered: boolean };

/** Four small number tiles above the list (2×2 on phones). Counts follow the current filter. */
export function ProductStats({ products, total, filtered }: Props) {
  const s = countProductStats(products);
  const tiles = [
    { label: filtered ? `${total}-аас олдсон` : "Нийт", value: s.shown, icon: Package, tone: "bg-brand-50 text-brand" },
    { label: "Дууссан", value: s.out, icon: PackageX, tone: "bg-clay-50 text-clay" },
    { label: "Үлдэгдэл бага", value: s.low, icon: AlertTriangle, tone: "bg-clay-50 text-clay" },
    { label: "Онцлох", value: s.featured, icon: Star, tone: "bg-ink/5 text-ink-2" },
  ];
  return (
    <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {tiles.map(({ label, value, icon: Icon, tone }) => (
        <li key={label} className="card flex items-center gap-3 rounded-2xl p-3 sm:p-4">
          <span className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-10 ${tone}`}>
            <Icon className="size-[18px] sm:size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xl leading-none font-extrabold text-ink sm:text-2xl">{value}</span>
            <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">{label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
