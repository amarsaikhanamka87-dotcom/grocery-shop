/** /admin/orders URL keeping both filters, e.g. ?pay=paid&type=pickup ("" = no filter). */
export function ordersHref(pay: string, type: string): string {
  const q = new URLSearchParams();
  if (pay) q.set("pay", pay);
  if (type) q.set("type", type);
  const s = q.toString();
  return s ? `/admin/orders?${s}` : "/admin/orders";
}
