# Core — One-Page HTML Template

A dark, modern one-page template for consultancies, agencies, and SaaS landing pages. Built with **Tailwind CSS 4** and vanilla JavaScript. No frameworks, no dependencies at runtime.

**[Live Demo](https://core.templatedeck.com)**

## Quick Start

### Option A: No setup needed

The `public/` folder contains a complete, ready-to-use version of the template with minified CSS and JS. Just open `public/index.html` in a browser, edit the HTML to change text and images, and upload the folder to any web host.

### Option B: Full development setup

```bash
npm install
npm run dev
```

Opens a dev server at `http://localhost:3000` with live reload. Edit HTML, add new Tailwind classes, save — the browser refreshes automatically. This is the way to go if you want to use new Tailwind utility classes or customize the design system.

## What's Included

```
core-template/
├── public/             ← READY TO USE — complete static site, no build needed
│   ├── index.html      ← Edit text and images here if you don't need Tailwind
│   ├── css/styles.css  ← Minified CSS
│   ├── js/main.js      ← Minified JS
│   ├── fonts/          ← Geist font files
│   └── img/            ← All images
│
├── index.html          ← Source landing page (for development with Tailwind)
├── 404.html            ← Custom 404 page
├── css/
│   ├── input.css       ← Tailwind source — colors, fonts, custom CSS
│   └── styles.css      ← Compiled output (don't edit directly)
├── js/
│   └── main.js         ← Navigation, scroll animations, modals
├── fonts/              ← Geist variable font (local, no external requests)
├── img/                ← WebP images + originals/ subfolder for source files
├── sitemap.xml         ← Update with your production URL
├── robots.txt          ← Update with your production URL
├── manifest.json       ← PWA manifest
└── vercel.json         ← Vercel deployment config
```

## Customization

### Content

All content lives in `index.html`. The page has these sections:

1. **Navigation** — Logo, links, mobile menu
2. **Hero** — Headline, subtext, animated SVG graphic
3. **Trust Bar** — Six logo placeholders (SVG)
4. **Approach** — Three zigzag rows (text + UI card illustrations)
5. **Founders** — Team cards with photos
6. **Timeline** — Company history with pulsing dot
7. **Pricing** — Two pricing cards
8. **Contact** — Form with name, email, message
9. **Footer** — Brand, legal/privacy modals, social links

### Colors

Edit `css/input.css` — the theme is defined in the `@theme` block:

```css
@theme {
  --color-background: oklch(6% 0 0);            /* near-black */
  --color-foreground: oklch(93% 0 0);            /* near-white */
  --color-muted-foreground: oklch(60% 0 0);      /* gray text */
  --color-border: oklch(18% 0 0);                /* subtle borders */
  --color-muted: oklch(11% 0 0);                 /* subtle backgrounds */
  --color-primary: oklch(93% 0 0);               /* buttons, emphasis */
  --color-primary-foreground: oklch(6% 0 0);     /* text on primary */
  --color-accent: oklch(14% 0 0);                /* accent backgrounds */
  --color-accent-foreground: oklch(93% 0 0);     /* text on accent */
}
```

Change these values to shift the entire color scheme. All components reference these tokens.

### Images

Images are in `img/` as WebP files. Original source files are kept in `img/originals/` for re-optimization.

To replace an image:
1. Drop your new image into `img/`
2. Update the `src` attribute in `index.html`
3. Add `width` and `height` attributes for CLS prevention

### Fonts

The template uses [Geist](https://vercel.com/font) (variable, loaded locally). To change fonts:
1. Add your font files to `fonts/`
2. Update the `@font-face` rules in `css/input.css`
3. Update `--font-sans` in the `@theme` block

### Legal Modals

Legal Notice and Privacy Policy are `<dialog>` elements at the bottom of `index.html`. Edit the text directly — no separate pages needed.

## Animations

Add `data-animate` to any element for scroll-triggered entrance animations:

```html
<div data-animate>Fades up into view</div>
<div data-animate="fade">Fades in (no movement)</div>
<div data-animate="slide-left">Slides from left</div>
<div data-animate="slide-right">Slides from right</div>
<div data-animate="scale">Scales up</div>
```

Stagger multiple elements:
```html
<div data-animate data-delay="1">First (100ms)</div>
<div data-animate data-delay="2">Second (200ms)</div>
<div data-animate data-delay="3">Third (300ms)</div>
```

All animations respect `prefers-reduced-motion` automatically.

## Build & Deploy

```bash
npm run build    # Minifies CSS + JS for production
```

The template works with any static hosting. Just upload the files. Popular options:

- **Vercel** — `vercel.json` is included, just connect the repo
- **Netlify** — Drag & drop, or connect the repo with build command `npm run build`
- **GitHub Pages** — Push to a `gh-pages` branch
- **Any web server** — Upload all files except `node_modules/`

### Before deploying, update:

- `og:url` and `og:image` URLs in `index.html` (replace `example.com`)
- `<link rel="canonical">` href
- `sitemap.xml` URLs
- `robots.txt` sitemap URL
- `manifest.json` name and description

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Tailwind watch + BrowserSync live reload |
| `npm run build` | Minify CSS + JS for production |
| `npm run watch` | Tailwind watch only |
| `npm run serve` | BrowserSync only |

> **Important:** Don't edit `css/styles.css` directly — it's generated from `css/input.css` and will be overwritten.

## Customize with AI Coding Agents

This template includes `AGENTS.md` and `CLAUDE.md` — instruction files that give AI coding agents full context about the project. Any agent that supports these formats ([see agents.md spec](https://agents.md)) will understand the template structure, design system, and conventions automatically.

This works with [Claude Code](https://claude.ai/claude-code), [GitHub Copilot](https://github.com/features/copilot), [Cursor](https://cursor.com), and [many other agents](https://agents.md).

### Getting started

Open a terminal in the project folder and start your agent. For Claude Code:

```bash
npm install
claude
```

### Example prompts

**Setup & run:**
> "Install dependencies and start the dev server"

**Change content:**
> "Change the company name from Core to Nexus. Update the headline, meta tags, and footer."

**Replace images:**
> "Replace the team member photos with the images I put in img/new/. Convert them to WebP and update all references."

**Add a new section:**
> "Add a testimonials section between Approach and Founders. Three cards with quote, name, and company. Use the existing design style."

**Add a new page:**
> "Create an about.html page based on the existing design. Add a navigation link for it."

**Change colors:**
> "Switch the color scheme from dark to a light warm beige like the Apex template."

**Connect the form:**
> "Connect the contact form to Formspree. Add a success message after submission."

**Deploy:**
> "Update all example.com references to mycompany.com and prepare for Vercel deployment."

The agent reads `AGENTS.md` for the full technical context — file structure, CSS conventions, animation system, and build process — so you don't have to explain any of that.

## Tech Stack

- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Geist](https://vercel.com/font) — Variable font by Vercel (SIL Open Font License)
- Vanilla JavaScript — No frameworks, no runtime dependencies

## License

MIT — see [LICENSE](LICENSE) for details.

---

Made by [templatedeck.com](https://templatedeck.com)
