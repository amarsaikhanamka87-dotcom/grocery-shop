import Image from "next/image";
import { formatPrice } from "@/lib/format/formatPrice";
import { formatDateTime } from "@/lib/format/formatDateTime";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { ORDER_BADGES } from "../_features/orderBadges";
import { statusBadge } from "../_features/statusBadge";
import { FulfillmentPill } from "./FulfillmentPill";
import { StatusPill } from "./StatusPill";
import { DetailField } from "./DetailField";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import { recurrenceText } from "@/lib/orders/recurrenceText";

/** Read-only body of the order dialog: buyer, delivery, payment, lines and totals. */
export function AdminOrderDetail({ order: o }: { order: AdminOrder }) {
  const day = o.deliveryDate?.toISOString().slice(0, 10) ?? "";
  const pickup = o.deliveryType === "pickup";
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-1.5">
        <FulfillmentPill pickup={pickup} />
        <StatusPill {...ORDER_BADGES.payment[o.paymentStatus]} />
        <StatusPill {...statusBadge(o.status, pickup)} />
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        <DetailField label="Захиалагч" value={[o.customerName || "—", o.companyName].filter(Boolean).join(" · ")} />
        <DetailField label="Утас" value={<a href={`tel:${o.phone}`} className="text-brand hover:underline">{o.phone}</a>} />
        <DetailField label={pickup ? "Очиж авах цэг" : "Хүргүүлэх хаяг"} value={`${o.district} дүүрэг, ${o.address}`} wide />
        <DetailField label={pickup ? "Очиж авах хугацаа" : "Хүргэлтийн хугацаа"} value={`${DELIVERY_TYPE_LABEL[o.deliveryType ?? ""] ?? "—"} · ${day} ${o.deliverySlot}`} />
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
        <DetailField label="Захиалсан" value={formatDateTime(o.createdAt)} />
        <DetailField label="Төлбөр" value={`${o.paymentMethod}${o.paidAt ? ` · ${formatDateTime(o.paidAt)}` : ""}`} />
        {o.wireIntentId && <DetailField label="Wire ID" value={<code className="text-[12.5px]">{o.wireIntentId}</code>} />}
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
          <dd className="tabular-nums">{o.deliveryFee === 0 ? "Үнэгүй" : formatPrice(o.deliveryFee)}</dd>
        </div>
        <div className="flex justify-between text-lg font-extrabold">
          <dt>Нийт</dt>
          <dd className="tabular-nums">{formatPrice(o.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
