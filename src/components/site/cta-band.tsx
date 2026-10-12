"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Closing call to action on every page except Contact. */
export function CtaBand() {
  if (usePathname() === "/contact") return null;
  return (
    <section className="border-t border-ink/12">
      <div className="wrap flex flex-wrap items-end justify-between gap-x-8 gap-y-7 py-[clamp(64px,8vw,108px)] max-lg:flex-col max-lg:items-stretch">
        <h2 className="m-0 max-w-[820px] text-h2 tracking-[-.025em]">
          Let&apos;s build something <em className="text-rust">guests remember.</em>
        </h2>
        <Link href="/contact" className={cn(buttonVariants({ layout: "single" }), "px-[34px] py-5")}>
          Work with me
        </Link>
      </div>
    </section>
  );
}
