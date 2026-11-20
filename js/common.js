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

// ---------- Comments box (performance and play pages). Saved in this browser only, for now. ----------
const COMMENT_TYPES = ["cmT1", "cmT2", "cmT3", "cmT4"];

// User text goes into innerHTML, so special characters must be escaped.
function esc(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function readComments(key) {
    try { return JSON.parse(readStorage(key)) || []; } catch (e) { return []; }
}

function commentsHtml(t, key) {
    const list = readComments(key);
    const items = list.length
        ? list.map((c) => `<article class="comment"><div class="ch"><b>${esc(c.name) || t.cmAnon}</b><span class="tag">${t[c.type]}</span><span class="mu">${new Date(c.date).toLocaleDateString(state.lang === "fa" ? "fa-IR" : "en-GB")}</span></div><p>${esc(c.text)}</p></article>`).join("")
        : `<p class="mu">${t.cmEmpty}</p>`;
    const options = COMMENT_TYPES.map((type) => `<option value="${type}">${t[type]}</option>`).join("");
    return `
        <section class="comments">
            <h2 class="hd">${t.cmH}</h2>
            <form class="contact-form" id="comment-form">
                <label><span>${t.authName}</span><input type="text" name="name" autocomplete="name"></label>
                <label><span>${t.cmType}</span><select name="type">${options}</select></label>
                <label><span>${t.cmText}</span><textarea name="text" minlength="3" required></textarea></label>
                <button class="btn" type="submit">${t.cmSend}</button>
            </form>
            <div class="comment-list">${items}</div>
        </section>`;
}

// The form is rebuilt on every render, so one listener on the container handles the submit.
function bindComments(box, key, rerender) {
    box.addEventListener("submit", (event) => {
        if (event.target.id !== "comment-form") return;
        event.preventDefault();
        const data = new FormData(event.target);
        const text = data.get("text").trim();
        if (!text) return;
        const list = readComments(key);
        list.unshift({ name: data.get("name").trim(), type: data.get("type"), text, date: Date.now() });
        writeStorage(key, JSON.stringify(list));
        rerender(TEXT[state.lang]);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    applyTheme();
});
