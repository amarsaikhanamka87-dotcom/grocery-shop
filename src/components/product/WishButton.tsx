"use client";

import { Heart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export function WishButton({ productId, className = "" }: { productId: string; className?: string }) {
  const { wishlist, toggleWish } = useCart();
  const active = wishlist.includes(productId);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleWish(productId);
      }}
      aria-pressed={active}
      aria-label={active ? "Хадгалснаас хасах" : "Хадгалах"}
      className={`grid size-9 place-items-center rounded-full bg-white/95 shadow-sm transition-colors hover:text-clay ${className}`}
    >
      <Heart className={`size-[17px] ${active ? "fill-clay text-clay" : ""}`} />
    </button>
  );
}
