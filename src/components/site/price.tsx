"use client";

import { useCurrency } from "@/context/currency-context";

/** A USD amount shown in the visitor's chosen currency. */
export function Price({ usd, short = false }: { usd: number; short?: boolean }) {
  const { fmt, short: fmtShort } = useCurrency();
  return <>{short ? fmtShort(usd) : fmt(usd)}</>;
}
