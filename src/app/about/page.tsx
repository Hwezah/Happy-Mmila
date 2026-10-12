import type { Metadata } from "next";
import Image from "next/image";

import { CheckIcon } from "@/components/ui/icons";
import { WHY_ME, WORK_STEPS } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: "Ms. Happy Pascal Mmila — an Airbnb coach who helps people turn properties into profitable, sustainable income.",
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(40px,7vw,104px)] py-[clamp(48px,7vw,96px)]">
        <div data-animate="image" className="relative aspect-[3/4] overflow-hidden rounded-xs bg-sand-2 max-lg:order-2 lg:sticky lg:top-[110px]">
          <Image src={IMG.portraitAbout} alt="Happy Mmila" fill sizes="(max-width: 880px) 100vw, 50vw" className="object-cover" preload />
        </div>
        <div className="flex flex-col gap-7 pt-3">
          <div className="eyebrow text-rust">About</div>
          <h1 className="m-0 text-h1">
            Hi, I&apos;m <em className="text-rust">Happy.</em>
          </h1>
          <p className="m-0 font-display text-[clamp(22px,2vw,28px)] leading-[1.4]">
            Yes, that&apos;s really my name. I&apos;m Ms. Happy Pascal Mmila — an Airbnb coach who helps people turn properties into
            profitable, sustainable income.
          </p>
          <p className="m-0 text-lead text-body">
            With deep knowledge of the short-term rental industry, I guide hosts step by step — from listing creation and pricing
            strategy to guest experience and scaling for long-term success.
          </p>
          <p className="m-0 text-lead text-body">
            Through practical training, mentorship and proven techniques, I help hosts maximise bookings, increase revenue and stand
            out in a competitive market. Whether you&apos;re just getting started or ready to scale, my job is to help you avoid
            costly mistakes and get consistent results.
          </p>
          <p className="m-0 text-lead text-body">I work in person across Kampala, and virtually with hosts wherever they are.</p>
          <div className="border-y border-ink/16 py-7 font-display text-2xl leading-[1.4] text-ink italic">
            “My goal is simple: to help you build a thriving Airbnb business with confidence and clarity.”
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap flex flex-col gap-14 py-section">
          <h2 className="m-0 max-w-[760px] text-h2">
            How we&apos;ll <em>work together</em>
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-10">
            {WORK_STEPS.map((s) => (
              <div key={s.num} className="flex flex-col gap-3.5">
                <span className="font-display text-[56px] leading-none text-rust">{s.num}</span>
                <span className="font-display text-2xl">{s.name}</span>
                <span className="text-[15px] leading-relaxed text-body">{s.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-14 py-section">
        <div className="flex flex-col gap-5">
          <div className="eyebrow text-rust">I totally get it</div>
          <h2 className="m-0 text-h2">Hosting is a full-time business. You don&apos;t have to figure it out alone.</h2>
        </div>
        <div className="flex flex-col text-left">
          {WHY_ME.map((item) => (
            <div key={item} className="flex gap-5 border-t border-ink/16 py-5 text-[17px] last:border-b">
              <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-rust/12 text-rust">
                <CheckIcon />
              </span>
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
