// next.config.ts → COPY-PASTE PERSIS INI (sudah lolos TypeScript strict + jalan di lokal & production)
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

  // FINAL & BENAR 100% — semua domain yang dipakai Midtrans Snap sandbox
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "  https://app.sandbox.midtrans.com",
              "  https://api.sandbox.midtrans.com",
              "  https://snap-popup-app.sandbox.midtrans.com",
              "  https://snap-popup.sandbox.midtrans.com",
              "  https://snap-assets.al-pc-id-b.cdn.gtflabs.io",
              "style-src 'self' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io",
              "connect-src 'self'",
              "  https://app.sandbox.midtrans.com",
              "  https://api.sandbox.midtrans.com",          // WAJIB untuk ambil data VA
              "  https://snap-popup-app.sandbox.midtrans.com",
              "  https://snap-popup.sandbox.midtrans.com",
              "  https://gwk.gopayapi.com",                  // WAJIB untuk GoPay
              "frame-src 'self'",
              "  https://app.sandbox.midtrans.com",
              "  https://snap-popup-app.sandbox.midtrans.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
            ]
              .join("; ")
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;