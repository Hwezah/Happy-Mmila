import { cva, type VariantProps } from "class-variance-authority";

/*
 * Site buttons: 12px uppercase labels, 2px radius, no pills. Outline variants are 1px shorter on each
 * side so they match the solid ones' height with their border.
 *
 * layout
 *   pair   — two buttons side by side: equal width (flex 1 1 0) with 12px side padding under 880px
 *   single — a lone button: 70vw and centred between 560 and 880px, full width below 560px
 */
export const buttonVariants = cva(
  "eyebrow inline-block cursor-pointer rounded-xs text-center whitespace-nowrap transition-colors disabled:cursor-default",
  {
    variants: {
      variant: {
        solid: "bg-ink py-[clamp(13px,1.7vw,18px)] text-cream hover:bg-rust hover:text-cream",
        light: "bg-cream py-[clamp(13px,1.7vw,18px)] text-ink hover:bg-copper hover:text-ink",
        outline: "border border-ink/35 py-[clamp(12px,1.6vw,17px)] text-ink hover:border-ink hover:text-ink",
        outlineLight: "border border-cream/50 py-[clamp(12px,1.6vw,17px)] text-cream hover:border-cream hover:text-cream",
        /** Card CTA on light cards: fills dark on hover. */
        outlineFill: "border border-ink/40 py-[clamp(12px,1.6vw,17px)] text-ink hover:bg-ink hover:text-cream",
      },
      layout: {
        default: "flex-none px-[30px]",
        pair: "min-w-0 flex-none px-[30px] max-lg:flex-[1_1_0] max-lg:px-3",
        single: "box-border max-w-full flex-none px-[30px] max-sm:self-stretch sm:max-lg:w-[70vw] sm:max-lg:self-center",
        block: "w-full px-6",
      },
    },
    defaultVariants: { variant: "solid", layout: "default" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
