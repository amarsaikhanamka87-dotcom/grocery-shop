"use client";

import { useState } from "react";

/** Open/closed state and the shown month of a <DateField> calendar. */
export function useDateField(value: string, min: string, defaultOpen: boolean) {
  const [open, setOpen] = useState(defaultOpen);
  // Start on the chosen date's month, else the earliest allowed month.
  const [view, setView] = useState(() => {
    const [y, m] = (value || min).split("-").map(Number);
    return { year: y, month: m - 1 };
  });
  const shift = (by: number) =>
    setView(({ year, month }) => {
      const d = new Date(year, month + by, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  const minMonth = Number(min.slice(0, 4)) * 12 + Number(min.slice(5, 7)) - 1;
  const canGoBack = view.year * 12 + view.month > minMonth;

  return { open, setOpen, view, prev: () => shift(-1), next: () => shift(1), canGoBack };
}
