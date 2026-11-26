import { ExternalLink, MapPin, Store } from "lucide-react";
import { PICKUP_POINT } from "@/lib/constants";
import { addressLabel } from "@/lib/location/addressLabel";
import { googleMapsLinks } from "@/lib/location/googleMapsLinks";

/** Step 1 in "Очиж авах" mode: where to collect the order + a phone to reach the buyer. */
export function PickupPoint({ defaults }: { defaults: { name: string; phone: string } }) {
  const maps = googleMapsLinks(PICKUP_POINT.mapsQuery);
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-[16px] font-bold">
        <Store className="size-5 text-brand" /> Очиж авах цэг
      </h2>
      <input type="hidden" name="customerName" value={defaults.name} />
      <input type="hidden" name="district" value={PICKUP_POINT.district} />
      <input type="hidden" name="address" value={PICKUP_POINT.detail} />
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        {/* The embed's own English "Open in Maps" card sits in its top-left corner; the map is
            shifted up inside a clipped box to hide it (our "Google Maps-д нээх" link is below). */}
        <div className="relative h-56 overflow-hidden bg-brand-50">
          <iframe
            src={maps.embed}
            title="Очиж авах цэгийн газрын зураг"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-x-0 -top-16 block h-[calc(100%+4rem)] w-full border-0"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-50 px-4 py-3">
          <p className="flex items-center gap-2 text-[16px] font-bold text-brand">
            <MapPin className="size-4 shrink-0" /> {addressLabel(PICKUP_POINT)}
          </p>
          <a
            href={maps.open}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-1.5 text-[16px] font-bold text-brand underline-offset-2 hover:underline"
          >
            Газрын зураг дээр нээх <ExternalLink className="size-4" />
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
          <label className="label" htmlFor="note">Худалдагчид хэлэх зүйл (заавал биш)</label>
          <input id="note" name="note" className="input" placeholder="Жишээ нь: машины дугаар, ирэх цаг" />
        </div>
      </div>
    </section>
  );
}
