"use client";

import { createContext } from "react";
import type { DeliveryAddress, FoundAddress } from "@/types/location";

export type LocationContextValue = {
  ready: boolean;
  /** The address orders go to (shown in the header pill, pre-fills checkout). */
  current: DeliveryAddress | null;
  /** Addresses the buyer saved ("Хадгалсан хаяг"). */
  saved: DeliveryAddress[];
  /** Found from GPS on first visit, waiting for "Энэ хаяг руу хүргүүлэх үү?" → Тийм / Үгүй. */
  suggestion: FoundAddress | null;
  dialogOpen: boolean;
  choose: (address: FoundAddress | DeliveryAddress) => void;
  save: (address: FoundAddress) => DeliveryAddress;
  remove: (id: string) => void;
  answerSuggestion: (accept: boolean) => void;
  dismissSuggestion: () => void;
  setDialogOpen: (open: boolean) => void;
};

/** Delivery address state, provided by <LocationProvider> and read with useDeliveryLocation(). */
export const LocationContext = createContext<LocationContextValue | null>(null);
