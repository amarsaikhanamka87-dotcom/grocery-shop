"use client";

import { useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

/** The search box. On /shop it keeps the searched word (?q) so a typo can be fixed; ✕ empties it.
 *  ✕ shows only while the box is in use and has text, so a narrow phone box shows the word itself. */
export function SearchInput() {
  const pathname = usePathname();
  const params = useSearchParams();
  const query = pathname === "/shop" ? (params.get("q") ?? "") : "";
  const [text, setText] = useState(query);
  const [shownQuery, setShownQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // A new search (or leaving /shop) puts the box back in step with the URL.
  if (query !== shownQuery) {
    setShownQuery(query);
    setText(query);
  }

  function clearSearch() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <>
      <input
        ref={inputRef}
        name="q"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ногоо хайх"
        aria-label="Бүтээгдэхүүн хайх"
        className={`h-12 w-full min-w-0 rounded-full border border-line bg-white pl-3 text-[16px] outline-none sm:pl-11 placeholder:text-muted-foreground/80 focus:border-brand [&::-webkit-search-cancel-button]:hidden ${
          text
            ? "pr-12 sm:pr-24 md:pr-28 group-focus-within/search-form:pr-24 sm:group-focus-within/search-form:pr-32 md:group-focus-within/search-form:pr-36"
            : "pr-12 sm:pr-24 md:pr-28"
        }`}
      />
      {text && (
        <button
          type="button"
          onClick={clearSearch}
          // Keep focus in the box: a tap would otherwise blur it (Safari) and hide ✕ before the click.
          onPointerDown={(e) => e.preventDefault()}
          aria-label="Хайлт арилгах"
          className="absolute right-12 hidden size-11 group-focus-within/search-form:grid place-items-center text-muted-foreground hover:text-ink sm:right-[76px] md:right-[92px]"
        >
          <X className="size-5" />
        </button>
      )}
    </>
  );
}
