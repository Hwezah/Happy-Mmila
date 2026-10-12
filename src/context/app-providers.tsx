"use client";

import type { ReactNode } from "react";

import { CheckoutProvider } from "@/context/checkout-context";
import { CurrencyProvider } from "@/context/currency-context";

// Compose client-side context providers here as the app grows.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CurrencyProvider>
  );
}
