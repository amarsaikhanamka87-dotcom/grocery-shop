import { shopHref, type ShopParams } from "./shopHref";

type EmptyState = { hint: string; action: { href: string; label: string } };

const ALL = { href: "/shop", label: "Бүх бүтээгдэхүүн" };

/** Why /shop is empty, in words the buyer can act on, and the one way out that keeps what still
 *  makes sense (a category with a filter keeps the category and drops the filter). */
export function emptyState(params: ShopParams, categoryName: string | undefined): EmptyState {
  if (params.q) return { hint: "Өөр түлхүүр үгээр хайж үзнэ үү.", action: ALL };
  const filter = [params.organic && "органик", params.deals && "хямдралтай"].filter(Boolean).join(", ");
  if (categoryName && filter) {
    return {
      hint: `${categoryName} ангилалд ${filter} бүтээгдэхүүн алга.`,
      action: {
        href: shopHref(params, { organic: undefined, deals: undefined }),
        label: "Шүүлтүүр арилгах",
      },
    };
  }
  if (filter) return { hint: `Одоогоор ${filter} бүтээгдэхүүн алга.`, action: ALL };
  if (categoryName) return { hint: "Энэ ангилалд одоогоор бүтээгдэхүүн алга.", action: ALL };
  return { hint: "Одоогоор бүтээгдэхүүн алга.", action: ALL };
}
