"use client";

import { useCart } from "@/components/cart/useCart";
import { EmptyCart } from "./EmptyCart";
import { FreeDeliveryNotice } from "./FreeDeliveryNotice";
import { CartRow } from "./CartRow";
import { CartSummary } from "./CartSummary";

export function CartContent() {
  const { items, subtotal, ready } = useCart();

  if (!ready) return <div className="container-x min-h-[50vh] pt-10" />;
  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Миний сагс</h1>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="card divide-y divide-line">
          <FreeDeliveryNotice subtotal={subtotal} />
          {items.map((i) => (
            <CartRow key={i.productId} item={i} />
          ))}
        </div>
        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
