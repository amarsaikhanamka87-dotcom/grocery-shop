"use client";

import { useLinkStatus } from "next/link";
import { cn } from "@/lib/utils";

/** Inside a day link (‹, ›, Өнөөдөр): a green ring that pulses while that day is loading (always rendered, no layout shift). */
export function DayPendingHint() {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-xl ring-2 ring-brand transition-opacity",
        pending ? "animate-pulse opacity-100" : "opacity-0",
      )}
    />
  );
}
