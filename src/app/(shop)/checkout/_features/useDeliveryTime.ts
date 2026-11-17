"use client";

import { useState } from "react";
import { DELIVERY_DAYS_AHEAD, DELIVERY_SLOTS } from "@/lib/constants";
import { deliveryDays } from "./deliveryDays";
import { expressWindow } from "./expressWindow";

export type DeliveryType = "express" | "scheduled";

const mmddyyyy = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
const isoDate = (d: Date) => mmddyyyy(d).replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

/** "Хүргэлтийн хугацаа": Шуурхай (today, within the hour) or Хуваарьт (pick a day + slot). */
export function useDeliveryTime() {
  const [now] = useState(() => new Date());
  const days = deliveryDays(DELIVERY_DAYS_AHEAD, now);
  const express = expressWindow(now);
  const [type, setType] = useState<DeliveryType>(express ? "express" : "scheduled");
  const [day, setDay] = useState(days[0].value);
  const [slot, setSlot] = useState(DELIVERY_SLOTS[0]);

  const picked = type === "express" && express
    ? { date: isoDate(express.day), slot: `${express.from}–${express.to}`, shown: express.day }
    : { date: day, slot, shown: new Date(`${day}T00:00`) };

  return {
    type,
    setType,
    express,
    days,
    day,
    setDay,
    slot,
    setSlot,
    date: picked.date,
    windowText: picked.slot,
    summary: `${mmddyyyy(picked.shown)} (${picked.slot})`,
  };
}
