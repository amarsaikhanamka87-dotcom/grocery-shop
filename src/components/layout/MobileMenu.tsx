"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Building2, Heart, Menu, User, X } from "lucide-react";
import { NAV } from "./nav";
import { Logo } from "./Logo";

export function MobileMenu({ user }: { user: { name: string; role: string } | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Rendered into <body> so the header's backdrop-blur can't trap the fixed drawer.
  const drawer = (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Цэс">
      <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
      <aside
        className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream shadow-float"
        onClick={(e) => {
          // Close the drawer when a link inside it is followed.
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full hover:bg-cream-2"
            aria-label="Цэс хаах"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto overscroll-contain p-3">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-line/70 py-1 last:border-b-0">
              <Link
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3 py-3 text-[16px] font-bold active:bg-cream-2 ${item.dot ? "text-clay" : ""}`}
              >
                {item.dot && <span className="size-1.5 rounded-full bg-clay" />}
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-2 ml-3 grid gap-0.5 border-l border-line pl-3">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-2 active:bg-cream-2"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="grid shrink-0 gap-2 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {user ? (
            <Link href={user.role === "ADMIN" ? "/admin" : "/account"} className="btn btn-primary h-12">
              <User className="size-4" /> {user.name}
            </Link>
          ) : (
            <>
              <Link href="/register" className="btn btn-primary h-12">
                <Building2 className="size-4" /> Байгууллагаар бүртгүүлэх
              </Link>
              <Link href="/login" className="btn btn-outline h-12">
                <User className="size-4" /> Нэвтрэх
              </Link>
            </>
          )}
          <Link href="/wishlist" className="btn btn-outline h-12">
            <Heart className="size-4" /> Хадгалсан бараа
          </Link>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-cream-2 lg:hidden"
        aria-label="Цэс нээх"
        aria-expanded={open}
      >
        <Menu className="size-5" />
      </button>
      {open && createPortal(drawer, document.body)}
    </>
  );
}
