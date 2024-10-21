import api from '@/lib/api'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'
const baseUrl = '/v1/portofolio'
/**
 *  Get Detail
 */
export const useGetDetail = (
  slug: string | number,
  enabled: boolean = true
): UseQueryResult<ApiPortofolioPortofolio> => {
  const urlParamsObject = {
    filters  : { slug },
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      galery       : { populate : '*' },
      seo          : { populate : '*' },
    },
  }

  const data = useQuery( {
    queryKey : ['portofolio', 'detail', slug],
    queryFn  : async () => {
      const res = await fetchAPI(
        `/portofolios`,
        urlParamsObject
      ).then( ( response ) => response.json() )
      
      if ( res.data?.length === 0 ) return null
      else
        return res.data[0]
    },
    enabled : enabled,
  } )
  
  return data
}

/**
 *  Get portofolio
 */
export const useGetPortofolio = ( {
  page,
  limit,
  q,
}: IPayloadPagination ): UseQueryResult<
  IApi<IApiPortofolio[]> & IApiPagination
> => {
  const data = useQuery<IApi<IApiPortofolio[]> & IApiPagination>( {
    queryKey : ['portofolio', page || 1, q || '', limit || 12],
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IApiPortofolio[]> & IApiPagination> =
        await api.get( baseUrl, {
          params : {
            page  : page,
            limit : limit,
            q     : q,
          },
        } )

      return res.data
    },
  } )

  return data
}

/**
 *  Get Datas
 */
export const useGetDatas = ( {
  page,
  limit,
  q,
}: IPayloadPagination ): UseQueryResult<
  IApi<IApiPortofolio[]> & IApiPagination
> => {
  const axiosAuth = useAxiosAuth()

  const data = useQuery<IApi<IApiPortofolio[]> & IApiPagination>( {
    queryKey : ['portofolio', page || 1, q || '', limit || 12],
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IApiPortofolio[]> & IApiPagination> =
        await axiosAuth.get( baseUrl, {
          params : {
            page  : page,
            limit : limit,
            q     : q,
          },
        } )

      return res.data
    },
  } )

  return data
}
