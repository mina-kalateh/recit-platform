// Shared by the homepage and the listing pages: card data and card templates.
// To add an item, add one object to the matching array.

// ---------- Card data (keys point into TEXT) ----------
const ROOT = location.pathname.includes("/pages/") ? "../" : "";

const PLAYS = [
    {
        id: "waiting-for-godot",
        tag: "t1",
        buy: "https://taaghche.com/book/23147/%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%B8%D8%A7%D8%B1-%DA%AF%D9%88%D8%AF%D9%88",
        image: "../assets/images/waiting-for-Godot.webp",
        fa: { title: "انتظار برای گدوت", author: "ساموئل بکت", year: "۱۹۵۲", desc: "دو مرد کنار یک درخت منتظر کسی به نام گدوت‌اند که هرگز از راه نمی‌رسد." },
        en: { title: "Waiting for Godot", author: "Samuel Beckett", year: "1952", desc: "Two men wait by a tree for someone named Godot, who never arrives." }
    },
    {
        id: "death-of-a-salesman",
        tag: "t2",
        buy: "https://taaghche.com/book/83635/%D9%85%D8%B1%DA%AF-%D9%81%D8%B1%D9%88%D8%B4%D9%86%D8%AF%D9%87",
        image: "../assets/images/death-of-a-salesman.webp",
        fa: { title: "مرگ یک فروشنده", author: "آرتور میلر", year: "۱۹۴۹", desc: "نمایشنامه مرگ فروشنده روایت مرد فروشنده‌ای است که سال‌ها به همسرش خیانت می‌کند و حالا در واپسین روزهای زندگی از این کار پشیمان می‌شود و قصد دارد به همسرش بگوید." },
        en: { title: "Death of a salesman", author: "Arthur Miller", year: "1949", desc: "The play *Death of a Salesman* tells the story of a salesman who has been unfaithful to his wife for years; now, in the final days of his life, he regrets his actions and intends to confess to her." }
    },
    {
        id: "amiz-ghalamdon",
        tag: "t3",
        buy: "https://taaghche.com/book/201159/%D8%A2%D9%85%DB%8C%D8%B2-%D9%82%D9%84%D9%85%D8%AF%D9%88%D9%86",
        image: "../assets/images/amiz-ghalamdon.webp",
        fa: { title: "آمیز قلمدون", author: "اکبر ‌رادی", year: "۱۳۹۷", desc: "نمایشنامهٔ آمیز قلمدون حاوی داستان زندگی «آقای شکوهی»، پیرمردی بازنشسته و اهل فرهنگ و ادب و همسرش «شوکت خانم» است. آقای شکوهی و همسرش زندگی ساده‌ای دارند." },
        en: { title: "Amiz Ghalamdon", author: "Akbar Radi", year: "1397", desc: "The play *Amiz Ghalamdun* tells the story of the lives of Mr. Shokuhi—an elderly, retired man with an appreciation for culture and literature—and his wife, Shokat Khanum. Mr. Shokuhi and his wife lead a simple life." }

    },

    {
        id: "oedipus-rex",
        tag: "t1",
        buy: "https://taaghche.com/book/203475/%D8%A7%D8%AF%DB%8C%D9%BE",
        image: "../assets/images/oedipus-rex_poster.webp",
        fa: { title: "ادیپ شهریار", author: "سوفوکل", year: "۲۰۱۵", desc: "«اودیپ شهریار» قسمت اول از یک سه‌گانه با عنوان «افسانه‌های تبای» نوشتهٔ نمایشنامه‌نویس یونانی، سوفوکل است که در ۴۲۹ پیش از میلاد به روی صحنه رفت. این تراژدی دنیای دوگانه و ناهم‌ساز خدایان و آدمیان را نشان داده که هر یک قوانین خاص خود را دارد؛ به عبارت دیگر مسئله‌ای که در این تراژدی مطرح می‌شود، برخورد بشر است با تقدیر." },
        en: { title: "Oedipus Rex", author: "Sophocles", year: "2015", desc: "*Oedipus the King* is the first part of a trilogy titled *The Theban Plays*, written by the Greek playwright Sophocles and first staged in 429 BC. This tragedy depicts a dual and discordant world—comprising both gods and humans—where each realm operates under its own distinct laws; in other words, the central issue explored in this tragedy is humanity’s encounter with fate." }

    },
    {
        id: "the-pillowman",
        tag: "t2",
        buy: "https://www.iranketab.ir/book/748-the-pillowman",
        image: "../assets/images/the-pillowman.webp",
        fa: { title: "مرد بالشی", author: "مارتین مکدوناق", year: "۲۰۰۳", desc: "کتاب مرد بالشی، نمایشنامه ای نوشته ی مارتین مک دونا است که برای نخستین بار در سال 2003 به چاپ رسید." },
        en: { title: "The Pillowman", author: "Martin McDonagh", year: "2003", desc: "*The Pillowman* is a play written by Martin McDonagh, which was first published in 2003." }

    },
    {
        id: "night-on-the-wet-pavement",
        tag: "t3",
        buy: "https://taaghche.com/book/201153/%D8%B4%D8%A8-%D8%B1%D9%88%DB%8C-%D8%B3%D9%86%DA%AF%D9%81%D8%B1%D8%B4-%D8%AE%DB%8C%D8%B3",
        image: "../assets/images/night-on-the-wet-pavement.webp",
        fa: { title: "شب روی سنگفرش خیس", author: "اکبر رادی", year: "۱۴۰۲", desc: "کتاب شب روی سنگفرش خیس نمایشنامه‌ای است که توسط «غلامحسین مجلسی»، استاد بازنشستۀ ادبیات روایت می­‌شود و وقایع داستان حول محور خانوادۀ او، دخترش «نوشین» و خواهرش «رخساره» پیش می‌رود." },
        en: { title: "Night on the Wet Pavement", author: "Akbar Radi", year: "1402", desc: "The book *Night on the Wet Pavement* is a play narrated by Gholamhossein Majlesi, a retired literature professor; the events of the story revolve around his family—his daughter, Nooshin, and his sister, Rokhsareh." }

    }
];
const PERFORMANCES = [
    {
        id: "haversham",
        status: "now",
        genre: "g3",
        tiwall: "https://www.tiwall.com/p/ghatl.emarat6",
        image: "../assets/images/the-murder-of-mr-haversham.webp",
        fa: { title: "قتل آقای هاورشام", director: "فراز ‌غلامی", venue: "پردیس تئاتر موسیقی شهرزاد", when: "از ۴ شهریور · ساعت ۱۸:۰۰", desc: "وقتی در یک شب همه چیز برای یک گروه تئاتر و مخاطبانش به بدترین شکل ممکن پیش می رود.", address: "خیابان حافظ، خیابان نوفل‌لوشاتو،‌ بعد از سفارت ایتالیا، شماره ۷۶" },
        en: { title: "The Murder of Mr Haversham", director: "Faraz Gholami", venue: "Shahrzad theater", when: "From 26 Aug · 18:00", desc: "One night, everything goes wrong in the worst possible way for a theatre company and its audience.", address: "No. 76, Neauphle-le-Château St., Hafez St., after the Italian Embassy" },
        gallery: [
            "../assets/images/haversham-1.webp",
            "../assets/images/haversham-2.webp",
            "../assets/images/haversham-3.webp",
            "../assets/images/haversham-4.webp"
        ],
        teaser: "../assets/videos/haversham.mp4"
    },
    {
        id: "moonwalk",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/moonwalk",
        image: "../assets/images/moonwalk.webp",
        fa: { title: "مون‌واک", director: "سجاد ‌داغستانی", venue: "تئاتر هامون", when: "از ۱۴ آذر · ساعت ۲۱:۰۰", desc: "نمایش «مون‌واک» روایت انسان‌هایی است که سال‌ها برای رسیدن به رویاهایشان تلاش کرده‌اند، اما با برداشتن هر قدم، بیشتر از آن‌ها دور شده‌اند.", address: "خیابان فلسطین، پایین تر از خیابان انقلاب، پلاک ۲۹۲/۱" },
        en: { title: "Moonwalk", director: "Sajad Daghestani", venue: "Hamoon theatre", when: "From 5 Dec · 21:00", desc: "The play 'Moonwalk' tells the story of individuals who have spent years striving to achieve their dreams, yet with every step they take, they find themselves drifting further away from them.", address: "292/1 Palestine Street, below Enghelab Street" },
        gallery: [
            "../assets/images/moonwalk-1.webp",
            "../assets/images/moonwalk-2.webp",
            "../assets/images/moonwalk-3.webp",
            "../assets/images/moonwalk-4.webp"
        ]

    },
    {
        id: "Shoolbasi",
        status: "now",
        genre: "g1",
        tiwall: "https://www.tiwall.com/p/shoul2",
        image: "../assets/images/shoulbasi.webp",
        fa: { title: "شولباسی", director: "عقیل ‌زمانی", venue: "تئاتر هامون", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰", desc: "در سبد لباس یک خانه، لباس‌هایی زندگی مخفی و کاملا انسانی خودشان را دارند. عاشق می‌شوند، رقابت می‌کنند، می‌ترسند و به هم پناه می‌برند. وقتی ماشین لباس‌شویی مثل موجودی اسرار‌آمیز و ترسناک وارد دنیای‌شان می‌شود، این جمع کوچک باید بین وحشت از ناشناخته و کشف صمیمیتی تازه دست و پا بزنند.", address: "خیابان فلسطین، پایین تر از خیابان انقلاب، پلاک ۲۹۲/۱" },
        en: { title: "Shoolbasi", director: "Aghil Zamani", venue: "Hamoon theatre", when: "From 25 Dec Until 6 Nov · 18:30", desc: "Inside a household laundry basket, garments lead their own secret, distinctly human lives. They fall in love, compete, experience fear, and seek refuge in one another. When a washing machine—like some mysterious and terrifying creature—enters their world, this small community must navigate the tension between the dread of the unknown and the discovery of a newfound intimacy.", address: "Palestine Street, below Enghelab Street, No. 292/1" },
        gallery: [
            "../assets/images/Shoolbasi-1.webp",
            "../assets/images/Shoolbasi-2.webp",
            "../assets/images/Shoolbasi-3.webp",
            "../assets/images/Shoolbasi-4.webp"
        ]
    },
    {
        id: "shahrag",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/shahrag2",
        image: "../assets/images/shahrag.webp",
        fa: { title: "شاه رگ", director: "شادی ‌امیری", venue: "تئاتر هامون", when: "از ۸ آذر · ساعت ۱۹:۰۰", desc: "در شبی طوفانی مردی که به دختر کوچکِ لیدی مالوری علاقمند شده برای ضیافت شام به عمارت آنها میاید ، اما اینجا یک شام ساده ، تبدیل به صحنه ای می‌شود که هیچ کس برای آن آماده نیست.", address: "خیابان فلسطین، پایین تر از خیابان انقلاب، پلاک ۲۹۲/۱" },
        en: { title: "Life Line", director: "Shadi Amiri", venue: "Hamoon theatre", when: "From 29 Nov · 19:00", desc: "On a stormy night, a man who has taken an interest in Lady Mallory’s young daughter arrives at their mansion for dinner—but what begins as a simple meal turns into a scene for which no one is prepared.", address: "292/1 Palestine Street, below Enghelab Street" },
        gallery: [
            "../assets/images/shahrag-1.webp",
            "../assets/images/shahrag-2.webp",
            "../assets/images/shahrag-3.webp",
            "../assets/images/shahrag-4.webp"
        ]
    },
    {
        id: "ibehtwoautumn",
        status: "soon",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/paeiz8",
        image: "../assets/images/paeiz.webp",
        fa: { title: "من، بیه‌دو، پاییز", director: "زهره ‌یحیایی", venue: "تماشاخانه ‌جوانمرد", when: "از ۱۵ آذر · ساعت ۱۹:۰۰", desc: "نه، گمان نمی‌کنم عشق پایدار بماند...عشق هم به کوتاهی‌اش، به شورانگیزی و تلاطم‌اش عشق می‌شود وگرنه همه‌اش می‌شود همین روزمرگی‌هایی که ما می‌گذرانیم. از پس روزها و شب‌های تکراری و بوسه‌های از سر وظیفه و گفتگوهای کسالت‌بار...", address: "خیابان نجات‌الهی، خیابان سمیه، پلاک ۲۶۰" },
        en: { title: "I, Beh Two, Autumn", director: "Zohreh Yahyaie", venue: "Tamashakhaneh theatre", when: "From 6 Nov · 19:00", desc: "No, I don’t think love is meant to last... It is precisely in its brevity, its intensity, and its turbulence that love truly becomes love; otherwise, it would just devolve into the same mundane routine we live through—endless, repetitive days and nights, kisses given out of mere obligation, and tedious conversations...", address: "260 Somayyeh Street, Nejatollahi Street" }
    },
    {
        id: "lotteries",
        status: "now",
        genre: "g4",
        tiwall: "https://www.tiwall.com/p/lutriha",
        image: "../assets/images/lutriha.webp",
        fa: { title: "لوتری‌ها", director: "سیما ‌شکری", venue: "تئاتر آبی", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰", desc: "زنی در طول دوران جنگ‌های مذهبی آلمان، دو پسر خود را از دست می‌دهد و برای زنده ماندن تنها دخترش تلاش می‌کند.", address: "خیابان ولیعصر بالاتر از چهارراه طالقانی، بعد از کوچه ریاض، پلاک ۱۵۹۵" },
        en: { title: "lotteries", director: "Sima Shokri", venue: "Blue theatre", when: "From 25 Dec Until 6 Nov · 18:30", desc: "During the German religious wars, a woman loses her two sons and struggles to keep her only daughter alive.", address: "Valiasr Street, above Taleghani Intersection, past Riaz Alley, No. 1595" },
        gallery: [
            "../assets/images/lotteries-1.webp",
            "../assets/images/lotteries-2.webp",
            "../assets/images/lotteries-3.webp",
            "../assets/images/lotteries-4.webp"
        ]
    },
    {
        id: "sahrahSuzanne",
        status: "now",
        genre: "g2",
        tiwall: "https://www.tiwall.com/p/saherehsoozan",
        image: "../assets/images/saherehsoozan.webp",
        fa: { title: "ساحره سوزان", director: "ستاره ‌افشون", venue: "تئاتر مرکزی", when: "از ۴ آبان تا ۱۵ آبان · ساعت ۱۸:۳۰", desc: "اتفاقات نمایش برگرفته از وقایع تاریخی در شهر سْیلِم ایالت ماساچوست آمریکاست.", address: "رشت، بلوار انصاری، بلوار احمدزاده، جنب بوستان ملت" },
        en: { title: "Sahrah Suzanne", director: "Setareh Afshon", venue: "Center theatre", when: "From 25 Dec Until 6 Nov · 18:30", desc: "The events in the play are based on historical occurrences in the town of Salem, Massachusetts, USA.", address: "Rasht, Ansari Blvd., Ahmadzadeh Blvd., next to Mellat Park" },
        gallery: [
            "../assets/images/sahrahSuzanne-1.webp",
            "../assets/images/sahrahSuzanne-2.webp",
            "../assets/images/sahrahSuzanne-3.webp",
            "../assets/images/sahrahSuzanne-4.webp"
        ]
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
    return `<a class="card v" href="${ROOT ? "" : "pages/"}play.html?id=${play.id}"><div class="ph cover">${cover}</div><div class="bd"><span class="tag">${t[play.tag]}</span><h3 class="hd">${title}</h3><span class="mu">${credit}</span><span class="more">${t.more}</span></div></a>`;
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
