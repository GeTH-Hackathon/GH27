// Renders social/post-square.{html,png} (1080x1080) and social/post-portrait.{html,png} (1080x1350). Run: node scripts/build-social.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {chromium} from 'playwright';
import {barcodeLayouts} from '../src/lib/barcodeLayouts.ts';
import {event} from '../src/data/event.ts';
const organizer = event.partners.find((p) => p.role === 'Organizer')?.name ?? '';

const rel = (p) => new URL(p, import.meta.url);
const {projects, totals} = JSON.parse(readFileSync(rel('../src/data/wgs.json'), 'utf8'));
const W = 1080, PAD = 72;

// Warm vermilion-to-blush gradient (brand tints only). Text is press black; the barcode bleeds off the bottom edge,
// bars tinted per disease group in ink, paper, vermilion and grey.
const tint = ['#0a0a0a', '#ffffff', '#ff4a1c', '#0a0a0a', '#ffffff', '#4d4d4d', '#ff4a1c'];

function card(H) {
  const BAR_H = H - 840;
  const {order, strip} = barcodeLayouts(projects, {width: W, height: BAR_H, gap: 0.004, minWidth: 0.0012});
  const groups = [...new Set(order.map((p) => p.group))];
  const bars = order
    .map((p, i) => `<rect x="${strip[i].x}" width="${strip[i].width}" height="${BAR_H}" fill="${tint[groups.indexOf(p.group) % tint.length]}"/>`)
    .join('');
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap">
<style>
*{margin:0;box-sizing:border-box}
html{background:#d8d8d8}
body{width:${W}px;height:${H}px;margin:0 auto;color:#0a0a0a;font-family:'Inter Tight','Inter',Helvetica,Arial,sans-serif;padding:${PAD}px;position:relative;overflow:hidden;
background:radial-gradient(circle at 88% 6%,rgba(255,214,190,.75),rgba(255,214,190,0) 46%),linear-gradient(165deg,#ff3a08 0%,#ff4a1c 34%,#ff7c55 68%,#ffb39c 100%)}
.top{display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:500;letter-spacing:-.02em}
.pill{background:#0a0a0a;color:#fff;border-radius:999px;padding:12px 26px;font-size:26px;font-weight:500;letter-spacing:-.01em}
h1{font-size:214px;font-weight:600;line-height:.85;letter-spacing:-.06em;margin:30px 0 0 -10px}
.when{display:flex;justify-content:space-between;margin-top:32px;padding-top:22px;border-top:3px solid #0a0a0a;font-size:50px;font-weight:500;letter-spacing:-.035em;line-height:1.1}
.tag{font-size:34px;font-weight:500;letter-spacing:-.02em;line-height:1.2;margin-top:18px}
.org{font-size:26px;font-weight:500;letter-spacing:-.01em;margin-top:14px}
.n{position:absolute;left:${PAD}px;right:${PAD}px;bottom:${BAR_H + 22}px;display:flex;justify-content:space-between;font-size:34px;font-weight:500;letter-spacing:-.02em}
.n b{font-weight:600}
svg{position:absolute;left:0;bottom:0;display:block}
</style></head><body>
<div class="top"><span>Genomics Thailand</span><span class="pill">${event.applyOpensLabel}</span></div>
<h1>GeTH<br>Hackathon</h1>
<div class="when"><span>${event.dateRange}</span><span>${event.venue.city}</span></div>
<p class="tag">${event.tagline}</p>
<p class="org">Organized by ${organizer}</p>
<div class="n"><span><b>50k</b> whole genomes</span><span>${totals.projects} projects</span></div>
<svg width="${W}" height="${BAR_H}">${bars}</svg>
</body></html>`;
}

const browser = await chromium.launch({channel: 'chrome'});
for (const [name, H] of [['post-square', 1080], ['post-portrait', 1350]]) {
  const page = await browser.newPage({viewport: {width: W, height: H}});
  const html = card(H);
  writeFileSync(rel(`../social/${name}.html`), html);
  await page.setContent(html, {waitUntil: 'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path: rel(`../social/${name}.png`).pathname});
  // Vector PDF with live text, for importing into Canva as an editable design.
  await page.emulateMedia({media: 'screen'});
  await page.pdf({path: rel(`../social/${name}.pdf`).pathname, width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: '1'});
  await page.close();
}
await browser.close();
console.log('wrote social/post-{square,portrait}.{html,png,pdf}');
