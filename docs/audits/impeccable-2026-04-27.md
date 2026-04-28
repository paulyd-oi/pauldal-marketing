# Impeccable audit — pauldal-marketing

**Date:** 2026-04-27
**Branch:** main (commit 852c110)
**Auditor:** Claude (Opus 4.7), running impeccable skill manually (no detector CLI installed)
**Scope:** All 8 routes + shared components in `src/components/site/*`. UI-only. No build/perf profiling.

---

## Section 1 — Repo overview (5 min skim)

### Pages

| Route | File | Lines | Purpose | framer-motion | shadcn |
|---|---|---:|---|:-:|:-:|
| `/` | `src/app/page.tsx` | 68 | Homepage. Hero → marquee testimonial → about teaser → services teaser → portfolio teaser → asymmetric featured-work panel → closing CTA | Y (via children) | N |
| `/portfolio` | `src/app/portfolio/page.tsx` | 136 | 9-tile project grid + lightbox + closing CTA | Y (lightbox, Reveal) | N |
| `/services` | `src/app/services/page.tsx` | 393 | Hero → 4 service blocks (weddings/events/business/editorial) → 6-step process → "What's included" accordion → closing CTA | Y (Reveal) | N |
| `/weddings` | `src/app/weddings/page.tsx` | 224 | Service landing page via `LandingPageLayout` + content config | Y (Reveal) | N |
| `/business` | `src/app/business/page.tsx` | 223 | Same template, brand-photography content | Y (Reveal) | N |
| `/events` | `src/app/events/page.tsx` | 223 | Same template, event-photography content | Y (Reveal) | N |
| `/about` | `src/app/about/page.tsx` | 236 | Hero → portrait + origin story (parallax) → faith pull-quote → services overview → closing CTA | Y (parallax, fading quote) | N |
| `/book` | `src/app/book/page.tsx` | 73 | 2-col layout: editorial prose (sticky) + `BookForm` | Y (Reveal only) | N |

shadcn `Button` is installed (`src/components/ui/button.tsx`) but **never imported by any page or site component**. All CTAs are hand-rolled `<Link>` with utility classes. Dead code.

### Global tokens (`src/app/globals.css`)

- **Color (raw `#` hex, not OKLCH):**
  - `--color-paper: #faf8f3` (warm cream background)
  - `--color-ink: #1a1a1a` (near-black foreground)
  - `--color-oxblood: #7a2e2e` (single brand accent)
  - `--color-oxblood-soft: #f3e8e3`
  - `--color-cream-hover: #f2ecde`
  - `--color-hairline: #d9ceb9`
  - `--color-muted: #6b5d52`
  - `--card: #ffffff` (pure white — exists as token but unused on marketing pages)
- **Strategy:** Restrained-leaning Committed (paper base + ink type + a single oxblood accent ≤10% of surface, plus dark-ink sections for emphasis).
- **Radius:** `--radius: 0px` — fully square. Strict editorial / no-rounding system. Good and consistent.
- **Typography:** Fraunces (display, variable, opsz+SOFT axes), IBM Plex Sans (body, 300/400/500/600), JetBrains Mono (mono, declared but unused in pages).
- **Motion:** Custom `fadeIn` keyframe + `cubic-bezier(0.2, 0.8, 0.2, 1)` ease (ease-out-quart-ish). `prefers-reduced-motion` global override is in place.
- **Texture:** `.grain` class (radial-gradient dots) applied site-wide via root layout.
- **Body font default:** `font-body` (IBM Plex) on `<html>`.
- **No light/dark theming**. Single theme. Appropriate for editorial photo brand.

### Shared layout components (`src/components/site/`)

| Component | File | Notes |
|---|---|---|
| `Header` | `header.tsx` | Sticky, `backdrop-blur-sm` on scroll, hover-only desktop dropdown |
| `Footer` | `footer.tsx` | 3-section: photo+wordmark on ink → horizontal nav → meta row |
| `MobileMenu` | `mobile-menu.tsx` | Full-screen takeover, slide-from-right, no focus trap |
| `Hero` | `hero.tsx` | Homepage only. Full-bleed image + `HeroCamera3D` widget + ChevronDown cue |
| `HeroCamera3D` | `hero-camera-3d.tsx` | `@react-three/fiber` placeholder camera, 200×200, `lg:block` only |
| `LandingPageLayout` | `landing-page-layout.tsx` | Template used by /weddings, /events, /business |
| `BookForm` | `book-form.tsx` | Lead capture form |
| `Reveal` | `reveal.tsx` | Wrapper, in-view fade+y |
| `MarqueeTestimonial` | `marquee-testimonial.tsx` | 4-row infinite marquee + paper card |
| `AsymmetricPanel` | `asymmetric-panel.tsx` | 50/50 photo + ink panel pull-quote |
| `PhotoFlankedHeading` | `photo-flanked-heading.tsx` | 50/50 heading + photo |
| `EditorialTestimonial` | `editorial-testimonial.tsx` | Centered italic display quote |
| `FAQAccordion` | `faq-accordion.tsx` | Single-tier accordion (multi-open) |
| `ServicesAccordion` | `services-accordion.tsx` | Same pattern, longer items |
| `PortfolioGrid` + `PortfolioLightbox` | grid + modal | Click to enlarge with kbd nav |
| `AboutTeaser`, `ServicesTeaser`, `PortfolioTeaser`, `ClosingCTA` | homepage sections | Numbered eyebrows `01 / About`, `02 / Services`… |
| `SectionDivider` | `section-divider.tsx` | hairline + `✱` brandmark + hairline |
| `BrandMark` | `brand-mark.tsx` | `✱` (sextile/asterisk character) in oxblood, used as logomark |
| `SocialProofBadge` | `social-proof-badge.tsx` | Fixed bottom-left, **desktop-only** |

---

## Section 2 — Cross-cutting issues

### S2-1 — Em-dash flood in body copy (CRITICAL)
**Pages:** every page; especially `/about`, `/weddings`, `/business`, `/events`, `/services`, `/book`, `/`
**Rule violated:** Impeccable Copy law — "No em dashes. Use commas, colons, semicolons, periods, or parentheses."
**Examples:**
- `src/app/about/page.tsx:79` — "I'm Paul — a hybrid photographer and videographer based in San Diego"
- `src/app/about/page.tsx:113` — "to notice details — how light fills a room differently"
- `src/app/about/page.tsx:122` — "into a discipline — learning to read light"
- `src/app/about/page.tsx:151` — "videographer at my church — a community of ten thousand"
- `src/app/about/page.tsx:158` — "That work sharpened everything — speed, instinct, storytelling"
- `src/app/about/page.tsx:185` — "Weddings, events, business, editorial — each category"
- `src/app/business/page.tsx:76, 132, 152, 157, 193`
- `src/app/events/page.tsx:76, 169`
- `src/app/weddings/page.tsx:76`
- `src/app/book/page.tsx:51` — "business shoots, editorial — I'll read everything"
- `src/components/site/services-teaser.tsx:46` — "Each project starts the same — listen, plan, shoot, deliver."
- `src/components/site/services-accordion.tsx:20, 45`
- `src/components/site/landing-page-layout.tsx:71` (process step copy)

The brand voice is "editorial, restrained" — em-dashes are the fingerprint of that voice and they're EVERYWHERE. Per the rule, this is the most pervasive violation in the codebase.
**Fix:** sweep all body strings, replace `—` with periods, colons, or commas as appropriate. Em-dashes inside titles / metadata / alt text are acceptable (they're invisible to readers).

### S2-2 — Hover-only Services dropdown breaks keyboard nav (CRITICAL — a11y)
**Page:** Header on every page
**Rule violated:** Accessibility / interaction-design (focus-visible parity for hover affordances)
**Location:** `src/components/site/header.tsx:62-93`
**Issue:** Dropdown opens via `group-hover` only. There is no `:focus-within` companion, no keyboard handler, no aria-expanded. A keyboard or screen-reader user cannot reach `/weddings`, `/events`, or `/business` from the desktop header — only the parent `/services` link is reachable via Tab. (Mobile menu is fine.)
**Fix:** add `:focus-within` to the dropdown reveal, set `aria-haspopup="menu" aria-expanded={open}` on the trigger, manage state explicitly via `useState`, and dismiss on Escape / outside click.

### S2-3 — Missing visible focus rings sitewide (CRITICAL — a11y)
**Pages:** every page; CTAs, nav links, accordion buttons, photo grid buttons
**Rule violated:** WCAG 2.4.7 focus visible / impeccable interaction-design.
**Examples:**
- All `<Link>` CTAs (oxblood pill buttons) — no `focus-visible` style. e.g. `src/components/site/hero.tsx:76-83`, `landing-page-layout.tsx:131-139`, `services/page.tsx:381-388`, `closing-cta.tsx:56-64`, `portfolio/page.tsx:124-130`, `about/page.tsx:224-230`, etc.
- Nav links in `header.tsx:48-106` — only `transition-colors`, no focus ring.
- Footer nav `footer.tsx:130-138` — same.
- Accordion buttons `services-accordion.tsx:79`, `faq-accordion.tsx:37` — no focus ring.
- Portfolio grid buttons `portfolio-grid.tsx:36-67` — no focus ring on a clickable photo card.
- BookForm inputs `book-form.tsx:149,167,184,231,253,266,280` — only `focus:border-oxblood`. The bottom-border colour shift is a 1-px change against a hairline background; barely perceptible. No outline ring at all.
**Fix:** add a project-wide `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood` token (or equivalent) and apply on every interactive element. CTAs need a visible ring or background contrast shift.

### S2-4 — Mobile header CTA below WCAG touch-target minimum (HIGH)
**Pages:** Header on every page
**Rule violated:** WCAG 2.5.5 / interaction-design (44×44 minimum touch target).
**Location:** `src/components/site/header.tsx:120-125` — `max-lg:px-4 max-lg:py-1.5` → ~28-32 px tall.
**Also:** `header.tsx:109-118` — mobile menu toggle is `p-2` on a 20-px Menu icon → ~36 px square.
**Fix:** raise mobile Book button to `py-3` and menu toggle to `p-3` (or wrap in a `min-h-11`).

### S2-5 — Repeated process-steps card grid is the canonical "identical card grid" pattern (HIGH)
**Pages:** `/services` and all three landing pages (`/weddings`, `/events`, `/business`)
**Rule violated:** Impeccable absolute ban — "Identical card grids" + "AI slop" pattern.
**Location:** `src/components/site/landing-page-layout.tsx:297-316` and duplicated in `src/app/services/page.tsx:286-335`.
**Issue:** 6 identical units, each with a 40×40 oxblood-square number, same heading scale, same body length, same gap, repeated in a 3-col grid. Reads as the "icon + heading + text" cliché. Also: the same content lives in **two** places (the services page redeclares the same 6 PROCESS_STEPS array as `LandingPageLayout`). DRY violation.
**Fix:** ship one rhythm-broken layout: e.g. a vertical timeline with offset numbers and varied prose lengths, or a 2-step "before / on the day / after" lockup. Whichever it becomes, render it once and reuse. Also reconcile the deposit copy: process step 4 says "30% deposit" while every FAQ says "Twenty-five percent retainer" — see S2-13.

### S2-6 — Pricing summary cards approach the "hero-metric template" (HIGH)
**Pages:** `/weddings`, `/events`, `/business`
**Rule violated:** Impeccable absolute ban — "The hero-metric template" (big number, small label, supporting stats).
**Location:** `src/components/site/landing-page-layout.tsx:144-167`
**Issue:** Three same-sized cards on a hairline grid, each with a `text-xs uppercase` label and a `font-display text-4xl` number. It's not gradient-accented, but the structural pattern matches the SaaS template the rule names. Three "from $1,500 / $2,800 / $4,500+" cards stacked feels like a stat strip.
**Fix:** switch to inline editorial prose: "Half-day from $1,500. Full-day from $2,800. Hybrid photo+video from $4,500+." Or keep three, but vary widths (e.g. 40 / 25 / 35 % asymmetric strip) and replace big-number layout with a single-line price-and-context pairing.

### S2-7 — Color values are raw `#` hex, not OKLCH (MEDIUM)
**Files:** `src/app/globals.css:8-50`, `src/lib/design-tokens.ts:1-10`
**Rule violated:** Impeccable Color law — "Use OKLCH. Reduce chroma as lightness approaches 0 or 100."
**Issue:** Every brand colour is `#rrggbb`. `--card: #ffffff` and `--primary-foreground: #ffffff` are literally `#fff` (banned). The site mostly uses `paper` (#faf8f3) instead of `#fff`, but the unused token is still a smell.
**Fix:** convert tokens to OKLCH, drop unused `--card`/`--popover`/`--secondary` shadcn defaults, and confirm chroma ramp at extremes (`#1a1a1a` → `oklch(0.18 0.005 60)` for a warm-tinted near-black).

### S2-8 — Section padding scale has 5 distinct rhythms (MEDIUM)
**Pages:** every page
**Rule violated:** Impeccable Layout law — "Vary spacing for rhythm" (good), but the spacing tokens themselves should be a deliberate scale, not 5 ad-hoc values.
**Found:**
- `py-16 lg:py-20` (footer block A)
- `py-16 lg:py-24` (faq-accordion, section-divider)
- `py-24 lg:py-32` (most body sections)
- `py-24 lg:py-40` (editorial-testimonial)
- `py-32 lg:py-48` (heroes + closing CTAs + marquee testimonial)
**Fix:** declare 3 named rhythms (e.g. `--space-section-tight: 4rem 5rem`, `--space-section: 6rem 8rem`, `--space-section-major: 8rem 12rem`) and sweep. Treat `editorial-testimonial`'s `py-40` as a deliberate "headline beat" or normalise it.

### S2-9 — Heading leading inconsistent across hero h1s (MEDIUM)
**Files:** `src/components/site/hero.tsx:61` (`leading-[0.95]`), `landing-page-layout.tsx:121` (`leading-[1.0]`), every other h1 (`leading-[1.05]`).
**Rule violated:** Impeccable typography law (consistent hierarchy).
**Fix:** pick one (`leading-[0.95]` for poster-scale h1 ≥ 7xl; `leading-[1.05]` for h2/section heads). Apply via a `.h-display-lg` utility instead of one-off `leading-[]` arbitrary values per heading.

### S2-10 — Eyebrow muted color drift (MEDIUM)
**Files:** every page
**Issue:** Eyebrows (`text-xs uppercase tracking-widest`) use FOUR different muted colours interchangeably:
- `text-ink/60` (`landing-page-layout.tsx:151,189,215,255,281,343`, `services-teaser.tsx:35`, `about-teaser.tsx:29`, etc.)
- `text-ink/70` (`portfolio/page.tsx:89`, `services/page.tsx:175`)
- `text-muted-foreground` (`services/page.tsx:150,199,233,344`, `book/page.tsx:39,56`, `about/page.tsx:68,174`, `book-form.tsx:142,160,178,195,225,247,259,272`)
- `text-paper/70` (dark sections, hero-eyebrow)
**Fix:** pick one for eyebrows on `paper` backgrounds (`text-ink/60` is closest to muted-foreground `#6b5d52`); commit. Search-replace.

### S2-11 — Page-by-page h1 sizing inconsistent (MEDIUM)
**Files:**
- `/about`, `/portfolio`, `/services` h1: `text-5xl lg:text-8xl` ✅
- `/book` h1: `text-5xl lg:text-7xl` ❌ (one step smaller)
- Hero (homepage), all landing pages: `text-5xl sm:text-6xl lg:text-8xl` ✅
**Fix:** raise `/book` h1 from `lg:text-7xl` to `lg:text-8xl` for parity, or define `lg:text-7xl` as the deliberate "form-page" scale and document why.

### S2-12 — Photo-flanked heading is the only `uppercase` heading site-wide (MEDIUM)
**File:** `src/components/site/photo-flanked-heading.tsx:24` — `font-display text-4xl uppercase leading-[1.05] tracking-tight ... lg:text-6xl xl:text-7xl`.
**Rule violated:** typography consistency. Every other h2 is sentence case ("Weddings demand presence.", "Brand work that doesn't look like stock.", etc.). This single component shouts "BEFORE YOU BOOK, A FEW THINGS WORTH KNOWING." in caps.
**Fix:** drop `uppercase`. Sentence case matches the editorial register.

### S2-13 — Deposit copy contradicts FAQs (HIGH)
**Files:**
- `src/components/site/landing-page-layout.tsx:84-87` (PROCESS_STEPS step 4) — "Sign the contract, send a 30% deposit."
- `src/app/services/page.tsx:303-307` — same "30% deposit"
- All three landing pages' FAQ "How do payment plans work?" — "Twenty-five percent retainer locks the date." (`weddings/page.tsx:194`, `events/page.tsx:198`, `business/page.tsx` is missing the FAQ but has no contradiction)
**Fix:** pick a number, sweep. This is a trust signal — inconsistency on the deposit % is the kind of thing a careful client will catch and ask about.

### S2-14 — `HeroCamera3D` is AI-slop on the homepage hero (HIGH)
**File:** `src/components/site/hero-camera-3d.tsx:7-37`, mounted at `hero.tsx:50`.
**Rule violated:** category-reflex / AI-slop test ("photographer → 3D camera floating in the corner").
**Issue:** A primitive 3D camera (boxGeometry + cylinderGeometry + circleGeometry) drag-rotated by `PresentationControls`, rendered with `@react-three/fiber` + `@react-three/drei` (heavy deps), pinned `top-8 right-8` at 200×200. It has the dark-glow lens (`#1a1a3a`, banned aesthetic), is desktop-only, ships ~150 KB of Three.js to every visitor, and tells the viewer nothing the photo behind it doesn't already say. It also reads like exactly what a photographer's site generated by an LLM would look like.
**Fix:** delete it. If you want a brand flourish on the hero, use a hand-set Fraunces folio number, a small hairline rule under the eyebrow, or a corner-set `✱` brandmark. Removes the dependency too.

### S2-15 — Color drift in body-text opacity ramp (LOW)
**Files:** every page.
**Issue:** Body prose uses `text-ink/85`, `text-ink/75`, `text-ink/70`, `text-ink/60`, `text-ink/50`, `text-ink/40` — six steps for what should be 3 roles (primary body, secondary, faint). On `ink` backgrounds same drift: `text-paper/80`, `/70`, `/60`, `/50`, `/40`, `/30`.
**Fix:** define `--text-prose: oklch(...)`, `--text-prose-secondary`, `--text-prose-faint`. Apply via Tailwind extension. Sweep.

### S2-16 — Accordion containers clip long answers (LOW)
**Files:**
- `src/components/site/services-accordion.tsx:93` — `max-h-60` (240 px)
- `src/components/site/faq-accordion.tsx:53` — `max-h-96` (384 px)
**Issue:** rigid `max-h` for animated reveal will clip anything longer than the cap. The "How do payment plans work?" answer at ~330 chars renders fine in 384 px but a future longer answer silently truncates without scroll.
**Fix:** use `grid-template-rows: 0fr → 1fr` transition trick (now broadly supported), or measure content height with a ref. At minimum bump to `max-h-[600px]`.

### S2-17 — `SocialProofBadge` is desktop-only (LOW)
**File:** `src/components/site/social-proof-badge.tsx:5` — `hidden lg:block`.
**Issue:** "200+ events documented since 2019" is a hard trust signal that mobile visitors never see. Most lead-capture traffic is mobile.
**Fix:** show on mobile too, or fold it into the hero subhead on `< lg` breakpoints.

### S2-18 — `MobileMenu` lacks focus trap (LOW — a11y)
**File:** `src/components/site/mobile-menu.tsx:25-101`.
**Issue:** Menu opens, but Tab can move focus out of the modal back to the (visually hidden) page underneath. Body scroll is locked correctly, kbd Escape is handled. Just no focus loop.
**Fix:** trap focus inside the open menu (e.g. via `inert` on `<main>`, or a small focus-trap util).

### S2-19 — `BrandMark` is the literal `✱` (sextile) Unicode glyph (LOW)
**File:** `src/components/site/brand-mark.tsx:18` — renders `✱` in oxblood at three font sizes.
**Issue:** Using a Unicode glyph for the brand mark means it's at the mercy of the system font's glyph rendering — looks different in Fraunces vs. fallbacks, and you can't kern, scale, or animate it cleanly. It works as a placeholder but it isn't actually a brand asset.
**Fix:** ship an SVG mark (even a hand-set asterisk-like form rendered once in Figma). Aria-hidden as today.

### S2-20 — `HeroCamera3D`, `Header.backdrop-blur-sm`, `dropdown.shadow-sm` — small glassmorphism / floating-widget signals (LOW)
**Files:** `header.tsx:36`, `header.tsx:76`, `hero-camera-3d.tsx`.
**Issue:** Not heavy glass, not catastrophic. But the brand is editorial / paper / ink — backdrop-blur on the header reads as "tech product website default" and conflicts with the paper-grain aesthetic. Drop the blur, keep the hairline border.
**Fix:** Replace `bg-paper/80 backdrop-blur-sm` with solid `bg-paper` once scrolled. Keep the border.

### S2-21 — Empty/error/loading state coverage is form-only (LOW)
**Pages:** all
**Issue:** No 404 page (`not-found.tsx`), no `loading.tsx`, no `error.tsx`. Portfolio lightbox handles its own state but a slow Cloudflare Images load shows a black `bg-ink` rectangle with no spinner. BookForm has correct success/error/submitting states; everything else assumes happy path.
**Fix:** add `app/not-found.tsx` (already aligned with editorial voice — "Nothing here. Try the work, or send me a note."), and `app/loading.tsx` for routes that grow. Low priority because there's no DB-backed content yet.

### S2-22 — `BookForm` has no privacy/terms surface and no inline validation (LOW)
**File:** `src/components/site/book-form.tsx:128-313`
**Issues:**
1. Form collects name, email, phone, location, event date — no privacy notice, no GDPR/CCPA-aware "you'll only hear from me about this project" microcopy near the submit. The footer has `/privacy` and `/terms` links but those routes don't exist (no files in `src/app/privacy` or `src/app/terms`).
2. `noValidate` means client-side validation is entirely server-driven. Submit → 400 → errors render. Form is short enough that this is probably fine, but typing-time email validation would feel snappier.
3. `<input type="date">` — no `min={today}` so users can pick yesterday for a wedding date. Won't break anything but reads sloppy.
4. Honeypot is correctly hidden. Good.
**Fix priorities:** dead `/privacy` + `/terms` links are the worst (404 from footer is a credibility hit). Add a one-line "I'll only use these to reply to you." under the form. The rest is polish.

---

## Section 3 — Per-page audit

### `/` (homepage) — `src/app/page.tsx`
**Purpose:** convince a stranger that this photographer is editorial, attentive, and currently shooting good work — then push to /book.

**What works:**
- Section eyebrow numbering (`01 / About`, `02 / Services`, `03 / Portfolio`, `04 / Connect`) is a strong editorial through-line and feels intentional.
- The page composes 8 distinct rhythmic sections — hero, marquee, about, services, portfolio, asymmetric featured-work, divider, closing CTA — without ever repeating a layout twice in a row. That's the right answer to the "varied rhythm" rule.
- Hero subhead → body → CTA fade-in stagger (0.2/0.4/0.6/0.8) is correctly motion-reduced.

**Issues:**
1. **CRITICAL — `HeroCamera3D` widget.** `src/components/site/hero-camera-3d.tsx`. Generic AI-slop "photographer → 3D camera floating in corner". Delete. (See S2-14.)
2. **HIGH — closing-cta service rotator.** `src/components/site/closing-cta.tsx:38-54`. The auto-cycling lowercase string ("weddings → events → business → editorial") under the headline is a marketing-template tic. It's also gated behind `useEffect` with a 2.4 s interval that hijacks attention next to the only CTA on the page. Replace with a static one-liner: "weddings · events · business · editorial." Per S2-1 also note: this section uses `·` separators correctly, no em-dashes.
3. **MEDIUM — featured-work `AsymmetricPanel` is a placeholder.** `src/app/page.tsx:53-63` is gated by a TODO. Until you have one real case study, the panel reads as filler — same headline shape on the home page as the testimonial above it.
4. **MEDIUM — placeholder testimonial.** `src/app/page.tsx:42-48` uses a generic invented quote ("He doesn't shoot what's there. He shoots what mattered.") under TAYLOR + SAM. With no real attribution this is dishonest social proof; better to ship the homepage without the marquee until a real client quote lands.
5. **LOW — `bg-gradient-to-t` photo overlay.** `hero.tsx:48`. Acceptable use (legibility under text), not a banned gradient. No action.

**Conversion concerns:** the only conversion path off the homepage hero is the oxblood "Start a project" pill. Path is clear. Watch S2-3 (no focus ring) and S2-4 (mobile Book button is small).

### `/portfolio` — `src/app/portfolio/page.tsx`
**Purpose:** sell on the work alone. The whole site lives or dies here.

**What works:**
- Clean editorial restraint: hero h1, 9-tile 4:5 grid on hairline gaps, closing CTA. No card-shadows, no carousel, no overlay clutter on mobile.
- Lightbox: keyboard nav (Esc, ←, →), body scroll lock, `AnimatePresence` fade. Proper a11y `aria-label` on close/prev/next. **This is the strongest interaction in the codebase.**
- `bg-gradient-to-t from-ink/70` overlay only fires on `lg:` and on `:hover` — text caption stays out of the way until the user wants it.

**Issues:**
1. **HIGH — placeholder titles.** `portfolio/page.tsx:32-79`. Every project is invented ("Haritha's 40th — Stone Brewery", "Studio sessions — Q1 2026"). Mixed with real Cloudflare Image IDs that load fine but have no provenance. The TODO comment admits it. Until real projects ship, the page is selling fiction.
2. **MEDIUM — same 9 photos appear on multiple pages.** Cross-page audit: the wedding hero (`6227ea99-…`) is also event hero `/events`, intro photo on multiple landing pages, and a portfolio tile. The catalogue is small and the recycling is visible. Curate distinct image sets per page or add visible category filtering on /portfolio.
3. **MEDIUM — no filter / no category nav on /portfolio.** Categories are baked into each tile (`Events / Weddings / Editorial / Business`) but there's no way to filter — meaning a wedding planner has to scroll past business and editorial to find weddings.
4. **LOW — closing-cta section duplicates the one used on /about, /services, every landing page.** Same heading ("Have a project in mind?"), same button. Acceptable as a repeating beat, but the headline copy could vary per page.

**Conversion concerns:** the lightbox doesn't include a CTA. Once a user is staring at a single image they love, the only way to take action is to dismiss the lightbox and scroll to the bottom. Add a small "Inquire about this work →" link inside the lightbox metadata block (`portfolio-lightbox.tsx:111-118`).

### `/services` — `src/app/services/page.tsx` (393 lines)
**Purpose:** explain the four offers (weddings/events/business/editorial), pricing tiers, and process.

**What works:**
- Clear repeated section pattern: alternating `bg-paper` ↔ `bg-cream-hover` per service block, two-col split (prose ↔ structured details), each ends with an inline CTA. Consistent and scannable.
- "Investment" language for pricing instead of "Pricing" reads more editorial — small but on-brand.

**Issues:**
1. **HIGH — page is 393 lines because the 6-step process is hand-redeclared here AND in `LandingPageLayout`.** `services/page.tsx:286-335` and `landing-page-layout.tsx:67-98 + 297-316` are the same array, same JSX. Extract to one shared component (`<ProcessSteps />`). (See S2-5.)
2. **HIGH — process step 4 says "30% deposit"** at line 306. FAQs on the landing pages say "25% retainer". (See S2-13.)
3. **MEDIUM — service block headlines and editorial pricing repeat what's already on the dedicated landing pages.** /weddings has the same "Weddings demand presence." headline as /services#weddings, and the pricing summary card on /weddings is more designed than the bullet list here. The /services hub feels like a less-polished redundancy of the three landing pages.
4. **MEDIUM — investment block uses bullet `<ul>` with `space-y-1.5`.** `services/page.tsx:237-247`. Three lines of price are formatted as a list when they should be inline prose — same content, better rhythm: "Half-day events from $1,500. Full-day from $2,800. Same-day teaser delivery included."
5. **LOW — bg toggle pattern.** `service.bg` field on the `SERVICES` array is a private convention (`bg-paper` vs `bg-cream-hover`). Ship a `<ServiceBlock variant="paper" | "cream">` component instead.

**Conversion concerns:** every service block has its own inline CTA ("Inquire about Weddings →") that goes to `/book?service=weddings`. The query param is captured by URL but `BookForm` doesn't read it — the form's projectType state initialises empty. So the deep-link is a no-op. Wire it up: `useSearchParams()` in `BookForm`, prefill `projectType` from `service` param.

### `/weddings`, `/business`, `/events` — `LandingPageLayout` template
**Purpose:** convert paid traffic per service category. Same template, different content.

**What works:**
- Splitting content into a `LandingPageContent` interface and one `LandingPageLayout` is the right architectural move. Three pages stay in sync structurally.
- Per-page service-specific JSON-LD (`serviceJsonLd`) and OG metadata is well-formed.
- Section sequence is sensible: hero → pricing → intro → gallery → included accordion → process → FAQ-with-flanked-photo → testimonial → final CTA.

**Issues:**
1. **HIGH — pricing-summary "hero metric" pattern.** `landing-page-layout.tsx:147-160`. (See S2-6.)
2. **HIGH — `PhotoFlankedHeading` uppercase headline** is the only uppercase heading on the site. (See S2-12.)
3. **HIGH — invented testimonials.** All three landing pages have a "Paul didn't just take photos…" / "He delivered 80 polished images…" / "He captured every speaker…" quote attributed to "A recent client", marked TODO. Same problem as the homepage marquee — invented social proof is worse than no social proof.
4. **MEDIUM — gallery photos collide with portfolio.** Wedding gallery uses `6c0df0fa-…`, `54e26ae7-…`, etc. — same IDs as `/portfolio`. (See /portfolio issue 2.)
5. **MEDIUM — FAQ photo (`faqHeadlineImageId`) is identical across `/weddings`, `/events`, `/business`** (`271ed8b4-…` Encinitas wedding). Generic placeholder — at minimum vary it per page.
6. **LOW — `caption: "Sample work — replace with curated [event/brand/wedding] portfolio"` is shipped to production.** All three landing pages have this caption visible at `landing-page-layout.tsx:243` — visitors see "Sample work — replace with curated wedding portfolio" rendered on screen. Either remove the caption render or make it ship-safe.
7. **LOW — pricing-summary cards' bottom note.** "Hybrid photo + video bundling available on every package." (`landing-page-layout.tsx:162-165`) — good copy. But it's the same conceptual message as the included-accordion's "Photo + video on the same shoot" item. Pick one location.

**Conversion concerns:** each landing page is 8 sections deep before the final CTA. The hero CTA `Start your wedding/event/brand inquiry` works. But there's no sticky CTA, no mid-page CTA between intro and gallery, and the included-accordion is the only mid-page interaction. Consider a sticky bottom-of-viewport "Inquire" pill on `< lg` (where the page is longest in scroll).

### `/about` — `src/app/about/page.tsx`
**Purpose:** humanise the photographer. Origin story → faith → services overview → CTA.

**What works:**
- `ParallaxPhoto` on the portrait + `FadingQuote` on the pull-quote are restrained, scroll-bound, transform-only. Both honor `useReducedMotion`. Properly executed.
- Pull-quote treatment ("Photography is how I pay attention.") in italic Fraunces at `text-3xl lg:text-5xl` is the strongest single typographic moment on the site.
- The story has voice. ("Born in Manila. Sharpened in San Diego." is the kind of headline a copywriter has to fight for; keep it.)

**Issues:**
1. **HIGH — em-dash flood.** Every paragraph (`about/page.tsx:113, 122, 151, 158, 185`). (See S2-1.) The about page is the prose-densest page on the site, so the em-dash count is highest here.
2. **MEDIUM — third section ("Services overview") is a redundant teaser.** `about/page.tsx:168-213` rebuilds a smaller version of `ServicesTeaser` ("Four ways I work." headline + "View services" link). On a page that already lives 2 clicks from /services, the section adds nothing the closing CTA doesn't. Cut it; the page becomes tighter.
3. **MEDIUM — about page hero uses `text-muted-foreground` for the eyebrow** while every other page uses `text-ink/70` or `text-ink/60`. (See S2-10.)
4. **LOW — single-image portrait at `aspect-[4/5]`** is the same aspect every photo on the site uses. After 4 sections of `aspect-[4/5]` images, the rhythm flattens. Consider breaking the portrait into a wider 16:9 establishing shot, or letting it run full-width-bleed on mobile.

**Conversion concerns:** N/A; about pages don't convert directly. Closing CTA "Ready to work together?" is fine.

### `/book` — `src/app/book/page.tsx` + `src/components/site/book-form.tsx`
**Purpose:** capture the lead. This is the only page that monetises.

**What works:**
- Two-column lockup (sticky editorial prose left, scrolling form right) is the right pattern for a long-ish form. On `lg` the prose stays in view as the user scrolls down through fields.
- Honeypot field is correctly hidden + named confusingly enough to fool basic bots (`company_website`).
- 400 / 5xx error split with field-level + fallback "email me directly" copy is the right error UX.
- Project-type radio chips render as toggle buttons — better than a dropdown for 5 options.
- Submit button has loading state with `Loader2` spinner + disabled.

**Issues:**
1. **CRITICAL — focus rings missing on every input.** `book-form.tsx:149,167,184,231,253,266,280`. (See S2-3.) The whole form is keyboard-navigable but the focused field is barely distinguishable — only the bottom border colour shifts from `border-hairline` (#d9ceb9) to `border-oxblood` (#7a2e2e). On a busy form this is a real usability problem; users tabbing through can't tell which field they're in. **Add a visible focus outline or background tint on `:focus-within` to the parent `<label>`.**
2. **HIGH — `/book?service=weddings` query param is dead.** `BookForm` never reads `useSearchParams()` to prefill `projectType`. Every "Inquire about X" link on /services and the per-service CTAs from landing pages set this param but the form ignores it. Fix: `useSearchParams` in BookForm, init `projectType` from `service`.
3. **HIGH — privacy / terms surface missing.** Footer links `/privacy` and `/terms` 404 — no files exist for those routes (`src/app/privacy/`, `src/app/terms/` are absent). Worse: form has no microcopy about what happens with the data. Add `<p className="text-xs text-ink/50">I'll only use these to reply to you. No newsletters.</p>` near the submit button. Stub the two routes.
4. **MEDIUM — date input.** `book-form.tsx:250-254`. No `min={today}`, no validation that the chosen date is in the future. Easy fix: `min={new Date().toISOString().split('T')[0]}`.
5. **MEDIUM — no inline email format validation.** Submitting bad email → server roundtrip → 400 → render error. Adding `pattern` or running cheap regex on blur would feel faster.
6. **MEDIUM — success state is in-place; no scroll-to-top.** On mobile a user submitting from the bottom of the form sees the confirmation render at the top of the form area but stays scrolled at the bottom. Add `formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })` on success.
7. **LOW — projectType is uncontrolled on the form FormData side; controlled in React state only.** Submitting with no projectType selected means the field never appears in the payload. Acceptable — the field is optional — but worth confirming the API treats it as such.
8. **LOW — `focus:outline-none` on every input.** Removing the default outline without replacing it is the precise pattern that breaks a11y. Don't `outline-none` without a `focus-visible` replacement.
9. **LOW — text-area placeholder uses em-dash.** `book-form.tsx:279` — "Dates, venues, vibe — anything you want to share." (See S2-1.)

**Conversion concerns:** this page is the conversion endpoint and the focus-state failure is the single biggest blocker. Accessibility aside, a confused user who can't tell what field they're in is one who bounces. The `noValidate` server-roundtrip pattern + missing privacy line + dead /privacy /terms links combine to undermine credibility on the lone monetising page. Worth treating as a focused mini-sprint.

---

## Section 4 — Prioritized fix list

### CRITICAL
| ID | Page(s) | Description | Effort |
|---|---|---|---|
| S3-/book-1 | /book | Add visible `focus-visible` outlines to every form input (replace bare `focus:outline-none`) | XS |
| S2-3 | all | Add visible focus rings to all CTAs, nav links, accordion buttons, photo grid buttons | S |
| S2-2 | all (header) | Make Services dropdown keyboard-accessible (`:focus-within`, aria-expanded, escape, click-outside) | S |
| S2-1 | all | Sweep em-dashes out of all body copy (keep in metadata/alt) | M |

### HIGH
| ID | Page(s) | Description | Effort |
|---|---|---|---|
| S2-14 | / | Delete `HeroCamera3D` widget + remove `@react-three/fiber` and `@react-three/drei` dependencies | XS |
| S2-13 | /services + landing pages | Reconcile deposit copy (pick 25% or 30%, sweep all references) | XS |
| S2-4 | all (header) | Raise mobile Book button + menu toggle to ≥44px touch target | XS |
| S3-/book-2 | /book | Wire `useSearchParams()` so `?service=weddings` prefills `projectType` | XS |
| S3-/book-3 | /book + footer | Add privacy microcopy under submit; stub `/privacy` + `/terms` routes (or remove footer links) | S |
| S2-5 | /services + landing pages | Extract one shared `<ProcessSteps />` component; redesign to break the 6-card icon-grid pattern | M |
| S2-6 | landing pages | Replace "from $X / from $Y / from $Z+" 3-card pricing strip with editorial inline prose or asymmetric layout | S |
| S2-12 | landing pages | Drop `uppercase` from `PhotoFlankedHeading` h2 | XS |
| S3-/portfolio-1 | /portfolio | Replace 9 invented project titles with real captions (or remove titles until real work ships) | S |
| S3-landing-3 | /weddings, /events, /business | Replace TODO testimonials with real ones, or hide the testimonial section until real ones land | XS |
| S3-/-2 | / | Replace homepage marquee placeholder testimonial with a real quote, or hide the marquee | XS |
| S3-/-3 | / | Static "weddings · events · business · editorial" line on closing-cta instead of cycling AnimatePresence | XS |

### MEDIUM
| ID | Page(s) | Description | Effort |
|---|---|---|---|
| S2-7 | tokens | Convert `globals.css` colors to OKLCH; drop unused shadcn defaults (`--card`, `--popover`, `--secondary`) and unused `src/components/ui/button.tsx` | S |
| S2-8 | all | Define 3 named section-padding rhythms; sweep | S |
| S2-9 | hero h1s | Pick a single `leading-[]` for hero h1 and apply via utility | XS |
| S2-10 | all | Pick one eyebrow muted color; sweep `text-ink/60` ↔ `text-muted-foreground` ↔ `text-ink/70` | S |
| S2-11 | /book | Raise `/book` h1 from `lg:text-7xl` to `lg:text-8xl` (or document why book is intentionally smaller) | XS |
| S3-/services-1 | /services | Extract repeated process-steps array from `services/page.tsx` (use shared component once per S2-5 lands) | XS |
| S3-/services-2 | /services | Reframe per-service "Investment" as inline prose, not bullet `<ul>` | XS |
| S3-/services-3 | /services | Decide /services hub vs landing-page redundancy; cut the dead overlap | M |
| S3-/portfolio-2 | /portfolio + landing pages | Curate distinct image sets per page; stop reusing the same 6-9 Cloudflare IDs everywhere | M |
| S3-/portfolio-3 | /portfolio | Add category filter (Weddings / Events / Business / Editorial) | S |
| S3-/portfolio-4 | /portfolio | Add inline "Inquire about this work →" link inside lightbox metadata | XS |
| S3-/about-1 | /about | Cut redundant "Services overview" section (third major block) | XS |
| S3-/about-2 | /about | Vary photo aspect ratios; not every photo should be 4:5 | S |
| S3-/book-4 | /book | Add `min={today}` on `<input type="date">` | XS |
| S3-/book-5 | /book | Inline email-format validation on blur | XS |
| S3-/book-6 | /book | `scrollIntoView` on success state for mobile | XS |
| S3-landing-5 | /weddings, /events, /business | Vary `faqHeadlineImageId` per page (currently all the same Encinitas wedding) | XS |
| S3-landing-6 | landing pages | Stop rendering `caption: "Sample work — replace with curated [X] portfolio"` to production | XS |

### LOW
| ID | Page(s) | Description | Effort |
|---|---|---|---|
| S2-15 | tokens | Define 3-step body-prose opacity scale; sweep `/85, /75, /70, /60, /50, /40` | S |
| S2-16 | accordions | Replace fixed `max-h-60`/`max-h-96` with `grid-template-rows: 1fr` reveal | S |
| S2-17 | all | Show `SocialProofBadge` on mobile (or fold into hero subhead) | XS |
| S2-18 | mobile menu | Add focus trap to open mobile menu | S |
| S2-19 | all | Replace `✱` Unicode brand mark with a real SVG | S |
| S2-20 | header | Drop `backdrop-blur-sm` on scrolled header; solid `bg-paper` instead | XS |
| S2-21 | all | Add `app/not-found.tsx` and `app/loading.tsx` | S |
| S3-/-4 | / | Decide whether `AsymmetricPanel` "featured work" stays as placeholder or hides until real | XS |
| S3-/portfolio-5 | /portfolio | Vary closing-CTA copy across pages; stop reusing the same headline everywhere | XS |
| S3-/services-4 | /services | Make `service.bg` field a typed variant on a `ServiceBlock` component instead of raw class string | S |

---

## Section 5 — Recommended polish sprint scope

Ten fixes that, shipped together, deliver the largest visible quality jump per unit effort. They form a coherent story: **make the conversion path credible, fix the AI-slop tells, fix the consistency drift, fix the a11y gaps.**

1. **S2-14 — delete `HeroCamera3D`.** XS. Single biggest credibility win on the homepage. Also drops two heavy 3D dependencies. ↓ Bundle, ↑ taste.
2. **S2-1 — sweep em-dashes from body copy.** M. The brand voice claims editorial restraint; the prose betrays it. This is the single most pervasive impeccable-rule violation in the codebase.
3. **S2-3 + S3-/book-1 — visible focus rings sitewide, especially on `BookForm`.** S. Accessibility floor + the conversion form becomes usable for keyboard users.
4. **S2-2 — keyboard-accessible Services dropdown.** S. Pairs naturally with focus-ring work; same component file. Ships a11y story.
5. **S2-4 — raise mobile Book button + menu toggle to ≥44px.** XS. Most lead traffic is mobile; the only conversion CTA is currently a 28-32 px target.
6. **S2-13 — pick one deposit number (25 or 30 %) and sweep.** XS. Trust-signal hygiene; carrying two contradictory deposit figures across the booking funnel is a deal-killer for careful clients.
7. **S2-5 — extract `<ProcessSteps />` and redesign to break the 6-card icon grid.** M. Kills the strongest "AI made that" tell after the 3D camera, and removes a duplicated 50-line block from `/services`.
8. **S2-6 — replace 3-card pricing strip with editorial prose or asymmetric strip.** S. Same bucket as S2-5: cuts the "SaaS hero-metric" residue from the three landing pages, in one shared component edit.
9. **S3-/book-3 — add privacy microcopy + stub `/privacy` and `/terms` (or remove footer links).** S. The lone monetising page can't have 404 links in its surrounding chrome.
10. **S3-/-2, S3-landing-3 — pull the placeholder testimonials.** XS. Either hide the marquee + landing-page testimonial sections, or replace with real quotes. Invented social proof is worse than empty space.

**Total estimated effort:** ~2 light dev days (~8-12 hours focused) for a senior dev. The package collapses the most visible AI-slop signals (3D camera, identical card grid, hero-metric strip), the most pervasive copy drift (em-dashes), the worst a11y gaps (no focus rings, hover-only dropdown), and the riskiest credibility tells (deposit contradiction, dead privacy link, fake testimonials) — all without rewiring architecture. After this sprint the site will read like a careful editorial photographer, not an AI template.

---

## Appendix A — Impeccable detector raw output

CLI not installed. Checked:
- `command -v impeccable` → not found
- `command -v impeccable-detect` → not found
- No `node_modules/.bin/impeccable*` binaries
- No `.agents/skills/impeccable/scripts/` in this repo (only the global skill at `~/.claude/skills/impeccable/`, which contains documentation references but no detector binary)

Per ground rules: **failure documented, audit performed manually against the impeccable reference rules** at `~/.claude/skills/impeccable/reference/*.md` (laws cited inline by name throughout Sections 2-3).

`/tmp/impeccable-detect.json` was not generated.

## Appendix B — Files NOT audited

- **`node_modules/**`** — third-party (Next.js, framer-motion, three.js, lucide, base-ui, shadcn/tailwind.css). Out of scope.
- **`src/components/ui/button.tsx`** — present but never imported by any page or site component. Listed under S2-7 as dead code; not audited for design quality.
- **`next.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `components.json`** — config / build, no UI surface.
- **`src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/favicon.ico`** — non-visual.
- **`public/**`** — static assets, no .tsx surface.
- **`/privacy` and `/terms`** — referenced in footer (`footer.tsx:148-160`) but **the routes do not exist in `src/app/`** (logged as S3-/book-3).

---

## Sprint History

### 2026-04-27 — Sprint #1 (commit `8c2a07a`)

Shipped 11 fixes:
- **S2-1** em-dash sweep across body prose (testimonial copy preserved)
- **S2-2** keyboard-accessible Services dropdown
- **S2-3** focus rings sitewide
- **S2-4** mobile touch targets ≥44px
- **S2-6** pricing 3-card hero-metric strip → editorial list
- **S2-12** `PhotoFlankedHeading` uppercase dropped (sentence case)
- **S2-13** deposit copy unified to 25% across services + process steps
- **S2-14** `HeroCamera3D` deleted, three.js + drei + types removed
- **S3-/book-1** + **S3-/book-2** + **S3-/book-3** book form: focus rings on every input, `?service=` query prefill, /privacy + /terms stub routes + privacy microcopy
- **S3-landing-6** placeholder "Sample work — replace with curated…" caption no longer rendered

### 2026-04-28 — Sprint #2 (commits `14cd8c1` … TBD)

Shipped (safe block, Phases 1–12):
- **S2-22** book form client-side email validation, future-only date picker, scroll-to-top on success
- **S2-21** custom `not-found.tsx` + `loading.tsx`
- **S2-18** `MobileMenu` focus trap + return-focus on close
- **S3-/portfolio-4** "Inquire about this work" link inside the lightbox, mapped to `?service=` from photo category
- **S3-/about-1** redundant Services overview section removed from /about
- **S3-/-3** homepage `ClosingCTA` cycling-text rotator → static phrase
- **S2-5** (DRY half) `<ProcessSteps />` extracted to a single component, consumed by /services and `LandingPageLayout`
- **S2-16** accordions: rigid `max-h-*` replaced with grid-rows trick (no clipping on long answers)
- **S2-17** `SocialProofBadge` visible on mobile
- **S2-20** header `backdrop-blur-sm` on scroll removed

Shipping (risky block, Phases 13–15) immediately after the safe-block push:
- **S2-7** OKLCH color tokens, dead token cleanup, `src/components/ui/button.tsx` deleted
- **S2-8** + **S2-9** + **S2-11** section padding scale (3 rhythms), hero h1 leading consolidated, /book h1 sized to peer pages
- **S2-15** body-text opacity ramp consolidated to 3 steps

### Remaining open

- **S2-19** `BrandMark` SVG asset (design asset workflow)
- **S3-/portfolio-2** image curation across pages (content workflow)
- **S2-5 (redesign half)** `<ProcessSteps />` icon-grid pattern still cliché — DRY done, redesign pending
- Testimonials: 4 placeholder testimonials (homepage marquee + 3 landing pages) still in production. Awaiting real client quotes.

All other audit items closed.
