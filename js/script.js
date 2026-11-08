// All visible text, per language. Keys match data-i18n in index.html.
const TEXT = {
    fa: {
        sub: "تئاتر و فرهنگ", n1: "نمایشنامه‌ها", n2: "اجراها", n3: "مجله", eb: "جهانی پشت پرده", h1: "هر صحنه،", h2: "جهانی تازه.", hs: "نمایشنامه‌ها، اجراها و روایت‌هایی که روی صحنه زنده می‌شوند.", c1: "کشف نمایشنامه‌ها", c2: "اجراهای تئاتر", po: "صحنه‌ی تئاتر با پرده‌ی باز", ph: "نمایشنامه‌های منتخب", all: "مشاهده‌ی همه ←", fh: "روی صحنه", jh: "از دفتر مجله", js: "نقد، تحلیل، گفت‌وگو و تاریخچه‌ی تئاتر", tag: "پنجره‌ای به جهان نمایشنامه‌ها، اجراها و هنر تئاتر.", f1: "کشف کنید", f2: "درباره‌ی RÉCIT", a1: "درباره‌ی ما", a2: "تماس با ما", a3: "حریم خصوصی",
        t1: "کلاسیک", t2: "کمدی", t3: "نمایشنامه‌های ایرانی", now: "در حال اجرا", soon: "به‌زودی", pt: "[عنوان نمایشنامه]", pa: "[نویسنده] · [سال]", cv: "[جلد]", pp: "[پوستر]", ft: "[عنوان اجرا]", fd: "[کارگردان] · [سالن]", fc: "[شهر] · [تاریخ]", at: "[عنوان مقاله]", k1: "نقد · [تاریخ]", k2: "گفت‌وگو · [تاریخ]", k3: "تاریخچه · [تاریخ]", im: "[تصویر]",
        lang: "EN", sr: "جست‌وجو", toL: "روشن شدن سالن", toD: "شروع نمایش",// داخل fa:
        authBtn: "ورود / ثبت‌نام", authLogin: "ورود", authSignup: "ثبت‌نام", authName: "نام", authEmail: "ایمیل", authPass: "رمز عبور", authGo1: "ورود به حساب", authGo2: "ساخت حساب", authClose: "بستن", authNote: "اتصال به سرور هنوز انجام نشده است."
    },
    en: {
        sub: "Theatre & Culture", n1: "Plays", n2: "Performances", n3: "Journal", eb: "A WORLD BEHIND THE CURTAIN", h1: "Every stage,", h2: "a new world.", hs: "Plays, performances and stories that come alive on stage.", c1: "Discover plays", c2: "Theatre performances", po: "A theatre stage with the curtain open", ph: "Featured plays", all: "View all →", fh: "On stage", jh: "From the journal", js: "Criticism, analysis, conversations and the history of theatre", tag: "A window into the world of plays, performances and the art of theatre.", f1: "Discover", f2: "About RÉCIT", a1: "About us", a2: "Contact", a3: "Privacy",
        t1: "Classic Drama", t2: "Contemporary", t3: "Iranian Plays", now: "Now playing", soon: "Coming soon", pt: "[Play title]", pa: "[Author] · [Year]", cv: "[Cover]", pp: "[Poster]", ft: "[Performance title]", fd: "[Director] · [Venue]", fc: "[City] · [Date]", at: "[Article title]", k1: "Review · [Date]", k2: "Interview · [Date]", k3: "History · [Date]", im: "[Image]",
        lang: "فا", sr: "Search", toL: "House lights up", toD: "Lights down, show starts",// داخل en:
        authBtn: "Log in / Sign up", authLogin: "Log in", authSignup: "Sign up", authName: "Name", authEmail: "Email", authPass: "Password", authGo1: "Log in", authGo2: "Create account", authClose: "Close", authNote: "Not connected to a server yet."
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
const PLAYS = [
    {
        tag: "t2",
        image: "assets/images/the-murder-of-mr-haversham.webp",
        fa: { title: "قتل آقای هاورشام", author: "جاناتان سیر", year: "۱۴۰۵" },
        en: { title: "The Murder of Mr Haversham", author: "Jonathan Sayer", year: "2025" }
    },
    { tag: "t3" },
    { tag: "t1" },
    { tag: "t2" },
    { tag: "t3" },
    { tag: "t1" }
];
const PERFORMANCES = [
    {
        status: "now",
        image: "assets/images/all-my-sons.webp",
        fa: { title: "همه پسران من", director: "علیرضا بنیادی", venue: "سالن میهن بانو، شیراز", when: "از ۱۴ آبان · ساعت ۱۸:۳۰" },
        en: { title: "All My Sons", director: "Alireza Bonyadi", venue: "Mahin Banoo Hall, Shiraz", when: "From 5 Nov · 18:30" }
    },
    { status: "soon" },
    { status: "now" },
    { status: "soon" }
];
const ARTICLES = [
    {
        fa: { kind: "مقاله", title: "نقش آموزش هنرهای نمایشی در تقویت خلاقیت کودکان", date: "۱۴۰۵" },
        en: { kind: "Article", title: "The Role of Performing Arts Education in Strengthening Children's Creativity", date: "2026" }
    },
    { tag: "k2" },
    { tag: "k3" },
    { tag: "k1" },
    { tag: "k2" }
];
// ---------- Card templates ----------
const playCard = (t, play) => {
    const info = play[state.lang];
    const cover = play.image
        ? `<img src="${play.image}" alt="${info.title}" loading="lazy">`
        : t.cv;
    const title = info ? info.title : t.pt;
    const credit = info ? `${info.author} · ${info.year}` : t.pa;
    return `<a class="card v" href="#"><div class="ph cover">${cover}</div><div class="bd"><span class="tag">${t[play.tag]}</span><h3 class="hd">${title}</h3><span class="mu">${credit}</span></div></a>`;
};
const performanceCard = (t, show) => {
    const info = show[state.lang];
    const poster = show.image
        ? `<img src="${show.image}" alt="${info.title}" loading="lazy">`
        : t.pp;
    const title = info ? info.title : t.ft;
    const credit = info ? `${info.director} · ${info.venue}` : t.fd;
    const when = info ? info.when : t.fc;
    return `<a class="card" href="#"><div class="ph poster">${poster}</div><div class="bd"><span class="tag">${t[show.status]}</span><h3 class="hd">${title}</h3><span class="mu">${credit}</span><span class="mu">${when}</span></div></a>`;
};
const articleCard = (t, article) => {
    const info = article[state.lang];
    const thumb = article.image
        ? `<img src="${article.image}" alt="${info.title}" loading="lazy">`
        : t.im;
    const label = info ? `${info.kind} · ${info.date}` : t[article.tag];
    const title = info ? info.title : t.at;
    return `<a class="card v" href="#"><div class="ph thumb">${thumb}</div><div class="bd"><span class="ct">${label}</span><h3 class="hd">${title}</h3></div></a>`;
};
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
    document.getElementById("auth-close").setAttribute("aria-label", t.authClose);
    const authButton = document.getElementById("auth-open");
    authButton.setAttribute("aria-label", t.authBtn);
    authButton.setAttribute("data-tip", t.authBtn);
    document.getElementById("search").setAttribute("aria-label", t.sr);

    fillMarquee("plays-l", PLAYS, playCard, t);
    fillMarquee("perf-l", PERFORMANCES, performanceCard, t);
    fillMarquee("j-l", ARTICLES, articleCard, t);
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

// ---------- Scroll reveal ----------
function initScrollReveal() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // reveal once, then stop watching
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".hero .tx, .hero .po, .sh, .mq, .fg").forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

// ---------- Auth dialog (front-end only for now) ----------
const authDialog = document.getElementById("auth");
const authForm = document.getElementById("auth-form");
const authTabs = document.querySelectorAll(".auth-tab");
const authNote = document.getElementById("auth-note");
const authName = document.getElementById("auth-name");
const authPass = document.getElementById("auth-pass");

function setAuthMode(mode) {
    authForm.dataset.mode = mode;
    authTabs.forEach((tab) => tab.setAttribute("aria-selected", tab.dataset.mode === mode));
    authName.required = mode === "signup"; // hidden fields must not block the form
    authPass.autocomplete = mode === "login" ? "current-password" : "new-password";
    authNote.textContent = "";
}

document.getElementById("auth-open").addEventListener("click", () => {
    setAuthMode("login");
    authDialog.showModal();
    void authDialog.offsetWidth; // let the browser paint the closed curtains first
    authDialog.classList.add("open");
});

// Reset, so the curtains are closed again the next time the dialog opens.
authDialog.addEventListener("close", () => authDialog.classList.remove("open"));document.getElementById("auth-close").addEventListener("click", () => authDialog.close());
authTabs.forEach((tab) => tab.addEventListener("click", () => setAuthMode(tab.dataset.mode)));

// Clicking the dark area outside the box closes the dialog.
authDialog.addEventListener("click", (event) => {
    if (event.target === authDialog) authDialog.close();
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    authNote.textContent = TEXT[state.lang].authNote; // replaced by a real request later
});

applyLanguage();
applyTheme();
initScrollReveal();