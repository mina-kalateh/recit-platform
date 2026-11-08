// All visible text, per language. Keys match data-i18n in index.html.
const TEXT = {
    fa: {
        sub: "تئاتر و فرهنگ", n1: "نمایشنامه‌ها", n2: "اجراها", n3: "مجله", eb: "جهانی پشت پرده", h1: "هر صحنه،", h2: "جهانی تازه.", hs: "نمایشنامه‌ها، اجراها و روایت‌هایی که روی صحنه زنده می‌شوند.", c1: "کشف نمایشنامه‌ها", c2: "اجراهای تئاتر", po: "صحنه‌ی تئاتر با پرده‌ی باز", ph: "نمایشنامه‌های منتخب", all: "مشاهده‌ی همه ←", fh: "روی صحنه", jh: "از دفتر مجله", js: "نقد، تحلیل، گفت‌وگو و تاریخچه‌ی تئاتر", tag: "پنجره‌ای به جهان نمایشنامه‌ها، اجراها و هنر تئاتر.", f1: "کشف کنید", f2: "درباره‌ی RÉCIT", a1: "درباره‌ی ما", a2: "تماس با ما", a3: "حریم خصوصی",
        t1: "کلاسیک", t2: "معاصر", t3: "نمایشنامه‌های ایرانی", now: "در حال اجرا", soon: "به‌زودی", pt: "[عنوان نمایشنامه]", pa: "[نویسنده] · [سال]", cv: "[جلد]", pp: "[پوستر]", ft: "[عنوان اجرا]", fd: "[کارگردان] · [سالن]", fc: "[شهر] · [تاریخ]", at: "[عنوان مقاله]", k1: "نقد · [تاریخ]", k2: "گفت‌وگو · [تاریخ]", k3: "تاریخچه · [تاریخ]", im: "[تصویر]",
        lang: "EN", sr: "جست‌وجو", toL: "روشن شدن سالن", toD: "شروع نمایش"
    },
    en: {
        sub: "Theatre & Culture", n1: "Plays", n2: "Performances", n3: "Journal", eb: "A WORLD BEHIND THE CURTAIN", h1: "Every stage,", h2: "a new world.", hs: "Plays, performances and stories that come alive on stage.", c1: "Discover plays", c2: "Theatre performances", po: "A theatre stage with the curtain open", ph: "Featured plays", all: "View all →", fh: "On stage", jh: "From the journal", js: "Criticism, analysis, conversations and the history of theatre", tag: "A window into the world of plays, performances and the art of theatre.", f1: "Discover", f2: "About RÉCIT", a1: "About us", a2: "Contact", a3: "Privacy",
        t1: "Classic Drama", t2: "Contemporary", t3: "Iranian Plays", now: "Now playing", soon: "Coming soon", pt: "[Play title]", pa: "[Author] · [Year]", cv: "[Cover]", pp: "[Poster]", ft: "[Performance title]", fd: "[Director] · [Venue]", fc: "[City] · [Date]", at: "[Article title]", k1: "Review · [Date]", k2: "Interview · [Date]", k3: "History · [Date]", im: "[Image]",
        lang: "فا", sr: "Search", toL: "House lights up", toD: "Lights down, show starts"
    }
};

// ---------- State & storage ----------
const STORAGE_KEYS = { lang: "recit-lang", theme: "recit-theme" };
const state = { lang: "fa", theme: "dark" };

function readStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

function writeStorage(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
}

const savedLang = readStorage(STORAGE_KEYS.lang);
const savedTheme = readStorage(STORAGE_KEYS.theme);
if (savedLang in TEXT) state.lang = savedLang;
if (savedTheme === "light" || savedTheme === "dark") state.theme = savedTheme;

// ---------- Card data (keys point into TEXT) ----------
const PLAY_TAGS = ["t1", "t2", "t3", "t1", "t2", "t3"];
const PERFORMANCE_STATUSES = ["now", "soon", "now", "soon"];
const ARTICLE_KINDS = ["k1", "k2", "k3", "k1", "k2"];

// ---------- Card templates ----------
const playCard = (t, tag) =>
    `<a class="card v" href="#"><div class="ph cover">${t.cv}</div><div class="bd"><span class="tag">${t[tag]}</span><h3 class="hd">${t.pt}</h3><span class="mu">${t.pa}</span></div></a>`;

const performanceCard = (t, status) =>
    `<a class="card" href="#"><div class="ph poster">${t.pp}</div><div class="bd"><span class="tag">${t[status]}</span><h3 class="hd">${t.ft}</h3><span class="mu">${t.fd}</span><span class="mu">${t.fc}</span></div></a>`;

const articleCard = (t, kind) =>
    `<a class="card v" href="#"><div class="ph thumb">${t.im}</div><div class="bd"><span class="ct">${t[kind]}</span><h3 class="hd">${t.at}</h3></div></a>`;

// Cards are written twice so the CSS marquee can loop seamlessly.
// The copy is hidden from screen readers and the Tab key.
function fillMarquee(id, keys, template, t) {
    const html = keys.map((key) => template(t, key)).join("");
    const copy = html.replaceAll('<a class="card', '<a aria-hidden="true" tabindex="-1" class="card');
    document.getElementById(id).innerHTML = html + copy;
}

// ---------- Rendering ----------
function applyLanguage() {
    const t = TEXT[state.lang];
    const root = document.documentElement;
    root.lang = state.lang;
    root.dir = state.lang === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t[el.dataset.i18nAlt]; });

    const langButton = document.getElementById("lang");
    langButton.textContent = t.lang;
    langButton.setAttribute("aria-label", state.lang === "fa" ? "English" : "فارسی");
    document.getElementById("search").setAttribute("aria-label", t.sr);

    fillMarquee("plays-l", PLAY_TAGS, playCard, t);
    fillMarquee("perf-l", PERFORMANCE_STATUSES, performanceCard, t);
    fillMarquee("j-l", ARTICLE_KINDS, articleCard, t);
}

function applyTheme() {
    const t = TEXT[state.lang];
    const label = state.theme === "dark" ? t.toL : t.toD;
    const themeButton = document.getElementById("theme");
    document.documentElement.setAttribute("data-theme", state.theme);
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("data-tip", label);
    themeButton.setAttribute("aria-pressed", state.theme === "light");
}

// ---------- Events ----------
document.getElementById("lang").addEventListener("click", () => {
    state.lang = state.lang === "fa" ? "en" : "fa";
    writeStorage(STORAGE_KEYS.lang, state.lang);
    applyLanguage();
    applyTheme(); // the tooltip text depends on the language
});

// Switching theme only changes colors, so the marquee keeps moving without a restart.
document.getElementById("theme").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    writeStorage(STORAGE_KEYS.theme, state.theme);
    applyTheme();
});

applyLanguage();
applyTheme();
