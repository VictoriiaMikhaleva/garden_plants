import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const search = require(path.join(root, "assets/js/plant-search.js"));

const dataSrc = fs.readFileSync(path.join(root, "assets/js/garden-plants-data.js"), "utf8");
const plants = JSON.parse(
  dataSrc
    .slice(dataSrc.indexOf("const GARDEN_RAW_PLANTS = ") + "const GARDEN_RAW_PLANTS = ".length, dataSrc.indexOf("const GARDEN_COLOR_LABELS"))
    .trim()
    .replace(/;\s*$/, "")
);
const catalogSrc = fs.readFileSync(path.join(root, "assets/js/garden-catalog.js"), "utf8");
const htmlSrc = fs.readFileSync(path.join(root, "garden_catalog.html"), "utf8");

const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

function idsOf(query) {
  return search.search(plants, query, search.GARDEN_ALIASES).map((plant) => plant.id);
}

function expectIds(query, expected, extraMessage = "") {
  const actual = idsOf(query);
  const extra = extraMessage ? ` ${extraMessage}` : "";
  check(actual.length === new Set(actual).size, `"${query}": дубликаты${extra}`);
  const missing = expected.filter((id) => !actual.includes(id));
  const unexpected = actual.filter((id) => !expected.includes(id));
  check(!missing.length, `"${query}": нет ID ${missing.join(",")}${extra}; факт [${actual.join(",")}]`);
  check(!unexpected.length, `"${query}": лишние ID ${unexpected.join(",")}${extra}; факт [${actual.join(",")}]`);
}

function expectIncludes(query, expected) {
  const actual = idsOf(query);
  const missing = expected.filter((id) => !actual.includes(id));
  check(!missing.length, `"${query}": нет ожидаемых ID ${missing.join(",")}; факт [${actual.join(",")}]`);
}

function significantTokens(plant) {
  const skip = new Set(["x", "and", "the"]);
  return search.tokenize(`${plant.nameRu} ${plant.nameLat || ""}`).filter((token) => token.length >= 3 && !skip.has(token));
}

check(plants.length === 184, `садовых растений ${plants.length}, ожидалось 184`);
check(new Set(plants.map((plant) => plant.id)).size === 184, "ID садового каталога не уникальны");
check(htmlSrc.includes("assets/js/plant-search.js"), "garden_catalog.html не подключает plant-search.js");
check(catalogSrc.includes("searchApi.matches(p, f.q, searchApi.GARDEN_ALIASES)"), "garden-catalog.js не использует PlantSearch");
check(catalogSrc.includes("if (!browseMode) arr = arr.filter((p) => p.score >= 50);"), "фильтр score>=50 изменён");

const spruce = plants.filter((plant) => search.latinGenus(plant.nameLat) === "picea");
check(spruce.map((plant) => plant.id).join(",") === "146,174,176", `ели в базе: ${spruce.map((p) => `${p.id}:${p.nameRu}`).join(" | ")}`);
check(spruce.every((plant) => /ель/i.test(plant.nameRu)), "у Picea нет слова «ель» в русском названии");
check(!plants.some((plant) => /игольчат/i.test(`${plant.nameRu} ${plant.nameLat || ""}`)), "в базе неожиданно появилось слово «игольчатая»");

const spruceIds = [146, 174, 176];
const falseFriends = [10, 17, 40, 62];
for (const query of ["ель", "Ель", "  ель  ", "ёлка", "елка", "Picea", "picea"]) {
  expectIds(query, spruceIds, "регрессия ели");
  const actual = idsOf(query);
  check(falseFriends.every((id) => !actual.includes(id)), `"${query}" не должен находить дельфиниум/эдельвейс`);
}

expectIds("колючая", [146]);
expectIds("игольчатая", []);
expectIncludes("канадская", [174]);
expectIncludes("сербская", [176]);
expectIncludes("Glauca Globosa", [146]);
expectIncludes("Nana", [176]);

expectIds("сосна", plants.filter((plant) => search.latinGenus(plant.nameLat) === "pinus").map((plant) => plant.id));
expectIds("пихта", plants.filter((plant) => search.latinGenus(plant.nameLat) === "abies").map((plant) => plant.id));
expectIds("можжевельник", plants.filter((plant) => search.latinGenus(plant.nameLat) === "juniperus").map((plant) => plant.id));
const hostaIds = plants.filter((plant) => search.tokenize(plant.nameRu)[0] === "хоста" || search.latinGenus(plant.nameLat) === "hosta").map((plant) => plant.id);
expectIds("хоста", hostaIds);
expectIds("Hosta", hostaIds);

check(idsOf("туя").length === 0, "туя: в базе нет Thuja, выдача должна быть пустой");
check(idsOf("клён").length === 0 && idsOf("клен").length === 0, "клён: в базе нет Acer");
check(idsOf("берёза").length === 0 && idsOf("береза").length === 0, "берёза: в базе нет Betula");

expectIncludes("белоокаймленная", [27]);
expectIncludes("белоокаймлённая", [27]);
expectIncludes("лен", plants.filter((plant) => search.tokenize(plant.nameRu)[0] === "лен").map((plant) => plant.id));
expectIncludes("ель колючая", [146]);
expectIncludes("ель  колючая", [146]);

const colorSamples = {
  white: 140,
  blue: 146,
  sky: 148,
  purple: 151,
  yellow: 155,
  orange: 159,
  red: 165,
  pink: 168
};
for (const [color, id] of Object.entries(colorSamples)) {
  const plant = plants.find((item) => item.id === id);
  check(plant && plant.color === color, `образец цвета ${color} id=${id}`);
  expectIncludes(plant.nameRu, [id]);
  if (plant.nameLat) expectIncludes(plant.nameLat, [id]);
}

const groups = [
  { label: "хвойные", ids: [145, 146, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178] },
  { label: "кустарники", ids: [141, 142, 143, 155, 156, 167, 168] },
  { label: "злаки", ids: [179, 180, 181, 182, 183, 184, 185, 186, 187, 188] },
  { label: "многолетники", ids: [27, 115, 151, 154] }
];
for (const group of groups) {
  for (const id of group.ids) {
    const plant = plants.find((item) => item.id === id);
    check(plant, `${group.label}: нет id ${id}`);
    expectIncludes(plant.nameRu, [id]);
  }
}

const aliasCases = [
  ["елка", spruceIds],
  ["кипарисовик", [175]],
  ["спирея", [142, 168]],
  ["таволга", [142, 168]],
  ["жасмин садовый", [141]],
  ["чубушник", [141]],
  ["гортензия", [143]],
  ["подснежник", [140]]
];
for (const [query, expected] of aliasCases) expectIds(query, expected);

for (const plant of plants) {
  const found = idsOf(plant.nameRu);
  check(found.includes(plant.id), `полное имя «${plant.nameRu}» не нашло id ${plant.id}; факт [${found.join(",")}]`);
  check(found.length === new Set(found).size, `полное имя «${plant.nameRu}»: дубликаты`);
  if (plant.nameLat) {
    const latinFound = idsOf(plant.nameLat);
    check(latinFound.includes(plant.id), `латынь «${plant.nameLat}» не нашла id ${plant.id}; факт [${latinFound.join(",")}]`);
  }
  for (const token of significantTokens(plant)) {
    const partFound = idsOf(token);
    check(partFound.includes(plant.id), `часть «${token}» не нашла id ${plant.id} (${plant.nameRu})`);
    if (token.length >= 5) {
      const prefix = token.slice(0, Math.max(4, token.length - 1));
      const prefixFound = idsOf(prefix);
      check(prefixFound.includes(plant.id), `префикс «${prefix}» не нашёл id ${plant.id} (${plant.nameRu})`);
    }
  }
}

check(idsOf("").length === 184, "пустой запрос должен возвращать весь каталог");
check(idsOf("   ").length === 184, "пробельный запрос должен возвращать весь каталог");

const elAndMoisture = plants.filter((plant) => spruceIds.includes(plant.id) && plant.soilMoistureMin);
check(elAndMoisture.length === 3, "у елей нет данных влажности");
const zone5 = spruce.filter((plant) => plant.hardinessZoneMin <= 5 && plant.hardinessZoneMax >= 5).map((plant) => plant.id);
check(zone5.join(",") === "146,174,176", `ель + USDA 5: ${zone5.join(",")}`);
const openWinter = spruce.filter((plant) => plant.russiaWintering === "Зимует в открытом грунте").map((plant) => plant.id);
check(openWinter.includes(146) && openWinter.includes(174), "ель + зимовка открытый грунт");

if (failures.length) {
  console.error(`FAIL garden search: ${failures.length}`);
  failures.slice(0, 40).forEach((item) => console.error(" -", item));
  if (failures.length > 40) console.error(` ... ещё ${failures.length - 40}`);
  process.exit(1);
}

console.log(`PASS garden search: 184 карточки, регрессия ели ${spruceIds.join(",")}`);
