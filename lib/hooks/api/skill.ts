import {
  IApi,
  IApiActionParams,
  IApiPagination,
  IPayloadPagination,
} from '@/types/api'
import { IApiSkill } from '@/types/api/skill'
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
import toast from 'react-hot-toast'

export const useGetData = (
  params: IPayloadPagination
): UseQueryResult<IApi<IApiSkill[]> & IApiPagination> => {
  const axiosAuth = useAxiosAuth()

  const query = useQuery<IApi<IApiSkill[]> & IApiPagination>( {
    queryKey : ['skill', params.q, params.page],
    queryFn  : async () => {
      const data: AxiosResponse<IApi<IApiSkill[]> & IApiPagination> =
        await axiosAuth.get( '/v1/skill', {
          params : params,
        } )

      return data?.data
    },
    retry : false,
  } )

  return query
}

export const useDelete = ( { onSuccess, onError }: IApiActionParams ) => {
  const queryClient = useQueryClient()
  const axiosAuth = useAxiosAuth()

  const mutations = useMutation( {
    mutationKey : ['skill', 'delete'],
    mutationFn  : async ( id: number ) => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.delete(
        `/v1/skill/${id}`
      )

      return data.data.data
    },
    retry     : false,
    onSuccess : () => {
      queryClient.invalidateQueries( {
        queryKey : ['skill'],
      } )
      if ( onSuccess ) {
        onSuccess()
      }
    },
    onError : ( error: AxiosError<IApi> ) => {
      toast.error( error.response?.data?.message as string )
      if ( onError ) {
        onError()
      }
    },
  } )

  return mutations
}

export const useGetDetail = (
  id: string | number,
  enabled: boolean = true
): UseQueryResult<IApi<IApiSkill>> => {
  const axiosAuth = useAxiosAuth()

  const query = useQuery<IApi<IApiSkill>>( {
    queryKey : ['skill', 'detail', id],
    queryFn  : async () => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.get(
        `/v1/skill/${id}`
      )

      return data?.data
    },
    enabled : enabled,
    retry   : false,
  } )

  return query
}

export const useEdit = ( { onSuccess, onError }: IApiActionParams ) => {
  const queryClient = useQueryClient()
  const axiosAuth = useAxiosAuth()

  const mutations = useMutation( {
    mutationKey : ['skill', 'edit'],
    mutationFn  : async ( value: IApiSkill ) => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.put(
        `/v1/skill/${value.id}`,
        value
      )

      return data.data.data
    },
    onSuccess : () => {
      queryClient.invalidateQueries( {
        queryKey : ['skill'],
      } )
      toast.success( 'Successfully edit skill!' )
      if ( onSuccess ) {
        onSuccess()
      }
    },
    onError : () => {
      toast.error( 'Cant edit skill, please try again latter.' )
      if ( onError ) {
        onError()
      }
    },
  } )

  return mutations
}
