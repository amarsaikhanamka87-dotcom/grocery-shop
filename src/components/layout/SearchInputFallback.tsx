/** Plain search box shown until SearchInput (which reads ?q) is ready. */
export function SearchInputFallback() {
  return (
    <input
      name="q"
      type="search"
      placeholder="Ногоо хайх"
      aria-label="Бүтээгдэхүүн хайх"
      className="h-12 w-full min-w-0 rounded-full border border-line bg-white pr-12 pl-3 text-[16px] outline-none sm:pr-24 sm:pl-11 md:pr-28 placeholder:text-muted-foreground/80 focus:border-brand"
    />
  );
}
