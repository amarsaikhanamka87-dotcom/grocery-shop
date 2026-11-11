import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from "@/lib/constants";
import { markOrderPaid, recheckPayment, updateOrderStatus } from "../../actions";

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true, user: true } });
  if (!order) notFound();
  const final = order.status === "CANCELLED";

  return (
    <div className="max-w-4xl">
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Захиалгууд
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[28px] font-extrabold tracking-tight">Захиалга #{order.number}</h1>
        <div className="flex gap-2">
          <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${PAYMENT_STATUS[order.paymentStatus].className}`}>
            {PAYMENT_STATUS[order.paymentStatus].label}
          </span>
          <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${ORDER_STATUS[order.status].className}`}>
            {ORDER_STATUS[order.status].label}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted">{formatDate(order.createdAt)}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="card p-5">
          <h2 className="font-extrabold">Бүтээгдэхүүн</h2>
          <ul className="mt-3 divide-y divide-line">
            {order.items.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-cream-2">
                  <Image src={i.image} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{i.name}</p>
                  <p className="text-[12.5px] text-muted">{i.quantity} {i.unit} × {formatPrice(i.price)}</p>
                </div>
                <p className="font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-3 grid gap-1.5 border-t border-line pt-3 text-[14.5px]">
            <div className="flex justify-between"><dt className="text-muted">Бүтээгдэхүүн</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Хүргэлт</dt><dd className="tabular-nums">{formatPrice(order.deliveryFee)}</dd></div>
            <div className="flex justify-between text-base font-extrabold"><dt>Нийт</dt><dd className="tabular-nums">{formatPrice(order.total)}</dd></div>
          </dl>
        </section>

        <div className="grid content-start gap-6">
          <section className="card p-5">
            <h2 className="font-extrabold">Төлбөр (QPay)</h2>
            {order.paymentStatus === "PAID" ? (
              <p className="mt-3 text-sm text-ink-2">
                Төлөгдсөн{order.paidAt ? `: ${formatDate(order.paidAt)}` : ""}
              </p>
            ) : final ? (
              <p className="mt-3 text-sm text-muted">Төлөгдөөгүй, цуцлагдсан.</p>
            ) : (
              <div className="mt-3 grid gap-2">
                <form action={recheckPayment}>
                  <input type="hidden" name="id" value={order.id} />
                  <button className="btn btn-outline h-10 w-full text-sm">QPay-ээс шалгах</button>
                </form>
                <form action={markOrderPaid}>
                  <input type="hidden" name="id" value={order.id} />
                  <button className="btn btn-primary h-10 w-full text-sm">Төлөгдсөн гэж тэмдэглэх</button>
                </form>
                <p className="text-[12px] text-muted">Гараар тэмдэглэхээсээ өмнө банкны хуулгаа шалгана уу.</p>
              </div>
            )}
            {order.qpayInvoiceId && <p className="mt-3 break-all text-[11.5px] text-muted">Invoice: {order.qpayInvoiceId}</p>}
          </section>
          <section className="card p-5">
            <h2 className="font-extrabold">Төлөв өөрчлөх</h2>
            {final ? (
              <p className="mt-3 text-sm text-muted">Цуцлагдсан захиалгыг өөрчлөх боломжгүй.</p>
            ) : (
              <form action={updateOrderStatus} className="mt-3 grid gap-3">
                <input type="hidden" name="id" value={order.id} />
                <select name="status" defaultValue={order.status} className="input">
                  {Object.entries(ORDER_STATUS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <button className="btn btn-primary h-11">Хадгалах</button>
                <p className="text-[12px] text-muted">Цуцалбал барааны нөөц буцаж нэмэгдэнэ. Төлөгдсөн захиалгын мөнгийг гараар буцаана.</p>
              </form>
            )}
          </section>
          <section className="card grid gap-3 p-5 text-[14.5px]">
            <h2 className="font-extrabold">Үйлчлүүлэгч</h2>
            <p>
              <b>{order.companyName ?? "—"}</b>
              {order.companyRegNo && <><br />Регистр: {order.companyRegNo}</>}
            </p>
            <p><b>{order.customerName}</b><br />{order.phone}{order.user ? <><br /><span className="text-muted">{order.user.email}</span></> : <><br /><span className="text-muted">Зочин</span></>}</p>
            <p><b>Хаяг</b><br />{order.district} дүүрэг, {order.address}</p>
            {order.note && <p><b>Тайлбар</b><br />{order.note}</p>}
            <p><b>Хүргэлт</b><br />{order.deliverySlot}</p>
            <p><b>Төлбөр</b><br />{PAYMENT_METHODS[order.paymentMethod] ?? order.paymentMethod}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
