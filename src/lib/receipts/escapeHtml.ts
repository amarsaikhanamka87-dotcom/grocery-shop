const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Makes buyer-typed text (names, addresses) safe to put inside receipt HTML. */
export function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ENTITIES[char]);
}
