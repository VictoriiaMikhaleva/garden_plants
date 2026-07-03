/**
 * Нормализует ваши исходники → assets/plants/{id}.webp и прописывает photo в каталог.
 *
 * Положите файлы в assets/plants/raw/ как 1.png, 2.jpg, 15.webp …
 *
 * npm run photos:normalize
 * npm run photos:normalize -- --ids 1,2,3
 */
const fs = require("fs");
const path = require("path");
const { normalizeGardenPhoto } = require("./photo-normalize-lib");

const ROOT = path.join(__dirname, "..");
const DATA_JS = path.join(ROOT, "assets", "js", "garden-plants-data.js");
const RAW_DIR = path.join(ROOT, "assets", "plants", "raw");
const OUT_DIR = path.join(ROOT, "assets", "plants");

function loadPlants() {
  const code = fs.readFileSync(DATA_JS, "utf8");
  const m = code.match(/const GARDEN_RAW_PLANTS = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error("GARDEN_RAW_PLANTS not found");
  return { plants: new Function(`return ${m[1]}`)(), marker: m[0] };
}

function writePlants(plants) {
  let code = fs.readFileSync(DATA_JS, "utf8");
  code = code.replace(/const GARDEN_RAW_PLANTS = \[[\s\S]*?\n\];/, `const GARDEN_RAW_PLANTS = ${JSON.stringify(plants, null, 2)};`);
  fs.writeFileSync(DATA_JS, code, "utf8");
}

function findRaw(id) {
  for (const ext of [".png", ".jpg", ".jpeg", ".webp", ".PNG", ".JPG", ".JPEG", ".WEBP"]) {
    const p = path.join(RAW_DIR, `${id}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { ids: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--ids") opts.ids = new Set(String(args[++i]).split(",").map(Number));
  }
  return opts;
}

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { plants } = loadPlants();
  let list = plants;
  if (opts.ids) list = plants.filter((p) => opts.ids.has(p.id));

  let done = 0;
  let missing = 0;

  for (const plant of list) {
    const raw = findRaw(plant.id);
    if (!raw) {
      console.log(`${plant.id} ${plant.nameRu} — нет файла в raw/`);
      missing++;
      continue;
    }
    const buf = fs.readFileSync(raw);
    const outPath = path.join(OUT_DIR, `${plant.id}.webp`);
    await (await normalizeGardenPhoto(buf)).toFile(outPath);
    plant.photo = `assets/plants/${plant.id}.webp`;
    plant.photoSource = "custom";
    console.log(`${plant.id} ${plant.nameRu} — ok`);
    done++;
  }

  writePlants(plants);
  console.log(`\nГотово: ${done} нормализовано, ${missing} без исходника в raw/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
