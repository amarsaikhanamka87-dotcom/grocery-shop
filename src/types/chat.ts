/** One line of the buyer's shop chat. */
export type ChatMessage = { role: "user" | "assistant"; content: string };

/** What the chat server action returns: the answer, or a friendly error to show instead. */
export type ChatReply = { reply: string } | { error: string };
