import {
  Calculator,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Package,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = { href: string; label: string; icon: LucideIcon };

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },

  { href: "/admin/physical-store", label: "Касс", icon: Calculator },
  { href: "/admin/orders", label: "Захиалга", icon: ClipboardList },

  { href: "/admin/receipts", label: "Баримт", icon: FileText },

  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
];
