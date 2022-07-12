/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.todayan.com',
      'www.kns.tv',
      'sopt-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  env: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/v1/payment/:path*',
        destination: 'https://kapi.kakao.com/v1/payment/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://3.34.192.134:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
