export const i18n = {
  defaultLocale: "zh-CN",
  locales: ["en", "es", "fr", "zh-CN", "zh-TW", "zh-HK", "ja", "ko"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
