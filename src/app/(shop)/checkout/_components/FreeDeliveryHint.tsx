import Link from "next/link";
import { FREE_DELIVERY_FROM } from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";

/** Under a delivery fee: why it is charged, how much more makes it free, and the business route. */
export function FreeDeliveryHint({ subtotal }: { subtotal: number }) {
  const left = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  return (
    <p className="-mt-1 text-[16px] text-muted-foreground">
      {formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй. Дахиад {formatPrice(left)}-ийн
      бүтээгдэхүүн нэмбэл үнэгүй болно.{" "}
      <Link href="/business" className="font-bold text-brand underline underline-offset-2">
        Бизнес хэрэглэгчээр батлагдвал
      </Link>{" "}
      үргэлж үнэгүй.
    </p>
  );
}
