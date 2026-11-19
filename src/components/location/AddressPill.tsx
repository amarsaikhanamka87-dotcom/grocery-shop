"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { addressLabel } from "@/lib/location/addressLabel";
import { PICKUP_POINT } from "@/lib/constants";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { ConfirmAddressCard } from "./ConfirmAddressCard";
import { AddressDialog } from "./AddressDialog";

/** Header pill with the delivery address; clicking opens "Хаяг сонгох". */
export function AddressPill() {
  const loc = useDeliveryLocation();
  const pickup = loc.mode === "pickup";
  const title = pickup ? addressLabel(PICKUP_POINT) : loc.current ? addressLabel(loc.current) : "Хаяг сонгох";

  return (
    <>
      {/* "Энэ хаяг руу хүргүүлэх үү?" stays until answered: outside clicks/Esc don't close it, and
          it comes back if "Үгүй" → "Хаяг сонгох" is closed without choosing an address. */}
      <Popover.Root
        open={!pickup && !!loc.suggestion && !loc.dialogOpen}
        onOpenChange={(open) => {
          if (open && !pickup) loc.setDialogOpen(true);
        }}
      >
        <Popover.Trigger
          className="flex h-10 min-w-0 items-center gap-2.5 rounded-xl bg-cream-2 px-2.5 text-left max-lg:shrink-0 hover:bg-line/60 md:h-12 md:max-w-[300px] md:px-3"
          aria-label="Хүргүүлэх хаяг сонгох"
        >
          <MapPin className="size-5 shrink-0 text-ink-2" />
          <span className="hidden min-w-0 leading-tight lg:block">
            <span className="block truncate text-[13px] font-bold">{loc.ready ? title : "…"}</span>
            <span className="block truncate text-[11px] font-medium text-muted-foreground">
              {pickup ? "Очиж авах цэг" : "Таны хүргүүлэх хаяг"}
            </span>
          </span>
          {!pickup && <ChevronDown className="hidden size-4 shrink-0 text-muted-foreground lg:block" />}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner align="start" sideOffset={10} collisionPadding={16} className="z-50">
            <Popover.Popup className="w-[min(92vw,400px)] rounded-2xl border border-line bg-white p-5 text-ink shadow-xl outline-none">
              {loc.suggestion && <ConfirmAddressCard address={loc.suggestion} onAnswer={loc.answerSuggestion} />}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
      <AddressDialog />
    </>
  );
}
