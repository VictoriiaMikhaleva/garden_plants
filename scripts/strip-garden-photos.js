/**
 * Убирает ссылки на фото из каталога — до подстановки своих снимков показываются цветовые иконки.
 * npm run photos:reset
 */
const fs = require("fs");
const path = require("path");

const DATA_JS = path.join(__dirname, "..", "assets", "js", "garden-plants-data.js");

function loadPlants() {
  const code = fs.readFileSync(DATA_JS, "utf8");
  const m = code.match(/const GARDEN_RAW_PLANTS = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error("GARDEN_RAW_PLANTS not found");
  return new Function(`return ${m[1]}`)();
}

function writePlants(plants) {
  let code = fs.readFileSync(DATA_JS, "utf8");
  code = code.replace(/const GARDEN_RAW_PLANTS = \[[\s\S]*?\n\];/, `const GARDEN_RAW_PLANTS = ${JSON.stringify(plants, null, 2)};`);
  fs.writeFileSync(DATA_JS, code, "utf8");
}

const plants = loadPlants().map(({ photo, photoSource, ...rest }) => rest);
writePlants(plants);
console.log(`Убраны photo у ${plants.length} карточек — в каталоге цветовые иконки до npm run photos:normalize`);
