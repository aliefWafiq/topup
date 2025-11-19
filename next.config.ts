import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "8mrxxogiq7r7hcmg.public.blob.vercel-storage.com",
      "cdn.aplikasikreasi.id",
      "play-lh.googleusercontent.com",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.aplikasikreasi.id", pathname: "**" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com", pathname: "**" },
    ],
  },

// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src * data: blob:;"
        },
      ],
    },
  ];
},
};

export default nextConfig;