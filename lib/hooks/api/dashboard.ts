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

interface ITopExpenseMonthly {
  series: number[]
  categories: string[]
}

export interface IFilter {
  month: string
  year: string
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

/**
 *  Get top expese monthly
 */
export const useGetTopExpense = (
  filter: IFilter,
  enabled: boolean = true
): UseQueryResult<ITopExpenseMonthly> => {
  const axiosAuth = useAxiosAuth()
  // query
  const query = {
    month : filter.month,
    year  : filter.year,
  }
  const queryString = qs.stringify( query, { addQueryPrefix : true } )

  const data: UseQueryResult<ITopExpenseMonthly> = useQuery<
    ITopExpenseMonthly
  >( {
    queryKey : ['top-expense-categories', filter.month, filter.year],
    queryFn  : async () => {
      const res: AxiosResponse<ITopExpenseMonthly> = await axiosAuth(
        `/api/transactions/top-expense-categories${queryString}`
      )

      return res.data
    },
    enabled : enabled,
  } )

  return data
}
