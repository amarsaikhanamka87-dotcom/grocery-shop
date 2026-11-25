"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { deleteProduct } from "../_features/deleteProduct";
import { ProductDialog } from "./ProductDialog";

/**
 * Edit (dialog) + delete. Delete asks first, in words with the product's name ("Болих" /
 * "Тийм, устгах"), inline (no browser dialog), so a stray tap never removes a product.
 */
export function ProductActions({ product, categories }: { product: Product; categories: Category[] }) {
  const [pending, start] = useTransition();
  const [isConfirming, setConfirming] = useState(false);

  if (isConfirming) {
    return (
      <div className="grid gap-2 rounded-2xl bg-clay-50 p-3">
        <p className="text-[14px] font-semibold text-clay">“{product.name}”-г устгах уу? Буцааж болохгүй.</p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => setConfirming(false)}
            className="btn h-11 flex-1 bg-white px-4 text-[14px] text-ink"
          >
            Болих
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => start(() => deleteProduct(product.id))}
            className="btn h-11 flex-1 bg-clay px-4 text-[14px] text-white hover:bg-clay/90"
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />} Тийм, устгах
          </button>
        </div>
      </div>
    );
  }
  return (
    // "Засах" on the left, "Устгах" at the far right (asks "sure?" first), so they're never mis-tapped.
    <div className="flex items-center justify-between gap-3">
      <ProductDialog product={product} categories={categories} />
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="flex h-11 items-center gap-1.5 rounded-full px-3 text-[14px] font-semibold text-muted-foreground hover:bg-clay-50 hover:text-clay"
      >
        <Trash2 className="size-4" /> Устгах
      </button>
    </div>
  );
}
