import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self'; 
      
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
      https://app.sandbox.midtrans.com
      https://api.sandbox.midtrans.com
      https://snap-assets.al-pc-id-b.cdn.gtflabs.io 
      // ... domain lainnya
      https://snap-popup-app.sandbox.midtrans.com;
      
      connect-src 'self' 
      // ... domain lainnya
      https://snap-popup-app.sandbox.midtrans.com;
      
      frame-src 'self' 
      https://app.sandbox.midtrans.com
      https://snap-popup-app.sandbox.midtrans.com;

      style-src 'self' 'unsafe-inline' 
      https://snap-assets.al-pc-id-b.cdn.gtflabs.io;
      
      img-src 'self' data: 
      https://snap-assets.al-pc-id-b.cdn.gtflabs.io
      https://pay.google.com;
      
      font-src 'self' data: 
      https://snap-assets.al-pc-id-b.cdn.gtflabs.io;

    `.replace(/\n/g, " ").trim(),
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
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
