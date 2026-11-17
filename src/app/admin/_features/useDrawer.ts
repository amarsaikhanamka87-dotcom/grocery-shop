"use client";

import { useEffect, useState } from "react";

// Open/close state for the mobile sidebar: locks page scroll and closes on Escape.
export function useDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return { open, show: () => setOpen(true), hide: () => setOpen(false) };
}
