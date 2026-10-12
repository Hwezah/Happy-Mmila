"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

const btn = "eyebrow flex min-h-[52px] items-center justify-center rounded-xs tracking-[.14em] transition-[color,background-color,border-color] duration-300";

/** Fixed bottom bar under 880px (not on Contact): Packages · WhatsApp. Styling and motion in globals.css (.dock). */
export function MobileDock() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [overHero, setOverHero] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    // "Over the hero" while the home hero's bottom edge is still on screen.
    const check = () => {
      const hero = document.querySelector("[data-hero-full]");
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > window.innerHeight - 40);
    };
    const onScroll = () => {
      check();
      if (window.scrollY > 40) {
        setActive(true);
        clearTimeout(timer);
        timer = setTimeout(() => setActive(false), 1600);
      }
    };
    const frame = requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <div className="dock" data-active={active} data-over={overHero}>
      <Link
        href="/pricing"
        className={cn(
          btn,
          "border",
          overHero ? "border-cream/60 text-cream hover:text-cream" : "border-ink/35 text-ink hover:text-ink",
        )}
      >
        Packages
      </Link>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(btn, overHero ? "bg-cream text-ink hover:text-ink" : "bg-ink text-cream hover:text-cream")}
      >
        WhatsApp
      </a>
    </div>
  );
}
