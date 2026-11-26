"use server";

import { z } from "zod";
import { getPinecone } from "@/lib/ai/getPinecone";
import { CHAT_MAX_CHARS, CHAT_MAX_MESSAGES, SHOP_ASSISTANT_NAME, SHOP_PHONE } from "@/lib/constants";
import type { ChatMessage, ChatReply } from "@/types/chat";
import { liveCatalogText } from "./liveCatalogText";

const Messages = z
  .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(CHAT_MAX_CHARS * 4) }))
  .min(1)
  .refine((messages) => messages.at(-1)?.role === "user", "Last message must be the buyer's.")
  .refine((messages) => (messages.at(-1)?.content.length ?? 0) <= CHAT_MAX_CHARS, "Question too long.");

const UNAVAILABLE = `Туслах одоогоор ажиллахгүй байна. ${SHOP_PHONE} дугаарт залгана уу.`;
const OFF_TOPIC = "Энэ асуултад хариулж чадахгүй. Бараа, үнэ, хүргэлт, төлбөрийн талаар асуугаарай.";

// The model sometimes still writes Markdown; the chat shows plain text, so drop the markers.
const plainText = (text: string) => text.replace(/\*\*|__|^#+\s*/gm, "").trim();

/**
 * Buyer's shop chat: sends the recent conversation to the Pinecone assistant, with today's prices
 * and stock appended to the newest question. Open to signed-out buyers; input is checked here.
 */
export async function askShopAssistant(history: ChatMessage[]): Promise<ChatReply> {
  const parsed = Messages.safeParse(history);
  if (!parsed.success) return { error: `Асуултаа ${CHAT_MAX_CHARS} тэмдэгтээс богино бичнэ үү.` };

  const pinecone = getPinecone();
  if (!pinecone) return { error: UNAVAILABLE };

  const recent = parsed.data.slice(-CHAT_MAX_MESSAGES);
  try {
    const catalog = await liveCatalogText();
    const question = recent[recent.length - 1];
    const messages = [...recent.slice(0, -1), { role: "user", content: `${question.content}\n\n${catalog}` }];
    const response = await pinecone.assistant({ name: SHOP_ASSISTANT_NAME }).chat({ messages, temperature: 0.2 });
    const reply = plainText(response.message?.content ?? "");
    return reply ? { reply } : { error: UNAVAILABLE };
  } catch (error) {
    // The AI provider refuses some prompts (e.g. "ignore your instructions"): that is not an outage.
    if (String(error).includes("content_filter")) return { error: OFF_TOPIC };
    console.error("[chat] assistant call failed", error);
    return { error: UNAVAILABLE };
  }
}
