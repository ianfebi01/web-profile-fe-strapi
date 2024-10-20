import { Metadata } from 'next'
import { getPageBySlug } from '@/utils/get-page-by-slug'
import { FALLBACK_SEO } from '@/utils/constants'
import imageUrl from '@/utils/imageUrl'
import HeroesAndSections from '@/components/Parsers/HeroesAndSections'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug, params.lang)

  if (!page.data[0]?.attributes?.seo) return FALLBACK_SEO
  const metadata = page.data[0].attributes.seo

  // Extract social metadata
  const socialMeta = Object.fromEntries(
    metadata.metaSocial.map(
      ({ socialNetwork, title, description, image }: any) => [
        socialNetwork.toLowerCase(),
        { title, description, image },
      ]
    )
  )

  // Extract image data for Open Graph and Twitter

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    keywords: metadata.keywords,
    robots: metadata.metaRobots,
    openGraph: {
      url: metadata.canonicalURL,
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      siteName: 'Ian Febi Sastrataruna', // Replace with your site name
      type: 'website', // or "article"
      images: [{ url: imageUrl(metadata.metaImage?.data, 'thumbnail') || '' }], // Add Open Graph image
    },
    twitter: {
      card: 'summary',
      site: '@ianfebi01',
      title: metadata.metaTitle,
      description: socialMeta.twitter?.description || '',
      images: [
        { url: imageUrl(socialMeta.twitter?.image.data, 'thumbnail') || '' },
      ], // Twitter image
    },
  }
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug || 'home', params.lang)
  if (page.data?.length === 0) return null

  return <HeroesAndSections page={page.data[0]?.attributes} />
}
