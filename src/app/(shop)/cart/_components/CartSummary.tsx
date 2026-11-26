"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { useIsB2B } from "@/lib/roles/useIsB2B";
import { useDeliveryLocation } from "@/components/location/useDeliveryLocation";

/**
 * Totals + "Захиалга өгөх"; blocked while some line asks for more than is in stock. In "Очиж авах"
 * mode there is no delivery fee (same as checkout), so the totals match on both pages.
 */
export function CartSummary({ subtotal, blocked = false }: { subtotal: number; blocked?: boolean }) {
  const isPickup = useDeliveryLocation().mode === "pickup";
  const isB2B = useIsB2B();
  const fee = isPickup ? 0 : deliveryFeeFor(subtotal, isB2B);
  return (
    <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[200px]">
      <h2 className="text-[16px] font-bold">Захиалгын дүн</h2>
      <dl className="mt-5 grid gap-3 text-[16px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Бүтээгдэхүүн</dt>
          <dd className="font-bold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{isPickup ? "Очиж авах" : "Хүргэлт"}</dt>
          <dd className="font-bold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-bold">Нийт</dt>
          <dd className="text-[34px] leading-none font-extrabold tracking-[-0.03em] tabular-nums">{formatPrice(subtotal + fee)}</dd>
        </div>
      </dl>
      {blocked ? (
        <button type="button" disabled className="btn btn-primary mt-6 h-[52px] w-full text-[16px] disabled:opacity-50">
          Үлдэгдлээ шалгана уу
        </button>
      ) : (
        <Link href="/checkout" className="btn btn-primary mt-6 h-[52px] w-full text-[16px]">
          Захиалга өгөх <ArrowRight className="size-4" />
        </Link>
      )}
      <Link href="/shop" className="btn btn-outline mt-3 h-11 w-full text-[16px]">
        Ногоо нэмж сонгох
      </Link>
    </aside>
  );
}
