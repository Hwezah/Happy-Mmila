import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { CurrencyToggle, RateNote } from "@/components/pricing/currency-toggle";
import { FaqAccordion } from "@/components/pricing/faq-accordion";
import { buttonVariants } from "@/components/ui/button";
import { Price } from "@/components/site/price";
import { ArrowCircle, CheckItem } from "@/components/site/ui";
import { A_LA_CARTE, MANAGEMENT, PACKAGES, type Package } from "@/lib/content";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Airbnb coaching packages, property management and à la carte services — priced in USD or UGX.",
};

const bigPrice = "font-display text-[clamp(38px,10vw,52px)] leading-none tracking-[-.02em]";

function SectionHead({ title, note, className }: { title: string; note: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-b border-ink/16 pb-5 max-lg:justify-center",
        className,
      )}
    >
      <h2 className="m-0 font-display text-[clamp(25px,3.2vw,32px)]">{title}</h2>
      <span className="text-sm text-muted">{note}</span>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const dark = !!pkg.featured;
  return (
    <div
      data-animate="card"
      className={cn(
        "relative flex flex-col gap-6 rounded-xs px-[clamp(24px,6vw,34px)] py-[clamp(32px,7vw,40px)] text-left",
        dark ? "bg-ink text-cream" : "border border-ink/14 bg-paper",
      )}
    >
      {dark && (
        <span className="absolute top-0 right-[34px] -translate-y-1/2 rounded-xs bg-copper px-3 py-[7px] text-[11px] font-semibold tracking-[.18em] text-ink uppercase">
          Recommended
        </span>
      )}
      <div className="flex flex-col gap-2.5">
        <span className={cn("text-xs font-semibold tracking-[.2em] uppercase", dark ? "text-copper" : "text-muted")}>{pkg.audience}</span>
        <h3 className="m-0 font-display text-[clamp(27px,3.4vw,34px)]">{pkg.name}</h3>
      </div>
      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className={bigPrice}>
          <Price usd={pkg.usd} />
        </span>
        <span className={cn("text-sm", dark ? "text-line" : "text-muted")}>
          {pkg.term}
          {pkg.saveUsd != null && (
            <>
              {" "}
              · save <Price usd={pkg.saveUsd} short />
            </>
          )}
        </span>
      </div>
      <p className={cn("m-0 text-[15px] leading-relaxed", dark ? "text-line" : "text-body")}>{pkg.desc}</p>
      <div className={cn("flex flex-1 flex-col gap-3 border-t pt-5", dark ? "border-cream/16" : "border-ink/12")}>
        {pkg.items.map((item) => (
          <CheckItem key={item} tone={dark ? "copper" : "rust"}>
            {item}
          </CheckItem>
        ))}
      </div>
      <a
        href={waLink(pkg.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: dark ? "light" : "outlineFill" }), "px-6")}
      >
        {pkg.cta}
      </a>
    </div>
  );
}

function Grid3({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

export default function PricingPage() {
  return (
    <>
      <section className="wrap flex flex-wrap items-end justify-between gap-x-8 gap-y-7 pt-[clamp(56px,7vw,96px)] pb-14 max-lg:flex-col max-lg:items-stretch">
        <div className="flex max-w-[820px] flex-col gap-6 max-lg:items-center">
          <div className="eyebrow text-rust">Packages &amp; Pricing</div>
          <h1 className="m-0 text-h1">
            Invest in a business, <em className="text-rust">not a guess.</em>
          </h1>
          <p className="m-0 max-w-[600px] text-lead text-body">
            Clear packages for every stage. Not sure which fits? Message me and we&apos;ll find the right one together.
          </p>
        </div>
        <CurrencyToggle />
      </section>

      <section className="wrap pb-6">
        <SectionHead title="Coaching packages" note="In person in Kampala or fully virtual" className="mb-6" />
        <Grid3>
          {PACKAGES.map((p) => (
            <PackageCard key={p.key} pkg={p} />
          ))}
        </Grid3>
      </section>

      <section className="wrap pt-[72px] pb-6">
        <SectionHead title="Property management" note="Hands-off income, professionally run" className="mb-6" />
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div data-animate="card" className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-8 rounded-xs bg-sand px-9 py-10 text-left">
            <div className="flex flex-col gap-[18px]">
              <h3 className="m-0 font-display text-[clamp(27px,3.4vw,34px)]">{MANAGEMENT.name}</h3>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className={bigPrice}>
                  <Price usd={MANAGEMENT.usd} />
                </span>
                <span className="text-sm text-muted">per property / month</span>
              </div>
              <p className="m-0 text-[15px] leading-relaxed text-body">{MANAGEMENT.desc}</p>
              <div>
                <a
                  href={waLink(MANAGEMENT.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants(), "px-[26px] py-[clamp(12px,1.6vw,17px)]")}
                >
                  Enquire via WhatsApp
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {MANAGEMENT.items.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
          </div>
          <div data-animate="card" className="flex flex-col gap-[18px] rounded-xs border border-ink/14 px-[clamp(24px,6vw,34px)] py-[clamp(32px,7vw,40px)] text-left">
            <h3 className="m-0 font-display text-[clamp(23px,2.8vw,28px)]">Portfolio</h3>
            <span className="font-display text-[40px] leading-none">Custom</span>
            <p className="m-0 flex-1 text-[15px] leading-relaxed text-body">
              Three or more properties? Tailored management with portfolio-level reporting and preferred rates.
            </p>
            <Link href="/contact" className="eyebrow flex items-center gap-3.5 text-ink">
              Talk to me <ArrowCircle />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap pt-[72px] pb-6">
        <SectionHead title="À la carte" note="Single services, booked individually" />
        {A_LA_CARTE.map((r) => (
          <div
            key={r.name}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2.5 border-b border-ink/12 py-6 text-left"
          >
            <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-1.5">
              <span className="font-display text-[22px]">{r.name}</span>
              <span className="text-[15px] leading-normal text-muted">{r.desc}</span>
            </div>
            <span className="font-display text-[28px] whitespace-nowrap">
              {r.from && "From "}
              <Price usd={r.usd} />
            </span>
          </div>
        ))}
        <RateNote />
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-12 pt-[72px] pb-[clamp(56px,7vw,96px)]">
        <h2 className="m-0 text-h2 tracking-normal">
          Questions, <em>answered.</em>
        </h2>
        <div className="col-span-full w-full max-w-[860px] min-w-0 justify-self-end text-left">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
