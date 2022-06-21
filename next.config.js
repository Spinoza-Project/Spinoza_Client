/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.todayan.com', 'www.kns.tv'],
  },
  env: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
};

module.exports = nextConfig;
