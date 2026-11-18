"use client";

import { useState } from "react";
import type { RecurrencePlan } from "./checkoutSchema";
import { toIsoDate } from "./toIsoDate";

type Frequency = RecurrencePlan["frequency"];

const firstDayAfter = (iso: string) => {
  const d = new Date(`${iso}T00:00`);
  d.setDate(d.getDate() + 1);
  return toIsoDate(d);
};

/** State of the "Давтамжит" dialog (start, frequency, weekdays, end); starts from the saved plan. */
export function useRecurrenceForm(initial: RecurrencePlan | null) {
  const [today] = useState(() => toIsoDate(new Date()));
  const [start, setStart] = useState(initial?.start ?? today);
  const [frequency, setFrequency] = useState<Frequency | null>(initial?.frequency ?? null);
  const [days, setDays] = useState<number[]>(initial?.days ?? []);
  const [end, setEnd] = useState(initial?.end ?? "");

  // The end must be after the start: the earliest end is the day after it.
  const endMin = firstDayAfter(start);

  const toggleDay = (day: number) =>
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));

  // Ready to save only when everything is filled in and the dates make sense.
  const plan: RecurrencePlan | null =
    frequency && days.length > 0 && start >= today && end > start ? { frequency, days, start, end } : null;

  return { today, start, setStart, endMin, frequency, setFrequency, days, toggleDay, end, setEnd, plan };
}
