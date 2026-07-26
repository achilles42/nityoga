/* Page assembly: turns a page definition from the config
   (a list of blocks) into DOM. */
"use strict";

function renderPage(pageKey) {
  const page = SITE.pages[pageKey];
  const main = document.getElementById("main");
  main.innerHTML = "";

  if (!page) {
    main.append(el(`
      <section class="section"><div class="wrap">
        <h1>Page not found</h1>
        <p>No page called “${esc(pageKey)}” exists in <code>config/site.config.js</code>.</p>
        <p><a class="btn btn-primary" href="#/home">Back home</a></p>
      </div></section>`));
    return;
  }

  document.title = `${t(page.title)} · ${SITE.brand.name}`;

  /* members-only page + not logged in → login prompt instead */
  if (page.authOnly && typeof authUser !== "undefined" && !authUser
      && typeof authGate === "function") {
    main.append(el(`<section class="section"><div class="wrap book-wrap"></div></section>`));
    main.querySelector(".wrap").append(authGate());
    return;
  }

  for (const block of page.blocks || []) {
    const fn = BLOCKS[block.type];
    if (!fn) {
      console.warn(`Unknown block type "${block.type}" on page "${pageKey}" — skipped.`);
      continue;
    }
    main.append(fn(block));
  }
}
