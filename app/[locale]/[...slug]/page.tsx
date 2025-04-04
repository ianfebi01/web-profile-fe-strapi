import { Metadata } from 'next'
import { getPageBySlug } from '@/utils/get-page-by-slug'
import { FALLBACK_SEO } from '@/utils/constants'
import imageUrl from '@/utils/imageUrl'
import HeroesAndSections from '@/components/Parsers/HeroesAndSections'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const page = await getPageBySlug( params.slug, params.locale )

  const metadata = page.data[0]?.attributes?.seo

  // Extract social metadata
  const socialMeta = metadata?.metaSocial?.length
    ? Object.fromEntries(
      metadata?.metaSocial?.map(
        ( { socialNetwork, title, description, image }: any ) => [
          socialNetwork.toLowerCase(),
          { title, description, image },
        ]
      )
    )
    : {}

  // Extract image data for Open Graph and Twitter

  return {
    title       : metadata?.metaTitle || page?.data[0]?.attributes?.title || FALLBACK_SEO.title || null,
    description : metadata?.metaDescription || FALLBACK_SEO.description || null,
    keywords    : metadata?.keywords || null,
    robots      : metadata?.metaRobots || null,
    openGraph   : {
      url         : metadata?.canonicalURL || null,
      title       : metadata?.metaTitle || null,
      description : metadata?.metaDescription || null,
      siteName    : 'Ian Febi Sastrataruna', // Replace with your site name
      type        : 'website', // or "article"
      images      : metadata?.metaImage?.data
        ? [{ url : imageUrl( metadata?.metaImage?.data, 'medium' ) || '' }]
        : [], // Add Open Graph image
    },
    twitter : {
      card        : 'summary',
      site        : '@ianfebi01',
      title       : metadata?.metaTitle || FALLBACK_SEO.title || null,
      description : socialMeta?.twitter?.description || FALLBACK_SEO.description || '',
      images      : socialMeta?.twitter?.image?.data
        ? [{ url : imageUrl( socialMeta?.twitter?.image?.data, 'medium' ) || '' }]
        : [], // Twitter image
    },
  }
}

export default async function PageRoute( { params }: Props ) {
  const page = await getPageBySlug( params.slug || 'home-id', params.locale )
  if ( page.data?.length === 0 ) return notFound()

  return <HeroesAndSections page={page.data[0]?.attributes} />
}
