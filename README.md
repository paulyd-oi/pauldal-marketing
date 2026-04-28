# Paul Dal Studios — Marketing Site

Public-facing marketing site for [pauldalstudios.com](https://pauldalstudios.com). Built with the same design language as the FRAME admin app (app.pauldalstudios.com) — Fraunces + IBM Plex Sans typography, oxblood accent, editorial paper aesthetic.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- React 19
- Tailwind CSS v4
- shadcn/ui (base-nova, neutral)
- Framer Motion
- Three.js + React Three Fiber + Drei
- Lucide React icons

## Local Development

```bash
npm run dev
```

Runs on **port 3850** (FRAME uses 3849).

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/portfolio` | Portfolio |
| `/book` | Book |

## Production Deploy

Push to `main` → Vercel auto-deploys. Domain mapping to pauldalstudios.com TBD.

## Design Tokens

Brand tokens ported from FRAME live in three places:
- `src/app/globals.css` — CSS custom properties
- `src/lib/design-tokens.ts` — typed TypeScript constants
- Tailwind theme — utility classes (`text-oxblood`, `bg-paper`, `font-display`, etc.)
