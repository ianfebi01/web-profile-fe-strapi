import { useQuery, UseQueryResult } from '@tanstack/react-query'
import useAxiosAuth from '../useAxiosAuth'
import qs from 'qs'
import { AxiosResponse } from 'axios'

export interface IFilterMonthly {
  year: string
}

interface IMonthlyChartTransactions {
  series: {
    name: string
    data: number[]
  }[]
  categories: string[]
}

/**
 *  Get monthly chart datas
 */
export const useGetDatas = (
  filter: IFilterMonthly,
  enabled: boolean = true
): UseQueryResult<IMonthlyChartTransactions> => {
  const axiosAuth = useAxiosAuth()
  // query
  const query = {
    year : filter.year,
  }
  const queryString = qs.stringify( query, { addQueryPrefix : true } )

  const data: UseQueryResult<IMonthlyChartTransactions> =
    useQuery<IMonthlyChartTransactions>( {
      queryKey : ['monthly-chart', filter.year],
      queryFn  : async () => {
        const res: AxiosResponse<IMonthlyChartTransactions> = await axiosAuth(
          `/api/transactions/monthly-chart${queryString}`
        )

        return res.data
      },
      enabled : enabled,
    } )

  return data
}
