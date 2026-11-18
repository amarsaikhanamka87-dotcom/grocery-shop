"use client";

import { useEffect } from "react";
import { detectAddress } from "@/lib/location/detectAddress";
import type { DeliveryAddress, FoundAddress } from "@/types/location";

const ASKED_KEY = "location-asked-v2";

/**
 * Once per browser session (when delivering): asks "Энэ хаяг руу хүргүүлэх үү?" for the saved
 * address, or for the browser's GPS location when there is none. No location → "Хаяг сонгох".
 * Not cancelled on cleanup: React dev mode runs effects twice, and cancelling dropped the answer.
 */
export function useAskLocationOnce(
  enabled: boolean,
  current: DeliveryAddress | null,
  onFound: (address: FoundAddress) => void,
  openDialog: (open: boolean) => void,
) {
  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(ASKED_KEY)) return;
      sessionStorage.setItem(ASKED_KEY, "1");
    } catch {
      return;
    }
    if (current) return onFound(current);
    detectAddress().then((found) => (found ? onFound(found) : openDialog(true)));
  }, [enabled, current, onFound, openDialog]);
}
