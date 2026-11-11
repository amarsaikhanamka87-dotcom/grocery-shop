"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export function BasketButton() {
  const { count, ready } = useCart();
  return (
    <Link
      href="/cart"
      className="btn btn-primary ml-1 h-11 gap-2 pl-4 pr-1.5 text-[15px]"
      aria-label={`Сагс, ${count} бүтээгдэхүүн`}
    >
      <ShoppingBasket className="size-[18px]" />
      <span className="hidden sm:inline">Сагс</span>
      <span className="grid size-8 place-items-center rounded-full bg-clay text-[13px] font-bold tabular-nums">
        {ready ? count : 0}
      </span>
    </Link>
  );
}
