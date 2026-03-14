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
};

export default nextConfig;
