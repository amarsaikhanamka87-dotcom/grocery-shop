"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/useCart";
import { useSyncCartStock } from "@/components/cart/useSyncCartStock";
import { stockProblem } from "@/components/cart/stockProblem";
import { useDeliveryLocation } from "@/components/location/useDeliveryLocation";
import { DeliveryAddress } from "./DeliveryAddress";
import { PickupPoint } from "./PickupPoint";
import { VatSection } from "./VatSection";
import { DeliveryTime } from "./DeliveryTime";
import { OrderSummary } from "./OrderSummary";
import { useCheckoutSubmit } from "../_features/useCheckoutSubmit";
import { usePaymentChoice } from "../_features/usePaymentChoice";

type Props = {
  defaults: { name: string; phone: string };
  company: { name: string; regNo: string } | null;
};

export function CheckoutForm({ defaults, company }: Props) {
  const { items, subtotal, ready } = useCart();
  const { notice, pending, onSubmit } = useCheckoutSubmit();
  const { paymentMethod, setPaymentMethod } = usePaymentChoice();
  const pickup = useDeliveryLocation().mode === "pickup";
  useSyncCartStock();

  if (!ready) return <div className="min-h-[40vh]" />;
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] font-bold">Сагс хоосон байна.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">
          Ногоо сонгох
        </Link>
      </div>
    );
  }

  if (items.some((i) => stockProblem(i))) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] font-bold">
          Сагсанд байгаа зарим ногоо хүрэлцэхгүй байна.
        </p>
        <Link href="/cart" className="btn btn-primary mt-6 h-11 px-6">
          Сагсаа засах
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_400px] lg:gap-8">
      <div className="grid min-w-0 gap-5 sm:gap-6">
        {pickup ? (
          <PickupPoint defaults={defaults} />
        ) : (
          <DeliveryAddress defaults={defaults} />
        )}
        <DeliveryTime pickup={pickup} />
        <VatSection company={company} />
      </div>
      <OrderSummary
        pickup={pickup}
        items={items}
        subtotal={subtotal}
        notice={notice}
        pending={pending}
        paymentMethod={paymentMethod}
        onPaymentChange={setPaymentMethod}
      />
    </form>
  );
}
