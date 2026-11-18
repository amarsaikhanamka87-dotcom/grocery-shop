import type { Recurrence } from "@prisma/client";

/** Mongolian name of each "Давтамжит" frequency. */
export const RECURRENCE_LABEL: Record<Recurrence, string> = {
  WEEKLY: "7 хоног бүр",
  BIWEEKLY: "14 хоног бүр",
  MONTHLY: "Сар бүр",
};
