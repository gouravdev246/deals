import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://gouravdev246-deals.vercel.app/api/:path*",
        // destination: "https://z859wlj9-5000.inc1.devtunnels.ms/api/:path*",
      },
    ];
  },
  // Increase body size limit for file uploads (default is 4.5MB which fails on mobile)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
