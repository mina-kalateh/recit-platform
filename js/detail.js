// Performance detail page: reads ?id=... from the address and renders that show.
const detailBox = document.getElementById("detail");
const showId = new URLSearchParams(location.search).get("id");
const show = PERFORMANCES.find((item) => item.id === showId);

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
                <p>${info.desc}</p>
                <dl class="facts">
                    <div><dt>${t.pdDirector}</dt><dd>${info.director}</dd></div>
                    <div><dt>${t.pdDate}</dt><dd>${info.when}</dd></div>
                    <div><dt>${t.pdVenue}</dt><dd>${info.venue}<br>${info.address}</dd></div>
                </dl>
                <a class="btn" href="${show.tiva}" target="_blank" rel="noopener">${t.pdBuy}</a>
            </div>
        </div>`;
}

languageHooks.push(renderDetail);