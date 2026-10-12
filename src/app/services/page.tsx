import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Price } from "@/components/site/price";
import { CheckItem } from "@/components/site/ui";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "One-on-one Airbnb training, listing audits, site visits and full Airbnb management — in Kampala or virtually.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap flex flex-col gap-6 pt-[clamp(56px,7vw,96px)] pb-12 max-lg:items-center">
        <div className="eyebrow text-rust">Services</div>
        <h1 className="m-0 max-w-[1000px] text-h1">
          Meet you where you are. <em className="text-rust">Take you further.</em>
        </h1>
        <p className="m-0 max-w-[620px] text-lead text-body">
          From first-time hosts to operators scaling a portfolio — every service is available in person in Kampala or virtually,
          wherever you are.
        </p>
      </section>

      <section className="wrap pb-[clamp(56px,7vw,96px)]">
        {SERVICES.map((s) => (
          <div
            key={s.num}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-14 gap-y-8 border-t border-ink/16 py-12"
          >
            <div className="flex flex-col gap-3.5">
              <span className="font-display text-[15px] text-rust">{s.num}</span>
              <h2 className="m-0 text-h2 tracking-normal">{s.name}</h2>
              <span className="text-sm text-muted">
                {s.priceStyle === "from" ? (
                  <>
                    From <Price usd={s.usd} />
                    {s.priceSuffix}
                  </>
                ) : (
                  <>
                    <Price usd={s.usd} /> per property / month
                  </>
                )}
              </span>
            </div>
            <p className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-body">{s.desc}</p>
            <div className="flex flex-col gap-3">
              {s.items.map((f) => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/16 pt-10 max-lg:flex-col max-lg:items-stretch">
          <span className="font-display text-[clamp(24px,2.4vw,32px)]">Bundled into packages — and better value.</span>
          <Link href="/pricing" className={buttonVariants({ layout: "single" })}>
            See packages &amp; pricing
          </Link>
        </div>
      </section>
    </>
  );
}
