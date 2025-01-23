import Detail from '@/components/Pages/Article/Detail'
import { getAllArticleSlugs, getDetail } from '@/lib/api/articleQueryFn'
import { ApiArticleArticle } from '@/types/generated/contentTypes'
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
  const title = data?.title
  const desc = `Potofolio for project called ${data?.title}`

  return {
    title,
    description : desc,
    openGraph   : {
      title,
      description : desc,
      url         : 'https://ianfebisastrataruna.my.id',
      siteName    : title,
      images      : [{ url : imageUrl( data?.featureImage.data, 'thumbnail' ) || '' }],
      type        : 'article',
      authors     : ['Ian Febi Sastrataruna'],
    },
    twitter : {
      card        : 'summary', // 'summary' for small card
      site        : '@ianfebi01', // Replace with your Twitter username
      title,
      description : desc,
      images      : [
        {
          url : imageUrl( data?.featureImage.data, 'thumbnail' ) || '',
        },
      ],
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
    queryFn  : (): Promise<ApiArticleArticle | null> =>
      getDetail( params.slug ),
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
