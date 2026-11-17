"use client";

import { useState } from "react";
import type { FoundAddress } from "@/types/location";
import { useDeliveryLocation } from "./useDeliveryLocation";

export type AddressTab = "temp" | "saved";

/** Tabs, selection and actions of the "Хаяг сонгох" dialog (used inside AddressDialogBody). */
export function useAddressDialog() {
  const loc = useDeliveryLocation();
  // The dialog body mounts on every open, so these start fresh each time.
  const [tab, setTab] = useState<AddressTab>(() => (loc.saved.length > 0 ? "saved" : "temp"));
  const [adding, setAdding] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    loc.saved.some((a) => a.id === loc.current?.id) ? loc.current!.id : (loc.saved[0]?.id ?? null),
  );

  const close = () => loc.setDialogOpen(false);

  const chooseTemp = (a: FoundAddress) => {
    loc.choose(a);
    close();
  };

  const saveAndChoose = (a: FoundAddress) => {
    loc.choose(loc.save(a));
    close();
  };

  const chooseSelected = () => {
    const picked = loc.saved.find((a) => a.id === selectedId);
    if (picked) loc.choose(picked);
    close();
  };

  // Which form the footer "Сонгох" submits (null = pick the selected saved address).
  const submitForm = tab === "temp" ? "temp-address" : adding ? "new-address" : null;

  return { loc, tab, setTab, adding, setAdding, selectedId, setSelectedId, close, chooseTemp, saveAndChoose, chooseSelected, submitForm };
}
