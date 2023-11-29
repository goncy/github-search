/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/goncy",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
