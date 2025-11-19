// next.config.ts
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://app.sandbox.midtrans.com
        https://api.sandbox.midtrans.com
        https://snap-popup-app.sandbox.midtrans.com
        https://snap-popup.sandbox.midtrans.com     
        https://snap-assets.al-pc-id-b.cdn.gtflabs.io
        https://www.googletagmanager.com
        https://www.google-analytics.com
        https://bam.nr-data.net;

      style-src 'self' 'unsafe-inline'
        https://snap-assets.al-pc-id-b.cdn.gtflabs.io;

      connect-src 'self' data:
        https://app.sandbox.midtrans.com
        https://api.sandbox.midtrans.com
        https://snap-popup-app.sandbox.midtrans.com
        https://snap-popup.sandbox.midtrans.com
        https://gwk.gopayapi.com
        https://bam.nr-data.net
        https://www.google-analytics.com;

      frame-src 'self'
        https://app.sandbox.midtrans.com
        https://snap-popup-app.sandbox.midtrans.com;

      img-src 'self' data: blob: https:;

      font-src 'self' data:;
    `
      .replace(/\s+/g, " ")
      .trim(),
  },
];

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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;