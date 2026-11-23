import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import type { getDayMoney } from "@/lib/orders/getDayMoney";
import { MoneyCard } from "./MoneyCard";

type Props = { title: string; money: Awaited<ReturnType<typeof getDayMoney>> };

/** One day's income, expenses and the balance between them, under `title` ("Өнөөдөр" / "11:21"). */
export function TodayMoney({ title, money }: Props) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-extrabold">{title}</h2>
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
