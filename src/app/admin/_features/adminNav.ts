import {
  Building2,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  Store,
  Undo2,
  Package,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = { href: string; label: string; icon: LucideIcon };

// Admin sections from docs/full-flow.md (Workflow 3). App routes, not catalog data.
export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
  { href: "/admin/business", label: "B2B хүсэлт", icon: Building2 },
  { href: "/admin/shops", label: "Дэлгүүрүүд", icon: Store },
  { href: "/admin/orders", label: "Захиалга", icon: ReceiptText },
  { href: "/admin/payments", label: "Төлбөр", icon: CreditCard },
  { href: "/admin/refunds", label: "Буцаалт", icon: Undo2 },
  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
];
