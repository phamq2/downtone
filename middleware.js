// Vercel Routing (Edge) Middleware — password gate for the Downtone investor
// brief. Runs on Vercel's edge BEFORE any static file (index.html, /src/*,
// assets) is served, so the confidential brief never reaches an
// unauthenticated browser. Free on Vercel's Hobby plan.
//
// Uses HTTP Basic Auth. The browser prompts for a username + password, but we
// only check the password — the username field can be left blank (or anything).
//
// The password defaults to the value below so it works immediately on deploy.
// To change it without editing code, set PORTAL_PASSWORD in the Vercel
// dashboard → Project → Settings → Environment Variables and redeploy.

const PASSWORD = process.env.PORTAL_PASSWORD || 'hifitothepeople';

export const config = {
  // Gate every path. There are no public assets to exclude — the whole brief
  // is confidential.
  matcher: '/(.*)',
};

export default function middleware(request) {
  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    // atob is available in the edge runtime.
    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch {
      return unauthorized();
    }
    // Basic Auth sends "username:password"; we ignore the username and only
    // validate the password.
    const sep = decoded.indexOf(':');
    const pass = decoded.slice(sep + 1);

    if (safeEqual(pass, PASSWORD)) {
      // Authenticated — return nothing so the request continues to the
      // static file (index.html).
      return;
    }
  }

  return unauthorized();
}

function unauthorized(message = 'Password required') {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Downtone Investor Brief", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
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
