/* App shell: theme, top bar, header/nav, footer, WhatsApp float,
   language switcher, hash router.
   renderChrome() rebuilds everything outside <main>, so switching
   language re-renders the whole UI in place. */
"use strict";

(function init() {
  /* ---- theme: push config colours into CSS variables ---- */
  for (const [k, v] of Object.entries(SITE.theme || {})) {
    document.documentElement.style.setProperty(k, v);
  }
  document.documentElement.lang = getLang();

  const header = document.getElementById("siteHeader");
  const footer = document.getElementById("siteFooter");
  const scrim = document.getElementById("scrim");

  /* ---- top bar ---- */
  function renderTopbar() {
    const tb = SITE.topbar || {};
    const socials = (tb.social || [])
      .map((s) => `<a class="tb-ic" href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(s.icon)}">${ICONS[s.icon] || ""}</a>`)
      .join("");
    const langs = (SITE.languages || [])
      .map((l) => `<button type="button" class="lang-btn ${l.code === getLang() ? "active" : ""}" data-lang="${esc(l.code)}">${esc(l.label)}</button>`)
      .join("");
    return `
      <div class="topbar-in">
        <span class="tb-contacts">
          ${tb.phone ? `<a href="tel:${esc(tb.phone.replace(/\s/g, ""))}"><span class="tb-ic">${ICONS.phone}</span><span class="tb-txt">${esc(tb.phone)}</span></a>` : ""}
          ${tb.email ? `<a href="mailto:${esc(tb.email)}"><span class="tb-ic">${ICONS.email}</span><span class="tb-txt">${esc(tb.email)}</span></a>` : ""}
        </span>
        <span class="tb-right">
          ${socials}
          ${SITE.whatsapp ? `<a class="tb-ic" href="${esc(waLink())}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>` : ""}
          <span class="lang-switch" role="group" aria-label="Language">${langs}</span>
        </span>
      </div>`;
  }

  /* ---- nav (supports one level of dropdowns via `children`) ---- */
  function navItemHtml(n) {
    if (n.children) {
      return `
        <div class="nav-group">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">
            ${esc(t(n.label))}<svg width="10" height="7" viewBox="0 0 10 7" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
          </button>
          <div class="dropdown">
            ${n.children.map((c) => `<a href="${esc(linkHref(c))}" data-page="${esc(c.page || "")}">${esc(t(c.label))}</a>`).join("")}
          </div>
        </div>`;
    }
    return `<a href="${esc(linkHref(n))}" data-page="${esc(n.page || "")}">${esc(t(n.label))}</a>`;
  }

  function renderChrome() {
    /* header */
    header.innerHTML = `
      <div class="topbar">${renderTopbar()}</div>
      <div class="header-in">
        <a class="brand" href="#/home">
          <img src="${esc(SITE.brand.logo)}" alt="" width="38" height="38" />
          <span>${esc(SITE.brand.name)}<small>${esc(t(SITE.brand.tagline))}</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="siteNav">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 6h16M3 11h16M3 16h16"/>
          </svg>
        </button>
        <nav class="nav" id="siteNav" aria-label="Main">
          ${SITE.nav.map(navItemHtml).join("")}
        </nav>
        <div class="auth-slot" id="authSlot"></div>
      </div>`;
    if (typeof renderAuthSlot === "function") renderAuthSlot();

    /* footer */
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="footer-in">
        <span>© ${year} ${esc(SITE.brand.name)} · ${esc(t(SITE.footer.text))}</span>
        <span class="flinks">
          ${(SITE.footer.links || []).map((l) =>
            `<a href="${esc(linkHref(l))}" ${l.href ? `target="_blank" rel="noopener"` : ""}>${esc(t(l.label))}</a>`).join("")}
        </span>
      </div>`;

    /* language switching */
    header.querySelectorAll(".lang-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        setLang(btn.dataset.lang);
        renderChrome();
        route();
      }));

    /* mobile menu */
    const nav = header.querySelector("#siteNav");
    const toggle = header.querySelector(".nav-toggle");
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      scrim.hidden = true;
    };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      scrim.hidden = !open;
    });
    scrim.onclick = closeMenu;
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });

    /* dropdown toggles (click for touch; CSS handles desktop hover) */
    header.querySelectorAll(".nav-parent").forEach((btn) =>
      btn.addEventListener("click", () => {
        const group = btn.closest(".nav-group");
        const open = group.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      }));
  }

  /* ---- floating WhatsApp button ---- */
  if (SITE.whatsapp) {
    document.body.append(el(`
      <a class="wa-float" href="${esc(waLink())}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        ${ICONS.whatsapp}
      </a>`));
  }

  /* ---- router ---- */
  function currentPage() {
    const hash = location.hash.replace(/^#\/?/, "");
    return hash || "home";
  }

  function route() {
    const key = currentPage();
    renderPage(key);
    header.querySelectorAll(".nav a[data-page]").forEach((a) => {
      const active = a.dataset.page === key;
      a.classList.toggle("active", active);
      /* highlight the parent of an active dropdown child */
      const group = a.closest(".nav-group");
      if (group) group.querySelector(".nav-parent").classList.toggle("active", active);
    });
    window.scrollTo({ top: 0 });
  }

  window.addEventListener("hashchange", route);
  renderChrome();
  route();
})();
