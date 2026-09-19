/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real Kenya Buchanan photography will live in /public/media (Phase 1 uses
    // local files + tasteful placeholders). Remote sources can be added here
    // when a CDN/asset host is introduced.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
