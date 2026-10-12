# Handoff: Coach Happy Mmila — Marketing Site

## Overview
Multi-page marketing site for **Happy Mmila, Airbnb coach & property manager (Kampala & remote)**. Goal: convert hosts into paid coaching packages, management clients and Masterclass/event ticket buyers. Primary conversion channel is **WhatsApp** (prefilled messages to `+256 757 533 151`); secondary is the Contact form and in-site event checkout.

Pages: Home · About · Services · Pricing · Masterclass · Events (with ticket checkout) · Insights (list + article) · Contact.

## About the design files
Files in `reference/` are **design references built in HTML** — a working prototype of intended look and behaviour, not production code. Recreate them in the target stack (recommended: **Next.js App Router + TypeScript + Tailwind or CSS Modules**, deployed on Vercel) using its normal patterns. Open `reference/index.html` in a browser (it needs `support.js` beside it and an internet connection) to inspect any screen. Routing in the prototype is hash-based (`#/pricing`); use real routes in production (`/pricing`, `/insights/[slug]`).

## Fidelity
**High-fidelity.** Final colours, type, spacing, copy and interactions. Recreate pixel-faithfully. Shipped configuration: **full-bleed hero · Lora + Figtree · USD default**.

---

## Design tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `ink` | `#2A1C15` | Primary text, dark buttons, announcement bar, footer |
| `ink-hero` | `#2B1C13` | Hero background (full-bleed) |
| `cream` | `#F6F1EA` | Page background, light text on dark |
| `paper` | `#FBF8F3` | Selected/raised surfaces (checkout options) |
| `sand` | `#EFE8DD` | Alternate section bg, Trusted-by strip |
| `sand-2` | `#EBE2D5` | Text on announcement bar |
| `line` | `#D8CCBD` / `#E2D7C6` | Dividers |
| `rust` | `#9E4F2C` | Accent on light (eyebrows, active nav, links, italic emphasis) |
| `copper` | `#D9A47E` | Accent on dark (eyebrows, `<em>` in dark headings, selection) |
| `body` | `#4A3A30` | Body copy on light |
| `muted` | `#6B5A4E` | Secondary text, labels |
| `faint` | `#A8988A` | Inactive steps, tertiary |
Hairlines: `rgba(42,28,21,.1)`; outline buttons on light: `rgba(42,28,21,.35)`; on dark: `rgba(246,241,234,.5)`.
Links default `#9E4F2C`, hover `#2A1C15`. `::selection` bg `#D9A47E`.

### Typography
- Display: **Lora** (400/500, italic 400/500) — `'Lora', Georgia, serif`
- Body/UI: **Figtree** (400/500/600) — `'Figtree', system-ui, sans-serif`
- Headings always weight 400; emphasis word in each headline is `<em>` italic in accent colour (`rust` on light, `copper` on dark).

| Role | Size | Line-height | Tracking |
|---|---|---|---|
| H1 (hero/page) | `clamp(36px, 7vw, 98px)` | .94 | -.025em |
| H1 (secondary pages, compact) | `clamp(30px, 5.4vw, 64px)` | ~1 | -.02em |
| H2 section | `clamp(24px, 3.6vw, 48px)` | ~1.05 | -.02em |
| H2/H3 card title | `clamp(25px,3.2vw,32px)` / `clamp(27px,3.4vw,34px)` | 1.1 | -.01em |
| Body large | `clamp(15.5px, 1.4vw, 19px)` | 1.7 | — |
| Body | 15–16px | 1.65 | — |
| Eyebrow / button label | 12px, weight 600, UPPERCASE | — | .16em (dock .14em) |
| Announcement bar | 13px | — | .04em |
Use `text-wrap: balance` on headings, `pretty` on paragraphs.

### Spacing & layout
- Content max-width **1180px**, centred; header inner max-width **1560px**.
- Page gutter: `clamp(14px, 4vw, 46px)`.
- Section vertical padding: `clamp(56px, 7vw, 96px)` (some `clamp(48px,7vw,96px)`).
- Grid gaps: `clamp(40px, 6vw, 88px)` for 2-col hero/feature splits; 12px between buttons.
- Card grids: 1 col < 560px, 2 col < 960px, 3 col ≥ 960px.

### Shape & elevation
- Radius **2px** everywhere (buttons, inputs, cards). No pills, no large radii.
- Header: glass — `background: linear-gradient(180deg, rgba(255,252,247,.62), rgba(246,241,234,.48)); backdrop-filter: blur(22px) saturate(160%); box-shadow: 0 8px 30px rgba(42,28,21,.08);` **no borders**.
- No other shadows except modal sheet.

### Buttons
- Primary on light: bg `ink`, text `cream`; hover bg `rust`.
- Primary on dark: bg `cream`, text `ink`; hover bg `copper`.
- Outline: 1px border (see hairlines), transparent bg; hover border full-opacity.
- Padding: `clamp(13px,1.7vw,18px) 30px` desktop; `12px` horizontal on mobile where buttons go `flex: 1 1 0` side by side (never stacked).
- Label switches: "View packages" → "Packages" under 520px.

---

## Breakpoints & device logic (important)
The hero is the most tuned part of the site. Recreate these conditions exactly:
- `mobile` = width < 880 (centred text, bottom dock enabled, drawer nav)
- `compact` = width < 960 (inline nav hidden → burger)
- `phonePortrait` = width < 760 **and not** touch-landscape
- `tabletPortrait` = `(orientation: portrait)` and width ≥ 600 (and < 760 for dock rules)
- `touchLandscape` = `(orientation: landscape) and (pointer: coarse)`
- `wide` = width ≥ 760 **and** aspect ratio > 1.15
- Header CTA "Book a consultation" only ≥ 1240px.

---

## Global chrome

### Announcement bar (toggleable)
Full-width `ink` bar, 10px 20px padding, centred, single line (nowrap). Copy by width: <520 "Next masterclass intake now open · Book"; <900 "Masterclass cohorts run twice a year · Reserve your seat"; else "Masterclass cohorts run twice a year — the next intake is forming now. · Reserve your seat". CTA in `copper`, underlined (offset 3px) → opens Events checkout for the Masterclass.

### Header
`position: sticky; top: 0; z-index: 20`. It **overlays** the first section: header has `margin-bottom: calc(-1 * var(--hh))` and `<main>` has `padding-top: var(--hh)`; full-bleed heroes pull up with `margin-top: calc(-1 * var(--hh))` so the glass shows from load. `--hh` = live header height (ResizeObserver).
- Left: wordmark "Happy *Mmila*" (Lora, italic surname) with tiny "AIRBNB COACH" tracked label below.
- Centre (≥960): Home, About, Services, Pricing, Masterclass, Events — active item `rust` with 1px underline.
- Right: "Book a consultation" (≥1240) + burger. Burger = two lines (top `clamp(32px,3.4vw,52px)`, bottom `clamp(24px,2.5vw,38px)`, 1.5px, right-aligned, gap `clamp(7px,.6vw,9px)`), hit area ≥ 44px.
- Padding `clamp(10px,2vw,18px) clamp(14px,3vw,48px)`.

### Drawer menu
Full-screen dark overlay (`ink`), numbered links 01–08 in Lora, active in `copper`. Click backdrop closes. On desktop it lists only Insights & Contact (others are in the bar).

### Mobile bottom dock (< 880px, not on Contact)
Fixed bottom bar, 2 equal buttons: **Packages** (outline) · **WhatsApp** (solid). Min-height 52px. Padding `10px 16px calc(10px + safe-area)`.
- Hidden by default (`translateY(110%)`); **slides in while scrolling and hides 1.6s after scrolling stops** (transition .35s `cubic-bezier(.2,.7,.2,1)`).
- **Over the home full-bleed hero** (hero bottom still in view): transparent background, no blur/border, light-on-dark colours, and on portrait phones/tablets it stays visible (it replaces the hero CTAs). Raised: 72px bottom padding on phones; `calc(22svh - 128px)` on tablet portrait.
- Elsewhere: `rgba(246,241,234,.96)` + `blur(12px)` + top hairline, dark colours.

### Footer
Dark. 3 cols desktop (`1.5fr / 1.2fr / .8fr`), 2 cols mobile with Explore spanning both. Extra bottom padding (100px) on mobile to clear the dock.

---

## Screens

### Home
1. **Hero — full-bleed (shipped)**. bg `#2B1C13`, `overflow: hidden`, content aligned to bottom.
   - Eyebrow "Airbnb Coaching & Management · Kampala & Remote" (copper) → H1 "Turn your property into a *five-star* business." (cream, em copper, nowrap on "five-star").
   - **Wide (landscape/desktop)**: photo `IMG_2623` positioned right (`right: max(-6vw, calc((100% - 1180px)/2 - 10vw))`), top = header + `clamp(8px,2vh,24px)`, height `calc(124% - var(--hh))` (crops bottom), `max-width: 76%`, `object-fit: cover; object-position: center top`. Mask: `radial-gradient(closest-side ellipse at 50% 48%, #000 58%, rgba(0,0,0,.85) 70%, rgba(0,0,0,.5) 82%, rgba(0,0,0,.18) 92%, transparent 100%)` — no visible crop edges. Behind it a warm glow: `radial-gradient(ellipse 46% 64% at 80% 52%, rgba(84,58,43,.75), rgba(66,45,33,.5) 38%, rgba(52,35,25,.22) 68%, transparent)`. Over it a legibility scrim: `linear-gradient(90deg, #2B1C13 0%, rgba(43,28,19,.6) 30%, transparent 50%), linear-gradient(180deg, transparent 55%, rgba(43,28,19,.7))`. H1 max-width `min(960px, 58%)`, left-aligned. CTAs: "View packages" (cream solid) + "Meet Happy" (outline), top margin `clamp(12px,2.5vw,28px)`.
   - **Narrow (portrait)**: photo full-width from header + `clamp(20px,6vw,48px)` to bottom, top 8% fade mask, bottom scrim `linear-gradient(180deg, transparent 30%, rgba(42,28,21,.88))`. All content **centred**.
   - **Phone portrait**: no in-hero CTAs (dock replaces them); bottom padding `calc(214px + safe-area)`.
   - **Tablet portrait (≥600)**: adds intro paragraph under H1 — "I help hosts start, improve and maximise their Airbnb income — with the strategy, presentation and systems that earn consistent bookings and 5-star reviews." (cream 86%, max 560px). Bottom padding `calc(max(214px, 22svh) + safe-area)`.
   - Heights: phone portrait & touch-landscape `calc(100svh - announcementBarHeight)`; other portrait `80svh`; desktop `max(80svh, min(56vw, 640px))`.
   - A `box-shadow: 0 1px 0 #2B1C13` closes any hairline seam with the next section.
   - *(Alt "split" hero exists in the reference: 2-col, text left on cream, photo right, min-height 80vh — not shipped.)*
2. **Trusted by** — `sand` bg, bottom hairline only. Label "TRUSTED BY" (fixed; full-width above on mobile) + **infinite marquee** of 6 partner logos (height `clamp(24px,6vw,34px)`, gap `clamp(48px,7vw,96px)`), 32s linear loop (`translateX(0 → -50%)` on a duplicated set), edge fade mask 8%, pauses on hover, disabled for `prefers-reduced-motion`.
3. **"Where are you in your *hosting* journey?"** — 3 package cards (Starter Session / Host Accelerator / Full Management) with arrow links (centred on mobile).
4. **"Hosting is a business. *Treat it like one.*"** — philosophy: seated photo + 2×2 disciplines (Strategy, Presentation, Systems, Guest experience).
5. **"Learn in the room with *serious hosts.*"** — Masterclass teaser with imagery → Events.
6. Closing CTA band (shared on all pages except Contact): "Let's build something *guests remember.*"

### About
H1 "Hi, I'm *Happy.*" · story · "How we'll *work together*" · quote band "Hosting is a full-time business. You don't have to figure it out alone." · press/TEDx imagery.

### Services
H1 "Meet you where you are. *Take you further.*" · 4 numbered service blocks (01–04) each: name (H2), "From $X", description, checklist:
- 01 One-on-One Airbnb Training — from $200 — Listing optimisation, Pricing strategies, Guest communication, Review management, Trusted suppliers to furnish faster, Bonus: 1 month co-hosting support
- 02 Airbnb Listing Audit — from $155 — Photo assessment, Description review, SEO optimisation, Competitive analysis, Bonus: 1 month co-hosting support
- 03 Airbnb Site Visit — from $50 · Kampala — Property assessment, Styling advice, Safety check, Amenity recommendations
- 04 Full Airbnb Management — $150 per property / month — Booking management, 24/7 guest support, Cleaning coordination, Performance reports

### Pricing
H1 "Invest in a business, *not a guess.*" · **USD/UGX segmented toggle** (default USD) · Coaching packages: Starter Session $200, Host Accelerator $365 (save $40 badge), Superhost Mentorship $750 — each CTA opens WhatsApp prefilled · Property management ($150/property/month, layout `2fr / 1fr`, stacks <1000) · À la carte list (Training $200, Audit $155, Site visit $50, Masterclass from $120) · FAQ accordion "Questions, *answered.*" (5 items, one open at a time, +/– indicator).

### Masterclass
H1 "A room full of hosts *building it properly.*" · photo mosaic from cohorts · curriculum · CTA "Ask about next cohort" (short: "Next cohort") / buy tickets.

### Events + ticket checkout
H1 "Learn live. *In the room.*" · event cards (date block day/month, type, title, blurb, time, venue, "From $X") · speaking enquiry band "Booking Happy to *speak?*".
**Checkout modal** (full-screen sheet on mobile, centred 2px-radius sheet with 40px backdrop padding on desktop; body scroll locked):
1. Tickets — tier rows with −/+ steppers (0–10); Continue disabled (opacity .35) at 0.
2. Details — name (required) + email **or** WhatsApp (one required). Errors: "Please add your name." / "Add an email or WhatsApp number so we can send your tickets."
3. Payment — MTN Mobile Money, Airtel Money, Card (Visa/Mastercard), Bank transfer (seat held 48h). Button "Pay $X".
4. Confirmed — reference `CH-XXXXX`, summary, "sent to …".
Progress bar of 4 labelled steps (done = rust line). Events data:
- Airbnb Masterclass — November Cohort · Sat 21 Nov 2026 · 9–5 · Standard $120 / VIP $200 / Group of 3 $300
- Hosting Essentials Seminar · Sat 5 Dec 2026 · 10–1 · In person $40 / Livestream $25
- Host Evening (Networking) · Thu 10 Dec 2026 · 6–9 PM · Entry $30

### Insights
H1 "Notes from *the host's side.*" · filter chips (All / Hosting guides / Press & media / Masterclass; selected = ink fill) · featured "The Cost of Building *Before Comfort*" · post grid (guides → internal article; podcasts/interviews → YouTube in new tab with video badge; masterclass recaps → open checkout).
**Article** (`/insights/[slug]`): kind, H1 title, meta, hero image, lead paragraph, H2 sections. Slugs: `listing-fixes`, `pricing-kampala`, `one-to-nine` (full copy in reference).

### Contact
H1 "Ready to transform *your Airbnb?*" · "Send a message" form: name, email, phone, interest chips (Starter Session, Host Accelerator, Superhost Mentorship, Management, Masterclass, Not sure yet), message. Submit composes a WhatsApp message: `Hello Coach Happy, my name is {name}.\nInterested in: {interest}\n{msg}\nEmail: … Phone: …`. No dock on this page.

---

## Interactions & behaviour
- Route change → close drawer, scroll to top.
- Currency: `UGX = round(USD × rate / 5000) × 5000`, formatted `UGX 740,000`; short form `UGX 148k`. Default rate 3700 (make configurable/env). Show rate note when UGX selected.
- WhatsApp links: `https://wa.me/256757533151?text=<encoded>` with package-specific prefilled text.
- Hover: nav colour → rust; buttons per Buttons section; cards subtle.
- All motion respects `prefers-reduced-motion`.

## State
`page/route`, `menuOpen`, `currency`, `faqOpenIndex`, `insightsFilter`, checkout `{eventIndex, step, qty per tier, attendee name/email/phone, payMethod, error, ref}`, contact form fields, scroll flags `{scrolling (1.6s debounce), overHero}`, viewport flags (see Breakpoints). Payments are mocked — wire to a real provider (e.g. Flutterwave/Paystack for MoMo + card) in production.

## Assets
- Portraits: `IMG_2623` (hero), `IMG_2622`, `IMG_9483` — Vercel Blob URLs in reference.
- Masterclass/event/TEDx/CEO Insights imagery and partner logos: `https://www.coachhappymmila.com/...` (list in reference source). Download into `/public` and serve via `next/image`.
- YouTube thumbnails via `img.youtube.com/vi/<id>/maxresdefault.jpg`.
- Fonts: Google Fonts (Lora, Figtree) — use `next/font/google`.
- No icon library; arrows/plus/minus are text glyphs or simple 1.5px strokes.

## Recommended structure (Next.js)
```
app/
  layout.tsx            fonts, AnnouncementBar, Header, Drawer, MobileDock, Footer
  page.tsx              Home
  about/ services/ pricing/ masterclass/ events/ contact/  page.tsx
  insights/page.tsx  insights/[slug]/page.tsx
components/
  Header.tsx Drawer.tsx MobileDock.tsx AnnouncementBar.tsx Footer.tsx
  HeroFullBleed.tsx TrustedMarquee.tsx CtaBand.tsx
  PackageCard.tsx ServiceBlock.tsx FaqAccordion.tsx CurrencyToggle.tsx
  EventCard.tsx CheckoutModal/ (Steps, TierRow, PayMethod)
  PostCard.tsx FilterChips.tsx
lib/
  content.ts   packages, services, faqs, events, articles, posts (single source of truth)
  currency.ts  fmt/short + CurrencyContext
  whatsapp.ts  waLink(text)
  useViewport.ts  mobile/compact/phonePortrait/tabletPortrait/touchLandscape/wide
  useScrollDock.ts  scrolling + overHero flags
styles/tokens.css   CSS variables from Design tokens above
```
Guidelines: tokens as CSS variables; one content file; server components by default, client only for header/dock/toggle/checkout/accordion; `--hh` set from header via ResizeObserver; SEO metadata per page; images with explicit sizes and `priority` on hero.

## Files
- `reference/index.html` + `reference/support.js` — shipped configuration prototype (open in browser).
- `reference/Coach Happy Site.dc.html` — full design source incl. alternate hero and font options.
