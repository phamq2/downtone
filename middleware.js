// Vercel Routing (Edge) Middleware — password gate for the Downtone investor
// brief. Runs on Vercel's edge BEFORE any static file (index.html, /src/*,
// assets) is served, so the confidential brief never reaches an
// unauthenticated browser. Free on Vercel's Hobby plan.
//
// Instead of HTTP Basic Auth (the unstyleable native browser dialog with a
// username field), this serves a custom, on-brand login page with a single
// password field and remembers the visitor via a cookie.
//
// The password is read from the PORTAL_PASSWORD environment variable — set it
// in the Vercel dashboard → Project → Settings → Environment Variables, then
// redeploy. It is intentionally NOT hardcoded here because this repo is public.
// If PORTAL_PASSWORD is unset, the gate fails closed (denies everyone).

const COOKIE = 'dt_session';
const LOGIN_PATH = '/__login';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const config = {
  // Gate every path. The whole brief is confidential.
  matcher: '/(.*)',
};

export default async function middleware(request) {
  const password = process.env.PORTAL_PASSWORD;
  const url = new URL(request.url);

  // Fail closed if no password is configured.
  if (!password) {
    return loginPage('This portal is not yet configured.', 503);
  }

  const token = await sha256Hex(password);

  // Already authenticated? Let the request through to the static brief.
  const cookies = parseCookies(request.headers.get('cookie') || '');
  if (safeEqual(cookies[COOKIE] || '', token)) {
    return; // continue to the static file
  }

  // Handle the login form submission.
  if (request.method === 'POST' && url.pathname === LOGIN_PATH) {
    const form = await request.formData();
    const submitted = String(form.get('password') || '');
    if (safeEqual(submitted, password)) {
      const headers = new Headers({ Location: '/' });
      headers.append(
        'Set-Cookie',
        `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`
      );
      return new Response(null, { status: 303, headers });
    }
    return loginPage('Incorrect password. Please try again.', 401);
  }

  // Not authenticated → show the login page.
  return loginPage(null, 401);
}

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 955.9 228.1" fill="#F5F1EA" class="logo" role="img" aria-label="Downtone"><g><path d="M18.3,22.9h45.3c29.9,0,49.5,22.1,49.5,49.5v83.3c0,27.3-19.5,49.5-49.5,49.5H18.3V22.9ZM78.2,155.7v-83.3c0-8.1-5.5-14.8-14.6-14.8h-10.4v113h10.4c9.1,0,14.6-6.8,14.6-14.8Z"></path><path d="M128.4,158.6v-89c0-27.3,19.5-49.5,49.5-49.5s49.5,22.1,49.5,49.5v89c0,27.3-19.5,49.5-49.5,49.5s-49.5-22.1-49.5-49.5ZM192.5,158.6v-89c0-8.1-5.2-14.8-14.6-14.8s-14.6,6.8-14.6,14.8v89c0,8.1,5.5,14.8,14.6,14.8s14.6-6.8,14.6-14.8Z"></path><path d="M233.1,22.9h35.7l13.8,115.6,16.4-115.6h25l17.4,115.6,12.8-115.6h35.7l-29.7,182.3h-34.1l-14.6-100-14.6,100h-34.1l-29.7-182.3Z"></path><path d="M400.2,22.9h33.8l32.3,91.9V22.9h34.9v182.3h-33.8l-32.3-91.9v91.9h-34.9V22.9Z"></path><path d="M547.1,57.6h-34.9V22.9h104.7v34.6h-34.9v147.6h-34.9V57.6Z"></path><path d="M621.8,158.6v-89c0-27.3,19.5-49.5,49.5-49.5s49.5,22.1,49.5,49.5v89c0,27.3-19.5,49.5-49.5,49.5s-49.5-22.1-49.5-49.5ZM685.9,158.6v-89c0-8.1-5.2-14.8-14.6-14.8s-14.6,6.8-14.6,14.8v89c0,8.1,5.5,14.8,14.6,14.8s14.6-6.8,14.6-14.8Z"></path><path d="M738.2,22.9h33.8l32.3,91.9V22.9h34.9v182.3h-33.8l-32.3-91.9v91.9h-34.9V22.9Z"></path><path d="M858.5,22.9h79.1v34.6h-44.3v39.1h33.3v34.6h-33.3v39.3h44.3v34.6h-79.1V22.9Z"></path></g></svg>`;

function loginPage(error, status) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Downtone — Investor Brief</title>
<style>
  :root { --bg:#0F0F0F; --cream:#F5F1EA; --amber:#FF9B00; --muted:#8A857C; --line:#2A2A2A; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background-color: var(--bg); }
  html { min-height: 100%; }
  body {
    min-height: 100vh; color: var(--cream);
    font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    display: grid; place-items: center; padding: 24px;
    -webkit-font-smoothing: antialiased;
  }
  .card { width: 100%; max-width: 360px; text-align: center; }
  .logo { width: 180px; height: auto; margin: 0 auto 28px; display: block; }
  .eyebrow { font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin: 0 0 28px; }
  form { display: flex; flex-direction: column; gap: 12px; }
  label { text-align: left; font-size: 13px; color: var(--muted); }
  input[type=password] {
    width: 100%; padding: 13px 14px; font-size: 15px;
    color: var(--cream); background: #161616;
    border: 1px solid var(--line); border-radius: 10px; outline: none;
    transition: border-color .15s ease;
  }
  input[type=password]:focus { border-color: var(--amber); }
  button {
    margin-top: 4px; padding: 13px 14px; font-size: 15px; font-weight: 600;
    color: #0F0F0F; background: var(--amber); border: 0; border-radius: 10px;
    cursor: pointer; transition: opacity .15s ease;
  }
  button:hover { opacity: .9; }
  .error { color: #E5705A; font-size: 13px; margin: 0; min-height: 1em; }
  .footer { color: var(--muted); font-size: 12px; margin-top: 28px; }
</style>
</head>
<body>
  <main class="card">
    ${LOGO}
    <p class="eyebrow">Confidential Investor Brief</p>
    <form method="POST" action="${LOGIN_PATH}">
      <label for="password">Access password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" autofocus required>
      <p class="error">${error ? escapeHtml(error) : ''}</p>
      <button type="submit">Enter</button>
    </form>
    <p class="footer">© Downtone · 301 Grand St, NYC</p>
  </main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

// --- helpers ---

function parseCookies(header) {
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Length-aware constant-time-ish comparison to avoid trivial timing leaks.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
