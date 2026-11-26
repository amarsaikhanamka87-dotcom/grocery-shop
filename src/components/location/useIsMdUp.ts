"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * True from Tailwind's `md` width up. The address confirm popup opens next to the header pill
 * there and next to the phone address line below it, never both. False on the server.
 */
export function useIsMdUp() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
