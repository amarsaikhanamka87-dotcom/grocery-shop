"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { dayHref } from "./dayHref";

/** Opens the dashboard on a picked date ("2026-11-22"); `pending` while that day loads. */
export function useGoToDay(todayKey: string) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const goToDay = (key: string) => {
    if (!key) return;
    start(() => router.push(dayHref(key, todayKey)));
  };
  return { pending, goToDay };
}
