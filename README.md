# NitYoga 🧘

A fast, fully static yoga site — no build step, no framework, no backend, no login.
Videos live on YouTube and load as click-to-play thumbnails (the iframe is only
injected when a visitor presses play, so pages stay light).

## Run locally

Any static file server works:

```bash
# from the repo root
python3 -m http.server 8000
# → open http://localhost:8000
```

or `npx serve .` if you prefer Node. (Opening `index.html` directly via
`file://` also works in most browsers.)

## Deploy to GitHub Pages

```bash
git init && git add -A && git commit -m "NitYoga static site"
gh repo create nityoga --public --source . --push   # or push to a repo you made on github.com
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / `/ (root)` → Save.** The site appears at
`https://<your-username>.github.io/nityoga/` in a minute or two.

No build config needed — the repo root *is* the site (`.nojekyll` is already
included so GitHub serves files as-is).

## Everything is one config file

**`config/site.config.js`** drives the entire site:

| I want to… | Edit |
|---|---|
| Change colours / theme | `theme` (CSS variables) |
| Rename the site / swap the logo | `brand` |
| Add a menu item | `nav` |
| **Add a whole new page** | add a key under `pages` + a `nav` entry |
| Add / remove a class video | `classes` (just paste the YouTube ID) |
| Change filter options | `filters` |
| Edit footer links | `footer` |

### Add a new page in 30 seconds

```js
// 1. in nav:
{ label: "Meditation", page: "meditation" },

// 2. in pages:
meditation: {
  title: "Meditation",
  blocks: [
    { type: "hero", compact: true, title: "Meditation",
      subtitle: "Guided sits for calm and clarity." },
    { type: "videoGrid", source: "classes", filters: true },
  ],
},
```

Refresh — the page and its menu item exist. Pages are composed from
**blocks**: `hero`, `stats`, `videoGrid`, `cardGrid`, `people`, `banner`,
`prose`. New block types can be added in `assets/js/blocks.js`.

### Add a class video

Upload to YouTube, copy the video link, then:

```js
{
  title: "Sunset Slow Flow",
  youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX",  // youtu.be / shorts links or a bare ID work too
  style: "Vinyasa", level: "Beginner", duration: "15–30 min",
  minutes: 22, teacher: "Ananya Rao",
  description: "Wind down the day with a soft, steady flow.",
  featured: true,   // optional: also shows on the home page
},
```

Thumbnails are pulled automatically from YouTube — nothing to upload.

## Structure

```
index.html               ← shell (never needs editing)
config/site.config.js    ← ✏️ the file you edit
assets/css/styles.css    ← theme-variable-driven styles
assets/js/
  util.js                ← helpers
  blocks.js              ← block renderers (extend here for new block types)
  pages.js               ← page assembly
  app.js                 ← header/nav/footer + hash router
assets/img/logo.svg      ← logo (lotus + rising sun)
```
