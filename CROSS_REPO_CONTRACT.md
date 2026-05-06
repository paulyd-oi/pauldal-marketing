# Cross-Repo Contract — FRAME ↔ Marketing

This document is the canonical source of truth for the data contract
between the marketing repo's `/book` form and the FRAME `/api/leads`
endpoint. The same file lives at the root of each repo so future
Claude instances reading either repo solo see the contract from inside.

## Invariant

**Any added, renamed, or removed marketing form field requires synchronized
changes in BOTH repos plus a production smoke test proving persistence in
Neon.**

A schema change shipped to only one repo is a silent-drop bug waiting to
happen. The historical incident is FRAME PR #4: marketing was sending
4 fields FRAME's Zod schema was silently dropping via `.strip()` default.
Field validation succeeded, fields were dropped, the form felt healthy,
the dashboard had blanks. Don't repeat it.

## Cross-repo update procedure

1. **FRAME first** when the change touches schema (column add / rename /
   remove):
   - Update `prisma/schema.prisma`.
   - Generate migration via `npx prisma migrate diff --from-config-datasource
     --to-schema prisma/schema.prisma --script` and write the migration
     file by hand (Neon has no shadow DB so `prisma migrate dev` is
     non-interactive-rejected).
   - Apply with `prisma migrate deploy`.
   - Update `leadSchema` Zod block in `src/app/api/leads/route.ts`.
   - Update the `prisma.lead.create()` data block to pass the new field through.
   - Update this `CROSS_REPO_CONTRACT.md`.
   - Smoke test against prod with curl proving persistence.
   - Open a FRAME PR. Operator merges. Vercel deploys.

2. **Marketing second**:
   - Update `book-form.tsx` to capture and POST the new field.
   - Mirror the contract update in this file at the marketing repo root.
   - Smoke test prod end-to-end.
   - Open a marketing PR. Operator merges.

3. **Verification**: submit one real lead post-merge, dump the row via
   Prisma, confirm the new field landed.

## Current contract (as of 2026-05-02)

### Marketing form sends (POST /api/leads)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `email` | string | yes | |
| `phone` | string | no | |
| `projectType` | enum | yes | `weddings` / `events` / `business` / `editorial` / `other` (lowercase on the wire; FRAME normalizes to UPPERCASE for the Postgres enum) |
| `tier` | enum | no | `elopement` / `vow` / `covenant` / `legacy` — wedding-specific |
| `eventDate` | string (ISO date) | no | |
| `location` | string | no | |
| `budget` | string | no | |
| `message` | string | yes | min 10 chars |
| `partnerName` | string | no | wedding-specific |
| `guestCount` | string | no | wedding-specific, range strings like `"100-150"` |
| `whatsMostImportant` | string | no | wedding-specific |
| `weddingFlexible` | boolean | no | wedding-specific tri-state (null / true / false) |
| `eventId` | string | no | client-side Pixel event ID (TRANSIENT — not persisted, used for CAPI dedup only) |
| `fbc` | string | no | Facebook click ID cookie (TRANSIENT — CAPI only) |
| `fbp` | string | no | Facebook browser ID cookie (TRANSIENT — CAPI only) |
| `utmSource` | string | no | persisted to Lead |
| `utmMedium` | string | no | persisted to Lead |
| `utmCampaign` | string | no | persisted to Lead |
| `utmContent` | string | no | persisted to Lead |
| `utmTerm` | string | no | persisted to Lead |
| `landingPath` | string | no | persisted to Lead |
| `referrer` | string | no | persisted to Lead |
| `gclid` | string | no | persisted to Lead (Google Ads click ID) |
| `fbclid` | string | no | persisted to Lead (Meta click ID) |
| `website` | string | no | **HONEYPOT** — must be empty; non-empty triggers a silent 200 with `id: "blocked"` |
| `honeypot` | any | no | legacy honeypot kept for backward compat; same silent-block behavior |

### FRAME Lead model columns

See `prisma/schema.prisma` model `Lead`. Persisted columns include:

- All wedding qualifier fields above
- All UTM / attribution fields above (added Mega Prompt 4)
- `tier` (added FRAME-A)
- `callScheduled`, `calendlyEventUri`, `scheduledAt` (added FRAME-C)
- Standard fields: `id`, `createdAt`, `updatedAt`, `name`, `email`, `phone`, `projectType`, etc.

### Transient (NOT persisted) fields

- `eventId` — client Pixel event_id, sent to CAPI for dedup, never written
  to the Lead row.
- `fbc`, `fbp` — Facebook cookies, sent to CAPI for matching, never written
  to the Lead row.
- `website` / `honeypot` — bot bait fields. Validated as empty / falsy;
  never written anywhere.

### Endpoint behavior

| Status | Body | When |
|---|---|---|
| 201 | `{ ok: true, id: "<cuid>" }` | Lead created |
| 200 | `{ ok: true, id: "blocked" }` | Honeypot triggered (silent bot block) |
| 400 | `{ ok: false, errors: [...] }` | Zod validation failure (other than honeypot) |
| 429 | `{ ok: false, error: "rate-limited" }` + `Retry-After`, `X-RateLimit-*` headers | Rate limit (5 req/min per IP) |
| 500 | `{ ok: false, error: "Server error" }` | Unexpected server failure (DB, etc.) |

### Request handling order

1. Parse JSON body.
2. **Honeypot check** (`body.website` non-empty OR `body.honeypot` truthy)
   → silent 200 with `id: "blocked"`. Bot bucket never spends rate-limit
   slots that real users could need.
3. **Rate limit** (5 req/min per IP). Unknown-IP requests are allowed +
   logged rather than bucketed into one global slot.
4. **Zod validation**. On failure → 400.
5. Persist Lead row.
6. Fire-and-forget auto-reply email + internal notification.
7. Fire-and-forget Meta CAPI Lead event (only when `eventId` present and
   `projectType === "weddings"` and `META_CAPI_DISABLED !== "true"`).
8. Return 201.

### Auto-reply email

Service-aware. If `projectType === "weddings"`, fires
`INQUIRY_AUTO_REPLY_WEDDING` template (DB-edited via the FRAME admin UI;
hardcoded fallback in `src/lib/email-templates.ts`). Smart-field tokens:
`{{name}}`, `{{wedding_date}}`, `{{venue}}`, `{{pdf_link}}`,
`{{sample_films_link}}`. Other project types fire the legacy
`INQUIRY_AUTO_REPLY` template.

`{{calendly_link}}` was removed in the Mega-5 sprint when the operator
switched the wedding auto-reply to a 24-hour manual follow-up flow. The
dormant Calendly webhook + Lead.callScheduled / calendlyEventUri /
scheduledAt columns are preserved if Calendly is ever re-enabled.

### CAPI

Server-side Meta Conversions API (`src/lib/meta-capi.ts`) fires when:

- `eventId` is present in the payload (matches the client Pixel for dedup)
- `projectType === "weddings"`
- `META_CAPI_DISABLED !== "true"`
- `META_PIXEL_ID` and `META_CAPI_ACCESS_TOKEN` are set in env

Lead creation never depends on CAPI. The `META_CAPI_DISABLED` rollback
knob short-circuits without removing the access token.

### Calendly webhook

Separate endpoint `POST /api/webhooks/calendly`. When Calendly fires
`invitee.created`, the handler matches by inquirer email to the most
recent unbooked Lead, sets `callScheduled=true`, stores `calendlyEventUri`
+ `scheduledAt`. Idempotent via the `calendlyEventUri` unique index.

## Historical contract changes

| Date | PR | Repo | Change |
|---|---|---|---|
| 2026-05-01 | #3 | FRAME | `tier` field added to `Lead` (FRAME-A); wedding-specific `INQUIRY_AUTO_REPLY_WEDDING` template; Calendly webhook + `callScheduled`/`calendlyEventUri`/`scheduledAt` columns |
| 2026-05-01 | #4 | FRAME | `partnerName` / `guestCount` / `whatsMostImportant` / `weddingFlexible` added (closed silent-drop gap exposed by cross-repo verification) |
| 2026-05-02 | #5 | FRAME | Lint cleanup |
| 2026-05-02 | #6 | FRAME | Server-side Meta CAPI Lead event handler; transient `eventId` / `fbc` / `fbp` accepted in payload |
| 2026-05-02 | Mega-4 | FRAME | UTM / attribution columns; honeypot `website` field; rate limit refactor (5/min, headers); `META_CAPI_DISABLED` rollback flag; this contract document |
| 2026-05-02 | Mega-4 | Marketing | UTM capture client-side at landing time, propagated through `/book`; honeypot field in form; mirror of this contract |
