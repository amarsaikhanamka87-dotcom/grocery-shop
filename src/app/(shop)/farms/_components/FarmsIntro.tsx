/** Title + one sentence; the cards say the rest. */
export function FarmsIntro({ farmCount }: { farmCount: number }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[42px]">
        Манай фермүүд
      </h1>
      <p className="mt-3 text-[16px] text-muted-foreground">
        Бидний ажилладаг {farmCount} ферм. Ногоог нь дарж шууд захиална.
      </p>
    </div>
  );
}
