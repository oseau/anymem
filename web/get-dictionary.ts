import type { Locale } from "./i18n-config";

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
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
