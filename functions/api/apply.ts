// Cloudflare Pages Function: POST /api/apply
// 1. Appends the application to the Google Sheet "Konverrt inbound - site applications"
//    using the konverrt-ops service account (GOOGLE_SA_JSON_B64 secret, SHEET_ID var).
// 2. Emails hello@ from hello@ via the Gmail API (GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN secrets, same as eb-sync). Skipped when unset.
// 3. Redirects to /apply/thanks/. Honeypot: website_url must be empty.
interface Env { GOOGLE_SA_JSON_B64?: string; SHEET_ID?: string; GMAIL_CLIENT_ID?: string; GMAIL_CLIENT_SECRET?: string; GMAIL_REFRESH_TOKEN?: string; NOTIFY_TO?: string }

const b64url = (s: string | ArrayBuffer) => {
  const bytes = typeof s === 'string' ? new TextEncoder().encode(s) : new Uint8Array(s);
  let bin = ''; bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const pemToDer = (pem: string) => {
  const b = atob(pem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, ''));
  const out = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i); return out.buffer;
};

async function googleToken(saB64: string) {
  const key = JSON.parse(atob(saB64)) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const hdr = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({ iss: key.client_email, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const ck = await crypto.subtle.importKey('pkcs8', pemToDer(key.private_key), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', ck, new TextEncoder().encode(`${hdr}.${claim}`));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${hdr}.${claim}.${b64url(sig)}` }),
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`);
  return (await res.json() as { access_token: string }).access_token;
}

async function appendRow(env: Env, row: string[]) {
  if (!env.GOOGLE_SA_JSON_B64 || !env.SHEET_ID) return 'sheet: not configured';
  const tok = await googleToken(env.GOOGLE_SA_JSON_B64);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.SHEET_ID}/values/${encodeURIComponent('Applications!A:J')}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, { method: 'POST', headers: { authorization: `Bearer ${tok}`, 'content-type': 'application/json' }, body: JSON.stringify({ values: [row] }) });
  if (!res.ok) throw new Error(`sheet ${res.status}: ${await res.text()}`);
  return 'sheet: ok';
}

async function notify(env: Env, r: Record<string, string>) {
  if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET || !env.GMAIL_REFRESH_TOKEN) return 'email: not configured';
  const tr = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.GMAIL_CLIENT_ID, client_secret: env.GMAIL_CLIENT_SECRET, refresh_token: env.GMAIL_REFRESH_TOKEN, grant_type: 'refresh_token' }),
  });
  if (!tr.ok) throw new Error(`gmail token ${tr.status}: ${await tr.text()}`);
  const tok = (await tr.json() as { access_token: string }).access_token;
  const to = env.NOTIFY_TO ?? 'hello@konverrt.com';
  const body = `Firm: ${r.firm}\nEmail: ${r.email}\nType: ${r.type}\nSource: ${r.source}\n\nMandate:\n${r.mandate}\n\n${r.country} · ${r.referer}\n\nSheet: https://docs.google.com/spreadsheets/d/${env.SHEET_ID ?? ''}`;
  const subject = `Pilot batch application - ${r.firm}`;
  const raw = [`From: "Konverrt site" <hello@konverrt.com>`, `To: ${to}`, `Reply-To: ${r.email}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`, 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', '', body].join('\r\n');
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST', headers: { authorization: `Bearer ${tok}`, 'content-type': 'application/json' },
    body: JSON.stringify({ raw: b64url(raw) }),
  });
  if (!res.ok) throw new Error(`gmail send ${res.status}: ${await res.text()}`);
  return 'email: ok';
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const get = (k: string) => String(form.get(k) ?? '').trim().slice(0, 4000);
  const thanks = new URL('/apply/thanks/', request.url).toString();
  if (get('website_url')) return Response.redirect(thanks, 303);
  const r = {
    ts: new Date().toISOString(), firm: get('firm'), email: get('email'), type: get('type'), mandate: get('mandate'), source: get('source'),
    country: request.headers.get('cf-ipcountry') ?? '', referer: request.headers.get('referer') ?? '',
    ip: request.headers.get('cf-connecting-ip') ?? '', ua: request.headers.get('user-agent') ?? '',
  };
  if (!r.firm || !r.email || !r.mandate) return new Response('Missing fields', { status: 400 });
  const results = await Promise.allSettled([
    appendRow(env, [r.ts, r.firm, r.email, r.type, r.mandate, r.source, r.country, r.referer, r.ip, r.ua]),
    notify(env, r),
  ]);
  console.log('apply', JSON.stringify(results.map((x) => (x.status === 'fulfilled' ? x.value : `error: ${(x.reason as Error).message}`))));
  return Response.redirect(thanks, 303);
};
