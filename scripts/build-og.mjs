// Renders static/img/og.png (1200x630 link-preview card) from the real dataset. Run: node scripts/build-og.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {chromium} from 'playwright';
import {barcodeLayouts} from '../src/lib/barcodeLayouts.ts';
import {event} from '../src/data/event.ts';
const organizer = event.partners.find((p) => p.role === 'Organizer')?.name ?? '';

const {projects} = JSON.parse(readFileSync(new URL('../src/data/wgs.json', import.meta.url), 'utf8'));
const colors = {
  'Rare Diseases': '#ff4a1c', NCD: '#0a0a0a', Cancer: '#9a9a9a', Pharmacogenomics: '#ff9a7f',
  'Infectious Diseases': '#4d4d4d', Popgen: '#ffc8b8', 'Non-Rare & Non-Cancer': '#cfcfcf',
};
const W = 1200, H = 630, PAD = 64, BAR_H = 168;
const {order, strip} = barcodeLayouts(projects, {width: W - PAD * 2, height: BAR_H, gap: 0.004, minWidth: 0.0012});
const bars = order
  .map((p, i) => `<rect x="${strip[i].x}" y="0" width="${strip[i].width}" height="${BAR_H}" fill="${colors[p.group] ?? '#9a9a9a'}"/>`)
  .join('');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap">
<style>
*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;background:#fff;color:#0a0a0a;font-family:'Inter Tight','Inter',Helvetica,Arial,sans-serif;position:relative;overflow:hidden}
.top{position:absolute;left:${PAD}px;right:${PAD}px;top:48px;display:flex;justify-content:space-between;font-size:26px;font-weight:500;letter-spacing:-0.02em}
.top span:last-child{color:#555}
h1{position:absolute;left:${PAD - 6}px;top:108px;font-size:159px;white-space:nowrap;font-weight:600;line-height:.85;letter-spacing:-0.065em;color:#ff4a1c}
.tag{position:absolute;left:${PAD}px;top:${H - PAD - BAR_H - 134}px;font-size:34px;font-weight:500;letter-spacing:-0.03em;line-height:1.12;max-width:760px}
.n{position:absolute;right:${PAD}px;top:${H - PAD - BAR_H - 134}px;text-align:right;font-size:34px;font-weight:500;letter-spacing:-0.03em;line-height:1.12}
.n b{font-weight:600}
svg{position:absolute;left:${PAD}px;top:${H - PAD - BAR_H - 34}px}
.org{position:absolute;left:${PAD}px;bottom:${PAD - 14}px;font-size:22px;font-weight:500;letter-spacing:-.01em;color:#555}
.org b{color:#0a0a0a;font-weight:500}
</style></head><body>
<div class="top"><span>Genomics Thailand</span><span>7–12 February 2027 \\ Chiang Mai</span></div>
<h1>GeTH Hackathon</h1>
<div class="tag">Unlocking 50k Thai genomes<br>for national precision medicine.</div>
<div class="n"><b>50k</b> genomes<br>118 projects</div>
<svg width="${W - PAD * 2}" height="${BAR_H}">${bars}</svg>
<div class="org"><b>Organized by</b> ${organizer}</div>
</body></html>`;

const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage({viewport: {width: W, height: H}});
await page.setContent(html, {waitUntil: 'networkidle'});
await page.evaluate(() => document.fonts.ready);
const out = new URL('../static/img/og.png', import.meta.url).pathname;
writeFileSync(out, await page.screenshot({type: 'png'}));
await browser.close();
console.log('wrote', out);
