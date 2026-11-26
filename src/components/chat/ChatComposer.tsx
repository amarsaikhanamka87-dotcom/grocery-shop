"use client";

import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { CHAT_MAX_CHARS } from "@/lib/constants";

type Props = { isSending: boolean; autoFocus: boolean; onSend: (text: string) => void };

/** The question box at the bottom of the chat, with an "Илгээх" button (an empty send does nothing). */
export function ChatComposer({ isSending, autoFocus, onSend }: Props) {
  const [text, setText] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim() || isSending) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <label htmlFor="shop-chat-question" className="sr-only">
        Асуулт
      </label>
      <input
        id="shop-chat-question"
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={CHAT_MAX_CHARS}
        placeholder="Асуултаа бичнэ үү"
        autoComplete="off"
        autoFocus={autoFocus}
        className="input min-h-11 min-w-0 flex-1 text-base"
      />
      <button type="submit" disabled={isSending} className="btn btn-primary min-h-11 shrink-0 gap-1.5 px-4">
        <SendHorizontal className="size-4" aria-hidden />
        Илгээх
      </button>
    </form>
  );
}
