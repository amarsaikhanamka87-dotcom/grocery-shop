import { formatPrice } from "./formatPrice";

/** One price ("5,200₮") or, when it changed during the day, the range ("5,000–5,200₮"). */
export function priceRangeText(minPrice: number, maxPrice: number) {
  if (minPrice === maxPrice) return formatPrice(minPrice);
  return `${new Intl.NumberFormat("en-US").format(minPrice)}–${formatPrice(maxPrice)}`;
}
