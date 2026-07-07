/**
 * Каталог уличных растений по цвету — в соавторстве с ландшафтным дизайнером Анной Колесовой.
 * sun: шкала 1–5 (1 — тень, 5 — полное солнце).
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
    "id": 2,
    "color": "white",
    "nameRu": "Нарцисс",
    "height": "15–50",
    "bloom": "4–5",
    "sun": "2–5",
    "bloomNote": "конец апреля — начало мая",
    "photo": "assets/plants/2.webp",
    "photoSource": "custom"
  },
  {
    "id": 3,
    "color": "white",
    "nameRu": "Примула",
    "height": "10–25",
    "bloom": "4–4",
    "sun": "4–5",
    "bloomNote": "апрель",
    "photo": "assets/plants/3.webp",
    "photoSource": "custom"
  },
  {
    "id": 4,
    "color": "white",
    "nameRu": "Анемона",
    "height": "15–30",
    "bloom": "4–5",
    "sun": "3–4",
    "bloomNote": "апрель — май",
    "photo": "assets/plants/4.webp",
    "photoSource": "custom"
  },
  {
    "id": 5,
    "color": "white",
    "nameRu": "Пион",
    "height": "60–100",
    "bloom": "6–7",
    "sun": "4–5",
    "bloomNote": "июнь — июль",
    "photo": "assets/plants/5.webp",
    "photoSource": "custom"
  },
  {
    "id": 6,
    "color": "white",
    "nameRu": "Ирис",
    "height": "40–80",
    "bloom": "5–7",
    "sun": "4–5",
    "bloomNote": "май — июль",
    "photo": "assets/plants/6.webp",
    "photoSource": "custom"
  },
  {
    "id": 7,
    "color": "white",
    "nameRu": "Хризантема",
    "height": "35–70",
    "bloom": "8–10",
    "sun": "4–5",
    "bloomNote": "август — осень",
    "photo": "assets/plants/7.webp",
    "photoSource": "custom"
  },
  {
    "id": 8,
    "color": "white",
    "nameRu": "Гладиолус",
    "height": "70–100",
    "bloom": "7–9",
    "sun": "4–5",
    "bloomNote": "июль — сентябрь",
    "photo": "assets/plants/8.webp",
    "photoSource": "custom"
  },
  {
    "id": 9,
    "color": "white",
    "nameRu": "Виола",
    "height": "15–30",
    "bloom": "3–5",
    "sun": "2–5",
    "bloomNote": "середина марта — конец мая",
    "photo": "assets/plants/9.webp",
    "photoSource": "custom"
  },
  {
    "id": 10,
    "color": "white",
    "nameRu": "Дельфиниум",
    "height": "100–200",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/10.webp",
    "photoSource": "custom"
  },
  {
    "id": 11,
    "color": "white",
    "nameRu": "Нивяник",
    "height": "80–100",
    "bloom": "5–8",
    "sun": "4–5",
    "bloomNote": "май и август",
    "photo": "assets/plants/11.webp",
    "photoSource": "custom"
  },
  {
    "id": 12,
    "color": "white",
    "nameRu": "Астильба",
    "height": "100–150",
    "bloom": "6–8",
    "sun": "1–3",
    "bloomNote": "июнь — август",
    "photo": "assets/plants/12.webp",
    "photoSource": "custom"
  },
  {
    "id": 13,
    "color": "white",
    "nameRu": "Флокс шиловидный",
    "height": "20–35",
    "bloom": "6–7",
    "sun": "4–5",
    "bloomNote": "июнь — июль",
    "photo": "assets/plants/13.webp",
    "photoSource": "custom"
  },
  {
    "id": 14,
    "color": "white",
    "nameRu": "Ясколка",
    "height": "10–15",
    "bloom": "6–6",
    "sun": "4–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/14.webp",
    "photoSource": "custom"
  },
  {
    "id": 15,
    "color": "white",
    "nameRu": "Тюльпан",
    "height": "40–60",
    "bloom": "4–5",
    "sun": "4–5",
    "bloomNote": "конец апреля — начало мая",
    "photo": "assets/plants/15.webp",
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
    "id": 17,
    "color": "blue",
    "nameRu": "Эдельвейс альпийский",
    "height": "20–25",
    "bloom": "7–7",
    "sun": "4–5",
    "bloomNote": "июль, белые цветки",
    "photo": "assets/plants/17.webp",
    "photoSource": "custom"
  },
  {
    "id": 18,
    "color": "blue",
    "nameRu": "Очиток зибольда",
    "height": "10–15",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "летом",
    "photo": "assets/plants/18.webp",
    "photoSource": "custom"
  },
  {
    "id": 19,
    "color": "blue",
    "nameRu": "Полынь Стеллера",
    "height": "45–50",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "летом",
    "photo": "assets/plants/19.webp",
    "photoSource": "custom"
  },
  {
    "id": 20,
    "color": "blue",
    "nameRu": "Полынь Шмидта",
    "height": "20–30",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "летом",
    "photo": "assets/plants/20.webp",
    "photoSource": "custom"
  },
  {
    "id": 21,
    "color": "blue",
    "nameRu": "Цинерария приморская",
    "height": "10–50",
    "bloom": "6–8",
    "sun": "4–5",
    "bloomNote": "летом",
    "photo": "assets/plants/21.webp",
    "photoSource": "custom"
  },
  {
    "id": 22,
    "color": "blue",
    "nameRu": "Чистец византийский",
    "height": "30–60",
    "bloom": "5–8",
    "sun": "4–5",
    "bloomNote": "май — август",
    "photo": "assets/plants/22.webp",
    "photoSource": "custom"
  },
  {
    "id": 23,
    "color": "blue",
    "nameRu": "Бруннера крупнолистная",
    "height": "20–30",
    "bloom": "4–5",
    "sun": "2–4",
    "bloomNote": "конец апреля — начало мая",
    "photo": "assets/plants/23.webp",
    "photoSource": "custom"
  },
  {
    "id": 24,
    "color": "blue",
    "nameRu": "Антеннария (кошачья лапка)",
    "height": "10–30",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь, белые цветки",
    "photo": "assets/plants/24.webp",
    "photoSource": "custom"
  },
  {
    "id": 25,
    "color": "blue",
    "nameRu": "Элимус песчаный",
    "height": "60–100",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "летом",
    "photo": "assets/plants/25.webp",
    "photoSource": "custom"
  },
  {
    "id": 26,
    "color": "blue",
    "nameRu": "Синеголовник гигантский",
    "height": "150–180",
    "bloom": "6–9",
    "sun": "4–5",
    "bloomNote": "июнь — конец сентября",
    "photo": "assets/plants/26.webp",
    "photoSource": "custom"
  },
  {
    "id": 27,
    "color": "blue",
    "nameRu": "Хоста белоокаймлённая",
    "height": "40–50",
    "bloom": "7–8",
    "sun": "1–2",
    "bloomNote": "июль — август, фиолетовые цветы",
    "photo": "assets/plants/27.webp",
    "photoSource": "custom"
  },
  {
    "id": 28,
    "color": "blue",
    "nameRu": "Хоста Зибольда",
    "height": "30–40",
    "bloom": "7–7",
    "sun": "1–2",
    "bloomNote": "июль",
    "photo": "assets/plants/28.webp",
    "photoSource": "custom"
  },
  {
    "id": 29,
    "color": "blue",
    "nameRu": "Хоста королевская",
    "height": "60–80",
    "bloom": "8–10",
    "sun": "1–2",
    "bloomNote": "конец лета — заморозки",
    "photo": "assets/plants/29.webp",
    "photoSource": "custom"
  },
  {
    "id": 30,
    "color": "blue",
    "nameRu": "Хоста вздутая",
    "height": "40–50",
    "bloom": "7–8",
    "sun": "1–2",
    "bloomNote": "июль — август, сиреневые цветы",
    "photo": "assets/plants/30.webp",
    "photoSource": "custom"
  },
  {
    "id": 31,
    "color": "blue",
    "nameRu": "Хоста Canadian Blue",
    "height": "30–40",
    "bloom": "7–8",
    "sun": "2–5",
    "bloomNote": "июль — август",
    "photo": "assets/plants/31.webp",
    "photoSource": "custom"
  },
  {
    "id": 32,
    "color": "blue",
    "nameRu": "Хоста подорожная",
    "height": "80–100",
    "bloom": "8–8",
    "sun": "1–3",
    "bloomNote": "август",
    "photo": "assets/plants/32.webp",
    "photoSource": "custom"
  },
  {
    "id": 33,
    "color": "blue",
    "nameRu": "Хоста Форчуна «Патриот»",
    "height": "40–45",
    "bloom": "7–8",
    "sun": "1–4",
    "bloomNote": "середина июля — август, лавандовые цветы",
    "photo": "assets/plants/33.webp",
    "photoSource": "custom"
  },
  {
    "id": 34,
    "color": "purple",
    "nameRu": "Люпин",
    "height": "80–120",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/34.webp",
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
    "id": 36,
    "color": "purple",
    "nameRu": "Астра новоанглийская",
    "height": "60–80",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "сентябрь — октябрь",
    "photo": "assets/plants/36.webp",
    "photoSource": "custom"
  },
  {
    "id": 37,
    "color": "purple",
    "nameRu": "Безвременник",
    "height": "15–20",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "сентябрь — октябрь",
    "photo": "assets/plants/37.webp",
    "photoSource": "custom"
  },
  {
    "id": 38,
    "color": "purple",
    "nameRu": "Астильба «Purple Rain» / «Purple Lance»",
    "height": "100–150",
    "bloom": "7–8",
    "sun": "1–3",
    "bloomNote": "июль — август",
    "photo": "assets/plants/38.webp",
    "photoSource": "custom"
  },
  {
    "id": 40,
    "color": "purple",
    "nameRu": "Дельфиниум",
    "height": "80–120",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/40.webp",
    "photoSource": "custom"
  },
  {
    "id": 41,
    "color": "purple",
    "nameRu": "Колокольчик крапиволистный",
    "height": "70–100",
    "bloom": "6–8",
    "sun": "1–5",
    "bloomNote": "июнь — август",
    "photo": "assets/plants/41.webp",
    "photoSource": "custom"
  },
  {
    "id": 42,
    "color": "purple",
    "nameRu": "Крокус",
    "height": "8–10",
    "bloom": "3–5",
    "sun": "4–5",
    "bloomNote": "март — май",
    "photo": "assets/plants/42.webp",
    "photoSource": "custom"
  },
  {
    "id": 43,
    "color": "purple",
    "nameRu": "Флокс метельчатый",
    "height": "80–90",
    "bloom": "6–8",
    "sun": "2–5",
    "bloomNote": "июнь — август",
    "photo": "assets/plants/43.webp",
    "photoSource": "custom"
  },
  {
    "id": 44,
    "color": "purple",
    "nameRu": "Хризантема",
    "height": "50–70",
    "bloom": "8–9",
    "sun": "4–5",
    "bloomNote": "август — сентябрь",
    "photo": "assets/plants/44.webp",
    "photoSource": "custom"
  },
  {
    "id": 45,
    "color": "purple",
    "nameRu": "Георгина",
    "height": "50–200",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — осень",
    "photo": "assets/plants/45.webp",
    "photoSource": "custom"
  },
  {
    "id": 46,
    "color": "purple",
    "nameRu": "Гладиолус",
    "height": "70–100",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август",
    "photo": "assets/plants/46.webp",
    "photoSource": "custom"
  },
  {
    "id": 47,
    "color": "purple",
    "nameRu": "Аконит",
    "height": "30–40",
    "bloom": "7–10",
    "sun": "2–5",
    "bloomNote": "июль — заморозки",
    "photo": "assets/plants/47.webp",
    "photoSource": "custom"
  },
  {
    "id": 48,
    "color": "purple",
    "nameRu": "Гесперис",
    "height": "50–60",
    "bloom": "5–8",
    "sun": "1–3",
    "bloomNote": "май — август",
    "photo": "assets/plants/48.webp",
    "photoSource": "custom"
  },
  {
    "id": 49,
    "color": "purple",
    "nameRu": "Клематис",
    "height": "100–150",
    "bloom": "5–9",
    "sun": "4–5",
    "bloomNote": "май — сентябрь",
    "photo": "assets/plants/49.webp",
    "photoSource": "custom"
  },
  {
    "id": 50,
    "color": "purple",
    "nameRu": "Гиацинт Royal Novi/ Amethyst/Bismarck",
    "height": "20–30",
    "bloom": "3–4",
    "sun": "4–5",
    "bloomNote": "март — апрель",
    "photo": "assets/plants/50.webp",
    "photoSource": "custom"
  },
  {
    "id": 53,
    "color": "purple",
    "nameRu": "Лилия Purple Lady/ Purple Prince",
    "height": "40–150",
    "bloom": "8–8",
    "sun": "4–5",
    "bloomNote": "август",
    "photo": "assets/plants/53.webp",
    "photoSource": "custom"
  },
  {
    "id": 55,
    "color": "yellow",
    "nameRu": "Анемона (ветреница)",
    "height": "20–30",
    "bloom": "4–11",
    "sun": "2–4",
    "bloomNote": "апрель — ноябрь",
    "photo": "assets/plants/55.webp",
    "photoSource": "custom"
  },
  {
    "id": 56,
    "color": "yellow",
    "nameRu": "Астра осенняя",
    "height": "30–50",
    "bloom": "8–11",
    "sun": "4–5",
    "bloomNote": "конец августа — ноябрь",
    "photo": "assets/plants/56.webp",
    "photoSource": "custom"
  },
  {
    "id": 57,
    "color": "yellow",
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
    "color": "yellow",
    "nameRu": "Василёк многолетний",
    "height": "20–30",
    "bloom": "6–10",
    "sun": "4–5",
    "bloomNote": "июнь — до заморозков"
  },
  {
    "id": 59,
    "color": "yellow",
    "nameRu": "Вероника дубравная",
    "height": "15–45",
    "bloom": "4–7",
    "sun": "2–5",
    "bloomNote": "апрель — июль",
    "photo": "assets/plants/59.webp",
    "photoSource": "custom"
  },
  {
    "id": 60,
    "color": "yellow",
    "nameRu": "Гиацинт",
    "height": "20–30",
    "bloom": "3–5",
    "sun": "4–5",
    "bloomNote": "март — май",
    "photo": "assets/plants/60.webp",
    "photoSource": "custom"
  },
  {
    "id": 61,
    "color": "yellow",
    "nameRu": "Ирис",
    "height": "40–60",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь",
    "photo": "assets/plants/61.webp",
    "photoSource": "custom"
  },
  {
    "id": 62,
    "color": "yellow",
    "nameRu": "Дельфиниум",
    "height": "150–200",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/62.webp",
    "photoSource": "custom"
  },
  {
    "id": 63,
    "color": "yellow",
    "nameRu": "Живучка",
    "height": "10–20",
    "bloom": "5–10",
    "sun": "4–5",
    "bloomNote": "май — поздняя осень",
    "photo": "assets/plants/63.webp",
    "photoSource": "custom"
  },
  {
    "id": 64,
    "color": "yellow",
    "nameRu": "Иссоп",
    "height": "20–50",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — октябрь",
    "photo": "assets/plants/64.webp",
    "photoSource": "custom"
  },
  {
    "id": 65,
    "color": "yellow",
    "nameRu": "Клематис",
    "height": "100–150",
    "bloom": "5–9",
    "sun": "4–5",
    "bloomNote": "май — сентябрь",
    "photo": "assets/plants/65.webp",
    "photoSource": "custom"
  },
  {
    "id": 66,
    "color": "yellow",
    "nameRu": "Люпин",
    "height": "80–120",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь",
    "photo": "assets/plants/66.webp",
    "photoSource": "custom"
  },
  {
    "id": 67,
    "color": "yellow",
    "nameRu": "Лён",
    "height": "40–60",
    "bloom": "6–8",
    "sun": "4–5",
    "bloomNote": "середина июня — середина августа",
    "photo": "assets/plants/67.webp",
    "photoSource": "custom"
  },
  {
    "id": 68,
    "color": "yellow",
    "nameRu": "Мускари",
    "height": "10–30",
    "bloom": "4–4",
    "sun": "2–5",
    "bloomNote": "апрель"
  },
  {
    "id": 69,
    "color": "yellow",
    "nameRu": "Медуница",
    "height": "10–50",
    "bloom": "5–5",
    "sun": "1–3",
    "bloomNote": "середина мая"
  },
  {
    "id": 70,
    "color": "yellow",
    "nameRu": "Незабудка",
    "height": "10–50",
    "bloom": "5–6",
    "sun": "1–3",
    "bloomNote": "май — середина июня"
  },
  {
    "id": 71,
    "color": "yellow",
    "nameRu": "Печеночница",
    "height": "15–25",
    "bloom": "4–5",
    "sun": "1–5",
    "bloomNote": "апрель — май"
  },
  {
    "id": 72,
    "color": "yellow",
    "nameRu": "Пролеска",
    "height": "30–35",
    "bloom": "4–5",
    "sun": "2–5",
    "bloomNote": "конец апреля — май"
  },
  {
    "id": 73,
    "color": "yellow",
    "nameRu": "Платикодон",
    "height": "15–60",
    "bloom": "7–8",
    "sun": "2–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 74,
    "color": "yellow",
    "nameRu": "Синюха голубая",
    "height": "60–80",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 75,
    "color": "yellow",
    "nameRu": "Флокс растопыренный",
    "height": "25–30",
    "bloom": "5–6",
    "sun": "2–5",
    "bloomNote": "середина мая — июнь"
  },
  {
    "id": 76,
    "color": "yellow",
    "nameRu": "Хионодокса Люцилии",
    "height": "10–20",
    "bloom": "3–4",
    "sun": "2–5",
    "bloomNote": "март — апрель"
  },
  {
    "id": 77,
    "color": "yellow",
    "nameRu": "Шалфей луговой",
    "height": "30–60",
    "bloom": "6–9",
    "sun": "4–5",
    "bloomNote": "июнь — сентябрь"
  },
  {
    "id": 78,
    "color": "orange",
    "nameRu": "Бархатцы",
    "height": "20–30",
    "bloom": "5–6",
    "sun": "2–5",
    "bloomNote": "май — июнь"
  },
  {
    "id": 79,
    "color": "orange",
    "nameRu": "Виола",
    "height": "15–30",
    "bloom": "3–5",
    "sun": "2–5",
    "bloomNote": "середина марта — конец мая"
  },
  {
    "id": 80,
    "color": "orange",
    "nameRu": "Тюльпан",
    "height": "40–60",
    "bloom": "4–5",
    "sun": "4–5",
    "bloomNote": "конец апреля — начало мая"
  },
  {
    "id": 81,
    "color": "orange",
    "nameRu": "Нарцисс",
    "height": "15–50",
    "bloom": "4–5",
    "sun": "2–5",
    "bloomNote": "конец апреля — начало мая"
  },
  {
    "id": 82,
    "color": "orange",
    "nameRu": "Жёлтые ромашки",
    "height": "25–100",
    "bloom": "4–10",
    "sun": "4–5",
    "bloomNote": "апрель — конец осени"
  },
  {
    "id": 83,
    "color": "orange",
    "nameRu": "Лилия",
    "height": "40–150",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 84,
    "color": "orange",
    "nameRu": "Хризантема",
    "height": "35–70",
    "bloom": "8–10",
    "sun": "4–5",
    "bloomNote": "август — осень"
  },
  {
    "id": 85,
    "color": "orange",
    "nameRu": "Астра",
    "height": "30–70",
    "bloom": "9–11",
    "sun": "4–5",
    "bloomNote": "сентябрь — ноябрь"
  },
  {
    "id": 86,
    "color": "orange",
    "nameRu": "Гладиолус",
    "height": "80–150",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 87,
    "color": "orange",
    "nameRu": "Ирис",
    "height": "120–180",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь"
  },
  {
    "id": 88,
    "color": "orange",
    "nameRu": "Гиацинт",
    "height": "10–50",
    "bloom": "3–5",
    "sun": "4–5",
    "bloomNote": "март — май"
  },
  {
    "id": 89,
    "color": "orange",
    "nameRu": "Дороникум",
    "height": "30–50",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 90,
    "color": "orange",
    "nameRu": "Пион",
    "height": "60–100",
    "bloom": "6–7",
    "sun": "4–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 91,
    "color": "red-orange",
    "nameRu": "Бархатцы",
    "height": "20–30",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь"
  },
  {
    "id": 92,
    "color": "red-orange",
    "nameRu": "Календула",
    "height": "15–30",
    "bloom": "6–9",
    "sun": "4–5",
    "bloomNote": "июнь — сентябрь"
  },
  {
    "id": 93,
    "color": "red-orange",
    "nameRu": "Эхинацея",
    "height": "100–150",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — октябрь"
  },
  {
    "id": 94,
    "color": "red-orange",
    "nameRu": "Настурция",
    "height": "20–30",
    "bloom": "7–8",
    "sun": "2–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 95,
    "color": "red-orange",
    "nameRu": "Гайлардия",
    "height": "35–75",
    "bloom": "6–10",
    "sun": "4–5",
    "bloomNote": "июнь — до заморозков"
  },
  {
    "id": 96,
    "color": "red-orange",
    "nameRu": "Тюльпан",
    "height": "40–60",
    "bloom": "4–5",
    "sun": "4–5",
    "bloomNote": "конец апреля — начало мая"
  },
  {
    "id": 97,
    "color": "red-orange",
    "nameRu": "Хризантема",
    "height": "35–70",
    "bloom": "8–10",
    "sun": "4–5",
    "bloomNote": "август — осень"
  },
  {
    "id": 98,
    "color": "red-orange",
    "nameRu": "Рудбекия",
    "height": "50–60",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — до заморозков"
  },
  {
    "id": 99,
    "color": "red-orange",
    "nameRu": "Роза",
    "height": "20–100",
    "bloom": "5–7",
    "sun": "4–5",
    "bloomNote": "май — июль"
  },
  {
    "id": 100,
    "color": "red",
    "nameRu": "Примула весенняя",
    "height": "15–30",
    "bloom": "4–6",
    "sun": "2–5",
    "bloomNote": "апрель — июнь"
  },
  {
    "id": 101,
    "color": "red",
    "nameRu": "Амарант",
    "height": "60–80",
    "bloom": "6–10",
    "sun": "4–5",
    "bloomNote": "июнь — до морозов"
  },
  {
    "id": 102,
    "color": "red",
    "nameRu": "Астильба",
    "height": "50–150",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 103,
    "color": "red",
    "nameRu": "Лапчатка кроваво-красная",
    "height": "35–45",
    "bloom": "6–7",
    "sun": "1–3",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 104,
    "color": "red",
    "nameRu": "Бегония",
    "height": "25–40",
    "bloom": "6–8",
    "sun": "1–3",
    "bloomNote": "июнь — август"
  },
  {
    "id": 105,
    "color": "red",
    "nameRu": "Мак восточный",
    "height": "80–100",
    "bloom": "6–6",
    "sun": "4–5",
    "bloomNote": "июнь"
  },
  {
    "id": 106,
    "color": "red",
    "nameRu": "Пиретрум красный",
    "height": "50–70",
    "bloom": "6–8",
    "sun": "2–5",
    "bloomNote": "июнь — август"
  },
  {
    "id": 107,
    "color": "red",
    "nameRu": "Гелениум осенний",
    "height": "60–90",
    "bloom": "7–8",
    "sun": "2–5",
    "bloomNote": "конец июля — август"
  },
  {
    "id": 108,
    "color": "red",
    "nameRu": "Хризантема корейская",
    "height": "60–70",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "сентябрь — октябрь"
  },
  {
    "id": 109,
    "color": "red",
    "nameRu": "Адонис изысканный",
    "height": "20–30",
    "bloom": "8–9",
    "sun": "4–5",
    "bloomNote": "август — сентябрь"
  },
  {
    "id": 110,
    "color": "red",
    "nameRu": "Лихнис халцедонский",
    "height": "80–100",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 111,
    "color": "red",
    "nameRu": "Гейхера кроваво-красная",
    "height": "50–60",
    "bloom": "6–8",
    "sun": "2–5",
    "bloomNote": "июнь — август"
  },
  {
    "id": 112,
    "color": "red",
    "nameRu": "Хризантема",
    "height": "35–70",
    "bloom": "8–9",
    "sun": "4–5",
    "bloomNote": "август — сентябрь"
  },
  {
    "id": 113,
    "color": "red",
    "nameRu": "Флокс метельчатый",
    "height": "60–120",
    "bloom": "6–9",
    "sun": "2–5",
    "bloomNote": "июнь — сентябрь"
  },
  {
    "id": 114,
    "color": "red",
    "nameRu": "Роза",
    "height": "20–100",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь"
  },
  {
    "id": 115,
    "color": "pink",
    "nameRu": "Бадан толстолистный",
    "height": "25–40",
    "bloom": "4–5",
    "sun": "1–5",
    "bloomNote": "конец апреля — май"
  },
  {
    "id": 116,
    "color": "pink",
    "nameRu": "Дицентра великолепная",
    "height": "30–100",
    "bloom": "5–5",
    "sun": "2–5",
    "bloomNote": "май"
  },
  {
    "id": 117,
    "color": "pink",
    "nameRu": "Обриета культурная",
    "height": "10–15",
    "bloom": "5–5",
    "sun": "4–5",
    "bloomNote": "май"
  },
  {
    "id": 118,
    "color": "pink",
    "nameRu": "Примула обыкновенная",
    "height": "10–25",
    "bloom": "4–4",
    "sun": "4–5",
    "bloomNote": "апрель"
  },
  {
    "id": 119,
    "color": "pink",
    "nameRu": "Флокс шиловидный",
    "height": "15–20",
    "bloom": "5–6",
    "sun": "2–5",
    "bloomNote": "середина мая — конец июня"
  },
  {
    "id": 120,
    "color": "pink",
    "nameRu": "Астра альпийская",
    "height": "18–85",
    "bloom": "6–6",
    "sun": "4–5",
    "bloomNote": "июнь"
  },
  {
    "id": 121,
    "color": "pink",
    "nameRu": "Астра новоанглийская",
    "height": "70–150",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "сентябрь — октябрь"
  },
  {
    "id": 122,
    "color": "pink",
    "nameRu": "Астра новобельгийская",
    "height": "100–120",
    "bloom": "9–9",
    "sun": "4–5",
    "bloomNote": "сентябрь"
  },
  {
    "id": 123,
    "color": "pink",
    "nameRu": "Гвоздика перистая",
    "height": "35–40",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь"
  },
  {
    "id": 124,
    "color": "pink",
    "nameRu": "Герань кроваво-красная",
    "height": "10–50",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 125,
    "color": "pink",
    "nameRu": "Очиток ложный",
    "height": "20–25",
    "bloom": "7–7",
    "sun": "1–3",
    "bloomNote": "июль"
  },
  {
    "id": 126,
    "color": "pink",
    "nameRu": "Пиретрум розовый",
    "height": "55–60",
    "bloom": "6–6",
    "sun": "2–5",
    "bloomNote": "июнь"
  },
  {
    "id": 127,
    "color": "pink",
    "nameRu": "Астра кустарниковая",
    "height": "30–40",
    "bloom": "9–9",
    "sun": "4–5",
    "bloomNote": "сентябрь"
  },
  {
    "id": 128,
    "color": "pink",
    "nameRu": "Безвременник осенний",
    "height": "35–40",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "конец сентября — октябрь"
  },
  {
    "id": 129,
    "color": "pink",
    "nameRu": "Хризантема корейская",
    "height": "40–100",
    "bloom": "9–10",
    "sun": "4–5",
    "bloomNote": "сентябрь — до заморозков"
  },
  {
    "id": 130,
    "color": "pink",
    "nameRu": "Анемона японская",
    "height": "10–20",
    "bloom": "5–6",
    "sun": "1–2",
    "bloomNote": "май — начало июня"
  },
  {
    "id": 131,
    "color": "pink",
    "nameRu": "Тимьян ползучий",
    "height": "10–15",
    "bloom": "8–8",
    "sun": "4–5",
    "bloomNote": "август"
  },
  {
    "id": 132,
    "color": "pink",
    "nameRu": "Аквилегия",
    "height": "50–100",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 133,
    "color": "pink",
    "nameRu": "Армерия",
    "height": "50–60",
    "bloom": "5–6",
    "sun": "4–5",
    "bloomNote": "май — июнь"
  },
  {
    "id": 134,
    "color": "pink",
    "nameRu": "Гвоздика",
    "height": "10–50",
    "bloom": "6–7",
    "sun": "2–5",
    "bloomNote": "июнь — июль"
  },
  {
    "id": 135,
    "color": "pink",
    "nameRu": "Георгина",
    "height": "50–200",
    "bloom": "7–10",
    "sun": "4–5",
    "bloomNote": "июль — осень"
  },
  {
    "id": 136,
    "color": "pink",
    "nameRu": "Герань (пеларгония)",
    "height": "30–70",
    "bloom": "6–8",
    "sun": "4–5",
    "bloomNote": "июнь — август"
  },
  {
    "id": 137,
    "color": "pink",
    "nameRu": "Гладиолус",
    "height": "80–150",
    "bloom": "7–8",
    "sun": "4–5",
    "bloomNote": "июль — август"
  },
  {
    "id": 138,
    "color": "pink",
    "nameRu": "Маргаритка",
    "height": "10–30",
    "bloom": "4–11",
    "sun": "2–5",
    "bloomNote": "апрель — ноябрь"
  },
  {
    "id": 139,
    "color": "pink",
    "nameRu": "Пион",
    "height": "60–100",
    "bloom": "6–7",
    "sun": "4–5",
    "bloomNote": "июнь — июль"
  }
];

const GARDEN_COLOR_LABELS = {
  white: "Белые",
  blue: "Голубые / сине-зелёные",
  purple: "Фиолетовые",
  yellow: "Жёлтые",
  orange: "Оранжевые",
  "red-orange": "Красно-оранжевые",
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
