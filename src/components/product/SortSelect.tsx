"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  ["popular", "Онцлох"],
  ["new", "Шинээр нэмэгдсэн"],
  ["price-asc", "Үнэ: багаас их"],
  ["price-desc", "Үнэ: ихээс бага"],
];

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <label className="flex items-center gap-2 text-[14px] font-medium text-muted">
      Эрэмбэлэх:
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          next.set("sort", e.target.value);
          router.push(`${pathname}?${next.toString()}`);
        }}
        className="h-10 rounded-full border border-line bg-white px-4 text-[14px] font-semibold text-ink outline-none focus:border-brand"
      >
        {OPTIONS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
