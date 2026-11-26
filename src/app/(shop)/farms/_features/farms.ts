/**
 * The farms we buy from and which of our products come from each (by product slug, so the names
 * and links come from the DB). TODO: move to a Farm table linked to Product (owner to approve).
 * `photo`: only our own photos of the farm itself; no stock vegetable shots.
 */
export type Farm = { name: string; place: string; productSlugs: string[]; photo?: string };

export const FARMS: Farm[] = [
  { name: "Шаамарын ногоон хүлэмж", place: "Сэлэнгэ, Шаамар", productSlugs: ["cucumber"] },
  { name: "Дарханы тариаланч", place: "Дархан-Уул", productSlugs: ["carrot", "cabbage", "red-onion"] },
  { name: "Борнуурын төмс", place: "Төв, Борнуур", productSlugs: ["potato", "young-potato"] },
  { name: "Зуунмодын навчит ногоо", place: "Төв, Зуунмод", productSlugs: ["green-onion"], photo: "/images/farms/zuunmod.jpg" },
  { name: "Орхоны хүлэмж", place: "Орхон", productSlugs: ["red-pepper"], photo: "/images/farms/orkhon.jpg" },
  { name: "Сэлэнгийн манжин, сармис", place: "Сэлэнгэ", productSlugs: ["beetroot", "garlic"] },
];
