/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // We stick to the classic pages router per requirements; no appDir.
  },
};

module.exports = nextConfig;
