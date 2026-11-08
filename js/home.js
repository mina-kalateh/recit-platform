// Homepage only: card data, card templates, marquee rows and the scroll reveal.

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

languageHooks.push((t) => {
    fillMarquee("plays-l", PLAYS, playCard, t);
    fillMarquee("perf-l", PERFORMANCES, performanceCard, t);
    fillMarquee("j-l", ARTICLES, articleCard, t);
});

window.addEventListener("DOMContentLoaded", initScrollReveal);
