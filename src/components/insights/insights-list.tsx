"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { PlayIcon } from "@/components/ui/icons";
import { ArrowCircle } from "@/components/site/ui";
import { useCheckout } from "@/context/checkout-context";
import { FEATURED_TALK, MASTERCLASS_EVENT, POST_FILTERS, POSTS, type Post } from "@/lib/content";
import { focusPosition } from "@/lib/images";
import { cn } from "@/lib/utils";

type Filter = (typeof POST_FILTERS)[number]["key"];

/** Page intro (children) + filter chips, the featured TEDx talk (All / Press only) and the post grid. */
export function InsightsList({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  const posts = POSTS.filter((p) => filter === "all" || p.cat === filter);

  return (
    <>
      <section className="wrap flex flex-col gap-6 pt-[clamp(56px,7vw,96px)] pb-10 max-lg:items-center">
        {children}
        <div className="flex flex-wrap gap-2 pt-2 max-lg:justify-center" role="group" aria-label="Filter insights">
          {POST_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-[18px] py-2.5 text-sm whitespace-nowrap",
                filter === f.key ? "border-ink bg-ink text-cream" : "border-ink/30 bg-transparent text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {(filter === "all" || filter === "press") && <FeaturedTalk />}

      <section className="wrap pt-5 pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.title} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}

function FeaturedTalk() {
  return (
    <section className="wrap pb-5">
      <a
        href={FEATURED_TALK.href}
        target="_blank"
        rel="noopener noreferrer"
        data-animate="card"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-xs bg-ink text-left text-cream hover:text-cream"
      >
        <div className="relative aspect-[16/11] bg-[#43302A]">
          <Image
            src={FEATURED_TALK.img}
            alt="Happy speaking on the TEDx stage"
            fill
            sizes="(max-width: 880px) 100vw, 590px"
            className="object-cover"
            style={{ objectPosition: focusPosition(FEATURED_TALK.imgFocus) }}
          />
          <span className="absolute bottom-5 left-5 flex size-16 items-center justify-center rounded-full bg-cream text-ink">
            <PlayIcon />
          </span>
        </div>
        <div className="flex flex-col justify-center gap-5 p-[clamp(28px,5vw,56px)] max-lg:text-center">
          <span className="text-[11px] font-semibold tracking-[.16em] text-copper uppercase">{FEATURED_TALK.meta}</span>
          <h2 className="m-0 text-h2">
            The Cost of Building <em>Before Comfort</em>
          </h2>
          <p className="m-0 text-[clamp(15.5px,1.25vw,17px)] leading-[1.7] text-line">{FEATURED_TALK.blurb}</p>
          <span className="eyebrow flex items-center gap-3.5 max-lg:justify-center">
            Watch the talk <ArrowCircle light />
          </span>
        </div>
      </a>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  const { openCheckout } = useCheckout();
  const className =
    "flex flex-col overflow-hidden rounded-xs border border-ink/14 bg-paper text-left text-ink transition-colors hover:border-ink/40 hover:text-ink";

  const body = (
    <>
      <div className="relative aspect-[16/10] bg-sand-2">
        <Image
          src={post.img}
          alt=""
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 380px"
          className="object-cover"
          style={{ objectPosition: focusPosition(post.imgFocus) }}
        />
        {post.video && (
          <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full bg-cream text-ink">
            <PlayIcon width={16} height={16} />
          </span>
        )}
        <span className="absolute top-4 left-4 rounded-xs bg-cream px-[11px] py-[7px] text-[11px] font-semibold tracking-[.16em] text-ink uppercase">
          {post.kind}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[clamp(22px,5vw,28px)]">
        <span className="text-[13px] text-muted">{post.meta}</span>
        <h3 className="m-0 font-display text-[clamp(21px,2.4vw,24px)] leading-[1.2] text-pretty">{post.title}</h3>
        <p className="m-0 text-[15px] leading-relaxed text-body">{post.blurb}</p>
        <span className="eyebrow mt-auto flex items-center gap-3 pt-3.5">
          {post.cta} <ArrowCircle size={28} />
        </span>
      </div>
    </>
  );

  if (post.external) {
    return (
      <a href={post.href} target="_blank" rel="noopener noreferrer" data-animate="card" className={className}>
        {body}
      </a>
    );
  }
  return (
    <Link href={post.href} data-animate="card" className={className} onClick={post.buy ? () => openCheckout(MASTERCLASS_EVENT) : undefined}>
      {body}
    </Link>
  );
}
