import "server-only";
import {
  BANK_TRANSFER,
  DELIVERY_DAYS_AHEAD,
  DELIVERY_FEE,
  DELIVERY_SLOTS,
  DISTRICTS,
  FREE_DELIVERY_FROM,
  PICKUP_POINT,
  SHOP_EMAIL,
  SHOP_NAME,
  SHOP_PHONE,
  TRANSFER_HOLD_HOURS,
} from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";
import { shopFaqs } from "@/lib/help/shopFaqs";
import { prisma } from "@/lib/prisma";

/**
 * The shop's knowledge for the chat assistant, as Markdown: rules from constants, the FAQ and every
 * product's description from the DB. Prices and stock are left out on purpose: they change with
 * every sale, so the chat sends the live ones with each question (liveCatalogText).
 */
export async function shopKnowledgeText(): Promise<string> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      name: true,
      products: {
        orderBy: { name: "asc" },
        select: { name: true, description: true, unit: true, minQty: true, origin: true, isOrganic: true },
      },
    },
  });

  const lines = [
    `# ${SHOP_NAME}`,
    `Барс / Нарийн нугын захын бөөний хүнсний онлайн дэлгүүр. Утас: ${SHOP_PHONE}. И-мэйл: ${SHOP_EMAIL}.`,
    "",
    "## Хүргэлт",
    `- ${formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй, бага бол ${formatPrice(DELIVERY_FEE)}.`,
    "- Батлагдсан байгууллага (B2B) худалдан авагчид хүргэлт үргэлж үнэгүй.",
    `- Маргаашаас эхлэн ${DELIVERY_DAYS_AHEAD} хоногийн аль нэг өдөр, цаг: ${DELIVERY_SLOTS.join(", ")}.`,
    "- Давтамжит захиалга: долоо хоног бүр, 2 долоо хоног тутам эсвэл сар бүр, сонгосон гаригуудад.",
    `- Хүргэх дүүрэг: ${DISTRICTS.join(", ")}.`,
    "",
    "## Очиж авах",
    `- ${PICKUP_POINT.district} дүүрэг, ${PICKUP_POINT.detail}. Хүргэлтийн төлбөргүй. Толгой хэсгийн «Очиж авах» товчоор сонгоно.`,
    `- Очиж авах өдөр, цагийг мөн маргаашаас эхлэн ${DELIVERY_DAYS_AHEAD} хоногийн дотор сонгоно (${DELIVERY_SLOTS.join(", ")}). Өнөөдөр хүргэх ч, өнөөдөр очиж авах ч боломжгүй.`,
    "",
    "## Төлбөр",
    "- QR код / банкны апп (Wire) эсвэл дансаар шилжүүлэх.",
    `- Данс: ${BANK_TRANSFER.bankName} ${BANK_TRANSFER.accountNumber}, нэр ${BANK_TRANSFER.accountName}. Гүйлгээний утгад захиалгын хуудсан дээрх «BZ…» кодыг бичнэ.`,
    `- Дансаар захиалсан бараа ${TRANSFER_HOLD_HOURS} цаг хадгалагдана; төлөгдөөгүй бол автоматаар цуцлагдана.`,
    "- НӨАТ-ын баримт: «Хувь хүн» эсвэл «Байгууллага» (7 оронтой регистр).",
    "",
    "## Түгээмэл асуулт",
    ...shopFaqs.flatMap((faq) => [`### ${faq.q}`, faq.a, ""]),
    "## Бараа (үнэ, үлдэгдэл энд байхгүй)",
  ];

  for (const category of categories) {
    lines.push("", `### ${category.name}`);
    for (const product of category.products) {
      const extras = [
        `нэгж: ${product.unit}`,
        `хамгийн бага захиалга: ${product.minQty}`,
        product.origin ? `гарал: ${product.origin}` : null,
        product.isOrganic ? "органик" : null,
      ].filter(Boolean);
      lines.push(`- ${product.name} (${extras.join(", ")}). ${product.description}`);
    }
  }
  return lines.join("\n");
}
