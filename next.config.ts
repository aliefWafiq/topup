import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
      https://app.sandbox.midtrans.com
      https://api.sandbox.midtrans.com
      https://snap-assets.al-pc-id-b.cdn.gtfslabs.io
      https://pay.google.com
      https://js-agent.newrelic.com
      https://bam.nr-data.net
      https://gwk.gopayapi.com/sdk/stable/gp-container.min.js
      https://www.google-analytics.com
      https://ssl.google-analytics.com;
    `.replace(/\n/g, " "),
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
        source: "/(.*)", // berlaku untuk semua route
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
