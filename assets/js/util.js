/* Small helpers shared by the renderer. */
"use strict";

/** Escape text for safe HTML interpolation. */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/** Build an element from an HTML string. */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/** href for an internal page or passthrough external link. */
function linkHref(item) {
  if (item.page) return `#/${item.page}`;
  return item.href || "#";
}

/** Best-quality YouTube thumbnail with a reliable fallback chain. */
function ytThumb(id) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
}

function ytEmbed(id) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
}
