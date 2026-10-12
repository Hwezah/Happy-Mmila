"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useCheckout } from "@/context/checkout-context";
import { MASTERCLASS_EVENT } from "@/lib/content";

/** Goes to /events and opens the ticket checkout for an event (the next masterclass by default). */
export function TicketLink({
  eventIndex = MASTERCLASS_EVENT,
  className,
  children,
}: {
  eventIndex?: number;
  className?: string;
  children: ReactNode;
}) {
  const { openCheckout } = useCheckout();
  return (
    <Link href="/events" className={className} onClick={() => openCheckout(eventIndex)}>
      {children}
    </Link>
  );
}

/** Opens the checkout in place (event cards on /events). */
export function TicketButton({ eventIndex, className, children }: { eventIndex: number; className?: string; children: ReactNode }) {
  const { openCheckout } = useCheckout();
  return (
    <button type="button" className={className} onClick={() => openCheckout(eventIndex)}>
      {children}
    </button>
  );
}
