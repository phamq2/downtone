# Downtone — Investor Brief

A single-page, long-form investor brief for **Downtone**, a sound-led hospitality space at 301 Grand St, NYC.

## Repo layout

- **`index.html`** — production. A single self-contained HTML file with all images, fonts, and code inlined. ~10 MB. Drop this on any static host (GitHub Pages, Netlify, S3, …) and it works. **This is the file you ship.**
- **`src/`** — editable source. Multi-file React + Babel-in-browser prototype.
  - `index.html` — entry point for local development
  - `colors_and_type.css` — Downtone brand tokens (color pairings, typography, @font-face)
  - `page.css` — page-specific styles (sections, nav, timeline, photo treatments, marquee)
  - `data.jsx` — all content (nav, phases, financials, risks, color pairings)
  - `hero.jsx` — hero section
  - `sections-mid.jsx` — overview, opportunity, projection, funding, **interactive timeline**, marquee, venue moment
  - `sections-bottom.jsx` — why now, community, assumptions, financials, risks, contact, footer
  - `page.jsx` — top-level composition (scroll progress, fixed nav, section anchors)
  - `assets/` — logos + photos
  - `fonts/` — Outfit, Instrument Serif, Bandit (self-hosted)

## Local development

The source is React + Babel-standalone (no build step). To run locally, you just need to serve the `src/` folder over HTTP — opening `index.html` directly via `file://` won't work because of CORS rules on the JSX module loads.

Pick any of these:

```bash
# Python 3
cd src && python3 -m http.server 8000

# Node (with npx)
cd src && npx serve

# VS Code
# Install "Live Server" extension, right-click src/index.html → Open with Live Server
```

Then visit `http://localhost:8000`.

## Producing a new production build

After editing `src/`, regenerate `index.html` by inlining everything into one file. The cleanest way is to ask Claude to do it (the project includes a bundler tool that handles asset inlining and resource lifting for code-referenced URLs).

Alternatively, port the source to a real build tool (Next.js, Vite, etc.) — see `design_handoff_investor_brief/README.md` (in the original project export) for a developer handoff guide with token tables, content schemas, and implementation order.

## Hosting

### GitHub Pages
1. Push this repo to GitHub (private or public).
2. Settings → Pages → Source: deploy from `main` branch / root folder.
3. Your page is live at `https://<username>.github.io/<repo-name>`.

GitHub Pages is **fully public**. If the brief is confidential, use Netlify or Vercel with their password-protection feature instead.

### Netlify (with password)
1. Drag the project folder into [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo.
2. Site settings → Access & security → Visitor access → Password protection.

### Vercel
Similar — connect the repo, deploy, then enable password protection on the deployment.

## Brand
Logos, fonts, and color tokens are part of the existing **Downtone** brand system. Don't substitute web fonts — self-host the .otf/.ttf files in `src/fonts/`.

## License
Proprietary — © Downtone. Confidential investor materials.
