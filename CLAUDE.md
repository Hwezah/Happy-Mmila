@AGENTS.md

## Project rules

- The design source is `docs/handoff/` (README + HTML prototype). It is high-fidelity: match its colours, type, spacing,
  copy and interactions.
- Copy and data live in `src/lib/content.ts`; image URLs in `src/lib/images.json`. Don't hard-code either in components.
- Prices are stored in USD and rendered through `<Price>` / `useCurrency()` so the USD/UGX toggle reaches them.
- Under 880px text centres by default (set on the root wrapper in `layout.tsx`); blocks opt out with `text-left`.
- The home hero and mobile dock device logic is plain CSS in `globals.css` (`.hero*`, `.dock`) — keep the media
  queries in step with the handoff's "Breakpoints & device logic".
