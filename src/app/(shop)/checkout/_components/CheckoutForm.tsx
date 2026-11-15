"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/useCart";
import { RecipientFields } from "./RecipientFields";
import { AddressFields } from "./AddressFields";
import { DeliverySlotPicker } from "./DeliverySlotPicker";
import { PaymentInfo } from "./PaymentInfo";
import { OrderSummary } from "./OrderSummary";
import { useCheckoutSubmit } from "../_features/useCheckoutSubmit";

export function CheckoutForm({ defaults }: { defaults: { name: string; phone: string } }) {
  const { items, subtotal, ready } = useCart();
  const { notice, onSubmit } = useCheckoutSubmit();

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

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_400px] lg:gap-8"
    >
      <div className="grid min-w-0 gap-5 sm:gap-6">
        <RecipientFields defaults={defaults} />
        <AddressFields />
        <DeliverySlotPicker />
        <PaymentInfo />
      </div>
      <OrderSummary items={items} subtotal={subtotal} notice={notice} />
    </form>
  );
}
