// Shared by the homepage and the listing pages: card data and card templates.
// To add an item, add one object to the matching array.

// ---------- Card data (keys point into TEXT) ----------
const PLAYS = [
    {
        tag: "t2",
        image: "assets/images/the-murder-of-mr-haversham.webp",
        fa: { title: "قتل آقای هاورشام", author: "جاناتان سیر", year: "۱۴۰۵" },
        en: { title: "The Murder of Mr Haversham", author: "Jonathan Sayer", year: "2025" }
    },
    {
        tag: "t3"
    },
    { tag: "t1" },
    { tag: "t2" },
    { tag: "t3" },
    { tag: "t1" }
];
const PERFORMANCES = [
    {
        status: "now",
        image: "assets/images/the-murder-of-mr-haversham.webp",
        fa: { title: "قتل آقای هاورشام", director: "فراز ‌غلامی", venue: "پردیس تئاتر موسیقی شهرزاد", when: "از ۴ شهریور · ساعت ۱۸:۰۰" },
        en: { title: "The Murder of Mr Haversham", director: "Faraz Gholami", venue: "Shahrzad theater", when: "From 26 Aug · 18:00" }
    },
    {
        status: "soon",
        image: "assets/images/moonwalk.webp",
        fa: { title: "مون‌واک", director: "سجاد ‌داغستانی", venue: "تئاتر هامون", when: "از ۱۴ آذر · ساعت ۲۱:۰۰" },
        en: { title: "Moonwalk", director: "Sajad Daghestani", venue: "Hamoon theatre", when: "From 5 Dec · 21:00" }

    },
    {
        status: "now",
        image: "assets/images/shoulbasi.webp",
        fa: { title: "شولباسی", director: "عقیل ‌زمانی", venue: "تئاتر هامون", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰" },
        en: { title: "Shoolbasi", director: "Aghil Zamani", venue: "Hamoon theatre", when: "From 25 Dec Until 6 Nov · 18:30" }
    },
    {
        status: "soon",
        image: "assets/images/shahrag.webp",
        fa: { title: "شاه رگ", director: "شادی ‌امیری", venue: "تئاتر هامون", when: "از ۸ آذر · ساعت ۱۹:۰۰" },
        en: { title: "Life Line", director: "Shadi Amiri", venue: "Hamoon theatre", when: "From 29 Nov · 19:00" }
    }
];
const ARTICLES = [
    {
        tag: "k0",
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
