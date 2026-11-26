"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { addressLabel } from "@/lib/location/addressLabel";
import { PICKUP_POINT } from "@/lib/constants";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { AddressConfirmPopover } from "./AddressConfirmPopover";
import { useIsMdUp } from "./useIsMdUp";

/** md+ header pill with the delivery address (phones use AddressLine under the header instead). */
export function AddressPill() {
  const loc = useDeliveryLocation();
  const isMdUp = useIsMdUp();
  const pickup = loc.mode === "pickup";
  const title = pickup ? addressLabel(PICKUP_POINT) : loc.current ? addressLabel(loc.current) : "Хаяг сонгох";
  return (
    <AddressConfirmPopover
      isActive={isMdUp}
      className="hidden h-12 min-w-0 items-center gap-2.5 rounded-xl bg-ink/5 px-3 text-left hover:bg-ink/10 md:flex md:max-w-[240px] max-lg:shrink-0 xl:min-w-[190px]"
    >
      <MapPin className="size-5 shrink-0 text-ink-2" />
      <span className="hidden min-w-0 leading-tight lg:block">
        <span className="block truncate text-[16px] font-bold">{loc.ready ? title : "…"}</span>
      </span>
      {!pickup && <ChevronDown className="hidden size-4 shrink-0 text-muted-foreground lg:block" />}
    </AddressConfirmPopover>
  );
}
