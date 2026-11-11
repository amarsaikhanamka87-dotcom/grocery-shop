import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, Clock, LogOut, Package, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/lib/constants";
import { logout } from "../(auth)/actions";

export const metadata: Metadata = { title: "Миний бүртгэл" };

export default async function AccountPage() {
  const user = await requireUser("/account");
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div className="container-x pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Миний бүртгэл</p>
          <h1 className="mt-2 text-[34px] font-extrabold tracking-[-0.03em]">{user.companyName ?? user.name}</h1>
          <p className="mt-1 text-muted">
            {user.companyRegNo ? `Регистр ${user.companyRegNo} · ` : ""}
            {user.name} · {user.email}
            {user.phone ? ` · ${user.phone}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {user.role === "ADMIN" && (
            <Link href="/admin" className="btn btn-primary h-11 px-5">
              <ShieldCheck className="size-4" /> Админ самбар
            </Link>
          )}
          <form action={logout}>
            <button className="btn btn-outline h-11 px-5">
              <LogOut className="size-4" /> Гарах
            </button>
          </form>
        </div>
      </div>

      {user.role !== "ADMIN" &&
        (user.approved ? (
          <p className="mt-6 flex items-center gap-2 rounded-2xl bg-brand-50 px-5 py-4 text-[14.5px] font-semibold text-brand">
            <BadgeCheck className="size-5" /> Байгууллагын бүртгэл баталгаажсан. Та захиалга өгөх боломжтой.
          </p>
        ) : (
          <p className="mt-6 flex items-start gap-2 rounded-2xl bg-amber-50 px-5 py-4 text-[14.5px] text-amber-900">
            <Clock className="mt-0.5 size-5 shrink-0" />
            <span>
              <b>Бүртгэл шалгагдаж байна.</b> Манай ажилтан 1 ажлын өдрийн дотор байгууллагын мэдээллийг шалгаж баталгаажуулна.
              Асуух зүйл байвал 7711-2233 дугаарт залгана уу.
            </span>
          </p>
        ))}

      <h2 className="mt-12 text-xl font-extrabold">Миний захиалгууд</h2>
      {orders.length === 0 ? (
        <div className="card mt-5 grid place-items-center p-12 text-center">
          <Package className="size-10 text-muted" />
          <p className="mt-3 font-bold">Захиалга алга байна</p>
          <Link href="/shop" className="btn btn-primary mt-5 h-11 px-6">Дэлгүүр хэсэх</Link>
        </div>
      ) : (
        <ul className="mt-5 grid gap-3">
          {orders.map((o) => {
            const s = ORDER_STATUS[o.status];
            return (
              <li key={o.id}>
                <Link href={`/order/${o.id}`} className="card flex flex-wrap items-center justify-between gap-4 p-5 hover:shadow-card">
                  <div>
                    <p className="font-bold">Захиалга #{o.number}</p>
                    <p className="text-[13px] text-muted">{formatDate(o.createdAt)} · {o._count.items} төрлийн бараа</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${PAYMENT_STATUS[o.paymentStatus].className}`}>
                      {PAYMENT_STATUS[o.paymentStatus].label}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${s.className}`}>{s.label}</span>
                    <span className="font-extrabold tabular-nums">{formatPrice(o.total)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
