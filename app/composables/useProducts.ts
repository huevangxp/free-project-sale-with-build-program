export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  description: string;
  colors: [string, string, string];
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "ຊຸດມົ້ງຜູ້ຍິງແບບດັ້ງເດີມ",
    category: "ຊຸດຜູ້ຍິງ",
    price: 850000,
    oldPrice: 990000,
    badge: "ຂາຍດີ",
    description:
      "ຊຸດມົ້ງຜູ້ຍິງແບບດັ້ງເດີມ ປັກລາຍມືທຸກຂັ້ນຕອນ ພ້ອມກະໂປງອັດກີບ ແລະ ຜ້າກັນເປື້ອນລາຍໂບຮານ ເໝາະສຳລັບງານບຸນ ແລະ ວັນສຳຄັນ.",
    colors: ["#0d9488", "#e11d48", "#f59e0b"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "ເສື້ອມົ້ງປັກລາຍມື",
    category: "ຊຸດຜູ້ຍິງ",
    price: 450000,
    badge: "ໃໝ່",
    description:
      "ເສື້ອມົ້ງປັກລາຍມືແທ້ 100% ລວດລາຍລະອຽດງາມ ຜ້າຝ້າຍເນື້ອດີ ໃສ່ສະບາຍ ເຂົ້າກັບຊຸດທັນສະໄໝໄດ້ງ່າຍ.",
    colors: ["#115e59", "#f43f5e", "#fbbf24"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "ກະໂປງມົ້ງລາຍໂບຮານ",
    category: "ຊຸດຜູ້ຍິງ",
    price: 380000,
    description:
      "ກະໂປງມົ້ງອັດກີບລາຍໂບຮານ ສີສັນສົດໃສ ເນື້ອຜ້າພິ້ວສວຍ ໝູນແລ້ວບານງາມ ເໝາະກັບການຟ້ອນ ແລະ ຖ່າຍຮູບ.",
    colors: ["#0f766e", "#c026d3", "#f97316"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "ຊຸດມົ້ງຜູ້ຊາຍເຕັມຊຸດ",
    category: "ຊຸດຜູ້ຊາຍ",
    price: 650000,
    badge: "ຂາຍດີ",
    description:
      "ຊຸດມົ້ງຜູ້ຊາຍເຕັມຊຸດ ເສື້ອ+ໂສ້ງ+ສາຍແອວ ຜ້າດຳເນື້ອໜາ ປັກແຖບລາຍງາມ ໃສ່ແລ້ວສະຫງ່າຜ່າເຜີຍ.",
    colors: ["#042f2e", "#0d9488", "#e11d48"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    name: "ໝວກມົ້ງເດັກນ້ອຍ",
    category: "ເດັກນ້ອຍ",
    price: 120000,
    badge: "ໃໝ່",
    description:
      "ໝວກມົ້ງເດັກນ້ອຍ ປັກລາຍນ້ອຍໆໜ້າຮັກ ພ້ອມພູ່ຫ້ອຍສີສັນສົດໃສ ມີຫຼາຍຂະໜາດໃຫ້ເລືອກ.",
    colors: ["#14b8a6", "#f43f5e", "#facc15"],
    sizes: ["1-2 ປີ", "3-4 ປີ", "5-6 ປີ"],
  },
  {
    id: 6,
    name: "ສາຍແອວເງິນມົ້ງ",
    category: "ເຄື່ອງປະດັບ",
    price: 950000,
    description:
      "ສາຍແອວເງິນມົ້ງແທ້ ຕີມືໂດຍຊ່າງມີປະສົບການ ລວດລາຍປານີດ ເປັນມໍລະດົກທີ່ສົ່ງຕໍ່ໄດ້ຫຼາຍລຸ້ນຄົນ.",
    colors: ["#134e4a", "#94a3b8", "#e2e8f0"],
    sizes: ["ຟຣີໄຊສ໌"],
  },
  {
    id: 7,
    name: "ຜ້າພັນຄໍປັກລາຍມົ້ງ",
    category: "ເຄື່ອງປະດັບ",
    price: 180000,
    description:
      "ຜ້າພັນຄໍປັກລາຍມົ້ງ ນຸ່ມສະບາຍ ໃສ່ໄດ້ທຸກລະດູ ເປັນຂອງຝາກທີ່ມີຄຸນຄ່າທາງວັດທະນະທຳ.",
    colors: ["#0d9488", "#fb7185", "#fde047"],
    sizes: ["ຟຣີໄຊສ໌"],
  },
  {
    id: 8,
    name: "ຊຸດມົ້ງເດັກຍິງ",
    category: "ເດັກນ້ອຍ",
    price: 320000,
    oldPrice: 380000,
    badge: "ຫຼຸດລາຄາ",
    description:
      "ຊຸດມົ້ງເດັກຍິງເຕັມຊຸດ ພ້ອມໝວກ ແລະ ເຄື່ອງປະດັບ ສີສັນສົດໃສ ໜ້າຮັກ ເໝາະກັບງານບຸນປີໃໝ່ມົ້ງ.",
    colors: ["#0f766e", "#ec4899", "#f59e0b"],
    sizes: ["3-4 ປີ", "5-6 ປີ", "7-8 ປີ"],
  },
];

export const useProducts = () => {
  const categories = [
    "ທັງໝົດ",
    "ຊຸດຜູ້ຍິງ",
    "ຊຸດຜູ້ຊາຍ",
    "ເດັກນ້ອຍ",
    "ເຄື່ອງປະດັບ",
  ];

  const all = () => products;
  const byId = (id: number) => products.find((p) => p.id === id);
  const byCategory = (category: string) =>
    category === "ທັງໝົດ"
      ? products
      : products.filter((p) => p.category === category);
  const featured = () => products.slice(0, 4);

  return { categories, all, byId, byCategory, featured };
};
