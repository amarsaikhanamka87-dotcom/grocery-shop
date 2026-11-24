"use client";

import { useState } from "react";
import { DELIVERY_DAYS_AHEAD, DELIVERY_SLOTS } from "@/lib/constants";
import { recurrenceText } from "@/lib/orders/recurrenceText";
import type { RecurrencePlan } from "./checkoutSchema";
import { deliveryDays } from "./deliveryDays";
import { expressWindow } from "./expressWindow";
import { firstRecurringDate } from "./firstRecurringDate";
import { toIsoDate } from "./toIsoDate";

export type DeliveryType = "express" | "scheduled" | "recurring" | "pickup";

const mmddyyyy = (iso: string) => iso.replace(/(\d+)-(\d+)-(\d+)/, "$2/$3/$1");

/**
 * "Хүргэлтийн хугацаа": Шуурхай (today, within the hour), Хуваарьт (pick a day + slot) or
 * Давтамжит (a repeating plan from the dialog + slot). In pickup mode: the day + slot to collect.
 */
export function useDeliveryTime(pickup = false) {
  const [now] = useState(() => new Date());
  const days = deliveryDays(DELIVERY_DAYS_AHEAD, now);
  const express = expressWindow(now);
  // Default Хуваарьт: its card is visible and ticked. Шуурхай's card is hidden, so defaulting to it
  // showed a "today 13:10–14:10" time with no card ticked.
  const [chosen, setType] = useState<DeliveryType>("scheduled");
  // "Очиж авах": always a picked day + slot (the Хуваарьт chips).
  const type: DeliveryType = pickup ? "pickup" : chosen;
  const [day, setDay] = useState(days[0].value);
  const [slot, setSlot] = useState(DELIVERY_SLOTS[0]);
  const [plan, setPlan] = useState<RecurrencePlan | null>(null);
  const [planOpen, setPlanOpen] = useState(false);

  const savePlan = (p: RecurrencePlan) => {
    setPlan(p);
    setType("recurring");
    setPlanOpen(false);
  };

  let date = day;
  let windowText = slot;
  let summary = `${mmddyyyy(day)} (${slot})`;
  if (type === "express" && express) {
    date = toIsoDate(express.day);
    windowText = `${express.from}–${express.to}`;
    summary = `${mmddyyyy(date)} (${windowText})`;
  } else if (type === "recurring" && plan) {
    date = firstRecurringDate(plan.start, plan.days);
    summary = `${recurrenceText(plan.frequency, plan.days, plan.start, plan.end)} (${slot})`;
  }

  return {
    type,
    setType,
    express,
    days,
    day,
    setDay,
    slot,
    setSlot,
    plan,
    planOpen,
    setPlanOpen,
    savePlan,
    date,
    windowText,
    summary,
  };
}
