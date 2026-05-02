# WEDDINGS — Single Source of Truth

> Locked canonical values. Any drift between this file and code is a bug.
> When updating, update this file FIRST, then propagate to /weddings, /book,
> homepage, and any cross-channel surfaces (Google Business, Instagram, LinkedIn).

## Pricing

| Token | Value |
|---|---|
| `PRICING_FLOOR_WEDDING` | $4,995 |
| `PRICING_FLOOR_ELOPEMENT` | $2,000 |
| `PRICING_TIERS` | The Vow $4,995 \| The Covenant $6,995 \| The Legacy $9,995 |
| `ELOPEMENT_TIER` | The Elopement Film $2,000 (≤4hr coverage, single-cam, 2-3 min film) |
| `BUNDLE_TIERS` | Bundle 1 $7,495 \| Bundle 2 $10,995 \| Bundle 3 $14,995 |
| `RETAINER_POLICY` | 50% non-refundable Tiers 1–2; 30/30/40 for Tier 3 + bundles |

## Delivery timelines

| Token | Value |
|---|---|
| `PHOTO_DELIVERY_TIMELINE` | 4–6 weeks |
| `VIDEO_DELIVERY_TIMELINE` | 6–8 weeks |
| `TEASER_DELIVERY` | 48 hours (10–15 frames) / 7-day video sneak peek |

## Travel

| Token | Value |
|---|---|
| `TRAVEL_INCLUDED_RADIUS` | 60 miles from San Diego |

Travel tiers (FAQ):
- 60-mile radius from San Diego: included (covers SD County, Temecula, southern OC)
- 60–120 miles (LA, Palm Springs): mileage at federal rate
- 120–180 miles (Santa Barbara, Bakersfield): mileage + 1-night accommodation
- 180+ miles or fly-required: itemized travel quote
- International / destination weddings: custom quoted

## Public display copy

| Token | Value |
|---|---|
| `WEDDINGS_HERO_SUBHEAD` | Cinematic wedding films + editorial photography. San Diego based, available worldwide. |
| `WEDDINGS_PAGE_TITLE` | San Diego Wedding Videographer + Photographer \| Paul Dal Studios |
| `WEDDINGS_META_DESCRIPTION` | Cinematic wedding films and editorial photography for San Diego couples. Films begin at $4,995. Photo + video bundles from $7,495. |
| `LEAD_MAGNET_TITLE` | The Sacred Wedding Film Guide |
| `PRIMARY_CTA_LABEL` | Check My Date |
| `SECONDARY_CTA_LABEL` | Get the Pricing Guide |
| `WEDDING_COUNT_DISPLAY` | 70+ weddings |
| `EVENT_COUNT_DISPLAY` | 200+ events |
| `HOMEPAGE_AUTHORITY_STRIP` | DOCUMENTING A 10,000-MEMBER CHURCH · 70+ WEDDINGS · 200+ EVENTS |

## Investment block (verbatim, /weddings)

```
ELOPEMENTS & INTIMATE CEREMONIES
── from $2,000 ──
Up to 4 hours, single camera, 2-3 minute cinematic film. Designed for
courthouse ceremonies, micro-weddings, and vow renewals.
──────
WEDDING FILMS
── from $4,995 ──
Most couples invest $6,000–$10,000.
Full-day cinematic coverage, multi-camera, highlight film + ceremony cut.
──────
PHOTO + VIDEO BUNDLES
── from $7,495 ──
Hybrid coverage with editorial photography included.
```

## Locked invariants

- Voice on /weddings: cinematic register. No "documentary" language.
- No "flexible pricing" / "inquire for details" copy anywhere public.
- Do not mention Bethany Hamilton (no endorsement permission).
- Lead pipe: form posts to `https://app.pauldalstudios.com/api/leads` (FRAME).
- Hero video: self-host in `/public/hero/` (NOT Cloudflare Stream).
- Lead magnet PDF: self-host in `/public/` (NOT R2).
