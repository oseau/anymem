import type { Locale } from "./i18n-config";

// Update this interface to include the new "auth" property
interface Dictionary {
  title: string;
  description: string;
  header: { features: string; comingSoon: string };
  hero: {
    title: string;
    description1: string;
    description2: string;
    startLearning: string;
    watchDemo: string;
  };
  features: {
    learnMore: string;
    spacedRepetition: {
      title: string;
      description: string;
      whatIs: {
        title: string;
        description: string;
      };
      algorithm: {
        title: string;
        description: string;
        features: string[];
      };
      howItWorks: {
        title: string;
        steps: string[];
      };
      retentionCurve: {
        title: string;
        imageAlt: string;
      };
      benefits: {
        title: string;
        list: string[];
      };
      chartExplanation: {
        title: string;
        description: string;
        optimizedReviews: string;
        avoidEarlyReviews: string;
        maximizePerformance: string;
      };
    };
    multiPlatform: {
      title: string;
      description: string;
      mobile: {
        title: string;
        description: string;
      };
      desktop: {
        title: string;
        description: string;
      };
      paper: {
        title: string;
        description: string;
      };
      syncFeature: {
        title: string;
        description: string;
      };
    };
    customizableDecks: {
      title: string;
      description: string;
      benefits: {
        title: string;
        list: string[];
      };
      howTo: {
        title: string;
        steps: string[];
      };
      getStarted: {
        title: string;
        description: string;
        buttonText: string;
      };
    };
  };
  footer: {
    copyright: string;
  };
  auth: {
    signIn: string;
    signUp: string;
  };
}

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

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
