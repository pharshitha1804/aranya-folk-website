// The Aranya Club — small enhancements. The site works without this file;
// it only adds shop filtering/sorting and contact-form niceties.

(function shopFilters() {
  const shop = document.querySelector("[data-shop]");
  if (!shop) return;

  const grid = shop.querySelector("[data-grid]");
  const products = Array.from(grid.children);
  const count = shop.querySelector("[data-count]");
  const empty = shop.querySelector("[data-empty]");
  const sort = shop.querySelector("[data-sort]");
  const state = { category: "", light: new Set(), placement: new Set() };

  function apply() {
    let shown = 0;
    for (const p of products) {
      const ok =
        (!state.category || p.dataset.category === state.category) &&
        (!state.light.size || state.light.has(p.dataset.light)) &&
        (!state.placement.size || state.placement.has(p.dataset.placement));
      p.hidden = !ok;
      if (ok) shown++;
    }
    count.textContent = shown;
    empty.hidden = shown > 0;
  }

  function reorder() {
    const key = sort.value;
    const sorted = products.slice().sort((a, b) => {
      if (key === "price-asc") return a.dataset.price - b.dataset.price;
      if (key === "price-desc") return b.dataset.price - a.dataset.price;
      return a.dataset.order - b.dataset.order;
    });
    grid.append(...sorted);
  }

  shop.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if ("filterCat" in btn.dataset) {
      state.category = btn.dataset.filterCat;
      shop.querySelectorAll("[data-filter-cat]").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    } else {
      const group = "filterLight" in btn.dataset ? "light" : "filterPlacement" in btn.dataset ? "placement" : null;
      if (!group) return;
      const value = btn.dataset[group === "light" ? "filterLight" : "filterPlacement"];
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", on);
      on ? state[group].add(value) : state[group].delete(value);
    }
    apply();
  });
  sort.addEventListener("change", reorder);
})();

(function enquiryForm() {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  // Swap the location label between "Area / City" and "Company & site location".
  const label = form.querySelector("[data-location-label]");
  form.querySelectorAll('input[name="enquiry_type"]').forEach((radio) =>
    radio.addEventListener("change", () => {
      label.textContent = radio.value === "Business" ? label.dataset.business : label.dataset.home;
    })
  );

  // Coming from a product's "Enquire" button: pre-fill the message.
  const item = new URLSearchParams(location.search).get("item");
  const message = form.querySelector("textarea[name=message]");
  if (item && !message.value) message.value = `${message.dataset.prefill} ${item}\n`;
})();
