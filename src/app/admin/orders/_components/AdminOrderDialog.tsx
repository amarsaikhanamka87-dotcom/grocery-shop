"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { AdminOrderDetail } from "./AdminOrderDetail";
import { DeliveredButton } from "./DeliveredButton";

type Props = { order: AdminOrder; children: React.ReactNode };

/**
 * The order row is the trigger; the dialog shows the order from data already loaded with the
 * list, plus "Хүргэж өгсөн" for paid orders still on their way.
 */
export function AdminOrderDialog({ order, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full cursor-pointer text-left transition-colors hover:bg-cream/60 focus-visible:bg-cream/60 focus-visible:outline-none">
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 text-ink shadow-xl outline-none">
          <Dialog.Title className="pr-10 text-xl font-extrabold">Захиалга #{order.number}</Dialog.Title>
          <Dialog.Description className="sr-only">Захиалгын дэлгэрэнгүй</Dialog.Description>
          <div className="mt-4">
            <AdminOrderDetail order={order} />
          </div>
          <DeliveredButton order={order} />
          <Dialog.Close
            aria-label="Хаах"
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-muted-foreground hover:bg-cream-2 hover:text-ink"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
