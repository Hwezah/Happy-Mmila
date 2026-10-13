import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/home/hero";
import { TrustedMarquee } from "@/components/home/trusted-marquee";
import { buttonVariants } from "@/components/ui/button";
import { ArrowCircle, Stars } from "@/components/site/ui";
import { DISCIPLINES, JOURNEY, TESTIMONIALS } from "@/lib/content";
import { IMG } from "@/lib/images";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedMarquee />

      {/* Where are you in your journey? */}
      <section className="wrap py-section">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5 max-lg:flex-col max-lg:items-stretch">
          <h2 className="m-0 max-w-[720px] text-h2">
            Where are you in your <em>hosting</em> journey?
          </h2>
          <p className="m-0 max-w-[360px] text-base leading-relaxed text-muted max-lg:mx-auto">
            Every engagement starts where you are — not with a one-size-fits-all programme.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px border border-ink/14 bg-ink/14 sm:grid-cols-3">
          {JOURNEY.map((j) => (
            <Link
              key={j.num}
              href="/pricing"
              data-animate="card"
              className="flex min-h-[clamp(260px,40vw,340px)] flex-col gap-[18px] bg-cream px-[clamp(24px,6vw,36px)] py-[clamp(28px,7vw,40px)] text-left text-ink transition-colors hover:bg-sand hover:text-ink"
            >
              <span className="font-display text-[15px] text-rust">{j.num}</span>
              <h3 className="m-0 font-display text-[clamp(25px,3.2vw,32px)] leading-[1.1]">{j.title}</h3>
              <p className="m-0 flex-1 text-base leading-relaxed text-body">{j.body}</p>
              <span className="eyebrow flex items-center gap-3.5 max-lg:justify-center">
                {j.cta} <ArrowCircle />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-sand">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,7vw,104px)] py-section">
          <div data-animate="image" className="relative aspect-[3/4] overflow-hidden rounded-xs bg-line-2 max-lg:order-2">
            <Image src={IMG.portraitSeated} alt="Coach Happy" fill sizes="(max-width: 880px) 100vw, 50vw" className="object-cover object-top" />
          </div>
          <div className="flex flex-col gap-7 max-lg:items-center">
            <div className="eyebrow text-rust">The philosophy</div>
            <h2 className="m-0 text-h2">
              Hosting is a business. <em>Treat it like one.</em>
            </h2>
            <p className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-body">
              Success on Airbnb isn&apos;t just about having a space. It&apos;s four disciplines working together — and most hosts are
              only strong in one or two.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-7 self-stretch pt-2 text-left">
              {DISCIPLINES.map((d) => (
                <div key={d.name} className="flex flex-col gap-2 border-t border-ink/20 pt-[18px]">
                  <span className="font-display text-[22px]">{d.name}</span>
                  <span className="text-[15px] leading-[1.55] text-muted">{d.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client results */}
      <section className="wrap flex flex-col gap-16 py-section">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-12">
          <div className="eyebrow pt-3.5 text-rust">Client results</div>
          <figure className="col-span-full m-0 flex max-w-[860px] min-w-0 flex-col gap-7 justify-self-end">
            <blockquote className="m-0 font-display text-[clamp(26px,3vw,42px)] leading-[1.25] tracking-[-.01em] text-pretty">
              “Your professional advice, practical insights, and consistent support significantly contributed to my growth as a host. I
              have now achieved <em className="text-rust">Superhost status.</em>”
            </blockquote>
            <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] max-lg:justify-center">
              <strong className="font-semibold">Harriet Tracy</strong>
              <span className="text-muted">Semera Apartments, Kampala</span>
            </figcaption>
          </figure>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-px border-y border-ink/14 bg-ink/14">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} data-animate="card" className={cn("m-0 flex flex-col gap-5 bg-cream py-9", i === 0 ? "pr-0 lg:pr-9" : "px-9")}>
              <Stars />
              <blockquote className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.75] text-body">“{t.quote}”</blockquote>
              <figcaption className="text-sm">
                <strong className="font-semibold">{t.name}</strong> <span className="text-muted">· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Masterclass teaser */}
      <section className="bg-ink text-cream">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,88px)] py-section">
          <div className="flex flex-col gap-[26px] max-lg:items-center">
            <div className="eyebrow text-copper">The Masterclass</div>
            <h2 className="m-0 text-h2">
              Learn in the room with <em>serious hosts.</em>
            </h2>
            <p className="m-0 max-w-[520px] text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-line">
              Twice-yearly cohorts combining strategic teaching, live coaching, networking and implementation support — plus lifetime
              access to the private host community.
            </p>
            <div className="flex self-stretch max-lg:flex-col max-lg:justify-center">
              <Link href="/masterclass" className={buttonVariants({ variant: "light", layout: "single" })}>
                Explore the masterclass
              </Link>
            </div>
          </div>
          <div className="grid aspect-[5/4] grid-cols-[1.3fr_1fr] grid-rows-2 overflow-hidden rounded-xs">
            <div data-animate="image" className="relative row-span-2 overflow-hidden">
              <Image src={IMG.mcLeading} alt="Happy leading a masterclass" fill sizes="(max-width: 880px) 60vw, 30vw" className="object-cover" />
            </div>
            <div data-animate="image" className="relative overflow-hidden">
              <Image src={IMG.mcCertificate} alt="Certificate presentation" fill sizes="(max-width: 880px) 40vw, 20vw" className="object-cover" />
            </div>
            <div data-animate="image" className="relative overflow-hidden">
              <Image src={IMG.mcInSession} alt="Attendees in session" fill sizes="(max-width: 880px) 40vw, 20vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
