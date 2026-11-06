var D = {
    fa: {
        sub: "تئاتر و فرهنگ", n1: "نمایشنامه‌ها", n2: "اجراها", n3: "مجله", eb: "جهانی پشت پرده", h1: "هر صحنه،", h2: "جهانی تازه.", hs: "نمایشنامه‌ها، اجراها و روایت‌هایی که روی صحنه زنده می‌شوند.", c1: "کشف نمایشنامه‌ها", c2: "اجراهای تئاتر", po: "[تصویر شاخص صحنه]", ph: "نمایشنامه‌های منتخب", all: "مشاهده‌ی همه ←", fh: "روی صحنه", jh: "از دفتر مجله", js: "نقد، تحلیل، گفت‌وگو و تاریخچه‌ی تئاتر", tag: "پنجره‌ای به جهان نمایشنامه‌ها، اجراها و هنر تئاتر.", f1: "کشف کنید", f2: "درباره‌ی RÉCIT", a1: "درباره‌ی ما", a2: "تماس با ما", a3: "حریم خصوصی",
        t1: "کلاسیک", t2: "معاصر", t3: "نمایشنامه‌های ایرانی", now: "در حال اجرا", soon: "به‌زودی", pt: "[عنوان نمایشنامه]", pa: "[نویسنده] · [سال]", cv: "[جلد]", pp: "[پوستر]", ft: "[عنوان اجرا]", fd: "[کارگردان] · [سالن]", fc: "[شهر] · [تاریخ]", at: "[عنوان مقاله]", k1: "نقد · [تاریخ]", k2: "گفت‌وگو · [تاریخ]", k3: "تاریخچه · [تاریخ]", im: "[تصویر]",
        lang: "EN", sr: "جست‌وجو", toL: "روشن شدن سالن", toD: "شروع نمایش"
    },
    en: {
        sub: "Theatre & Culture", n1: "Plays", n2: "Performances", n3: "Journal", eb: "A WORLD BEHIND THE CURTAIN", h1: "Every stage,", h2: "a new world.", hs: "Plays, performances and stories that come alive on stage.", c1: "Discover plays", c2: "Theatre performances", po: "[Hero stage image]", ph: "Featured plays", all: "View all →", fh: "On stage", jh: "From the journal", js: "Criticism, analysis, conversations and the history of theatre", tag: "A window into the world of plays, performances and the art of theatre.", f1: "Discover", f2: "About RÉCIT", a1: "About us", a2: "Contact", a3: "Privacy",
        t1: "Classic Drama", t2: "Contemporary", t3: "Iranian Plays", now: "Now playing", soon: "Coming soon", pt: "[Play title]", pa: "[Author] · [Year]", cv: "[Cover]", pp: "[Poster]", ft: "[Performance title]", fd: "[Director] · [Venue]", fc: "[City] · [Date]", at: "[Article title]", k1: "Review · [Date]", k2: "Interview · [Date]", k3: "History · [Date]", im: "[Image]",
        lang: "فا", sr: "Search", toL: "House lights up", toD: "Lights down, show starts"
    }
};
var S = { lang: "fa", theme: "dark" };
try { S.lang = localStorage.getItem("ll") || "fa"; S.theme = localStorage.getItem("lt") || "dark" } catch (e) { }
function fill(id, html) {
    var dup = html.replace(/<a class="card/g, '<a aria-hidden="true" tabindex="-1" class="card');
    document.getElementById(id).innerHTML = html + dup;
}
function render() {
    var t = D[S.lang], h = document.documentElement;
    h.lang = S.lang; h.dir = S.lang === "fa" ? "rtl" : "ltr"; h.setAttribute("data-theme", S.theme);
    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t[n.getAttribute("data-i18n")] });
    var L = document.getElementById("lang"); L.textContent = t.lang; L.setAttribute("aria-label", S.lang === "fa" ? "English" : "فارسی");
    document.getElementById("search").setAttribute("aria-label", t.sr);
    var B = document.getElementById("theme"), l = S.theme === "dark" ? t.toL : t.toD;
    B.setAttribute("aria-label", l); B.setAttribute("data-tip", l); B.setAttribute("aria-pressed", S.theme === "light"); fill("plays-l", ["t1", "t2", "t3", "t1", "t2", "t3"].map(function (k) { return '<a class="card v" href="#"><div class="ph" style="aspect-ratio:3/4">' + t.cv + '</div><div class="bd"><span class="tag">' + t[k] + '</span><h3 class="hd">' + t.pt + '</h3><span class="mu">' + t.pa + '</span></div></a>' }).join(""));
    fill("perf-l", ["now", "soon", "now", "soon"].map(function (k) { return '<a class="card" href="#"><div class="ph" style="width:140px;flex:none">' + t.pp + '</div><div class="bd"><span class="tag">' + t[k] + '</span><h3 class="hd">' + t.ft + '</h3><span class="mu">' + t.fd + '</span><span class="mu">' + t.fc + '</span></div></a>' }).join(""));
    fill("j-l", ["k1", "k2", "k3", "k1", "k2"].map(function (k) { return '<a class="card v" href="#"><div class="ph" style="aspect-ratio:16/9">' + t.im + '</div><div class="bd"><span class="ct">' + t[k] + '</span><h3 class="hd">' + t.at + '</h3></div></a>' }).join(""));
}
document.getElementById("lang").onclick = function () { S.lang = S.lang === "fa" ? "en" : "fa"; try { localStorage.setItem("ll", S.lang) } catch (e) { } render() };
document.getElementById("theme").onclick = function () { S.theme = S.theme === "dark" ? "light" : "dark"; try { localStorage.setItem("lt", S.theme) } catch (e) { } render() };
render();

