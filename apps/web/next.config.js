/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: { domains: ['cdn.discordapp.com', 'avatars.githubusercontent.com'] },
};
