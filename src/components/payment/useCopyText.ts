"use client";

import { useState } from "react";

/** Copies text to the clipboard; `isCopied` stays true for 2 s, `hasFailed` when copying is blocked. */
export function useCopyText(text: string) {
  const [isCopied, setIsCopied] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setHasFailed(false);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setHasFailed(true);
    }
  }

  return { isCopied, hasFailed, copyText };
}
