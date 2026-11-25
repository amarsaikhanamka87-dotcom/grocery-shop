import { z } from "zod";

/** A database row id (cuid) sent from the browser: checked on the server before any query. */
export const idSchema = z.string().trim().min(1).max(64).regex(/^[a-z0-9]+$/i);
