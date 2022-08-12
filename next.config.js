/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    GO_BACKEND_URL: "http://localhost:1323",
    GO_LOGIN_URL: "http://localhost:1324",
  },
};

module.exports = nextConfig;
