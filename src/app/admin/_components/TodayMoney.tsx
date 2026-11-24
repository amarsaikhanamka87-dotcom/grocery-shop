import { Calculator, Globe, TrendingUp } from "lucide-react";
import type { getDayMoney } from "@/lib/orders/getDayMoney";
import type { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { MoneyCard } from "./MoneyCard";

type Props = {
  title: string;
  money: Awaited<ReturnType<typeof getDayMoney>>;
  store: Awaited<ReturnType<typeof getStoreDaySales>>;
};

/** One day's income: the total, then split into online orders and stall (POS) sales. */
export function TodayMoney({ title, money, store }: Props) {
  const onlineIncome = money.income - store.total;
  const onlineOrders = money.paidOrders - store.count;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-extrabold">{title}</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <MoneyCard
          label="Нийт орлого"
          amount={money.income}
          hint="Онлайн + касс"
          icon={TrendingUp}
          tone="brand"
        />
        <MoneyCard
          label="Онлайн захиалга"
          amount={onlineIncome}
          hint={`${onlineOrders} төлөгдсөн захиалга`}
          icon={Globe}
          tone="ink"
        />
        <MoneyCard
          label="Касс"
          amount={store.total}
          hint={`${store.count} борлуулалт`}
          icon={Calculator}
          tone="ink"
        />
      </div>
    </section>
  );
}
