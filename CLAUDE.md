# CLAUDE.md

Read `AGENTS.md` for full project context before making any changes.

Key facts:
- This is a **one-page HTML template**, not an app. The user wants to customize content.
- Tailwind CSS 4 — edit `css/input.css` for theme, use utility classes in HTML. Never edit `css/styles.css`.
- `public/` is a complete static build for users without Node.js. Keep it in sync after changes.
- All images are WebP. Originals in `img/originals/`.
- Respect accessibility: skip link, ARIA, focus indicators, `prefers-reduced-motion`.
