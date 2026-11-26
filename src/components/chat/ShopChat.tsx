"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIsMdUp } from "@/components/location/useIsMdUp";
import { cn } from "@/lib/utils";
import { chatButtonPlacement } from "./chatButtonPlacement";
import { ChatPanel } from "./ChatPanel";
import { useShopChat } from "./useShopChat";
import { useShowOnScrollUp } from "./useShowOnScrollUp";

/** Floating "Асуух" button + the shop assistant chat. Lives in the shop layout, so the
 *  conversation stays while the buyer moves between pages. */
export function ShopChat() {
  const pathname = usePathname();
  const isMdUp = useIsMdUp();
  const placement = chatButtonPlacement(pathname);
  const isShown = useShowOnScrollUp(isMdUp || placement.isAboveStickyBar);
  const [isOpen, setIsOpen] = useState(false);
  const [wasClosed, setWasClosed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chat = useShopChat();

  // Back from the panel: focus returns to the button that opened it.
  useEffect(() => {
    if (!isOpen && wasClosed) buttonRef.current?.focus();
  }, [isOpen, wasClosed]);

  const close = () => {
    setIsOpen(false);
    setWasClosed(true);
  };

  if (isOpen) return <ChatPanel chat={chat} isMdUp={isMdUp} onClose={close} />;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => setIsOpen(true)}
      aria-hidden={!isShown}
      tabIndex={isShown ? 0 : -1}
      className={cn(
        "fixed right-4 z-30 flex min-h-12 items-center gap-2 rounded-full bg-brand px-5 font-semibold text-white shadow-lg transition-transform duration-200 hover:bg-brand-dark md:right-6",
        placement.className,
        !isShown && "pointer-events-none translate-y-32",
      )}
    >
      <MessageCircle className="size-5" aria-hidden />
      Асуух
    </button>
  );
}
