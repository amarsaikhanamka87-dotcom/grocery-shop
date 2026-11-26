"use client";

import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { ChatSuggestions } from "./ChatSuggestions";
import { useScrollToEnd } from "./useScrollToEnd";

type Props = {
  chat: { messages: ChatMessage[]; isSending: boolean; error: string | null; send: (text: string) => void; retry: () => void };
};

/** The conversation: buyer on the right (green), assistant on the left; example questions when empty. */
export function ChatMessageList({ chat }: Props) {
  const { messages, isSending, error } = chat;
  const boxRef = useScrollToEnd<HTMLDivElement>(`${messages.length}-${isSending}-${error}`);

  return (
    <div ref={boxRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
      {messages.length === 0 && <ChatSuggestions onPick={chat.send} />}
      {messages.map((message, index) => (
        <p
          key={index}
          className={cn(
            "max-w-[85%] rounded-2xl px-4 py-2.5 break-words whitespace-pre-wrap",
            message.role === "user"
              ? "self-end rounded-br-md bg-brand text-white"
              : "self-start rounded-bl-md border border-line bg-white text-ink",
          )}
        >
          {message.content}
        </p>
      ))}
      {isSending && (
        <p className="animate-pulse self-start rounded-2xl rounded-bl-md bg-brand-50 px-4 py-2.5 text-ink">
          Бодож байна…
        </p>
      )}
      {error && (
        <div className="flex flex-col items-start gap-2 self-start">
          <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-line px-4 py-2.5 text-ink">
            <span className="font-semibold">Хариу ирсэнгүй.</span> {error}
          </p>
          <button
            type="button"
            onClick={chat.retry}
            className="flex min-h-11 items-center gap-1.5 rounded-full border border-brand px-4 font-semibold text-brand hover:bg-brand-50"
          >
            <RotateCcw className="size-4" aria-hidden />
            Дахин асуух
          </button>
        </div>
      )}
    </div>
  );
}
