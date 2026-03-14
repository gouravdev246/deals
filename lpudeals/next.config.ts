import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
        // destination: "https://z859wlj9-5000.inc1.devtunnels.ms/api/:path*",
      },
    ];
  },
};

export default nextConfig;
