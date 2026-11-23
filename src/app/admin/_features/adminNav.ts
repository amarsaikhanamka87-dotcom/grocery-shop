import {
  CreditCard,
  FileText,
  LayoutDashboard,
  ReceiptText,
  Package,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = { href: string; label: string; icon: LucideIcon };

// Admin sections from docs/full-flow.md (Workflow 3). App routes, not catalog data.
export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
  // B2B хүсэлт (/admin/business) and Дэлгүүрүүд (/admin/shops) are hidden for now.
  { href: "/admin/orders", label: "Захиалга", icon: ReceiptText },
  { href: "/admin/payments", label: "Төлбөр", icon: CreditCard },
  { href: "/admin/receipts", label: "Баримт", icon: FileText },

  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
];
