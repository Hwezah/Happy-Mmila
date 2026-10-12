"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Text that fades up as it scrolls into view. Hero/page-intro text has its own load animation in globals.css. */
const TEXT = "main h2, main h3, main p, main blockquote, main figcaption, main .eyebrow";
/** Cards (fade up as one piece) and image frames (fade in, photo settles from a slight zoom), marked in markup. */
const BLOCKS = "main [data-animate]";
/** Never touched: the home hero (own animation) and anything already animating on load. */
const SKIP = ".hero, h1, h1 ~ p, .eyebrow:has(+ h1)";
const STAGGER_MS = 80;
const MAX_DELAY_MS = 360;
const DURATION_MS = 1000;

/**
 * Scroll reveal for text, cards and images. Only things that start below the fold are hidden
 * (data-reveal="pending"), so nothing on screen at load ever flashes. Text inside a card animates with
 * the card. Off entirely for prefers-reduced-motion.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = new Set<HTMLElement>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const reveal = (el: HTMLElement, delay = 0) => {
      el.style.transitionDelay = delay ? `${delay}ms` : "";
      el.dataset.reveal = "in";
      pending.delete(el);
      // Drop the stagger delay once revealed so hover transitions on cards stay instant.
      if (delay) {
        const t = setTimeout(() => {
          el.style.transitionDelay = "";
          timers.delete(t);
        }, delay + DURATION_MS);
        timers.add(t);
      }
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
      const mark = (el: HTMLElement) => {
        if (el.dataset.reveal || el.closest(SKIP)) return;
        if (el.getBoundingClientRect().top < fold) return;
        el.dataset.reveal = "pending";
        pending.add(el);
        io.observe(el);
      };
      document.querySelectorAll<HTMLElement>(BLOCKS).forEach(mark);
      document.querySelectorAll<HTMLElement>(TEXT).forEach((el) => {
        if (!el.closest("[data-animate]")) mark(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      timers.forEach(clearTimeout);
      // Never leave anything hidden if we leave before it scrolled into view.
      pending.forEach((el) => reveal(el));
    };
  }, [pathname]);

  return null;
}
