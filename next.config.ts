import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.70',
        // hostname: 'localhost',
        // port: '8080',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;