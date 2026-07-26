/* Login / signup via Supabase — no backend needed.
   Setup: fill in SITE.supabase (url + anonKey) in the config and run
   supabase/setup.sql once in the Supabase SQL editor.
   If SITE.supabase is left empty the login button stays hidden and
   the site works exactly as before.

   Signup stores name + email + phone + password; login is
   email + password (your email is your username).                 */
"use strict";

const sb = (() => {
  /* credentials come from config/supabase.local.js (gitignored;
     generated from repo secrets on deploy), with SITE.supabase
     as a fallback for anyone who prefers configuring it there */
  const { url, anonKey } = window.SUPABASE_LOCAL || SITE.supabase || {};
  return url && anonKey && window.supabase
    ? window.supabase.createClient(url, anonKey)
    : null;
})();

let authUser = null;

if (sb) {
  sb.auth.onAuthStateChange((_event, session) => {
    authUser = session?.user || null;
    renderAuthSlot();
  });
}

/* "+91 98765-43210" → "919876543210" */
function phoneDigits(s) {
  return String(s || "").replace(/\D/g, "").replace(/^0+/, "");
}

function authDisplayName(u) {
  return (u.user_metadata && u.user_metadata.full_name) || u.email || "";
}

/* Friendly message for the errors users actually hit. */
function authErrorMessage(error) {
  const m = (error?.message || "").toLowerCase();
  if (m.includes("invalid login credentials")) return str("authBadLogin");
  if (m.includes("not confirmed")) return str("authConfirmFirst");
  if (m.includes("already registered")) return str("authExists");
  return error?.message || str("authError");
}

/* ---- header slot: Login button, or avatar + menu when signed in ---- */
function renderAuthSlot() {
  const slot = document.getElementById("authSlot");
  if (!slot) return;
  if (!sb) { slot.innerHTML = ""; return; }

  if (!authUser) {
    slot.innerHTML = `
      <button type="button" class="btn btn-ghost btn-sm" data-mode="login">${esc(str("login"))}</button>
      <button type="button" class="btn btn-primary btn-sm" data-mode="signup">${esc(str("signup"))}</button>`;
    slot.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => openAuthModal(b.dataset.mode)));
    return;
  }

  const name = authDisplayName(authUser);
  const initial = (name.trim()[0] || "🧘").toUpperCase();
  slot.innerHTML = `
    <div class="account">
      <button type="button" class="account-btn" aria-haspopup="true" aria-expanded="false"
        title="${esc(name)}">${esc(initial)}</button>
      <div class="account-menu">
        <p class="acct-name">${esc(name)}</p>
        ${authUser.email ? `<p class="acct-email">${esc(authUser.email)}</p>` : ""}
        <button type="button" class="logout-btn">${esc(str("logout"))}</button>
      </div>
    </div>`;

  const acct = slot.querySelector(".account");
  const btn = slot.querySelector(".account-btn");
  btn.addEventListener("click", () => {
    const open = acct.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (!acct.contains(e.target)) acct.classList.remove("open");
  });
  slot.querySelector(".logout-btn").addEventListener("click", () => sb.auth.signOut());
}

/* ---- login / signup modal ---- */
function openAuthModal(mode) {
  document.getElementById("authOverlay")?.remove();

  const overlay = el(`
    <div class="auth-overlay" id="authOverlay">
      <div class="auth-card" role="dialog" aria-modal="true" aria-label="${esc(str("login"))}">
        <button type="button" class="auth-close" aria-label="${esc(str("close"))}">✕</button>

        <form class="auth-form" data-mode="login">
          <h3>${esc(str("authWelcomeBack"))}</h3>
          <label>${esc(str("emailLabel"))}
            <input name="identifier" type="email" autocomplete="username" required
              placeholder="you@example.com" />
          </label>
          <label>${esc(str("passwordLabel"))}
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          <p class="auth-msg" hidden></p>
          <button class="btn btn-primary" type="submit">${esc(str("login"))}</button>
          <p class="auth-switch">${esc(str("noAccount"))}
            <button type="button" data-goto="signup">${esc(str("signup"))}</button></p>
        </form>

        <form class="auth-form" data-mode="signup" hidden>
          <h3>${esc(str("authJoin"))}</h3>
          <label>${esc(str("name"))}
            <input name="name" autocomplete="name" required />
          </label>
          <label>${esc(str("emailLabel"))}
            <input name="email" type="email" autocomplete="email" required
              placeholder="you@example.com" />
          </label>
          <label>${esc(str("phoneLabel"))}
            <input name="phone" type="tel" autocomplete="tel" required
              placeholder="+91 98765 43210" />
          </label>
          <label>${esc(str("passwordLabel"))}
            <input name="password" type="password" autocomplete="new-password" required minlength="6" />
            <small>${esc(str("passwordHint"))}</small>
          </label>
          <label>${esc(str("confirmPassword"))}
            <input name="password2" type="password" autocomplete="new-password" required minlength="6" />
          </label>
          <p class="auth-msg" hidden></p>
          <button class="btn btn-primary" type="submit">${esc(str("createAccount"))}</button>
          <p class="auth-switch">${esc(str("haveAccount"))}
            <button type="button" data-goto="login">${esc(str("login"))}</button></p>
        </form>
      </div>
    </div>`);

  const close = () => {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
  };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelector(".auth-close").addEventListener("click", close);

  const setMode = (m) => {
    overlay.querySelectorAll(".auth-form").forEach((f) => {
      f.hidden = f.dataset.mode !== m;
    });
    overlay.querySelector(".auth-card").setAttribute("aria-label",
      str(m === "signup" ? "signup" : "login"));
    overlay.querySelector(`.auth-form[data-mode="${m}"] input`).focus();
  };
  overlay.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => setMode(b.dataset.goto)));

  const showMsg = (form, text, ok = false) => {
    const p = form.querySelector(".auth-msg");
    p.textContent = text;
    p.classList.toggle("ok", ok);
    p.hidden = !text;
  };
  const busy = (form, on) => {
    const b = form.querySelector('button[type="submit"]');
    b.disabled = on;
    b.classList.toggle("loading", on);
  };

  /* login: email + password */
  overlay.querySelector('.auth-form[data-mode="login"]').addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    showMsg(form, "");
    busy(form, true);
    try {
      const { error } = await sb.auth.signInWithPassword({
        email: form.identifier.value.trim(),
        password: form.password.value,
      });
      if (error) return showMsg(form, authErrorMessage(error));
      close();
    } catch {
      showMsg(form, str("authError"));
    } finally {
      busy(form, false);
    }
  });

  /* signup: email + phone + password (phone kept in user metadata,
     copied to the profiles table by the DB trigger) */
  overlay.querySelector('.auth-form[data-mode="signup"]').addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const digits = phoneDigits(form.phone.value);
    if (digits.length < 10) return showMsg(form, str("authPhoneInvalid"));
    if (form.password.value !== form.password2.value)
      return showMsg(form, str("authPasswordMismatch"));
    showMsg(form, "");
    busy(form, true);
    try {
      const { data, error } = await sb.auth.signUp({
        email: form.email.value.trim(),
        password: form.password.value,
        options: { data: { full_name: form.name.value.trim(), phone: digits } },
      });
      if (error) return showMsg(form, authErrorMessage(error));
      if (data.session) return close();          // signed in straight away
      showMsg(form, str("authCheckEmail"), true); // email confirmation is on
    } catch {
      showMsg(form, str("authError"));
    } finally {
      busy(form, false);
    }
  });

  document.body.append(overlay);
  setMode(mode || "login");
}
