/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: { domains: ['cdn.discordapp.com', 'faisalman.github.io', 'avatars.githubusercontent.com'] },
};
