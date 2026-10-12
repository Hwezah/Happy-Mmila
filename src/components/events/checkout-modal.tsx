"use client";

import { Dialog } from "radix-ui";
import { useState, type ReactNode } from "react";

import { CloseIcon, LockIcon, MinusIcon, PinIcon, PlusIcon, CheckIcon } from "@/components/ui/icons";
import { LineField } from "@/components/site/field";
import { useCheckout } from "@/context/checkout-context";
import { useCurrency } from "@/context/currency-context";
import { EVENTS, PAY_METHODS, type EventItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type PayKey = (typeof PAY_METHODS)[number]["key"];
type Attendee = { name: string; email: string; phone: string };

const STEPS = ["Tickets", "Details", "Payment", "Confirmed"];
const MAX_PER_TIER = 10;

/**
 * Ticket checkout: a full-screen sheet under 880px, a centred sheet with 40px of backdrop above.
 * Payments are mocked — wire step 3 to a real provider (e.g. Flutterwave or Paystack for Mobile
 * Money + card) before taking money.
 */
export function CheckoutModal() {
  const { eventIndex, closeCheckout } = useCheckout();
  // Attendee details survive closing and reopening the sheet.
  const [attendee, setAttendee] = useState<Attendee>({ name: "", email: "", phone: "" });
  const event = eventIndex != null ? EVENTS[eventIndex] : null;

  return (
    <Dialog.Root open={!!event} onOpenChange={(o) => !o && closeCheckout()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 flex items-center justify-center bg-ink/60 p-0 backdrop-blur-[4px] data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:p-10 motion-reduce:animate-none">
          {event && (
            <Sheet key={eventIndex} event={event} attendee={attendee} setAttendee={setAttendee} onDone={closeCheckout} />
          )}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Sheet({
  event,
  attendee,
  setAttendee,
  onDone,
}: {
  event: EventItem;
  attendee: Attendee;
  setAttendee: (a: Attendee) => void;
  onDone: () => void;
}) {
  const { fmt } = useCurrency();
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState<number[]>(() => event.tiers.map((_, i) => (i === 0 ? 1 : 0)));
  const [pay, setPay] = useState<PayKey>("mtn");
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  const count = qty.reduce((a, q) => a + q, 0);
  const total = event.tiers.reduce((a, t, i) => a + qty[i] * t.usd, 0);
  const lines = event.tiers.flatMap((t, i) => (qty[i] ? [{ label: `${qty[i]} × ${t.name}`, amt: fmt(qty[i] * t.usd) }] : []));

  const bump = (i: number, d: number) =>
    setQty((q) => q.map((v, j) => (j === i ? Math.min(MAX_PER_TIER, Math.max(0, v + d)) : v)));

  const next = () => {
    if (step === 1) {
      if (count > 0) setStep(2);
    } else if (step === 2) {
      if (!attendee.name.trim()) return setError("Please add your name.");
      if (!attendee.email.trim() && !attendee.phone.trim())
        return setError("Add an email or WhatsApp number so we can send your tickets.");
      setError("");
      setStep(3);
    } else if (step === 3) {
      setRef(`CH-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      setStep(4);
    } else onDone();
  };

  const nextLabel = step === 1 ? "Continue" : step === 2 ? "Continue to payment" : step === 3 ? `Pay ${fmt(total)}` : "Done";
  const firstName = (attendee.name || "friend").trim().split(" ")[0];
  const sentTo = [attendee.email, attendee.phone && `WhatsApp ${attendee.phone}`].filter(Boolean).join(" and ") || "you";

  return (
    <Dialog.Content
      aria-describedby={undefined}
      className="flex h-full max-h-full w-full max-w-[620px] flex-col overflow-y-auto bg-cream text-left text-ink shadow-[0_30px_80px_rgba(42,28,21,.35)] outline-none lg:h-auto lg:rounded-xs"
    >
      <div className="sticky top-0 z-2 flex flex-col gap-[18px] border-b border-ink/12 bg-cream px-[clamp(20px,5vw,32px)] pt-[22px] pb-[18px]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[.16em] text-rust uppercase">
              {event.type} · {event.date}
            </span>
            <Dialog.Title className="m-0 font-display text-[22px] leading-[1.2] font-normal">{event.title}</Dialog.Title>
          </div>
          <Dialog.Close aria-label="Close" className="flex size-15 flex-none cursor-pointer items-center justify-center bg-transparent text-ink">
            <CloseIcon />
          </Dialog.Close>
        </div>
        <ol className="m-0 flex list-none gap-2 p-0" aria-label="Checkout steps">
          {STEPS.map((label, i) => (
            <li key={label} className="flex min-w-0 flex-1 flex-col gap-2" aria-current={i + 1 === step ? "step" : undefined}>
              <span className={cn("block h-0.5", i < step ? "bg-rust" : "bg-ink/15")} />
              <span
                className={cn(
                  "truncate text-[11px] font-semibold tracking-[.12em] uppercase",
                  i < step ? "text-ink" : "text-faint",
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex-1 px-[clamp(20px,5vw,32px)] pt-2 pb-7">
        {step === 1 && (
          <>
            {event.tiers.map((t, i) => (
              <div key={t.name} className="flex items-center gap-4 border-b border-ink/12 py-5">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-display text-xl">{t.name}</span>
                  <span className="text-sm leading-normal text-muted">{t.desc}</span>
                  <span className="mt-1 text-[15px] font-semibold">{fmt(t.usd)}</span>
                </div>
                <div className="flex flex-none items-center rounded-full border border-ink/25">
                  <StepperButton label={`Remove ${t.name} ticket`} onClick={() => bump(i, -1)} dim={qty[i] === 0}>
                    <MinusIcon />
                  </StepperButton>
                  <span className="w-[26px] text-center font-display text-lg" aria-live="polite">
                    {qty[i]}
                  </span>
                  <StepperButton label={`Add ${t.name} ticket`} onClick={() => bump(i, 1)}>
                    <PlusIcon />
                  </StepperButton>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2.5 pt-[18px] text-sm text-muted">
              <PinIcon className="flex-none text-rust" />
              {event.venue} · {event.time}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-[22px] pt-5">
            <p className="m-0 text-[15px] leading-relaxed text-body">Who should we send the tickets to?</p>
            <LineField label="Full name" value={attendee.name} onChange={(v) => setAttendee({ ...attendee, name: v })} autoComplete="name" />
            <LineField
              label="Email"
              type="email"
              value={attendee.email}
              onChange={(v) => setAttendee({ ...attendee, email: v })}
              autoComplete="email"
            />
            <LineField
              label="WhatsApp number"
              type="tel"
              placeholder="+256"
              value={attendee.phone}
              onChange={(v) => setAttendee({ ...attendee, phone: v })}
              autoComplete="tel"
            />
            {error && (
              <span role="alert" className="text-sm text-rust">
                {error}
              </span>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3 pt-5">
            <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-3">
              {PAY_METHODS.map((m) => {
                const on = pay === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setPay(m.key)}
                    className={cn(
                      "box-border flex cursor-pointer items-center gap-4 rounded-xs border px-[18px] py-[clamp(12px,1.5vw,16px)] text-left",
                      on ? "border-ink bg-paper" : "border-ink/20 bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 flex-none items-center justify-center rounded-full border-[1.5px]",
                        on ? "border-ink" : "border-ink/20",
                      )}
                    >
                      <span className={cn("size-2.5 rounded-full", on ? "bg-ink" : "bg-transparent")} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-base font-semibold">{m.label}</span>
                      <span className="text-[13px] text-muted">{m.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3.5 flex flex-col gap-2.5 rounded-xs bg-sand p-5">
              <span className="text-[11px] font-semibold tracking-[.16em] text-muted uppercase">Order summary</span>
              {lines.map((l) => (
                <div key={l.label} className="flex justify-between gap-4 text-[15px]">
                  <span>{l.label}</span>
                  <span>{l.amt}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-ink/15 pt-2.5 text-base font-semibold">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <span className="flex items-center gap-2 text-[13px] text-muted">
              <LockIcon className="flex-none" />
              Demo checkout — no payment will be taken.
            </span>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center gap-[18px] pt-7 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-ink text-copper">
              <CheckIcon width={26} height={26} strokeWidth={1.3} />
            </span>
            <h3 className="m-0 font-display text-[clamp(27px,3.4vw,34px)] leading-[1.1]">
              You&apos;re in, <em className="text-rust">{firstName}.</em>
            </h3>
            <p className="m-0 max-w-[400px] text-[15px] leading-relaxed text-body">
              Your tickets are on their way to {sentTo}. Show the reference below at the door.
            </p>
            <div className="mt-2 flex w-full flex-col rounded-xs bg-ink text-left text-cream">
              <div className="flex flex-col gap-1.5 p-6">
                <span className="text-[11px] font-semibold tracking-[.16em] text-copper uppercase">{event.type}</span>
                <span className="font-display text-[22px] leading-[1.2]">{event.title}</span>
                <span className="text-sm text-line">
                  {event.date} · {event.time}
                </span>
                <span className="text-sm text-line">{event.venue}</span>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 border-t-[1.5px] border-dashed border-cream/30 px-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] tracking-[.16em] text-faint uppercase">Tickets</span>
                  <span className="text-[15px]">{lines.map((l) => l.label).join(", ")}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] tracking-[.16em] text-faint uppercase">Reference</span>
                  <span className="font-display text-2xl tracking-[.06em] text-copper">{ref}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-ink/12 bg-cream px-[clamp(20px,5vw,32px)] pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        {step < 4 && (
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[13px] text-muted">
              {count} {count === 1 ? "ticket" : "tickets"}
            </span>
            <span className="font-display text-2xl leading-[1.1]">{fmt(total)}</span>
          </div>
        )}
        <div className={cn("flex justify-end gap-2.5", step === 4 ? "flex-1" : "flex-[0_1_auto]")}>
          {(step === 2 || step === 3) && (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                setError("");
              }}
              className="eyebrow min-h-[50px] cursor-pointer rounded-xs border border-ink/30 bg-transparent px-[18px] text-ink"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={step === 1 && count === 0}
            className={cn(
              "eyebrow min-h-[50px] cursor-pointer rounded-xs border-0 bg-ink px-6 whitespace-nowrap text-cream transition-colors hover:bg-rust disabled:cursor-default disabled:opacity-35 disabled:hover:bg-ink",
              step === 4 ? "flex-1" : "flex-[0_1_auto]",
            )}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </Dialog.Content>
  );
}

function StepperButton({ label, onClick, dim, children }: { label: string; onClick: () => void; dim?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn("flex size-11 cursor-pointer items-center justify-center bg-transparent text-ink", dim && "opacity-30")}
    >
      {children}
    </button>
  );
}
