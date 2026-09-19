# Kenya Buchanan — Luxury Fashion Experience Platform

A modern, mobile-first luxury fashion experience and client-management platform for
**Kenya Buchanan** — public website, client portal (**My Kenya B.**) and owner portal
(**Kenya B. Studio**).

> **Phase 1 — front-end prototype.** This repository is the visual foundation and a
> clickable prototype. Live payments, production authentication, real AI, email/SMS and a
> production database are intentionally **not** implemented yet. All data is fictional mock
> data, clearly separated from the UI so real services can be added later without a rebuild.
>
> The production site at kenyabuchanan.com is untouched. This project deploys to its own
> Netlify preview URL only.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** with a house design system (ink / bone / champagne, Cormorant Garamond + Jost)
- Deployed on **Netlify** via `@netlify/plugin-nextjs`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Architecture

| Path | Purpose |
| --- | --- |
| `src/app/(site)` | Public website (home, prom, bridal, custom, collections, about, live, partners, book) |
| `src/app/enroll` | Prom enrollment flow (details → agreement → deposit → confirmation) |
| `src/app/portal` | **My Kenya B.** — client portal |
| `src/app/studio` | **Kenya B. Studio** — owner/admin portal |
| `src/components` | Reusable UI, site, journey, portal and studio components |
| `src/lib/types.ts` | Domain model — the business objects the platform is built on |
| `src/lib/services.ts` | **The seam.** UI reads data only from here; Phase 2 swaps mock for API |
| `src/data` | Mock records (fictional clients, seasons, contracts, partners) |
| `src/config` | Brand/navigation config and the media manifest |
| `scripts/optimize-media.mjs` | Media pipeline: originals → optimised WebP |

### Key architectural rules

1. **Prom is one Experience, not the foundation.** Bridal, Custom and future experience
   types use the same journey, approval, appointment, payment and contract primitives.
   See `src/data/experiences.ts`.
2. **Owner-only data never reaches client surfaces.** `getPortalClient()` strips private
   owner notes and non-client-visible activity; only `src/app/studio/**` imports full records.
3. **Business rules are configuration, not code.** Capacity, deposits, approval types,
   rescheduling, upload counts and journey stages live in data so they can become
   owner-editable from Kenya B. Studio.
4. **Signed contracts are immutable.** A signed contract stores its own section snapshot and
   version; editing a template never alters an executed agreement.
5. **No secrets in this repository.** No API keys, credentials, payment secrets or real
   client data. All client records are fictional.

## Photography

Real Kenya Buchanan photography lives in `public/media/` and is mapped to media slots in
`src/config/media.ts`. Any slot without a mapping renders an editorial placeholder, so the
site is always complete. Originals are kept (unpublished) in `source-media/`.

```bash
node scripts/optimize-media.mjs   # re-generate optimised WebP after adding photos
```

## Phase 1 mock functionality

Everything below is a demonstration interface only — see `MockNotice` components in the UI:

- Payments and deposits (no processor, no card collection)
- Authentication and account activation (no auth, no passwords generated or shown)
- Digital contract execution and signed-copy generation
- Email/SMS notifications, interest list and waitlist signup
- Waitlist hold timers and automatic pass-through to the next person
- Ask Kenya B. (fixed sample answers — no AI)
- File uploads, videos and live streams (premium placeholders)
