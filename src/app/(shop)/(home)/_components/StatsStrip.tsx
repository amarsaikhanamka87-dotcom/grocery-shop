/**
 * Three numbers under the products: partner farms, kinds of produce (from the DB), farm-to-kitchen
 * time. Numbers use the heading style (.h-section), labels the body style: no extra text size.
 */
export function StatsStrip({ productCount }: { productCount: number }) {
  const stats = [
    ["40+", "Түнш ферм"],
    [String(productCount), "Төрлийн ногоо"],
    ["24 цаг", "Фермээс гал тогоо хүртэл"],
  ];
  return (
    <section className="container-x mt-16 sm:mt-24">
      {/* Phones: 3 rows (number left, label right) so labels never squeeze onto two lines;
          sm+: 3 columns. */}
      <dl className="grid divide-y divide-line rounded-[28px] border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map(([value, label]) => (
          <div
            key={label}
            className="flex flex-row-reverse items-center justify-end gap-4 px-5 py-4 sm:flex-col-reverse sm:gap-1 sm:px-2 sm:py-7 sm:text-center"
          >
            <dt className="text-[16px] text-ink/70">{label}</dt>
            <dd className="h-section min-w-[5.5rem] text-brand sm:min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
