import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  "zh-CN": () =>
    import("./dictionaries/zh-CN.json").then((module) => module.default),
  "zh-HK": () =>
    import("./dictionaries/zh-HK.json").then((module) => module.default),
  "zh-TW": () =>
    import("./dictionaries/zh-TW.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
