# Ургац — бөөний хүнсний ногоо (B2B)

Ресторан, зочид буудал, дэлгүүрт зориулсан хүнсний ногооны бөөний онлайн дэлгүүр.
Next.js 16 + Tailwind CSS 4 + Prisma 6 + PostgreSQL (Supabase) + QPay.

## Эхлүүлэх

```bash
npm install
npm run db:migrate   # хүснэгтүүдийг үүсгэнэ/шинэчилнэ
npm run db:seed      # 6 ангилал, 22 ногоо, админ хэрэглэгч
npm run dev          # http://localhost:3000
```

> Схем өөрчлөгдсөний дараа `npm run dev`-ээ заавал дахин эхлүүлнэ үү (Prisma client шинэчлэгдэнэ).

## .env

| Нэр | Тайлбар |
| --- | --- |
| `DATABASE_URL`, `DIRECT_URL` | Supabase Postgres |
| `AUTH_SECRET` | Session болон QPay callback гарын үсгийн нууц түлхүүр |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | `db:seed`-ээр үүсэх админ |
| `QPAY_BASE_URL` | Sandbox: `https://merchant-sandbox.qpay.mn/v2` · Жинхэнэ: `https://merchant.qpay.mn/v2` |
| `QPAY_CLIENT_ID`, `QPAY_CLIENT_SECRET`, `QPAY_INVOICE_CODE` | QPay-тэй гэрээ байгуулахад өгөх түлхүүрүүд (sandbox: `TEST_MERCHANT` / `123456` / `TEST_INVOICE`) |
| `APP_URL` | Сайтын нийтэд нээлттэй хаяг. QPay төлбөрийн мэдэгдлийг `APP_URL/api/qpay/callback` руу илгээнэ |

## Бизнесийн урсгал

1. Байгууллага нэр, 7 оронтой регистрээр бүртгүүлнэ → **админ баталгаажуулна** (`/admin/users`).
2. Бүтээгдэхүүн бүр кг-ын үнэ, **хамгийн бага захиалгатай** (жишээ нь төмс 25 кг).
3. Захиалга өгөхөд нөөц түр барьж, **QPay нэхэмжлэх** (QR + банкны аппын холбоос) үүснэ.
4. Төлбөр орвол QPay callback эсвэл хуудасны автомат шалгалтаар захиалга **Төлөгдсөн / Баталгаажсан** болно.
5. Төлөөгүй захиалгыг үйлчлүүлэгч өөрөө цуцалж болно; админ цуцлахад нөөц буцаж, QPay нэхэмжлэх хүчингүй болно.

## Жинхэнэ QPay руу шилжих

1. qpay.mn-тэй мерчант гэрээ байгуулж `client_id`, `client_secret`, `invoice_code` авна.
2. `.env`-д `QPAY_BASE_URL=https://merchant.qpay.mn/v2` болон авсан түлхүүрүүдээ оруулна.
3. `APP_URL`-ийг сайтын жинхэнэ домэйн (https) болгоно — localhost руу QPay callback хүрэхгүй.
# grocery-shop
