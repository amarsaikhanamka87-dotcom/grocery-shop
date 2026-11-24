import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { formatPrice } from "@/lib/format/formatPrice";
import { priceRangeText } from "@/lib/format/priceRangeText";
import type { OutgoingRow } from "@/lib/orders/getDayOutgoing";
import { StockLeft } from "./StockLeft";

type Props = { rows: OutgoingRow[]; deliveryFees: number };

const cell = "px-3 py-2.5";

/**
 * The day's goods out as money: each product (with stock left under its name, clay when low/out),
 * quantity × price = money, delivery fees, and the total. Phones: no "Нэгж үнэ" column (the price
 * goes under the quantity), so "Дүн" always fits.
 */
export function IncomeBreakdown({ rows, deliveryFees }: Props) {
  const total = rows.reduce((sum, row) => sum + row.income, 0) + deliveryFees;
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-line">
      <table className="w-full text-[15px]">
        <thead className="bg-cream text-left text-[13px] text-muted-foreground">
          <tr>
            <th className={cell}>Бараа</th>
            <th className={`${cell} text-right`}>Тоо</th>
            <th className={`${cell} hidden text-right sm:table-cell`}>Нэгж үнэ</th>
            <th className={`${cell} text-right`}>Дүн</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line tabular-nums">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={cell}>
                <span className="block font-semibold text-ink">{row.name}</span>
                <StockLeft stock={row.stock} minQty={row.minQty} unit={row.unit} />
              </td>
              <td className={`${cell} text-right whitespace-nowrap`}>
                {row.outgoing} {cartUnitLabel(row.unit)}
                <span className="block text-[13px] text-muted-foreground sm:hidden">
                  × {priceRangeText(row.minPrice, row.maxPrice)}
                </span>
              </td>
              <td className={`${cell} hidden text-right sm:table-cell`}>{priceRangeText(row.minPrice, row.maxPrice)}</td>
              <td className={`${cell} text-right font-bold whitespace-nowrap`}>{formatPrice(row.income)}</td>
            </tr>
          ))}
          {deliveryFees > 0 && (
            <tr>
              <td className={`${cell} text-muted-foreground`} colSpan={2}>
                Хүргэлтийн төлбөр
              </td>
              <td className={`${cell} hidden sm:table-cell`} />
              <td className={`${cell} text-right font-bold whitespace-nowrap`}>{formatPrice(deliveryFees)}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-ink/15 bg-brand-50">
            <td className={`${cell} font-extrabold`} colSpan={2}>
              Нийт орлого
            </td>
            <td className={`${cell} hidden sm:table-cell`} />
            <td className={`${cell} text-right text-[18px] font-extrabold whitespace-nowrap text-brand tabular-nums`}>
              {formatPrice(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
