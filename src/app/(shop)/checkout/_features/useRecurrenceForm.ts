"use client";

import { useState } from "react";
import type { RecurrencePlan } from "./checkoutSchema";
import { toIsoDate } from "./toIsoDate";

type Frequency = RecurrencePlan["frequency"];

const dayAfter = (iso: string) => {
  const d = new Date(`${iso}T00:00`);
  d.setDate(d.getDate() + 1);
  return toIsoDate(d);
};

/**
 * State of the "Тогтмол захиалга" dialog (start, frequency, weekdays, end); starts from the saved
 * plan. Deliveries start tomorrow at the earliest (like the day chips), weekly is pre-selected, and
 * `missing` says in words what still blocks "Хадгалах".
 */
export function useRecurrenceForm(initial: RecurrencePlan | null) {
  const [firstDay] = useState(() => dayAfter(toIsoDate(new Date())));
  const [start, setStart] = useState(initial?.start ?? firstDay);
  const [frequency, setFrequency] = useState<Frequency>(initial?.frequency ?? "WEEKLY");
  const [days, setDays] = useState<number[]>(initial?.days ?? []);
  const [end, setEnd] = useState(initial?.end ?? "");

  // The end must be after the start: the earliest end is the day after it.
  const endMin = dayAfter(start);

  const toggleDay = (day: number) =>
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));

  const missing = [days.length === 0 && "гараг", !(end > start) && "дуусах өдөр"].filter(Boolean).join(", ");

  const plan: RecurrencePlan | null =
    days.length > 0 && start >= firstDay && end > start ? { frequency, days, start, end } : null;

  return { firstDay, start, setStart, endMin, frequency, setFrequency, days, toggleDay, end, setEnd, missing, plan };
}
