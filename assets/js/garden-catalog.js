/* Garden catalog — подбор уличных растений (продолжение PlantFit) */
(function () {
  const LS_FAV = window.GARDEN_IS_DEMO || window.GARDEN_DEMO_IDS ? "gardenfit.v1.demo.favs" : "gardenfit.v1.favs";
  const INDOOR_CATALOG_URL = "https://victoriiamikhaleva.github.io/Choose_your_plant/plant_selector_catalog_v6_photos_lux_fixed.html";

  const PROFILES = {
    shadeBorder: { sun: 2, height: 40 },
    partialShade: { sun: 3, height: 60 },
    sunnyBed: { sun: 5, height: 80 },
    springBloom: { bloomMonths: [3, 4, 5] },
    summerBloom: { bloomMonths: [6, 7, 8] },
    autumnBloom: { bloomMonths: [9, 10, 11] }
  };

  const BLOOM_MONTH_SHORT = ["", "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const COLOR_KEYS = ["white", "sky", "blue", "purple", "yellow", "orange", "red", "pink"];

  const WINTERING_UI = {
    open: ["Зимует в открытом грунте"],
    cover: ["Зимует с укрытием"],
    lift: ["Выкапывают на зиму", "Зимует в помещении", "Не зимует в открытом грунте"],
    border: ["Пограничная зимовка"],
    review: ["Требует уточнения"]
  };

  const WINTERING_LABELS = {
    open: "В открытом грунте",
    cover: "С укрытием",
    lift: "Выкапывать / заносить",
    border: "Пограничная зимовка",
    review: "Требует уточнения"
  };

  const LIFE_LABELS = {
    Однолетник: "Однолетники",
    Двулетник: "Двулетники",
    Многолетник: "Многолетники"
  };

  const MOISTURE_RANK = { dry: 1, moderate: 2, moist: 3, wet: 4 };
  const MOISTURE_FILTER_LABELS = {
    dry: "Сухой",
    moderate: "Умеренно влажный",
    moist: "Равномерно влажный",
    wet: "Постоянно влажный"
  };

  const PARAM_HELP_CONTENT = {
    "usda-zones": {
      title: "Что означают зоны морозостойкости?",
      html: `<p>Зона морозостойкости показывает, насколько холодные зимы подходят растению.</p>
<p>Чем меньше номер зоны, тем более холодные зимы может переносить растение.</p>
<p>Например, USDA 4–8 означает, что растение обычно относят к зонам от 4 до 8.</p>
<p>Для каждой зоны есть свой температурный диапазон. Например, для зоны 4 самые низкие зимние температуры составляют примерно от −34 до −29 °C.</p>
<p>Эти цифры — ориентир, а не точная температура, при которой растение погибнет.</p>
<p>На реальную зимовку влияют не только морозы, но и снег, оттепели, сырость, ветер, укрытие и особенности конкретного участка.</p>
<p>Поэтому в каталоге отдельно указано, как растение обычно зимует в средней полосе России.</p>
<p>USDA — система зон морозостойкости, разработанная Министерством сельского хозяйства США.</p>
<table class="param-help__table">
<caption class="visually-hidden">Температурные диапазоны зон морозостойкости</caption>
<thead><tr><th scope="col">Зона</th><th scope="col">Температурный диапазон</th></tr></thead>
<tbody>
<tr><th scope="row">1</th><td>−51,1…−45,6 °C</td></tr>
<tr><th scope="row">2</th><td>−45,6…−40,0 °C</td></tr>
<tr><th scope="row">3</th><td>−40,0…−34,4 °C</td></tr>
<tr><th scope="row">4</th><td>−34,4…−28,9 °C</td></tr>
<tr><th scope="row">5</th><td>−28,9…−23,3 °C</td></tr>
<tr><th scope="row">6</th><td>−23,3…−17,8 °C</td></tr>
<tr><th scope="row">7</th><td>−17,8…−12,2 °C</td></tr>
<tr><th scope="row">8</th><td>−12,2…−6,7 °C</td></tr>
<tr><th scope="row">9</th><td>−6,7…−1,1 °C</td></tr>
<tr><th scope="row">10</th><td>−1,1…+4,4 °C</td></tr>
<tr><th scope="row">11</th><td>+4,4…+10,0 °C</td></tr>
</tbody>
</table>
<p class="param-help__source">Источник: <a href="https://planthardiness.ars.usda.gov/" target="_blank" rel="noopener noreferrer">USDA Plant Hardiness Zone Map 2023</a></p>`
    },
    "soil-moisture": {
      title: "Как понять влажность грунта и дренаж?",
      html: `<p>Влажность грунта в каталоге — это то, сколько воды обычно должно быть доступно корням в период активного роста.</p>
<p>Это не влажность воздуха и не расписание полива.</p>
<p>Сухой грунт — почва большую часть сезона заметно просыхает.</p>
<p>Умеренно влажный — обычная садовая почва: после дождя или полива она влажная, а затем постепенно просыхает.</p>
<p>Равномерно влажный — почва в зоне корней не должна надолго пересыхать. Это не значит, что она должна быть мокрой.</p>
<p>Постоянно влажный — высокая влажность почвы является нормальным условием для растения, а не просто переносится им время от времени.</p>
<p>Влажность и дренаж — разные вещи.</p>
<p>Растению может быть нужен равномерно влажный грунт и одновременно быстрый уход лишней воды.</p>
<p>Если указано: «Важно: без застоя воды», не высаживайте растение там, где после дождя вода долго стоит у корней.</p>
<p>Оценивайте почву не только по поверхности. Раздвиньте или слегка копните грунт в зоне корней и посмотрите, как долго он остаётся влажным после дождя или полива.</p>
<p>Песчаная почва отдаёт воду быстрее, глинистая удерживает её дольше, поэтому одинаково сухая поверхность не означает одинаковую влажность в глубине.</p>
<p>Простой влагомер можно использовать как ориентир и для сравнения одного места с самим собой, но его цифра не является универсальной нормой для всех типов грунта.</p>
<p>У луковичных и клубневых режим во время роста может отличаться от периода покоя и хранения.</p>
<p>В каталоге указан прежде всего режим влажности во время садовой вегетации.</p>`
    }
  };

  const $ = (id) => document.getElementById(id);
  let showLessSuitable = false;
  let lastFilterKey = "";
  let lastResults = [];
  let compareIds = new Set();
  let sunTouched = false;
  let heightTouched = false;
  let deepLinkPlantId = null;
  let deepLinkHandled = false;

  const CYR_TO_LAT = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
  };

  function translitRu(s) {
    return String(s || "")
      .toLowerCase()
      .split("")
      .map((ch) => (Object.prototype.hasOwnProperty.call(CYR_TO_LAT, ch) ? CYR_TO_LAT[ch] : ch))
      .join("");
  }

  function plantSlug(s) {
    return translitRu(s)
      .replace(/['’«»]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function nums(s) {
    return (String(s || "").replace(/[–—]/g, "-").match(/\d+(?:[.,]\d+)?/g) || []).map((x) => +x.replace(",", "."));
  }

  function toRange(s, fallback = [0, Infinity]) {
    const n = nums(s);
    if (!n.length) return { min: fallback[0], max: fallback[1], raw: String(s || "") };
    return { min: Math.min(...n), max: Math.max(...n), raw: String(s || "") };
  }

  function mid(r) {
    return (r.min + r.max) / 2;
  }

  function clamp(x, a, b) {
    return Math.max(a, Math.min(b, x));
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>'"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[m]));
  }

  function normPlant(p) {
    const text = [p.nameRu, p.nameLat, p.bloomNote, GARDEN_COLOR_LABELS[p.color]].join(" ").toLowerCase();
    return {
      ...p,
      sunR: toRange(p.sun, [1, 5]),
      heightR: toRange(p.height, [0, 300]),
      bloomR: toRange(p.bloom, [1, 12]),
      colorLabel: GARDEN_COLOR_LABELS[p.color] || p.color,
      text
    };
  }

  const PLANTS = (() => {
    const demoIds = Array.isArray(window.GARDEN_DEMO_IDS) ? new Set(window.GARDEN_DEMO_IDS.map(Number)) : null;
    const source = demoIds
      ? GARDEN_RAW_PLANTS.filter((p) => demoIds.has(p.id))
      : GARDEN_RAW_PLANTS;
    const base = source.map(normPlant);
    const counts = {};
    base.forEach((p) => {
      const key = plantSlug(p.nameRu) || `plant-${p.id}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return base.map((p) => {
      const key = plantSlug(p.nameRu) || `plant-${p.id}`;
      const slug = counts[key] > 1 ? `${key}-${p.id}` : key;
      return { ...p, slug };
    });
  })();

  const PLANT_BY_SLUG = Object.fromEntries(PLANTS.map((p) => [p.slug, p]));
  const PLANT_BY_ID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));

  function resolvePlantFromParams(params) {
    const slug = (params.get("plant") || "").trim().toLowerCase();
    const id = params.get("id");
    if (slug && PLANT_BY_SLUG[slug]) return PLANT_BY_SLUG[slug];
    if (id != null && id !== "" && PLANT_BY_ID[+id]) return PLANT_BY_ID[+id];
    return null;
  }

  function within(value, r) {
    return value >= r.min && value <= r.max;
  }

  function distScore(value, r, ok, penalty, scale) {
    if (within(value, r)) return { points: ok, ok: true, delta: 0 };
    const d = value < r.min ? r.min - value : value - r.max;
    return { points: -Math.min(penalty, d / scale), ok: false, delta: d };
  }

  function sunLabel(r) {
    const a = GARDEN_SUN_LABELS[Math.round(r.min)] || r.min;
    const b = GARDEN_SUN_LABELS[Math.round(r.max)] || r.max;
    return r.min === r.max ? a : `${a} — ${b}`;
  }

  function bloomLabel(r) {
    if (r.min === r.max) return GARDEN_MONTH_LABELS[r.min] || r.raw;
    return `${GARDEN_MONTH_LABELS[r.min]} — ${GARDEN_MONTH_LABELS[r.max]}`;
  }

  function getBloomMonths() {
    return [...document.querySelectorAll(".bloom-month.is-active")]
      .map((b) => +b.dataset.month)
      .filter((m) => m >= 1 && m <= 12)
      .sort((a, b) => a - b);
  }

  function setBloomMonths(months) {
    const set = new Set((months || []).map(Number));
    document.querySelectorAll(".bloom-month").forEach((b) => {
      const on = set.has(Number(b.dataset.month));
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function bloomSelectionLabel(months) {
    if (!months.length) return "Любые месяцы";
    let label;
    if (months.length === 1) label = GARDEN_MONTH_LABELS[months[0]] || String(months[0]);
    else {
      const sorted = [...months].sort((a, b) => a - b);
      const consecutive = sorted[sorted.length - 1] - sorted[0] + 1 === sorted.length;
      label = consecutive
        ? `${GARDEN_MONTH_LABELS[sorted[0]]} — ${GARDEN_MONTH_LABELS[sorted[sorted.length - 1]]}`
        : sorted.map((m) => BLOOM_MONTH_SHORT[m] || m).join(", ");
    }
    return `Выбрано: ${label}`;
  }

  function bloomScore(months, plantR) {
    if (!months.length) return { points: 22, ok: true, delta: 0 };
    const hit = months.some((m) => m >= plantR.min && m <= plantR.max);
    if (hit) return { points: 22, ok: true, delta: 0 };
    const userMin = Math.min(...months);
    const userMax = Math.max(...months);
    const d = userMax < plantR.min ? plantR.min - userMax : userMin - plantR.max;
    // Менее подходящие по цветению — только соседний месяц (±1). Дальше не показываем.
    if (d > 1) return { points: -200, ok: false, delta: d, far: true };
    return { points: -Math.min(18, d / 0.55), ok: false, delta: d };
  }

  function bloomRangeVisual(plantR, months) {
    if (!months.length) {
      return `<small>Месяцы не выбраны — учитываются все</small>`;
    }
    const mid = (Math.min(...months) + Math.max(...months)) / 2;
    return rangeVisual(plantR, mid, 1, 12, "");
  }

  function capIdealScore(score, s, h, b) {
    if (!h.ok && h.delta >= 15) score = Math.min(score, 89);
    if (!s.ok) score = Math.min(score, 89);
    if (!b.ok) score = Math.min(score, 89);
    return score;
  }

  function siteFiltersActive(f) {
    return f.sun != null || f.height != null || f.bloomMonths.length > 0;
  }

  function explain(p, f) {
    let score = 55;
    const reasons = [];
    const tips = [];

    // Незаданные параметры дают полный балл — иначе профили только по цветению
    // (весна/лето/осень) не набирают 90+ и выглядят «сломанными».
    const s = f.sun == null ? { points: 30, ok: true, delta: 0 } : distScore(f.sun, p.sunR, 30, 24, 0.45);
    const h = f.height == null ? { points: 18, ok: true, delta: 0 } : distScore(f.height, p.heightR, 18, 24, 4);
    const b = bloomScore(f.bloomMonths, p.bloomR);

    score += s.points + h.points + b.points;

    reasons.push(
      f.sun == null
        ? "освещённость не задана — не влияет на балл"
        : s.ok
          ? "освещённость участка подходит"
          : `освещённость отличается (~${s.delta.toFixed(1)} по шкале)`
    );
    reasons.push(
      f.height == null
        ? "высота не задана — не влияет на балл"
        : h.ok
          ? "высота в нужном диапазоне"
          : `высота отличается на ~${Math.round(h.delta)} см`
    );
    reasons.push(b.ok ? "цветение в выбранные месяцы" : `цветение не попадает в выбранные месяцы (~${Math.round(b.delta)} мес.)`);

    if (!s.ok) {
      tips.push(f.sun < p.sunR.min ? "выберите более солнечное место или проредите крону деревьев" : "добавьте притенение или посадите под кустарник");
    }
    if (!h.ok) {
      tips.push(f.height < p.heightR.min ? "растение вырастет выше — учтите при планировании ярусов" : "для низкого бордюра лучше подобрать более компактный сорт");
    }
    if (!b.ok) {
      tips.push(
        b.far
          ? "цветение слишком далеко от выбранных месяцев — растение не показывается в подборе"
          : "выберите соседние месяцы или расширьте период — растение цветёт в другое время"
      );
    }

    if (f.colors.length) {
      if (f.colors.includes(p.color)) {
        score += 20;
        reasons.push(`совпадает цветовая группа: ${p.colorLabel}`);
      } else {
        score -= 60;
      }
    }

    let finalScore = Math.round(clamp((score * 100) / 130, 0, 100));
    finalScore = capIdealScore(finalScore, s, h, b);

    return {
      score: finalScore,
      reasons: reasons.slice(0, 5),
      tips: [...new Set(tips)].slice(0, 4)
    };
  }

  function collect() {
    const usdaRaw = $("usdaZone") ? $("usdaZone").value : "";
    return {
      q: $("q").value.trim().toLowerCase(),
      sun: sunTouched && $("sun").value !== "" ? +$("sun").value : null,
      height: heightTouched && $("height").value !== "" ? +$("height").value : null,
      bloomMonths: getBloomMonths(),
      colors: getSelectedColors(),
      lifeCycles: getSelectedLifeCycles(),
      wintering: getSelectedWintering(),
      moisture: getSelectedMoisture(),
      usdaZone: usdaRaw === "" ? null : +usdaRaw,
      sort: $("sort").value,
      onlyFav: $("onlyFav").value
    };
  }

  function favs() {
    try {
      return new Set(JSON.parse(localStorage.getItem(LS_FAV) || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveFavs(s) {
    localStorage.setItem(LS_FAV, JSON.stringify([...s]));
    $("favCount").textContent = s.size;
  }

  function label(score) {
    return score >= 90 ? ["Идеально", "ok"] : score >= 80 ? ["Можно посадить", "ok"] : score >= 60 ? ["Потребуется корректировка условий", "warn"] : ["Не рекомендуется", "danger"];
  }

  function colorIcon(color) {
    return ({ white: "⚪", sky: "🔵", blue: "🩵", purple: "🟣", yellow: "🟡", orange: "🟠", red: "🔴", pink: "🌸" }[color] || "🌿");
  }

  function pct(x, min, max) {
    return clamp(((x - min) / (max - min)) * 100, 0, 100);
  }

  function rangeVisual(r, current, domainMin, domainMax, unit) {
    if (current == null) {
      return `<small>Параметр не задан — сравнение не выполняется</small>`;
    }
    const a = pct(r.min, domainMin, domainMax);
    const b = pct(r.max, domainMin, domainMax);
    const v = pct(current, domainMin, domainMax);
    const ok = within(current, r);
    const note = ok ? "ваше значение внутри диапазона" : current < r.min ? "ниже оптимума" : "выше оптимума";
    return `<div class="paramTrack" aria-hidden="true" style="--a:${a.toFixed(2)}%;--w:${Math.max(3, b - a).toFixed(2)}%;--v:${v.toFixed(2)}%"><i></i><em></em></div><small>Ваше: ${esc(current)}${unit}</small><div class="metricNote ${ok ? "" : "warn"}">${note}</div>`;
  }

  function metricCard(title, value, unit, visual) {
    return `<div class="meter"><span>${title}</span><b><span class="valueText">${esc(value)}</span>${unit ? `<span class="unit">${esc(unit.trim())}</span>` : ""}</b>${visual || ""}</div>`;
  }

  function formatOrientTemp(v) {
    if (v == null || v === "") return "";
    const n = Math.round(Number(v));
    if (!Number.isFinite(n)) return "";
    return `${n < 0 ? "−" : ""}${Math.abs(n)}\u00A0°C`;
  }

  function displayLifeCycle(p) {
    const garden = String(p.gardenCycle || "").trim();
    if (garden) return garden;
    const life = String(p.lifeCycle || "").trim();
    if (life) return life;
    return "Требует уточнения";
  }

  function displayHardiness(p) {
    if (p.hardinessStatus === "applicable" && p.hardinessZoneMin != null && p.hardinessZoneMax != null) {
      const t = formatOrientTemp(p.hardinessMinTempC);
      return t
        ? `USDA ${p.hardinessZoneMin}–${p.hardinessZoneMax} · ориентир ${t}`
        : `USDA ${p.hardinessZoneMin}–${p.hardinessZoneMax}`;
    }
    if (p.hardinessStatus === "not_applicable") return "Не применяется для однолетника";
    return "Требует уточнения";
  }

  function displayWintering(p) {
    return String(p.russiaWintering || "").trim() || "Требует уточнения";
  }

  function displayMoisture(p) {
    const a = p.soilMoistureMin;
    const b = p.soilMoistureMax;
    if (a === "dry" && b === "dry") return "Сухой грунт";
    if (a === "dry" && b === "moderate") return "Сухой — умеренно влажный";
    if (a === "moderate" && b === "moderate") return "Умеренно влажный грунт";
    if (a === "moderate" && b === "moist") return "Умеренно влажный — равномерно влажный";
    if (a === "moist" && b === "moist") return "Равномерно влажный грунт";
    if (a === "moist" && b === "wet") return "Равномерно — постоянно влажный";
    if (a === "wet" && b === "wet") return "Постоянно влажный грунт";
    return "";
  }

  function drainageLine(p) {
    if (p.drainageDisplay === "avoid_stagnation") return "Важно: без застоя воды";
    if (p.drainageDisplay === "tolerates_wet") return "Переносит более сырые участки";
    return "";
  }

  function moistureMatches(p, selected) {
    if (!selected.length) return true;
    const min = MOISTURE_RANK[p.soilMoistureMin];
    const max = MOISTURE_RANK[p.soilMoistureMax];
    if (min == null || max == null) return false;
    return selected.some((key) => {
      const z = MOISTURE_RANK[key];
      return z != null && min <= z && z <= max;
    });
  }

  const PHOTO_CACHE_V = "20260810a";

  function photo(p) {
    const src = p.photo ? `${p.photo}?v=${PHOTO_CACHE_V}` : "";
    if (src) {
      return `<div class="plantPhoto"><img loading="lazy" src="${esc(src)}" alt="${esc(p.nameRu)} — фото" onerror="this.parentElement.className='plantPhoto fallback';this.outerHTML='${colorIcon(p.color)}'"></div>`;
    }
    return `<div class="plantPhoto fallback">${colorIcon(p.color)}</div>`;
  }

  function card(p) {
    const [lab, cls] = label(p.score);
    const fs = favs();
    const fav = fs.has(p.id);
    const comp = compareIds.has(p.id);
    const f = collect();
    const sunV = rangeVisual(p.sunR, f.sun, 1, 5, "");
    const heightV = rangeVisual(p.heightR, f.height, 10, 200, " см");
    const bloomV = bloomRangeVisual(p.bloomR, f.bloomMonths);
    const hl = deepLinkPlantId === p.id && !deepLinkHandled ? " plant--highlight" : "";

    return `<article class="card plant${hl}" id="plant-${esc(p.slug)}" data-plant-id="${p.id}" data-plant-slug="${esc(p.slug)}">
<button class="fav ${fav ? "active" : ""}" type="button" data-fav="${p.id}" aria-label="${fav ? "Убрать из избранного" : "В избранное"}">${fav ? "★" : "☆"}</button>
${photo(p)}
<div class="plantTop"><div><h3>${esc(p.nameRu)}</h3><div class="lat">${esc(p.colorLabel)}</div></div></div>
<div class="scorebar" aria-hidden="true" style="--w:${p.score}%"><i></i></div>
<div class="tags">
<span class="tag ${cls}">${lab}: ${p.score}</span>
<span class="tag blue">${esc(p.bloomNote)}</span>
<span class="tag">${esc(sunLabel(p.sunR))}</span>
</div>
<div class="meters">
${metricCard("Солнце", sunLabel(p.sunR), "", sunV)}
${metricCard("Высота", p.height, " см", heightV)}
${metricCard("Цветение", bloomLabel(p.bloomR), "", bloomV)}
</div>
<dl class="plant-facts">
<div class="plant-fact"><dt>Жизненный цикл</dt><dd>${esc(displayLifeCycle(p))}</dd></div>
<div class="plant-fact"><dt>Зона морозостойкости</dt><dd>${esc(displayHardiness(p))}</dd></div>
<div class="plant-fact"><dt>Зимовка в средней полосе</dt><dd>${esc(displayWintering(p))}</dd></div>
<div class="plant-fact"><dt>Влажность грунта</dt><dd>${esc(displayMoisture(p))}${drainageLine(p) ? `<span class="plant-fact__drain">${esc(drainageLine(p))}</span>` : ""}</dd></div>
</dl>
<details open><summary>Почему подходит</summary><ul class="reasons">${p.reasons.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>
<div class="tips"><b>Советы</b><ul class="reasons">${(p.tips.length ? p.tips : ["условия близки к оптимальным"]).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
<div class="compareRow"><label><input type="checkbox" data-compare="${p.id}" ${comp ? "checked" : ""}> сравнить</label></div>
</article>`;
  }

  function filterKey(f) {
    return JSON.stringify({
      q: f.q,
      sun: f.sun,
      height: f.height,
      bloomMonths: f.bloomMonths,
      colors: f.colors,
      lifeCycles: f.lifeCycles,
      wintering: f.wintering,
      moisture: f.moisture,
      usdaZone: f.usdaZone,
      onlyFav: f.onlyFav,
      sort: f.sort
    });
  }

  function topResultsSubtitle(ideal, rest, expanded) {
    if (!ideal.length && !rest.length) return "Попробуйте расширить условия или сменить цветовую группу.";
    if (!ideal.length && rest.length) return "Идеальных совпадений (90+) нет — можно посмотреть менее подходящие варианты.";
    const topScore = Math.max(...ideal.map((p) => p.score));
    const tied = ideal.filter((p) => p.score === topScore).sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    let lead =
      tied.length === 1
        ? `Лучший вариант: ${tied[0].nameRu}, ${topScore} баллов.`
        : `Лучшие варианты (${topScore} баллов): ${tied.slice(0, 3).map((p) => p.nameRu).join(", ")}${tied.length > 3 ? " и другие" : ""}.`;
    if (expanded && rest.length) lead += ` Также показано ${rest.length} с оценкой ниже 90.`;
    else if (rest.length) lead += ` Ещё ${rest.length} — по кнопке ниже.`;
    return lead;
  }

  function render() {
    const f = collect();
    const key = filterKey(f);
    if (key !== lastFilterKey) {
      showLessSuitable = false;
      lastFilterKey = key;
    }

    const fs = favs();
    let arr = PLANTS.filter((p) => !f.q || p.text.includes(f.q)).map((p) => Object.assign({}, p, explain(p, f)));

    if (f.colors.length) arr = arr.filter((p) => f.colors.includes(p.color));
    if (f.lifeCycles.length) arr = arr.filter((p) => f.lifeCycles.includes(p.lifeCycle));
    if (f.wintering.length) {
      const allowed = new Set(f.wintering.flatMap((key) => WINTERING_UI[key] || []));
      arr = arr.filter((p) => allowed.has(p.russiaWintering));
    }
    if (f.moisture.length) arr = arr.filter((p) => moistureMatches(p, f.moisture));
    if (f.usdaZone != null) {
      arr = arr.filter(
        (p) =>
          p.hardinessStatus === "applicable" &&
          p.hardinessZoneMin != null &&
          p.hardinessZoneMax != null &&
          p.hardinessZoneMin <= f.usdaZone &&
          p.hardinessZoneMax >= f.usdaZone
      );
    }
    const browseMode = !f.q && !siteFiltersActive(f) && !f.colors.length;
    if (!browseMode) arr = arr.filter((p) => p.score >= 50);
    if (f.onlyFav === "fav") arr = arr.filter((p) => fs.has(p.id));

    if (f.sort === "score") arr.sort((a, b) => b.score - a.score || a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "name") arr.sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "height") arr.sort((a, b) => mid(a.heightR) - mid(b.heightR));
    if (f.sort === "bloom") arr.sort((a, b) => mid(a.bloomR) - mid(b.bloomR));

    const ideal = arr.filter((p) => p.score >= 90);
    const rest = arr.filter((p) => p.score < 90);
    const searchMode = !!f.q;
    let display = searchMode || browseMode ? arr : showLessSuitable ? [...ideal, ...rest] : ideal;

    // Глубокая ссылка: карточка видна даже вне «идеальных» / при жёстких фильтрах
    if (deepLinkPlantId != null && !display.some((p) => p.id === deepLinkPlantId)) {
      const base = PLANT_BY_ID[deepLinkPlantId];
      if (base) {
        display = [Object.assign({}, base, explain(base, f)), ...display.filter((p) => p.id !== deepLinkPlantId)];
      }
    }

    lastResults = display;
    $("cards").innerHTML = display.map(card).join("");
    $("shownCount").textContent = display.length;

    if (searchMode) {
      $("resultTitle").textContent = display.length ? `Найдено: ${display.length}` : "Ничего не найдено";
    } else if (browseMode) {
      $("resultTitle").textContent = `Каталог: ${display.length}`;
    } else if (ideal.length) {
      $("resultTitle").textContent = showLessSuitable && rest.length
        ? `Показано: ${display.length} (${ideal.length} идеальных)`
        : `Идеально: ${ideal.length}`;
    } else {
      $("resultTitle").textContent = rest.length ? "Идеальных совпадений нет" : `Найдено: 0 из ${PLANTS.length}`;
    }

    if (searchMode) {
      $("resultSubtitle").textContent = display.length
        ? `По запросу «${$("q").value.trim()}» — сортировка по совпадению.`
        : "Попробуйте другое название или сбросьте фильтры.";
    } else if (browseMode) {
      $("resultSubtitle").textContent = "Задайте параметры участка слева — список сузится до лучших совпадений.";
    } else {
      $("resultSubtitle").textContent = topResultsSubtitle(ideal, rest, showLessSuitable);
    }

    const expandEl = $("expandResults");
    const expandBtn = $("showLessSuitableBtn");
    const expandNote = $("expandResultsNote");
    if (rest.length && !searchMode && !browseMode) {
      expandEl.hidden = false;
      if (showLessSuitable) {
        expandBtn.textContent = "Скрыть менее подходящие растения";
        expandNote.textContent = `Дополнительно показано ${rest.length} с оценкой 50–89.`;
      } else {
        expandBtn.textContent = `Показать менее подходящие растения (${rest.length})`;
        expandNote.textContent = "";
      }
    } else {
      expandEl.hidden = true;
    }

    const emptyEl = $("empty");
    if (!display.length) {
      emptyEl.style.display = "block";
      emptyEl.querySelector("h2").textContent = ideal.length ? "Ничего не найдено" : "Идеальных совпадений нет";
      emptyEl.querySelector("p").textContent = rest.length
        ? "Ослабьте фильтры или нажмите кнопку ниже, чтобы увидеть менее подходящие варианты."
        : "Ослабьте фильтр по цвету или измените параметры участка.";
    } else {
      emptyEl.style.display = "none";
    }

    if (deepLinkPlantId != null && !deepLinkHandled) {
      const linked = PLANT_BY_ID[deepLinkPlantId];
      const el = linked && document.getElementById("plant-" + linked.slug);
      if (el) {
        deepLinkHandled = true;
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("plant--highlight");
          setTimeout(() => el.classList.remove("plant--highlight"), 3200);
        });
      }
    }

    renderCompare();
    syncScenarioButtons();
  }

  function syncScenarioButtons() {
    const name = $("profile").value;
    document.querySelectorAll(".catalog-quick-btn[data-profile]").forEach((b) => {
      const on = b.dataset.profile === name;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function renderCompare() {
    const chosen = [...compareIds].map((id) => PLANTS.find((p) => p.id == id)).filter(Boolean);
    $("comparePanel").style.display = chosen.length ? "block" : "none";
    $("compareGrid").innerHTML = chosen
      .map(
        (p) =>
          `<div class="compareBox"><b>${esc(p.nameRu)}</b><p>Цвет: ${esc(p.colorLabel)}<br>Солнце: ${esc(sunLabel(p.sunR))}<br>Высота: ${esc(p.height)} см<br>Цветение: ${esc(p.bloomNote)}</p></div>`
      )
      .join("");
  }

  function applyProfile(name) {
    const p = PROFILES[name];
    if (!p) return;
    // Профили не должны наслаиваться: сначала сброс параметров участка
    sunTouched = false;
    heightTouched = false;
    $("sun").value = "";
    $("height").value = "";
    $("sunRange").value = "3";
    $("heightRange").value = "60";
    setBloomMonths([]);

    if (p.sun != null) {
      $("sun").value = p.sun;
      $("sunRange").value = p.sun;
      sunTouched = true;
    }
    if (p.height != null) {
      $("height").value = p.height;
      $("heightRange").value = p.height;
      heightTouched = true;
    }
    if (p.bloomMonths) setBloomMonths(p.bloomMonths);
    $("profile").value = name;
    updateParamOutputs();
    render();
  }

  function reset() {
    $("q").value = "";
    $("profile").value = "custom";
    setSelectedColors([]);
    $("sort").value = "score";
    $("onlyFav").value = "all";
    sunTouched = false;
    heightTouched = false;
    $("sun").value = "";
    $("height").value = "";
    $("sunRange").value = "3";
    $("heightRange").value = "60";
    setBloomMonths([]);
    setSelectedLifeCycles([]);
    setSelectedWintering([]);
    setSelectedMoisture([]);
    if ($("usdaZone")) $("usdaZone").value = "";
    showLessSuitable = false;
    lastFilterKey = "";
    try { localStorage.removeItem("gardenfit.quickProfile"); } catch (e) {}
    const url = new URL(location.href);
    if (url.searchParams.has("profile")) {
      url.searchParams.delete("profile");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
    updateParamOutputs();
    render();
  }

  function updateParamOutputs() {
    const sunEl = $("sunValue");
    const heightEl = $("heightValue");
    const bloomEl = $("bloomValue");
    if (sunEl) {
      sunEl.textContent = sunTouched && $("sun").value !== ""
        ? GARDEN_SUN_LABELS[+ $("sun").value] || $("sun").value
        : "не указано";
    }
    if (heightEl) {
      heightEl.textContent = heightTouched && $("height").value !== ""
        ? Number($("height").value).toLocaleString("ru-RU")
        : "не указано";
    }
    if (bloomEl) bloomEl.textContent = bloomSelectionLabel(getBloomMonths());
    const usdaEl = $("usdaZoneValue");
    if (usdaEl && $("usdaZone")) {
      usdaEl.textContent = $("usdaZone").value === "" ? "Любая" : $("usdaZone").value;
    }
    updateMoistureHint();
    ["sunRange", "heightRange"].forEach((id) => {
      const el = $(id);
      if (!el) return;
      const min = +el.min;
      const max = +el.max;
      const val = +el.value;
      const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
      el.style.setProperty("--fill", `${pct.toFixed(2)}%`);
    });
  }

  function getSelectedColors() {
    return [...document.querySelectorAll(".color-group.is-active")]
      .map((b) => b.dataset.color)
      .filter(Boolean);
  }

  function getSelectedLifeCycles() {
    return [...document.querySelectorAll("#lifeCycleChoices .filter-choice.is-active")]
      .map((b) => b.dataset.life)
      .filter(Boolean);
  }

  function setSelectedLifeCycles(values) {
    const set = new Set(values);
    document.querySelectorAll("#lifeCycleChoices .filter-choice").forEach((b) => {
      const on = set.has(b.dataset.life);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateLifeCycleHint();
  }

  function updateLifeCycleHint() {
    const el = $("lifeCycleHint");
    if (!el) return;
    const selected = getSelectedLifeCycles();
    el.textContent = selected.length
      ? `Выбрано: ${selected.map((k) => LIFE_LABELS[k] || k).join(", ")}`
      : "Любой цикл";
  }

  function getSelectedWintering() {
    return [...document.querySelectorAll("#winteringChoices .filter-choice.is-active")]
      .map((b) => b.dataset.winter)
      .filter(Boolean);
  }

  function setSelectedWintering(values) {
    const set = new Set(values);
    document.querySelectorAll("#winteringChoices .filter-choice").forEach((b) => {
      const on = set.has(b.dataset.winter);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateWinteringHint();
  }

  function updateWinteringHint() {
    const el = $("winteringHint");
    if (!el) return;
    const selected = getSelectedWintering();
    el.textContent = selected.length
      ? `Выбрано: ${selected.map((k) => WINTERING_LABELS[k] || k).join(", ")}`
      : "Любая зимовка";
  }

  function getSelectedMoisture() {
    return [...document.querySelectorAll("#moistureChoices .filter-choice.is-active")]
      .map((b) => b.dataset.moisture)
      .filter(Boolean);
  }

  function setSelectedMoisture(values) {
    const set = new Set(values);
    document.querySelectorAll("#moistureChoices .filter-choice").forEach((b) => {
      const on = set.has(b.dataset.moisture);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateMoistureHint();
  }

  function updateMoistureHint() {
    const el = $("moistureValue");
    if (!el) return;
    const selected = getSelectedMoisture();
    el.textContent = selected.length
      ? selected.map((k) => MOISTURE_FILTER_LABELS[k] || k).join(", ")
      : "Любая влажность";
  }

  function wireChoiceGroup(wrapId) {
    const wrap = $(wrapId);
    if (!wrap) return;
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-choice");
      if (!btn || !wrap.contains(btn)) return;
      btn.classList.toggle("is-active");
      btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
      updateLifeCycleHint();
      updateWinteringHint();
      updateMoistureHint();
      render();
    });
  }

  function createParameterHelp() {
    const root = $("paramHelp");
    const titleEl = $("paramHelpTitle");
    const bodyEl = $("paramHelpBody");
    const closeBtn = $("paramHelpClose");
    const dialog = root && root.querySelector(".param-help__dialog");
    let lastTrigger = null;
    let open = false;

    function getFocusable() {
      if (!root) return [];
      return [...root.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")]
        .filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null || el === closeBtn);
    }

    function setOpen(next, trigger) {
      if (!root) return;
      open = next;
      root.hidden = !next;
      document.body.classList.toggle("param-help-open", next);
      document.querySelectorAll(".param-help-trigger").forEach((btn) => {
        btn.setAttribute("aria-expanded", next && btn === trigger ? "true" : "false");
      });
      if (next) {
        lastTrigger = trigger || lastTrigger;
        requestAnimationFrame(() => {
          (closeBtn || dialog)?.focus();
        });
      } else if (lastTrigger) {
        lastTrigger.focus();
      }
    }

    function openHelp(helpId, trigger) {
      const content = PARAM_HELP_CONTENT[helpId];
      if (!content || !root) return;
      titleEl.textContent = content.title;
      bodyEl.innerHTML = content.html;
      setOpen(true, trigger);
    }

    function closeHelp() {
      setOpen(false);
    }

    if (root) {
      root.addEventListener("click", (e) => {
        if (e.target.closest("[data-help-dismiss]") || e.target.closest(".param-help__close")) {
          closeHelp();
        }
      });
      document.addEventListener("keydown", (e) => {
        if (!open) return;
        if (e.key === "Escape") {
          e.preventDefault();
          closeHelp();
          return;
        }
        if (e.key !== "Tab") return;
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-help-id]");
      if (!trigger) return;
      e.preventDefault();
      openHelp(trigger.dataset.helpId, trigger);
    });

    return { open: openHelp, close: closeHelp };
  }

  function setSelectedColors(colors) {
    const set = new Set(colors);
    document.querySelectorAll(".color-group").forEach((b) => {
      const on = set.has(b.dataset.color);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateColorHint();
  }

  function colorSelectionLabel(colors) {
    if (!colors.length) return "все группы";
    if (colors.length === 1) return GARDEN_COLOR_LABELS[colors[0]] || colors[0];
    return colors.map((c) => GARDEN_COLOR_LABELS[c] || c).join(", ");
  }

  function updateColorHint() {
    const el = $("colorHint");
    if (!el) return;
    const colors = getSelectedColors();
    el.textContent = colors.length
      ? `Выбрано: ${colorSelectionLabel(colors)}`
      : "Любой цвет";
  }

  function buildColorGroups() {
    const wrap = $("colorGroups");
    if (!wrap || wrap.childElementCount) return;
    COLOR_KEYS.forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "color-group";
      btn.dataset.color = key;
      btn.textContent = GARDEN_COLOR_LABELS[key] || key;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", GARDEN_COLOR_LABELS[key] || key);
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-active");
        btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
        updateColorHint();
        render();
      });
      wrap.appendChild(btn);
    });
    updateColorHint();
  }

  function buildBloomMonths() {
    const wrap = $("bloomMonths");
    if (!wrap || wrap.childElementCount) return;
    for (let m = 1; m <= 12; m++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bloom-month";
      btn.dataset.month = String(m);
      btn.textContent = BLOOM_MONTH_SHORT[m];
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", GARDEN_MONTH_LABELS[m]);
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-active");
        btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
        $("profile").value = "custom";
        updateParamOutputs();
        render();
      });
      wrap.appendChild(btn);
    }
  }

  function wireFilterTabs() {
    /* вкладки убраны — один столбец «Подбор по параметрам» */
  }

  function wireDual(a, b, markTouched) {
    $(a).addEventListener("input", () => {
      markTouched();
      $(b).value = $(a).value;
      $("profile").value = "custom";
      updateParamOutputs();
      render();
    });
    $(b).addEventListener("input", () => {
      markTouched();
      $(a).value = $(b).value;
      $("profile").value = "custom";
      updateParamOutputs();
      render();
    });
  }

  function toast(t) {
    $("toast").textContent = t;
    $("toast").classList.add("show");
    setTimeout(() => $("toast").classList.remove("show"), 1600);
  }

  function csv(rows) {
    return rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  }

  function runAudit() {
    const issues = [];
    PLANTS.forEach((p) => {
      if (p.sunR.min < 1 || p.sunR.max > 5) issues.push(`${p.nameRu}: проверьте солнце «${p.sun}»`);
      if (!p.nameRu) issues.push(`${p.id}: нет названия`);
      if (!p.color) issues.push(`${p.nameRu}: нет цветовой группы`);
      const min = MOISTURE_RANK[p.soilMoistureMin];
      const max = MOISTURE_RANK[p.soilMoistureMax];
      if (min == null || max == null) issues.push(`${p.nameRu}: нет moisture min/max`);
      else if (min > max) issues.push(`${p.nameRu}: moisture min > max`);
    });
    $("auditSummary").textContent = `Проверено ${PLANTS.length} записей. Замечаний: ${issues.length}.`;
    $("auditList").innerHTML =
      (issues.slice(0, 8).map((x) => `<li>${esc(x)}</li>`).join("") || "<li>Критичных замечаний не найдено.</li>") +
      (issues.length > 8 ? `<li>Ещё ${issues.length - 8} замечаний скрыто.</li>` : "");
  }

  function init() {
    $("totalCount").textContent = PLANTS.length;
    const colorCountEl = $("colorGroupCount");
    if (colorCountEl) colorCountEl.textContent = COLOR_KEYS.length;
    saveFavs(favs());
    buildBloomMonths();
    buildColorGroups();
    wireChoiceGroup("lifeCycleChoices");
    wireChoiceGroup("winteringChoices");
    wireChoiceGroup("moistureChoices");
    createParameterHelp();
    wireDual("sun", "sunRange", () => {
      sunTouched = true;
    });
    wireDual("height", "heightRange", () => {
      heightTouched = true;
    });
    updateParamOutputs();
    wireFilterTabs();

    ["q", "sort", "onlyFav"].forEach((id) => $(id).addEventListener("input", render));
    if ($("usdaZone")) {
      $("usdaZone").addEventListener("change", () => {
        updateParamOutputs();
        render();
      });
    }

    document.querySelectorAll("[data-profile]").forEach((b) =>
      b.addEventListener("click", () => applyProfile(b.dataset.profile))
    );

    $("filterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      render();
      $("results").focus();
    });
    $("reset").addEventListener("click", reset);

    $("showLessSuitableBtn").addEventListener("click", () => {
      showLessSuitable = !showLessSuitable;
      render();
      if (showLessSuitable) $("expandResults").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    $("cards").addEventListener("click", (e) => {
      const fav = e.target.closest("[data-fav]");
      if (fav) {
        const s = favs();
        const id = +fav.dataset.fav;
        s.has(id) ? s.delete(id) : s.add(id);
        saveFavs(s);
        render();
        toast(s.has(id) ? "Добавлено в избранное" : "Убрано из избранного");
      }
    });

    $("cards").addEventListener("change", (e) => {
      if (e.target.matches("[data-compare]")) {
        const id = +e.target.dataset.compare;
        if (e.target.checked && compareIds.size >= 3) {
          e.target.checked = false;
          toast("Можно сравнить до 3 растений");
          return;
        }
        e.target.checked ? compareIds.add(id) : compareIds.delete(id);
        renderCompare();
      }
    });

    $("copyList").addEventListener("click", async () => {
      const text = lastResults
        .slice(0, 25)
        .map((p, i) => `${i + 1}. ${p.nameRu} (${p.colorLabel}) — ${p.score} баллов; ${p.bloomNote}`)
        .join("\n");
      try {
        await navigator.clipboard.writeText(text);
        toast("Текст скопирован");
      } catch {
        alert(text);
      }
    });

    $("exportCsv").addEventListener("click", () => {
      const rows = [
        ["Название", "Цвет", "Баллы", "Солнце", "Высота см", "Цветение", "Примечание"],
        ...lastResults.map((p) => [p.nameRu, p.colorLabel, p.score, sunLabel(p.sunR), p.height, bloomLabel(p.bloomR), p.bloomNote])
      ];
      const blob = new Blob([csv(rows)], { type: "text/csv;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "garden-plants-recommendations.csv";
      a.click();
      URL.revokeObjectURL(a.href);
    });

    if (window.GardenPlantsPdf) {
      GardenPlantsPdf.bind({
        getResults: () => lastResults,
        getFilters: collect,
        getProfileKey: () => $("profile").value,
        photoCacheV: PHOTO_CACHE_V
      });
    }

    const params = new URLSearchParams(location.search);
    const deep = resolvePlantFromParams(params);
    if (deep) deepLinkPlantId = deep.id;

    const qp = params.get("profile") || localStorage.getItem("gardenfit.quickProfile");
    if (qp && PROFILES[qp]) applyProfile(qp);
    else {
      $("profile").value = "custom";
      render();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

