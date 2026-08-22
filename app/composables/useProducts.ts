export interface Product {
  id: number;
  /** Fallback name (Lao) — display uses the i18n key products.{id}.name */
  name: string;
  /** Category code, translated via categories.{code} */
  category: "women" | "men" | "kids" | "accessories";
  price: number;
  oldPrice?: number;
  /** Badge code, translated via badges.{code} */
  badge?: "bestseller" | "new" | "sale";
  colors: [string, string, string];
  /** Size codes: letter sizes pass through, others translated via sizes.{code} */
  sizes: string[];
  /** Illustration style used when no photo is set */
  kind: "dress" | "hat" | "belt" | "scarf";
  /** Real photo path, e.g. "/images/products/1.jpg" (put files in public/images/products/) */
  image?: string;
}

const products: Product[] = [
  {
    id: 1,
    kind: "dress",
    name: "ຊຸດມົ້ງຜູ້ຍິງແບບດັ້ງເດີມ",
    category: "women",
    price: 850000,
    oldPrice: 990000,
    badge: "bestseller",
    colors: ["#0d9488", "#e11d48", "#f59e0b"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    kind: "dress",
    name: "ເສື້ອມົ້ງປັກລາຍມື",
    category: "women",
    price: 450000,
    badge: "new",
    colors: ["#115e59", "#f43f5e", "#fbbf24"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    kind: "dress",
    name: "ກະໂປງມົ້ງລາຍໂບຮານ",
    category: "women",
    price: 380000,
    colors: ["#0f766e", "#c026d3", "#f97316"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    kind: "dress",
    name: "ຊຸດມົ້ງຜູ້ຊາຍເຕັມຊຸດ",
    category: "men",
    price: 650000,
    badge: "bestseller",
    colors: ["#042f2e", "#0d9488", "#e11d48"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    kind: "hat",
    name: "ໝວກມົ້ງເດັກນ້ອຍ",
    category: "kids",
    price: 120000,
    badge: "new",
    colors: ["#14b8a6", "#f43f5e", "#facc15"],
    sizes: ["1-2y", "3-4y", "5-6y"],
  },
  {
    id: 6,
    kind: "belt",
    name: "ສາຍແອວເງິນມົ້ງ",
    category: "accessories",
    price: 950000,
    colors: ["#134e4a", "#94a3b8", "#e2e8f0"],
    sizes: ["free"],
  },
  {
    id: 7,
    kind: "scarf",
    name: "ຜ້າພັນຄໍປັກລາຍມົ້ງ",
    category: "accessories",
    price: 180000,
    colors: ["#0d9488", "#fb7185", "#fde047"],
    sizes: ["free"],
  },
  {
    id: 8,
    kind: "dress",
    name: "ຊຸດມົ້ງເດັກຍິງ",
    category: "kids",
    price: 320000,
    oldPrice: 380000,
    badge: "sale",
    colors: ["#0f766e", "#ec4899", "#f59e0b"],
    sizes: ["3-4y", "5-6y", "7-8y"],
  },
];

export const useProducts = () => {
  const { t, te } = useI18n();

  const categories = ["all", "women", "men", "kids", "accessories"] as const;

  const all = () => products;
  const byId = (id: number) => products.find((p) => p.id === id);
  const byCategory = (category: string) =>
    category === "all"
      ? products
      : products.filter((p) => p.category === category);
  const featured = () => products.slice(0, 4);

  /** Localized product name with fallback for items not in the i18n files */
  const productName = (id: number, fallback = "") =>
    te(`products.${id}.name`) ? t(`products.${id}.name`) : fallback;

  /** Localized product description */
  const productDesc = (id: number, fallback = "") =>
    te(`products.${id}.desc`) ? t(`products.${id}.desc`) : fallback;

  /** Localized size label — letter sizes (S, M, L...) pass through */
  const sizeLabel = (size: string) =>
    te(`sizes.${size}`) ? t(`sizes.${size}`) : size;

  return {
    categories,
    all,
    byId,
    byCategory,
    featured,
    productName,
    productDesc,
    sizeLabel,
  };
};
