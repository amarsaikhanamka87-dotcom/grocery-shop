"use client";

import { useQtyDraft } from "../_features/useQtyDraft";

type Props = { value: number; min: number; max: number; onCommit: (q: number) => void };

/** Quantity box; typing/clamping logic lives in useQtyDraft. */
export function QtyInput({ value, min, max, onCommit }: Props) {
  const { shown, setDraft, commit } = useQtyDraft(value, min, max, onCommit);
  return (
    <input
      type="number"
      inputMode="numeric"
      value={shown}
      min={min}
      max={max}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      className="w-12 bg-transparent text-center text-[16px] font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      aria-label="Тоо хэмжээ"
    />
  );
}
