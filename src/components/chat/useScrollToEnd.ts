"use client";

import { useEffect, useRef } from "react";

/** Keeps a scroll box pinned to its newest line whenever `trigger` changes (new message, typing). */
export function useScrollToEnd<T extends HTMLElement>(trigger: unknown) {
  const boxRef = useRef<T>(null);
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [trigger]);
  return boxRef;
}
