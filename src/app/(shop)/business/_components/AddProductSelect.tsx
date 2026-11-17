import type { Product } from "@prisma/client";

/** Dropdown of products not yet in the list; choosing one adds it at its minimum quantity. */
export function AddProductSelect({ products, onAdd }: { products: Product[]; onAdd: (p: Product) => void }) {
  return (
    <select
      value=""
      onChange={(e) => {
        const p = products.find((x) => x.id === e.target.value);
        if (p) onAdd(p);
      }}
      className="input"
      aria-label="Бүтээгдэхүүн нэмэх"
    >
      <option value="">+ Бүтээгдэхүүн нэмэх</option>
      {products.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name} ({p.unit})
        </option>
      ))}
    </select>
  );
}
