---
name: GeTH Hackathon 2027
description: Swiss-poster site for the Genomics Thailand (GeTH) Hackathon, 7–12 February 2027, Chiang Mai.
colors:
  chiang-mai-vermilion: "#ff4a1c"
  press-black: "#0a0a0a"
  paper-white: "#ffffff"
  plate-grey: "#767676"
  hairline: "#e6e6e6"
  caption-grey: "#555555"
  panel-black: "#0a0a0a"
  panel-note: "#d0d0d0"
  panel-ghost: "#6a6a6a"
  panel-label: "#9a9a9a"
  panel-track: "#1f1f1f"
  footer-rule: "#2a2a2a"
  group-salmon: "#ff9a7f"
  group-blush: "#ffc8b8"
  group-graphite: "#4d4d4d"
  group-silver: "#cfcfcf"
  group-grey: "#9a9a9a"
typography:
  display:
    fontFamily: "Inter Tight, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "min(calc((100vw - 64px) / 7.3), 188px)"
    fontWeight: 600
    lineHeight: 0.85
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Inter Tight, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter Tight, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter Tight, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Tight, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  tag: "4px"
  cell: "12px"
  panel: "24px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  section: "clamp(64px, 10vw, 144px)"
  content-max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.chiang-mai-vermilion}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.press-black}"
    textColor: "{colors.paper-white}"
  button-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.pill}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.press-black}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  chip-selected:
    backgroundColor: "{colors.chiang-mai-vermilion}"
    textColor: "{colors.press-black}"
  tag-tba:
    backgroundColor: "transparent"
    textColor: "{colors.press-black}"
    rounded: "{rounded.tag}"
    padding: "1px 6px"
  panel-data:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.panel}"
    padding: "clamp(32px, 6vw, 80px) clamp(20px, 5vw, 72px)"
  nav-apply:
    backgroundColor: "{colors.chiang-mai-vermilion}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
---

# Design System: GeTH Hackathon 2027

## 1. Overview

**Creative North Star: "The Genome Poster"**

The site is a Swiss scientific poster pinned up for a hackathon. A strict 1440px grid, black type on white, and one vermilion signal carry everything. The only imagery is the dataset itself: the genome barcode (one bar per contributing project, width proportional to its genomes) and the dataset map (projects linked by continuation series and shared diseases). Nothing is illustrated, stocked or decorated; if a mark is on the page, it is data or it is type.

Scale does the persuading. The event name runs the full content width, section headings are set large with a grey slash prefix ("/ Genomics data."), and one dark panel holds the numbers. Everything around those moments stays quiet: hairline rules, generous section padding, plain sentences. The voice is PRODUCT.md's "precise, bold, open": credible enough to trust with a national genome programme, energetic enough to make a clinician want to be in Chiang Mai.

The system explicitly rejects the **startup SaaS landing page**: the hero-metric template, glassmorphism, identical icon-card grids, gradient text and buzzword copy.

**Key Characteristics:**
- One family (Inter Tight) carries every role through size and weight contrast.
- One accent (Chiang Mai Vermilion) for the wordmark, Apply actions, active states and cross-group links.
- Flat surfaces; depth comes from the always-dark Data panel and footer, never from shadows.
- Hairline-ruled lists instead of cards wherever a list will do.
- Light is the default theme; dark is an inversion from the same tokens, chosen by the visitor.

## 2. Colors

A black-and-white press sheet with one vermilion ink.

### Primary
- **Chiang Mai Vermilion** (#ff4a1c): the event wordmark, navbar title, primary and navbar Apply buttons, the selected topic chip, the current pager page, active dataset-map nodes, cross-group topic links and the Data panel bar fills. Used on display type and fills only; it never carries small body text on white (3.4:1 fails AA below 24px).

### Neutral
- **Press Black** (#0a0a0a): all body and heading text in light mode; the background in dark mode; text on every vermilion fill in both themes.
- **Paper White** (#ffffff): page background in light mode; text inside the Data panel and footer.
- **Plate Grey** (#767676): the heading slash, kicker, objective numerals, dashed same-group links. Set at exactly 4.5:1 on white; dark mode uses #8a8a8a.
- **Caption Grey** (#555555): secondary text (notes, captions, schedule times, status lines). Dark mode uses #b0b0b0.
- **Hairline** (#e6e6e6): every rule, divider, card outline and disabled fill. Dark mode uses #262626.
- **Panel Black** (#0a0a0a; #161616 with a #262626 hairline edge in dark mode): the Data panel. Its inner greys (Panel Note #d0d0d0, Panel Label #9a9a9a, Panel Ghost #6a6a6a, Panel Track #1f1f1f) are tuned for that surface only.
- **Footer** (#0a0a0a with #2a2a2a rules): always dark in both themes.

### Tertiary (data only)
- **Disease-group tints** for the genome barcode: Vermilion (Rare Diseases), Press Black (NCD, drawn white on dark), Group Grey #9a9a9a (Cancer), Group Salmon #ff9a7f (Pharmacogenomics), Group Graphite #4d4d4d (Infectious Diseases), Group Blush #ffc8b8 (Popgen), Group Silver #cfcfcf (Non-Rare & Non-Cancer). Never used outside data marks.

### Named Rules
**The One Ink Rule.** Vermilion is the only hue in the interface. Group tints exist only inside data marks; nothing else on the page may introduce a colour.

**The Token-Only Rule.** Components never hard-code a grey. Every colour is a CSS custom property in `src/css/custom.css`, defined once for light (`:root`) and once for dark (`html[data-theme='dark']`); a site test fails on known literals.

**The Always-Dark Rule.** The Data panel and the footer are dark surfaces in both themes. Text on them uses the panel and footer tokens, never `--ink` / `--paper`.

## 3. Typography

**Display Font:** Inter Tight (with Helvetica Neue, Helvetica, Arial)
**Body Font:** Inter Tight
**Label Font:** Inter Tight

**Character:** A single tight grotesque in three weights (400, 500, 600). Hierarchy comes entirely from scale jumps and weight; the rigour is the point, a Swiss poster set in one face.

### Hierarchy
- **Display** (600, content width ÷ 7.3 on desktop, capped by the 1440px container, ÷ 4.7 on two lines below 997px; line-height 0.85; −0.06em): the hero wordmark "GeTH Hackathon" only. The footer sign-off "See you at Chiang Mai" uses the same register (600, clamp(3rem, 12vw, 13rem), −0.055em).
- **Headline** (500, clamp(2.5rem, 7vw, 5.5rem), line-height 0.95, −0.05em): every section heading, in sentence case with a Plate Grey slash prefix and a trailing full stop ("/ Important dates.").
- **Title** (500, clamp(1.25rem, 2.6vw, 2.25rem), line-height 1.15, −0.03em): objective lines, dates, organiser names, the Apply lead, schedule card titles, link rows.
- **Body** (400, 17px, line-height 1.5): prose; the objectives intro caps at 68ch.
- **Label** (500, 11px, +0.04em, uppercase): short metadata only (status line, field labels, "Day 1", "Coming soon").

### Named Rules
**The Slash Rule.** Every section heading is `/ Sentence case.`: grey slash, capital first letter, full stop. No lowercase-forced headings, no eyebrow above them.

**The Label Rule.** Uppercase is reserved for labels of four words or fewer. Never set a sentence in the label style.

## 4. Elevation

The system is flat. There are no box-shadows anywhere. Depth is tonal: the always-dark Data panel and footer sit against the white page like a black plate on a poster, and hairline rules separate everything else. Hover and selection change fill or border colour, never lift.

### Named Rules
**The No-Shadow Rule.** `box-shadow` is prohibited. If an element needs separation, use a Hairline border or move it onto a dark surface.

## 5. Components

Flat, exact and confident: pills and hairlines, solid fills for state.

### Buttons
- **Shape:** full pill (999px).
- **Primary:** Chiang Mai Vermilion fill, Press Black text, 600 15px, padding 14px 24px. Label reads as an action ("Apply now ↗").
- **Hover / Focus:** fill inverts to Press Black with Paper White text; focus is a 3px vermilion outline offset 3px.
- **Disabled:** Hairline fill, Press Black text, `not-allowed` cursor (used when the form URL is unset).
- **Navbar Apply:** the same pill at 6px 16px, uppercase 12px label.

### Chips
- **Style:** transparent, 1px Hairline border, pill, 500 13px, padding 8px 12px, with a muted count ("colorectal 7").
- **State:** selected = vermilion fill with Press Black text (`aria-pressed="true"`); hover darkens the border to ink.

### Cards / Containers
- **Data panel:** the page's one dark plate. Panel radius (24px), Panel Black background, fluid padding, a rotated vertical caption ("genomics thailand"), ghost number, counters, bar chart, marquee and barcode.
- **Schedule day cards:** 1px Hairline outline (ink outline for opening and wrap-up days), panel radius (24px), 24px padding; three columns on desktop, stacked on phones with the four hacking days collapsed into one card.
- **Dataset-map group cells:** 1px Hairline outline, 12px radius, highlighted to ink on hover.

### Inputs / Fields
- **Search:** no box; a 2px ink underline, 500 1.25–1.75rem text, grey placeholder. Focus turns the underline vermilion.

### Navigation
- **Navbar:** white (black in dark mode) with a Hairline bottom rule; vermilion "GeTH Hackathon" title at left; uppercase 12px links (Objectives, Data, Dates & Venue, Schedule, Organizers); vermilion Apply pill and the light/dark toggle at right. Collapses to the Docusaurus hamburger sidebar below 997px.
- **Pager:** pill buttons (36px) with the current page filled vermilion; Previous and Next disabled at the ends.

### Genome Barcode (signature)
Inline SVG, one bar per project (118), width proportional to genomes, grouped and tinted by disease group. Appears under the hero (96px tall) and at the foot of the Data panel (56px, drawn white-on-dark). It is the site's only hero image.

### Dataset Map (signature)
Build-time, seeded force layout of 118 project dots (area ∝ genomes) in labelled disease-group cells. Solid ink lines join a project's later years; dashed grey lines join shared topics; dashed vermilion lines mark cross-group topics. Hover or tap shows a bordered tooltip; topic chips and group cells highlight subsets.

## 6. Do's and Don'ts

### Do:
- **Do** let the data be the image: use the genome barcode or dataset map before reaching for any illustration or photo.
- **Do** keep Chiang Mai Vermilion (#ff4a1c) to display type, fills and data marks; put Press Black (#0a0a0a) text on every vermilion fill.
- **Do** set section headings as `/ Sentence case.` with the Plate Grey slash.
- **Do** separate content with Hairline rules (#e6e6e6) and hairline-ruled lists before considering cards.
- **Do** define every colour as a token for both themes and check AA contrast in light and dark.
- **Do** give every animation a `prefers-reduced-motion` alternative (the marquee stops, and pauses on hover or focus).

### Don't:
- **Don't** build a startup SaaS landing page: no hero-metric template, no glassmorphism, no identical icon-card grids, no gradient text, no buzzword copy.
- **Don't** add box-shadows, blurs or glass surfaces; the system is flat.
- **Don't** introduce a second accent hue, or use disease-group tints outside data marks.
- **Don't** hard-code greys in components; use `--text-2`, `--mute`, `--rule` and the panel/footer tokens.
- **Don't** put an uppercase eyebrow above section headings; the slash is the only heading ornament.
- **Don't** set small text in vermilion on white.
- **Don't** show individual-level data in any visual; every mark is a project or group aggregate.
