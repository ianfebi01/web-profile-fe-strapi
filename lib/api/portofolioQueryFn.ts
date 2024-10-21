import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'
import getConfig from 'next/config'

export const getPortofolioQueryFn = async (
  data: IPayloadPagination
): Promise<IApi<IApiPortofolio[]> & IApiPagination> => {
  const { serverRuntimeConfig } = getConfig()
  const baseUrl =
    typeof window === 'undefined' ? serverRuntimeConfig.baseUrl : '/api-web'

  const param = new URLSearchParams( {
    page  : data.page.toString(),
    limit : data.limit.toString(),
    q     : data.q.toString(),
  } )

  return fetch( `${baseUrl}/v1/portofolio?${param}`, {
    method : 'GET',
    cache  : 'no-store',
  } ).then( ( res ) => res.json() )
}

export const getDetail = async (
  slug: string | number
): Promise<ApiPortofolioPortofolio | null> => {

  const urlParamsObject = {
    filters  : { slug },
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      galery       : { populate : '*' },
      seo          : { populate : '*' }
    }
  }

  const res = await fetchAPI( `/portofolios`, urlParamsObject ).then( ( res ) => res.json() )
  if ( res.data?.length === 0 ) return null
  else
    return res.data[0]
}
