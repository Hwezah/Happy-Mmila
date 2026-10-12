import Link from "next/link";

import { SocialLinks } from "@/components/site/ui";
import { NAV } from "@/lib/content";
import { EMAIL, PHONE_DISPLAY, waLink } from "@/lib/whatsapp";

const heading = "text-[11px] font-semibold tracking-[.16em] text-copper uppercase";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-left text-line">
      <div className="wrap flex flex-col gap-[clamp(40px,6vw,64px)] pt-[clamp(56px,7vw,80px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-cream/12 pb-[clamp(32px,5vw,48px)] max-lg:flex-col max-lg:items-center max-lg:text-center">
          <div className="flex max-w-[440px] flex-col gap-3 max-lg:items-center">
            <span className="font-display text-[clamp(28px,3.4vw,40px)] leading-none text-cream">
              Happy <em>Mmila</em>
            </span>
            <span className="text-[15px] leading-relaxed">Helping you start, improve &amp; maximise your Airbnb income.</span>
          </div>
          <SocialLinks />
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(max-content,1.2fr)_minmax(0,.8fr)]">
          <div className="col-span-full flex flex-col gap-[18px] lg:col-span-1">
            <span className={heading}>Explore</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="py-0.5 text-[15px] text-line hover:text-cream">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            <span className={heading}>Get in touch</span>
            <div className="flex flex-col gap-3 text-[15px]">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-line hover:text-cream">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="text-[clamp(14px,1.4vw,15px)] whitespace-nowrap text-line hover:text-cream">
                {EMAIL}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            <span className={heading}>Based in</span>
            <div className="flex flex-col gap-3 text-[15px]">
              <span>Kampala, Uganda</span>
              <span>Remote worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap mt-[clamp(40px,6vw,64px)] flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-cream/12 pt-6 pb-[100px] text-[13px] text-faint lg:pb-9">
        <span>© {new Date().getFullYear()} Coach Happy. All rights reserved.</span>
        <Link href="/contact" className="text-faint hover:text-cream">
          Book a consultation
        </Link>
      </div>
    </footer>
  );
}
