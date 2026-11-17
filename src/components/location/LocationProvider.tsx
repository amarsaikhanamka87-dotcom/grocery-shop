"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DeliveryAddress, FoundAddress } from "@/types/location";
import { loadFromStorage } from "@/components/cart/loadFromStorage";
import { saveToStorage } from "@/components/cart/saveToStorage";
import { LocationContext, type LocationContextValue } from "./LocationContext";
import { useAskLocationOnce } from "./useAskLocationOnce";

const CURRENT_KEY = "delivery-address";
const SAVED_KEY = "delivery-addresses";

const withId = (a: FoundAddress | DeliveryAddress): DeliveryAddress =>
  "id" in a ? a : { ...a, id: crypto.randomUUID() };

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState<DeliveryAddress | null>(null);
  const [saved, setSaved] = useState<DeliveryAddress[]>([]);
  const [suggestion, setSuggestion] = useState<FoundAddress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Restore persisted state once on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(loadFromStorage<DeliveryAddress | null>(CURRENT_KEY, null));
    setSaved(loadFromStorage<DeliveryAddress[]>(SAVED_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveToStorage(CURRENT_KEY, current);
  }, [current, ready]);

  useEffect(() => {
    if (ready) saveToStorage(SAVED_KEY, saved);
  }, [saved, ready]);

  useAskLocationOnce(ready && !current, setSuggestion);

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
      if (accept && suggestion) choose(suggestion);
      else setDialogOpen(true);
      setSuggestion(null);
    },
    [suggestion, choose],
  );

  const dismissSuggestion = useCallback(() => setSuggestion(null), []);

  const value = useMemo<LocationContextValue>(
    () => ({ ready, current, saved, suggestion, dialogOpen, choose, save, remove, answerSuggestion, dismissSuggestion, setDialogOpen }),
    [ready, current, saved, suggestion, dialogOpen, choose, save, remove, answerSuggestion, dismissSuggestion],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
