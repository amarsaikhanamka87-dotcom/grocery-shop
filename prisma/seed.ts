import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

// B2B: зөвхөн хүнсний ногоо.
const categories = [
  { slug: "root-vegetables", name: "Үндэст ногоо", image: "1582515073490-39981397c445" },
  { slug: "fruit-vegetables", name: "Жимсэн ногоо", image: "1558818498-28c1e002b655" },
  { slug: "cabbages", name: "Байцаа, брокколи", image: "1566842600175-97dca489844f" },
  { slug: "leafy-greens", name: "Навчит ногоо", image: "1622206151226-18ca2c9ab4a1" },
  { slug: "onion-garlic", name: "Сонгино, сармис", image: "1620574387735-3624d75b2dbc" },
  { slug: "mixed-boxes", name: "Холимог хайрцаг", image: "1579113800032-c38bd7635818" },
];

type P = {
  slug: string;
  name: string;
  cat: string;
  price: number; // нэгж бүрийн үнэ
  old?: number;
  unit: string; // нэгж
  min: number; // хамгийн бага захиалга (нэгжээр)
  stock: number;
  img: string;
  origin: string;
  organic?: boolean;
  featured?: boolean;
  desc: string;
};

const products: P[] = [
  // Үндэст ногоо
  { slug: "potato", name: "Төмс", cat: "root-vegetables", price: 1600, unit: "кг", min: 25, stock: 4000, img: "1590165482129-1b8b27698780", origin: "Төв, Борнуур", featured: true, desc: "Борнуурын шаргал төмс. Шарсан төмс, шөл, нухашд тохиромжтой. 25 кг-ын шуудайгаар савлана." },
  { slug: "young-potato", name: "Шинэ төмс (жижиг)", cat: "root-vegetables", price: 2400, unit: "кг", min: 10, stock: 800, img: "1508313880080-c4bef0730395", origin: "Сэлэнгэ", desc: "Нимгэн хальстай жижиг шинэ төмс. Хальстай нь шарахад тохиромжтой." },
  { slug: "carrot", name: "Лууван", cat: "root-vegetables", price: 2300, unit: "кг", min: 10, stock: 2000, img: "1598170845058-32b9d6a5da37", origin: "Дархан-Уул", featured: true, desc: "Амтлаг, өнгөлөг Дарханы лууван. Хуурга, шөл, салат, шүүсэнд." },
  { slug: "beetroot", name: "Манжин", cat: "root-vegetables", price: 2500, unit: "кг", min: 10, stock: 600, img: "1506807803488-8eafc15316c7", origin: "Сэлэнгэ", desc: "Чихэрлэг улаан манжин. Борщ, винегрет салатанд." },

  // Жимсэн ногоо
  { slug: "tomato", name: "Улаан лооль", cat: "fruit-vegetables", price: 5800, old: 6900, unit: "кг", min: 5, stock: 900, img: "1592924357228-91a4daadcfea", origin: "Сэлэнгэ, Шаамар", organic: true, featured: true, desc: "Хүлэмжинд химийн бордоогүй ургуулсан, өглөө түүсэн улаан лооль. 6 кг-ын хайрцгаар савлана." },
  { slug: "vine-tomato", name: "Мөчиртэй лооль", cat: "fruit-vegetables", price: 7500, unit: "кг", min: 5, stock: 300, img: "1558818498-28c1e002b655", origin: "Сэлэнгэ, Шаамар", organic: true, desc: "Мөчиртэйгөө хураасан анхилуун лооль. Ресторанд үйлчлэх, чимэглэлд." },
  { slug: "cherry-tomato", name: "Чери лооль", cat: "fruit-vegetables", price: 14000, unit: "кг", min: 2, stock: 150, img: "1598512752271-33f913a5af13", origin: "Төв, Зуунмод", featured: true, desc: "Чихэрлэг жижиг чери лооль. Салат, пицца, чимэглэлд." },
  { slug: "cucumber", name: "Өргөст хэмх", cat: "fruit-vegetables", price: 5200, unit: "кг", min: 5, stock: 1000, img: "1604977042946-1eecc30f269e", origin: "Сэлэнгэ, Шаамар", organic: true, featured: true, desc: "Шаржигнасан, нимгэн хальстай өргөст хэмх. Салат, даршилгаанд." },
  { slug: "bell-pepper", name: "Чинжүү (холимог өнгө)", cat: "fruit-vegetables", price: 11500, old: 12900, unit: "кг", min: 3, stock: 400, img: "1563565375-f3fdfdbefa83", origin: "Орхон", featured: true, desc: "Улаан, шар, ногоон чихэрлэг чинжүүний холимог." },
  { slug: "red-pepper", name: "Улаан чинжүү", cat: "fruit-vegetables", price: 12500, unit: "кг", min: 3, stock: 250, img: "1601648764658-cf37e8c89b70", origin: "Орхон", desc: "Махлаг улаан чихэрлэг чинжүү. Шарах, соус хийхэд." },
  { slug: "zucchini", name: "Цуккини", cat: "fruit-vegetables", price: 6500, unit: "кг", min: 5, stock: 300, img: "1563252722-6434563a985d", origin: "Сэлэнгэ", desc: "Зөөлөн, залуу цуккини. Шарах, гриль, хуурганд." },
  { slug: "pumpkin", name: "Хулуу", cat: "fruit-vegetables", price: 3500, unit: "кг", min: 10, stock: 500, img: "1570586437263-ab629fccc818", origin: "Дархан-Уул", desc: "Чихэрлэг улбар шар хулуу. Шөл, жигнэмэг, гарнирт." },

  // Байцаа, брокколи
  { slug: "cabbage", name: "Байцаа", cat: "cabbages", price: 1800, unit: "кг", min: 20, stock: 2500, img: "1594282486552-05b4d80fbb9f", origin: "Дархан-Уул", featured: true, desc: "Нягт толгойтой цагаан байцаа. Хуурга, салат, даршилгаанд." },
  { slug: "broccoli", name: "Брокколи", cat: "cabbages", price: 15000, unit: "кг", min: 3, stock: 200, img: "1584270354949-c26b0d5b4a0c", origin: "Сэлэнгэ", organic: true, desc: "Шинэхэн ногоон брокколи. Уураар болгох, шарахад." },
  { slug: "cauliflower", name: "Цэцэгт байцаа", cat: "cabbages", price: 12000, unit: "кг", min: 3, stock: 200, img: "1566842600175-97dca489844f", origin: "Сэлэнгэ", desc: "Цагаан, нягт цэцэгт байцаа. Шарах, шөл, гарнирт." },

  // Навчит ногоо
  { slug: "spinach", name: "Бууцай", cat: "leafy-greens", price: 16000, unit: "кг", min: 2, stock: 120, img: "1576045057995-568f588f82fb", origin: "Төв, Зуунмод", organic: true, desc: "Өглөө хурааж авсан зөөлөн навчит бууцай. Смүүти, салат, хуурганд." },
  { slug: "lettuce", name: "Салатны навч", cat: "leafy-greens", price: 18000, unit: "кг", min: 2, stock: 120, img: "1622206151226-18ca2c9ab4a1", origin: "Төв, Зуунмод", organic: true, featured: true, desc: "Шаржигнасан ногоон салатны навч. Бургер, сэндвич, салатанд." },

  // Сонгино, сармис
  { slug: "red-onion", name: "Улаан сонгино", cat: "onion-garlic", price: 2000, unit: "кг", min: 10, stock: 1500, img: "1508747703725-719777637510", origin: "Сэлэнгэ", desc: "Зөөлөн амттай улаан сонгино. 20 кг-ын шуудайгаар савлана." },
  { slug: "green-onion", name: "Ногоон сонгино", cat: "onion-garlic", price: 9000, unit: "кг", min: 2, stock: 100, img: "1602769515559-e15133a7e992", origin: "Төв", desc: "Шинэхэн ногоон сонгино. Хоол чимэглэх, салатанд." },
  { slug: "garlic", name: "Сармис", cat: "onion-garlic", price: 12000, unit: "кг", min: 2, stock: 200, img: "1540148426945-6cf22a6b2383", origin: "Сэлэнгэ", desc: "Хурц амттай, том хумстай монгол сармис." },

  // Холимог хайрцаг
  { slug: "restaurant-box", name: "Рестораны ногооны хайрцаг", cat: "mixed-boxes", price: 75000, old: 82000, unit: "хайрцаг (20 кг)", min: 1, stock: 60, img: "1579113800032-c38bd7635818", origin: "Түнш фермүүд", featured: true, desc: "Төмс, лууван, сонгино, байцаа, лооль, хэмх, чинжүү зэрэг гал тогоонд хамгийн их хэрэглэгддэг ногооны 20 кг холимог." },
  { slug: "salad-box", name: "Салатны ногооны хайрцаг", cat: "mixed-boxes", price: 68000, unit: "хайрцаг (10 кг)", min: 1, stock: 40, img: "1540420773420-3366772f4999", origin: "Түнш фермүүд", organic: true, desc: "Салатны навч, бууцай, чери лооль, хэмх, чинжүү, ногоон сонгины 10 кг холимог." },
];

async function main() {
  const catIds: Record<string, string> = {};
  for (const [i, c] of categories.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, image: img(c.image), sortOrder: i },
      create: { slug: c.slug, name: c.name, image: img(c.image), sortOrder: i },
    });
    catIds[c.slug] = row.id;
  }

  for (const p of products) {
    const data = {
      name: p.name,
      description: p.desc,
      price: p.price,
      oldPrice: p.old ?? null,
      unit: p.unit,
      minQty: p.min,
      image: img(p.img),
      stock: p.stock,
      isFeatured: p.featured ?? false,
      isOrganic: p.organic ?? false,
      origin: p.origin,
      categoryId: catIds[p.cat],
    };
    await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: { slug: p.slug, ...data } });
  }

  // Remove the old retail sample catalog (anything not listed above).
  const removed = await prisma.product.deleteMany({ where: { slug: { notIn: products.map((p) => p.slug) } } });
  const removedCats = await prisma.category.deleteMany({ where: { slug: { notIn: categories.map((c) => c.slug) } } });

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    await prisma.user.upsert({
      where: { email },
      update: { role: "ADMIN", approved: true },
      create: { email, name: "Админ", role: "ADMIN", approved: true, passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log(`Admin user: ${email}`);
  }

  console.log(
    `Seeded ${categories.length} categories, ${products.length} products. Removed ${removed.count} old products, ${removedCats.count} old categories.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
