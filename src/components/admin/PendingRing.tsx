"use client";

import { useLinkStatus } from "next/link";
import { cn } from "@/lib/utils";

/** Inside a period link (‹, ›, back to now, kind switch): a green ring that pulses while it loads (always rendered, no layout shift). */
export function PendingRing() {
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
