import type { Order, OrderItem } from "@prisma/client";
import { formatPrice } from "@/lib/format/formatPrice";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import { recurrenceText } from "@/lib/orders/recurrenceText";

type Props = { order: Order & { items: OrderItem[] } };

export function OrderDetails({ order }: Props) {
  const date =
    order.deliveryDate
      ?.toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/") ?? "";
  return (
    <section className="card grid gap-5 p-5 sm:p-6">
      <dl className="grid gap-3 text-[15px] sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Хүргүүлэх хаяг</dt>
          <dd className="font-semibold">
            {order.address}, {order.district} дүүрэг
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Хүргэлтийн хугацаа</dt>
          <dd className="font-semibold">
            {DELIVERY_TYPE_LABEL[order.deliveryType ?? ""] ?? ""} · {date} (
            {order.deliverySlot})
          </dd>
          {order.recurrence && (
            <dd className="text-[14px] text-muted-foreground">
              {recurrenceText(
                order.recurrence,
                order.recurrenceDays,
                order.recurrenceStart?.toISOString().slice(0, 10) ?? "",
                order.recurrenceEnd?.toISOString().slice(0, 10) ?? "",
              )}
            </dd>
          )}
        </div>
      </dl>
      <ul className="grid gap-2 border-t border-line pt-4">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between gap-3 text-[15px]">
            <span>
              {i.name}{" "}
              <span className="text-muted-foreground">
                × {i.quantity} {i.unit}
              </span>
            </span>
            <span className="font-semibold tabular-nums">
              {formatPrice(i.price * i.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="grid gap-2 border-t border-line pt-4 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Хүргэлт</dt>
          <dd className="tabular-nums">
            {order.deliveryFee === 0
              ? "Үнэгүй"
              : formatPrice(order.deliveryFee)}
          </dd>
        </div>
        <div className="flex justify-between text-lg font-extrabold">
          <dt>Нийт</dt>
          <dd className="tabular-nums">{formatPrice(order.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
