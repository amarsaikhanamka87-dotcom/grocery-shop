import { Search } from "lucide-react";

export function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/shop" role="search" className={`relative flex items-center ${className}`}>
      <Search className="pointer-events-none absolute left-4 size-[18px] text-muted-foreground" />
      <input
        name="q"
        type="search"
        placeholder="Төмс, лууван, лооль хайх"
        aria-label="Бүтээгдэхүүн хайх"
        className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-24 text-[16px] outline-none md:h-12 md:pr-28 md:text-[15px] placeholder:text-muted-foreground/80 focus:border-brand"
      />
      <button type="submit" className="btn btn-primary absolute right-1 h-9 px-4 text-sm md:right-1.5 md:px-5">
        Хайх
      </button>
    </form>
  );
}
