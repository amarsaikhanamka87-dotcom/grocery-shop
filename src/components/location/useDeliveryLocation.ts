"use client";

import { useContext } from "react";
import { LocationContext } from "./LocationContext";

export function useDeliveryLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useDeliveryLocation must be used inside LocationProvider");
  return ctx;
}
