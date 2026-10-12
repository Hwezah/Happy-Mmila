import type { SVGProps } from "react";

/* Hand-drawn 1.2–1.6px stroke glyphs from the prototype. The design uses no icon library. */

type P = SVGProps<SVGSVGElement>;

export function ArrowIcon(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M1.5 6h9M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ strokeWidth = 1.6, ...props }: P) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M2.4 6.3l2.4 2.4 4.8-5.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path d="M3.5 3.5l13 13M16.5 3.5l-13 13" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon(props: P) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M12 2.8l2.75 5.9 6.45.75-4.77 4.4 1.27 6.37L12 17.06 6.3 20.22l1.27-6.37L2.8 9.45l6.45-.75z" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden {...props}>
      <path d="M6 3.8v12.4L16.2 10z" fill="currentColor" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M8 14.5s4.8-4.3 4.8-8A4.8 4.8 0 0 0 3.2 6.5c0 3.7 4.8 8 4.8 8z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="6.5" r="1.7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CalendarIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.5V8l2.5 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon(props: P) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="3" y="7" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function MinusIcon(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M1.5 6h9M6 1.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon(props: P) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 3.5h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.3 1.7V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function SocialIcon({ name, ...props }: P & { name: "instagram" | "tiktok" | "linkedin" | "facebook" | "x" }) {
  switch (name) {
    case "instagram":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M14 3c.4 2.8 2.2 4.6 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path
            d="M5 9.5V19M5 5.2v.1M10 19v-9.5M10 13.5c0-2.4 1.6-4 3.8-4S17.5 11 17.5 13.5V19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path
            d="M14.5 21v-8h3l.5-3.5h-3.5V7.6c0-1 .4-1.7 1.8-1.7H18V2.8c-.4-.1-1.5-.2-2.7-.2-2.7 0-4.4 1.6-4.4 4.6v2.3H8V13h2.9v8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "x":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}
