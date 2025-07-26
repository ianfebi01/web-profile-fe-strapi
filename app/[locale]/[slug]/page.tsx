import { getPageBySlug } from '@/utils/get-page-by-slug'
import HeroesAndSections from '@/components/Parsers/HeroesAndSections'
import { notFound } from 'next/navigation'
import { ApiPagePage } from '@/types/generated/contentTypes'
import { getAllPageSlugs } from '@/lib/api/pagesQueryFn'

type Props = {
  params: {
    locale: string
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs() // Fetch slugs from Strapi

  return (
    slugs?.map( ( slug: ApiPagePage ) => ( {
      slug   : slug.attributes.slug,
      locale : slug.attributes.locale
    } ) ) || []
  )
}

export default async function PageRoute( { params }: Props ) {
  const page = await getPageBySlug( params.slug || 'home-id', params.locale )
  if ( page.data?.length === 0 ) return notFound()

  return <HeroesAndSections page={page.data?.[0]?.attributes} />
}
