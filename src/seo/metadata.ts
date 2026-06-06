import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
}

/**
 * Generate consistent metadata for pages.
 * Ensures proper OpenGraph and Twitter card tags.
 */
export function createMetadata({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  type = 'website',
}: PageMetadata): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brasilglobal.com'
  const fullTitle = title === 'Brasil Global' ? title : `${title} | Brasil Global`

  return {
    title: fullTitle,
    description,
    keywords: [
      'brasileiros no exterior',
      'imigração',
      'comunidade brasileira',
      ...keywords,
    ],
    openGraph: {
      title: fullTitle,
      description,
      url: baseUrl,
      siteName: 'Brasil Global',
      images: [{ url: image }],
      locale: 'pt_BR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

/**
 * Default metadata for the site.
 */
export const defaultMetadata: Metadata = createMetadata({
  title: 'Brasil Global',
  description:
    'Conteúdo, dicas e comunidade para brasileiros que vivem fora do Brasil. Podcast, newsletter, eventos e muito mais.',
})
