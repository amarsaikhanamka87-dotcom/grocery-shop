/** Unit after a cart quantity: "1 кг" → "кг", "хайрцаг (20 кг)" → "хайрцаг", "500 гр" → "× 500 гр". */
export function cartUnitLabel(unit: string): string {
  const u = unit.replace(/\s*\(.*\)\s*$/, "").trim();
  if (/^1\s+/.test(u)) return u.replace(/^1\s+/, "");
  return /^\d/.test(u) ? `× ${u}` : u;
}
