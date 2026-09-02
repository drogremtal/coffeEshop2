export type Category = "single-origin" | "blend" | "espresso" | "decaf";

export interface BrewGuide {
  method: string;
  ratio: string;
  temp: string;
  time: string;
  grind: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  origin: string;
  region: string;
  code: string;
  process: string;
  varietal: string;
  altitude: string;
  roast: 1 | 2 | 3 | 4 | 5;
  roastLabel: string;
  category: Category;
  notes: string[];
  price: number;
  weight: string;
  score: number;
  stock: number;
  image: string;
  description: string;
  brew: BrewGuide;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "single-origin": "Single Origin",
  blend: "Blend",
  espresso: "Espresso",
  decaf: "Decaf",
};

export const PRODUCTS: Product[] = [
  {
    id: "dawn-patrol",
    name: "Dawn Patrol",
    tagline: "A washed heirloom that opens like citrus blossom.",
    origin: "Ethiopia",
    region: "Yirgacheffe · Gedeb",
    code: "ETH-YIR",
    process: "Washed",
    varietal: "Heirloom",
    altitude: "2,100–2,300 masl",
    roast: 1,
    roastLabel: "Light",
    category: "single-origin",
    notes: ["Bergamot", "Apricot jam", "Wild honey"],
    price: 19.5,
    weight: "250 g",
    score: 92,
    stock: 18,
    image:
      "https://image.qwenlm.ai/generated-images/37ea5a23-8850-4163-8da4-130e607a95ba/_result.png",
    description:
      "A washed heirloom lot from the Gedeb washing station, dried slowly on raised beds for twenty-one days. It opens with bergamot and apricot jam, then settles into a long wild-honey finish that keeps unfolding as the cup cools. Our brightest pour of the season — treat it gently and it will repay you.",
    brew: {
      method: "Pour-over · V60",
      ratio: "1 : 16",
      temp: "94 °C",
      time: "2:45",
      grind: "Medium-fine",
    },
  },
  {
    id: "velvet-hour",
    name: "Velvet Hour",
    tagline: "Pink Bourbon, plush as its name suggests.",
    origin: "Colombia",
    region: "Huila · Finca La Esperanza",
    code: "COL-HUI",
    process: "Washed",
    varietal: "Pink Bourbon",
    altitude: "1,750 masl",
    roast: 3,
    roastLabel: "Medium",
    category: "single-origin",
    notes: ["Panela", "Red plum", "Cacao nib"],
    price: 18.75,
    weight: "250 g",
    score: 89,
    stock: 24,
    image:
      "https://image.qwenlm.ai/generated-images/c6dc1438-0b5a-408d-87dd-c27414612352/_result.png",
    description:
      "Grown by the Trujillo family on a cloud-forested slope above the Magdalena valley, this Pink Bourbon was fermented 36 hours before washing. The cup is round and velvet-textured — panela sweetness up front, red plum in the middle, a dusting of cacao nib to close. Equally at home in a dripper or a weekend French press.",
    brew: {
      method: "Pour-over · Kalita",
      ratio: "1 : 15.5",
      temp: "93 °C",
      time: "3:00",
      grind: "Medium",
    },
  },
  {
    id: "night-shift",
    name: "Night Shift",
    tagline: "Dark, syrupy, built for milk and late hours.",
    origin: "Indonesia",
    region: "Sumatra · Mandheling",
    code: "IDN-MAN",
    process: "Wet-hulled",
    varietal: "Ateng",
    altitude: "1,200–1,500 masl",
    roast: 5,
    roastLabel: "Dark",
    category: "espresso",
    notes: ["Dark chocolate", "Cedar", "Molasses"],
    price: 17.25,
    weight: "250 g",
    score: 86,
    stock: 31,
    image:
      "https://image.qwenlm.ai/generated-images/66b5e6e0-3064-4cc6-bdc3-12974519621f/_result.png",
    description:
      "A classic wet-hulled Mandheling, roasted to the edge of second crack and no further. Expect dark chocolate and cedar with a molasses weight that cuts cleanly through steamed milk. This is the bag our bar team pulls when the café is full and the tickets won't stop — dependable, brooding, unapologetic.",
    brew: {
      method: "Espresso",
      ratio: "1 : 2",
      temp: "93 °C",
      time: "0:28",
      grind: "Fine",
    },
  },
  {
    id: "hearth-blend",
    name: "Hearth Blend",
    tagline: "Our house espresso — Brazil and Ethiopia, best of both fires.",
    origin: "Brazil + Ethiopia",
    region: "Cerrado · Yirgacheffe",
    code: "BLEND-04",
    process: "Natural + Washed",
    varietal: "Mundo Novo · Heirloom",
    altitude: "1,100–2,000 masl",
    roast: 4,
    roastLabel: "Medium-dark",
    category: "blend",
    notes: ["Hazelnut", "Brown butter", "Date"],
    price: 16.5,
    weight: "250 g",
    score: 88,
    stock: 42,
    image:
      "https://image.qwenlm.ai/generated-images/be93b8d3-2072-4d7e-8e95-f9ad30514e6e/_result.png",
    description:
      "Two thirds natural Cerrado for body and brown-butter sweetness, one third washed Yirgacheffe to keep the cup singing. Roasted as a post-blend so each component lands exactly where it should. Hazelnut and date carry from first sip to last — the pot-of-coffee-for-the-whole-house bag.",
    brew: {
      method: "Espresso or batch brew",
      ratio: "1 : 2 / 1 : 15",
      temp: "93 °C",
      time: "0:27",
      grind: "Fine / medium",
    },
  },
  {
    id: "cloud-forest",
    name: "Cloud Forest",
    tagline: "Honey-processed Caturra from the Tarrazú highlands.",
    origin: "Costa Rica",
    region: "Tarrazú · Don Mayo",
    code: "CRI-TAR",
    process: "Yellow honey",
    varietal: "Caturra",
    altitude: "1,900 masl",
    roast: 2,
    roastLabel: "Medium-light",
    category: "single-origin",
    notes: ["White peach", "Jasmine", "Raw cane sugar"],
    price: 20.25,
    weight: "250 g",
    score: 90,
    stock: 9,
    image:
      "https://image.qwenlm.ai/generated-images/923c1234-0328-472b-82fc-e6ed435bbcf9/_result.png",
    description:
      "From Don Mayo's micro-mill in the Tarrazú highlands, where the mucilage is left on the bean to dry in the mountain fog. Yellow peach and jasmine over raw cane sugar sweetness, with a silky body the honey process is famous for. A small nine-bag allocation this cycle — when it's gone, it's gone until next harvest.",
    brew: {
      method: "Pour-over · V60",
      ratio: "1 : 16",
      temp: "92 °C",
      time: "2:30",
      grind: "Medium-fine",
    },
  },
  {
    id: "ember-decaf",
    name: "Ember Decaf",
    tagline: "Sugarcane decaf that nobody clocks as decaf.",
    origin: "Colombia",
    region: "Cauca · El Tambo",
    code: "COL-CAU",
    process: "Sugarcane E.A. decaf",
    varietal: "Caturra · Castillo",
    altitude: "1,600 masl",
    roast: 3,
    roastLabel: "Medium",
    category: "decaf",
    notes: ["Toffee", "Toasted almond", "Orange zest"],
    price: 17.75,
    weight: "250 g",
    score: 87,
    stock: 27,
    image:
      "https://image.qwenlm.ai/generated-images/6439fd50-edb8-4d66-af31-af2ade795a73/_result.png",
    description:
      "Decaffeinated with sugarcane-derived ethyl acetate at a Colombian facility, so the sugars stay in the bean instead of the character walking out. Toffee and toasted almond with a flick of orange zest — blind-tasted against our caf lots, even the skeptics reach for a second cup. The 9 p.m. pour, solved.",
    brew: {
      method: "Pour-over or drip",
      ratio: "1 : 15",
      temp: "93 °C",
      time: "3:00",
      grind: "Medium",
    },
  },
];

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/f1440196-af19-43c1-a672-36f0a56eb12d/_result.png";

export const FREE_SHIPPING_THRESHOLD = 50;
export const FLAT_SHIPPING = 6;

export const formatPrice = (n: number): string =>
  `$${n.toFixed(2).replace(/\.00$/, "")}`;
