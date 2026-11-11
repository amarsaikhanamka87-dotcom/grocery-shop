import Link from "next/link";
import type { Metadata } from "next";
import type { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/lib/constants";

export const metadata: Metadata = { title: "Захиалгууд" };

export default async function AdminOrders({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const valid = status && status in ORDER_STATUS ? (status as OrderStatus) : undefined;
  const orders = await prisma.order.findMany({
    where: valid ? { status: valid } : {},
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <h1 className="text-[28px] font-extrabold tracking-tight">Захиалгууд</h1>
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
        <Link href="/admin/orders" className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${!valid ? "bg-brand text-white" : "bg-white text-ink-2 border border-line"}`}>
          Бүгд
        </Link>
        {Object.entries(ORDER_STATUS).map(([k, v]) => (
          <Link
            key={k}
            href={`/admin/orders?status=${k}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${valid === k ? "bg-brand text-white" : "bg-white text-ink-2 border border-line"}`}
          >
            {v.label}
          </Link>
        ))}
      </div>

      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[14px]">
          <thead className="border-b border-line text-[12.5px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Дугаар</th>
              <th className="px-5 py-3 font-semibold">Үйлчлүүлэгч</th>
              <th className="px-5 py-3 font-semibold">Огноо</th>
              <th className="px-5 py-3 font-semibold">Төлбөр</th>
              <th className="px-5 py-3 font-semibold">Төлөв</th>
              <th className="px-5 py-3 text-right font-semibold">Дүн</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-cream">
                <td className="px-5 py-3.5 font-bold">
                  <Link href={`/admin/orders/${o.id}`} className="text-brand hover:underline">#{o.number}</Link>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold">{o.companyName ?? o.customerName}</p>
                  <p className="text-[12.5px] text-muted">{o.phone} · {o.district}</p>
                </td>
                <td className="px-5 py-3.5 text-muted">{formatDate(o.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${PAYMENT_STATUS[o.paymentStatus].className}`}>{PAYMENT_STATUS[o.paymentStatus].label}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${ORDER_STATUS[o.status].className}`}>{ORDER_STATUS[o.status].label}</span>
                </td>
                <td className="px-5 py-3.5 text-right font-bold tabular-nums">{formatPrice(o.total)}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted">Захиалга олдсонгүй.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
