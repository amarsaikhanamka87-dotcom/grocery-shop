import { Suspense } from "react";
import { Search } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { SearchInputFallback } from "./SearchInputFallback";

/**
 * Product search (goes to /shop?q=). Phones: no left icon and a round icon-only button, so the
 * box still fits next to the "Хүргэлт | Очиж авах" switch; sm+: icon on the left and "Хайх".
 */
export function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/shop" role="search" className={`group/search-form relative flex items-center ${className}`}>
      <Search className="pointer-events-none absolute left-4 hidden size-[18px] text-muted-foreground sm:block" />
      {/* useSearchParams needs a Suspense boundary; the fallback is the same box, empty. */}
      <Suspense fallback={<SearchInputFallback />}>
        <SearchInput />
      </Suspense>
      <button
        type="submit"
        aria-label="Хайх"
        className="btn btn-primary absolute right-0.5 size-11 p-0 sm:h-9 sm:w-auto sm:px-4 sm:text-[16px] md:right-1.5 md:px-5"
      >
        <Search className="size-4 sm:hidden" />
        <span className="hidden sm:inline">Хайх</span>
      </button>
    </form>
  );
}
