// One-off: creates the shop's Pinecone assistant (or updates its instructions) and uploads the
// knowledge file built from the DB. Run: npm run chat:setup  (needs PINECONE_API_KEY in .env.local).
import { getPinecone } from "@/lib/ai/getPinecone";
import { shopAssistantInstructions } from "@/lib/chat/shopAssistantInstructions";
import { syncShopKnowledge } from "@/lib/chat/syncShopKnowledge";
import { SHOP_ASSISTANT_NAME } from "@/lib/constants";

const say = (line: string) => process.stdout.write(`${line}\n`);

async function setupShopAssistant() {
  const pinecone = getPinecone();
  if (!pinecone) throw new Error("PINECONE_API_KEY is not set.");

  const existing = await pinecone.listAssistants();
  const found = existing.assistants?.some((assistant) => assistant.name === SHOP_ASSISTANT_NAME);
  if (found) {
    await pinecone.updateAssistant({ name: SHOP_ASSISTANT_NAME, instructions: shopAssistantInstructions });
    say(`Updated instructions of "${SHOP_ASSISTANT_NAME}".`);
  } else {
    await pinecone.createAssistant({ name: SHOP_ASSISTANT_NAME, instructions: shopAssistantInstructions, region: "us" });
    say(`Created "${SHOP_ASSISTANT_NAME}".`);
  }

  // A new assistant takes a few seconds to start; uploads before "Ready" are refused.
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const { status } = await pinecone.describeAssistant(SHOP_ASSISTANT_NAME);
    if (status === "Ready") break;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const synced = await syncShopKnowledge();
  say(synced ? "Knowledge file uploaded (Pinecone processes it for ~1 min)." : "Knowledge upload FAILED.");
}

setupShopAssistant().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
