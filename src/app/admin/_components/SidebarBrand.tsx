import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SHOP_NAME } from "@/lib/constants";

export function SidebarBrand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-[10px] bg-brand text-white">
        <ShieldCheck className="size-5" strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className="block text-[17px] font-extrabold text-brand">{SHOP_NAME}</span>
        <span className="block text-xs font-semibold text-muted-foreground">Админ</span>
      </span>
    </Link>
  );
}
