# Security Audit Report — Prem Nirvana Caterers
**Date:** 2026-06-06  
**Auditor:** Senior Web Security Review  
**Scope:** Full pre-production audit of `/home/ubuntu/prem-nirvana-caterers/`

---

## Summary

| Severity | Count | Fixed |
|----------|-------|-------|
| CRITICAL | 1 | Partial (architectural limitation) |
| HIGH | 2 | Yes |
| MEDIUM | 3 | Yes |
| LOW | 3 | Yes |
| INFO | 3 | Documented |

---

## CRITICAL

### C1 — Groq API Key Exposed in Browser Bundle
**File:** `dist/assets/index-*.js`  
**Status:** ⚠️ Architectural limitation — key will always be visible in a Vite static build

**Finding:** The `VITE_GROQ_API_KEY` environment variable is intentionally injected into the browser bundle by Vite at build time (this is how all `VITE_*` env vars work). The full key `gsk_RMN...` appears in plaintext in the minified JS bundle, accessible to anyone who opens DevTools → Sources or runs `strings` on the file.

**Root cause:** There is no backend/server in this deployment. The Groq API call is made directly from the browser.

**Mitigations applied:**
- Removed `console.log` that confirmed and partially echoed the key in the browser console.
- Added 500-character input limit + HTML tag stripping to reduce prompt injection surface.

**Recommended permanent fix (requires backend):**
1. Create a Cloudflare Worker or Netlify/Vercel serverless function that proxies the Groq call. The key lives only on the server.
2. Add rate limiting per IP on that proxy (e.g., 20 requests/hour).
3. The frontend calls `/api/chat` instead of `api.groq.com` directly.

**Immediate action required:** Rotate the Groq API key at `console.groq.com` and set a monthly token spending limit. The exposed key is in git history and the deployed bundle.

---

## HIGH

### H1 — Admin Password Hardcoded in Client-Side Source
**File:** `src/App.jsx:893`  
**Status:** ⚠️ Documented (client-side admin is inherently insecure)

**Finding:** `if (password === 'premnirvana2025')` — the admin panel password is in the JavaScript bundle, visible to any user who inspects the source. The admin panel allows image uploads via a backend on port 3001.

**Risk:** Any visitor can find this password trivially and access the admin panel if port 3001 is reachable.

**Recommended fix:** Move the admin panel to a separate deployment protected by HTTP Basic Auth configured at the server/Hostinger level, not in JavaScript.

### H2 — Console Debug Logs Leaked API Information
**File:** `src/App.jsx`  
**Status:** ✅ Fixed

**Finding:** Four `console.log`/`console.warn` statements were present that confirmed the API key was loaded, logged the first 10 characters, and exposed internal API message structure in the browser console.

**Fix applied:** Removed all debug-level console statements. Only `console.error` statements remain for genuine error tracking.

---

## MEDIUM

### M1 — Chat Input Had No Length Limit or Sanitization
**File:** `src/App.jsx`  
**Status:** ✅ Fixed

**Finding:** The chat input accepted unlimited characters with no HTML stripping. A malicious user could send extremely long messages (token exhaustion) or attempt HTML/script injection via the input field.

**Fix applied:**
- `maxLength={500}` attribute on the input element (browser enforcement).
- Server-side equivalent: `.trim().slice(0, 500)` before the API call.
- `raw.replace(/<[^>]*>/g, '')` strips all HTML tags before the message is sent, preventing markup-based prompt injection.

### M2 — No Security Headers on Hostinger Deployment
**Status:** ✅ Fixed

**Finding:** No `.htaccess` existed. Without headers, browsers have no guidance on CSP, framing, MIME sniffing, or HSTS.

**Fix applied:** Created `public/.htaccess` (auto-deployed into `dist/`) with:
- `Content-Security-Policy` — restricts scripts, styles, images, connections to known-safe origins
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (clickjacking protection)
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HSTS, 1 year)
- `Permissions-Policy` (disables camera, mic, geolocation, payment)
- Server header removal (`X-Powered-By`, `Server`)

### M3 — Admin Backend Uses Plain HTTP
**File:** `src/App.jsx:890`  
**Status:** ⚠️ Documented

**Finding:** `const API_URL = \`http://${window.location.hostname}:3001\`` — the admin panel communicates with a local Node backend over HTTP, not HTTPS. Any credentials or uploaded images are transmitted in plaintext on the network.

**Recommended fix:** The backend on port 3001 should be behind an HTTPS reverse proxy (nginx/Caddy) or only accessed over localhost.

---

## LOW

### L1 — No HTTPS Redirect
**Status:** ✅ Fixed  
**Fix applied:** `.htaccess` now includes a 301 redirect from HTTP to HTTPS via `RewriteCond %{HTTPS} off`.

### L2 — Directory Listing Enabled by Default
**Status:** ✅ Fixed  
**Fix applied:** `Options -Indexes` in `.htaccess` disables directory browsing.

### L3 — No Browser Caching Rules
**Status:** ✅ Fixed  
**Fix applied:** `.htaccess` sets `Cache-Control` via `mod_expires`:
- HTML: no cache (SPA always fetches fresh)
- Hashed JS/CSS: 1 year (Vite content-hashes filenames)
- Images/video: 1 month
- Fonts: 1 year

---

## INFORMATIONAL

### I1 — XSS Risk: None Found
React's JSX escapes all string values by default. No `dangerouslySetInnerHTML` is used with user-controlled data. Chat messages from users and the AI are rendered as plain text within JSX `{}` expressions. ✅

### I2 — CSRF: Not Applicable
The site has no session-based authentication and no server-side form processing. The contact form sends to WhatsApp via a client-side redirect. No CSRF surface exists. ✅

### I3 — Dependency Audit
`npm audit` returned **0 vulnerabilities**. ✅

### I4 — External URLs
All external resources use HTTPS:
- Unsplash images: `https://images.unsplash.com` ✅
- Groq API: `https://api.groq.com` ✅
- WhatsApp links: `https://wa.me` ✅
- Google Maps embed: `https://www.google.com` ✅
- Instagram/Facebook/YouTube links: `https://` ✅

### I5 — Source Maps
No `.map` files are emitted in the production build. Vite's default `build.sourcemap` is `false`. ✅

### I6 — File Upload Validation
Image uploads exist in the admin panel (`/api/upload-menu-image`). Validation responsibility lies with the Express backend on port 3001, which is outside this audit scope. Ensure the backend validates: file MIME type (not just extension), maximum file size, and stores uploads outside the web root or with non-executable permissions.

---

## Files Changed

| File | Change |
|------|--------|
| `src/App.jsx` | Removed 4 debug console statements; added input sanitization + `maxLength` |
| `public/.htaccess` | Created — security headers, HTTPS redirect, caching, SPA routing |
| `SECURITY_REPORT.md` | This report |

---

## Recommended Next Steps (Priority Order)

1. **Rotate the Groq API key immediately** — the exposed key is in the deployed bundle and git history.
2. **Set a Groq API spending limit** at `console.groq.com` → Settings → Billing to cap blast radius.
3. **Build a serverless proxy** (Cloudflare Worker recommended for Hostinger compatibility) to move the API key off the client.
4. **Move the admin panel** behind HTTP Basic Auth at the server level, not client-side JS.
5. **Add rate limiting** on the image upload endpoint (backend).
