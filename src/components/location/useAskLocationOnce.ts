"use client";

import { useEffect } from "react";
import type { DeliveryAddress, FoundAddress } from "@/types/location";

const ASKED_KEY = "location-asked-v2";

/**
 * Once per browser session (when delivering) and only for a buyer with a saved address: asks
 * "Энэ хаяг руу хүргүүлэх үү?". A new visitor is not asked anything (no GPS prompt, no "Хаяг сонгох"
 * form over the home page, owner's review 2026-11-25): the address is picked from the header or at
 * checkout. Not cancelled on cleanup: React dev mode runs effects twice, and that dropped the answer.
 */
export function useAskLocationOnce(
  enabled: boolean,
  current: DeliveryAddress | null,
  onFound: (address: FoundAddress) => void,
) {
  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(ASKED_KEY)) return;
      sessionStorage.setItem(ASKED_KEY, "1");
    } catch {
      return;
    }
    if (current) onFound(current);
  }, [enabled, current, onFound]);
}
