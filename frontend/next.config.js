/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
