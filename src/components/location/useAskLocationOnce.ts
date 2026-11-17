"use client";

import { useEffect } from "react";
import { detectAddress } from "@/lib/location/detectAddress";
import type { FoundAddress } from "@/types/location";

const ASKED_KEY = "location-asked";

/**
 * On opening the site without a chosen address, asks the browser for the location once per
 * browser session and hands the found address to `onFound` (→ the confirm pop-up).
 */
export function useAskLocationOnce(enabled: boolean, onFound: (address: FoundAddress) => void) {
  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(ASKED_KEY)) return;
      sessionStorage.setItem(ASKED_KEY, "1");
    } catch {
      return;
    }
    let cancelled = false;
    detectAddress().then((found) => {
      if (found && !cancelled) onFound(found);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, onFound]);
}
