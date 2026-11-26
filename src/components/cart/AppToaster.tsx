"use client";

import { Toaster } from "sonner";
import { useIsMdUp } from "@/components/location/useIsMdUp";

/** Pop-ups: at the bottom on phones; from md up top-right, just under the header's "Сагс" button
 *  (top-center covered the delivery switch and the address pill). */
export function AppToaster() {
  const isMdUp = useIsMdUp();
  return <Toaster
      position={isMdUp ? "top-right" : "bottom-center"}
      offset={isMdUp ? { top: 72, right: 16 } : 16}
      mobileOffset={16}
    />;
}
