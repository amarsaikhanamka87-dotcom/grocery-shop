import type { PeriodKind } from "@/types/period";

/**
 * An admin report URL for a period: `/admin/receipts?period=week&date=2026-11-16`. The defaults
 * (one day, the current period) are left out so the address stays clean; `extra` keeps other
 * filters such as ?status=.
 */
export function periodHref(path: string, kind: PeriodKind, dateKey: string | null, extra: Record<string, string> = {}) {
  const q = new URLSearchParams();
  if (kind !== "day") q.set("period", kind);
  if (dateKey) q.set("date", dateKey);
  for (const [name, value] of Object.entries(extra)) if (value) q.set(name, value);
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}
