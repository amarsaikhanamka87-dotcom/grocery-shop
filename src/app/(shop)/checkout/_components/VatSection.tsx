"use client";

import { ReceiptText } from "lucide-react";
import { useInvoiceType } from "../_features/useInvoiceType";
import { ChoiceRow } from "./ChoiceRow";

type Props = { company: { name: string; regNo: string } | null };

/** Step 3 "НӨАТ": e-receipt for "Хувь хүн" or "Байгууллага" (company register no. + name). */
export function VatSection({ company }: Props) {
  const v = useInvoiceType(company);
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-[16px] font-bold">
        <ReceiptText className="size-5 text-brand" /> НӨАТ-ын баримт хэнд вэ?
      </h2>
      <input type="hidden" name="invoiceType" value={v.type} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ChoiceRow type="radio" name="pickInvoice" label="Хувь хүн" checked={!v.isCompany} onChange={() => v.setType("person")} />
        <ChoiceRow type="radio" name="pickInvoice" label="Байгууллага" checked={v.isCompany} onChange={() => v.setType("company")} />
      </div>
      {v.isCompany && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="companyRegNo">Байгууллагын регистрийн дугаар</label>
            <input
              id="companyRegNo"
              name="companyRegNo"
              defaultValue={company?.regNo ?? ""}
              className="input"
              inputMode="numeric"
              pattern="[0-9]{7}"
              title="7 оронтой регистрийн дугаар"
              placeholder="1234567"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="companyName">Байгууллагын нэр</label>
            <input
              id="companyName"
              name="companyName"
              defaultValue={company?.name ?? ""}
              className="input"
              placeholder="Жишээ нь: Ногоон зоог ХХК"
              required
            />
          </div>
        </div>
      )}
    </section>
  );
}
