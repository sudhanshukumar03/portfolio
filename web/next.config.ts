import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Only apply turbopack root for local dev to avoid conflicting with Vercel's outputFileTracingRoot
  ...(!process.env.VERCEL ? { turbopack: { root } } : {}),
};

export default nextConfig;
