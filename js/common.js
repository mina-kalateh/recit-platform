// Shared by every page: state, language, theme and the log in dialog.

// Pages add functions here to re-render their own content when the language changes.
const languageHooks = [];

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

// ---------- Rendering ----------
function applyLanguage() {
    const t = TEXT[state.lang];
    const root = document.documentElement;
    root.lang = state.lang;
    root.dir = state.lang === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t[el.dataset.i18nAlt]; });
    document.querySelectorAll("[data-i18n-tip]").forEach((el) => {
        const label = t[el.dataset.i18nTip];
        el.setAttribute("aria-label", label);
        el.setAttribute("data-tip", label);
    });
    
    const langButton = document.getElementById("lang");
    langButton.textContent = t.lang;
    langButton.setAttribute("aria-label", state.lang === "fa" ? "English" : "فارسی");
    document.getElementById("auth-close").setAttribute("aria-label", t.authClose);
    const authButton = document.getElementById("auth-open");
    authButton.setAttribute("aria-label", t.authBtn);
    authButton.setAttribute("data-tip", t.authBtn);
    document.getElementById("search").setAttribute("aria-label", t.sr);

    // Page-specific content (e.g. the homepage cards) re-renders here.
    languageHooks.forEach((hook) => hook(t));
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
authDialog.addEventListener("close", () => authDialog.classList.remove("open"));

document.getElementById("auth-close").addEventListener("click", () => authDialog.close());
authTabs.forEach((tab) => tab.addEventListener("click", () => setAuthMode(tab.dataset.mode)));

// Clicking the dark area outside the box closes the dialog.
authDialog.addEventListener("click", (event) => {
    if (event.target === authDialog) authDialog.close();
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    authNote.textContent = TEXT[state.lang].authNote; // replaced by a real request later
});

window.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    applyTheme();
});
