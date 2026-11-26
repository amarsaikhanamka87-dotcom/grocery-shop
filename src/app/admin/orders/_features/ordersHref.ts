/** /admin/orders URL keeping the tab and the type, e.g. ?view=check&type=pickup ("todo" / "" = default). */
export function ordersHref(view: string, type: string): string {
  const q = new URLSearchParams();
  if (view && view !== "todo") q.set("view", view);
  if (type) q.set("type", type);
  const s = q.toString();
  return s ? `/admin/orders?${s}` : "/admin/orders";
}
