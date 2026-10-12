import type { Metadata, Viewport } from "next";
import { Figtree, Lora } from "next/font/google";

import { CheckoutModal } from "@/components/events/checkout-modal";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { MobileDock } from "@/components/site/mobile-dock";
import { TextReveal } from "@/components/site/text-reveal";
import { AppProviders } from "@/context/app-providers";
import { IMG } from "@/lib/images";
import "./globals.css";

const lora = Lora({ variable: "--font-lora", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600"] });

const description =
  "Airbnb coaching and property management in Kampala and remote. Happy Mmila helps hosts start, improve and maximise their Airbnb income.";

// Absolute base for Open Graph URLs. Blank env vars are skipped, and on Vercel
// the deployment's own domain is used when NEXT_PUBLIC_SITE_URL isn't set.
function siteUrl(): URL {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, vercel && `https://${vercel}`];
  for (const c of candidates) {
    if (!c?.trim()) continue;
    try {
      return new URL(c.trim());
    } catch {
      // Ignore malformed values and try the next option.
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: "Coach Happy Mmila · Airbnb coach & property manager, Kampala", template: "%s · Coach Happy Mmila" },
  description,
  openGraph: {
    title: "Coach Happy Mmila",
    description,
    siteName: "Coach Happy Mmila",
    type: "website",
    images: [{ url: IMG.portraitHero, alt: "Coach Happy Mmila" }],
  },
  twitter: { card: "summary_large_image", title: "Coach Happy Mmila", description, images: [IMG.portraitHero] },
};

export const viewport: Viewport = { themeColor: "#2A1C15" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${figtree.variable}`}>
      <body>
        <AppProviders>
          {/* Under 880px text centres by default (the prototype's mobile alignment); blocks opt back out with text-left. */}
          <div className="flex min-h-svh flex-col overflow-x-clip max-lg:text-center">
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1 pt-[var(--hh,82px)]">
              {children}
              <CtaBand />
            </main>
            <SiteFooter />
          </div>
          <MobileDock />
          <TextReveal />
          <CheckoutModal />
        </AppProviders>
      </body>
    </html>
  );
}
