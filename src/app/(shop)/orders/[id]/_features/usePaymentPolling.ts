"use client";

import { useEffect, useRef } from "react";

const EVERY_MS = 4000;
const STOP_AFTER_MS = 3 * 60 * 1000;

/** Calls `refresh` every 4 s for up to 3 minutes (the page re-reads the order on the server). */
export function usePaymentPolling(refresh: () => void) {
  const latest = useRef(refresh);
  useEffect(() => {
    latest.current = refresh;
  });
  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (Date.now() - started > STOP_AFTER_MS) return clearInterval(timer);
      latest.current();
    }, EVERY_MS);
    return () => clearInterval(timer);
  }, []);
}
