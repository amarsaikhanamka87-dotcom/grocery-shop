import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { qpayIsSandbox, type QPayUrl } from "@/lib/qpay";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/lib/constants";
import { cancelUnpaidOrder } from "../../checkout/actions";
import { QPayPanel } from "./QPayPanel";

export const metadata: Metadata = { title: "Захиалга" };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/order/${id}`);
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order || (order.userId !== user.id && user.role !== "ADMIN")) notFound();

  const status = ORDER_STATUS[order.status];
  const pay = PAYMENT_STATUS[order.paymentStatus];
  const awaitingPayment = order.paymentStatus === "UNPAID" && order.status !== "CANCELLED" && !!order.qpayQrImage;
  const cancelled = order.status === "CANCELLED";

  return (
    <div className="container-x max-w-3xl pt-8 sm:pt-12">
      <div className="text-center">
        {cancelled ? (
          <XCircle className="mx-auto size-16 text-clay" strokeWidth={1.6} />
        ) : (
          <CheckCircle2 className={`mx-auto size-16 ${awaitingPayment ? "text-muted" : "text-brand"}`} strokeWidth={1.6} />
        )}
        <h1 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] sm:text-[32px]">
          {cancelled ? "Захиалга цуцлагдсан" : awaitingPayment ? "Төлбөрөө төлнө үү" : "Төлбөр амжилттай!"}
        </h1>
        <p className="mt-2 text-muted">
          Захиалгын дугаар <b className="text-ink">#{order.number}</b>
          {!cancelled && !awaitingPayment && ` · ${order.deliverySlot} хүргэгдэнэ`}
        </p>
      </div>

      {awaitingPayment && (
        <section className="card mt-8 p-5 sm:mt-10 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold">QPay-ээр төлөх</h2>
            <p className="text-2xl font-extrabold tabular-nums">{formatPrice(order.total)}</p>
          </div>
          <QPayPanel
            orderId={order.id}
            qrImage={order.qpayQrImage!}
            shortUrl={order.qpayShortUrl}
            urls={(order.qpayUrls as QPayUrl[] | null) ?? []}
            sandbox={qpayIsSandbox}
          />
          {order.userId === user.id && (
            <form action={cancelUnpaidOrder} className="mt-6 border-t border-line pt-4 text-right">
              <input type="hidden" name="id" value={order.id} />
              <button className="text-sm font-semibold text-muted underline hover:text-clay">Захиалга цуцлах</button>
            </form>
          )}
        </section>
      )}

      <div className="card mt-6 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-muted">{formatDate(order.createdAt)}</p>
          <div className="flex gap-2">
            <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${pay.className}`}>{pay.label}</span>
            <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${status.className}`}>{status.label}</span>
          </div>
        </div>
        <ul className="mt-5 divide-y divide-line">
          {order.items.map((i) => (
            <li key={i.id} className="flex items-center gap-4 py-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-2">
                <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{i.name}</p>
                <p className="text-[13px] text-muted">
                  {i.quantity} {i.unit} × {formatPrice(i.price)}
                </p>
              </div>
              <p className="font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 grid gap-2 border-t border-line pt-4 text-[15px]">
          <div className="flex justify-between"><dt className="text-muted">Бүтээгдэхүүн</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Хүргэлт</dt><dd className="tabular-nums">{order.deliveryFee ? formatPrice(order.deliveryFee) : "Үнэгүй"}</dd></div>
          <div className="flex justify-between text-lg font-extrabold"><dt>Нийт</dt><dd className="tabular-nums">{formatPrice(order.total)}</dd></div>
        </dl>
        <div className="mt-6 grid gap-4 rounded-2xl bg-cream-2 p-5 text-[14.5px] sm:grid-cols-2">
          <div>
            <p className="font-bold">Байгууллага</p>
            <p className="mt-1 text-ink-2">
              {order.companyName ?? "—"}
              {order.companyRegNo && <><br />Регистр: {order.companyRegNo}</>}
            </p>
          </div>
          <div>
            <p className="font-bold">Хүргэлт</p>
            <p className="mt-1 text-ink-2">
              {order.customerName}, {order.phone}
              <br />
              {order.district} дүүрэг, {order.address}
              <br />
              {order.deliverySlot}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
        <Link href="/shop" className="btn btn-primary h-12 px-6">Дэлгүүр үргэлжлүүлэх</Link>
        <Link href="/account" className="btn btn-outline h-12 px-6">Миний захиалгууд</Link>
      </div>
    </div>
  );
}
