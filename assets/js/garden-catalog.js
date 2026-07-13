/* Garden catalog — подбор уличных растений (продолжение PlantFit) */
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

  const BLOOM_MONTH_SHORT = ["", "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const COLOR_KEYS = ["white", "sky", "blue", "purple", "yellow", "orange", "red-orange", "red", "pink"];

  const $ = (id) => document.getElementById(id);
  let showLessSuitable = false;
  let lastFilterKey = "";
  let lastResults = [];
  let compareIds = new Set();
  let sunTouched = false;
  let heightTouched = false;

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
    const set = new Set(months);
    document.querySelectorAll(".bloom-month").forEach((b) => {
      b.classList.toggle("is-active", set.has(+b.dataset.month));
      b.setAttribute("aria-pressed", set.has(+b.dataset.month) ? "true" : "false");
    });
  }

  function bloomSelectionLabel(months) {
    if (!months.length) return "не выбрано";
    if (months.length === 1) return GARDEN_MONTH_LABELS[months[0]] || String(months[0]);
    const sorted = [...months].sort((a, b) => a - b);
    const consecutive = sorted[sorted.length - 1] - sorted[0] + 1 === sorted.length;
    if (consecutive) {
      return `${GARDEN_MONTH_LABELS[sorted[0]]} — ${GARDEN_MONTH_LABELS[sorted[sorted.length - 1]]}`;
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

    const s = f.sun == null ? { points: 0, ok: true, delta: 0 } : distScore(f.sun, p.sunR, 30, 24, 0.45);
    const h = f.height == null ? { points: 0, ok: true, delta: 0 } : distScore(f.height, p.heightR, 18, 24, 4);
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
      tips.push("выберите соседние месяцы или расширьте период — растение цветёт в другое время");
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
    return score >= 90 ? ["Идеально", "ok"] : score >= 80 ? ["Можно посадить", "ok"] : score >= 60 ? ["Потребуется корректировка условий", "warn"] : ["Не рекомендуется", "danger"];
  }

  function colorIcon(color) {
    return ({ white: "⚪", sky: "🔵", blue: "🩵", purple: "🟣", yellow: "🟡", orange: "🟠", "red-orange": "🔶", red: "🔴", pink: "🌸" }[color] || "🌿");
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

  const PHOTO_CACHE_V = "20260713b";

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

    return `<article class="card plant">
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

    renderCompare();
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
        : "не указано";
    }
    if (heightEl) {
      heightEl.textContent = heightTouched && $("height").value !== ""
        ? Number($("height").value).toLocaleString("ru-RU")
        : "не указано";
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
      : "Не выбрано — показываются все группы";
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
      if (p.sunR.min < 1 || p.sunR.max > 5) issues.push(`${p.nameRu}: проверьте солнце «${p.sun}»`);
      if (!p.nameRu) issues.push(`${p.id}: нет названия`);
      if (!p.color) issues.push(`${p.nameRu}: нет цветовой группы`);
    });
    $("auditSummary").textContent = `Проверено ${PLANTS.length} записей. Замечаний: ${issues.length}.`;
    $("auditList").innerHTML =
      (issues.slice(0, 8).map((x) => `<li>${esc(x)}</li>`).join("") || "<li>Критичных замечаний не найдено.</li>") +
      (issues.length > 8 ? `<li>Ещё ${issues.length - 8} замечаний скрыто.</li>` : "");
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

