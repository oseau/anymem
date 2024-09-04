const { defaultLocale, locales } = require('./i18n-config.js');

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale,
    localeDetection: true,
  },
};

module.exports = nextConfig;
