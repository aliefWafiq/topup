import type { NextConfig } from "next";

// --- KONFIGURASI CSP "OPEN ALL" (UNTUK DEBUGGING) ---
// Kita izinkan SEMUA (*) sumber. Jika ini berhasil, baru nanti kita perketat.
const cspHeader = `
  default-src * data: blob: 'unsafe-inline' 'unsafe-eval';
  script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
  connect-src * data: blob: 'unsafe-inline';
  img-src * data: blob: 'unsafe-inline';
  frame-src * data: blob:;
  style-src * data: blob: 'unsafe-inline';
  font-src * data: blob: 'unsafe-inline';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  // Konfigurasi Image Anda (Tetap dipertahankan)
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

  // Inject Header CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;