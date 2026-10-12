"use client";

import { Accordion } from "radix-ui";

import { FAQS } from "@/lib/content";

/** One question open at a time; the first starts open. */
export function FaqAccordion() {
  return (
    <Accordion.Root type="single" collapsible defaultValue="0" className="w-full">
      {FAQS.map((f, i) => (
        <Accordion.Item key={f.q} value={String(i)} className="group border-t border-ink/16">
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="box-border flex w-full cursor-pointer justify-between gap-6 bg-transparent py-6 text-left font-display text-[21px] leading-[1.35] text-ink">
              <span>{f.q}</span>
              <span className="flex size-8 flex-none items-center justify-center rounded-full border border-rust/35 text-rust">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path
                    d="M6 1.5v9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="transition-opacity group-data-[state=open]:opacity-0"
                  />
                </svg>
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden">
            <p className="mt-0 mb-[26px] max-w-[720px] text-base leading-[1.7] text-body">{f.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
