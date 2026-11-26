import "server-only";
import { getPinecone } from "@/lib/ai/getPinecone";
import { SHOP_ASSISTANT_NAME, SHOP_KNOWLEDGE_FILE_ID } from "@/lib/constants";
import { shopKnowledgeText } from "./shopKnowledgeText";

/**
 * Rebuilds the shop's knowledge file from the DB and replaces it in the Pinecone assistant (same
 * file id every time). Runs after a product is added, edited or deleted, and from `npm run chat:setup`.
 * Never throws: a failed sync must not break the admin's save. Returns whether Pinecone accepted it.
 */
export async function syncShopKnowledge(): Promise<boolean> {
  const pinecone = getPinecone();
  if (!pinecone) return false;
  try {
    const text = await shopKnowledgeText();
    await pinecone.assistant({ name: SHOP_ASSISTANT_NAME }).upsertFile({
      assistantFileId: SHOP_KNOWLEDGE_FILE_ID,
      file: Buffer.from(text, "utf8"),
      fileName: "shop-knowledge.md",
    });
    return true;
  } catch (error) {
    console.error("[chat] knowledge sync failed", error);
    return false;
  }
}
