Surfnsail — bilingual (EN/ES) marketing site for a luxury catamaran charter company in Bocas del Toro, Panama. Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl v4.

## Getting Started

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — this redirects to `/en` (default locale). Spanish is served at `/es`.

## Structure

- `src/proxy.ts` — next-intl locale routing (this Next.js version renames `middleware.ts` to `proxy.ts`), also sets `X-Robots-Tag: noindex` on non-production deploys.
- `src/i18n/` — routing, request config and typed navigation for next-intl.
- `src/content/{en,es}/` — long-form page copy (fleet specs, packages, FAQ, activities, crew bios), typed via `src/lib/content-types.ts`.
- `messages/{en,es}.json` — short UI strings (nav, buttons, form labels).
- `src/app/[locale]/` — one route per page; `src/app/sitemap.ts` and `src/app/robots.ts` sit outside the locale segment and cover both languages.
- `src/lib/structured-data.ts` — JSON-LD builders (LocalBusiness, Boat, TouristTrip/Offer, FAQPage, Review/AggregateRating, BreadcrumbList, Organization).
- `src/components/SmartImage.tsx` — renders a labeled placeholder for any image path not yet delivered by the client, so dropping in real photos later is a one-line change (add the path to `AVAILABLE_IMAGES`).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends the contact/enquiry form via [Resend](https://resend.com) (`src/app/api/contact/route.ts`). The `from` address (`enquiries@surfnsail.pa`) requires the domain to be verified in Resend before it will send. |

## Open items before launch (see AGENTS.md brief §9)

- **Prices** — figures on `/packages` are last-known reference values pulled from the live site; confirm current rates with the client before go-live (`src/content/{en,es}/packages.ts`).
- **Exta Sea** — specs and photos are placeholders pending Jeremy/Mireille (`src/content/{en,es}/fleet.ts`).
- **Photos** — only `drone-sail.jpeg` and `chill.jpeg` have arrived; everything else renders as a labeled placeholder via `SmartImage` until real files land in `public/images/...`.
- **Captain ↔ boat mapping** — currently Marius/Aventura, Jeremy/Exta Sea; confirm with client.
- **Booking flow** — `site.bookingHref` in `src/lib/site.ts` currently points "Book Now" at `/contact`; swap in an external booking URL if the client wants to keep one.
- **Social handles** — Instagram/Facebook URLs in `src/lib/site.ts` are best-guess; confirm exact handles.
- **Brand green** — `--color-brand-600` in `src/app/globals.css` is a placeholder; swap for the exact logo hex once supplied.
