/**
 * Демо-каталог уличных растений (12 позиций) — для презентации клиентам.
 * Полный каталог в этот файл не включается.
 */
const GARDEN_RAW_PLANTS = [
  {
    "id": 1,
    "color": "white",
    "nameRu": "Ландыши",
    "height": "15–30",
    "bloom": "5–5",
    "sun": "2–5",
    "bloomNote": "май",
    "photo": "assets/plants/1.webp",
    "photoSource": "custom"
  },
  {
    "id": 16,
    "color": "blue",
    "nameRu": "Овсяница голубая",
    "height": "30–40",
    "bloom": "6–7",
    "sun": "4–5",
    "bloomNote": "летом декоративна листвой",
    "photo": "assets/plants/16.webp",
    "photoSource": "custom"
  },
  {
    "id": 35,
    "color": "purple",
    "nameRu": "Ирис германский",
    "height": "60–100",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь",
    "photo": "assets/plants/35.webp",
    "photoSource": "custom"
  },
  {
    "id": 57,
    "color": "sky",
    "nameRu": "Барвинок малый",
    "height": "20–40",
    "bloom": "4–10",
    "sun": "1–2",
    "bloomNote": "апрель — до холодов",
    "photo": "assets/plants/57.webp",
    "photoSource": "custom"
  },
  {
    "id": 58,
    "color": "sky",
    "nameRu": "Василёк многолетний",
    "height": "20–30",
    "bloom": "6–10",
    "sun": "4–5",
    "bloomNote": "июнь — до заморозков",
    "photo": "assets/plants/58.webp",
    "photoSource": "custom"
  },
  {
    "id": 80,
    "color": "yellow",
    "nameRu": "Тюльпан",
    "height": "40–60",
    "bloom": "4–5",
    "sun": "4–5",
    "bloomNote": "конец апреля — начало мая",
    "photo": "assets/plants/80.webp",
    "photoSource": "custom"
  },
  {
    "id": 93,
    "color": "orange",
    "nameRu": "Эхинацея",
    "height": "100–150",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — октябрь",
    "photo": "assets/plants/93.webp",
    "photoSource": "custom"
  },
  {
    "id": 94,
    "color": "orange",
    "nameRu": "Настурция",
    "height": "20–30",
    "bloom": "7–8",
    "sun": "2–5",
    "bloomNote": "июль — август",
    "photo": "assets/plants/94.webp",
    "photoSource": "custom"
  },
  {
    "id": 102,
    "color": "red",
    "nameRu": "Астильба",
    "height": "50–150",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август",
    "photo": "assets/plants/102.webp",
    "photoSource": "custom"
  },
  {
    "id": 103,
    "color": "red",
    "nameRu": "Лапчатка кроваво-красная",
    "height": "35–45",
    "bloom": "6–7",
    "sun": "1–3",
    "bloomNote": "июнь — июль",
    "photo": "assets/plants/103.webp",
    "photoSource": "custom"
  },
  {
    "id": 115,
    "color": "pink",
    "nameRu": "Бадан толстолистный",
    "height": "25–40",
    "bloom": "4–5",
    "sun": "1–5",
    "bloomNote": "конец апреля — май",
    "photo": "assets/plants/115.webp",
    "photoSource": "custom"
  },
  {
    "id": 130,
    "color": "pink",
    "nameRu": "Анемона японская",
    "height": "80–100",
    "bloom": "8–9",
    "sun": "1–2",
    "bloomNote": "август — сентябрь",
    "photo": "assets/plants/130.webp",
    "photoSource": "custom"
  }
];

const GARDEN_COLOR_LABELS = {
  white: "Белые",
  blue: "Сине-зелёные (листва)",
  sky: "Синие / голубые",
  purple: "Фиолетовые",
  yellow: "Жёлтые",
  orange: "Оранжевые",
  red: "Красные",
  pink: "Розовые"
};

const GARDEN_SUN_LABELS = {
  1: "Тень",
  2: "Теневыносливое",
  3: "Полутень",
  4: "Светолюбивое",
  5: "Полное солнце"
};

const GARDEN_MONTH_LABELS = [
  "", "январь", "февраль", "март", "апрель", "май", "июнь",
  "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
];
