/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents:
      true |
      {
        displayName: true
      },
    eslint: {
      ignoreDuringBuilds: true
    }
  }
};

module.exports = nextConfig;
