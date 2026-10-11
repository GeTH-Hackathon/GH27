// Builds poster/poster-a4.html and poster/poster-a4.pdf from src/data. Run: node scripts/build-poster.mjs
// poster/qr.svg encodes https://gh27.bat.or.th/?utm_source=poster (regenerate with python `qrcode` if the URL changes).
import {readFileSync, writeFileSync} from 'node:fs';
import {chromium} from 'playwright';
import {barcodeLayouts} from '../src/lib/barcodeLayouts.ts';
import {event} from '../src/data/event.ts';
const organizer = event.partners.find((p) => p.role === 'Organizer')?.name ?? '';

const rel = (p) => new URL(p, import.meta.url);
const {projects, totals} = JSON.parse(readFileSync(rel('../src/data/wgs.json'), 'utf8'));
const colors = {
  'Rare Diseases': '#ff4a1c', NCD: '#ffffff', Cancer: '#9a9a9a', Pharmacogenomics: '#ff9a7f',
  'Infectious Diseases': '#4d4d4d', Popgen: '#ffc8b8', 'Non-Rare & Non-Cancer': '#cfcfcf',
};
const kfmt = (n) => `${(n / 1000).toFixed(1)}k`;
const BW = 1000, BH = 560;
const {order, grouped, columns} = barcodeLayouts(projects, {width: BW, height: BH, columnGap: 0.03});
const bars = order
  .map((p, i) => {
    const r = grouped[i];
    return `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${Math.max(r.height - 1.2, 0.5)}" fill="${colors[p.group] ?? '#9a9a9a'}"/>`;
  })
  .join('');
const labels = columns
  .map((c) => `<div class="col"><b>${kfmt(c.total)}</b><span>${c.group}</span></div>`)
  .join('');
const qr = readFileSync(rel('./../poster/qr.svg'), 'utf8').replace(/<\?xml[^>]*\?>/, '');
const short = (n) => n.replace(/^.*\((.*)\)$/, '$1');
const by = (role) => event.partners.filter((p) => p.role === role).map((p) => short(p.name)).join(', ');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${event.name} poster (A4)</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap">
<style>
@page{size:A4;margin:0}
*{margin:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html{background:#d8d8d8}
body{font-family:'Inter Tight','Helvetica Neue',Helvetica,Arial,sans-serif;color:#0a0a0a}
.page{width:210mm;height:297mm;background:#fff;margin:0 auto;padding:13mm 14mm 12mm;display:flex;flex-direction:column;overflow:hidden}
@media screen{.page{margin:10mm auto}}
.top{display:flex;justify-content:space-between;font-size:11pt;font-weight:500;letter-spacing:-.01em}
.top span:last-child{color:#555}
h1{font-size:37.5mm;font-weight:600;line-height:.85;letter-spacing:-.06em;color:#ff4a1c;margin:8mm 0 0 -2mm}
.when{display:flex;justify-content:space-between;align-items:flex-end;margin-top:9mm;padding-top:5mm;border-top:.35mm solid #0a0a0a}
.when .d{font-size:21pt;font-weight:500;letter-spacing:-.03em;line-height:1.1}
.when .c{font-size:21pt;font-weight:500;letter-spacing:-.03em;line-height:1.1;text-align:right;color:#555}
.tag{font-size:15pt;font-weight:500;letter-spacing:-.02em;line-height:1.2;margin-top:5mm;max-width:150mm}
.plate{flex:1;margin-top:8mm;background:#0a0a0a;color:#fff;border-radius:6mm;padding:8mm 8mm 6mm;display:flex;flex-direction:column;min-height:0}
.plate .head{display:flex;justify-content:space-between;align-items:baseline}
.plate .big{font-size:30pt;font-weight:600;letter-spacing:-.04em;line-height:1}
.plate .big small{font-size:11pt;font-weight:400;letter-spacing:0;color:#d0d0d0;margin-left:2mm}
.plate .note{font-size:9.5pt;color:#9a9a9a;text-align:right;line-height:1.3}
.plate svg{flex:1;min-height:0;width:100%;margin-top:6mm}
.cols{display:grid;grid-template-columns:repeat(7,1fr);gap:3%;margin-top:3mm}
.col{font-size:7.5pt;line-height:1.2;color:#d0d0d0}
.col b{display:block;font-size:10pt;font-weight:600;color:#fff;margin-bottom:.4mm}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;margin-top:8mm}
.facts div{border-top:.35mm solid #0a0a0a;padding-top:2.5mm;font-size:11pt;line-height:1.3}
.facts b{display:block;font-size:15pt;font-weight:500;letter-spacing:-.02em;margin-bottom:1mm}
.foot{display:flex;align-items:flex-end;gap:7mm;margin-top:8mm}
.qr{width:27mm;height:27mm;flex:none}
.qr svg{width:100%;height:100%;display:block}
.cta{flex:1}
.cta b{display:block;font-size:22pt;font-weight:600;letter-spacing:-.04em;line-height:1;color:#ff4a1c}
.cta p{font-size:10.5pt;line-height:1.35;margin-top:2mm;color:#555}
.who{text-align:right;font-size:8.5pt;line-height:1.35;color:#555;max-width:62mm}
.who b{color:#0a0a0a;font-weight:500}
</style></head><body>
<div class="page">
  <div class="top"><span>Genomics Thailand</span><span>Organized by ${organizer}</span></div>
  <h1>GeTH<br>Hackathon</h1>
  <div class="when"><div class="d">${event.dateRange}</div><div class="c">${event.venue.city}, ${event.venue.country}</div></div>
  <p class="tag">${event.tagline}</p>
  <div class="plate">
    <div class="head">
      <div class="big">50k<small>whole genomes</small></div>
      <div class="note">${totals.projects} projects, ${totals.groups} disease groups.<br>One bar per project. Aggregate counts only.</div>
    </div>
    <svg viewBox="0 0 ${BW} ${BH}" preserveAspectRatio="none" aria-hidden="true">${bars}</svg>
    <div class="cols">${labels}</div>
  </div>
  <div class="facts">
    <div><b>${event.seatsLabel.replace('About ', '~')}</b>Researchers, bioinformaticians, clinicians and data scientists.</div>
    <div><b>Thai nationals</b>Analysis stays inside a Trusted Research Environment.</div>
    <div><b>Opens November 2026</b>Apply by December. Participants announced January 2027.</div>
  </div>
  <div class="foot">
    <div class="qr">${qr}</div>
    <div class="cta"><b>gh27.bat.or.th</b><p>Scan to read the objectives, explore the dataset and apply.</p></div>
    <div class="who"><b>Supported by</b> ${by('Supported by')}<br><b>Data partners</b> ${by('Data partner')}</div>
  </div>
</div>
</body></html>`;

writeFileSync(rel('../poster/poster-a4.html'), html);
const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage({viewport: {width: 794, height: 1123}});
await page.setContent(html, {waitUntil: 'networkidle'});
await page.evaluate(() => document.fonts.ready);
await page.pdf({path: rel('../poster/poster-a4.pdf').pathname, format: 'A4', printBackground: true, preferCSSPageSize: true});
await page.emulateMedia({media: 'print'});
await page.screenshot({path: rel('../poster/poster-a4.png').pathname, fullPage: false});
await browser.close();
console.log('wrote poster/poster-a4.{html,pdf,png}');
