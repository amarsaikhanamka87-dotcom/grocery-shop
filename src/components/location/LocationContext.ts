"use client";

import { createContext } from "react";
import type { DeliveryAddress, FoundAddress } from "@/types/location";
import type { FulfillmentMode } from "@/types/fulfillment";

export type LocationContextValue = {
  ready: boolean;
  /** "Хүргэлтээр" or "Очиж авах" (header switch); pickup needs no address. */
  mode: FulfillmentMode;
  setMode: (mode: FulfillmentMode) => void;
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
  setDialogOpen: (open: boolean) => void;
};

/** Delivery address state, provided by <LocationProvider> and read with useDeliveryLocation(). */
export const LocationContext = createContext<LocationContextValue | null>(null);
