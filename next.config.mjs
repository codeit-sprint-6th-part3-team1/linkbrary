/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 임시로 우회 처리
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://linkbrary-api.vercel.app/6-1/:path*',
      },
    ];
  },
};

export default nextConfig;
