import "server-only";
import { prisma } from "@/lib/prisma";
import type { OrderKind, OrderView } from "@/types/orders";
import { adminOrderWhere } from "./adminOrderWhere";

const VIEWS: OrderView[] = ["check", "todo", "unpaid", "done", "cancelled"];

/** How many orders each /admin/orders tab holds (for the counts on the tabs), for one type. */
export async function countAdminOrderViews(kind: OrderKind): Promise<Record<OrderView, number>> {
  const counts = await Promise.all(VIEWS.map((view) => prisma.order.count({ where: adminOrderWhere(view, kind) })));
  return Object.fromEntries(VIEWS.map((view, i) => [view, counts[i]])) as Record<OrderView, number>;
}
