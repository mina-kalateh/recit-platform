# RÉCIT

**A digital platform for theatre, performances, and stories.**

RÉCIT brings theatre plays, live performances, and theatre-related editorial content together in one place, with a visual identity inspired by the atmosphere of the stage. "Récit" is the French word for narrative.

<!-- Add a screenshot here, e.g. ![RÉCIT homepage](assets/screenshot.png) -->

## Features

**Implemented (front-end)**

- **Bilingual interface:** Persian (RTL) and English (LTR), switchable at any time.
- **Light and dark themes**, saved between visits.
- **Homepage:** hero section and continuously scrolling rows for featured plays, performances, and journal articles.
- **Scroll-reveal animations** and a theatre-curtain log in / sign up dialog.
- **About and Contact pages** (the contact form is UI only for now).
- **Responsive layout** for desktop, tablet, and mobile.
- **Accessibility:** keyboard-friendly controls, ARIA labels, and support for reduced-motion preferences.

**Planned**

- Detail pages for plays, performances, and articles, with a discussion section.
- Backend for accounts and comments.
- Search.
- Privacy page.

## Technologies

Plain HTML, CSS, and JavaScript (no frameworks or build step).

## Project Structure

```
index.html
pages/        about, contact (more to come)
css/          style.css
js/           i18n.js (translations), common.js (shared), home.js, contact.js
assets/       images and icons
```

## Project Status

**In development.** The front-end of the homepage and the static pages is working. Log in and the contact form are not connected to a server yet.

## Getting Started

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Run `index.html` with the Live Server extension (recommended, because the pages use relative links).

## Credits

Theatre posters and covers shown on the site belong to their respective owners and are used here only as sample content.

## License

No license has been selected yet.