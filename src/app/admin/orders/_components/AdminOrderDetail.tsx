import Image from "next/image";
import { formatPrice } from "@/lib/format/formatPrice";
import { formatDayTimeMn } from "@/lib/format/formatDayTimeMn";
import { formatDayMn } from "@/lib/format/formatDayMn";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { orderState } from "../_features/orderState";
import { FulfillmentPill } from "./FulfillmentPill";
import { StatusPill } from "./StatusPill";
import { DetailField } from "./DetailField";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import { PAYMENT_METHOD_LABEL } from "@/lib/orders/paymentMethodLabel";
import { recurrenceText } from "@/lib/orders/recurrenceText";
import { cancelReason } from "../_features/cancelReason";

/** Read-only body of the order dialog: buyer, delivery, payment, lines and totals. */
export function AdminOrderDetail({ order: o }: { order: AdminOrder }) {
  const day = formatDayMn(o.deliveryDate);
  const pickup = o.deliveryType === "pickup";
  // Pickup: the type tag already says "Очиж авах", so the time line is just day + slot.
  const typeText = pickup ? "" : `${DELIVERY_TYPE_LABEL[o.deliveryType ?? ""] ?? "Хүргэлт"} · `;
  // Old orders have no date (their slot holds the text): no stray ", " then.
  const whenText = typeText + [day, o.deliverySlot].filter(Boolean).join(", ");
  const reason = cancelReason(o);
  const paymentText =
    o.paymentStatus === "UNPAID"
      ? `Төлөгдөөгүй${o.paymentMethod === "TRANSFER" ? " · Дансаар шилжүүлнэ" : ""}`
      : `${PAYMENT_METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod}${o.paidAt ? ` · ${formatDayTimeMn(o.paidAt)}` : ""}`;
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill {...orderState(o)} />
        <FulfillmentPill deliveryType={o.deliveryType} />
      </div>
      {reason && <p className="-mt-2 text-[14px] text-muted-foreground">{reason}</p>}
      <dl className="grid gap-4 sm:grid-cols-2">
        <DetailField label="Захиалагч" value={[o.customerName || "—", o.companyName].filter(Boolean).join(" · ")} />
        <DetailField label="Утас" value={<a href={`tel:${o.phone}`} className="text-brand hover:underline">{o.phone}</a>} />
        <DetailField label={pickup ? "Ирж авах цэг" : "Хүргэх хаяг"} value={`${o.district} дүүрэг, ${o.address}`} wide />
        <DetailField label={pickup ? "Ирж авах хугацаа" : "Хүргэх хугацаа"} value={whenText} />
        {o.recurrence && (
          <DetailField
            label="Давтамж"
            value={recurrenceText(o.recurrence, o.recurrenceDays, o.recurrenceStart?.toISOString().slice(0, 10) ?? "", o.recurrenceEnd?.toISOString().slice(0, 10) ?? "")}
            wide
          />
        )}
        <DetailField
          label="НӨАТ"
          value={o.companyRegNo ? `Байгууллага · ${o.companyName ?? ""} · РД ${o.companyRegNo}` : "Хувь хүн"}
        />
        <DetailField label="Захиалсан" value={formatDayTimeMn(o.createdAt)} />
        <DetailField
          label="Төлбөр"
          value={
            <>
              {paymentText}
              {/* The Wire ID only matters to look up a stuck payment in Wire: folded away. */}
              {o.wireIntentId && o.paymentStatus === "UNPAID" && (
                <details className="mt-1 text-[13px] text-muted-foreground">
                  <summary className="cursor-pointer">Дэлгэрэнгүй</summary>
                  Wire ID: <code>{o.wireIntentId}</code>
                </details>
              )}
            </>
          }
        />
        {o.note && <DetailField label="Тайлбар" value={o.note} wide />}
      </dl>
      <ul className="grid gap-3 border-t border-line pt-4">
        {o.items.map((i) => (
          <li key={i.id} className="flex items-center gap-3">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-cream-2">
              <Image src={i.image} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-semibold">{i.name}</p>
              <p className="text-[12.5px] text-muted-foreground">
                {i.quantity} {i.unit} × {formatPrice(i.price)}
              </p>
            </div>
            <p className="text-[14.5px] font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="grid gap-2 border-t border-line pt-4 text-[14.5px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Бүтээгдэхүүн</dt>
          <dd className="tabular-nums">{formatPrice(o.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Хүргэлт</dt>
          <dd className="tabular-nums">
            {pickup ? "Ирж авна (0₮)" : o.deliveryFee === 0 ? "Үнэгүй" : formatPrice(o.deliveryFee)}
          </dd>
        </div>
        <div className="flex justify-between text-lg font-extrabold">
          <dt>Нийт</dt>
          <dd className="tabular-nums">{formatPrice(o.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
