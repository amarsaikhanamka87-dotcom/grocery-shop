"use server";

import { DISTRICTS } from "@/lib/constants";
import type { FoundAddress } from "@/types/location";

// OpenStreetMap Nominatim: free, max 1 request/second, needs an app User-Agent.
const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT = "BuuniiZakhOnline/1.0 (wholesale food shop, Ulaanbaatar)";

type NominatimResult = { name?: string; display_name?: string; address?: Record<string, string> };

/** Turns GPS coordinates into a district + street address (Mongolian), or null if it can't. */
export async function reverseGeocode(lat: number, lng: number): Promise<FoundAddress | null> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;

  const url = `${NOMINATIM}?format=jsonv2&zoom=18&accept-language=mn&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const data = (await res.json()) as NominatimResult;
    const parts = data.address ?? {};
    // "Сүхбаатар дүүрэг" lives in city_district; don't match street names like "Д.Сүхбаатарын гудамж".
    const area = parts.city_district ?? parts.county ?? parts.state_district ?? "";
    const district = DISTRICTS.find((d) => area.startsWith(d)) ?? "";
    const detail = [data.name, parts.road, parts.quarter ?? parts.neighbourhood ?? parts.suburb]
      .filter((p, i, arr) => p && arr.indexOf(p) === i)
      .join(", ");
    return { district, detail: detail || (data.display_name ?? ""), lat, lng };
  } catch {
    return null;
  }
}
