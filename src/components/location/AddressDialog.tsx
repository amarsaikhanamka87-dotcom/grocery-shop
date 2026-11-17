"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useDeliveryLocation } from "./useDeliveryLocation";
import { AddressDialogBody } from "./AddressDialogBody";

/** The "Хаяг сонгох" modal; opened from the header pill, "Үгүй" or checkout. */
export function AddressDialog() {
  const { dialogOpen, setDialogOpen } = useDeliveryLocation();
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white text-ink shadow-xl outline-none">
          {dialogOpen && <AddressDialogBody />}
          <Dialog.Close
            aria-label="Хаах"
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-cream-2 hover:text-ink"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
