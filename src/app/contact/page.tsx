import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Happy about your property and goals. WhatsApp, call or email — virtual and remote support available.",
};

const row = "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-t border-ink/16 py-[22px] text-ink hover:text-rust";
const label = "text-xs font-semibold tracking-[.2em] text-muted uppercase";

export default function ContactPage() {
  return (
    <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(48px,7vw,104px)] py-section">
      <div className="flex flex-col gap-7 max-lg:items-center">
        <div className="eyebrow text-rust">Contact</div>
        <h1 className="m-0 text-h1">
          Ready to transform <em className="text-rust">your Airbnb?</em>
        </h1>
        <p className="m-0 max-w-[520px] text-lead text-body">
          Tell me about your property and goals. I&apos;ll reply personally — usually within a day. Virtual and remote support available
          wherever you are.
        </p>
        <div className="mt-3 flex flex-col self-stretch text-left">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className={row}>
            <span className={label}>WhatsApp</span>
            <span className="font-display text-[22px]">{PHONE_DISPLAY}</span>
          </a>
          <a href={PHONE_TEL} className={row}>
            <span className={label}>Call</span>
            <span className="font-display text-[22px]">{PHONE_DISPLAY}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className={`${row} border-b`}>
            <span className={label}>Email</span>
            <span className="font-display text-[clamp(18px,5vw,22px)]">{EMAIL}</span>
          </a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
