"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DeliveryAddress, FoundAddress } from "@/types/location";
import type { FulfillmentMode } from "@/types/fulfillment";
import { loadFromStorage } from "@/components/cart/loadFromStorage";
import { saveToStorage } from "@/components/cart/saveToStorage";
import { LocationContext, type LocationContextValue } from "./LocationContext";
import { useAskLocationOnce } from "./useAskLocationOnce";

const CURRENT_KEY = "delivery-address";
const SAVED_KEY = "delivery-addresses";
const MODE_KEY = "fulfillment-mode";

const withId = (a: FoundAddress | DeliveryAddress): DeliveryAddress =>
  "id" in a ? a : { ...a, id: crypto.randomUUID() };

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<FulfillmentMode>("delivery");
  const [current, setCurrent] = useState<DeliveryAddress | null>(null);
  const [saved, setSaved] = useState<DeliveryAddress[]>([]);
  const [suggestion, setSuggestion] = useState<FoundAddress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Restore persisted state once on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(loadFromStorage<DeliveryAddress | null>(CURRENT_KEY, null));
    setSaved(loadFromStorage<DeliveryAddress[]>(SAVED_KEY, []));
    setMode(loadFromStorage<FulfillmentMode>(MODE_KEY, "delivery"));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveToStorage(CURRENT_KEY, current);
  }, [current, ready]);

  useEffect(() => {
    if (ready) saveToStorage(SAVED_KEY, saved);
  }, [saved, ready]);

  useEffect(() => {
    if (ready) saveToStorage(MODE_KEY, mode);
  }, [mode, ready]);

  useAskLocationOnce(ready && mode === "delivery", current, setSuggestion, setDialogOpen);

  const choose = useCallback((a: FoundAddress | DeliveryAddress) => {
    setCurrent(withId(a));
    setSuggestion(null);
  }, []);

  const save = useCallback((a: FoundAddress) => {
    const added = withId(a);
    setSaved((prev) => [added, ...prev]);
    return added;
  }, []);

  const remove = useCallback((id: string) => setSaved((prev) => prev.filter((a) => a.id !== id)), []);

  const answerSuggestion = useCallback(
    (accept: boolean) => {
      // "Үгүй" keeps the suggestion: choosing an address in the dialog clears it (choose),
      // closing the dialog without one shows the question again.
      if (accept && suggestion) choose(suggestion);
      else setDialogOpen(true);
    },
    [suggestion, choose],
  );

  const value = useMemo<LocationContextValue>(
    () => ({ ready, mode, setMode, current, saved, suggestion, dialogOpen, choose, save, remove, answerSuggestion, setDialogOpen }),
    [ready, mode, current, saved, suggestion, dialogOpen, choose, save, remove, answerSuggestion],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
