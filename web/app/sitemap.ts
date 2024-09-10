import type { MetadataRoute } from 'next'
import { i18n } from '../i18n-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  
  const routes = [
    '',
    '/spaced-repetition',
    '/multi-platform',
    '/customizable-decks',
  ]

  const sitemap: MetadataRoute.Sitemap = routes.flatMap((route) => {
    return i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternateRefs: i18n.locales.map((l) => ({
        href: `${baseUrl}/${l}${route}`,
        hreflang: l,
      })),
    }))
  })

  return sitemap
}
