"use client";

import { useRef, type ReactNode } from "react";
import { useScrollActiveChip } from "../_features/useScrollActiveChip";

/** The category chip list; on phones it scrolls sideways and keeps the chosen chip in view. */
export function ChipRow({ activeKey, children }: { activeKey: string; children: ReactNode }) {
  const rowRef = useRef<HTMLUListElement>(null);
  useScrollActiveChip(rowRef, activeKey);
  return (
    <ul
      ref={rowRef}
      className="no-scrollbar relative -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 max-lg:mt-0 lg:mx-0 lg:grid lg:gap-1 lg:px-0"
    >
      {children}
    </ul>
  );
}
