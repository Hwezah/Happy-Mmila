import REMOTE_IMAGES from "./images.json";

/**
 * Every photo and logo the site uses, keyed by name (URLs in images.json).
 *
 * They are served from the client's current site and Vercel Blob. To self-host them, run
 * `npm run images` (downloads each file into public/images/) and set USE_LOCAL_IMAGES to true.
 */
const USE_LOCAL_IMAGES = false;

export type ImageKey = keyof typeof REMOTE_IMAGES;

/** public/ path a key is saved to by scripts/fetch-images.mjs (keeps the remote extension). */
function localPath(key: ImageKey) {
  const ext = REMOTE_IMAGES[key].match(/\.(jpe?g|png|svg|webp)$/i)?.[1].toLowerCase().replace("jpeg", "jpg") ?? "jpg";
  return `/images/${key}.${ext}`;
}

export const IMG = Object.fromEntries(
  (Object.keys(REMOTE_IMAGES) as ImageKey[]).map((k) => [k, USE_LOCAL_IMAGES ? localPath(k) : REMOTE_IMAGES[k]]),
) as Record<ImageKey, string>;
