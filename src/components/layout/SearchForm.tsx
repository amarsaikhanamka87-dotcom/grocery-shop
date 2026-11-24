import { Search } from "lucide-react";

/**
 * Product search (goes to /shop?q=). Phones: no left icon and a round icon-only button, so the
 * box still fits next to the "Хүргэлт | Очиж авах" switch; sm+: icon on the left and "Хайх".
 */
export function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/shop" role="search" className={`relative flex items-center ${className}`}>
      <Search className="pointer-events-none absolute left-4 hidden size-[18px] text-muted-foreground sm:block" />
      <input
        name="q"
        type="search"
        placeholder="Ногоо хайх"
        aria-label="Бүтээгдэхүүн хайх"
        className="h-12 w-full rounded-full border border-line bg-white pr-11 pl-3 text-[16px] outline-none sm:pr-24 sm:pl-11 md:h-12 md:pr-28 md:text-[15px] placeholder:text-muted-foreground/80 focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Хайх"
        className="btn btn-primary absolute right-0.5 size-10 p-0 sm:h-9 sm:w-auto sm:px-4 sm:text-sm md:right-1.5 md:px-5"
      >
        <Search className="size-4 sm:hidden" />
        <span className="hidden sm:inline">Хайх</span>
      </button>
    </form>
  );
}
