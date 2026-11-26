/**
 * Where the floating "Асуух" button sits. On phones the product page has a sticky "Сагсанд нэмэх"
 * bar at the bottom, so the button moves above it there (and it covers no card, so it stays shown).
 */
export function chatButtonPlacement(pathname: string): { className: string; isAboveStickyBar: boolean } {
  const isAboveStickyBar = pathname.startsWith("/product/");
  return {
    className: isAboveStickyBar ? "bottom-24 lg:bottom-6" : "bottom-4 md:bottom-6",
    isAboveStickyBar,
  };
}
