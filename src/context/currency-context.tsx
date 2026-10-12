"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { formatPrice, formatPriceShort, UGX_RATE, type Currency } from "@/lib/currency";

type CurrencyValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rate: number;
  fmt: (usd: number) => string;
  short: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyValue | null>(null);

/** Site-wide display currency (USD default). Every price on every page follows the Pricing toggle. */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const value = useMemo<CurrencyValue>(
    () => ({
      currency,
      setCurrency,
      rate: UGX_RATE,
      fmt: (usd) => formatPrice(usd, currency),
      short: (usd) => formatPriceShort(usd, currency),
    }),
    [currency],
  );
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
