"use client";

import { useEffect, useState } from "react";

/** True while the element with this id is (at least partly) on screen. */
export function useIsOnScreen(elementId: string): boolean {
  const [isOnScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId]);
  return isOnScreen;
}
