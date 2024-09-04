export const defaultLocale = 'zh-CN'
export const locales = ['zh-CN', 'en', 'es', 'fr', 'zh-HK', 'zh-TW']
export const defaultNS = 'common'

export function getOptions (locale = defaultLocale, ns = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng: 'en',
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
