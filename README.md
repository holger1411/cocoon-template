# Static Template Framework

A clean, minimal landing page template built with **Tailwind CSS 4** and vanilla JavaScript. Personal tooling for building lead magnet HTML templates.

## Quick Start

```bash
npm install
npm run dev
```

This starts Tailwind in watch mode + a local dev server with live reload at `http://localhost:3000`. Edit HTML, add Tailwind classes, save — the browser refreshes automatically.

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Tailwind watch + BrowserSync dev server (live reload) |
| `npm run build` | One-shot CSS compile (minified, for production) |
| `npm run watch` | Tailwind watch only (no server) |
| `npm run serve` | BrowserSync server only (no CSS rebuild) |

## What's Included

| File | Purpose |
|------|---------|
| `index.html` | Landing page with 11 sections (nav, hero, features, carousel, pricing, FAQ, etc.) |
| `legal.html` | Legal/imprint page with prose styling and "in simple terms" sidebar |
| `css/styles.css` | Pre-compiled Tailwind CSS — works out of the box |
| `css/input.css` | Tailwind source file — edit this if you need to recompile |
| `js/main.js` | Dark mode toggle, mobile nav, scroll animations, carousel keyboard nav |
| `fonts/` | Geist and Geist Mono variable fonts (local, no external requests) |

## Development Workflow

1. Run `npm run dev` to start the dev server
2. Edit HTML files — add/change Tailwind classes freely
3. Edit `css/input.css` for custom CSS (fonts, animations, color tokens)
4. Browser reloads automatically on every save

> **Important:** Do not edit `css/styles.css` directly — it's generated output and will be overwritten. Edit `css/input.css` for custom CSS, or use Tailwind utility classes in HTML.

When building a new template from this framework: duplicate the directory, run `npm install`, and `npm run dev`.

## Features

- **Dark mode** — Respects system preference, with manual Light / System / Dark toggle. Preference saved in localStorage.
- **Scroll animations** — Staggered fade-in effects via `data-animate` and `data-delay` attributes. Respects `prefers-reduced-motion`.
- **Fully responsive** — Mobile-first design with hamburger navigation.
- **Accessible** — Skip-to-content link, ARIA attributes, focus indicators, semantic HTML.
- **Zero runtime dependencies** — No JavaScript frameworks. No external font loading. No CDN. Everything runs locally. Dev tools (Tailwind CLI, BrowserSync) are devDependencies only.
- **Geist font** — Beautiful variable font by Vercel, included locally.

## Animations

Add `data-animate` to any element for a fade-up entrance animation:

```html
<div data-animate>This fades in when scrolled into view</div>
```

Variants:
- `data-animate` — fade up (default)
- `data-animate="fade"` — fade only (no movement)
- `data-animate="slide-left"` — slide in from left
- `data-animate="slide-right"` — slide in from right
- `data-animate="scale"` — scale up

Stagger with `data-delay`:
```html
<div data-animate data-delay="1">First (100ms delay)</div>
<div data-animate data-delay="2">Second (200ms delay)</div>
<div data-animate data-delay="3">Third (300ms delay)</div>
```

## Tech Stack

- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS framework
- [Geist](https://vercel.com/font) — Variable font family by Vercel (SIL Open Font License)
- Vanilla JavaScript — No frameworks

## License

MIT — see [LICENSE](LICENSE) for details.

Geist font files are licensed under the [SIL Open Font License 1.1](https://github.com/vercel/geist-font/blob/main/LICENSE.TXT).
