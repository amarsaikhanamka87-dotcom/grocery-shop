"use client";

import { useState } from "react";
import { detectAddress } from "@/lib/location/detectAddress";
import type { FoundAddress } from "@/types/location";

/** State of the address form: district + detail, and "Миний байршил" to fill them from GPS. */
export function useAddressForm(initial?: FoundAddress | null) {
  const [district, setDistrict] = useState(initial?.district ?? "");
  const [detail, setDetail] = useState(initial?.detail ?? "");
  const [coords, setCoords] = useState({ lat: initial?.lat, lng: initial?.lng });
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locate = async () => {
    setLocating(true);
    setError(null);
    const found = await detectAddress();
    setLocating(false);
    if (!found) return setError("Байршил тодорхойлж чадсангүй. Браузерт байршлын зөвшөөрөл өгнө үү.");
    if (found.district) setDistrict(found.district);
    setDetail(found.detail);
    setCoords({ lat: found.lat, lng: found.lng });
  };

  const value: FoundAddress = { district, detail: detail.trim(), ...coords };
  return { district, setDistrict, detail, setDetail, locating, error, locate, value };
}
