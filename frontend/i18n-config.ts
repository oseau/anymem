export const fallbackLng = 'zh-CN'
export const languages = ['zh-CN', 'en', 'es', 'fr', 'zh-HK', 'zh-TW']
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
