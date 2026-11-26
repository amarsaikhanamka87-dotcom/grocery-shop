"use client";

import { useState, useTransition } from "react";
import { askShopAssistant } from "@/lib/chat/askShopAssistant";
import { CHAT_MAX_CHARS } from "@/lib/constants";
import type { ChatMessage } from "@/types/chat";

/** Shop chat state: the conversation (kept while the buyer moves between pages), sending, error. */
export function useShopChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSending, startSending] = useTransition();

  const ask = (history: ChatMessage[]) => {
    setError(null);
    startSending(async () => {
      const result = await askShopAssistant(history);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setMessages([...history, { role: "assistant", content: result.reply }]);
    });
  };

  const send = (text: string) => {
    const question = text.trim().slice(0, CHAT_MAX_CHARS);
    if (!question || isSending) return;
    const history: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(history);
    ask(history);
  };

  // "Дахин асуух": the last question got no answer, so send the same conversation again.
  const retry = () => {
    if (isSending || messages.at(-1)?.role !== "user") return;
    ask(messages);
  };

  return { messages, error, isSending, send, retry };
}
