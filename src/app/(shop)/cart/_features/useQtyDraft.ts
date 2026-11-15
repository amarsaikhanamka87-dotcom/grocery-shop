"use client";

import { useState } from "react";

/** Lets the buyer type a quantity freely, then clamps it to [min, max] on blur/Enter. */
export function useQtyDraft(value: number, min: number, max: number, onCommit: (q: number) => void) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = Math.round(Number(draft));
    onCommit(Number.isFinite(n) && n > 0 ? Math.min(max, Math.max(min, n)) : value);
    setDraft(null);
  };
  return { shown: draft ?? value, setDraft, commit };
}
