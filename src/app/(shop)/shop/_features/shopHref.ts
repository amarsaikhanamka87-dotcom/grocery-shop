export type ShopParams = {
  category?: string;
  q?: string;
  sort?: string;
  deals?: string;
  organic?: string;
};

/** Builds a /shop URL from the current params plus a change (undefined removes a param). */
export function shopHref(base: ShopParams, patch: ShopParams) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...base, ...patch })) if (v) params.set(k, v);
  const s = params.toString();
  return s ? `/shop?${s}` : "/shop";
}
