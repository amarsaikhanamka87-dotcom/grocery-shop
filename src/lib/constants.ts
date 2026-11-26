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

/** POS tiles show the stock left in clay (warning) at or below this many units. */
export const POS_LOW_STOCK = 10;

/** Seller's 7-digit register number printed on the БМ-3 receipt (empty = blank boxes). */
export const SHOP_REG_NO = "";

/** Paid receipts are emailed (via n8n) only when the order total is more than this, in ₮. */
export const RECEIPT_EMAIL_MIN_TOTAL = 200;

/**
 * Shop bank account for direct bank transfers (shown with the order's transfer code).
 * Empty fields are hidden: fill in the real account before going live.
 */
export const BANK_TRANSFER = {
  /** Bank code 0005 in the IBAN = Хаан банк. */
  bankName: "Хаан банк",
  accountNumber: "5165040007",
  /** Other banks' apps ask for the IBAN: MN + check digits 75 + bank 0005 + 12-digit account. */
  iban: "MN750005005165040007",
  accountName: SHOP_NAME,
};

/** Prefix of the bank transfer code ("BZ" + order number), Latin so every bank app accepts it. */
export const TRANSFER_CODE_PREFIX = "BZ";

/** An unpaid bank-transfer order is cancelled (and its held stock returned) after this many hours. */
export const TRANSFER_HOLD_HOURS = 24;

/** Gemini model that reads handwritten photos on /admin/handwriting (override with GEMINI_MODEL). */
export const GEMINI_OCR_MODEL = "gemini-2.5-flash";

/** Photos are shrunk in the browser to this longest side (px) before upload: keeps them under 1 MB. */
export const OCR_IMAGE_MAX_SIDE = 1600;
