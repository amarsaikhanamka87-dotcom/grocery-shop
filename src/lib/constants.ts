// Shop-wide settings (values only; logic lives in its own files).
export const SHOP_NAME = "Ургац";
export const SHOP_PHONE = "89056629";
export const FREE_DELIVERY_FROM = 200000;
export const DELIVERY_FEE = 15000;

export const DISTRICTS = [
  "Баянгол",
  "Баянзүрх",
  "Сонгинохайрхан",
  "Сүхбаатар",
  "Хан-Уул",
  "Чингэлтэй",
  "Налайх",
  "Багануур",
  "Багахангай",
];

export const DELIVERY_SLOTS = ["06:00–09:00", "09:00–12:00", "12:00–15:00", "15:00–18:00"];

/** How many days ahead the buyer can pick at checkout (starting tomorrow). */
export const DELIVERY_DAYS_AHEAD = 4;

/** "Шуурхай" (express) delivery: arrives within this many minutes, only between these hours. */
export const EXPRESS_MINUTES = 60;
export const EXPRESS_FROM_HOUR = 8;
export const EXPRESS_UNTIL_HOUR = 21;

/** "Очиж авах": where buyers collect their order (no delivery fee). Owner: confirm the exact place. */
export const PICKUP_POINT = {
  district: "Баянзүрх",
  detail: "Барс захын бөөний хэсэг",
  /** What Google Maps searches for; better: exact "lat,lng" of the gate (e.g. "47.9145,106.9575"). */
  mapsQuery: "Барс худалдааны төв, Улаанбаатар",
};
