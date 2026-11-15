import Image from "next/image";
import { MapPin } from "lucide-react";
import { img } from "@/lib/format/img";

export type Farm = { name: string; place: string; items: string; image: string };

export function FarmCard({ farm: f }: { farm: Farm }) {
  return (
    <li className="card overflow-hidden">
      <div className="relative aspect-[4/3] bg-cream-2">
        <Image src={img(f.image, 700)} alt={f.name} fill sizes="(min-width:1024px) 360px, 50vw" className="object-cover" />
      </div>
      <div className="p-6">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
          <MapPin className="size-4" /> {f.place}
        </p>
        <h2 className="mt-2 text-lg font-extrabold">{f.name}</h2>
        <p className="mt-1 text-[15px] text-ink-2">{f.items}</p>
      </div>
    </li>
  );
}
