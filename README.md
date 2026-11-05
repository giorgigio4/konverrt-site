# konverrt.com

Static site for Konverrt. Astro 5 + Tailwind 4, deployed to Cloudflare Pages.

- `src/data/` - every number and quote on the site (one source of truth)
- `src/pages/` - one file per URL
- `functions/api/apply.ts` - the apply form handler (Cloudflare Pages Function)
- `public/proof/` - redacted owner replies
- `scripts/check-site.mjs` - build gate (runs on `npm run build`)

```
npm install
npm run dev
npm run build   # astro build + check
```

No client data, no secrets in this repo. Form secrets (`SHEET_WEBHOOK`, `RESEND_API_KEY`) live in Cloudflare Pages settings.
