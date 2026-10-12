"use client";

import { useEffect, useRef } from "react";

import { TicketLink } from "@/components/site/ticket-link";

/** Set to false to hide the bar site-wide. */
export const SHOW_ANNOUNCEMENT = true;

/**
 * Full-width bar above the header. Its live height is published as --bh, which the full-bleed hero
 * subtracts on phones so hero + bar fill exactly one screen.
 */
export function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() => root.style.setProperty("--bh", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--bh");
    };
  }, []);

  if (!SHOW_ANNOUNCEMENT) return null;

  return (
    <div
      ref={ref}
      className="flex flex-nowrap justify-center gap-x-3.5 gap-y-1 bg-ink px-5 py-2.5 text-center text-[13px] tracking-[.04em] whitespace-nowrap text-sand-2"
    >
      <span className="xs:hidden">Next masterclass intake now open</span>
      <span className="hidden xs:inline min-[900px]:hidden">Masterclass cohorts run twice a year</span>
      <span className="hidden min-[900px]:inline">Masterclass cohorts run twice a year — the next intake is forming now.</span>
      <TicketLink className="text-copper underline underline-offset-3 hover:text-copper">
        <span className="xs:hidden">Book</span>
        <span className="hidden xs:inline">Reserve your seat</span>
      </TicketLink>
    </div>
  );
}
