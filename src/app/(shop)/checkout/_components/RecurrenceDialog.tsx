"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { RecurrencePlan } from "../_features/checkoutSchema";
import { RecurrenceForm } from "./RecurrenceForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: RecurrencePlan | null;
  onSave: (plan: RecurrencePlan) => void;
};

/** "Давтамжит" modal opened from its delivery card (looks like docs/example-img/frequency.png). */
export function RecurrenceDialog({ open, onOpenChange, initial, onSave }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white text-ink shadow-xl outline-none">
          {/* Mounted only while open, so the form starts from the saved plan each time. */}
          {open && <RecurrenceForm initial={initial} onSave={onSave} />}
          <Dialog.Close
            aria-label="Хаах"
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-ink/5 hover:text-ink"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
