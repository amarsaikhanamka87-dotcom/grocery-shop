"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { periodHref } from "@/lib/date/periodHref";
import type { PeriodKind } from "@/types/period";

type Target = { path: string; kind: PeriodKind; todayKey: string; extra: Record<string, string> };

/** Opens the report on the period holding a picked date ("2026-11-22"); `isPending` while it loads. */
export function usePeriodDatePicker({ path, kind, todayKey, extra }: Target) {
  const router = useRouter();
  const [isPending, start] = useTransition();
  const goToDate = (key: string) => {
    if (!key) return;
    start(() => router.push(periodHref(path, kind, key === todayKey ? null : key, extra)));
  };
  return { isPending, goToDate };
}
