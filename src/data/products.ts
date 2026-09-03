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
  lot: string;
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
  "single-origin": "Моносорта",
  blend: "Купажи",
  espresso: "Эспрессо",
  decaf: "Без кофеина",
};

export const PRODUCTS: Product[] = [
  {
    id: "dawn-patrol",
    name: "Утренний дозор",
    lot: "DAWN PATROL",
    tagline: "Мытый эрлум, раскрывающийся цитрусовым цветом.",
    origin: "Эфиопия",
    region: "Иргачефф · Гедеб",
    code: "ETH-YIR",
    process: "Мытая",
    varietal: "Эрлум",
    altitude: "2 100–2 300 м",
    roast: 1,
    roastLabel: "Светлая",
    category: "single-origin",
    notes: ["Бергамот", "Абрикосовый джем", "Дикий мёд"],
    price: 1090,
    weight: "250 г",
    score: 92,
    stock: 18,
    image:
      "https://image.qwenlm.ai/generated-images/37ea5a23-8850-4163-8da4-130e607a95ba/_result.png",
    description:
      "Лот мытой обработки со станции Гедеб: зерно сушилось на приподнятых стеллажах двадцать один день. В чашке — бергамот и абрикосовый джем, а в долгом послевкусии — дикий мёд, который продолжает раскрываться по мере остывания. Самая яркая воронка сезона: заваривайте бережно, и она отплатит сторицей.",
    brew: {
      method: "Воронка · V60",
      ratio: "1 : 16",
      temp: "94 °C",
      time: "2:45",
      grind: "Средне-мелкий",
    },
  },
  {
    id: "velvet-hour",
    name: "Бархатный час",
    lot: "VELVET HOUR",
    tagline: "Розовый бурбон — бархатный, как обещает название.",
    origin: "Колумбия",
    region: "Уила · Финка Ла Эсперанса",
    code: "COL-HUI",
    process: "Мытая",
    varietal: "Розовый бурбон",
    altitude: "1 750 м",
    roast: 3,
    roastLabel: "Средняя",
    category: "single-origin",
    notes: ["Панела", "Красная слива", "Какао-бобы"],
    price: 990,
    weight: "250 г",
    score: 89,
    stock: 24,
    image:
      "https://image.qwenlm.ai/generated-images/c6dc1438-0b5a-408d-87dd-c27414612352/_result.png",
    description:
      "Семья Трухильо выращивает этот розовый бурбон на склоне над долиной Магдалены, среди облачного леса. Перед мойкой зерно ферментировали 36 часов. Чашка округлая, бархатной текстуры: сладость панелы на старте, красная слива в середине и лёгкая какао-пыль в финале. Одинаково хороша в воронке и во френч-прессе выходного дня.",
    brew: {
      method: "Воронка · Kalita",
      ratio: "1 : 15,5",
      temp: "93 °C",
      time: "3:00",
      grind: "Средний",
    },
  },
  {
    id: "night-shift",
    name: "Ночная смена",
    lot: "NIGHT SHIFT",
    tagline: "Тёмный, тягучий — создан для молока и поздних часов.",
    origin: "Индонезия",
    region: "Суматра · Манделинг",
    code: "IDN-MAN",
    process: "Вет-халл",
    varietal: "Атенг",
    altitude: "1 200–1 500 м",
    roast: 5,
    roastLabel: "Тёмная",
    category: "espresso",
    notes: ["Тёмный шоколад", "Кедр", "Патока"],
    price: 890,
    weight: "250 г",
    score: 86,
    stock: 31,
    image:
      "https://image.qwenlm.ai/generated-images/66b5e6e0-3064-4cc6-bdc3-12974519621f/_result.png",
    description:
      "Классический Манделинг вет-халл обработки, обжаренный до грани второго крэка — и ни шагом дальше. Тёмный шоколад и кедр, тяжесть патоки, которая чисто прорезает молоко. Именно этот пакет наша бар-команда ставит в холдер, когда зал полон и чеки не кончаются. Надёжный, суровый, без извинений.",
    brew: {
      method: "Эспрессо",
      ratio: "1 : 2",
      temp: "93 °C",
      time: "0:28",
      grind: "Мелкий",
    },
  },
  {
    id: "hearth-blend",
    name: "Очаг",
    lot: "HEARTH",
    tagline: "Наш домашний эспрессо: Бразилия и Эфиопия — лучшее от обоих огней.",
    origin: "Бразилия + Эфиопия",
    region: "Серрадо · Иргачефф",
    code: "BLEND-04",
    process: "Натуральная + мытая",
    varietal: "Мундо Ново · Эрлум",
    altitude: "1 100–2 000 м",
    roast: 4,
    roastLabel: "Средне-тёмная",
    category: "blend",
    notes: ["Фундук", "Топлёное масло", "Финик"],
    price: 790,
    weight: "250 г",
    score: 88,
    stock: 42,
    image:
      "https://image.qwenlm.ai/generated-images/be93b8d3-2072-4d7e-8e95-f9ad30514e6e/_result.png",
    description:
      "Две трети — натуральная Бразилия из Серрадо для тела и сладости топлёного масла, треть — мытый Иргачефф, чтобы чашка звенела. Компоненты обжариваются раздельно, чтобы каждый лёг точно в цель. Фундук и финик — от первого глотка до последнего. Тот самый пакет, на котором живёт весь дом.",
    brew: {
      method: "Эспрессо или фильтр",
      ratio: "1 : 2 / 1 : 15",
      temp: "93 °C",
      time: "0:27",
      grind: "Мелкий / средний",
    },
  },
  {
    id: "cloud-forest",
    name: "Облачный лес",
    lot: "CLOUD FOREST",
    tagline: "Катура хани-обработки с высокогорий Тарразу.",
    origin: "Коста-Рика",
    region: "Тарразу · Дон Майо",
    code: "CRI-TAR",
    process: "Жёлтый хани",
    varietal: "Катура",
    altitude: "1 900 м",
    roast: 2,
    roastLabel: "Средне-светлая",
    category: "single-origin",
    notes: ["Белый персик", "Жасмин", "Тростниковый сахар"],
    price: 1190,
    weight: "250 г",
    score: 90,
    stock: 9,
    image:
      "https://image.qwenlm.ai/generated-images/923c1234-0328-472b-82fc-e6ed435bbcf9/_result.png",
    description:
      "С микро-мельницы Дона Майо в высокогорьях Тарразу, где клейковина остаётся на зерне и сохнет в горном тумане. Белый персик и жасмин на сладости тростникового сахара, шелковистое тело — то, за что любят хани-обработку. В этом цикле всего девять пакетов: закончатся — и до следующего урожая.",
    brew: {
      method: "Воронка · V60",
      ratio: "1 : 16",
      temp: "92 °C",
      time: "2:30",
      grind: "Средне-мелкий",
    },
  },
  {
    id: "ember-decaf",
    name: "Уголёк",
    lot: "EMBER",
    tagline: "Тростниковый декаф, который никто не распознаёт.",
    origin: "Колумбия",
    region: "Каука · Эль Тамбо",
    code: "COL-CAU",
    process: "Декофеинизация E.A.",
    varietal: "Катура · Кастильо",
    altitude: "1 600 м",
    roast: 3,
    roastLabel: "Средняя",
    category: "decaf",
    notes: ["Ириска", "Жареный миндаль", "Цедра апельсина"],
    price: 860,
    weight: "250 г",
    score: 87,
    stock: 27,
    image:
      "https://image.qwenlm.ai/generated-images/6439fd50-edb8-4d66-af31-af2ade795a73/_result.png",
    description:
      "Кофеин выведен этилацетатом из сахарного тростника на колумбийском производстве — сахара остаются в зерне, а характер никуда не уходит. Ириска и жареный миндаль с искрой апельсиновой цедры. На слепой дегустации против наших «кофейных» лотов даже скептики тянулись за второй чашкой. Проблема «чашки в девять вечера» — решена.",
    brew: {
      method: "Воронка или фильтр",
      ratio: "1 : 15",
      temp: "93 °C",
      time: "3:00",
      grind: "Средний",
    },
  },
];

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/f1440196-af19-43c1-a672-36f0a56eb12d/_result.png";

export const FREE_SHIPPING_THRESHOLD = 3000;
export const FLAT_SHIPPING = 390;

export const formatPrice = (n: number): string =>
  `${Math.round(n).toLocaleString("ru-RU")} ₽`;

/** Русские формы множественного числа: pluralRu(5, "пакет", "пакета", "пакетов"). */
export function pluralRu(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const d = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (d === 1) return one;
  if (d >= 2 && d <= 4) return few;
  return many;
}
