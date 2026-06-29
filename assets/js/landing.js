const CATALOG_PAGE = "garden_catalog.html";

const SCENARIO_LABELS = {
  shade: "Тенистый бордюр",
  partial: "Полутень",
  sun: "Солнечная клумба",
  spring: "Весеннее цветение",
  summer: "Летнее цветение",
  autumn: "Осеннее цветение"
};

function goToCatalog(profile) {
  if (profile) localStorage.setItem("gardenfit.quickProfile", profile);
  const url = profile ? `${CATALOG_PAGE}?profile=${encodeURIComponent(profile)}` : CATALOG_PAGE;
  window.location.href = url;
}

document.querySelectorAll("[data-profile]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const profile = btn.dataset.profile;
    const scenario = btn.dataset.scenario;
    const status = document.getElementById("scenarioStatus");
    if (status) {
      status.textContent = `Открываем каталог: ${SCENARIO_LABELS[scenario] || profile}…`;
    }
    goToCatalog(profile);
  });
});

const form = document.getElementById("quickStartForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    goToCatalog(document.getElementById("profile")?.value);
  });
}
