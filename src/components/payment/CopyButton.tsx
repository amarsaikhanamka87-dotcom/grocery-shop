"use client";

import { Check, Copy } from "lucide-react";
import { useCopyText } from "./useCopyText";

type Props = { text: string; label: string };

/** Copies `text` to the clipboard; the button says "Хуулсан" for 2 s after a tap. */
export function CopyButton({ text, label }: Props) {
  const { isCopied, hasFailed, copyText } = useCopyText(text);

  return (
    <button
      type="button"
      onClick={copyText}
      aria-label={`${label} хуулах`}
      className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-line px-3 text-[14px] font-semibold hover:border-brand hover:text-brand">
      {isCopied ? (
        <Check className="size-4 text-brand" />
      ) : (
        <Copy className="size-4" />
      )}
      <span aria-live="polite">
        {isCopied ? "Хуулсан" : hasFailed ? "Гараар бичнэ үү" : "Хуулах"}
      </span>
    </button>
  );
}
