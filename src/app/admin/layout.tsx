import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/session";
import { Logo } from "@/components/layout/Logo";
import { logout } from "../(shop)/(auth)/actions";
import { AdminNav } from "./AdminNav";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { default: "Админ", template: "%s | Ургац Админ" } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <span className="rounded-md bg-clay-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-clay">Админ</span>
        </div>
        <AdminNav />
        <div className="hidden border-t border-line p-4 lg:block">
          <p className="truncate text-sm font-bold">{user.name}</p>
          <p className="truncate text-[12px] text-muted">{user.email}</p>
          <div className="mt-3 flex gap-2">
            <Link href="/" className="btn btn-outline h-9 flex-1 px-3 text-[13px]">
              <ExternalLink className="size-3.5" /> Сайт
            </Link>
            <form action={logout} className="flex-1">
              <button className="btn btn-outline h-9 w-full px-3 text-[13px]">
                <LogOut className="size-3.5" /> Гарах
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
    </div>
  );
}
