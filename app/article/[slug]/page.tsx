import Detail from '@/components/Pages/Article/Detail'
import { getAllArticleSlugs, getDetail } from '@/lib/api/articleQueryFn'
import { ApiArticleArticle } from '@/types/generated/contentTypes'
import { FALLBACK_SEO } from '@/utils/constants'
import imageUrl from '@/utils/imageUrl'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Metadata } from 'next'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const response = await getDetail( params.slug )
  const data = response?.attributes

  // Extract SEO metadata
  const seoMetadata = data?.seo // Assuming `seo` is the field containing SEO data
  const title = seoMetadata?.metaTitle || data?.title || FALLBACK_SEO.title
  const desc =
    seoMetadata?.metaDescription ||
    `Portfolio for project called ${data?.title}` ||
    FALLBACK_SEO.description

  // Extract social metadata (if available)
  const socialMeta = seoMetadata?.metaSocial?.length
    ? Object.fromEntries(
      seoMetadata?.metaSocial?.map(
        ( { socialNetwork, title, description, image }: any ) => [
          socialNetwork.toLowerCase(),
          { title, description, image },
        ]
      )
    )
    : {}

  return {
    title       : title || null,
    description : desc || null,
    keywords    : seoMetadata?.keywords || null, // Add keywords if available
    robots      : seoMetadata?.metaRobots || null, // Add robots meta if available
    openGraph   : {
      url         : seoMetadata?.canonicalURL || 'https://ianfebisastrataruna.my.id',
      title       : title || null,
      description : desc || null,
      siteName    : 'Ian Febi Sastrataruna', // Replace with your site name
      type        : 'article', // or "website"
      images      : data?.featureImage?.data
        ? [{ url : imageUrl( data?.featureImage?.data, 'thumbnail' ) || '' }]
        : [], // Add Open Graph image
      authors : ['Ian Febi Sastrataruna'], // Add authors if applicable
    },
    twitter : {
      card        : 'summary', // 'summary' for small card
      site        : '@ianfebi01', // Replace with your Twitter username
      title       : title || null,
      description : socialMeta?.twitter?.description || desc || '',
      images      : socialMeta?.twitter?.image?.data
        ? [
          {
            url :
                imageUrl( socialMeta?.twitter?.image?.data, 'thumbnail' ) || '',
          },
        ]
        : [], // Twitter image
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs() // Fetch slugs from Strapi

  return (
    slugs?.map( ( slug: ApiArticleArticle ) => ( {
      slug : slug.attributes.slug,
    } ) ) || []
  )
}

export default async function ArticlePage( {
  params,
}: {
  params: { slug: string }
} ) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery( {
    queryKey : ['article', 'detail', params.slug],
    queryFn  : (): Promise<ApiArticleArticle | null> => getDetail( params.slug ),
  } )

  const dehydratedState = dehydrate( queryClient )

  return (
    <main className="grow-[1] flex flex-col">
      <HydrationBoundary state={dehydratedState}>
        <Detail slug={params.slug} />
      </HydrationBoundary>
    </main>
  )
}
