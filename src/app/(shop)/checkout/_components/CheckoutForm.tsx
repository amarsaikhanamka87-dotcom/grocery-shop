"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/useCart";
import { useSyncCartStock } from "@/components/cart/useSyncCartStock";
import { stockProblem } from "@/components/cart/stockProblem";
import { DeliveryAddress } from "./DeliveryAddress";
import { DeliveryTime } from "./DeliveryTime";
import { OrderSummary } from "./OrderSummary";
import { useCheckoutSubmit } from "../_features/useCheckoutSubmit";

export function CheckoutForm({ defaults }: { defaults: { name: string; phone: string } }) {
  const { items, subtotal, ready } = useCart();
  const { notice, pending, onSubmit } = useCheckoutSubmit();
  useSyncCartStock();

  if (!ready) return <div className="min-h-[40vh]" />;
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-bold">Сагс хоосон байна.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">
          Дэлгүүр хэсэх
        </Link>
      </div>
    );
  }

  if (items.some((i) => stockProblem(i))) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-bold">Зарим бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна.</p>
        <Link href="/cart" className="btn btn-primary mt-6 h-11 px-6">
          Сагсаа засах
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_400px] lg:gap-8"
    >
      <div className="grid min-w-0 gap-5 sm:gap-6">
        <DeliveryAddress defaults={defaults} />
        <DeliveryTime />
      </div>
      <OrderSummary items={items} subtotal={subtotal} notice={notice} pending={pending} />
    </form>
  );
}
