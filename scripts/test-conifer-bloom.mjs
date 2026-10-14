import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogSrc = fs.readFileSync(path.join(root, "assets/js/garden-catalog.js"), "utf8");
const pdfSrc = fs.readFileSync(path.join(root, "assets/js/garden-pdf-export.js"), "utf8");
const dataSrc = fs.readFileSync(path.join(root, "assets/js/garden-plants-data.js"), "utf8");

function grab(src, name) {
  const start = src.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Не найдена function ${name}`);
  let depth = 0;
  let started = false;
  for (let index = start; index < src.length; index += 1) {
    const char = src[index];
    if (char === "{") {
      depth += 1;
      started = true;
    } else if (char === "}") {
      depth -= 1;
      if (started && depth === 0) return src.slice(start, index + 1);
    }
  }
  throw new Error(`Не закрыта function ${name}`);
}

const GARDEN_MONTH_LABELS = ["", "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

function boxText(value) {
  return String(value ?? "").replace(/\s*[—–]\s*(\S)?/gu, (match, next) => {
    const spaced = /\s/.test(match);
    const ch = next && /[A-ZА-ЯЁ]/.test(next) ? next.toLowerCase() : (next || "");
    return (spaced ? " - " : "-") + ch;
  });
}

const catalog = new Function(
  "GARDEN_MONTH_LABELS",
  "boxText",
  `${grab(catalogSrc, "nums")}
${grab(catalogSrc, "bloomRange")}
${grab(catalogSrc, "mid")}
${grab(catalogSrc, "bloomSortKey")}
${grab(catalogSrc, "bloomLabel")}
${grab(catalogSrc, "bloomScore")}
${grab(catalogSrc, "bloomRangeVisual")}
return { bloomRange, bloomSortKey, bloomLabel, bloomScore, bloomRangeVisual };`,
)(GARDEN_MONTH_LABELS, boxText);

const pdf = new Function(
  "GARDEN_MONTH_LABELS",
  `${grab(pdfSrc, "bloomLabel")}
return { bloomLabel };`,
)(GARDEN_MONTH_LABELS);

const marker = "const GARDEN_RAW_PLANTS = ";
const plants = JSON.parse(
  dataSrc.slice(dataSrc.indexOf(marker) + marker.length, dataSrc.indexOf("const GARDEN_COLOR_LABELS")).trim().replace(/;\s*$/, ""),
);
const byId = Object.fromEntries(plants.map((plant) => [plant.id, plant]));
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const conifers = [145, 146].map((id) => byId[id]);
check(conifers.every(Boolean), "хвойные 145 и 146 отсутствуют");

for (const plant of conifers) {
  check(plant.bloom === "", `${plant.id}: в данных не должно быть выдуманного периода цветения`);
  const range = catalog.bloomRange(plant.bloom);
  check(range.na === true && range.min == null && range.max == null, `${plant.id}: пустое цветение превратилось в диапазон`);
  check(catalog.bloomLabel(range) === "Цветение не применяется", `${plant.id}: подпись карточки`);
  check(pdf.bloomLabel(range) === "Цветение не применяется", `${plant.id}: подпись PDF`);
  check(!catalog.bloomRangeVisual(range, []).includes("учитываются все"), `${plant.id}: пустое цветение показано как круглый год`);
  const open = catalog.bloomScore([], range);
  check(open.points === 22 && open.ok === true, `${plant.id}: без выбранных месяцев карточка должна оставаться доступной`);
  for (let month = 1; month <= 12; month += 1) {
    const scored = catalog.bloomScore([month], range);
    const total = 55 + 30 + 18 + scored.points;
    check(scored.far === true && scored.na === true && total < 50, `${plant.id}: месяц ${month} не исключает хвойное из цветущих`);
  }
  check(catalog.bloomSortKey(range) === 100, `${plant.id}: сортировка присвоила месяц цветения`);
}

const snowdrop = catalog.bloomRange(byId[140]?.bloom);
check(snowdrop.na === false && snowdrop.min === 3 && snowdrop.max === 4, "подснежник потерял март-апрель");
check(catalog.bloomLabel(snowdrop) === "март - апрель", `подпись подснежника: ${catalog.bloomLabel(snowdrop)}`);
check(catalog.bloomScore([3], snowdrop).ok === true, "подснежник не совпал с мартом");
check(catalog.bloomScore([6], snowdrop).far === true, "подснежник попал в июнь");

const legacy = plants.filter((plant) => plant.id <= 139 && String(plant.bloom || "").trim());
check(legacy.length === 135, `у прежних карточек появилось пустое цветение: ${legacy.length}`);
const legacyBroken = legacy.filter((plant) => {
  const range = catalog.bloomRange(plant.bloom);
  return range.na || range.min < 1 || range.max > 12 || range.min > range.max;
});
check(legacyBroken.length === 0, `прежние периоды цветения сломались: ${legacyBroken.map((plant) => plant.id).join(",")}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PASS: хвойные 145/146 не цветут в фильтре; прежние периоды сохранены (${legacy.length}).`);
