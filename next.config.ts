import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "8mrxxogiq7r7hcmg.public.blob.vercel-storage.com",
      "cdn.aplikasikreasi.id",
      "play-lh.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.aplikasikreasi.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
