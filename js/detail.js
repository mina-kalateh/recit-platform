// Performance detail page: reads ?id=... from the address and renders that show.
const detailBox = document.getElementById("detail");
const showId = new URLSearchParams(location.search).get("id");
const show = PERFORMANCES.find((item) => item.id === showId);
const COMMENT_TYPES = ["cmT1", "cmT2", "cmT3", "cmT4"];
const commentsKey = `recit-comments-${showId}`;

// User text goes into innerHTML, so special characters must be escaped.
function esc(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function readComments() {
    try { return JSON.parse(readStorage(commentsKey)) || []; } catch (e) { return []; }
}

function commentsHtml(t) {
    const list = readComments();
    const items = list.length
        ? list.map((c) => `<article class="comment"><div class="ch"><b>${esc(c.name) || t.cmAnon}</b><span class="tag">${t[c.type]}</span><span class="mu">${new Date(c.date).toLocaleDateString(state.lang === "fa" ? "fa-IR" : "en-GB")}</span></div><p>${esc(c.text)}</p></article>`).join("")
        : `<p class="mu">${t.cmEmpty}</p>`;
    const options = COMMENT_TYPES.map((key) => `<option value="${key}">${t[key]}</option>`).join("");
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
function noticeHtml(t) {
    return `<aside class="notice"><p><b>${t.pdNoticeT}</b> ${t.pdNotice1}</p><p>${t.pdNotice2}</p></aside>`;
}

function teaserHtml(t) {
    if (!show.teaser) return "";
    const player = /\.(mp4|webm)$/i.test(show.teaser)
        ? `<video controls preload="metadata" src="${show.teaser}"></video>`
        : `<iframe src="${show.teaser}" allowfullscreen loading="lazy"></iframe>`;
    return `<section class="teaser"><h2 class="hd">${t.pdTeaser}</h2><div class="video">${player}</div></section>`;
}
function renderDetail(t) {
    if (!show) {
        detailBox.innerHTML = `<p>${t.pdMissing}</p>`;
        return;
    }
    const info = show[state.lang];
    document.title = `${info.title} — RÉCIT`;
    detailBox.innerHTML = `
        <a class="mu" href="performances.html">${t.pdBack}</a>
        <div class="detail">
            <div class="ph cover"><img src="${show.image}" alt="${info.title}"></div>
            <div class="di">
                <span class="tag">${t[show.status]}</span>
                <h1 class="hd">${info.title}</h1>
                ${info.desc ? `<p>${info.desc}</p>` : ""}
                <dl class="facts">
                    <div><dt>${t.pdDirector}</dt><dd>${info.director}</dd></div>
                    <div><dt>${t.pdDate}</dt><dd>${info.when}</dd></div>
                    <div><dt>${t.pdVenue}</dt><dd>${info.venue}${info.address ? `<br>${info.address}` : ""}</dd></div>
                </dl>
                <a class="btn" href="${show.tiwall}" target="_blank" rel="noopener">${t.pdBuy}</a>
            </div>
        </div>
        ${noticeHtml(t)}
        ${galleryHtml(info)}
        ${teaserHtml(t)}
        ${commentsHtml(t)}`;
}
function galleryHtml(info) {
    if (!show.gallery || !show.gallery.length) return "";
    return `<div class="gallery">${show.gallery.map((src) => `<div class="shot"><img src="${src}" alt="${info.title}" loading="lazy"></div>`).join("")}</div>`;
}
// The form is rebuilt on every render, so one listener on the container handles the submit.
detailBox.addEventListener("submit", (event) => {
    if (event.target.id !== "comment-form") return;
    event.preventDefault();
    const data = new FormData(event.target);
    const text = data.get("text").trim();
    if (!text) return;
    const list = readComments();
    list.unshift({ name: data.get("name").trim(), type: data.get("type"), text, date: Date.now() });
    writeStorage(commentsKey, JSON.stringify(list));
    renderDetail(TEXT[state.lang]);
});

languageHooks.push(renderDetail);