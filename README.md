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
| Top bar phone / email / socials | `topbar` |
| WhatsApp number & pre-filled message | `whatsapp` |
| Add a menu item (or dropdown) | `nav` (`children:` makes a dropdown) |
| **Add a whole new page** | add a key under `pages` + a `nav` entry |
| Add / remove a class video | `classes` (paste the YouTube link) |
| Change filter options | `filters` |
| **Add a gallery photo** | drop file in `assets/img/gallery/` + one line under `gallery` |
| UPI / bank payment details | `payment` (swap `assets/img/upi-qr.svg` for your real QR) |
| Contact details & enquiry form | `contact` (set `formAction` to a Formspree URL to receive submissions; empty = opens visitor's email app) |
| Edit footer links | `footer` |

### Languages (English · हिंदी · संस्कृतम्)

The top bar has a language switcher. Any text value in the config can be
either a plain string or an object:

```js
title: { en: "Find your practice", hi: "अपना अभ्यास चुनें", sa: "स्वाभ्यासं चिनु" },
```

Missing translations fall back to English automatically. Add or remove
languages in `languages`.

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
# nityoga
