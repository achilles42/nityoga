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
let authIsAdmin = false;

async function refreshAdminFlag() {
  if (!authUser) { authIsAdmin = false; return; }
  const { data } = await sb.from("profiles")
    .select("is_admin").eq("id", authUser.id).single();
  authIsAdmin = !!(data && data.is_admin);
}

if (sb) {
  sb.auth.onAuthStateChange((_event, session) => {
    const changed = (session?.user?.id || null) !== (authUser?.id || null);
    authUser = session?.user || null;
    renderAuthSlot();
    /* re-render header + current page so login-aware nav items and
       blocks (booking, payment, admin) switch to the right state.
       setTimeout: supabase queries must not run inside this callback. */
    if (changed) setTimeout(async () => {
      await refreshAdminFlag();
      window.dispatchEvent(new CustomEvent("auth-changed"));
    }, 0);
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

/* Login prompt shown in place of members-only content
   (booking form, payment page). */
function authGate() {
  const gate = el(`
    <div class="book-gate">
      <h2>${esc(str("loginToBook"))}</h2>
      <p>${esc(str("loginToBookHint"))}</p>
      <div class="ctas">
        <button type="button" class="btn btn-primary" data-m="login">${esc(str("login"))}</button>
        <button type="button" class="btn btn-ghost" data-m="signup">${esc(str("signup"))}</button>
      </div>
    </div>`);
  gate.querySelectorAll("[data-m]").forEach((b) =>
    b.addEventListener("click", () => openAuthModal(b.dataset.m)));
  return gate;
}

/* ---------- booking block ("Book a Class" page) ----------
   Lives here (not blocks.js) because it needs the Supabase client
   and the login state. Registered into the BLOCKS registry below. */
function blockBooking() {
  const section = el(`<section class="section"><div class="wrap book-wrap"></div></section>`);
  const wrap = section.querySelector(".wrap");

  /* logged out (or Supabase missing) → friendly login / signup gate */
  if (!sb || !authUser) {
    if (!sb) console.warn("Supabase not configured — see config/supabase.local.example.js");
    wrap.append(authGate());
    return section;
  }

  /* logged in → booking form + list of own bookings */
  const cfg = SITE.booking || {};
  const opts = (list) => (list || []).map((o) =>
    `<option value="${esc(o.en || o)}">${esc(t(o))}</option>`).join("");

  /* calendar limits: today … +90 days */
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const today = new Date();
  const maxDay = new Date(today);
  maxDay.setDate(maxDay.getDate() + 90);

  const form = el(`
    <form class="contact-form book-form">
      <label>${esc(str("classType"))}
        <select name="class_type" required>${opts(cfg.classTypes)}</select></label>
      <label>${esc(str("program"))}
        <select name="program" required>${opts(cfg.programs)}</select></label>
      <label>${esc(str("plan"))}
        <select name="plan" required>${opts(cfg.plans)}</select></label>
      <label>${esc(str("startDate"))}
        <input name="start_date" type="date" required
          value="${iso(today)}" min="${iso(today)}" max="${iso(maxDay)}" />
        <small class="sub-hint" hidden></small></label>
      <label>${esc(str("preferredTime"))}
        <select name="preferred_time" required>${opts(cfg.times)}</select></label>
      <label>${esc(str("notes"))}<textarea name="notes" rows="3"></textarea></label>
      <p class="auth-msg" hidden></p>
      <button class="btn btn-primary" type="submit">${esc(str("bookNow"))}</button>
    </form>`);

  /* show the subscription's validity window under the date picker */
  const subHint = form.querySelector(".sub-hint");
  const updateHint = () => {
    const isSub = /subscription/i.test(form.plan.value);
    if (isSub && form.start_date.value) {
      const end = new Date(form.start_date.value);
      end.setDate(end.getDate() + (cfg.subscriptionDays || 30) - 1);
      subHint.textContent = `${str("validTill")} ${end.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}`;
      subHint.hidden = false;
    } else {
      subHint.hidden = true;
    }
  };
  form.plan.addEventListener("change", updateHint);
  form.start_date.addEventListener("change", updateHint);
  updateHint();

  const listBox = el(`
    <div class="book-list" hidden>
      <h2>${esc(str("myBookings"))}</h2>
      <div class="items"></div>
    </div>`);

  async function refreshList() {
    const { data } = await sb.from("bookings")
      .select("class_type,program,preferred_time,plan,start_date,status,created_at")
      .order("created_at", { ascending: false });
    const items = listBox.querySelector(".items");
    items.innerHTML = "";
    const fmtDay = (d) => d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "";
    (data || []).forEach((bk) => items.append(el(`
      <div class="book-item">
        <div>
          <b>${esc(bk.class_type)} · ${esc(bk.program)}</b>
          <p>${esc(bk.plan)}${bk.start_date ? ` · ${esc(fmtDay(bk.start_date))}` : ""} · ${esc(bk.preferred_time)}</p>
        </div>
        <span class="status-chip s-${esc(bk.status)}">${esc(bk.status)}</span>
      </div>`)));
    listBox.hidden = !(data || []).length;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const msg = form.querySelector(".auth-msg");
    msg.hidden = true;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      const { error } = await sb.from("bookings").insert({
        user_id: authUser.id,
        class_type: form.class_type.value,
        program: form.program.value,
        preferred_time: form.preferred_time.value,
        plan: form.plan.value,
        start_date: form.start_date.value,
        notes: form.notes.value.trim() || null,
      });
      if (error) {
        msg.textContent = error.message || str("authError");
        msg.hidden = false;
        return;
      }
      /* success → thank-you panel + refreshed list */
      const done = el(`
        <div class="book-done">
          <h2>🎉 ${esc(str("bookingThanks"))}</h2>
          <p>${esc(str("bookingThanksBody"))}</p>
          <button type="button" class="btn btn-ghost">${esc(str("bookAnother"))}</button>
        </div>`);
      done.querySelector("button").addEventListener("click", () =>
        window.dispatchEvent(new HashChangeEvent("hashchange")));
      form.replaceWith(done);
      refreshList();
    } catch {
      msg.textContent = str("authError");
      msg.hidden = false;
    } finally {
      btn.disabled = false;
    }
  });

  wrap.append(form, listBox);
  refreshList();
  return section;
}

BLOCKS.booking = blockBooking;

/* ---------- admin block (the Admin page) ----------
   Every booking from every member, with their contact details,
   newest first. The status dropdown saves straight to the DB. */
const BOOKING_STATUSES = ["new", "contacted", "active", "closed"];

function blockAdminBookings() {
  const section = el(`<section class="section"><div class="wrap"></div></section>`);
  const wrap = section.querySelector(".wrap");

  if (!sb || !authUser || !authIsAdmin) {
    wrap.append(authUser
      ? el(`<div class="empty">${esc(str("adminOnlyMsg"))}</div>`)
      : authGate());
    return section;
  }

  const box = el(`
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr>
          <th>${esc(str("thWhen"))}</th>
          <th>${esc(str("thMember"))}</th>
          <th>${esc(str("thBooking"))}</th>
          <th>${esc(str("plan"))}</th>
          <th>${esc(str("thSlot"))}</th>
          <th>${esc(str("thStatus"))}</th>
        </tr></thead>
        <tbody></tbody>
      </table>
    </div>`);
  const tbody = box.querySelector("tbody");

  (async () => {
    const { data, error } = await sb.from("bookings")
      .select("id,class_type,program,preferred_time,plan,start_date,notes,status,created_at,profiles(full_name,email,phone)")
      .order("created_at", { ascending: false });
    if (error) {
      wrap.append(el(`<div class="empty">${esc(error.message)}</div>`));
      return;
    }
    if (!data.length) {
      wrap.append(el(`<div class="empty">${esc(str("adminNoBookings"))}</div>`));
      return;
    }
    const day = (d) => d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "—";
    data.forEach((b) => {
      const p = b.profiles || {};
      const row = el(`
        <tr>
          <td>${esc(day(b.created_at))}</td>
          <td>
            <b>${esc(p.full_name || "—")}</b><br>
            ${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a><br>` : ""}
            ${p.phone ? `<a href="tel:+${esc(p.phone)}">+${esc(p.phone)}</a>` : ""}
          </td>
          <td>${esc(b.class_type)}<br><small>${esc(b.program)}</small>
            ${b.notes ? `<br><small class="note">“${esc(b.notes)}”</small>` : ""}</td>
          <td>${esc(b.plan)}<br><small>${esc(day(b.start_date))}</small></td>
          <td>${esc(b.preferred_time)}</td>
          <td>
            <select class="status-sel s-${esc(b.status)}">
              ${BOOKING_STATUSES.map((s) =>
                `<option ${s === b.status ? "selected" : ""}>${esc(s)}</option>`).join("")}
            </select>
          </td>
        </tr>`);
      const sel = row.querySelector("select");
      sel.addEventListener("change", async () => {
        sel.disabled = true;
        const { error: err } = await sb.from("bookings")
          .update({ status: sel.value }).eq("id", b.id);
        if (err) alert(err.message);
        sel.className = `status-sel s-${sel.value}`;
        sel.disabled = false;
      });
      tbody.append(row);
    });
    wrap.append(box);
  })();

  return section;
}

BLOCKS.adminBookings = blockAdminBookings;
