import { ChefHat, Hotel, Store, UtensilsCrossed } from "lucide-react";

const segments = [
  { icon: ChefHat, title: "Ресторан", text: "Өдөр бүрийн шинэхэн ногоо, тогтвортой чанар, өглөөний хүргэлт." },
  { icon: Hotel, title: "Зочид буудал", text: "Өглөөний цай, банкетад их хэмжээний ногоог нэг дор." },
  { icon: UtensilsCrossed, title: "Гуанз, цайны газар", text: "Төмс, лууван, сонгино, байцааг шуудайгаар хямд үнээр." },
  { icon: Store, title: "Хүнсний дэлгүүр", text: "Лангуундаа тавих шинэхэн ногоо, жижиглэнгийн ашигтай үнээр." },
];

export function SegmentsSection() {
  return (
    <section className="container-x mt-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Хэнд зориулсан бэ</p>
        <h2 className="h-section mt-2">Хоол үйлдвэрлэл, худалдааны байгууллагуудад</h2>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {segments.map((g) => (
          <li key={g.title} className="card p-7">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand">
              <g.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold">{g.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{g.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
