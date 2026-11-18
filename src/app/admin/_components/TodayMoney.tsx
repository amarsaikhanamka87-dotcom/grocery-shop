import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import type { getTodayMoney } from "@/lib/orders/getTodayMoney";
import { MoneyCard } from "./MoneyCard";

type Props = { money: Awaited<ReturnType<typeof getTodayMoney>> };

/** "Өнөөдөр": today's income, expenses and the balance between them. */
export function TodayMoney({ money }: Props) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-extrabold">Өнөөдөр</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <MoneyCard
          label="Орлого"
          amount={money.income}
          hint={`${money.paidOrders} төлөгдсөн захиалга`}
          icon={TrendingUp}
          tone="brand"
        />
        <MoneyCard label="Зарлага" amount={money.expenses} hint="Зарлага бүртгэх хэсэг удахгүй" icon={TrendingDown} tone="clay" />
        <MoneyCard label="Үлдэгдэл" amount={money.balance} hint="Орлого − зарлага" icon={Scale} tone="ink" />
      </div>
    </section>
  );
}
