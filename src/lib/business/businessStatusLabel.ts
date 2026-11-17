import type { BusinessStatus } from "@prisma/client";

/** Mongolian label + badge colors for an application status. */
export const BUSINESS_STATUS: Record<BusinessStatus, { label: string; className: string }> = {
  PENDING: { label: "Хүлээгдэж буй", className: "bg-amber-100 text-amber-800" },
  APPROVED: { label: "Зөвшөөрсөн", className: "bg-emerald-100 text-emerald-800" },
  REJECTED: { label: "Татгалзсан", className: "bg-rose-100 text-rose-800" },
};
