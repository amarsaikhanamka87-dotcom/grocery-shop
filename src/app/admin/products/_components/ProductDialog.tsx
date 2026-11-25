"use client";

import { useCallback, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Pencil, Plus, X } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { ProductForm } from "./ProductForm";

/**
 * Product form in a dialog: a bottom sheet on phones, a centered card from `sm` up. With `product`
 * the trigger is the row's pencil button; without it, the page's "Шинэ бүтээгдэхүүн" button.
 */
export function ProductDialog({ product, categories }: { product?: Product; categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {product ? (
        <Dialog.Trigger className="btn btn-outline h-11 px-4 text-[14px]">
          <Pencil className="size-4" /> <span className="md:hidden">Үнэ, үлдэгдэл засах</span>
          <span className="hidden md:inline">Засах</span>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger className="btn btn-primary h-11 w-full px-4 sm:w-auto">
          <Plus className="size-4" /> Шинэ бүтээгдэхүүн
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-3xl bg-white outline-none transition-transform data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border sm:border-line sm:data-[ending-style]:translate-y-[-50%] sm:data-[ending-style]:opacity-0 sm:data-[starting-style]:translate-y-[-50%] sm:data-[starting-style]:opacity-0">
          <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line sm:hidden" />
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 pt-3 pb-4 sm:px-6 sm:pt-5">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-extrabold text-ink sm:text-xl">
                {product ? "Үнэ ба үлдэгдэл засах" : "Шинэ бүтээгдэхүүн"}
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 truncate text-[14px] text-muted-foreground">
                {product ? product.name : "Мэдээллээ бөглөөд хадгална уу."}
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label="Хаах" className="-mr-2 grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-cream">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <ProductForm product={product} categories={categories} onSaved={close} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
