// Shared by the homepage and the listing pages: card data and card templates.
// To add an item, add one object to the matching array.

// ---------- Card data (keys point into TEXT) ----------
const ROOT = location.pathname.includes("/pages/") ? "../" : "";

const PLAYS = [
    {
        tag: "t1",
        image: "../assets/images/waiting-for-Godot.webp",
        fa: { title: "انتظار برای گدوت", author: "ساموئل بکت", year: "۱۹۵۲" },
        en: { title: "Waiting for Godot", author: "Samuel Beckett", year: "1952" }
    },
    {
        tag: "t2",
        image: "../assets/images/death-of-a-salesman.webp",
        fa: { title: "مرگ یک فروشنده", author: "آرتور میلر", year: "۱۹۴۹" },
        en: { title: "Death of a salesman", author: "Arthur Miller", year: "1949" }
    },
    {
        tag: "t3",
        image: "../assets/images/amiz-ghalamdon.webp",
        fa: { title: "آمیز قلمدون", author: "اکبر ‌رادی", year: "۱۳۹۷" },
        en: { title: "Amiz Ghalamdon", author: "Akbar Radi", year: "1397" }

    },

    {
        tag: "t1",
        image: "../assets/images/oedipus-rex_poster.webp",
        fa: { title: "ادیپ شهریار", author: "سوفوکل", year: "۲۰۱۵" },
        en: { title: "Oedipus Rex", author: "Sophocles", year: "2015" }

    },
    {
        tag: "t2",
        image: "../assets/images/the-pillowman.webp",
        fa: { title: "مرد بالشی", author: "مارتین مکدوناق", year: "۲۰۰۳" },
        en: { title: "The Pillowman", author: "Martin McDonagh", year: "2003" }

    },
    {
        tag: "t3",
        image: "../assets/images/night-on-the-wet-pavement.webp",
        fa: { title: "شب روی سنگفرش خیس", author: "اکبر رادی", year: "۱۴۰۲" },
        en: { title: "Night on the Wet Pavement", author: "Akbar Radi", year: "1402" }

    }
];
const PERFORMANCES = [
    {
        id: "haversham",
        status: "now",
        genre: "g3",
        tiwall: "https://www.tiwall.com/p/ghatl.emarat6",
        image: "../assets/images/the-murder-of-mr-haversham.webp",
        fa: { title: "قتل آقای هاورشام", director: "فراز ‌غلامی", venue: "پردیس تئاتر موسیقی شهرزاد", when: "از ۴ شهریور · ساعت ۱۸:۰۰" },
        en: { title: "The Murder of Mr Haversham", director: "Faraz Gholami", venue: "Shahrzad theater", when: "From 26 Aug · 18:00" }
    },
    {
        id: "moonwalk",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/moonwalk",
        image: "../assets/images/moonwalk.webp",
        fa: { title: "مون‌واک", director: "سجاد ‌داغستانی", venue: "تئاتر هامون", when: "از ۱۴ آذر · ساعت ۲۱:۰۰" },
        en: { title: "Moonwalk", director: "Sajad Daghestani", venue: "Hamoon theatre", when: "From 5 Dec · 21:00" }

    },
    {
        id: "Shoolbasi",
        status: "now",
        genre: "g1",
        tiwall: "https://www.tiwall.com/p/shoul2",
        image: "../assets/images/shoulbasi.webp",
        fa: { title: "شولباسی", director: "عقیل ‌زمانی", venue: "تئاتر هامون", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰" },
        en: { title: "Shoolbasi", director: "Aghil Zamani", venue: "Hamoon theatre", when: "From 25 Dec Until 6 Nov · 18:30" }
    },
    {
        id: "shahrag",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/shahrag2",
        image: "../assets/images/shahrag.webp",
        fa: { title: "شاه رگ", director: "شادی ‌امیری", venue: "تئاتر هامون", when: "از ۸ آذر · ساعت ۱۹:۰۰" },
        en: { title: "Life Line", director: "Shadi Amiri", venue: "Hamoon theatre", when: "From 29 Nov · 19:00" }
    },
    {
        id: "ibehtwoautumn",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/paeiz8",
        image: "../assets/images/paeiz.webp",
        fa: { title: "من، بیه‌دو، پاییز", director: "زهره ‌یحیایی", venue: "تماشاخانه ‌جوانمرد", when: "از ۱۵ آذر · ساعت ۱۹:۰۰" },
        en: { title: "I, Beh Two, Autumn", director: "Zohreh Yahyaie", venue: "Tamashakhaneh theatre", when: "From 6 Nov · 19:00" }
    },
    {
        id: "lotteries",
        status: "now",
        genre: "g4",
        tiwall: "https://www.tiwall.com/p/lutriha",
        image: "../assets/images/lutriha.webp",
        fa: { title: "لوتری‌ها", director: "سیما ‌شکری", venue: "تئاتر آبی", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰" },
        en: { title: "lotteries", director: "Sima Shokri", venue: "Blue theatre", when: "From 25 Dec Until 6 Nov · 18:30" }
    },
    {
        id: "sahrahSuzanne",
        status: "now",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/saherehsoozan",
        image: "../assets/images/saherehsoozan.webp",
        fa: { title: "ساحره سوزان", director: "ستاره ‌افشون", venue: "تئاتر مرکزی", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰" },
        en: { title: "Sahrah Suzanne", director: "Setareh Afshon", venue: "Center theatre", when: "From 25 Dec Until 6 Nov · 18:30" }
    },

];
const ARTICLES = [
    {
        tag: "k0",
        image: "../assets/images/k0.webp",
        fa: { kind: "مقاله", title: "در انتظار گودو", date: "۱۴۰۵", excerpt: "دو مرد کنار یک درخت منتظر کسی‌اند که شاید هرگز نیاید. چرا این انتظار بعد از هفتاد سال هنوز تازه است؟", mins: "۸" },
        en: { kind: "Article", title: "Waiting for Godot", date: "2026", excerpt: "Two men wait by a tree for someone who may never come. Why does this waiting still feel new after seventy years?", mins: "8" }
    },
    {
        tag: "k1",
        image: "../assets/images/k1.webp",
        fa: { kind: "نقد", title: "مرگ فروشنده؛ فروپاشی رؤیای آمریکایی روی صحنه", date: "۱۴۰۵" },
        en: { kind: "Critique", title: "Death of a Salesman: The Collapse of the American Dream on Stage", date: "2026" }

    },
    {
        tag: "k2",
        image: "../assets/images/k2.webp",
        fa: { kind: "گفت‌وگو", title: "جهان کارگردان تئاتر", date: "۱۴۰۵" },
        en: { kind: "Interview", title: "The World of a Theater Director", date: "2026" }

    },
    {
        tag: "k3",
        image: "../assets/images/k3.webp",
        fa: { kind: "تاریخچه", title: "از تعزیه تا تئاتر مدرن؛ روایت شکل‌گیری تئاتر ایران", date: "۱۴۰۵" },
        en: { kind: "History", title: "From Ta'ziyeh to Modern Theater: The Story of the Emergence of Iranian Theater", date: "2026" }
    }
];
// ---------- Card templates ----------
const playCard = (t, play) => {
    const info = play[state.lang];
    const cover = play.image
        ? `<img src="${play.image}" alt="${info.title}" loading="lazy">`
        : t.cv;
    const title = info ? info.title : t.pt;
    const credit = info ? `${info.author} · ${info.year}` : t.pa;
    return `<a class="card v" href="#"><div class="ph cover">${cover}</div><div class="bd"><span class="tag">${t[play.tag]}</span><h3 class="hd">${title}</h3><span class="mu">${credit}</span><span class="more">${t.more}</span></div></a>`;
};
const performanceCard = (t, show) => {
    const info = show[state.lang];
    const poster = show.image
        ? `<img src="${show.image}" alt="${info.title}" loading="lazy">`
        : t.pp;
    const title = info ? info.title : t.ft;
    const credit = info ? `${info.director} · ${info.venue}` : t.fd;
    const when = info ? info.when : t.fc;
    return `<a class="card" href="${ROOT ? "" : "pages/"}performance.html?id=${show.id}"><div class="ph poster">${poster}</div><div class="bd"><span class="tag">${t[show.status]}</span><h3 class="hd">${title}</h3><span class="mu">${credit}</span><span class="mu">${when}</span><span class="more">${t.more}</span></div></a>`;
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
