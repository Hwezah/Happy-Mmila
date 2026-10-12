import Image from "next/image";

import { TRUSTED_BY } from "@/lib/content";

/** Partner logos on an infinite 32s loop (a duplicated set slides by -50%). Pauses on hover. */
export function TrustedMarquee() {
  const set = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex flex-none items-center gap-[clamp(48px,7vw,96px)] pr-[clamp(48px,7vw,96px)]">
      {TRUSTED_BY.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={hidden ? "" : logo.alt}
          width={160}
          height={34}
          className="h-[clamp(24px,6vw,34px)] w-auto flex-none opacity-70 contrast-90 grayscale"
        />
      ))}
    </div>
  );

  return (
    <section className="border-b border-ink/10 bg-sand">
      <div className="wrap flex flex-wrap items-center gap-x-[clamp(24px,4vw,56px)] gap-y-4 py-7">
        <span className="flex-none text-[11px] font-semibold tracking-[.16em] text-muted uppercase max-lg:basis-full">Trusted by</span>
        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee">
            {set(false)}
            {set(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
