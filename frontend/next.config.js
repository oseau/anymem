const { defaultLocale, locales } = require('./i18n-config');

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale,
    localeDetection: true,
  },
};

module.exports = nextConfig;
