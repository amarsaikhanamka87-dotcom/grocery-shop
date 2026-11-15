type Props = { defaults: { name: string; phone: string } };

export function RecipientFields({ defaults }: Props) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">1. Хүлээн авах хүн</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="customerName">Хүлээн авах хүний нэр</label>
          <input id="customerName" name="customerName" defaultValue={defaults.name} className="input" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">Утасны дугаар</label>
          <input
            id="phone"
            name="phone"
            defaultValue={defaults.phone}
            className="input"
            inputMode="numeric"
            pattern="[0-9]{8}"
            title="8 оронтой утасны дугаар"
            placeholder="99112233"
            autoComplete="tel"
            required
          />
        </div>
      </div>
    </section>
  );
}
