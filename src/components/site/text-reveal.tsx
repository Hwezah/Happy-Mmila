"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Text that fades up as it scrolls into view. Hero/page-intro text has its own load animation in globals.css. */
const TARGETS = "main h2, main h3, main p, main blockquote, main figcaption, main .eyebrow";
/** Never touched: the home hero (own animation) and anything already animating on load. */
const SKIP = ".hero, h1, h1 ~ p, .eyebrow:has(+ h1)";
const STAGGER_MS = 70;
const MAX_DELAY_MS = 280;

/**
 * Scroll reveal for site text. Only text that starts below the fold is hidden (data-reveal="pending"),
 * so nothing on screen at load ever flashes. Off entirely for prefers-reduced-motion.
 */
export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = new Set<HTMLElement>();
    const reveal = (el: HTMLElement, delay = 0) => {
      el.style.transitionDelay = delay ? `${delay}ms` : "";
      el.dataset.reveal = "in";
      pending.delete(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        visible.forEach((el, i) => {
          io.unobserve(el);
          reveal(el, Math.min(i * STAGGER_MS, MAX_DELAY_MS));
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    // Wait a frame so the new route's DOM is laid out before measuring.
    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.dataset.reveal || el.closest(SKIP) || el.matches(SKIP)) return;
        if (el.getBoundingClientRect().top < fold) return;
        el.dataset.reveal = "pending";
        pending.add(el);
        io.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      // Never leave text hidden if we leave before it scrolled into view.
      pending.forEach((el) => reveal(el));
    };
  }, [pathname]);

  return null;
}
