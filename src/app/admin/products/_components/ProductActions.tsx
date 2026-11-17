"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Trash2, X } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { deleteProduct } from "../_features/deleteProduct";
import { ProductDialog } from "./ProductDialog";

const icon = "grid size-9 place-items-center rounded-full transition-colors disabled:opacity-60";

/** Edit (dialog) + delete icon buttons; delete asks "sure?" inline (no browser dialog). */
export function ProductActions({ product, categories }: { product: Product; categories: Category[] }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-clay-50 p-0.5">
        <button
          disabled={pending}
          onClick={() => start(() => deleteProduct(product.id))}
          aria-label={`“${product.name}”-г устгах`}
          className={`${icon} bg-clay text-white hover:bg-clay/90`}
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
        </button>
        <button disabled={pending} onClick={() => setConfirming(false)} aria-label="Болих" className={`${icon} text-clay hover:bg-white`}>
          <X className="size-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <ProductDialog product={product} categories={categories} />
      <button onClick={() => setConfirming(true)} aria-label="Устгах" title="Устгах" className={`${icon} text-muted-foreground hover:bg-clay-50 hover:text-clay`}>
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
