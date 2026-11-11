export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  dot?: boolean;
};

export const NAV: NavItem[] = [
  {
    label: "Ногоо",
    href: "/shop",
    children: [
      { label: "Үндэст ногоо", href: "/shop?category=root-vegetables" },
      { label: "Жимсэн ногоо", href: "/shop?category=fruit-vegetables" },
      { label: "Байцаа, брокколи", href: "/shop?category=cabbages" },
      { label: "Навчит ногоо", href: "/shop?category=leafy-greens" },
      { label: "Сонгино, сармис", href: "/shop?category=onion-garlic" },
    ],
  },
  { label: "Холимог хайрцаг", href: "/shop?category=mixed-boxes" },
  { label: "Хямдрал", href: "/shop?deals=1", dot: true },
  { label: "Манай фермүүд", href: "/farms" },
  { label: "Хэрхэн захиалах", href: "/help" },
];
