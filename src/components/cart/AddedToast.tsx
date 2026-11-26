"use client";

import Link from "next/link";
import { CircleCheck, X } from "lucide-react";
import type { CartItem } from "./CartContext";

type Props = { item: Omit<CartItem, "quantity">; onClose: () => void };

/**
 * The pop-up after a product goes into the cart: one short row (two text lines), so the title never
 * breaks mid-word and it covers as little of the list as possible. No quantity: it would go stale
 * as soon as the buyer taps + on the card (the card and the cart show the amount).
 */
export function AddedToast({ item, onClose }: Props) {
  return (
    <div className="flex w-[min(92vw,380px)] items-center gap-2 rounded-2xl border border-line bg-white py-2 pr-1 pl-3 shadow-lg">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[16px] font-bold whitespace-nowrap text-brand">
          <CircleCheck className="size-4 shrink-0" /> Сагсанд орлоо
        </p>
        <p className="truncate text-[16px] text-muted-foreground">
          {item.name}
        </p>
      </div>
      <Link href="/cart" onClick={onClose} className="btn btn-primary h-11 shrink-0 px-4 text-[16px]">
        Сагс харах
      </Link>
      <button
        type="button"
        onClick={onClose}
        aria-label="Хаах"
        className="grid size-11 shrink-0 place-items-center text-muted-foreground hover:text-ink"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
