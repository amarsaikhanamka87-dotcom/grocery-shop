"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/components/cart/useCart";

/** "Сагс" + how many products, in words at every width (the basket icon is added from sm up). */
export function BasketButton() {
  const { count, ready } = useCart();
  return (
    <Link
      href="/cart"
      className="btn btn-primary h-11 gap-1 pr-2 pl-2.5 text-[16px] sm:ml-1 sm:gap-2 sm:pl-4"
      aria-label={`Сагс, ${count} бүтээгдэхүүн`}
    >
      <ShoppingBasket className="hidden size-[18px] sm:block" />
      Сагс
      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-white px-1.5 text-[16px] font-bold text-brand tabular-nums">
        {ready ? count : 0}
      </span>
    </Link>
  );
}
