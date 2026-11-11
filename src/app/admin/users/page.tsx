import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { formatDate } from "@/lib/format";
import { setUserApproved, setUserRole } from "../actions";

export const metadata: Metadata = { title: "Байгууллагууд" };

export default async function AdminUsers({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const me = await requireAdmin();
  const { filter } = await searchParams;
  const pendingOnly = filter === "pending";
  const users = await prisma.user.findMany({
    where: pendingOnly ? { approved: false, role: "USER" } : {},
    orderBy: [{ approved: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { orders: true } } },
  });

  return (
    <div>
      <h1 className="text-[28px] font-extrabold tracking-tight">Байгууллагууд</h1>
      <div className="mt-5 flex gap-2">
        <Link href="/admin/users" className={`rounded-full px-4 py-2 text-sm font-bold ${!pendingOnly ? "bg-brand text-white" : "border border-line bg-white text-ink-2"}`}>
          Бүгд
        </Link>
        <Link href="/admin/users?filter=pending" className={`rounded-full px-4 py-2 text-sm font-bold ${pendingOnly ? "bg-brand text-white" : "border border-line bg-white text-ink-2"}`}>
          Баталгаажуулах хүлээгдэж буй
        </Link>
      </div>
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-[14px]">
          <thead className="border-b border-line text-[12.5px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Байгууллага</th>
              <th className="px-5 py-3 font-semibold">Холбогдох хүн</th>
              <th className="px-5 py-3 font-semibold">Бүртгүүлсэн</th>
              <th className="px-5 py-3 text-right font-semibold">Захиалга</th>
              <th className="px-5 py-3 font-semibold">Төлөв</th>
              <th className="px-5 py-3 font-semibold">Эрх</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id} className={!u.approved && u.role === "USER" ? "bg-amber-50/40" : ""}>
                <td className="px-5 py-3">
                  <p className="font-bold">{u.companyName ?? "—"}</p>
                  <p className="text-[12.5px] text-muted">{u.companyRegNo ? `Регистр ${u.companyRegNo}` : ""}</p>
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-[12.5px] text-muted">{u.email}{u.phone ? ` · ${u.phone}` : ""}</p>
                </td>
                <td className="px-5 py-3 text-muted">{formatDate(u.createdAt)}</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{u._count.orders}</td>
                <td className="px-5 py-3">
                  {u.role === "ADMIN" ? (
                    <span className="text-[12.5px] text-muted">—</span>
                  ) : (
                    <form action={setUserApproved} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="approved" value={u.approved ? "false" : "true"} />
                      {u.approved ? (
                        <>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[12px] font-bold text-emerald-800">Баталгаажсан</span>
                          <button className="text-[12.5px] font-semibold text-muted underline hover:text-clay">Цуцлах</button>
                        </>
                      ) : (
                        <button className="btn btn-primary h-8 px-3 text-[12.5px]">Баталгаажуулах</button>
                      )}
                    </form>
                  )}
                </td>
                <td className="px-5 py-3">
                  {u.id === me.id ? (
                    <span className="rounded-full bg-clay-50 px-2.5 py-0.5 text-[12px] font-bold text-clay">Админ (та)</span>
                  ) : (
                    <form action={setUserRole} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="role" value={u.role === "ADMIN" ? "USER" : "ADMIN"} />
                      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${u.role === "ADMIN" ? "bg-clay-50 text-clay" : "bg-brand-50 text-brand"}`}>
                        {u.role === "ADMIN" ? "Админ" : "Хэрэглэгч"}
                      </span>
                      <button className="text-[12.5px] font-semibold text-muted underline hover:text-ink">
                        {u.role === "ADMIN" ? "Энгийн болгох" : "Админ болгох"}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted">Хүлээгдэж буй бүртгэл алга.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
