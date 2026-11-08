// Contact page only. The form is front-end only for now; sending is connected with the backend later.
const contactForm = document.getElementById("contact-form");
const contactNote = document.getElementById("contact-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactNote.textContent = TEXT[state.lang].ctNote;
});