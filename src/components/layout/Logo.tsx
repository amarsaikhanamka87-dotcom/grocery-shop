import Link from "next/link";
import { SHOP_NAME } from "@/lib/constants";

const words = SHOP_NAME.split(" ");
const lastWord = words.pop();
const firstWords = words.join(" ");

/**
 * The store name as plain text (Manrope, no logo image), linking home. Header, footer and mobile
 * menu. `light` = on a dark background (footer). 15px below md, 20px from md: the one brand mark,
 * outside the 3 text styles. One line; in the crowded header on phones narrower than 390px the last
 * word drops to a second line instead of being cut ("Бөөний Зах / Онлайн"). py-3 keeps the link 44px tall.
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`block min-w-0 shrink truncate py-3 text-[15px] leading-[20px] font-extrabold tracking-[-0.02em] whitespace-nowrap md:text-[20px] md:leading-[24px] md:py-2.5 xl:shrink-0 ${
        light ? "text-white" : "text-brand max-[389px]:py-0.5 max-[389px]:whitespace-normal"
      }`}
    >
      {firstWords}
      <span className={light ? undefined : "max-[389px]:block"}> {lastWord}</span>
    </Link>
  );
}
