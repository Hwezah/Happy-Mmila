import type { Metadata } from "next";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { Stars } from "@/components/site/ui";
import { TicketLink } from "@/components/site/ticket-link";
import { MASTERCLASS_MOSAIC, MASTERCLASS_PILLARS } from "@/lib/content";
import { IMG } from "@/lib/images";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Masterclass",
  description: "The twice-yearly Airbnb Masterclass: strategic teaching, live coaching, networking and practical implementation.",
};

const pillarRow = "grid grid-cols-[clamp(92px,24vw,110px)_minmax(0,1fr)] gap-4 border-t border-ink/16 py-[22px]";
const pillarName = "font-display text-[clamp(21px,5.4vw,28px)] text-rust";

export default function MasterclassPage() {
  return (
    <>
      <section className="relative -mt-[var(--hh,82px)] flex min-h-[min(100svh,760px)] items-end overflow-hidden bg-ink">
        <Image src={IMG.mcSpeaking} alt="Happy speaking to the room" fill sizes="100vw" preload className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,28,21,.2)_0%,rgba(42,28,21,.9)_100%)]" />
        <div className="wrap relative flex w-full flex-col gap-[22px] pb-[clamp(48px,7vw,88px)] text-cream max-lg:items-center">
          <div className="eyebrow text-copper">The Airbnb Masterclass · Twice a year</div>
          <h1 className="m-0 max-w-[980px] text-h1">
            A room full of hosts <em className="text-copper">building it properly.</em>
          </h1>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(40px,6vw,88px)] py-section">
        <div className="flex flex-col gap-6 max-lg:items-center">
          <p className="m-0 font-display text-[clamp(24px,2.4vw,32px)] leading-[1.35]">
            Strategic teaching, live coaching, networking and practical implementation — designed for serious hosts and property
            operators.
          </p>
          <div className="flex flex-row flex-nowrap gap-3 self-stretch pt-2 max-lg:justify-center">
            <TicketLink className={buttonVariants({ layout: "pair" })}>Get tickets</TicketLink>
            <a
              href={waLink("Hello Coach Happy, when is the next masterclass cohort?")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", layout: "pair" })}
            >
              <span className="xs:hidden">Next cohort</span>
              <span className="hidden xs:inline">Ask about next cohort</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col text-left">
          {MASTERCLASS_PILLARS.map((p) => (
            <div key={p.name} className={pillarRow}>
              <span className={pillarName}>{p.name}</span>
              <span className="text-base leading-relaxed text-body">{p.body}</span>
            </div>
          ))}
          <div className={cn(pillarRow, "border-b")}>
            <span className={pillarName}>Continue</span>
            <span className="text-base leading-relaxed text-body">
              <strong className="font-semibold text-ink">Bonus:</strong> access to the private WhatsApp Airbnb Community — ongoing
              trainings, trend and policy updates long after the cohort ends.
            </span>
          </div>
        </div>
      </section>

      <section className="wrap pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-flow-dense auto-rows-[clamp(110px,18vw,240px)] grid-cols-4 overflow-hidden rounded-xs">
          {MASTERCLASS_MOSAIC.map((m) => (
            <div key={m.src} data-animate="image" className={cn("relative overflow-hidden", m.span)}>
              <Image src={m.src} alt={m.alt} fill sizes="(max-width: 880px) 50vw, 600px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <figure className="mx-auto flex max-w-[960px] flex-col items-center gap-7 px-[clamp(14px,4vw,46px)] py-section text-center">
          <Stars className="justify-center" />
          <blockquote className="m-0 font-display text-[clamp(24px,2.8vw,38px)] leading-[1.3] text-balance">
            “We learned a lot from the masterclasses — how to decorate, handle guests with patience, and create an experience that is{" "}
            <em>extraordinary.</em>”
          </blockquote>
          <figcaption className="text-[15px]">
            <strong className="font-semibold">Biira Winfred</strong> <span className="text-muted">· Manager, Revamp Homes</span>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
