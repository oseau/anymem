export const fallbackLng = 'en'
export const languages = ['en', 'es', 'fr', 'zh-CN', 'zh-HK', 'zh-TW']
export const defaultNS = 'common'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
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
