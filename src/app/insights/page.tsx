import type { Metadata } from "next";

import { InsightsList } from "@/components/insights/insights-list";

export const metadata: Metadata = {
  title: "Insights",
  description: "Hosting guides, media features and masterclass highlights — practical thinking for building an Airbnb business that lasts.",
};

export default function InsightsPage() {
  return (
    <InsightsList>
      <div className="eyebrow text-rust">Insights</div>
      <h1 className="m-0 max-w-[900px] text-h1">
        Notes from <em className="text-rust">the host&apos;s side.</em>
      </h1>
      <p className="m-0 max-w-[560px] text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-body">
        Hosting guides, media features and masterclass highlights — practical thinking for building an Airbnb business that lasts.
      </p>
    </InsightsList>
  );
}
