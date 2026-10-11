import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Served from the custom domain gh27.bat.or.th (GitHub Pages; geth-hackathon.github.io/GH27/ redirects here).
// Override with SITE_URL / BASE_URL to build for another host or sub-path.
const url = process.env.SITE_URL ?? 'https://gh27.bat.or.th';
const baseUrl = process.env.BASE_URL ?? '/';

const config: Config = {
  title: 'GeTH Hackathon 2027',
  tagline: 'Unlocking 50k Thai human genomes for national precision medicine.',
  favicon: 'img/favicon.svg',
  future: {v4: true},
  url,
  baseUrl,
  trailingSlash: true,
  organizationName: 'GeTH-Hackathon',
  projectName: 'GH27',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en']},
  headTags: [
    {tagName: 'meta', attributes: {property: 'og:type', content: 'website'}},
    {tagName: 'meta', attributes: {property: 'og:site_name', content: 'GeTH Hackathon 2027'}},
    {tagName: 'meta', attributes: {property: 'og:image:alt', content: 'GeTH Hackathon 2027, Chiang Mai, 7–12 February 2027, over a barcode of 118 Thai genome projects'}},
    {tagName: 'meta', attributes: {property: 'og:image:width', content: '1200'}},
    {tagName: 'meta', attributes: {property: 'og:image:height', content: '630'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
    {
      // Hides the hero parts only while its intro is about to run; removed by the intro, or after 1.5s regardless.
      tagName: 'script',
      attributes: {},
      innerHTML:
        "(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.setAttribute('data-motion-intro','');setTimeout(function(){d.removeAttribute('data-motion-intro')},1500)}}catch(e){}})();",
    },
  ],
  stylesheets: ['https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap'],
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          createSitemapItems: async ({defaultCreateSitemapItems, ...params}) =>
            (await defaultCreateSitemapItems(params)).map((item) => ({
              ...item,
              priority: new URL(item.url).pathname === '/' ? 1 : item.url.includes('/data/') ? 0.7 : 0.3,
            })),
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Link-preview card (Facebook, LinkedIn, X); regenerate with `node scripts/build-og.mjs`.
    image: 'img/og.png',
    metadata: [
      {name: 'keywords', content: 'GeTH Hackathon, Genomics Thailand, Thai genomes, whole genome sequencing, precision medicine, hackathon, Chiang Mai, bioinformatics, 2027'},
      {name: 'theme-color', content: '#ff4a1c'},
    ],
    // Light by default for every visitor; the navbar toggle switches to dark and remembers the choice.
    colorMode: {defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: false},
    navbar: {
      title: 'GeTH Hackathon',
      items: [
        {to: '/#objectives', label: 'Objectives', position: 'left'},
        {to: '/#data', label: 'Data', position: 'left'},
        {to: '/#dates', label: 'Dates & Venue', position: 'left'},
        {to: '/#schedule', label: 'Schedule', position: 'left'},
        {to: '/#organizers', label: 'Organizers', position: 'left'},
        {to: '/#apply', label: 'Apply', position: 'right', className: 'navbar-apply'},
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
