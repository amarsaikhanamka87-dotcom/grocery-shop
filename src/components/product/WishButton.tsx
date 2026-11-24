"use client";

import { Heart } from "lucide-react";
import { useCart } from "@/components/cart/useCart";

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
      className={`grid size-11 place-items-center rounded-full bg-white/95 shadow-sm transition-colors hover:text-brand ${className}`}
    >
      <Heart className={`size-[17px] ${active ? "fill-brand text-brand" : ""}`} />
    </button>
  );
}
