---
target: home page
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-09-26T11-59-42Z
slug: src-pages-index-tsx
---
# Critique: home page (src/pages/index.tsx), 23/40 Acceptable

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Form is live ("Apply now"), but Important dates says applications open November 2026 (TBA) |
| 2 | Match system / real world | 3 | Plain copy; VCF, PLINK, CYP, NCD, Popgen, TRE unexplained on home |
| 3 | User control and freedom | 3 | Back to top, pausable marquee, external-link arrows |
| 4 | Consistency and standards | 2 | "Apply ↗" in-page anchor uses external arrow; TRE link naming varies; US/UK spelling mixed |
| 5 | Error prevention | 2 | No deadline or "what happens next" at the CTA; TRE link goes to placeholder |
| 6 | Recognition rather than recall | 3 | Dates split across Dates & venue and Important dates |
| 7 | Flexibility and efficiency | 2 | Apply ~6 screens down on mobile; no deadline beside CTA |
| 8 | Aesthetic and minimalist design | 3 | 51,461 x3, dates x3, Terms/TRE links x3 |
| 9 | Error recovery | 2 | Contact "To be announced"; no support path |
| 10 | Help and documentation | 1 | No FAQ (cost, travel, accommodation); TRE guidelines "coming soon" linked 3 times |

Anti-patterns: passes the AI-slop test overall (barcode from real data, slash headings, one accent). Template tells: Data panel hero-metric (ghost (51,461) plus counter row repeating it), default 01-05 numbering on objectives, six uniform 24px-radius schedule cards, "Unlocking" in the tagline. Detector: CLI 0 findings; browser 19 (1440) / 18 (390): 1 real contrast failure (navbar title #ff4a1c on white 3.4:1 at 21.6px/600), 2 borderline line-length (Apply eligibility ~88ch, NDA note ~91ch), rest false positives (sr-only overflow, display leading, Swiss labels, single-font, intentional overflow clip).

## Priority issues
- [P1] Application status contradicts itself; no deadline or next step at the Apply CTA. Fix: "Applications open now"; add "Deadline: December 2026 · Results: January 2027" under the button and in the hero status line. Command: clarify
- [P1] Missing applicant answers and dead ends: no cost/travel/accommodation info, contact TBA, TRE placeholder linked 3 times, Links section duplicates footer. Fix: "What's covered" row, contact email, unlink TRE until ready, trim Links. Command: harden
- [P1] Navbar title "GeTH Hackathon" fails AA (3.4:1; not large text). Fix: set title >=24px bold, or ink title with vermilion only on a larger mark, or a darker vermilion for small text. Command: typeset
- [P2] Data panel reads as hero-metric template; barcode colours have no key; marquee is bare acronyms. Fix: drop duplicate counter, colour bars with group tints as the barcode legend, show data-type descriptions. Command: distill
- [P2] Display type everywhere flattens hierarchy; tracking below -0.04em (wordmark -0.06, headings -0.05, sign-off -0.055); no text-wrap balance/pretty (orphans "health.", "Mai"). Command: typeset
- [P3] Scaffolding: 01-05 objective numbers, uniform schedule cards at 24px radius, lumpy mobile eligibility pill. Command: layout

## Persona red flags
- Jordan: GeTH not expanded in hero; no cost/outcome info; acronyms unexplained.
- Riley: live form vs "opens November"; TRE placeholder; dark-mode panel barely separates (#161616 on #0a0a0a); marquee focusable div without role; Links duplicates footer.
- Casey: 9.5k px page, Apply ~6 screens down, no persistent mobile Apply; ungainly eligibility pill.
- Thai clinician: criteria read as "not for you" (technical skill, genomics experience); nothing says teams mix disciplines.

## Minor
"Unlocking" buzzword; "See you at Chiang Mai" (idiom is "in", user chose "at"); kicker repeats wordmark; 10px TBA; only the marquee moves; Cancer/Infectious barcode greys close; Apply prose line length ~90ch at 1440.

## Questions
1. What one date must every visitor remember, and why isn't it the second-largest thing on the page?
2. What if the barcode were the only home-page data graphic, fully labelled, with counters moved to /data?
3. What would make a clinician believe they belong in this room?
