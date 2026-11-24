/**
 * The БМ-3 sheet exactly as the buyer's email shows it. `html` comes from lib/receipts/receiptHtml,
 * which escapes every buyer-typed value, so it is safe to inject. Phones: folded under "Хэвлэх
 * загвар харах" (the summary above shows the money); sm+: always open.
 */
export function ReceiptSheet({ html }: { html: string }) {
  const sheet = (
    <div className="overflow-x-auto bg-white p-4 sm:p-8">
      <div className="min-w-[640px]" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
  return (
    <>
      <details className="card mt-4 overflow-hidden sm:hidden">
        <summary className="cursor-pointer px-4 py-3 text-[15px] font-bold text-brand">Хэвлэх загвар харах (БМ-3)</summary>
        {sheet}
      </details>
      <section className="card mt-4 hidden overflow-hidden sm:block">{sheet}</section>
    </>
  );
}
