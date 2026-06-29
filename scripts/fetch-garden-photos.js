/**
 * Подбор фото уличных растений с Wikimedia Commons + нормализация (белый фон 4:3).
 *
 * npm run photos:commons
 * npm run photos:commons -- --limit 10
 * npm run photos:commons -- --ids 1,2,3
 * npm run photos:commons -- --dry-run
 */
const fs = require("fs");
const path = require("path");
const { normalizeToWhiteCanvas } = require("./photo-normalize-lib");
const LATIN_BY_ID = require("./garden-latin-map");

const ROOT = path.join(__dirname, "..");
const DATA_JS = path.join(ROOT, "assets", "js", "garden-plants-data.js");
const OUT_DIR = path.join(ROOT, "assets", "plants");
const ATTR_PATH = path.join(OUT_DIR, "attribution.json");
const API = "https://commons.wikimedia.org/w/api.php";
const DELAY_MS = 3200;
const POST_OK_DELAY_MS = 1800;
const DOWNLOAD_RETRIES = 6;
const API_RETRIES = 5;

const BAD_TITLE =
  /icon|logo|map|chart|diagram|stamp|coin|herbarium|seed\s+only|cross.?section|anatomy|svg|\bbark\b|\bствол\b|distribution|range\s+map/i;

const COLOR_QUERY = {
  white: "white flower",
  blue: "blue flower",
  purple: "purple flower",
  yellow: "yellow flower",
  orange: "orange flower",
  "red-orange": "orange red flower",
  red: "red flower",
  pink: "pink flower"
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function latinQuery(nameLat) {
  const clean = String(nameLat || "")
    .replace(/['"«»]/g, "")
    .replace(/\s+cv\.?\s*.*/i, "")
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
  return parts[0] || clean;
}

function speciesKey(nameLat) {
  return latinQuery(nameLat).toLowerCase().replace(/\s+/g, "-");
}

function isAllowedLicense(ii) {
  const em = ii.extmetadata || {};
  const short = String(em.LicenseShortName?.value || em.License?.value || "").toLowerCase();
  const url = String(em.LicenseUrl?.value || "").toLowerCase();
  if (short.includes("public domain") || url.includes("publicdomain")) return true;
  if (short.includes("cc-by") || short.includes("cc by") || short.includes("cc-by-sa") || url.includes("creativecommons.org"))
    return true;
  return false;
}

function scoreCandidate(page, ii, genus = "") {
  if (!ii?.url || !ii.width || !ii.height) return -1;
  if (!isAllowedLicense(ii)) return -1;
  if (BAD_TITLE.test(page.title)) return -1;
  const mime = String(ii.mime || "");
  if (!/^image\/(jpeg|png|webp|gif)/i.test(mime)) return -1;
  if (ii.width < 480 || ii.height < 480) return -1;

  let score = Math.min(ii.width, ii.height);
  const ar = ii.width / ii.height;
  if (ar >= 0.55 && ar <= 1.8) score += 500;
  const t = page.title.toLowerCase();
  const g = genus.toLowerCase();
  if (g && t.includes(g.split(" ")[0])) score += 450;
  if (/garden|perennial|flower|plant|habitat|meadow|border|bed/.test(t)) score += 350;
  if (/white\s+background|isolated|studio/.test(t)) score += 400;
  if (/whole\s+plant|habit|inflorescence/.test(t)) score += 200;
  if (/leaves|foliage/.test(t) && !/flower/.test(t)) score += 80;
  if (/flower|bloom/.test(t)) score += 180;
  if (/close.?up|macro/.test(t) && !/plant/.test(t)) score -= 80;
  if (/bouquet|flower\s+bed|flower\s+bush/.test(t) && g && !t.includes(g.split(" ")[0])) score -= 350;
  return score;
}

async function commonsSearch(query, genus = "") {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: query,
    gsrlimit: "15",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1400"
  });
  let lastErr;
  for (let attempt = 0; attempt < API_RETRIES; attempt++) {
    if (attempt) await sleep(3000 * attempt);
    const res = await fetch(`${API}?${params}`);
    if (res.status === 429) {
      lastErr = new Error(`Commons HTTP 429`);
      continue;
    }
    if (!res.ok) throw new Error(`Commons HTTP ${res.status}`);
    const data = await res.json();
    const pages = data.query?.pages || {};
    let best = null;
    let bestScore = -1;
    for (const page of Object.values(pages)) {
      const ii = page.imageinfo?.[0];
      const s = scoreCandidate(page, ii, genus);
      if (s > bestScore) {
        bestScore = s;
        best = { page, ii, score: s };
      }
    }
    return best;
  }
  throw lastErr;
}

async function searchWithFallbacks(plant, nameLat) {
  const genus = latinQuery(nameLat);
  const colorHint = COLOR_QUERY[plant.color] || "flower";
  const queries = [
    `${genus} ${colorHint} garden`,
    `${genus} flower garden`,
    `${genus} perennial flower`,
    `${genus} plant`
  ];
  for (const q of queries) {
    const hit = await commonsSearch(q, genus);
    if (hit) return { hit, query: q };
    await sleep(500);
  }
  return null;
}

async function downloadImage(url) {
  const headers = { "User-Agent": "GardenPlantsCatalog/1.0 (educational; local-dev)" };
  let lastErr;
  for (let attempt = 0; attempt < DOWNLOAD_RETRIES; attempt++) {
    if (attempt) await sleep(8000 * attempt);
    const res = await fetch(url, { headers });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    lastErr = new Error(`Download ${res.status}`);
    if (res.status === 429) {
      await sleep(15000 + attempt * 10000);
      continue;
    }
    throw lastErr;
  }
  throw lastErr;
}

function loadPlants() {
  const code = fs.readFileSync(DATA_JS, "utf8");
  const m = code.match(/const GARDEN_RAW_PLANTS = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error("GARDEN_RAW_PLANTS not found");
  return new Function(`return ${m[1]}`)();
}

function writePlantsWithPhotos(photoById) {
  const all = loadPlants().map((p) => (photoById.has(p.id) ? { ...p, photo: photoById.get(p.id) } : p));
  let code = fs.readFileSync(DATA_JS, "utf8");
  code = code.replace(/const GARDEN_RAW_PLANTS = \[[\s\S]*?\];/, `const GARDEN_RAW_PLANTS = ${JSON.stringify(all, null, 2)};`);
  fs.writeFileSync(DATA_JS, code, "utf8");
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { dryRun: false, limit: 0, ids: null, skipExisting: true };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") opts.dryRun = true;
    else if (args[i] === "--limit") opts.limit = Number(args[++i]) || 0;
    else if (args[i] === "--ids") opts.ids = new Set(String(args[++i]).split(",").map(Number));
    else if (args[i] === "--force") opts.skipExisting = false;
  }
  return opts;
}

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let plants = loadPlants();
  if (opts.ids) plants = plants.filter((p) => opts.ids.has(p.id));
  if (opts.limit > 0) plants = plants.slice(0, opts.limit);

  let attr = {};
  if (fs.existsSync(ATTR_PATH)) {
    try {
      attr = JSON.parse(fs.readFileSync(ATTR_PATH, "utf8"));
    } catch {
      attr = {};
    }
  }

  const speciesCache = {};
  const photoById = new Map();
  let ok = 0;
  let fail = 0;
  let reused = 0;

  for (const plant of plants) {
    const nameLat = LATIN_BY_ID[plant.id];
    if (!nameLat) {
      console.log(`${plant.id} ${plant.nameRu}… нет латинского имени`);
      fail++;
      continue;
    }

    const outPath = path.join(OUT_DIR, `${plant.id}.webp`);
    const spKey = speciesKey(nameLat);

    if (opts.skipExisting && fs.existsSync(outPath) && !opts.dryRun) {
      plant.photo = `assets/plants/${plant.id}.webp`;
      photoById.set(plant.id, plant.photo);
      console.log(`${plant.id} ${plant.nameRu}… уже есть`);
      ok++;
      continue;
    }

    if (!opts.dryRun && speciesCache[spKey]?.path && fs.existsSync(speciesCache[spKey].path)) {
      fs.copyFileSync(speciesCache[spKey].path, outPath);
      plant.photo = `assets/plants/${plant.id}.webp`;
      photoById.set(plant.id, plant.photo);
      const srcAttr = attr[String(speciesCache[spKey].attrId)];
      if (srcAttr) attr[String(plant.id)] = { ...srcAttr, reusedFromSpecies: spKey };
      console.log(`${plant.id} ${plant.nameRu}… копия (${spKey})`);
      reused++;
      ok++;
      continue;
    }

    process.stdout.write(`${plant.id} ${plant.nameRu}… `);
    await sleep(DELAY_MS);

    try {
      const result = await searchWithFallbacks(plant, nameLat);
      if (!result) {
        console.log("не найдено");
        fail++;
        continue;
      }
      const { page, ii } = result.hit;
      const license = ii.extmetadata?.LicenseShortName?.value || ii.extmetadata?.License?.value || "CC";
      const artist = (ii.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, "");

      if (opts.dryRun) {
        console.log(`→ ${page.title.slice(0, 55)}… [${result.query}]`);
        ok++;
        continue;
      }

      const imgUrl = ii.thumburl || ii.url;
      await sleep(300);
      const buf = await downloadImage(imgUrl);
      await (await normalizeToWhiteCanvas(buf)).toFile(outPath);

      plant.photo = `assets/plants/${plant.id}.webp`;
      photoById.set(plant.id, plant.photo);
      speciesCache[spKey] = { path: outPath, attrId: plant.id };

      attr[String(plant.id)] = {
        file: page.title,
        sourceUrl: ii.descriptionurl || ii.url,
        imageUrl: ii.url,
        license: license.replace(/\s+/g, " ").trim(),
        artist: artist.replace(/\s+/g, " ").trim().slice(0, 200),
        credit: `Wikimedia Commons — ${page.title}`,
        searchQuery: result.query
      };
      console.log("ok");
      ok++;
      await sleep(POST_OK_DELAY_MS);
    } catch (e) {
      console.log("ошибка:", e.message);
      fail++;
    }
  }

  if (!opts.dryRun) {
    writePlantsWithPhotos(photoById);
    fs.writeFileSync(ATTR_PATH, JSON.stringify(attr, null, 2), "utf8");
  }

  console.log(`\nГотово: ${ok} успешно (${reused} переиспользовано), ${fail} без фото`);
  if (!opts.dryRun) console.log(`Атрибуция: ${ATTR_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
