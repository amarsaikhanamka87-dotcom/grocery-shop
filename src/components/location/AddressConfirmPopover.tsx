"use client";

import { Popover } from "@base-ui/react/popover";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { ConfirmAddressCard } from "./ConfirmAddressCard";

type Props = { isActive: boolean; className: string; children: React.ReactNode };

/**
 * An address trigger (header pill or phone address line) with the "Энэ хаяг руу хүргүүлэх үү?"
 * popup next to it. Tapping it opens "Хаяг сонгох". The popup stays until answered: outside
 * clicks / Esc don't close it. Only the `isActive` trigger (the one on screen) shows the popup.
 */
export function AddressConfirmPopover({ isActive, className, children }: Props) {
  const loc = useDeliveryLocation();
  const pickup = loc.mode === "pickup";
  return (
    <Popover.Root
      open={isActive && !pickup && !!loc.suggestion && !loc.dialogOpen}
      onOpenChange={(open) => {
        if (open && !pickup) loc.setDialogOpen(true);
      }}
    >
      <Popover.Trigger className={className} aria-label="Хүргүүлэх хаяг сонгох">
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="start" sideOffset={10} collisionPadding={16} className="z-50">
          <Popover.Popup className="w-[min(92vw,400px)] rounded-2xl border border-line bg-white p-5 text-ink shadow-xl outline-none">
            {loc.suggestion && <ConfirmAddressCard address={loc.suggestion} onAnswer={loc.answerSuggestion} />}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
