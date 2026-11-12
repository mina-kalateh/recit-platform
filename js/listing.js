// Listing pages (plays, performances, journal). One script for all three:
// each page names its section with data-section on <main>.
// Journal page only: a reading-style row instead of a card.
const articleRow = (t, article) => {
    const info = article[state.lang];
    const thumb = article.image
        ? `<img src="${ROOT}${article.image}" alt="${info.title}" loading="lazy">`
        : t.im;
    const meta = [info.author, info.mins ? `${info.mins} ${t.mn}` : ""].filter(Boolean).join(" · ");
    return `<a class="row" href="#"><div class="ph thumb">${thumb}</div><div class="rb"><span class="ct">${info.kind} · ${info.date}</span><h3 class="hd">${info.title}</h3>${info.excerpt ? `<p>${info.excerpt}</p>` : ""}<span class="mu">${meta}</span><span class="more">${t.rd}</span></div></a>`;
};

const SECTIONS = {
    plays: {
        items: PLAYS, card: playCard, field: "tag",
        filters: [["t1", "t1"], ["t2", "t2"], ["t3", "t3"]]
    },
    performances: {
        items: PERFORMANCES, card: performanceCard, field: "status",
        filters: [["now", "now"], ["soon", "soon"]],
        genres: ["g1", "g2", "g3", "g4"]
    },
    journal: {
        items: ARTICLES, card: articleRow, field: "tag",
        filters: [["k0", "fk0"], ["k1", "fk1"], ["k2", "fk2"], ["k3", "fk3"]]
    }
};

const section = SECTIONS[document.querySelector("main").dataset.section];
const filtersBox = document.getElementById("filters");
const listBox = document.getElementById("list");
const filterBox = document.getElementById("filter-box"); // only exists on the performances page
let activeGenre = "all";
let activeFilter = "all";

// Each filter is [value stored on the item, key of its label in TEXT].
function renderListing(t) {
    const options = [["all", "fAll"], ...section.filters];
    filtersBox.innerHTML = options
        .map(([value, label]) => `<button class="chip" type="button" data-filter="${value}" aria-pressed="${value === activeFilter}">${t[label]}</button>`)
        .join("");

    if (filterBox && section.genres) {
        const genreChips = [["all", t.fAll], ...section.genres.map((g) => [g, t[g]])]
            .map(([value, label]) => `<button class="chip" type="button" data-genre="${value}" aria-pressed="${value === activeGenre}">${label}</button>`)
            .join("");
        filterBox.innerHTML = `<span class="fl">${t.gLabel}</span>${genreChips}`;
    }
    const visible = section.items.filter((item) =>
        (activeFilter === "all" || item[section.field] === activeFilter) &&
        (activeGenre === "all" || item.genre === activeGenre));
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

if (filterBox) {
    filterBox.addEventListener("click", (event) => {
        const chip = event.target.closest(".chip");
        if (!chip) return;
        activeGenre = chip.dataset.genre;
        renderListing(TEXT[state.lang]);
    });
}
languageHooks.push(renderListing);
