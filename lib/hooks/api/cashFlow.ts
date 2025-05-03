import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiTransactionTransaction } from '@/types/generated/contentTypes'
import qs from 'qs'
import useAxiosAuth from '../useAxiosAuth'
import { AxiosResponse } from 'axios'
import { IBodyTransaction } from '@/types/api/transaction'
import toast from 'react-hot-toast'

interface IMonthlyTransactions {
  income: number
  expense: number
  transactions: {
    day: string
    income: number
    expense: number
    transactions: ApiTransactionTransaction['attributes'][]
  }[]
}

export interface IFilter {
  month: string
  year: string
}

/**
 *  Get datas
 */
export const useCreate = () => {
  const axiosAuth = useAxiosAuth()

  const createMultiple = async ( body: IBodyTransaction[] ) => {
    try {
      const postTransactions = await Promise.all(
        body.map( ( transactionBody ) =>
          axiosAuth.post<ApiTransactionTransaction['attributes']>(
            '/api/transactions',
            {
              data : {
                ...transactionBody,
              },
            }
          )
        )
      )

      return postTransactions
    } catch ( error ) {
      toast.error( 'Error creating transactions' )
      throw error
    }
  }

  return { createMultiple }
}
/**
 *  Get datas
 */
export const useGetDatas = (
  filter: IFilter,
  enabled: boolean = true
): UseQueryResult<IMonthlyTransactions> => {
  const axiosAuth = useAxiosAuth()
  // query
  const query = {
    month : filter.month,
    year  : filter.year,
  }
  const queryString = qs.stringify( query, { addQueryPrefix : true } )

  const data: UseQueryResult<IMonthlyTransactions> =
    useQuery<IMonthlyTransactions>( {
      queryKey : ['transactions-monthly', filter.month, filter.year],
      queryFn  : async () => {
        const res: AxiosResponse<IMonthlyTransactions> = await axiosAuth(
          `/api/transactions/monthly${queryString}`
        )

        return res.data
      },
      enabled : enabled,
    } )

  return data
}
/**
 *  Get Detail
 */
// export const useGetDetail = (
//   slug: string | number,
//   enabled: boolean = true
// ): UseQueryResult<ApiArticleArticle> => {
//   const urlParamsObject = {
//     filters  : { slug },
//     populate : {
//       featureImage : { populate : '*' },
//       tags         : { populate : '*' },
//       seo          : { populate : '*' },
//     },
//   }

//   const data = useQuery( {
//     queryKey : ['article', 'detail', slug],
//     queryFn  : async () => {
//       const res = await fetchAPI( `/articles`, urlParamsObject )

//       if ( res.data?.length === 0 ) return notFound()
//       else return res.data[0]
//     },
//     enabled : enabled,
//   } )

//   return data
// }
