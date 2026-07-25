/* Small helpers shared by the renderer. */
"use strict";

/* ---------- language ---------- */
const LANG_KEY = "nityoga-lang";

function getLang() {
  const codes = (SITE.languages || []).map((l) => l.code);
  const saved = localStorage.getItem(LANG_KEY);
  return codes.includes(saved) ? saved : (codes[0] || "en");
}

function setLang(code) {
  localStorage.setItem(LANG_KEY, code);
  document.documentElement.lang = code;
}

/** Resolve a config value that may be a plain string or {en,hi,sa}. */
function t(v) {
  if (v == null) return v;
  if (typeof v !== "object" || Array.isArray(v)) return v;
  const lang = getLang();
  return v[lang] ?? v.en ?? Object.values(v)[0];
}

/** wa.me link with the configured pre-filled message. */
function waLink(customMsg) {
  const { number, message } = SITE.whatsapp || {};
  const msg = encodeURIComponent(customMsg || message || "");
  return `https://wa.me/${number}${msg ? `?text=${msg}` : ""}`;
}

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

/** href for an internal page, WhatsApp shortcut, or external link. */
function linkHref(item) {
  if (item.whatsapp) return waLink();
  if (item.page) return `#/${item.page}`;
  return item.href || "#";
}

/** UI string from SITE.strings, in the current language. */
function str(key) {
  return t((SITE.strings || {})[key]) ?? key;
}

/** Accepts a full YouTube link OR a bare video ID and returns the ID.
    Handles: watch?v=, youtu.be/, /shorts/, /embed/, /live/          */
function ytId(input) {
  const s = String(input || "").trim();
  if (!/^https?:\/\//i.test(s)) return s;            // already an ID
  try {
    const u = new URL(s);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.split("/")[1] || s;
    const m = u.pathname.match(/\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : s;
  } catch {
    return s;
  }
}

/** Video's YouTube ID — from `youtube` (link or ID) or legacy `youtubeId`. */
function videoId(v) {
  return ytId(v.youtube || v.youtubeId);
}

/** Best-quality YouTube thumbnail with a reliable fallback chain. */
function ytThumb(id) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
}

function ytEmbed(id) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
}
