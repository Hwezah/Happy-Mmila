export const WHATSAPP_NUMBER = "256757533151";
export const PHONE_DISPLAY = "+256 757 533 151";
export const PHONE_TEL = "tel:+256757533151";
export const EMAIL = "info@coachhappymmila.com";

/** wa.me link, optionally with a prefilled message. */
export function waLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
