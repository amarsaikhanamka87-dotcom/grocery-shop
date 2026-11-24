"use client";

import { ArrowDown, ShoppingBasket } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { useIsOnScreen } from "../_features/useIsOnScreen";

type Props = { itemCount: number; total: number };

/**
 * Phones/tablets: a bar fixed at the bottom with the bill's count and total; tapping it jumps to the
 * bill. Hidden once the bill itself is on screen, so it never covers the "…₮ авах" button.
 */
export function PosMobileBar({ itemCount, total }: Props) {
  const isBillOnScreen = useIsOnScreen("pos-bill");
  if (itemCount === 0 || isBillOnScreen) return null;
  return (
    <a
      href="#pos-bill"
      className="fixed inset-x-3 bottom-3 z-30 flex h-14 items-center gap-3 rounded-2xl bg-ink px-4 text-white shadow-float lg:hidden"
    >
      <ShoppingBasket className="size-5" />
      <span className="text-[16px] font-bold">Тооцоо · {itemCount} бараа</span>
      <span className="ml-auto text-[20px] font-extrabold tabular-nums">{formatPrice(total)}</span>
      <ArrowDown className="size-5" />
    </a>
  );
}
