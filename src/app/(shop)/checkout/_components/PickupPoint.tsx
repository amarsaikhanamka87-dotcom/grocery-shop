import { ExternalLink, MapPin, ShoppingBasket } from "lucide-react";
import { PICKUP_POINT } from "@/lib/constants";
import { addressLabel } from "@/lib/location/addressLabel";
import { googleMapsLinks } from "@/lib/location/googleMapsLinks";

/** Step 1 in "Очиж авах" mode: where to collect the order + a phone to reach the buyer. */
export function PickupPoint({ defaults }: { defaults: { name: string; phone: string } }) {
  const maps = googleMapsLinks(PICKUP_POINT.mapsQuery);
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-lg font-extrabold">
        <ShoppingBasket className="size-5 text-brand" /> Очиж авах цэг
      </h2>
      <input type="hidden" name="customerName" value={defaults.name} />
      <input type="hidden" name="district" value={PICKUP_POINT.district} />
      <input type="hidden" name="address" value={PICKUP_POINT.detail} />
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        <iframe
          src={maps.embed}
          title="Очиж авах цэгийн газрын зураг"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-56 w-full border-0 bg-cream-2"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-50 px-4 py-3">
          <p className="flex items-center gap-2 text-[15px] font-bold text-brand">
            <MapPin className="size-4 shrink-0" /> {addressLabel(PICKUP_POINT)}
          </p>
          <a
            href={maps.open}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[14px] font-bold text-brand underline-offset-2 hover:underline"
          >
            Google Maps-д нээх <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
        <div>
          <label className="label" htmlFor="note">Нэмэлт тайлбар (заавал биш)</label>
          <input id="note" name="note" className="input" placeholder="Жишээ нь: машины дугаар" />
        </div>
      </div>
    </section>
  );
}
