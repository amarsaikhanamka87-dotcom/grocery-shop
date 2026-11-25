import Link from "next/link";
import { SHOP_NAME } from "@/lib/constants";

/**
 * The store name as plain text (Manrope, no logo image), linking home. Header, footer and mobile
 * menu. `light` = on a dark background (footer). Two short lines on narrow phones, one line from sm.
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`block max-w-[6.5rem] shrink-0 text-[17px] leading-[1.1] font-extrabold tracking-[-0.02em] sm:max-w-none sm:text-[20px] sm:whitespace-nowrap ${
        light ? "text-white" : "text-brand"
      }`}
    >
      {SHOP_NAME}
    </Link>
  );
}
