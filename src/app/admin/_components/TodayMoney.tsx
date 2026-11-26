import { Calculator, Globe, TrendingUp } from "lucide-react";
import type { getDayMoney } from "@/lib/orders/getDayMoney";
import type { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { MoneyCard } from "./MoneyCard";

type Props = {
  title: string;
  money: Awaited<ReturnType<typeof getDayMoney>>;
  store: Awaited<ReturnType<typeof getStoreDaySales>>;
};

/**
 * One day's income: the total, then split into online orders and stall (POS) sales. Phones: the
 * total on its own row, the two parts side by side (half a screen instead of a full one).
 */
export function TodayMoney({ title, money, store }: Props) {
  const onlineIncome = money.income - store.total;
  const onlineOrders = money.paidOrders - store.count;
  return (
    <section className="mt-6">
      {/* The period is already in the date button above; keep the heading for screen readers only. */}
      <h2 className="sr-only">{title}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <MoneyCard
          wide
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
