/* Garden catalog вЂ” РїРѕРґР±РѕСЂ СѓР»РёС‡РЅС‹С… СЂР°СЃС‚РµРЅРёР№ (РїСЂРѕРґРѕР»Р¶РµРЅРёРµ PlantFit) */
(function () {
  const LS_FAV = "gardenfit.v1.favs";
  const INDOOR_CATALOG_URL = "https://victoriiamikhaleva.github.io/Choose_your_plant/plant_selector_catalog_v6_photos_lux_fixed.html";

  const PROFILES = {
    shadeBorder: { sun: 2, height: 40 },
    partialShade: { sun: 3, height: 60 },
    sunnyBed: { sun: 5, height: 80 },
    springBloom: { bloomMonths: [3, 4, 5] },
    summerBloom: { bloomMonths: [6, 7, 8] },
    autumnBloom: { bloomMonths: [9, 10, 11] }
  };

  const BLOOM_MONTH_SHORT = ["", "СЏРЅРІ", "С„РµРІ", "РјР°СЂ", "Р°РїСЂ", "РјР°Р№", "РёСЋРЅ", "РёСЋР»", "Р°РІРі", "СЃРµРЅ", "РѕРєС‚", "РЅРѕСЏ", "РґРµРє"];
  const COLOR_KEYS = ["white", "sky", "blue", "purple", "yellow", "orange", "red-orange", "red", "pink"];

  const $ = (id) => document.getElementById(id);
  let showLessSuitable = false;
  let lastFilterKey = "";
  let lastResults = [];
  let compareIds = new Set();
  let sunTouched = false;
  let heightTouched = false;

  function nums(s) {
    return (String(s || "").replace(/[вЂ“вЂ”]/g, "-").match(/\d+(?:[.,]\d+)?/g) || []).map((x) => +x.replace(",", "."));
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
    const text = [p.nameRu, p.bloomNote, GARDEN_COLOR_LABELS[p.color]].join(" ").toLowerCase();
    return {
      ...p,
      sunR: toRange(p.sun, [1, 5]),
      heightR: toRange(p.height, [0, 300]),
      bloomR: toRange(p.bloom, [1, 12]),
      colorLabel: GARDEN_COLOR_LABELS[p.color] || p.color,
      text
    };
  }

  const PLANTS = GARDEN_RAW_PLANTS.map(normPlant);

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
    return r.min === r.max ? a : `${a} вЂ” ${b}`;
  }

  function bloomLabel(r) {
    if (r.min === r.max) return GARDEN_MONTH_LABELS[r.min] || r.raw;
    return `${GARDEN_MONTH_LABELS[r.min]} вЂ” ${GARDEN_MONTH_LABELS[r.max]}`;
  }

  function getBloomMonths() {
    return [...document.querySelectorAll(".bloom-month.is-active")]
      .map((b) => +b.dataset.month)
      .filter((m) => m >= 1 && m <= 12)
      .sort((a, b) => a - b);
  }

  function setBloomMonths(months) {
    const set = new Set(months);
    document.querySelectorAll(".bloom-month").forEach((b) => {
      b.classList.toggle("is-active", set.has(+b.dataset.month));
      b.setAttribute("aria-pressed", set.has(+b.dataset.month) ? "true" : "false");
    });
  }

  function bloomSelectionLabel(months) {
    if (!months.length) return "РЅРµ РІС‹Р±СЂР°РЅРѕ";
    if (months.length === 1) return GARDEN_MONTH_LABELS[months[0]] || String(months[0]);
    const sorted = [...months].sort((a, b) => a - b);
    const consecutive = sorted[sorted.length - 1] - sorted[0] + 1 === sorted.length;
    if (consecutive) {
      return `${GARDEN_MONTH_LABELS[sorted[0]]} вЂ” ${GARDEN_MONTH_LABELS[sorted[sorted.length - 1]]}`;
    }
    return sorted.map((m) => BLOOM_MONTH_SHORT[m] || m).join(", ");
  }

  function bloomScore(months, plantR) {
    if (!months.length) return { points: 22, ok: true, delta: 0 };
    const hit = months.some((m) => m >= plantR.min && m <= plantR.max);
    if (hit) return { points: 22, ok: true, delta: 0 };
    const userMin = Math.min(...months);
    const userMax = Math.max(...months);
    const d = userMax < plantR.min ? plantR.min - userMax : userMin - plantR.max;
    return { points: -Math.min(18, d / 0.55), ok: false, delta: d };
  }

  function bloomRangeVisual(plantR, months) {
    if (!months.length) {
      return `<small>РњРµСЃСЏС†С‹ РЅРµ РІС‹Р±СЂР°РЅС‹ вЂ” СѓС‡РёС‚С‹РІР°СЋС‚СЃСЏ РІСЃРµ</small>`;
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

    const s = f.sun == null ? { points: 0, ok: true, delta: 0 } : distScore(f.sun, p.sunR, 30, 24, 0.45);
    const h = f.height == null ? { points: 0, ok: true, delta: 0 } : distScore(f.height, p.heightR, 18, 24, 4);
    const b = bloomScore(f.bloomMonths, p.bloomR);

    score += s.points + h.points + b.points;

    reasons.push(
      f.sun == null
        ? "РѕСЃРІРµС‰С‘РЅРЅРѕСЃС‚СЊ РЅРµ Р·Р°РґР°РЅР° вЂ” РЅРµ РІР»РёСЏРµС‚ РЅР° Р±Р°Р»Р»"
        : s.ok
          ? "РѕСЃРІРµС‰С‘РЅРЅРѕСЃС‚СЊ СѓС‡Р°СЃС‚РєР° РїРѕРґС…РѕРґРёС‚"
          : `РѕСЃРІРµС‰С‘РЅРЅРѕСЃС‚СЊ РѕС‚Р»РёС‡Р°РµС‚СЃСЏ (~${s.delta.toFixed(1)} РїРѕ С€РєР°Р»Рµ)`
    );
    reasons.push(
      f.height == null
        ? "РІС‹СЃРѕС‚Р° РЅРµ Р·Р°РґР°РЅР° вЂ” РЅРµ РІР»РёСЏРµС‚ РЅР° Р±Р°Р»Р»"
        : h.ok
          ? "РІС‹СЃРѕС‚Р° РІ РЅСѓР¶РЅРѕРј РґРёР°РїР°Р·РѕРЅРµ"
          : `РІС‹СЃРѕС‚Р° РѕС‚Р»РёС‡Р°РµС‚СЃСЏ РЅР° ~${Math.round(h.delta)} СЃРј`
    );
    reasons.push(b.ok ? "С†РІРµС‚РµРЅРёРµ РІ РІС‹Р±СЂР°РЅРЅС‹Рµ РјРµСЃСЏС†С‹" : `С†РІРµС‚РµРЅРёРµ РЅРµ РїРѕРїР°РґР°РµС‚ РІ РІС‹Р±СЂР°РЅРЅС‹Рµ РјРµСЃСЏС†С‹ (~${Math.round(b.delta)} РјРµСЃ.)`);

    if (!s.ok) {
      tips.push(f.sun < p.sunR.min ? "РІС‹Р±РµСЂРёС‚Рµ Р±РѕР»РµРµ СЃРѕР»РЅРµС‡РЅРѕРµ РјРµСЃС‚Рѕ РёР»Рё РїСЂРѕСЂРµРґРёС‚Рµ РєСЂРѕРЅСѓ РґРµСЂРµРІСЊРµРІ" : "РґРѕР±Р°РІСЊС‚Рµ РїСЂРёС‚РµРЅРµРЅРёРµ РёР»Рё РїРѕСЃР°РґРёС‚Рµ РїРѕРґ РєСѓСЃС‚Р°СЂРЅРёРє");
    }
    if (!h.ok) {
      tips.push(f.height < p.heightR.min ? "СЂР°СЃС‚РµРЅРёРµ РІС‹СЂР°СЃС‚РµС‚ РІС‹С€Рµ вЂ” СѓС‡С‚РёС‚Рµ РїСЂРё РїР»Р°РЅРёСЂРѕРІР°РЅРёРё СЏСЂСѓСЃРѕРІ" : "РґР»СЏ РЅРёР·РєРѕРіРѕ Р±РѕСЂРґСЋСЂР° Р»СѓС‡С€Рµ РїРѕРґРѕР±СЂР°С‚СЊ Р±РѕР»РµРµ РєРѕРјРїР°РєС‚РЅС‹Р№ СЃРѕСЂС‚");
    }
    if (!b.ok) {
      tips.push("РІС‹Р±РµСЂРёС‚Рµ СЃРѕСЃРµРґРЅРёРµ РјРµСЃСЏС†С‹ РёР»Рё СЂР°СЃС€РёСЂСЊС‚Рµ РїРµСЂРёРѕРґ вЂ” СЂР°СЃС‚РµРЅРёРµ С†РІРµС‚С‘С‚ РІ РґСЂСѓРіРѕРµ РІСЂРµРјСЏ");
    }

    if (f.colors.length) {
      if (f.colors.includes(p.color)) {
        score += 20;
        reasons.push(`СЃРѕРІРїР°РґР°РµС‚ С†РІРµС‚РѕРІР°СЏ РіСЂСѓРїРїР°: ${p.colorLabel}`);
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
    return {
      q: $("q").value.trim().toLowerCase(),
      sun: sunTouched && $("sun").value !== "" ? +$("sun").value : null,
      height: heightTouched && $("height").value !== "" ? +$("height").value : null,
      bloomMonths: getBloomMonths(),
      colors: getSelectedColors(),
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
    return score >= 90 ? ["РРґРµР°Р»СЊРЅРѕ", "ok"] : score >= 80 ? ["РњРѕР¶РЅРѕ РїРѕСЃР°РґРёС‚СЊ", "ok"] : score >= 60 ? ["РџРѕС‚СЂРµР±СѓРµС‚СЃСЏ РєРѕСЂСЂРµРєС‚РёСЂРѕРІРєР° СѓСЃР»РѕРІРёР№", "warn"] : ["РќРµ СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ", "danger"];
  }

  function colorIcon(color) {
    return ({ white: "вљЄ", sky: "рџ”µ", blue: "рџ©µ", purple: "рџџЈ", yellow: "рџџЎ", orange: "рџџ ", "red-orange": "рџ”¶", red: "рџ”ґ", pink: "рџЊё" }[color] || "рџЊї");
  }

  function pct(x, min, max) {
    return clamp(((x - min) / (max - min)) * 100, 0, 100);
  }

  function rangeVisual(r, current, domainMin, domainMax, unit) {
    if (current == null) {
      return `<small>РџР°СЂР°РјРµС‚СЂ РЅРµ Р·Р°РґР°РЅ вЂ” СЃСЂР°РІРЅРµРЅРёРµ РЅРµ РІС‹РїРѕР»РЅСЏРµС‚СЃСЏ</small>`;
    }
    const a = pct(r.min, domainMin, domainMax);
    const b = pct(r.max, domainMin, domainMax);
    const v = pct(current, domainMin, domainMax);
    const ok = within(current, r);
    const note = ok ? "РІР°С€Рµ Р·РЅР°С‡РµРЅРёРµ РІРЅСѓС‚СЂРё РґРёР°РїР°Р·РѕРЅР°" : current < r.min ? "РЅРёР¶Рµ РѕРїС‚РёРјСѓРјР°" : "РІС‹С€Рµ РѕРїС‚РёРјСѓРјР°";
    return `<div class="paramTrack" aria-hidden="true" style="--a:${a.toFixed(2)}%;--w:${Math.max(3, b - a).toFixed(2)}%;--v:${v.toFixed(2)}%"><i></i><em></em></div><small>Р’Р°С€Рµ: ${esc(current)}${unit}</small><div class="metricNote ${ok ? "" : "warn"}">${note}</div>`;
  }

  function metricCard(title, value, unit, visual) {
    return `<div class="meter"><span>${title}</span><b><span class="valueText">${esc(value)}</span>${unit ? `<span class="unit">${esc(unit.trim())}</span>` : ""}</b>${visual || ""}</div>`;
  }

  const PHOTO_CACHE_V = "20260707e";

  function photo(p) {
    const src = p.photo ? `${p.photo}?v=${PHOTO_CACHE_V}` : "";
    if (src) {
      return `<div class="plantPhoto"><img loading="lazy" src="${esc(src)}" alt="${esc(p.nameRu)} вЂ” С„РѕС‚Рѕ" onerror="this.parentElement.className='plantPhoto fallback';this.outerHTML='${colorIcon(p.color)}'"></div>`;
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
    const heightV = rangeVisual(p.heightR, f.height, 10, 200, " СЃРј");
    const bloomV = bloomRangeVisual(p.bloomR, f.bloomMonths);

    return `<article class="card plant">
<button class="fav ${fav ? "active" : ""}" type="button" data-fav="${p.id}" aria-label="${fav ? "РЈР±СЂР°С‚СЊ РёР· РёР·Р±СЂР°РЅРЅРѕРіРѕ" : "Р’ РёР·Р±СЂР°РЅРЅРѕРµ"}">${fav ? "в…" : "в†"}</button>
${photo(p)}
<div class="plantTop"><div><h3>${esc(p.nameRu)}</h3><div class="lat">${esc(p.colorLabel)}</div></div></div>
<div class="scorebar" aria-hidden="true" style="--w:${p.score}%"><i></i></div>
<div class="tags">
<span class="tag ${cls}">${lab}: ${p.score}</span>
<span class="tag blue">${esc(p.bloomNote)}</span>
<span class="tag">${esc(sunLabel(p.sunR))}</span>
</div>
<div class="meters">
${metricCard("РЎРѕР»РЅС†Рµ", sunLabel(p.sunR), "", sunV)}
${metricCard("Р’С‹СЃРѕС‚Р°", p.height, " СЃРј", heightV)}
${metricCard("Р¦РІРµС‚РµРЅРёРµ", bloomLabel(p.bloomR), "", bloomV)}
</div>
<details open><summary>РџРѕС‡РµРјСѓ РїРѕРґС…РѕРґРёС‚</summary><ul class="reasons">${p.reasons.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>
<div class="tips"><b>РЎРѕРІРµС‚С‹</b><ul class="reasons">${(p.tips.length ? p.tips : ["СѓСЃР»РѕРІРёСЏ Р±Р»РёР·РєРё Рє РѕРїС‚РёРјР°Р»СЊРЅС‹Рј"]).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
<div class="compareRow"><label><input type="checkbox" data-compare="${p.id}" ${comp ? "checked" : ""}> СЃСЂР°РІРЅРёС‚СЊ</label></div>
</article>`;
  }

  function filterKey(f) {
    return JSON.stringify({
      q: f.q,
      sun: f.sun,
      height: f.height,
      bloomMonths: f.bloomMonths,
      colors: f.colors,
      onlyFav: f.onlyFav,
      sort: f.sort
    });
  }

  function topResultsSubtitle(ideal, rest, expanded) {
    if (!ideal.length && !rest.length) return "РџРѕРїСЂРѕР±СѓР№С‚Рµ СЂР°СЃС€РёСЂРёС‚СЊ СѓСЃР»РѕРІРёСЏ РёР»Рё СЃРјРµРЅРёС‚СЊ С†РІРµС‚РѕРІСѓСЋ РіСЂСѓРїРїСѓ.";
    if (!ideal.length && rest.length) return "РРґРµР°Р»СЊРЅС‹С… СЃРѕРІРїР°РґРµРЅРёР№ (90+) РЅРµС‚ вЂ” РјРѕР¶РЅРѕ РїРѕСЃРјРѕС‚СЂРµС‚СЊ РјРµРЅРµРµ РїРѕРґС…РѕРґСЏС‰РёРµ РІР°СЂРёР°РЅС‚С‹.";
    const topScore = Math.max(...ideal.map((p) => p.score));
    const tied = ideal.filter((p) => p.score === topScore).sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    let lead =
      tied.length === 1
        ? `Р›СѓС‡С€РёР№ РІР°СЂРёР°РЅС‚: ${tied[0].nameRu}, ${topScore} Р±Р°Р»Р»РѕРІ.`
        : `Р›СѓС‡С€РёРµ РІР°СЂРёР°РЅС‚С‹ (${topScore} Р±Р°Р»Р»РѕРІ): ${tied.slice(0, 3).map((p) => p.nameRu).join(", ")}${tied.length > 3 ? " Рё РґСЂСѓРіРёРµ" : ""}.`;
    if (expanded && rest.length) lead += ` РўР°РєР¶Рµ РїРѕРєР°Р·Р°РЅРѕ ${rest.length} СЃ РѕС†РµРЅРєРѕР№ РЅРёР¶Рµ 90.`;
    else if (rest.length) lead += ` Р•С‰С‘ ${rest.length} вЂ” РїРѕ РєРЅРѕРїРєРµ РЅРёР¶Рµ.`;
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
    arr = arr.filter((p) => p.score >= 50);
    if (f.onlyFav === "fav") arr = arr.filter((p) => fs.has(p.id));

    if (f.sort === "score") arr.sort((a, b) => b.score - a.score || a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "name") arr.sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "height") arr.sort((a, b) => mid(a.heightR) - mid(b.heightR));
    if (f.sort === "bloom") arr.sort((a, b) => mid(a.bloomR) - mid(b.bloomR));

    const ideal = arr.filter((p) => p.score >= 90);
    const rest = arr.filter((p) => p.score < 90);
    const browseMode = !f.q && !siteFiltersActive(f) && !f.colors.length;
    const searchMode = !!f.q;
    const display = searchMode || browseMode ? arr : showLessSuitable ? [...ideal, ...rest] : ideal;

    lastResults = display;
    $("cards").innerHTML = display.map(card).join("");
    $("shownCount").textContent = display.length;

    if (searchMode) {
      $("resultTitle").textContent = display.length ? `РќР°Р№РґРµРЅРѕ: ${display.length}` : "РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ";
    } else if (browseMode) {
      $("resultTitle").textContent = `РљР°С‚Р°Р»РѕРі: ${display.length}`;
    } else if (ideal.length) {
      $("resultTitle").textContent = showLessSuitable && rest.length
        ? `РџРѕРєР°Р·Р°РЅРѕ: ${display.length} (${ideal.length} РёРґРµР°Р»СЊРЅС‹С…)`
        : `РРґРµР°Р»СЊРЅРѕ: ${ideal.length}`;
    } else {
      $("resultTitle").textContent = rest.length ? "РРґРµР°Р»СЊРЅС‹С… СЃРѕРІРїР°РґРµРЅРёР№ РЅРµС‚" : `РќР°Р№РґРµРЅРѕ: 0 РёР· ${PLANTS.length}`;
    }

    if (searchMode) {
      $("resultSubtitle").textContent = display.length
        ? `РџРѕ Р·Р°РїСЂРѕСЃСѓ В«${$("q").value.trim()}В» вЂ” СЃРѕСЂС‚РёСЂРѕРІРєР° РїРѕ СЃРѕРІРїР°РґРµРЅРёСЋ.`
        : "РџРѕРїСЂРѕР±СѓР№С‚Рµ РґСЂСѓРіРѕРµ РЅР°Р·РІР°РЅРёРµ РёР»Рё СЃР±СЂРѕСЃСЊС‚Рµ С„РёР»СЊС‚СЂС‹.";
    } else if (browseMode) {
      $("resultSubtitle").textContent = "Р—Р°РґР°Р№С‚Рµ РїР°СЂР°РјРµС‚СЂС‹ СѓС‡Р°СЃС‚РєР° СЃР»РµРІР° вЂ” СЃРїРёСЃРѕРє СЃСѓР·РёС‚СЃСЏ РґРѕ Р»СѓС‡С€РёС… СЃРѕРІРїР°РґРµРЅРёР№.";
    } else {
      $("resultSubtitle").textContent = topResultsSubtitle(ideal, rest, showLessSuitable);
    }

    const expandEl = $("expandResults");
    const expandBtn = $("showLessSuitableBtn");
    const expandNote = $("expandResultsNote");
    if (rest.length && !searchMode && !browseMode) {
      expandEl.hidden = false;
      if (showLessSuitable) {
        expandBtn.textContent = "РЎРєСЂС‹С‚СЊ РјРµРЅРµРµ РїРѕРґС…РѕРґСЏС‰РёРµ СЂР°СЃС‚РµРЅРёСЏ";
        expandNote.textContent = `Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ РїРѕРєР°Р·Р°РЅРѕ ${rest.length} СЃ РѕС†РµРЅРєРѕР№ 50вЂ“89.`;
      } else {
        expandBtn.textContent = `РџРѕРєР°Р·Р°С‚СЊ РјРµРЅРµРµ РїРѕРґС…РѕРґСЏС‰РёРµ СЂР°СЃС‚РµРЅРёСЏ (${rest.length})`;
        expandNote.textContent = "";
      }
    } else {
      expandEl.hidden = true;
    }

    const emptyEl = $("empty");
    if (!display.length) {
      emptyEl.style.display = "block";
      emptyEl.querySelector("h2").textContent = ideal.length ? "РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ" : "РРґРµР°Р»СЊРЅС‹С… СЃРѕРІРїР°РґРµРЅРёР№ РЅРµС‚";
      emptyEl.querySelector("p").textContent = rest.length
        ? "РћСЃР»Р°Р±СЊС‚Рµ С„РёР»СЊС‚СЂС‹ РёР»Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ РЅРёР¶Рµ, С‡С‚РѕР±С‹ СѓРІРёРґРµС‚СЊ РјРµРЅРµРµ РїРѕРґС…РѕРґСЏС‰РёРµ РІР°СЂРёР°РЅС‚С‹."
        : "РћСЃР»Р°Р±СЊС‚Рµ С„РёР»СЊС‚СЂ РїРѕ С†РІРµС‚Сѓ РёР»Рё РёР·РјРµРЅРёС‚Рµ РїР°СЂР°РјРµС‚СЂС‹ СѓС‡Р°СЃС‚РєР°.";
    } else {
      emptyEl.style.display = "none";
    }

    renderCompare();
  }

  function renderCompare() {
    const chosen = [...compareIds].map((id) => PLANTS.find((p) => p.id == id)).filter(Boolean);
    $("comparePanel").style.display = chosen.length ? "block" : "none";
    $("compareGrid").innerHTML = chosen
      .map(
        (p) =>
          `<div class="compareBox"><b>${esc(p.nameRu)}</b><p>Р¦РІРµС‚: ${esc(p.colorLabel)}<br>РЎРѕР»РЅС†Рµ: ${esc(sunLabel(p.sunR))}<br>Р’С‹СЃРѕС‚Р°: ${esc(p.height)} СЃРј<br>Р¦РІРµС‚РµРЅРёРµ: ${esc(p.bloomNote)}</p></div>`
      )
      .join("");
  }

  function applyProfile(name) {
    const p = PROFILES[name];
    if (!p) return;
    ["sun", "height"].forEach((k) => {
      if (p[k] != null) {
        $(k).value = p[k];
        $(k + "Range").value = p[k];
        if (k === "sun") sunTouched = true;
        if (k === "height") heightTouched = true;
      }
    });
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
    showLessSuitable = false;
    lastFilterKey = "";
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
        : "РЅРµ СѓРєР°Р·Р°РЅРѕ";
    }
    if (heightEl) {
      heightEl.textContent = heightTouched && $("height").value !== ""
        ? Number($("height").value).toLocaleString("ru-RU")
        : "РЅРµ СѓРєР°Р·Р°РЅРѕ";
    }
    if (bloomEl) bloomEl.textContent = bloomSelectionLabel(getBloomMonths());
  }

  function getSelectedColors() {
    return [...document.querySelectorAll(".color-group.is-active")]
      .map((b) => b.dataset.color)
      .filter(Boolean);
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
    if (!colors.length) return "РІСЃРµ РіСЂСѓРїРїС‹";
    if (colors.length === 1) return GARDEN_COLOR_LABELS[colors[0]] || colors[0];
    return colors.map((c) => GARDEN_COLOR_LABELS[c] || c).join(", ");
  }

  function updateColorHint() {
    const el = $("colorHint");
    if (!el) return;
    const colors = getSelectedColors();
    el.textContent = colors.length
      ? `Р’С‹Р±СЂР°РЅРѕ: ${colorSelectionLabel(colors)}`
      : "РќРµ РІС‹Р±СЂР°РЅРѕ вЂ” РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ РІСЃРµ РіСЂСѓРїРїС‹";
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
    const tabs = document.querySelectorAll("[data-filters-tab]");
    const panes = document.querySelectorAll(".filters-pane");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.filtersTab;
        tabs.forEach((t) => {
          const on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
        });
        panes.forEach((pane) => {
          const on = pane.id === "filtersPaneSite" ? id === "site" : id === "catalog";
          pane.classList.toggle("is-active", on);
          pane.hidden = !on;
        });
      });
    });
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
      if (p.sunR.min < 1 || p.sunR.max > 5) issues.push(`${p.nameRu}: РїСЂРѕРІРµСЂСЊС‚Рµ СЃРѕР»РЅС†Рµ В«${p.sun}В»`);
      if (!p.nameRu) issues.push(`${p.id}: РЅРµС‚ РЅР°Р·РІР°РЅРёСЏ`);
      if (!p.color) issues.push(`${p.nameRu}: РЅРµС‚ С†РІРµС‚РѕРІРѕР№ РіСЂСѓРїРїС‹`);
    });
    $("auditSummary").textContent = `РџСЂРѕРІРµСЂРµРЅРѕ ${PLANTS.length} Р·Р°РїРёСЃРµР№. Р—Р°РјРµС‡Р°РЅРёР№: ${issues.length}.`;
    $("auditList").innerHTML =
      (issues.slice(0, 8).map((x) => `<li>${esc(x)}</li>`).join("") || "<li>РљСЂРёС‚РёС‡РЅС‹С… Р·Р°РјРµС‡Р°РЅРёР№ РЅРµ РЅР°Р№РґРµРЅРѕ.</li>") +
      (issues.length > 8 ? `<li>Р•С‰С‘ ${issues.length - 8} Р·Р°РјРµС‡Р°РЅРёР№ СЃРєСЂС‹С‚Рѕ.</li>` : "");
  }

  function init() {
    $("totalCount").textContent = PLANTS.length;
    saveFavs(favs());
    buildBloomMonths();
    buildColorGroups();
    wireDual("sun", "sunRange", () => {
      sunTouched = true;
    });
    wireDual("height", "heightRange", () => {
      heightTouched = true;
    });
    updateParamOutputs();
    wireFilterTabs();

    ["q", "sort", "onlyFav"].forEach((id) => $(id).addEventListener("input", render));

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
        toast(s.has(id) ? "Р”РѕР±Р°РІР»РµРЅРѕ РІ РёР·Р±СЂР°РЅРЅРѕРµ" : "РЈР±СЂР°РЅРѕ РёР· РёР·Р±СЂР°РЅРЅРѕРіРѕ");
      }
    });

    $("cards").addEventListener("change", (e) => {
      if (e.target.matches("[data-compare]")) {
        const id = +e.target.dataset.compare;
        if (e.target.checked && compareIds.size >= 3) {
          e.target.checked = false;
          toast("РњРѕР¶РЅРѕ СЃСЂР°РІРЅРёС‚СЊ РґРѕ 3 СЂР°СЃС‚РµРЅРёР№");
          return;
        }
        e.target.checked ? compareIds.add(id) : compareIds.delete(id);
        renderCompare();
      }
    });

    $("copyList").addEventListener("click", async () => {
      const text = lastResults
        .slice(0, 25)
        .map((p, i) => `${i + 1}. ${p.nameRu} (${p.colorLabel}) вЂ” ${p.score} Р±Р°Р»Р»РѕРІ; ${p.bloomNote}`)
        .join("\n");
      try {
        await navigator.clipboard.writeText(text);
        toast("РўРµРєСЃС‚ СЃРєРѕРїРёСЂРѕРІР°РЅ");
      } catch {
        alert(text);
      }
    });

    $("exportCsv").addEventListener("click", () => {
      const rows = [
        ["РќР°Р·РІР°РЅРёРµ", "Р¦РІРµС‚", "Р‘Р°Р»Р»С‹", "РЎРѕР»РЅС†Рµ", "Р’С‹СЃРѕС‚Р° СЃРј", "Р¦РІРµС‚РµРЅРёРµ", "РџСЂРёРјРµС‡Р°РЅРёРµ"],
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

    const qp = new URLSearchParams(location.search).get("profile") || localStorage.getItem("gardenfit.quickProfile");
    if (qp && PROFILES[qp]) applyProfile(qp);
    else {
      $("profile").value = "custom";
      render();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

