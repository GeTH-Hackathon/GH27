// @ts-check
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Served from the custom domain gh27.bat.or.th (GitHub Pages; geth-hackathon.github.io/GH27/ redirects here).
// Override with SITE_URL / BASE_URL to build for another host or sub-path.
const site = process.env.SITE_URL ?? 'https://gh27.bat.or.th';
const base = process.env.BASE_URL ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  outDir: 'build',
  publicDir: 'static',
  build: {format: 'directory', assets: 'assets'},
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.priority = path === base ? 1 : path.includes('/data/') ? 0.7 : 0.3;
        return item;
      },
    }),
  ],
  // Privacy and security by design (docs/security-privacy.md): every script and style is hashed into a CSP
  // <meta>, and nothing may load from or connect to another origin.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      // No inline event handlers. Inline style attributes stay allowed: React and the barcode set them,
      // and they can only restyle the page, not run code.
      scriptDirective: {resources: ["'self'", {resource: "'none'", kind: 'attribute'}]},
      styleDirective: {resources: ["'self'", {resource: "'unsafe-inline'", kind: 'attribute'}]},
    },
  },
  // No code blocks on the site; Shiki's inline styles would also break the CSP.
  markdown: {syntaxHighlight: false},
});
