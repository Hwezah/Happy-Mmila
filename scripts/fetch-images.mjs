// Downloads every image in src/lib/images.json into public/images/<key>.<ext>.
// Afterwards set USE_LOCAL_IMAGES = true in src/lib/images.ts to serve them from this site.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const urls = JSON.parse(await readFile(new URL("../src/lib/images.json", import.meta.url), "utf8"));
const outDir = new URL("../public/images/", import.meta.url);
await mkdir(outDir, { recursive: true });

let failed = 0;
for (const [key, url] of Object.entries(urls)) {
  const ext = url.match(/\.(jpe?g|png|svg|webp)$/i)?.[1].toLowerCase().replace("jpeg", "jpg") ?? "jpg";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(new URL(`${key}.${ext}`, outDir), Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${key}.${ext}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${key}: ${err.message}`);
  }
}
if (failed) process.exitCode = 1;
