/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
