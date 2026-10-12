"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type CheckoutValue = {
  /** Index into EVENTS of the event being booked, or null when the sheet is closed. */
  eventIndex: number | null;
  openCheckout: (eventIndex: number) => void;
  closeCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutValue | null>(null);

/** Which event's ticket checkout is open. Lives in the root layout so it survives route changes. */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [eventIndex, setEventIndex] = useState<number | null>(null);
  const openCheckout = useCallback((i: number) => setEventIndex(i), []);
  const closeCheckout = useCallback(() => setEventIndex(null), []);
  const value = useMemo(() => ({ eventIndex, openCheckout, closeCheckout }), [eventIndex, openCheckout, closeCheckout]);
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}
