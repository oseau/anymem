const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'zh-CN', 'zh-HK', 'zh-TW'],
  },
}

module.exports = nextConfig
