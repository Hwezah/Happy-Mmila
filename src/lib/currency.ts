export type Currency = "USD" | "UGX";

const envRate = Number(process.env.NEXT_PUBLIC_UGX_RATE);
/** USD → UGX rate for the pricing toggle. Configurable via NEXT_PUBLIC_UGX_RATE. */
export const UGX_RATE = Number.isFinite(envRate) && envRate > 0 ? envRate : 3700;

/** "$200" or "UGX 740,000" (UGX rounded to the nearest 5,000). */
export function formatPrice(usd: number, cur: Currency, rate = UGX_RATE) {
  if (cur === "USD") return `$${usd}`;
  return `UGX ${(Math.round((usd * rate) / 5000) * 5000).toLocaleString("en-US")}`;
}

/** Short form: "$40" or "UGX 148k". */
export function formatPriceShort(usd: number, cur: Currency, rate = UGX_RATE) {
  if (cur === "USD") return `$${usd}`;
  return `UGX ${Math.round((usd * rate) / 1000)}k`;
}
