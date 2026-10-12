import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/icons";
import { Price } from "@/components/site/price";
import { TicketButton } from "@/components/site/ticket-link";
import { EVENTS } from "@/lib/content";
import { focusPosition } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Masterclasses, seminars and host evenings across Kampala — with livestream seats for hosts joining from anywhere.",
};

export default function EventsPage() {
  return (
    <>
      <section className="wrap flex flex-col gap-6 pt-[clamp(56px,7vw,96px)] pb-12 max-lg:items-center">
        <div className="eyebrow text-rust">Events &amp; Seminars</div>
        <h1 className="m-0 max-w-[900px] text-h1">
          Learn live. <em className="text-rust">In the room.</em>
        </h1>
        <p className="m-0 max-w-[560px] text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-body">
          Masterclasses, seminars and host evenings across Kampala — with livestream seats for hosts joining from anywhere. Book your
          ticket in under a minute.
        </p>
      </section>

      <section className="wrap pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((e, i) => (
            <article key={e.slug} className="flex flex-col overflow-hidden rounded-xs border border-ink/14 bg-paper text-left">
              <div className="relative aspect-[16/10] bg-sand-2">
                <Image
                  src={e.img}
                  alt={e.title}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 380px"
                  className="object-cover"
          style={{ objectPosition: focusPosition(e.imgFocus) }}
                />
                <div className="absolute top-4 left-4 flex min-w-16 flex-col items-center rounded-xs bg-cream px-3.5 pt-2.5 pb-2">
                  <span className="text-[11px] font-semibold tracking-[.16em] text-rust uppercase">{e.mon}</span>
                  <span className="font-display text-[30px] leading-[1.05]">{e.day}</span>
                </div>
                <span className="absolute top-4 right-4 rounded-xs bg-ink px-[11px] py-[7px] text-[11px] font-semibold tracking-[.16em] text-cream uppercase">
                  {e.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-[clamp(22px,5vw,30px)]">
                <h3 className="m-0 font-display text-[clamp(22px,2.6vw,26px)] leading-[1.15]">{e.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-body">{e.blurb}</p>
                <div className="flex flex-col gap-[9px] text-sm text-body">
                  <span className="flex items-center gap-2.5">
                    <CalendarIcon className="flex-none text-rust" />
                    {e.date}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <ClockIcon className="flex-none text-rust" />
                    {e.time}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <PinIcon className="flex-none text-rust" />
                    {e.venue}
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted">From</span>
                    <span className="font-display text-[28px] leading-[1.1]">
                      <Price usd={Math.min(...e.tiers.map((t) => t.usd))} />
                    </span>
                  </div>
                  <TicketButton
                    eventIndex={i}
                    className={cn(buttonVariants(), "min-h-12 cursor-pointer border-0 px-6 py-[clamp(12px,1.5vw,16px)]")}
                  >
                    Get tickets
                  </TicketButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-section max-lg:flex-col max-lg:items-stretch">
          <div className="flex max-w-[620px] flex-col gap-3.5">
            <h2 className="m-0 text-h2">
              Booking Happy to <em>speak?</em>
            </h2>
            <p className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-body">
              Corporate trainings, panels and private workshops for property teams and organisations.
            </p>
          </div>
          <Link href="/contact" className={buttonVariants({ layout: "single" })}>
            Enquire
          </Link>
        </div>
      </section>
    </>
  );
}
