"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/components/cart/useCart";
import { placeOrder } from "./placeOrder";
import type { CheckoutInput, RecurrencePlan } from "./checkoutSchema";

const text = (form: FormData, key: string) => String(form.get(key) ?? "");

/** The "Давтамжит" plan from the hidden fields, or undefined for other delivery types. */
const readRecurrence = (form: FormData): CheckoutInput["recurrence"] => {
  if (text(form, "deliveryType") !== "recurring" || !text(form, "recurrence")) return undefined;
  return {
    frequency: text(form, "recurrence") as RecurrencePlan["frequency"],
    days: text(form, "recurrenceDays").split(",").filter(Boolean).map(Number),
    start: text(form, "recurrenceStart"),
    end: text(form, "recurrenceEnd"),
  };
};

/** Sends the order to the server, then goes to the Wire.mn payment page. */
export function useCheckoutSubmit() {
  const { items, clear } = useCart();
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const input: CheckoutInput = {
      customerName: text(form, "customerName"),
      phone: text(form, "phone"),
      district: text(form, "district"),
      address: text(form, "address"),
      note: text(form, "note"),
      deliveryType: text(form, "deliveryType") as CheckoutInput["deliveryType"],
      deliveryDate: text(form, "deliveryDate"),
      deliverySlot: text(form, "deliverySlot"),
      recurrence: readRecurrence(form),
      invoiceType: text(form, "invoiceType") === "company" ? "company" : "person",
      companyRegNo: text(form, "companyRegNo"),
      companyName: text(form, "companyName"),
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    };
    setNotice(null);
    startTransition(async () => {
      const res = await placeOrder(input);
      if ("error" in res) return setNotice(res.error);
      clear();
      window.location.assign(res.url);
    });
  };
  return { notice, pending, onSubmit };
}
