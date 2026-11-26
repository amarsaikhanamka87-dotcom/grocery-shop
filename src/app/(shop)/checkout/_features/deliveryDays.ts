const WEEKDAYS = [
  "Ням",
  "Даваа",
  "Мягмар",
  "Лхагва",
  "Пүрэв",
  "Баасан",
  "Бямба",
];

export type DeliveryDay = { value: string; title: string; date: string };

export function deliveryDays(count: number, today = new Date()): DeliveryDay[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i + 1,
    );
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return {
      value: `${d.getFullYear()}-${mm}-${dd}`,
      title: i === 0 ? "Маргааш" : i === 1 ? "Нөгөөдөр" : WEEKDAYS[d.getDay()],
      date: `${d.getMonth() + 1}-р сарын ${d.getDate()}`,
    };
  });
}
