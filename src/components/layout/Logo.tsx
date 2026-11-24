import Link from "next/link";
import { SHOP_NAME } from "@/lib/constants";
import { LogoMark } from "./LogoMark";

/**
 * Mark + shop name (2 short lines, so the long name fits the header, phones included), linking
 * home. `light` = on a dark background (footer).
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SHOP_NAME} нүүр хуудас`}>
      <LogoMark light={light} className="size-9 shrink-0" />
      <span
        className={`block max-w-[7.5rem] text-[16px] leading-[1.1] font-extrabold tracking-[-0.02em] ${
          light ? "text-white" : "text-brand"
        }`}
      >
        {SHOP_NAME}
      </span>
    </Link>
  );
}
