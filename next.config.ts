/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://back-todo-theta.vercel.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;