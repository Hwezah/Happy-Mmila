"use client";

import { useCurrency } from "@/context/currency-context";
import type { Currency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/** USD / UGX segmented control. Switches every price on the site. */
export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div role="radiogroup" aria-label="Currency" className="flex gap-1 rounded-xs border border-ink/30 p-1 max-lg:self-center">
      {(["USD", "UGX"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={currency === c}
          onClick={() => setCurrency(c)}
          className={cn(
            "min-h-11 flex-1 cursor-pointer rounded-[1px] border-0 px-[18px] py-2.5 text-xs font-semibold tracking-[.14em]",
            currency === c ? "bg-ink text-cream" : "bg-transparent text-ink",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** Shown under the price lists while UGX is selected. */
export function RateNote() {
  const { currency, rate } = useCurrency();
  if (currency !== "UGX") return null;
  return (
    <p className="mt-4 mb-0 text-[13px] text-muted">
      UGX prices are approximate, based on 1 USD ≈ {rate.toLocaleString("en-US")} UGX. Final amount confirmed at booking.
    </p>
  );
}
