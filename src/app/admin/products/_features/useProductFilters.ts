"use client";

import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Admin product search + category filter, kept in the URL (?q=&category=) so the server filters. */
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  // The search box text; the URL catches up 300 ms after typing stops.
  const [text, setText] = useState(params.get("q") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function update(key: "q" | "category", value: string) {
    // Read the live URL: a debounced search may run after the category changed.
    const next = new URLSearchParams(window.location.search);
    if (value.trim()) next.set(key, value.trim());
    else next.delete(key);
    const qs = next.toString();
    start(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  return {
    text,
    category: params.get("category") ?? "",
    pending,
    setQuery: (value: string) => {
      setText(value);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => update("q", value), 300);
    },
    setCategory: (value: string) => update("category", value),
    clear: () => {
      clearTimeout(timer.current);
      setText("");
      start(() => router.replace(pathname, { scroll: false }));
    },
  };
}
