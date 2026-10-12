import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { IMG } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Full-bleed home hero. The device logic (photo placement, heights, alignment, which CTAs show)
 * is CSS in globals.css (.hero*) — see docs/handoff/README.md → Home → Hero.
 */
export function Hero() {
  return (
    <section data-hero-full className="hero">
      <div className="hero-narrow">
        <Image src={IMG.portraitHero} alt="Coach Happy Mmila" width={1200} height={1600} preload className="hero-img-narrow" />
        <div className="hero-scrim-narrow" />
      </div>
      <div className="hero-wide">
        <div className="hero-glow" />
        <Image src={IMG.portraitHero} alt="" width={1200} height={1600} preload className="hero-img-wide" />
        <div className="hero-scrim-wide" />
      </div>

      <div className="hero-content">
        <div className="eyebrow text-copper">Airbnb Coaching &amp; Management · Kampala &amp; Remote</div>
        <h1 className="m-0 text-h1 tracking-[-.025em]">
          Turn your property into a <em className="whitespace-nowrap text-copper">five-star</em> business.
        </h1>
        <p className="hero-intro m-0 max-w-[560px] text-[clamp(16px,2.2vw,19px)] leading-[1.7] text-cream/86">
          I help hosts start, improve and maximise their Airbnb income — with the strategy, presentation and systems that earn
          consistent bookings and 5-star reviews.
        </p>
        <div className="hero-ctas mt-[clamp(12px,2.5vw,28px)] flex flex-row flex-nowrap gap-3 self-stretch">
          <Link href="/pricing" className={cn(buttonVariants({ variant: "light", layout: "pair" }))}>
            <span className="xs:hidden">Packages</span>
            <span className="hidden xs:inline">View packages</span>
          </Link>
          <Link href="/about" className={cn(buttonVariants({ variant: "outlineLight", layout: "pair" }))}>
            Meet Happy
          </Link>
        </div>
      </div>
    </section>
  );
}
