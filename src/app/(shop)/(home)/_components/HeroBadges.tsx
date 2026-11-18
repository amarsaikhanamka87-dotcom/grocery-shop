import { Leaf } from "lucide-react";

/** Desktop (lg+) badges floating over the hero photo: picked today, 100% organic, 40+ farms. */
export function HeroBadges() {
  return (
    <div className="relative mx-auto hidden aspect-[1/0.92] w-full max-w-[560px] lg:mr-0 lg:block">
      <div className="absolute bottom-[14%] -left-[6%] flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-float">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
          <Leaf className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-[14px] font-bold">Өнөө өглөө хураасан</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">Фермээс шууд таны гал тогоо руу</p>
        </div>
      </div>
      <div className="absolute top-[5%] -right-4 grid size-[104px] rotate-[14deg] place-items-center rounded-full bg-clay text-center text-white shadow-float">
        <p className="text-[17px] font-extrabold leading-[1.05] tracking-tight">
          100%
          <br />
          <span className="text-[12px] tracking-[0.06em]">ОРГАНИК</span>
        </p>
      </div>
      <div className="absolute -bottom-2 right-[4%] rounded-2xl bg-brand px-5 py-3.5 text-white shadow-float">
        <p className="text-[30px] font-extrabold leading-none tracking-tight">40+</p>
        <p className="mt-1.5 text-[12.5px] font-medium text-white/85">Монгол түнш фермүүд</p>
      </div>
    </div>
  );
}
