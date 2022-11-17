/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents:
      true |
      {
        displayName: true
      }
  }
};

module.exports = nextConfig;
