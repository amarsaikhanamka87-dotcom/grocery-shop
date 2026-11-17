"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { addressLabel } from "@/lib/location/addressLabel";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { ConfirmAddressCard } from "./ConfirmAddressCard";
import { AddressDialog } from "./AddressDialog";

/** Header pill with the delivery address; clicking opens "Хаяг сонгох". */
export function AddressPill() {
  const loc = useDeliveryLocation();
  const title = loc.current ? addressLabel(loc.current) : "Хаяг сонгох";

  return (
    <>
      <Popover.Root
        open={!!loc.suggestion}
        onOpenChange={(open) => (open ? loc.setDialogOpen(true) : loc.dismissSuggestion())}
      >
        <Popover.Trigger
          className="flex h-10 min-w-0 items-center gap-2.5 rounded-xl bg-cream-2 px-2.5 text-left hover:bg-line/60 md:h-12 md:max-w-[300px] md:px-3"
          aria-label="Хүргүүлэх хаяг сонгох"
        >
          <MapPin className="size-5 shrink-0 text-ink-2" />
          <span className="hidden min-w-0 leading-tight md:block">
            <span className="block truncate text-[13px] font-bold">{loc.ready ? title : "…"}</span>
            <span className="block text-[11px] font-medium text-muted-foreground">Таны хүргүүлэх хаяг</span>
          </span>
          <ChevronDown className="hidden size-4 shrink-0 text-muted-foreground md:block" />
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
