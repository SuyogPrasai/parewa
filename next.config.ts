import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.16.1.230',
        // hostname: 'localhost',
        // port: '8080',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;