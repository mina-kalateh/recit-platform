// Play detail page: reads ?id=... from the address and renders that play.
const detailBox = document.getElementById("detail");
const playId = new URLSearchParams(location.search).get("id");
const play = PLAYS.find((item) => item.id === playId);
const commentsKey = `recit-comments-play-${playId}`;

function renderPlay(t) {
    if (!play) {
        detailBox.innerHTML = `<p>${t.plMissing}</p>`;
        return;
    }
    const info = play[state.lang];
    document.title = `${info.title} — RÉCIT`;
    detailBox.innerHTML = `
        <a class="mu" href="plays.html">${t.plBack}</a>
        <div class="detail">
            <div class="ph cover"><img src="${play.image}" alt="${info.title}"></div>
            <div class="di">
                <span class="tag">${t[play.tag]}</span>
                <h1 class="hd">${info.title}</h1>
                ${info.desc ? `<p>${info.desc}</p>` : ""}
                <dl class="facts">
                    <div><dt>${t.plAuthor}</dt><dd>${info.author}</dd></div>
                    <div><dt>${t.plYear}</dt><dd>${info.year}</dd></div>
                    <div><dt>${t.plCategory}</dt><dd>${t[play.tag]}</dd></div>
                </dl>
                ${play.buy ? `<a class="btn" href="${play.buy}" target="_blank" rel="noopener">${t.plBuy}</a>` : ""}
            </div>
        </div>
        ${commentsHtml(t, commentsKey)}`;
}

bindComments(detailBox, commentsKey, renderPlay);
languageHooks.push(renderPlay);