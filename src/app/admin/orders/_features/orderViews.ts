import type { OrderView } from "@/types/orders";

/**
 * The /admin/orders tabs, in the order the owner deals with them: money to check first, then goods
 * to hand over. Labels use the same words as the row badges (orderState).
 */
export const ORDER_VIEWS: { value: OrderView; label: string }[] = [
  { value: "check", label: "Данс шалгах" },
  { value: "todo", label: "Өгөх" },
  { value: "unpaid", label: "Төлөгдөөгүй" },
  { value: "done", label: "Дууссан" },
  { value: "cancelled", label: "Цуцалсан" },
];
