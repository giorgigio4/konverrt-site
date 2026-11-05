#!/usr/bin/env node
// Build gate: the unslop hard rules plus copy rules. Runs on dist/ after astro build. Exit 1 on any hit.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk('dist').filter((f) => f.endsWith('.html'));
const rules = [
  [/text-transform:\s*uppercase|\buppercase\b/, 'uppercase text'],
  [/font-weight:\s*(7|8|9)00|\bfont-(bold|extrabold|black)\b/, 'font weight above 600'],
  [/animate-(pulse|ping|spin|bounce)|animation-iteration-count:\s*infinite/, 'infinite animation'],
  [/transition-all|transition:\s*all\b/, 'transition-all'],
  [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, 'emoji'],
  [/bg-clip-text|text-transparent|linear-gradient|radial-gradient/, 'gradient'],
  [/\u2014/, 'em dash'],
  [/font-style:\s*italic|\bitalic\b/, 'italic'],
  [/rounded-full/, 'rounded-full'],
];
let bad = 0;
for (const f of files) {
  const body = readFileSync(f, 'utf8');
  // only inspect visible text for ! and em dash; whole file for the rest
  const text = f.endsWith('.html') ? body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ') : body;
  if (f.endsWith('.html') && /!(?![=\[])/.test(text.replace(/<!--[\s\S]*?-->/g, ''))) { console.log(`${f}: exclamation mark in copy`); bad++; }
  for (const [re, name] of rules) {
    const hay = name === 'em dash' || name === 'emoji' ? text : body;
    if (re.test(hay)) { console.log(`${f}: ${name}`); bad++; }
  }
}
// every public number must exist in the claims whitelist
const claims = ['2.5M+', '1,000+', '$700M+', '50+', '$350', '$700'];
const home = readFileSync('dist/index.html', 'utf8');
for (const c of claims) if (!home.includes(c) && !readFileSync('dist/pricing/index.html', 'utf8').includes(c)) { console.log(`claim missing from home/pricing: ${c}`); bad++; }
console.log(bad ? `FAILED: ${bad} hit(s) across ${files.length} files` : `ok: ${files.length} files clean`);
process.exit(bad ? 1 : 0);
