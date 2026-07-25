/* Block renderers — one function per block type declared in the config.
   To add a new block type: add a function here and register it in
   BLOCKS at the bottom. Pages in the config can then use it. */
"use strict";

/* ---------- hero ---------- */
function blockHero(b) {
  const ctas = (b.ctas || [])
    .map((c, i) =>
      `<a class="btn ${c.primary ? "btn-primary" : "btn-ghost"}" href="${esc(linkHref(c))}">${esc(c.label)}</a>`)
    .join("");
  return el(`
    <section class="hero ${b.compact ? "compact" : ""}">
      <div class="wrap fade-in">
        ${b.compact ? "" : `<span class="eyebrow">${esc(SITE.brand.tagline)}</span>`}
        <h1>${esc(b.title)}</h1>
        ${b.subtitle ? `<p class="subtitle">${esc(b.subtitle)}</p>` : ""}
        ${ctas ? `<div class="ctas">${ctas}</div>` : ""}
      </div>
    </section>`);
}

/* ---------- stats ---------- */
function blockStats(b) {
  const items = (b.items || [])
    .map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
    .join("");
  return el(`<section class="section"><div class="wrap"><div class="stats">${items}</div></div></section>`);
}

/* ---------- video grid (with optional filters) ---------- */
function videoCard(v) {
  const card = el(`
    <article class="video-card fade-in">
      <div class="player">
        <button class="thumb-btn" type="button" aria-label="Play ${esc(v.title)}">
          <img loading="lazy" src="${esc(ytThumb(v.youtubeId))}" alt="${esc(v.title)} — video thumbnail" />
          <span class="play-badge" aria-hidden="true"></span>
          ${v.minutes ? `<span class="duration-chip">${esc(v.minutes)} min</span>` : ""}
        </button>
      </div>
      <div class="video-meta">
        <div class="tags">
          ${v.style ? `<span class="tag">${esc(v.style)}</span>` : ""}
          ${v.level ? `<span class="tag level">${esc(v.level)}</span>` : ""}
        </div>
        <h3>${esc(v.title)}</h3>
        ${v.teacher ? `<p class="teacher">with ${esc(v.teacher)}</p>` : ""}
        ${v.description ? `<p class="desc">${esc(v.description)}</p>` : ""}
      </div>
    </article>`);

  // Swap the thumbnail for a real YouTube iframe only on click.
  card.querySelector(".thumb-btn").addEventListener("click", () => {
    const player = card.querySelector(".player");
    player.innerHTML =
      `<iframe src="${esc(ytEmbed(v.youtubeId))}" title="${esc(v.title)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>`;
  });
  return card;
}

function blockVideoGrid(b) {
  let data = (SITE.classes || []).slice();
  if (b.featuredOnly) data = data.filter((v) => v.featured);
  if (b.limit) data = data.slice(0, b.limit);

  const section = el(`
    <section class="section">
      <div class="wrap">
        ${b.title ? `<div class="section-head"><h2>${esc(b.title)}</h2>${b.subtitle ? `<p>${esc(b.subtitle)}</p>` : ""}</div>` : ""}
      </div>
    </section>`);
  const wrap = section.querySelector(".wrap");

  const grid = el(`<div class="video-grid"></div>`);
  const state = {};

  function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
      grid.append(el(`<div class="empty" style="grid-column:1/-1">No classes match those filters — try clearing one.</div>`));
    } else {
      list.forEach((v) => grid.append(videoCard(v)));
    }
  }

  if (b.filters && SITE.filters) {
    const bar = el(`<div class="filters" role="group" aria-label="Filter classes"></div>`);
    const count = el(`<p class="count"></p>`);

    const apply = () => {
      const list = data.filter((v) =>
        Object.entries(state).every(([k, val]) => !val || v[k] === val));
      count.textContent = `${list.length} class${list.length === 1 ? "" : "es"}`;
      render(list);
    };

    for (const [key, values] of Object.entries(SITE.filters)) {
      const sel = el(`<select aria-label="${esc(key)}">
        <option value="">All ${esc(key)}s</option>
        ${values.map((v) => `<option>${esc(v)}</option>`).join("")}
      </select>`);
      sel.addEventListener("change", () => { state[key] = sel.value; apply(); });
      bar.append(sel);
    }

    const clear = el(`<button class="clear" type="button">Clear filters</button>`);
    clear.addEventListener("click", () => {
      Object.keys(state).forEach((k) => (state[k] = ""));
      bar.querySelectorAll("select").forEach((s) => (s.value = ""));
      apply();
    });
    bar.append(clear);

    wrap.append(bar, count);
    apply();
  } else {
    render(data);
  }

  wrap.append(grid);
  return section;
}

/* ---------- card grid ---------- */
function blockCardGrid(b) {
  const cards = (b.cards || []).map((c) => {
    const inner = `
      ${c.icon ? `<div class="icon">${esc(c.icon)}</div>` : ""}
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.text)}</p>`;
    return c.href
      ? `<a class="card" href="${esc(c.href)}">${inner}</a>`
      : `<div class="card">${inner}</div>`;
  }).join("");
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(b.title)}</h2>${b.subtitle ? `<p>${esc(b.subtitle)}</p>` : ""}</div>` : ""}
      <div class="card-grid">${cards}</div>
    </div></section>`);
}

/* ---------- people ---------- */
function blockPeople(b) {
  const people = (b.people || []).map((p) => `
    <div class="person fade-in">
      <div class="avatar">${p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" />`
        : esc(p.initials || p.name.split(" ").map((w) => w[0]).join(""))}</div>
      <h3>${esc(p.name)}</h3>
      <p class="role">${esc(p.role)}</p>
      <p class="bio">${esc(p.bio)}</p>
    </div>`).join("");
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(b.title)}</h2></div>` : ""}
      <div class="people-grid">${people}</div>
    </div></section>`);
}

/* ---------- banner ---------- */
function blockBanner(b) {
  return el(`
    <section class="section"><div class="wrap">
      <div class="banner">
        <div class="grow">
          <h2>${esc(b.title)}</h2>
          ${b.text ? `<p>${esc(b.text)}</p>` : ""}
        </div>
        ${b.cta ? `<a class="btn btn-accent" href="${esc(linkHref(b.cta))}" ${b.cta.href ? `target="_blank" rel="noopener"` : ""}>${esc(b.cta.label)}</a>` : ""}
      </div>
    </div></section>`);
}

/* ---------- prose (trusted HTML from the config file) ---------- */
function blockProse(b) {
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(b.title)}</h2></div>` : ""}
      <div class="prose">${b.html || ""}</div>
    </div></section>`);
}

/* Registry: block type → renderer */
const BLOCKS = {
  hero: blockHero,
  stats: blockStats,
  videoGrid: blockVideoGrid,
  cardGrid: blockCardGrid,
  people: blockPeople,
  banner: blockBanner,
  prose: blockProse,
};
