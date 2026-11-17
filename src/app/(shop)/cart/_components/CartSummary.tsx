"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { useIsB2B } from "@/lib/roles/useIsB2B";

export function CartSummary({ subtotal }: { subtotal: number }) {
  const fee = deliveryFeeFor(subtotal, useIsB2B());
  return (
    <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[200px]">
      <h2 className="text-lg font-extrabold">Захиалгын дүн</h2>
      <dl className="mt-5 grid gap-3 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Бүтээгдэхүүн</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Хүргэлт</dt>
          <dd className="font-semibold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-4 text-lg">
          <dt className="font-bold">Нийт</dt>
          <dd className="font-extrabold tabular-nums">{formatPrice(subtotal + fee)}</dd>
        </div>
      </dl>
      <Link href="/checkout" className="btn btn-primary mt-6 h-[52px] w-full text-[15px]">
        Захиалга хийх <ArrowRight className="size-4" />
      </Link>
      <Link href="/shop" className="mt-3 block text-center text-sm font-semibold text-brand hover:underline">
        Дэлгүүр үргэлжлүүлэх
      </Link>
    </aside>
  );
}
