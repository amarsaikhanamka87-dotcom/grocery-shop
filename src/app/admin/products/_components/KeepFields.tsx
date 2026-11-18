import type { Product } from "@/types/catalog";

/**
 * The edit dialog only shows "Үнэ ба үлдэгдэл"; these hidden inputs send the rest unchanged so
 * updateProduct still gets (and validates) a full product.
 */
export function KeepFields({ product: p }: { product: Product }) {
  return (
    <>
      <input type="hidden" name="name" value={p.name} />
      <input type="hidden" name="slug" value={p.slug} />
      <input type="hidden" name="categoryId" value={p.categoryId} />
      <input type="hidden" name="origin" value={p.origin ?? ""} />
      <input type="hidden" name="description" value={p.description} />
      <input type="hidden" name="image" value={p.image} />
      {p.isFeatured && <input type="hidden" name="isFeatured" value="on" />}
      {p.isOrganic && <input type="hidden" name="isOrganic" value="on" />}
    </>
  );
}
