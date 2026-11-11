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

export const DELIVERY_SLOTS = [
  "Маргааш, 06:00–09:00",
  "Маргааш, 09:00–12:00",
  "Маргааш, 12:00–15:00",
  "Маргааш, 15:00–18:00",
];

export const PAYMENT_METHODS: Record<string, string> = {
  QPAY: "QPay",
};

export const PAYMENT_STATUS: Record<
  string,
  { label: string; className: string }
> = {
  UNPAID: { label: "Төлөгдөөгүй", className: "bg-amber-100 text-amber-800" },
  PAID: { label: "Төлөгдсөн", className: "bg-emerald-100 text-emerald-800" },
};

export const ORDER_STATUS: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: { label: "Хүлээгдэж буй", className: "bg-amber-100 text-amber-800" },
  CONFIRMED: { label: "Баталгаажсан", className: "bg-sky-100 text-sky-800" },
  DELIVERING: {
    label: "Хүргэлтэнд гарсан",
    className: "bg-violet-100 text-violet-800",
  },
  DELIVERED: {
    label: "Хүргэгдсэн",
    className: "bg-emerald-100 text-emerald-800",
  },
  CANCELLED: { label: "Цуцлагдсан", className: "bg-rose-100 text-rose-800" },
};

export function deliveryFeeFor(subtotal: number) {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}
