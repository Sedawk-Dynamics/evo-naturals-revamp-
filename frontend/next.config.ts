import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root to this folder (there is a stray package-lock.json
  // in the user home folder that Next.js would otherwise pick up).
  turbopack: { root: __dirname },
};

export default nextConfig;
