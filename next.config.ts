import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  // Browsers request /favicon.ico on their own; serve the SVG icon instead.
  async redirects() {
    return [{ source: '/favicon.ico', destination: '/icon.svg', permanent: true }];
  },
};

export default nextConfig;
