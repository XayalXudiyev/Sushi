export type CategoryId = "rolls" | "nigiri" | "sashimi" | "gunkan" | "sets" | "drinks";

export type Tag = "hit" | "new" | "spicy" | "veg";

export type ArtKind = "roll" | "nigiri" | "sashimi" | "gunkan" | "set" | "drink";

export type Art = {
  kind: ArtKind;
  /** Main filling / fish colour */
  fish: string;
  /** Secondary filling colour */
  accent: string;
  /** Card background tint */
  bg: string;
  /** Optional second fish colour (alternating slices) */
  alt?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  ingredients: string[];
  price: number;
  oldPrice?: number;
  weight: number;
  pieces?: number;
  tags: Tag[];
  rating: number;
  art: Art;
};

export const categories: { id: CategoryId; name: string; art: Art }[] = [
  { id: "rolls", name: "Rollar", art: { kind: "roll", fish: "#ff8a5c", accent: "#9bd66b", bg: "#2a1714" } },
  { id: "nigiri", name: "Nigiri", art: { kind: "nigiri", fish: "#ff8a5c", accent: "#ffd2bd", bg: "#251a12" } },
  { id: "sashimi", name: "Saşimi", art: { kind: "sashimi", fish: "#e5484d", accent: "#ff9aa0", bg: "#2a1418" } },
  { id: "gunkan", name: "Qunkan", art: { kind: "gunkan", fish: "#ff6a2b", accent: "#ffb347", bg: "#26170f" } },
  { id: "sets", name: "Setlər", art: { kind: "set", fish: "#ff8a5c", accent: "#9bd66b", bg: "#1f1a14" } },
  { id: "drinks", name: "İçkilər", art: { kind: "drink", fish: "#b8e07a", accent: "#e8f5c8", bg: "#161d14" } },
];

export const tagLabels: Record<Tag, string> = {
  hit: "Hit",
  new: "Yeni",
  spicy: "Acılı",
  veg: "Vegetarian",
};

const SALMON = "#ff8a5c";
const TUNA = "#e5484d";
const EEL = "#8a5a3c";
const AVOCADO = "#9bd66b";
const CUCUMBER = "#5fbf6a";
const SHRIMP = "#ffa77a";
const CHEESE = "#fff4e0";
const CRAB = "#ff9f8a";

export const products: Product[] = [
  // Rollar
  {
    slug: "filadelfiya-klassik",
    name: "Filadelfiya Klassik",
    category: "rolls",
    description: "Təzə qızılbalıq, yumşaq krem pendir və xiyar — ən çox sevilən klassik.",
    ingredients: ["Qızılbalıq", "Krem pendir", "Xiyar", "Düyü", "Nori"],
    price: 18.9,
    weight: 260,
    pieces: 8,
    tags: ["hit"],
    rating: 4.9,
    art: { kind: "roll", fish: SALMON, accent: CHEESE, bg: "#2a1714" },
  },
  {
    slug: "kaliforniya",
    name: "Kaliforniya",
    category: "rolls",
    description: "Krab əti, avokado və xiyar, üstü tobiko kürüsü ilə.",
    ingredients: ["Krab əti", "Avokado", "Xiyar", "Tobiko", "Mayonez"],
    price: 15.5,
    weight: 240,
    pieces: 8,
    tags: ["hit"],
    rating: 4.8,
    art: { kind: "roll", fish: CRAB, accent: AVOCADO, bg: "#2a1a12" },
  },
  {
    slug: "drakon",
    name: "Drakon",
    category: "rolls",
    description: "Hisə verilmiş ilanbalığı, avokado və unagi sousu ilə zəngin dad.",
    ingredients: ["İlanbalığı", "Avokado", "Krem pendir", "Unagi sousu", "Küncüt"],
    price: 22.9,
    weight: 280,
    pieces: 8,
    tags: ["hit", "new"],
    rating: 4.9,
    art: { kind: "roll", fish: EEL, accent: AVOCADO, bg: "#221a12" },
  },
  {
    slug: "spicy-tuna",
    name: "Spicy Tuna",
    category: "rolls",
    description: "Tuna balığı, acılı sous və yaşıl soğan — odlu sevənlər üçün.",
    ingredients: ["Tuna", "Acılı sous", "Yaşıl soğan", "Xiyar"],
    price: 17.9,
    weight: 230,
    pieces: 8,
    tags: ["spicy"],
    rating: 4.7,
    art: { kind: "roll", fish: TUNA, accent: "#ff3b1f", bg: "#2a1416" },
  },
  {
    slug: "tempura-krevet",
    name: "Tempura Krevet",
    category: "rolls",
    description: "Xırtıldayan tempura krevet, avokado və şirin-acı sous.",
    ingredients: ["Tempura krevet", "Avokado", "Krem pendir", "Şirin çili sous"],
    price: 19.5,
    weight: 270,
    pieces: 8,
    tags: ["spicy", "new"],
    rating: 4.8,
    art: { kind: "roll", fish: SHRIMP, accent: AVOCADO, bg: "#2a1c12" },
  },
  {
    slug: "veggie-roll",
    name: "Veggie Roll",
    category: "rolls",
    description: "Avokado, xiyar, bolqar bibəri və krem pendir. Yüngül və təravətli.",
    ingredients: ["Avokado", "Xiyar", "Bolqar bibəri", "Krem pendir"],
    price: 11.9,
    weight: 220,
    pieces: 8,
    tags: ["veg"],
    rating: 4.5,
    art: { kind: "roll", fish: AVOCADO, accent: "#ffcf3f", bg: "#18200f" },
  },
  {
    slug: "kappa-maki",
    name: "Kappa Maki",
    category: "rolls",
    description: "Klassik xiyarlı maki — sadə, yüngül, dadlı.",
    ingredients: ["Xiyar", "Düyü", "Nori", "Küncüt"],
    price: 6.9,
    weight: 120,
    pieces: 6,
    tags: ["veg"],
    rating: 4.4,
    art: { kind: "roll", fish: CUCUMBER, accent: CUCUMBER, bg: "#14200f" },
  },
  {
    slug: "kanada",
    name: "Kanada",
    category: "rolls",
    description: "İlanbalığı və qızılbalıq bir yerdə, krem pendir və unagi sousu ilə.",
    ingredients: ["Qızılbalıq", "İlanbalığı", "Krem pendir", "Xiyar", "Unagi sousu"],
    price: 23.5,
    oldPrice: 26.9,
    weight: 290,
    pieces: 8,
    tags: ["hit"],
    rating: 4.9,
    art: { kind: "roll", fish: SALMON, accent: EEL, bg: "#2a1814" },
  },

  // Nigiri
  {
    slug: "nigiri-qizilbaliq",
    name: "Nigiri Qızılbalıq",
    category: "nigiri",
    description: "Əl ilə formalaşdırılmış düyü üzərində təzə qızılbalıq dilimi.",
    ingredients: ["Qızılbalıq", "Düyü", "Vasabi"],
    price: 5.9,
    weight: 40,
    pieces: 1,
    tags: ["hit"],
    rating: 4.8,
    art: { kind: "nigiri", fish: SALMON, accent: "#ffd2bd", bg: "#251a12" },
  },
  {
    slug: "nigiri-tuna",
    name: "Nigiri Tuna",
    category: "nigiri",
    description: "Qırmızı tuna dilimi, yüngül soya ilə.",
    ingredients: ["Tuna", "Düyü", "Vasabi"],
    price: 6.5,
    weight: 40,
    pieces: 1,
    tags: [],
    rating: 4.7,
    art: { kind: "nigiri", fish: TUNA, accent: "#ff9aa0", bg: "#2a1418" },
  },
  {
    slug: "nigiri-ilanbaligi",
    name: "Nigiri İlanbalığı",
    category: "nigiri",
    description: "Qızardılmış ilanbalığı, unagi sousu və küncüt.",
    ingredients: ["İlanbalığı", "Düyü", "Unagi sousu"],
    price: 6.9,
    weight: 45,
    pieces: 1,
    tags: ["new"],
    rating: 4.8,
    art: { kind: "nigiri", fish: EEL, accent: "#c08a5c", bg: "#221a12" },
  },
  {
    slug: "nigiri-krevet",
    name: "Nigiri Krevet",
    category: "nigiri",
    description: "Qaynadılmış ebi krevet, klassik yapon üslubunda.",
    ingredients: ["Krevet", "Düyü", "Vasabi"],
    price: 5.5,
    weight: 40,
    pieces: 1,
    tags: [],
    rating: 4.6,
    art: { kind: "nigiri", fish: SHRIMP, accent: "#fff0e6", bg: "#2a1c12" },
  },

  // Saşimi
  {
    slug: "sasimi-qizilbaliq",
    name: "Saşimi Qızılbalıq",
    category: "sashimi",
    description: "5 dilim təzə Norveç qızılbalığı.",
    ingredients: ["Qızılbalıq", "Daykon", "Vasabi", "Zəncəfil"],
    price: 16.9,
    weight: 100,
    pieces: 5,
    tags: ["hit"],
    rating: 4.9,
    art: { kind: "sashimi", fish: SALMON, accent: "#ffd2bd", bg: "#251a12" },
  },
  {
    slug: "sasimi-tuna",
    name: "Saşimi Tuna",
    category: "sashimi",
    description: "5 dilim qırmızı tuna, daykon yastığında.",
    ingredients: ["Tuna", "Daykon", "Vasabi", "Zəncəfil"],
    price: 18.9,
    weight: 100,
    pieces: 5,
    tags: [],
    rating: 4.7,
    art: { kind: "sashimi", fish: TUNA, accent: "#ff9aa0", bg: "#2a1418" },
  },
  {
    slug: "sasimi-mix",
    name: "Saşimi Mix",
    category: "sashimi",
    description: "Qızılbalıq, tuna və ilanbalığı — hər birindən 3 dilim.",
    ingredients: ["Qızılbalıq", "Tuna", "İlanbalığı", "Daykon"],
    price: 29.9,
    oldPrice: 34.9,
    weight: 180,
    pieces: 9,
    tags: ["new"],
    rating: 4.8,
    art: { kind: "sashimi", fish: TUNA, accent: "#ff9aa0", alt: SALMON, bg: "#2a1616" },
  },

  // Qunkan
  {
    slug: "qunkan-tobiko",
    name: "Qunkan Tobiko",
    category: "gunkan",
    description: "Nori içində narıncı uçan balıq kürüsü.",
    ingredients: ["Tobiko", "Düyü", "Nori"],
    price: 5.9,
    weight: 40,
    pieces: 1,
    tags: [],
    rating: 4.6,
    art: { kind: "gunkan", fish: "#ff6a2b", accent: "#ffb347", bg: "#26170f" },
  },
  {
    slug: "qunkan-spicy-salmon",
    name: "Qunkan Spicy Salmon",
    category: "gunkan",
    description: "Doğranmış qızılbalıq acılı sous ilə.",
    ingredients: ["Qızılbalıq", "Acılı sous", "Düyü", "Nori"],
    price: 6.5,
    weight: 45,
    pieces: 1,
    tags: ["spicy", "hit"],
    rating: 4.8,
    art: { kind: "gunkan", fish: SALMON, accent: "#ff3b1f", bg: "#2a1714" },
  },
  {
    slug: "qunkan-wakame",
    name: "Qunkan Vakame",
    category: "gunkan",
    description: "Yosun salatı (çuka) küncüt ilə.",
    ingredients: ["Vakame yosunu", "Küncüt", "Düyü", "Nori"],
    price: 4.9,
    weight: 40,
    pieces: 1,
    tags: ["veg"],
    rating: 4.4,
    art: { kind: "gunkan", fish: "#7fcf4a", accent: "#b8e07a", bg: "#16200f" },
  },

  // Setlər
  {
    slug: "set-filadelfiya",
    name: "Set Filadelfiya",
    category: "sets",
    description: "3 növ Filadelfiya — klassik, ilanbalıqlı və tempura. 2-3 nəfərlik.",
    ingredients: ["Filadelfiya Klassik", "Filadelfiya Unagi", "Filadelfiya Tempura"],
    price: 49.9,
    oldPrice: 56.7,
    weight: 780,
    pieces: 24,
    tags: ["hit"],
    rating: 4.9,
    art: { kind: "set", fish: SALMON, accent: CHEESE, bg: "#2a1714" },
  },
  {
    slug: "set-tokio",
    name: "Set Tokio",
    category: "sets",
    description: "Rollar, nigiri və qunkan qarışığı — böyük şirkət üçün.",
    ingredients: ["Kaliforniya", "Drakon", "Nigiri x4", "Qunkan x4"],
    price: 79.9,
    oldPrice: 92.0,
    weight: 1250,
    pieces: 40,
    tags: ["hit", "new"],
    rating: 5.0,
    art: { kind: "set", fish: TUNA, accent: AVOCADO, bg: "#2a1418" },
  },
  {
    slug: "set-veggie",
    name: "Set Veggie",
    category: "sets",
    description: "Tam vegetarian set: kappa maki, veggie roll, vakame qunkan.",
    ingredients: ["Kappa Maki", "Veggie Roll", "Qunkan Vakame x2"],
    price: 27.9,
    weight: 480,
    pieces: 16,
    tags: ["veg"],
    rating: 4.6,
    art: { kind: "set", fish: AVOCADO, accent: CUCUMBER, bg: "#16200f" },
  },
  {
    slug: "set-spicy",
    name: "Set Spicy",
    category: "sets",
    description: "Acılı rolların ən yaxşıları bir qutuda.",
    ingredients: ["Spicy Tuna", "Tempura Krevet", "Qunkan Spicy Salmon x2"],
    price: 44.9,
    weight: 620,
    pieces: 18,
    tags: ["spicy"],
    rating: 4.7,
    art: { kind: "set", fish: TUNA, accent: "#ff3b1f", bg: "#2a1416" },
  },

  // İçkilər
  {
    slug: "matcha-latte",
    name: "Matcha Latte",
    category: "drinks",
    description: "Yapon matça çayı süd ilə, soyuq və ya isti.",
    ingredients: ["Matça", "Süd", "Buz"],
    price: 6.5,
    weight: 350,
    tags: ["veg", "new"],
    rating: 4.7,
    art: { kind: "drink", fish: "#9ccc5a", accent: "#e8f5c8", bg: "#161d14" },
  },
  {
    slug: "yuzu-limonad",
    name: "Yuzu Limonad",
    category: "drinks",
    description: "Sitrus yuzu ilə təravətləndirici ev limonadı.",
    ingredients: ["Yuzu", "Limon", "Nanə", "Qazlı su"],
    price: 5.5,
    weight: 400,
    tags: ["veg"],
    rating: 4.6,
    art: { kind: "drink", fish: "#ffd23f", accent: "#fff6c8", bg: "#201c0f" },
  },
  {
    slug: "yasil-cay",
    name: "Yaşıl Çay",
    category: "drinks",
    description: "Sença yaşıl çayı, çaynikdə.",
    ingredients: ["Sença çayı"],
    price: 4.0,
    weight: 500,
    tags: ["veg"],
    rating: 4.5,
    art: { kind: "drink", fish: "#c9b458", accent: "#efe6b8", bg: "#1d1b10" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return `${value.toFixed(2)} ₼`;
}
