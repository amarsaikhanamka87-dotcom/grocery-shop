"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import type { ChatMessage } from "@/types/chat";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";

type ChatState = {
  messages: ChatMessage[];
  error: string | null;
  isSending: boolean;
  send: (text: string) => void;
  retry: () => void;
};

type Props = { chat: ChatState; isMdUp: boolean; onClose: () => void };

/** The chat window: full screen on phones, a card in the bottom-right corner from md up. */
export function ChatPanel({ chat, isMdUp, onClose }: Props) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <section
      role="dialog"
      aria-modal={!isMdUp}
      aria-label="Дэлгүүрийн туслах"
      className="fixed inset-0 z-50 flex flex-col bg-white md:inset-auto md:right-6 md:bottom-6 md:h-[480px] md:max-h-[calc(100dvh-3rem)] md:w-[360px] md:rounded-2xl md:border md:border-line md:shadow-2xl"
    >
      <header className="flex items-center justify-between gap-3 border-b border-line py-2 pr-2 pl-4">
        <h2 className="text-lg font-bold text-ink">Туслах</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 shrink-0 items-center gap-1 rounded-full px-3 text-ink hover:bg-brand-50"
        >
          <X className="size-5" aria-hidden />
          Хаах
        </button>
      </header>
      <ChatMessageList chat={chat} />
      {/* Desktop: type straight away. Phones: no auto-focus, the keyboard would hide the examples. */}
      <ChatComposer isSending={chat.isSending} autoFocus={isMdUp} onSend={chat.send} />
    </section>
  );
}
