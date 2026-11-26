"use client";

import { useEffect, type RefObject } from "react";

/** Scrolls a sideways chip row so the active chip (data-active-chip) is in view, without moving the page. */
export function useScrollActiveChip(rowRef: RefObject<HTMLElement | null>, activeKey: string) {
  useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>("[data-active-chip]");
    if (!row || !chip) return;
    if (row.scrollWidth <= row.clientWidth) return;
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left) });
  }, [rowRef, activeKey]);
}
