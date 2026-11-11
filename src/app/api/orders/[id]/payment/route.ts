import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { syncOrderPayment } from "@/lib/payments";

// Polled by the payment page to learn when the QPay invoice is paid.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const order = await prisma.order.findUnique({ where: { id }, select: { userId: true } });
  if (!user || !order || (order.userId !== user.id && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  try {
    const synced = await syncOrderPayment(id);
    return NextResponse.json({ paymentStatus: synced?.paymentStatus, status: synced?.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "check failed" }, { status: 502 });
  }
}
