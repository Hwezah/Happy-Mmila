"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, VisuallyHidden } from "radix-ui";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CloseIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/site/ui";
import { NAV, OVERFLOW_NAV, OVERFLOW_NAV_HREFS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/whatsapp";

export function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky glass header that overlays the first section: it pulls the page up by its own height
 * (margin-bottom: -hh) and <main> pads it back (padding-top: hh), so full-bleed heroes can slide
 * underneath with margin-top: -hh. --hh is the live header height.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty("--hh", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-20 mb-[calc(-1*var(--hh,82px))] bg-[linear-gradient(180deg,rgba(255,252,247,.62),rgba(246,241,234,.48))] text-left shadow-[0_8px_30px_rgba(42,28,21,.08)] backdrop-blur-[22px] backdrop-saturate-[160%]"
    >
      <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-6 px-[clamp(14px,3vw,48px)] py-[clamp(10px,2vw,18px)]">
        <Wordmark />

        <nav aria-label="Main" className="hidden flex-nowrap items-center gap-[clamp(12px,1.5vw,30px)] whitespace-nowrap navsplit:flex navfull:flex">
          {NAV.map((n) => {
            const on = isActive(n.href, pathname);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "border-b py-1.5 text-sm font-medium",
                  // Insights and Contact only fit in the bar on wide landscape screens.
                  OVERFLOW_NAV_HREFS.includes(n.href) && "hidden navfull:inline",
                  on ? "border-rust text-rust hover:text-rust" : "border-transparent text-ink hover:text-rust",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/contact" className={cn(buttonVariants(), "hidden px-[22px] py-[13px] 3xl:inline-block")}>
            Book a consultation
          </Link>
          <Drawer open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="inline-flex flex-col items-stretch gap-[7px] text-ink hover:text-ink">
      <span className="font-display text-2xl leading-none font-medium tracking-[-.01em]">
        Happy <em className="font-normal">Mmila</em>
      </span>
      {/* Letters spread to the wordmark's width, as in the prototype. */}
      <span aria-label="Airbnb coach" className="flex justify-between text-[10px] leading-none text-muted uppercase">
        {"AIRBNB".split("").map((c, i) => (
          <span key={`a${i}`} aria-hidden>
            {c}
          </span>
        ))}
        <span aria-hidden className="w-1.5" />
        {"COACH".split("").map((c, i) => (
          <span key={`c${i}`} aria-hidden>
            {c}
          </span>
        ))}
      </span>
    </Link>
  );
}

const contactRow = "flex items-center gap-3.5 border-b border-cream/12 py-3.5 text-cream short:py-2 hover:text-copper";
const contactIcon = "flex size-9 flex-none items-center justify-center rounded-full bg-cream/8 text-copper short:size-8";
const contactLabel = "text-[11px] font-semibold tracking-[.16em] text-faint uppercase";

/**
 * Full-height dark drawer. It lists whichever pages the bar can't fit (see the navfull / navsplit
 * variants in globals.css) plus contact details. Clicking the backdrop closes it.
 */
function Drawer({ open, onOpenChange, pathname }: { open: boolean; onOpenChange: (o: boolean) => void; pathname: string }) {
  const close = () => onOpenChange(false);

  const navList = (items: readonly { href: string; label: string }[], className: string) => (
    <nav aria-label="Menu" className={cn("flex-col", className)}>
      {items.map((n) => {
        const on = isActive(n.href, pathname);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={close}
            aria-current={on ? "page" : undefined}
            className={cn(
              "block py-3.5 font-display text-[clamp(26px,6vw,32px)] leading-[1.15] short:py-1.5 short:text-[clamp(22px,5.6vw,28px)]",
              on ? "text-copper hover:text-copper" : "text-cream hover:text-copper",
            )}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        aria-label="Menu"
        className="flex h-11 min-w-11 flex-none cursor-pointer flex-col items-end justify-center gap-[clamp(7px,.6vw,9px)] bg-transparent"
      >
        <span className="block h-[1.5px] w-[clamp(32px,3.4vw,52px)] bg-ink" />
        <span className="block h-[1.5px] w-[clamp(24px,2.5vw,38px)] bg-ink" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[3px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex h-full w-[min(440px,90vw)] flex-col gap-7 overflow-hidden short:gap-5 bg-ink px-[clamp(20px,4vw,36px)] pt-4 pb-[calc(28px+env(safe-area-inset-bottom))] text-left text-cream shadow-[-20px_0_60px_rgba(0,0,0,.3)] outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right motion-reduce:animate-none"
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Menu</Dialog.Title>
          </VisuallyHidden.Root>
          <div className="flex flex-none items-center justify-between">
            <span className="font-display text-[22px]">
              Happy <em>Mmila</em>
            </span>
            <Dialog.Close aria-label="Close menu" className="flex size-15 cursor-pointer items-center justify-end bg-transparent text-cream">
              <CloseIcon />
            </Dialog.Close>
          </div>

          {/* Header and button stay put; the middle scrolls on its own and is centred between them whenever it fits. */}
          <div className="-mx-1 flex min-h-0 flex-1 flex-col overflow-y-auto px-1">
            <div className="my-auto flex flex-col gap-7 short:gap-5">
              {/* Every link when the bar has none; just the overflow links on tablet portrait / phone landscape; none when the bar holds all 8. */}
              {navList(NAV, "flex navsplit:hidden navfull:hidden")}
              {navList(OVERFLOW_NAV, "hidden navsplit:flex navfull:hidden")}

              <div className="flex flex-col">
                <span className="pb-1.5 text-[11px] font-semibold tracking-[.16em] text-copper uppercase">Get in touch</span>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className={contactRow}>
                  <span className={contactIcon}>
                    <WhatsAppIcon />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className={contactLabel}>WhatsApp</span>
                    <span className="text-[15px] whitespace-nowrap">{PHONE_DISPLAY}</span>
                  </span>
                </a>
                <a href={PHONE_TEL} className={contactRow}>
                  <span className={contactIcon}>
                    <PhoneIcon />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className={contactLabel}>Call</span>
                    <span className="text-[15px] whitespace-nowrap">{PHONE_DISPLAY}</span>
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className={contactRow}>
                  <span className={contactIcon}>
                    <MailIcon />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className={contactLabel}>Email</span>
                    <span className="text-[15px] whitespace-nowrap">{EMAIL}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3.5 py-3.5 short:py-2">
                  <span className={contactIcon}>
                    <PinIcon />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className={contactLabel}>Based in</span>
                    <span className="text-[15px]">Kampala · Remote worldwide</span>
                  </span>
                </div>
              </div>

              <SocialLinks />
            </div>
          </div>

          <Link href="/contact" onClick={close} className={cn(buttonVariants({ variant: "light", layout: "block" }), "flex-none py-[18px]")}>
            Book a consultation
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
