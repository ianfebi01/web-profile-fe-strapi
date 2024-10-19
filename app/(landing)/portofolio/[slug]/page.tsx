import Detail from '@/components/Pages/Home/Portofolio/Detail'
import { getDetail } from '@/lib/api/portofolioQueryFn'
import { IApi } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
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

    const data = response.data
    const title = data?.name
    const desc = `Potofolio for project called ${data?.name}`

    return {
      title,
      description : desc,
      openGraph   : {
        title,
        description : desc,
        url         : 'https://ianfebisastrataruna.my.id',
        siteName    : title,
        images      : [{ url : data?.image }],
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
            url : data?.image,
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
    queryFn  : (): Promise<IApi<IApiPortofolio>> => getDetail( params.slug ),
  } )

  const dehydratedState = dehydrate( queryClient )

  return (
    <main className="grow-[1] flex flex-col">
      <HydrationBoundary state={dehydratedState}>
        <Detail id={params.slug} />
      </HydrationBoundary>
    </main>
  )
}
