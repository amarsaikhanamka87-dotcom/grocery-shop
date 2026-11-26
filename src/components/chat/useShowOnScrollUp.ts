"use client";

import { useEffect, useState } from "react";

/**
 * Phones: the floating "Асуух" pill would sit on a product card's "Сагслах" button, so it stays
 * hidden on load and while scrolling down, and shows when the buyer scrolls up (or reaches the
 * page bottom, where the footer leaves room for it). `alwaysShow` skips all this (md+, product page).
 */
export function useShowOnScrollUp(alwaysShow: boolean) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (alwaysShow) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (Math.abs(y - lastY) < 8 && !atBottom) return;
      setIsShown(y < lastY || atBottom);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysShow]);

  return alwaysShow || isShown;
}
