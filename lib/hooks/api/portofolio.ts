import api from '@/lib/api'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
const baseUrl = '/v1/portofolio'
/**
 *  Get Detail
 */
export const useGetDetail = (
  id: string | number,
  enabled: boolean = true
): UseQueryResult<IApi<IApiPortofolio>> => {
  const data = useQuery<IApi<IApiPortofolio>>( {
    queryKey : ['portofolio', 'detail', id],
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IApiPortofolio>> = await api.get(
        `${baseUrl}/${id}`
      )

      return res.data
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
