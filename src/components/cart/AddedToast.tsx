"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleCheck, X } from "lucide-react";
import type { CartItem } from "./CartContext";

type Props = { item: Omit<CartItem, "quantity">; quantity: number; onClose: () => void };

/** The pop-up card shown after a product goes into the cart. */
export function AddedToast({ item, quantity, onClose }: Props) {
  return (
    <div className="flex w-[min(92vw,380px)] items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-lg">
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-2">
        <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[13px] font-bold text-brand">
          <CircleCheck className="size-4" /> Сагсанд нэмэгдлээ
        </p>
        <p className="truncate text-[14.5px] font-semibold">{item.name}</p>
        <p className="text-[12.5px] text-muted-foreground">
          {quantity} {item.unit}
        </p>
      </div>
      <Link href="/cart" onClick={onClose} className="btn btn-primary h-9 shrink-0 px-3 text-[13px]">
        Сагс харах
      </Link>
      <button type="button" onClick={onClose} aria-label="Хаах" className="self-start text-muted-foreground hover:text-ink">
        <X className="size-4" />
      </button>
    </div>
  );
}
