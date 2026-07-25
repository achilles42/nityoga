/* Block renderers — one function per block type declared in the config.
   To add a new block type: add a function here and register it in
   BLOCKS at the bottom. Pages in the config can then use it.
   All user-visible text goes through t() so it follows the
   selected language (en / hi / sa). */
"use strict";

/* Inline SVG icons for the top bar / socials. */
const ICONS = {
  facebook:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4V11H8v3h2.2v7h3.3z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  youtube:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z"/></svg>`,
  x:         `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>`,
  whatsapp:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.4 3.7a12 12 0 0 0 4.6 4.6c1.8.8 2.5.9 3.4.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>`,
  phone:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.8 1.8 0 0 1-2 1.8A16.8 16.8 0 0 1 3.2 6 1.8 1.8 0 0 1 5 4z"/></svg>`,
  email:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>`,
  pin:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
};

/* ---------- hero ---------- */
function blockHero(b) {
  const ctas = (b.ctas || [])
    .map((c) =>
      `<a class="btn ${c.primary ? "btn-primary" : "btn-ghost"}" href="${esc(linkHref(c))}"
          ${c.whatsapp || c.href ? `target="_blank" rel="noopener"` : ""}>${esc(t(c.label))}</a>`)
    .join("");
  return el(`
    <section class="hero ${b.compact ? "compact" : ""} ${b.image ? "has-image" : ""}">
      <div class="wrap fade-in ${b.image ? "hero-cols" : ""}">
        <div class="hero-copy">
          ${b.compact ? "" : `<span class="eyebrow">${esc(t(SITE.brand.tagline))}</span>`}
          <h1>${esc(t(b.title))}</h1>
          ${b.subtitle ? `<p class="subtitle">${esc(t(b.subtitle))}</p>` : ""}
          ${ctas ? `<div class="ctas">${ctas}</div>` : ""}
        </div>
        ${b.image ? `
        <div class="hero-art" aria-hidden="true">
          <img src="${esc(b.image)}" alt="" />
        </div>` : ""}
      </div>
    </section>`);
}

/* ---------- stats ---------- */
function blockStats(b) {
  const items = (b.items || [])
    .map((s) => `<div class="stat"><b>${esc(t(s.value))}</b><span>${esc(t(s.label))}</span></div>`)
    .join("");
  return el(`<section class="section"><div class="wrap"><div class="stats">${items}</div></div></section>`);
}

/* ---------- video grid (with optional filters) ---------- */
function videoCard(v) {
  const id = videoId(v);
  const card = el(`
    <article class="video-card fade-in">
      <div class="player">
        <button class="thumb-btn" type="button" aria-label="Play ${esc(v.title)}">
          <img loading="lazy" src="${esc(ytThumb(id))}" alt="${esc(v.title)} — video thumbnail" />
          <span class="play-badge" aria-hidden="true"></span>
          ${v.minutes ? `<span class="duration-chip">${esc(v.minutes)} min</span>` : ""}
        </button>
      </div>
      <div class="video-meta">
        <div class="tags">
          ${v.style ? `<span class="tag">${esc(v.style)}</span>` : ""}
          ${v.level ? `<span class="tag level">${esc(v.level)}</span>` : ""}
        </div>
        <h3>${esc(t(v.title))}</h3>
        ${v.teacher ? `<p class="teacher">${esc(str("with"))} ${esc(v.teacher)}</p>` : ""}
        ${v.description ? `<p class="desc">${esc(t(v.description))}</p>` : ""}
      </div>
    </article>`);

  // Swap the thumbnail for a real YouTube iframe only on click.
  card.querySelector(".thumb-btn").addEventListener("click", () => {
    const player = card.querySelector(".player");
    player.innerHTML =
      `<iframe src="${esc(ytEmbed(id))}" title="${esc(v.title)}"
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
        ${b.title ? `<div class="section-head"><h2>${esc(t(b.title))}</h2>${b.subtitle ? `<p>${esc(t(b.subtitle))}</p>` : ""}</div>` : ""}
      </div>
    </section>`);
  const wrap = section.querySelector(".wrap");

  const grid = el(`<div class="video-grid"></div>`);
  const state = {};

  function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
      grid.append(el(`<div class="empty" style="grid-column:1/-1">${esc(str("noMatch"))}</div>`));
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
      count.textContent = `${list.length} ${str("classesWord")}`;
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

    const clear = el(`<button class="clear" type="button">${esc(str("clearFilters"))}</button>`);
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
      <h3>${esc(t(c.title))}</h3>
      <p>${esc(t(c.text))}</p>`;
    return c.href
      ? `<a class="card" href="${esc(c.href)}">${inner}</a>`
      : `<div class="card">${inner}</div>`;
  }).join("");
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(t(b.title))}</h2>${b.subtitle ? `<p>${esc(t(b.subtitle))}</p>` : ""}</div>` : ""}
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
      <p class="role">${esc(t(p.role))}</p>
      <p class="bio">${esc(t(p.bio))}</p>
    </div>`).join("");
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(t(b.title))}</h2></div>` : ""}
      <div class="people-grid">${people}</div>
    </div></section>`);
}

/* ---------- banner ---------- */
function blockBanner(b) {
  const external = b.cta && (b.cta.href || b.cta.whatsapp);
  return el(`
    <section class="section"><div class="wrap">
      <div class="banner">
        <div class="grow">
          <h2>${esc(t(b.title))}</h2>
          ${b.text ? `<p>${esc(t(b.text))}</p>` : ""}
        </div>
        ${b.cta ? `<a class="btn btn-accent" href="${esc(linkHref(b.cta))}" ${external ? `target="_blank" rel="noopener"` : ""}>${esc(t(b.cta.label))}</a>` : ""}
      </div>
    </div></section>`);
}

/* ---------- prose (trusted HTML from the config file) ---------- */
function blockProse(b) {
  return el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(t(b.title))}</h2></div>` : ""}
      <div class="prose">${t(b.html) || ""}</div>
    </div></section>`);
}

/* ---------- gallery (with lightbox) ---------- */
function blockGallery(b) {
  const images = b.images || SITE.gallery || [];
  const section = el(`
    <section class="section"><div class="wrap">
      ${b.title ? `<div class="section-head"><h2>${esc(t(b.title))}</h2></div>` : ""}
      <div class="gallery-grid"></div>
    </div></section>`);
  const grid = section.querySelector(".gallery-grid");

  images.forEach((img) => {
    const caption = t(img.caption) || "";
    const fig = el(`
      <figure class="gallery-item fade-in">
        <button type="button" aria-label="${esc(caption || "View photo")}">
          <img loading="lazy" src="${esc(img.src)}" alt="${esc(caption)}" />
        </button>
        ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}
      </figure>`);
    fig.querySelector("button").addEventListener("click", () => openLightbox(img.src, caption));
    grid.append(fig);
  });
  return section;
}

function openLightbox(src, caption) {
  const box = el(`
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="${esc(caption || "Photo")}">
      <button class="lightbox-close" type="button" aria-label="${esc(str("close"))}">✕</button>
      <figure>
        <img src="${esc(src)}" alt="${esc(caption || "")}" />
        ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}
      </figure>
    </div>`);
  const close = () => { box.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lightbox-close")) close(); });
  document.addEventListener("keydown", onKey);
  document.body.append(box);
}

/* ---------- payment ---------- */
function blockPayment() {
  const p = SITE.payment || {};
  const upi = p.upi || {};
  const bank = p.bank || {};
  const upiLink = `upi://pay?pa=${encodeURIComponent(upi.id || "")}&pn=${encodeURIComponent(upi.payee || "")}&cu=INR`;
  return el(`
    <section class="section"><div class="wrap">
      <div class="pay-grid">
        <div class="pay-card">
          <h3>UPI</h3>
          <img class="qr" src="${esc(upi.qr || "")}" alt="UPI QR code" />
          <p class="hint">${esc(str("scanQr"))}</p>
          <p class="upi-id"><code>${esc(upi.id || "")}</code></p>
          <a class="btn btn-primary" href="${esc(upiLink)}">${esc(str("payViaUpi"))}</a>
        </div>
        <div class="pay-card">
          <h3>${esc(str("bankTransfer"))}</h3>
          <dl class="bank-dl">
            <dt>${esc(str("accountName"))}</dt><dd>${esc(bank.accountName || "")}</dd>
            <dt>${esc(str("accountNumber"))}</dt><dd>${esc(bank.accountNumber || "")}</dd>
            <dt>${esc(str("ifsc"))}</dt><dd>${esc(bank.ifsc || "")}</dd>
            <dt>${esc(str("bank"))}</dt><dd>${esc(bank.bankName || "")}</dd>
          </dl>
          ${p.note ? `<p class="pay-note">${esc(t(p.note))}</p>` : ""}
          <a class="btn btn-ghost" href="${esc(waLink())}" target="_blank" rel="noopener">${esc(str("chatWhatsapp"))}</a>
        </div>
      </div>
    </div></section>`);
}

/* ---------- contact (info + enquiry form) ---------- */
function blockContact() {
  const c = SITE.contact || {};
  const section = el(`
    <section class="section"><div class="wrap">
      <div class="contact-grid">
        <div class="contact-info">
          <p class="ci"><span class="ci-icon">${ICONS.pin}</span><span><b>${esc(str("addressLabel"))}</b><br>${esc(t(c.address))}</span></p>
          <p class="ci"><span class="ci-icon">${ICONS.phone}</span><span><b>${esc(str("phoneLabel"))}</b><br><a href="tel:${esc((c.phone || "").replace(/\s/g, ""))}">${esc(c.phone || "")}</a></span></p>
          <p class="ci"><span class="ci-icon">${ICONS.email}</span><span><b>${esc(str("emailLabel"))}</b><br><a href="mailto:${esc(c.email || "")}">${esc(c.email || "")}</a></span></p>
          ${c.hours ? `<p class="ci"><span class="ci-icon">${ICONS.clock}</span><span><b>${esc(str("hoursLabel"))}</b><br>${esc(t(c.hours))}</span></p>` : ""}
          <p class="or-wa">${esc(str("orWhatsapp"))}</p>
          <a class="btn btn-primary btn-wa" href="${esc(waLink())}" target="_blank" rel="noopener">
            <span class="wa-ic">${ICONS.whatsapp}</span>${esc(str("chatWhatsapp"))}
          </a>
        </div>
        <form class="contact-form">
          <label>${esc(str("name"))}<input name="name" required autocomplete="name" /></label>
          <label>${esc(str("emailLabel"))}<input name="email" type="email" required autocomplete="email" /></label>
          <label>${esc(str("phoneLabel"))}<input name="phone" type="tel" autocomplete="tel" /></label>
          <label>${esc(str("service"))}
            <select name="service">
              ${(c.services || []).map((s) => `<option>${esc(t(s))}</option>`).join("")}
            </select>
          </label>
          <label>${esc(str("message"))}<textarea name="message" rows="4" required></textarea></label>
          <button class="btn btn-primary" type="submit">${esc(str("send"))}</button>
        </form>
      </div>
    </div></section>`);

  const form = section.querySelector("form");
  if (c.formAction) {
    // A form backend (Formspree etc.) receives the submission directly.
    form.action = c.formAction;
    form.method = "POST";
  } else {
    // No backend on a static site — open the visitor's email app pre-filled.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const body = ["name", "email", "phone", "service", "message"]
        .map((k) => `${k}: ${d.get(k) || ""}`).join("\n");
      location.href = `mailto:${c.email}?subject=${encodeURIComponent("Enquiry — " + SITE.brand.name)}&body=${encodeURIComponent(body)}`;
    });
  }
  return section;
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
  gallery: blockGallery,
  payment: blockPayment,
  contact: blockContact,
};
