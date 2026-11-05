// Cloudflare Pages Function: POST /api/apply
// Appends the application to a Google Sheet via an Apps Script web app (SHEET_WEBHOOK) and
// emails hello@ via Resend (RESEND_API_KEY). Both optional: if a secret is missing that leg is skipped.
// Redirects to /apply/thanks/ on success. Honeypot: website_url must be empty.
interface Env { SHEET_WEBHOOK?: string; RESEND_API_KEY?: string; NOTIFY_TO?: string }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const get = (k: string) => String(form.get(k) ?? '').trim().slice(0, 4000);
  if (get('website_url')) return Response.redirect(new URL('/apply/thanks/', request.url).toString(), 303);
  const row = {
    ts: new Date().toISOString(),
    firm: get('firm'), email: get('email'), type: get('type'), mandate: get('mandate'), source: get('source'),
    ip: request.headers.get('cf-connecting-ip') ?? '', country: request.headers.get('cf-ipcountry') ?? '',
    referer: request.headers.get('referer') ?? '', ua: request.headers.get('user-agent') ?? '',
  };
  if (!row.firm || !row.email || !row.mandate) return new Response('Missing fields', { status: 400 });

  const legs: Promise<unknown>[] = [];
  if (env.SHEET_WEBHOOK) legs.push(fetch(env.SHEET_WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(row) }));
  if (env.RESEND_API_KEY) legs.push(fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'Konverrt site <site@konverrt.com>', to: [env.NOTIFY_TO ?? 'hello@konverrt.com'], reply_to: row.email,
      subject: `Pilot batch application - ${row.firm}`,
      text: `Firm: ${row.firm}\nEmail: ${row.email}\nType: ${row.type}\nSource: ${row.source}\n\nMandate:\n${row.mandate}\n\n${row.country} · ${row.referer}`,
    }),
  }));
  await Promise.allSettled(legs);
  return Response.redirect(new URL('/apply/thanks/', request.url).toString(), 303);
};
