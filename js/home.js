// Homepage only: marquee rows and the scroll reveal.

// Cards are written twice so the CSS marquee can loop seamlessly.
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
