"use client";

import { useState } from "react";

export type InvoiceType = "person" | "company";

/** НӨАТ receipt: for a person or a company (B2B buyers start on "company"). */
export function useInvoiceType(company: { name: string; regNo: string } | null) {
  const [type, setType] = useState<InvoiceType>(company ? "company" : "person");
  return { type, setType, isCompany: type === "company" };
}
