// Shared receipt shapes. One ReceiptData feeds the email, the admin view and the print page.

export type ReceiptLine = {
  no: number;
  name: string;
  code: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
};

export type ReceiptData = {
  receiptId: string;
  number: number; // Зарлагын баримт №
  orderId: string;
  orderNumber: number;
  issuedAt: string; // ISO
  date: { year: number; month: number; day: number }; // Ulaanbaatar day it was issued
  seller: { name: string; regNo: string; phone: string };
  // name = company name when invoiced to a company, else the person; contactName = the person.
  buyer: { name: string; contactName: string; companyName: string | null; regNo: string; phone: string; email: string | null };
  delivery: { method: string; address: string };
  lines: ReceiptLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderUrl: string | null;
};
