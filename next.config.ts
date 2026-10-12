import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos come pre-sized from the client's own site and Vercel Blob, so serve them as-is. Vercel's image
  // optimizer has a monthly cap on the Hobby plan; once it's hit every new image request fails.
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL("https://www.coachhappymmila.com/**"),
      new URL("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/**"),
      new URL("https://img.youtube.com/**"),
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
