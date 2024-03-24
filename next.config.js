/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["./src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-global.website-files.com",
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
