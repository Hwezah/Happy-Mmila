import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { ArrowCircle } from "@/components/site/ui";
import { ARTICLES } from "@/lib/content";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.blurb,
    openGraph: { title: article.title, description: article.blurb, type: "article", images: [{ url: article.img }] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="mx-auto flex max-w-[820px] flex-col gap-7 px-[clamp(14px,4vw,46px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,96px)]">
      <Link href="/insights" className="eyebrow flex items-center gap-3 text-ink">
        <ArrowCircle className="rotate-180" />
        All insights
      </Link>
      <div className="flex flex-col gap-[18px]">
        <span className="eyebrow text-rust">{article.kind}</span>
        <h1 className="m-0 font-display text-[clamp(30px,5.4vw,64px)] leading-[1.02] tracking-[-.02em]">{article.title}</h1>
        <span className="text-sm text-muted">By Happy Mmila · {article.meta}</span>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-xs bg-sand-2">
        <Image src={article.img} alt="" fill
          sizes="(max-width: 820px) 100vw, 820px"
          preload
          className={cn("object-cover", article.imgFocus === "top" && "object-top")}
        />
      </div>
      <p className="m-0 font-display text-[clamp(20px,2vw,24px)] leading-normal">{article.lead}</p>
      {article.sections.map((s) => (
        <div key={s.h} className="flex flex-col gap-3">
          <h2 className="m-0 font-display text-[clamp(21px,2.4vw,30px)] leading-[1.2]">{s.h}</h2>
          <p className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.8] text-body">{s.p}</p>
        </div>
      ))}
      <div className="mt-3 flex flex-col gap-4 rounded-xs bg-ink p-[clamp(28px,5vw,40px)] text-cream max-lg:items-center max-lg:text-center">
        <span className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.2]">Want help applying this to your listing?</span>
        <span className="text-[15px] leading-relaxed text-line">A Starter Session turns these ideas into a plan for your property.</span>
        <Link
          href="/pricing"
          className={cn(buttonVariants({ variant: "light", layout: "single" }), "px-7 py-[clamp(12px,1.6vw,17px)] lg:self-start")}
        >
          See packages
        </Link>
      </div>
    </article>
  );
}
