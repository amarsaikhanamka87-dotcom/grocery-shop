import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/lib/constants";

export default async function AdminDashboard() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [todayOrders, revenue, toPrepare, products, recent, pendingCompanies] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "PAID", status: { not: "CANCELLED" } } }),
    prisma.order.count({ where: { paymentStatus: "PAID", status: "CONFIRMED" } }),
    prisma.product.findMany({ select: { id: true, name: true, stock: true, minQty: true, unit: true } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.user.findMany({ where: { approved: false, role: "USER" }, orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  // "Low" = less than five minimum orders' worth left.
  const lowStock = products
    .filter((p) => p.stock < p.minQty * 5)
    .sort((a, b) => a.stock / a.minQty - b.stock / b.minQty)
    .slice(0, 6);

  const stats = [
    { label: "Өнөөдрийн захиалга", value: String(todayOrders) },
    { label: "Бэлтгэх (төлөгдсөн)", value: String(toPrepare), accent: toPrepare > 0 },
    { label: "Төлөгдсөн борлуулалт", value: formatPrice(revenue._sum.total ?? 0) },
    { label: "Баталгаажуулах байгууллага", value: String(pendingCompanies.length), accent: pendingCompanies.length > 0 },
  ];

  return (
    <div>
      <h1 className="text-[28px] font-extrabold tracking-tight">Хянах самбар</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-[13px] font-semibold text-muted">{s.label}</p>
            <p className={`mt-2 text-[26px] font-extrabold tabular-nums tracking-tight ${s.accent ? "text-clay" : ""}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-extrabold">Сүүлийн захиалгууд</h2>
            <Link href="/admin/orders" className="text-sm font-bold text-brand hover:underline">Бүгд</Link>
          </div>
          {recent.length === 0 ? (
            <p className="p-8 text-center text-muted">Захиалга алга.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recent.map((o) => (
                <li key={o.id}>
                  <Link href={`/admin/orders/${o.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 hover:bg-cream">
                    <div>
                      <p className="font-bold">#{o.number} · {o.companyName ?? o.customerName}</p>
                      <p className="text-[12.5px] text-muted">{formatDate(o.createdAt)} · {o.district}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${PAYMENT_STATUS[o.paymentStatus].className}`}>
                        {PAYMENT_STATUS[o.paymentStatus].label}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${ORDER_STATUS[o.status].className}`}>
                        {ORDER_STATUS[o.status].label}
                      </span>
                      <span className="w-24 text-right font-bold tabular-nums">{formatPrice(o.total)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <div className="grid content-start gap-6">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-extrabold">Шинэ байгууллагууд</h2>
            <Link href="/admin/users?filter=pending" className="text-sm font-bold text-brand hover:underline">Бүгд</Link>
          </div>
          {pendingCompanies.length === 0 ? (
            <p className="p-6 text-sm text-muted">Баталгаажуулах бүртгэл алга.</p>
          ) : (
            <ul className="divide-y divide-line">
              {pendingCompanies.map((u) => (
                <li key={u.id} className="px-5 py-3">
                  <p className="truncate font-semibold">{u.companyName ?? u.name}</p>
                  <p className="text-[12.5px] text-muted">{u.companyRegNo} · {u.phone}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="card overflow-hidden">
          <h2 className="border-b border-line px-5 py-4 font-extrabold">Нөөц багассан</h2>
          {lowStock.length === 0 ? (
            <p className="p-6 text-sm text-muted">Бүх бүтээгдэхүүний нөөц хангалттай.</p>
          ) : (
            <ul className="divide-y divide-line">
              {lowStock.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/products/${p.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-cream">
                    <span className="truncate font-semibold">{p.name}</span>
                    <span className={`font-bold tabular-nums ${p.stock < p.minQty ? "text-clay" : "text-amber-700"}`}>{p.stock} {p.unit}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        </div>
      </div>
    </div>
  );
}
