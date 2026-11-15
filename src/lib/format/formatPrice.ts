/** 75000 -> "75,000₮" */
export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)}₮`;
}
