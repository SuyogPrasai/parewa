import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.16.1.230',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.105.112',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.70',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;