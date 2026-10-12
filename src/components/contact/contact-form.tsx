"use client";

import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { LineField } from "@/components/site/field";
import { INTERESTS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

type Interest = (typeof INTERESTS)[number];

/** "Send a message" — composes a prefilled WhatsApp message rather than posting anywhere. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<Interest>("Not sure yet");
  const [msg, setMsg] = useState("");

  const text = `Hello Coach Happy, my name is ${name || "…"}.\nInterested in: ${interest}\n${msg}\n${email ? `Email: ${email}` : ""} ${phone ? `Phone: ${phone}` : ""}`.trim();

  return (
    <div data-animate="card" className="flex flex-col gap-[22px] self-start rounded-xs border border-ink/14 bg-paper p-[clamp(28px,4vw,48px)] text-left">
      <h2 className="m-0 font-display text-[clamp(25px,3.2vw,32px)]">Send a message</h2>
      <LineField label="Your name" value={name} onChange={setName} autoComplete="name" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[22px]">
        <LineField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <LineField label="Phone" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />
      </div>
      <div className="flex flex-col items-stretch gap-4 pt-1.5 pb-2.5 text-center">
        <span id="interest-label" className="text-xs font-semibold tracking-[.16em] text-muted uppercase">
          I&apos;m interested in
        </span>
        <div role="radiogroup" aria-labelledby="interest-label" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-3">
          {INTERESTS.map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={interest === i}
              onClick={() => setInterest(i)}
              className={cn(
                "min-h-[46px] w-full cursor-pointer rounded-full border px-3.5 py-2.5 text-sm leading-[1.2] whitespace-nowrap",
                interest === i ? "border-ink bg-ink text-cream" : "border-ink/30 bg-transparent text-ink",
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-[.16em] text-muted uppercase">Your message</span>
        <textarea
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="resize-y border-0 border-b border-ink/30 bg-transparent py-2.5 text-[17px] text-ink outline-none focus:border-ink"
        />
      </label>
      <a
        href={waLink(text)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ layout: "block" }), "mt-1.5 py-[clamp(14px,1.8vw,19px)]")}
      >
        Send via WhatsApp
      </a>
    </div>
  );
}
