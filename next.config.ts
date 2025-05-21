import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
