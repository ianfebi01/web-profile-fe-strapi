import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
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
  id: string | number
): Promise<IApi<IApiPortofolio>> => {
  const { serverRuntimeConfig } = getConfig()
  const baseUrl =
    typeof window === 'undefined' ? serverRuntimeConfig.baseUrl : '/api-web'

  return fetch( `${baseUrl}/v1/portofolio/${id}`, {
    method : 'GET',
    cache  : 'no-store',
  } ).then( ( res ) => res.json() )
}
