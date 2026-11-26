import "server-only";
import { Pinecone } from "@pinecone-database/pinecone";

let client: Pinecone | null = null;

/** The Pinecone client, or null when PINECONE_API_KEY is not set (callers show a friendly message). */
export function getPinecone(): Pinecone | null {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) return null;
  client ??= new Pinecone({ apiKey });
  return client;
}
