"use client";

import { useEffect, useRef } from "react";
import { verifyPhoneCode } from "@/lib/auth/verifyPhoneCode";
import type { VerifySession } from "@/types/auth";

const EVERY_MS = 3000;

/**
 * While a verify.mn session is open, asks the server every 3 s whether the buyer's SMS arrived.
 * Calls onTicket once with the Clerk sign-in ticket, or onError and stops.
 */
export function usePhoneVerifyPoll(
  phone: string,
  session: VerifySession | null,
  onTicket: (ticket: string) => void,
  onError: (message: string) => void,
) {
  const handlers = useRef({ onTicket, onError });
  useEffect(() => {
    handlers.current = { onTicket, onError };
  });

  useEffect(() => {
    if (!session) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;

    async function tick() {
      try {
        const res = await verifyPhoneCode(phone, session!.sessionId);
        if (stopped) return;
        if (res.ticket) return handlers.current.onTicket(res.ticket);
        if (res.error) return handlers.current.onError(res.error);
      } catch {
        if (stopped) return; // network blip: keep polling
      }
      timer = setTimeout(tick, EVERY_MS);
    }

    timer = setTimeout(tick, EVERY_MS);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [phone, session]);
}
