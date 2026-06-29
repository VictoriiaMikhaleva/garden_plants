/* Garden catalog — подбор уличных растений (продолжение PlantFit) */
(function () {
  const LS_FAV = "gardenfit.v1.favs";
  const INDOOR_CATALOG_URL = "https://victoriiamikhaleva.github.io/Choose_your_plant/plant_selector_catalog_v6_photos_lux_fixed.html";

  const PROFILES = {
    shadeBorder: { sun: 2, height: 40 },
    partialShade: { sun: 3, height: 60 },
    sunnyBed: { sun: 5, height: 80 },
    springBloom: { bloom: 4 },
    summerBloom: { bloom: 7 },
    autumnBloom: { bloom: 9 }
  };

  const $ = (id) => document.getElementById(id);
  let currentView = "all";
  let lastResults = [];
  let compareIds = new Set();

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

  function explain(p, f) {
    let score = 55;
    const reasons = [];
    const tips = [];

    const s = distScore(f.sun, p.sunR, 30, 24, 0.45);
    const h = distScore(f.height, p.heightR, 18, 20, 8);
    const b = distScore(f.bloom, p.bloomR, 22, 18, 0.55);

    score += s.points + h.points + b.points;

    reasons.push(s.ok ? "освещённость участка подходит" : `освещённость отличается (~${s.delta.toFixed(1)} по шкале)`);
    reasons.push(h.ok ? "высота в нужном диапазоне" : `высота отличается на ~${Math.round(h.delta)} см`);
    reasons.push(b.ok ? "цветение в выбранный период" : `пик цветения смещён (~${Math.round(b.delta)} мес.)`);

    if (!s.ok) {
      tips.push(f.sun < p.sunR.min ? "выберите более солнечное место или проредите крону деревьев" : "добавьте притенение или посадите под кустарник");
    }
    if (!h.ok) {
      tips.push(f.height < p.heightR.min ? "растение вырастет выше — учтите при планировании ярусов" : "для низкого бордюра лучше подобрать более компактный сорт");
    }
    if (!b.ok) {
      tips.push(f.bloom < p.bloomR.min ? "цветение начнётся позже выбранного месяца" : "основное цветение закончится раньше");
    }

    if (f.color !== "any") {
      if (p.color === f.color) {
        score += 20;
        reasons.push(`совпадает цветовая группа: ${p.colorLabel}`);
      } else {
        score -= 60;
      }
    }

    return {
      score: Math.round(clamp((score * 100) / 130, 0, 100)),
      reasons: reasons.slice(0, 5),
      tips: [...new Set(tips)].slice(0, 4)
    };
  }

  function collect() {
    return {
      q: $("q").value.trim().toLowerCase(),
      sun: +$("sun").value || 3,
      height: +$("height").value || 60,
      bloom: +$("bloom").value || 6,
      color: $("color").value,
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
    return ({ white: "⚪", blue: "🔵", purple: "🟣", yellow: "🟡", orange: "🟠", "red-orange": "🔶", red: "🔴", pink: "🌸" }[color] || "🌿");
  }

  function pct(x, min, max) {
    return clamp(((x - min) / (max - min)) * 100, 0, 100);
  }

  function rangeVisual(r, current, domainMin, domainMax, unit) {
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

  function photo(p) {
    const src = p.photo ? p.photo : "";
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
    const bloomV = rangeVisual(p.bloomR, f.bloom, 1, 12, "");

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

  function topResultsSubtitle(arr) {
    if (!arr.length) return "Попробуйте расширить условия или сменить цветовую группу.";
    const topScore = Math.max(...arr.map((p) => p.score));
    const tied = arr.filter((p) => p.score === topScore).sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    if (tied.length === 1) return `Лучший вариант: ${tied[0].nameRu}, ${topScore} баллов.`;
    const names = tied.slice(0, 3).map((p) => p.nameRu).join(", ");
    return `Лучшие варианты (${topScore} баллов): ${names}${tied.length > 3 ? " и другие" : ""}.`;
  }

  function render() {
    const f = collect();
    const fs = favs();
    let arr = PLANTS.filter((p) => !f.q || p.text.includes(f.q)).map((p) => Object.assign({}, p, explain(p, f)));

    if (f.color !== "any") arr = arr.filter((p) => p.color === f.color);
    arr = arr.filter((p) => p.score >= 50);
    if (f.onlyFav === "fav") arr = arr.filter((p) => fs.has(p.id));
    if (currentView === "best") arr = arr.filter((p) => p.score >= 90);
    if (currentView === "problem") arr = arr.filter((p) => p.score < 80);

    if (f.sort === "score") arr.sort((a, b) => b.score - a.score || a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "name") arr.sort((a, b) => a.nameRu.localeCompare(b.nameRu, "ru"));
    if (f.sort === "height") arr.sort((a, b) => mid(a.heightR) - mid(b.heightR));
    if (f.sort === "bloom") arr.sort((a, b) => mid(a.bloomR) - mid(b.bloomR));

    lastResults = arr;
    $("cards").innerHTML = arr.map(card).join("");
    $("shownCount").textContent = arr.length;
    $("resultTitle").textContent = `Найдено: ${arr.length} из ${PLANTS.length}`;
    $("resultSubtitle").textContent = topResultsSubtitle(arr);
    $("empty").style.display = arr.length ? "none" : "block";
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
    ["sun", "height", "bloom"].forEach((k) => {
      if (p[k] != null) {
        $(k).value = p[k];
        $(k + "Range").value = p[k];
      }
    });
    $("profile").value = name;
    updateParamOutputs();
    render();
  }

  function reset() {
    $("q").value = "";
    $("profile").value = "custom";
    $("color").value = "any";
    $("sort").value = "score";
    $("onlyFav").value = "all";
    applyProfile("partialShade");
    $("profile").value = "custom";
    currentView = "all";
    document.querySelectorAll(".chip").forEach((b, i) => b.classList.toggle("active", i === 0));
  }

  function updateParamOutputs() {
    const sunEl = $("sunValue");
    const heightEl = $("heightValue");
    const bloomEl = $("bloomValue");
    if (sunEl) sunEl.textContent = GARDEN_SUN_LABELS[+ $("sun").value] || $("sun").value;
    if (heightEl) heightEl.textContent = Number($("height").value).toLocaleString("ru-RU");
    if (bloomEl) bloomEl.textContent = GARDEN_MONTH_LABELS[+ $("bloom").value] || $("bloom").value;
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

  function wireDual(a, b) {
    $(a).addEventListener("input", () => {
      $(b).value = $(a).value;
      $("profile").value = "custom";
      updateParamOutputs();
      render();
    });
    $(b).addEventListener("input", () => {
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
    wireDual("sun", "sunRange");
    wireDual("height", "heightRange");
    wireDual("bloom", "bloomRange");
    updateParamOutputs();
    wireFilterTabs();

    ["q", "color", "sort", "onlyFav"].forEach((id) => $(id).addEventListener("input", render));

    document.querySelectorAll("[data-profile]").forEach((b) =>
      b.addEventListener("click", () => applyProfile(b.dataset.profile))
    );

    $("filterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      render();
      $("results").focus();
    });
    $("reset").addEventListener("click", reset);

    document.querySelectorAll(".chip").forEach((b) =>
      b.addEventListener("click", () => {
        currentView = b.dataset.view;
        document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b));
        render();
      })
    );

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

    runAudit();

    const qp = new URLSearchParams(location.search).get("profile") || localStorage.getItem("gardenfit.quickProfile");
    if (qp && PROFILES[qp]) applyProfile(qp);
    else applyProfile("partialShade");

    $("profile").value = qp && PROFILES[qp] ? qp : "custom";
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
