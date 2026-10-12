# Coach Happy Mmila

Marketing site for **Happy Mmila, Airbnb coach & property manager (Kampala & remote)**. Converts hosts into coaching
packages, management clients and Masterclass/event ticket buyers — mainly via prefilled WhatsApp messages.
Rebuilt from the high-fidelity prototype in [`docs/handoff/`](docs/handoff/README.md).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Radix primitives (shadcn conventions) ·
React Context for state. No environment variables are required.

## Getting started

```bash
npm install
npm run dev
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Full-bleed hero, trusted-by marquee, journey cards, philosophy, client results, masterclass teaser |
| `/about` | Story, how we work together, why work with Happy |
| `/services` | Four numbered services with prices and checklists |
| `/pricing` | USD/UGX toggle, coaching packages, property management, à la carte, FAQ |
| `/masterclass` | Hero, curriculum, cohort photo mosaic, testimonial |
| `/events` | Event cards + 4-step ticket checkout (tickets → details → payment → confirmed) |
| `/insights`, `/insights/[slug]` | Filterable posts, featured TEDx talk, three articles |
| `/contact` | Contact details + form that composes a WhatsApp message |

## Where things live

```
src/
  app/                    routes, root layout (fonts, chrome), globals.css (tokens, hero + dock CSS)
  components/site/        announcement bar, header + drawer, mobile dock, CTA band, footer, shared UI
  components/home/        hero, trusted-by marquee
  components/pricing/     currency toggle, FAQ accordion
  components/events/      checkout modal
  components/insights/    filter chips + post grid
  components/contact/     WhatsApp contact form
  context/                currency (USD/UGX), checkout (which event's sheet is open)
  lib/
    content.ts            all copy and data: packages, services, FAQs, events, articles, posts
    images.json/.ts       every image URL, keyed by name
    currency.ts           USD → UGX formatting (rate from NEXT_PUBLIC_UGX_RATE, default 3700)
    whatsapp.ts           phone/email constants and waLink()
```

**Breakpoints** match the prototype's width tiers (`globals.css`): `xs` 520 · `sm` 560 · `md` 760 · `lg` 880
(mobile below) · `xl` 960 (inline nav) · `2xl` 1000 · `3xl` 1240 (header CTA).

## Images

Photos and logos are currently loaded from the client's existing site and Vercel Blob (allowed in
`next.config.ts`). To self-host them:

```bash
npm run images        # downloads everything in src/lib/images.json into public/images/
```

then set `USE_LOCAL_IMAGES = true` in `src/lib/images.ts`.

## Before launch

- **Payments are mocked.** The checkout's payment step only generates a reference. Wire it to a provider that
  handles MTN/Airtel Mobile Money and cards (e.g. Flutterwave or Paystack) in
  `src/components/events/checkout-modal.tsx`.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel so Open Graph links are absolute.
- Update event dates and tiers in `src/lib/content.ts` (`EVENTS`) each cohort.
