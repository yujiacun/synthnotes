// ─────────────────────────────────────────────────────────────────────────
// Site-wide password gate — a Netlify Edge Function.
//
// Why this exists: synthnotes is a folder of static HTML files with no server,
// so normally there's nothing standing at the door to check a password before
// a page is handed over. An Edge Function runs on EVERY request, before any
// file is served — it's the "wall" a static site is otherwise missing.
//
// Turn the lock ON by setting SITE_PASSWORD in the Netlify environment
// (Site settings → Environment variables). If SITE_PASSWORD is empty/unset the
// gate stays OPEN — so you can never lock yourself out during setup, and a
// local `netlify dev` with no password just works. Adapted from the Snippt
// login pattern: the cookie's value is a SHA-256 hash of the password, never
// the plain text.
// ─────────────────────────────────────────────────────────────────────────

const COOKIE = "site_auth";
const LOGIN_PATH = "/__auth/login";
const LOGOUT_PATH = "/__auth/logout";
const MAX_AGE = 60 * 60 * 24 * 30; // cookie lifetime: 30 days

// Netlify edge runtime exposes env via Netlify.env; fall back to Deno.env.
const getEnv = (k) => {
  try {
    return globalThis.Netlify?.env?.get(k) ?? globalThis.Deno?.env?.get(k);
  } catch {
    return undefined;
  }
};

// One-way fingerprint of a string. Web Crypto is built into the edge runtime.
async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time compare, so an attacker can't learn the secret by timing how
// long the check takes. Both legitimate values are 64-char hex hashes.
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function getCookie(request, name) {
  const m = (request.headers.get("cookie") || "")
    .match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return m ? m[1] : "";
}

// Only allow a same-site, single-leading-slash path as the post-login
// redirect, so `next` can't bounce a visitor off to another domain.
function safeNext(value) {
  return /^\/(?!\/)/.test(value || "") ? value : "/";
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function loginPage(next, error) {
  const errorBlock = error
    ? `<p class="err">Incorrect password — try again.</p>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Synth Notes — locked</title>
<style>
  :root{ --bg:#1a1b1d; --card:#2c2e30; --text:#e3e3e1; --muted:#888884; --rule:#3a3c3f;
         --blue:#5b7fc7; --blue-title:#7aa0e0; }
  *{box-sizing:border-box}
  html,body{height:100%}
  body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;
    display:flex; align-items:center; justify-content:center; padding:1.5rem;
  }
  .card{
    width:100%; max-width:300px; background:var(--card);
    border:1px solid var(--rule); border-radius:8px; padding:2.25rem 2rem;
    box-shadow:0 8px 30px rgba(0,0,0,.35);
  }
  h1{margin:0 0 1.5rem; text-align:center; font-size:1.7rem; font-weight:800;
     letter-spacing:-.01em; color:var(--blue-title)}
  input[type=password]{
    width:100%; padding:.7rem .8rem; font-size:1rem;
    background:#212325; color:var(--text);
    border:1px solid var(--rule); border-radius:6px; outline:none;
  }
  input[type=password]::placeholder{color:var(--muted)}
  input[type=password]:focus{border-color:var(--blue)}
  button{
    margin-top:1rem; width:100%; padding:.7rem; font-size:.95rem; font-weight:700;
    color:#fff; background:var(--blue); border:none; border-radius:6px; cursor:pointer;
  }
  button:hover{filter:brightness(1.08)}
  .err{margin:0 0 1rem; text-align:center; color:#d98a8a; font-size:.85rem}
</style>
</head>
<body>
  <form class="card" method="POST" action="${LOGIN_PATH}">
    <h1>Synth Notes</h1>
    ${errorBlock}
    <input name="password" type="password" placeholder="Password" aria-label="Password"
           autofocus autocomplete="current-password" required>
    <input type="hidden" name="next" value="${escapeHtml(next)}">
    <button type="submit">Enter</button>
  </form>
</body>
</html>`;
}

const htmlResponse = (body, status) =>
  new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });

export default async (request, context) => {
  const password = getEnv("SITE_PASSWORD");

  // No password configured → gate is a no-op (initial setup / local dev).
  if (!password) return context.next();

  const expected = await sha256Hex(password);
  const url = new URL(request.url);

  // ── Logout: clear the cookie, back to the login screen ────────────────
  if (url.pathname === LOGOUT_PATH && request.method === "POST") {
    const headers = new Headers({ Location: "/", "Cache-Control": "no-store" });
    headers.append("Set-Cookie",
      `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
    return new Response(null, { status: 303, headers });
  }

  // ── Login: check the password, set the cookie on a match ──────────────
  if (url.pathname === LOGIN_PATH && request.method === "POST") {
    const form = await request.formData();
    const submitted = String(form.get("password") || "");
    const next = safeNext(String(form.get("next") || "/"));
    const ok = timingSafeEqual(await sha256Hex(submitted), expected);
    if (!ok) return htmlResponse(loginPage(next, true), 401);

    const headers = new Headers({ Location: next, "Cache-Control": "no-store" });
    headers.append("Set-Cookie",
      `${COOKIE}=${expected}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`);
    return new Response(null, { status: 303, headers });
  }

  // ── Already authenticated → let the real request through ──────────────
  if (timingSafeEqual(getCookie(request, COOKIE), expected)) {
    return context.next();
  }

  // ── Not authenticated → show the login page (remember where they were) ─
  const next = safeNext(url.pathname + url.search);
  return htmlResponse(loginPage(next, false), 401);
};
