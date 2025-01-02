import { Product } from "@prisma/client";

export const USER_MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Jual Hasil Pertanian", href: "/dashboard/sell", icon: "ShoppingCart" },
  { name: "Products", href: "/dashboard/products", icon: "PackageSearch" },
];

export const PRODUCTS = [
  {
    name: "Bisi 18",
    price: 103000,
    productType: "BENIH",
    description:
      "Kualitas Kuat terhadap musim penghujan, tahan busuk, Tongkol muput (isi sampai ujung), Lebih tahan terhadap penyakit karat daun. Catatan* Pohon tinggi (rentan roboh saat angin kencang), Lebih cocok di tanam dimusim penghujan.",
    image: "/products/bisi18.jpeg",
  },
  {
    name: "Bisi 2",
    price: 91000,
    productType: "BENIH",
    description:
      "Potensi 2 tongkol sama besar, Kadar air rendah, tahan disimpan jangka waktu lama, Rendemen bagus ukuran janggel kecil, Biji muput (biji sampai ujung), Toleran bulai, karat & bercak daun. Catatan: Perlu perawatan dan pupuk yang lebih agar bisa panen dengan maksimal",
    image: "/products/bisi2.jpeg",
  },
  {
    name: "NK Sumo",
    price: 110000,
    productType: "BENIH",
    description:
      "Akar dan batang kuat tidak mudah roboh, Tongkol sangat besar dan rapat, Pertumbuhannya bagus / rata, Tahan terhadap cuaca kering. Catatan:  Usia panen yang sedikit lebih lama mulai dari 115-120 HST, Perlu perawatan yang lebih untuk jamur di musim hujan",
    image: "/products/nksumo.jpeg",
  },
  {
    name: "Pioner 27 Gajah",
    price: 91000,
    productType: "BENIH",
    description:
      "Ukuran jagung jumbo, Batang besar dan cukup kokoh, Tebon jagung cocok untuk dijual, Toleran terhadap bulai. Catatan: Jagung agak sulit di petik waktu panen, Pohon tidak terlalu tinggi.",
    image: "/products/pioner27gajah.jpeg",
  },
  {
    name: "NK PERKASA",
    price: 115000,
    productType: "BENIH",
    description:
      "Tahan terhadap cuaca kering, Buah lumayan besar, rendemen bagus, Sangat disukai pedagang jagung pipil & pakan ternak, Harga jual termasuk tinggi untuk sistem tebas karena kualitasnya. Catatan: Agak kurang ditanam musim penghujan, Perawatan jamur lebih ekstra kalau di musim penghujan.",
    image: "/products/nkperkasa.jpeg",
  },
  {
    name: "Pupuk Urea",
    price: 135000,
    productType: "PUPUK",
    description: "Menyediakan nitrogen (N) yang sangat penting untuk pertumbuhan vegetatif tanaman.",
    image: "/products/urea.jpeg",
  },
  {
    name: "Pupuk NPK",
    price: 140000,
    productType: "PUPUK",
    description:
      "Menyediakan tiga unsur hara utama, yaitu nitrogen (N), fosfor (P), dan kalium (K) yang dibutuhkan tanaman dalam jumlah besar.",
    image: "/products/npk.jpeg",
  },
] satisfies Partial<Product>[];
