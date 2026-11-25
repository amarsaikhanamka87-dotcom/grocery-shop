"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { PosProduct } from "@/lib/catalog/getPosProducts";
import { PosProductButton } from "./PosProductButton";

type Props = {
  products: PosProduct[];
  inBill: Map<string, number>; // productId → quantity already in the bill (tile badge)
  onPick: (product: PosProduct) => void;
};

/** Search box + a grid of product tiles; tapping a tile adds one to the bill. */
export function ProductPicker({ products, inBill, onPick }: Props) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
  return (
    <section className="card p-4">
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Бараа хайх…"
          className="input h-11 w-full pl-9 text-[16px]"
          autoFocus
        />
      </label>
      {shown.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">Бараа олдсонгүй.</p>
      ) : (
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4">
          {shown.map((product) => (
            <li key={product.id}>
              <PosProductButton product={product} inBill={inBill.get(product.id) ?? 0} onPick={onPick} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
