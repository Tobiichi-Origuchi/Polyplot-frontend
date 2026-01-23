import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/profile/:username',
      },
    ];
  },
};

export default nextConfig;
