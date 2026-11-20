// Performance detail page: reads ?id=... from the address and renders that show.
const detailBox = document.getElementById("detail");
const showId = new URLSearchParams(location.search).get("id");
const show = PERFORMANCES.find((item) => item.id === showId);
const commentsKey = `recit-comments-${showId}`;

function noticeHtml(t) {
    return `<aside class="notice"><p><b>${t.pdNoticeT}</b> ${t.pdNotice1}</p><p>${t.pdNotice2}</p></aside>`;
}

function galleryHtml(info) {
    if (!show.gallery || !show.gallery.length) return "";
    return `<div class="gallery">${show.gallery.map((src) => `<div class="shot"><img src="${src}" alt="${info.title}" loading="lazy"></div>`).join("")}</div>`;
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
        ${commentsHtml(t, commentsKey)}`;
}

bindComments(detailBox, commentsKey, renderDetail);
languageHooks.push(renderDetail);