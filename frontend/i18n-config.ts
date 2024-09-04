export const fallbackLng = 'en'
export const defaultLng = 'zh-CN'
export const languages = ['zh-CN', 'en', 'es', 'fr', 'zh-HK', 'zh-TW']
export const defaultNS = 'common'

export function getOptions (lng = defaultLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

export function getLanguageFromPath(path: string): string {
  const langCode = path.split('/')[1];
  return languages.includes(langCode) ? langCode : defaultLng;
}

export function shouldRedirect(path: string): boolean {
  return !languages.some(lang => path.startsWith(`/${lang}`));
}
