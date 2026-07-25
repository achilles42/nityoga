/* App shell: theme, header/nav, footer, hash router. */
"use strict";

(function init() {
  /* ---- theme: push config colours into CSS variables ---- */
  for (const [k, v] of Object.entries(SITE.theme || {})) {
    document.documentElement.style.setProperty(k, v);
  }

  /* ---- header ---- */
  const header = document.getElementById("siteHeader");
  header.append(el(`
    <div class="header-in">
      <a class="brand" href="#/home">
        <img src="${esc(SITE.brand.logo)}" alt="" width="38" height="38" />
        <span>${esc(SITE.brand.name)}<small>${esc(SITE.brand.tagline)}</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="siteNav">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M3 6h16M3 11h16M3 16h16"/>
        </svg>
      </button>
      <nav class="nav" id="siteNav" aria-label="Main">
        ${SITE.nav.map((n) => `<a href="${esc(linkHref(n))}" data-page="${esc(n.page || "")}">${esc(n.label)}</a>`).join("")}
      </nav>
    </div>`));

  const nav = document.getElementById("siteNav");
  const toggle = header.querySelector(".nav-toggle");
  const scrim = document.getElementById("scrim");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
  }
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    scrim.hidden = !open;
  });
  scrim.addEventListener("click", closeMenu);
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });

  /* ---- footer ---- */
  const year = new Date().getFullYear();
  document.getElementById("siteFooter").append(el(`
    <div class="footer-in">
      <span>© ${year} ${esc(SITE.brand.name)} · ${esc(SITE.footer.text)}</span>
      <span class="flinks">
        ${(SITE.footer.links || []).map((l) =>
          `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
      </span>
    </div>`));

  /* ---- router ---- */
  function currentPage() {
    const hash = location.hash.replace(/^#\/?/, "");
    return hash || SITE.nav[0]?.page || "home";
  }

  function route() {
    const key = currentPage();
    renderPage(key);
    nav.querySelectorAll("a").forEach((a) =>
      a.classList.toggle("active", a.dataset.page === key));
    window.scrollTo({ top: 0 });
  }

  window.addEventListener("hashchange", route);
  route();
})();
