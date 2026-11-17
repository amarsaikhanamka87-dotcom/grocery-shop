/** A delivery address the buyer picked; kept in the browser (localStorage) for now. */
export type DeliveryAddress = {
  id: string;
  district: string;
  detail: string;
  lat?: number;
  lng?: number;
};

/** What a lookup of the browser's GPS position returns (no id yet). */
export type FoundAddress = Omit<DeliveryAddress, "id">;
