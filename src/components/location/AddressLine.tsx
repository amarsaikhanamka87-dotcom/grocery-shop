"use client";

import { MapPin, Store } from "lucide-react";
import { addressLabel } from "@/lib/location/addressLabel";
import { PICKUP_POINT } from "@/lib/constants";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { AddressConfirmPopover } from "./AddressConfirmPopover";
import { useIsMdUp } from "./useIsMdUp";

const row = "container-x flex h-11 w-full items-center gap-2 text-left text-[16px]";

/**
 * Phones: one thin line under the header with the address in words ("Хүргэх хаяг: … · Солих"),
 * instead of a bare pin icon in the crowded top row. It scrolls away with the page, so the sticky
 * header stays two rows. Pickup: where to collect, as plain text (nothing to choose).
 */
export function AddressLine() {
  const loc = useDeliveryLocation();
  const isMdUp = useIsMdUp();
  if (loc.mode === "pickup") {
    return (
      <p className={row}>
        <Store className="size-4 shrink-0 text-brand" />
        <span className="truncate">
          <span className="text-muted-foreground">Очиж авах:</span> <b className="font-bold">{addressLabel(PICKUP_POINT)}</b>
        </span>
      </p>
    );
  }
  const title = loc.current ? addressLabel(loc.current) : "сонгоогүй";
  return (
    <AddressConfirmPopover isActive={!isMdUp} className={`${row} hover:bg-ink/5`}>
      <MapPin className="size-4 shrink-0 text-brand" />
      <span className="min-w-0 truncate">
        <span className="text-muted-foreground">Хүргэх хаяг:</span> <b className="font-bold">{loc.ready ? title : "…"}</b>
      </span>
      <span className="ml-auto shrink-0 font-bold text-brand">{loc.current ? "Солих" : "Сонгох"}</span>
    </AddressConfirmPopover>
  );
}
