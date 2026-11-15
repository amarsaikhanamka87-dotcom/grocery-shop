/** Sale discount in whole percent (0 when there's no old price). */
export function discountPercent(price: number, oldPrice: number | null): number {
  return oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
}
