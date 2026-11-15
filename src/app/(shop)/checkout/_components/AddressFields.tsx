import { DISTRICTS } from "@/lib/constants";

export function AddressFields() {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">2. Хүргэлтийн хаяг</h2>
      <div className="mt-5 grid gap-4">
        <div>
          <label className="label" htmlFor="district">Дүүрэг</label>
          <select id="district" name="district" className="input" defaultValue="" required>
            <option value="" disabled>
              Сонгох
            </option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="address">Дэлгэрэнгүй хаяг</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className="input"
            placeholder="Хороо, гудамж, байр/барилга, ресторан/агуулахын хаалга"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="note">Нэмэлт тайлбар (заавал биш)</label>
          <input id="note" name="note" className="input" placeholder="Жишээ нь: арын хаалгаар, 07:00-с өмнө" />
        </div>
      </div>
    </section>
  );
}
