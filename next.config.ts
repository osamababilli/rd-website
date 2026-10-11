import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  // Browsers request /favicon.ico on their own; serve the PNG icon instead.
  async redirects() {
    return [{ source: '/favicon.ico', destination: '/icon.png', permanent: false }];
  },
};

export default nextConfig;
