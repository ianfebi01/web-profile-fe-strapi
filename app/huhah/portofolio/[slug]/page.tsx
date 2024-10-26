import Detail from '@/components/Pages/Home/Portofolio/Detail'
import { getDetail } from '@/lib/api/portofolioQueryFn'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import imageUrl from '@/utils/imageUrl'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

let cachedMetadata: any | null = null

export async function generateMetadata( {
  params,
}: {
  params: { slug: string }
} ) {
  if ( !cachedMetadata ) {
    cachedMetadata = await getMetadata( params.slug )
  }

  return cachedMetadata
}

const getMetadata = async ( id: string ) => {
  try {
    const response = await getDetail( id )

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
        images      : [{ url : imageUrl( data?.featureImage.data, 'thumbnail' ) }],
        type        : 'article',
        authors     : ['Ian Febi Sastrataruna'],
      },
      twitter : {
        card        : 'summary', // 'summary' for small card
        site        : '@ianfebi01', // Replace with your Twitter username
        title,
        description : desc,
        image       : [
          {
            url : imageUrl( data?.featureImage.data, 'thumbnail' ),
          },
        ],
      },
    }
  } catch ( error ) {
    // eslint-disable-next-line no-console
    console.error( 'Error fetching metadata:', error )

    return null
  }
}

export default async function PortofolioPage( {
  params,
}: {
  params: { slug: string }
} ) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery( {
    queryKey : ['portofolio', 'detail', params.slug],
    queryFn  : (): Promise<ApiPortofolioPortofolio | null> =>
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
