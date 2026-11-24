export const SHOP_NAME = "Бөөний Зах Онлайн";
export const SHOP_PHONE = "89056629";
/** Contact e-mail in the footer. Still the old Ургац address: replace with the market's own. */
export const SHOP_EMAIL = "hello@urgats.mn";
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

export const DELIVERY_SLOTS = [
  "06:00–09:00",
  "09:00–12:00",
  "12:00–15:00",
  "15:00–18:00",
];

/** How many days ahead the buyer can pick at checkout (starting tomorrow). */
export const DELIVERY_DAYS_AHEAD = 4;

export const EXPRESS_MINUTES = 60;
export const EXPRESS_FROM_HOUR = 8;
export const EXPRESS_UNTIL_HOUR = 21;

export const PICKUP_POINT = {
  district: "Баянзүрх",
  detail: "Барс захын бөөний хэсэг",

  mapsQuery: "Барс худалдааны төв, Улаанбаатар",
};

/** How many day buttons the admin dashboard shows (today + the days before it). */
export const DASHBOARD_DAYS = 14;

/** POS tiles show the stock left in clay (warning) at or below this many units. */
export const POS_LOW_STOCK = 10;

/** Seller's 7-digit register number printed on the БМ-3 receipt (empty = blank boxes). */
export const SHOP_REG_NO = "";

/** Paid receipts are emailed (via n8n) only when the order total is more than this, in ₮. */
export const RECEIPT_EMAIL_MIN_TOTAL = 200;
