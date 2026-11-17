"use client";

import type { FoundAddress } from "@/types/location";
import { reverseGeocode } from "./reverseGeocode";

/**
 * Asks the browser for the user's position (this shows the "allow location" prompt the first
 * time), then looks up the address. Null when denied, unsupported or not found.
 */
export function detectAddress(): Promise<FoundAddress | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => reverseGeocode(pos.coords.latitude, pos.coords.longitude).then(resolve, () => resolve(null)),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  });
}
