# AGENTS.md — Core Template

> Context for AI coding agents working on this project.

## What This Is

This is a **one-page HTML template** — not an app, not a framework. The user downloaded this template and wants to customize it for their own business or project. Your job is to help them adapt content, styling, and structure to their needs.

## Your Role

Help the user:
- Change text, images, and branding
- Adjust colors, fonts, and spacing
- Add, remove, or reorder sections
- Add new pages (duplicate `index.html` as a starting point)
- Connect forms to backends (Formspree, Netlify Forms, etc.)
- Deploy to static hosting

Do not:
- Introduce JavaScript frameworks (React, Vue, etc.)
- Add a build pipeline beyond what exists (Tailwind CLI + terser)
- Rewrite the CSS architecture — use Tailwind utility classes in HTML
- Remove accessibility features (skip link, ARIA attributes, focus indicators, reduced-motion support)

## File Structure

```
public/             ← COMPLETE STATIC BUILD — ready to deploy, no Node.js needed
├── index.html      ← Same content as root index.html, references minified assets
├── css/styles.css  ← Minified Tailwind output
├── js/main.js      ← Minified JS (terser output)
├── fonts/          ← Font files
└── img/            ← All images

index.html          ← Source landing page (for development with Tailwind)
404.html            ← Custom 404 page
css/input.css       ← Tailwind source: @font-face, @theme (color tokens), custom CSS
css/styles.css      ← GENERATED. Never edit. Overwritten by Tailwind CLI.
js/main.js          ← Vanilla JS: mobile nav, scroll animations, modals, gradient effects
fonts/              ← Geist variable font (woff2, loaded locally)
img/                ← WebP images used on the page
img/originals/      ← Original source images (JPG) for re-optimization
```

**Two ways to work:**
- **With Tailwind** (recommended): Edit root `index.html` + `css/input.css`, run `npm run dev`. New utility classes work immediately.
- **Without Tailwind**: Edit `public/index.html` directly. Only Tailwind classes already in the compiled CSS will work. Good enough for text/image changes and simple edits.

## CSS / Styling

**Tailwind CSS 4** with utility classes directly in HTML. The design system is defined in `css/input.css`:

```css
@theme {
  --color-background: oklch(6% 0 0);            /* page background */
  --color-foreground: oklch(93% 0 0);            /* primary text */
  --color-muted-foreground: oklch(60% 0 0);      /* secondary text — must stay above 4.5:1 contrast vs background */
  --color-border: oklch(18% 0 0);                /* borders, dividers */
  --color-muted: oklch(11% 0 0);                 /* subtle backgrounds */
  --color-primary: oklch(93% 0 0);               /* buttons, emphasis */
  --color-primary-foreground: oklch(6% 0 0);     /* text on primary */
  --color-accent: oklch(14% 0 0);                /* accent backgrounds */
  --color-accent-foreground: oklch(93% 0 0);     /* text on accent */
}
```

Key classes used throughout:
- `text-foreground`, `text-muted-foreground` — text colors
- `bg-background`, `bg-black`, `bg-muted` — backgrounds
- `border-border` — borders
- `max-w-5xl mx-auto px-6` — content container (1024px)

When adding new elements, use these existing tokens. Do not hardcode colors.

## Sections in index.html

The page uses this structure (in order):

| Section | ID | Description |
|---------|----|-------------|
| Nav | `main-header` | Sticky header, shrinks on scroll. Desktop links + mobile hamburger. |
| Hero | `#about` | Headline, subtext, animated SVG rings, team avatars. |
| Trust Bar | (no ID) | 6-column logo grid. `aria-label` for accessibility. |
| Approach | `#features` | Three zigzag rows: text + dark UI card illustrations. Background images with `data-fade-bg` scroll effect. |
| Founders | `#team` | Two team cards with photos on a floral background. |
| Timeline | (no ID) | Left: sticky heading. Right: vertical timeline with pulsing dot. |
| Pricing | `#pricing` | Two pricing cards on a floral background. Radial gradient + border styling. |
| Contact | `#contact` | Centered form card with subtle shadow. |
| Footer | `<footer>` | Logo, legal/privacy modal buttons, social icons. |
| Legal Modal | `#modal-legal` | `<dialog>` — Terms of Service + Imprint |
| Privacy Modal | `#modal-privacy` | `<dialog>` — Privacy Policy |

## Animations

Scroll-triggered via `data-animate` attributes + IntersectionObserver in `main.js`:

```html
<div data-animate>              <!-- fade up (default) -->
<div data-animate="fade">       <!-- fade only -->
<div data-animate="slide-left"> <!-- slide from left -->
<div data-animate data-delay="2"> <!-- 200ms stagger -->
```

CSS transitions are in `input.css`. JS adds `.is-visible` class when element enters viewport.

All animations are disabled when `prefers-reduced-motion: reduce` is set (both CSS and JS check this).

## Images

- All images in HTML are **WebP** format for performance
- Source originals are in `img/originals/` (JPG/JPEG)
- Background images (florals) are set via inline `style="background: url(...)"` on approach/founders/pricing sections
- `<img>` tags have `width`, `height`, and `loading="lazy"` attributes — keep these when adding new images

## JavaScript

`js/main.js` is vanilla JS (no modules, no bundler). Uses IIFEs for scope isolation. Features:

- Hero SVG ring glow animation (respects reduced-motion)
- Gradient containers that expand on scroll
- Background image fade-in on scroll (`data-fade-bg`)
- Navbar shrink on scroll
- Mobile menu toggle with focus trap and Escape key
- Scroll animations (IntersectionObserver)
- Dialog open/close with scroll lock

When adding interactivity, follow the existing pattern: IIFE, feature-detect, respect reduced-motion.

## Setup & Install

```bash
npm install      # Install devDependencies (Tailwind CLI, BrowserSync, terser)
```

This only installs dev tooling. The template itself has **zero runtime dependencies** — the output is plain HTML/CSS/JS.

If `npm install` fails, check Node.js version (18+ required for Tailwind CSS 4).

## Dev vs. Production

### Development (`npm run dev`)

- Starts Tailwind in watch mode + BrowserSync on `http://localhost:3000`
- CSS is recompiled on every save (unminified for readability)
- BrowserSync injects changes and auto-reloads the browser
- `css/styles.css` is regenerated continuously — never edit it directly

```bash
npm run dev
```

### Production (`npm run build`)

- One-shot compile: minifies CSS (`--minify` flag) and JS (terser)
- Output: `css/styles.css` (minified) + `js/main.min.js` (minified)
- After build, the entire directory can be deployed as static files
- No Node.js needed on the server — just upload the files

```bash
npm run build
```

**Note:** `index.html` references `js/main.js` (unminified). For production, the user can switch to `js/main.min.js` or configure their hosting to serve the minified version. Both files are included after build.

### Without Node.js

The pre-compiled `css/styles.css` works out of the box. Users who don't want to install Node.js can edit HTML directly and use Tailwind classes that are already in the compiled CSS. New utility classes that aren't in the compiled CSS won't work without running the Tailwind CLI.

## Deployment

Static files only — no server-side code. Works on Vercel, Netlify, GitHub Pages, or any web server. A `vercel.json` is included.

Before deploying, the user should replace all `example.com` references with their actual domain:
- `og:url`, `og:image`, `twitter:image` in `<head>`
- `<link rel="canonical">`
- `sitemap.xml`
- `robots.txt`
- JSON-LD structured data
