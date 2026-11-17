"use client";

import { Menu, X } from "lucide-react";
import { useDrawer } from "../_features/useDrawer";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarNav } from "./SidebarNav";

export function MobileSidebar() {
  const { open, show, hide } = useDrawer();

  return (
    <>
      <button
        onClick={show}
        className="grid size-10 place-items-center rounded-full hover:bg-cream-2 lg:hidden"
        aria-label="Цэс нээх"
      >
        <Menu className="size-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Админ цэс">
          <div className="absolute inset-0 bg-ink/40" onClick={hide} />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[86%] flex-col bg-white shadow-float">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <SidebarBrand />
              <button
                onClick={hide}
                className="grid size-10 place-items-center rounded-full hover:bg-cream-2"
                aria-label="Цэс хаах"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarNav onNavigate={hide} />
            </div>
            <SidebarFooter />
          </aside>
        </div>
      )}
    </>
  );
}
