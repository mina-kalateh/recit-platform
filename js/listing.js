// Listing pages (plays, performances, journal). One script for all three:
// each page names its section with data-section on <main>.
const SECTIONS = {
    plays: {
        items: PLAYS, card: playCard, field: "tag",
        filters: [["t1", "t1"], ["t2", "t2"], ["t3", "t3"]]
    },
    performances: {
        items: PERFORMANCES, card: performanceCard, field: "status",
        filters: [["now", "now"], ["soon", "soon"]]
    },
    journal: {
        items: ARTICLES, card: articleCard, field: "tag",
        filters: [["k0", "fk0"], ["k1", "fk1"], ["k2", "fk2"], ["k3", "fk3"]]
    }
};

const section = SECTIONS[document.querySelector("main").dataset.section];
const filtersBox = document.getElementById("filters");
const listBox = document.getElementById("list");
let activeFilter = "all";

// Each filter is [value stored on the item, key of its label in TEXT].
function renderListing(t) {
    const options = [["all", "fAll"], ...section.filters];
    filtersBox.innerHTML = options
        .map(([value, label]) => `<button class="chip" type="button" data-filter="${value}" aria-pressed="${value === activeFilter}">${t[label]}</button>`)
        .join("");

    const visible = section.items.filter((item) => activeFilter === "all" || item[section.field] === activeFilter);
    listBox.innerHTML = visible.length
        ? visible.map((item) => section.card(t, item)).join("")
        : `<p class="mu">${t.fEmpty}</p>`;
}

// The chips are rebuilt on every render, so one listener on their container handles all clicks.
filtersBox.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    renderListing(TEXT[state.lang]);
});

languageHooks.push(renderListing);
