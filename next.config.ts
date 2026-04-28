import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.bhipone.com",
        pathname: "/assets/uploads/**",
      },
    ],
  },
};

export default nextConfig;
