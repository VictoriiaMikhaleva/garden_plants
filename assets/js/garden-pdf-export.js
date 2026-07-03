/**
 * Клиентский PDF через window.print() — подбор уличных растений.
 * Ожидает bind() из каталога с getResults / getFilters.
 */
(function () {
  "use strict";

  const PROFILE_LABELS = {
    shadeBorder: "Теневой бордюр",
    partialShade: "Полутень",
    sunnyBed: "Солнечная клумба",
    springBloom: "Весеннее цветение",
    summerBloom: "Летнее цветение",
    autumnBloom: "Осеннее цветение",
    custom: null
  };

  let getResults = () => [];
  let getFilters = () => ({});
  let getProfileKey = () => "custom";
  let photoCacheV = "";

  function esc(s) {
    return String(s ?? "").replace(/[&<>'"]/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[m]
    );
  }

  function photoSrc(photo) {
    if (!photo) return "";
    const base = String(photo).split("?")[0];
    return `${base}?v=${photoCacheV || "1"}`;
  }

  function formatDateRu() {
    return new Date().toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
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

  function buildSummaryText(total, topPlants) {
    if (!total) return "По заданным условиям подходящих растений не найдено.";
    const scores = topPlants.map((p) => p.score);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const range = min === max ? `${max} из 100` : `${min}–${max} из 100`;
    const noun =
      total % 10 === 1 && total % 100 !== 11
        ? "растение"
        : total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20)
          ? "растения"
          : "растений";
    return `По заданным условиям найдено ${total} подходящ${noun === "растение" ? "ее" : "их"} ${noun}. Лучшие варианты в подборке: соответствие условиям ${range}.`;
  }

  function buildWhyText(plant) {
    if (plant.reasons?.length) {
      const nice = plant.reasons.slice(0, 3).map((r) => r.replace(/^./, (c) => c.toUpperCase()));
      return nice.join(". ") + ".";
    }
    return "Условия участка близки к рекомендуемым для этого вида — наблюдайте приживаемость первый сезон.";
  }

  function buildRecommendations(filters, plants) {
    const recs = new Set();
    plants.flatMap((p) => p.tips || []).slice(0, 6).forEach((t) => recs.add(t));

    if (filters.sun <= 2) {
      recs.add("В затенённых зонах учитывайте тень от зданий и крон деревьев в разное время дня.");
    } else if (filters.sun >= 4) {
      recs.add("На солнечных местах притените молодые посадки в первые жаркие недели после высадки.");
    }

    if (filters.height < 30) {
      recs.add("Низкие виды высаживайте на передний план бордюра или альпинария.");
    } else if (filters.height > 100) {
      recs.add("Высокие растения размещайте на задний план композиции или у забора.");
    }

    if (filters.bloomMonths?.length) {
      recs.add("Для непрерывного цветения сочетайте весенние, летние и осенние виды в одной группе.");
    }

    recs.add("Перед посадкой улучшите почву компостом и обеспечьте дренаж — особенно на тяжёлых глинах.");
    recs.add("После высадки мульчируйте приствольный круг, не прижимая стебли к шейке корня.");

    return [...recs].slice(0, 6);
  }

  function renderParamCard(icon, label, value) {
    return `<div class="pdf-param-card">
      <span class="pdf-param-card__icon" aria-hidden="true">${icon}</span>
      <span class="pdf-param-card__label">${esc(label)}</span>
      <span class="pdf-param-card__value">${esc(value)}</span>
    </div>`;
  }

  function renderPlantCard(plant) {
    const img = plant.photo
      ? `<img src="${esc(photoSrc(plant.photo))}" alt="">`
      : `<span aria-hidden="true">🌿</span>`;

    return `<article class="pdf-plant-card">
      <div class="pdf-plant-photo">${img}</div>
      <div class="pdf-plant-body">
        <div class="pdf-plant-head">
          <div class="pdf-plant-names">
            <h3>${esc(plant.nameRu)}</h3>
            <p>${esc(plant.colorLabel)}</p>
          </div>
          <div class="pdf-score-badge" title="Оценка соответствия условиям участка">
            <span class="pdf-score-badge__label">Соответствие условиям</span>
            <span class="pdf-score-badge__value">${plant.score} из 100</span>
          </div>
        </div>
        <div class="pdf-plant-metrics">
          <div class="pdf-metric"><strong>☀ Солнце</strong> ${esc(sunLabel(plant.sunR))}</div>
          <div class="pdf-metric"><strong>📏 Высота</strong> ${esc(plant.height)} см</div>
          <div class="pdf-metric"><strong>🌸 Цветение</strong> ${esc(bloomLabel(plant.bloomR))}</div>
          <div class="pdf-metric"><strong>🎨 Группа</strong> ${esc(plant.colorLabel)}</div>
          <div class="pdf-metric"><strong>📅 Срок</strong> ${esc(plant.bloomNote)}</div>
        </div>
        <p class="pdf-why">
          <span class="pdf-why-label">Почему подходит</span>
          ${esc(buildWhyText(plant))}
        </p>
      </div>
    </article>`;
  }

  function fillTemplate() {
    const results = getResults();
    const f = getFilters();
    const profileKey = getProfileKey();
    const top = results.slice(0, 8);
    const profileLabel = PROFILE_LABELS[profileKey];

    const sunText = GARDEN_SUN_LABELS[f.sun] || String(f.sun);
    const bloomText = f.bloomMonths?.length
      ? f.bloomMonths
          .slice()
          .sort((a, b) => a - b)
          .map((m) => GARDEN_MONTH_LABELS[m] || m)
          .join(", ")
      : "любой";
    const colorText = f.color === "any" ? "Любая" : GARDEN_COLOR_LABELS[f.color] || f.color;

    const paramCards = [
      renderParamCard("☀", "Освещённость", sunText),
      renderParamCard("📏", "Высота", `${f.height} см`),
      renderParamCard("🌸", "Месяцы цветения", bloomText),
      renderParamCard("🎨", "Цветовая группа", colorText)
    ];

    if (profileLabel) {
      paramCards.push(renderParamCard("🌿", "Профиль участка", profileLabel));
    }

    const root = document.getElementById("pdf-template");
    if (!root) return;

    root.querySelector(".pdf-cover-date").textContent = formatDateRu();
    root.querySelector(".pdf-params-grid").innerHTML = paramCards.join("");
    root.querySelector(".pdf-summary-box p").textContent = buildSummaryText(
      results.length,
      top.length ? top : results
    );

    const plantsEl = root.querySelector(".pdf-plants-list");
    plantsEl.innerHTML = top.length
      ? top.map(renderPlantCard).join("")
      : `<p class="pdf-section-lead">Нет растений для экспорта — измените параметры подбора.</p>`;

    const recs = buildRecommendations(f, top);
    root.querySelector(".pdf-recs ul").innerHTML = recs.map((r) => `<li>${esc(r)}</li>`).join("");
  }

  function preloadPdfImages() {
    const imgs = document.querySelectorAll("#pdf-template img");
    return Promise.all(
      [...imgs].map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );
  }

  async function prepareAndPrint() {
    const results = getResults();
    if (!results.length) {
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = "Сначала подберите растения — список пуст";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2200);
      } else {
        alert("Сначала подберите растения — список пуст.");
      }
      return;
    }

    fillTemplate();
    await preloadPdfImages();

    const cleanup = () => {
      document.body.classList.remove("is-printing-pdf");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    document.body.classList.add("is-printing-pdf");
    window.print();
  }

  function bind(opts) {
    if (opts.getResults) getResults = opts.getResults;
    if (opts.getFilters) getFilters = opts.getFilters;
    if (opts.getProfileKey) getProfileKey = opts.getProfileKey;
    if (opts.photoCacheV) photoCacheV = opts.photoCacheV;

    const btn = document.getElementById("pdfPrintBtn");
    if (btn) btn.addEventListener("click", prepareAndPrint);
  }

  window.GardenPlantsPdf = { bind, fillTemplate, prepareAndPrint };
})();
