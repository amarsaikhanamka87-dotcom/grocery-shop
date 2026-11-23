/**
 * The БМ-3 sheet exactly as the buyer's email shows it. `html` comes from lib/receipts/receiptHtml,
 * which escapes every buyer-typed value, so it is safe to inject.
 */
export function ReceiptSheet({ html }: { html: string }) {
  return (
    <section className="card mt-4 overflow-x-auto bg-white p-4 sm:p-8">
      <div className="min-w-[640px]" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
