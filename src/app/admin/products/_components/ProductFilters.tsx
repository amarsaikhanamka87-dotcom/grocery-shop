"use client";

import { Loader2, Search, X } from "lucide-react";
import type { CategoryWithCount } from "@/types/catalog";
import { useProductFilters } from "../_features/useProductFilters";

const chip = "shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors";
const on = "border-brand bg-brand text-white";
const off = "border-line bg-white text-ink-2 hover:border-ink";

/** Toolbar at the top of the products card: search box + category chips. */
export function ProductFilters({ categories }: { categories: CategoryWithCount[] }) {
  const { text, category, pending, setQuery, setCategory, clear } = useProductFilters();
  const active = text !== "" || category !== "";
  return (
    <div className="space-y-3 border-b border-line p-4">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={text}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Нэр эсвэл гарал үүслээр хайх"
            className="input h-10 py-0 pl-9"
          />
          {pending && <Loader2 className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />}
        </div>
        {active && (
          <button type="button" onClick={clear} className="btn btn-outline h-10 px-3 text-sm">
            <X className="size-4" /> <span className="hidden sm:inline">Цэвэрлэх</span>
          </button>
        )}
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        <button type="button" onClick={() => setCategory("")} className={`${chip} ${category === "" ? on : off}`}>
          Бүгд
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" onClick={() => setCategory(c.id)} className={`${chip} ${category === c.id ? on : off}`}>
            {c.name} <span className="opacity-60">{c.productCount}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
