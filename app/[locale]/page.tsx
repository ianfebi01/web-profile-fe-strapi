import { Metadata } from 'next'
import { FALLBACK_SEO } from '@/utils/constants'
import imageUrl from '@/utils/imageUrl'
import HeroesAndSections from '@/components/Parsers/HeroesAndSections'
import { Locale } from 'next-intl'
import { getHomePage } from '@/utils/get-home-page'
import { locales } from '@/i18n/config'

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const page = await getHomePage( params.locale )

  if ( !page.data?.attributes?.page?.data?.attributes?.seo ) return FALLBACK_SEO
  const metadata = page.data?.attributes?.page?.data?.attributes?.seo

  // Extract social metadata
  const socialMeta = Object.fromEntries(
    metadata.metaSocial.map(
      ( { socialNetwork, title, description, image }: any ) => [
        socialNetwork.toLowerCase(),
        { title, description, image },
      ]
    )
  )

  // Extract image data for Open Graph and Twitter

  return {
    title       : metadata.metaTitle,
    description : metadata.metaDescription,
    keywords    : metadata.keywords,
    robots      : metadata.metaRobots,
    openGraph   : {
      url         : metadata.canonicalURL,
      title       : metadata.metaTitle,
      description : metadata.metaDescription,
      siteName    : 'Ian Febi Sastrataruna', // Replace with your site name
      type        : 'website', // or "article"
      images      : [
        {
          url : metadata?.metaImage?.data
            ? imageUrl( metadata?.metaImage?.data, 'thumbnail' ) || ''
            : '',
        },
      ], // Add Open Graph image
    },
    twitter : {
      card        : 'summary',
      site        : '@ianfebi01',
      title       : metadata.metaTitle,
      description : socialMeta.twitter?.description || '',
      images      : [
        {
          url : socialMeta?.twitter?.image?.data
            ? imageUrl( socialMeta?.twitter?.image.data, 'thumbnail' ) || ''
            : '',
        },
      ], // Twitter image
    },
  }
}

export  function generateStaticParams() {
  
  return (
    locales?.map( ( locale ) => ( {
      locale : locale
    } ) ) || []
  )
}

export default async function PageHome( { params }: Props ) {
  const page = await getHomePage( params.locale )

  if ( !page.data?.attributes?.page?.data?.attributes ) return null

  return (
    <HeroesAndSections page={page.data?.attributes?.page?.data?.attributes} />
  )
}
