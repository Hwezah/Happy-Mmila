import type { ReactNode } from "react";

import { ArrowIcon, CheckIcon, SocialIcon, StarIcon } from "@/components/ui/icons";
import { SOCIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Round tick used in every checklist. `tone="copper"` for dark cards. */
export function CheckItem({ children, tone = "rust", className }: { children: ReactNode; tone?: "rust" | "copper"; className?: string }) {
  return (
    <div className={cn("flex gap-3 text-left text-[15px] leading-[1.45]", className)}>
      <span
        className={cn(
          "mt-px flex size-5 flex-none items-center justify-center rounded-full",
          tone === "rust" ? "bg-rust/12 text-rust" : "bg-copper text-ink",
        )}
      >
        <CheckIcon />
      </span>
      <span>{children}</span>
    </div>
  );
}

/** Small circled arrow after a text link. */
export function ArrowCircle({ size = 30, light = false, className }: { size?: number; light?: boolean; className?: string }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "flex flex-none items-center justify-center rounded-full border",
        light ? "border-cream/40" : "border-ink/30",
        className,
      )}
    >
      <ArrowIcon width={size < 30 ? 11 : 12} height={size < 30 ? 11 : 12} />
    </span>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-[3px] text-rust max-lg:justify-center", className)} aria-label="5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

export function SocialLinks() {
  return (
    <div className="flex gap-2.5">
      {SOCIALS.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex size-11 items-center justify-center rounded-full border border-cream/22 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
        >
          <SocialIcon name={s.key} />
        </a>
      ))}
    </div>
  );
}
