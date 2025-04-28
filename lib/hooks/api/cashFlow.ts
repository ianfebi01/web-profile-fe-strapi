import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  ApiArticleArticle,
  ApiTransactionTransaction,
} from '@/types/generated/contentTypes'
import { notFound } from 'next/navigation'
import qs from 'qs'
import useAxiosAuth from '../useAxiosAuth'
import { useTranslations } from 'next-intl'
import { IApi } from '@/types/api'
import { AxiosResponse } from 'axios'

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
/**
 *  Get datas
 */
export const useGetDatas = (
  month: string,
  enabled: boolean = true
): UseQueryResult<IMonthlyTransactions> => {
  const axiosAuth = useAxiosAuth()
  // query
  const query = {
    month: month,
  }
  const queryString = qs.stringify(query, { addQueryPrefix: true })

  const data: UseQueryResult<IMonthlyTransactions> =
    useQuery<IMonthlyTransactions>({
      queryKey: ['transactions-monthly', month],
      queryFn: async () => {
        const res: AxiosResponse<IMonthlyTransactions> = await axiosAuth(
          `/api/transactions/monthly${queryString}`
        )

        return res.data
      },
      enabled: enabled,
    })

  return data
}
/**
 *  Get Detail
 */
export const useGetDetail = (
  slug: string | number,
  enabled: boolean = true
): UseQueryResult<ApiArticleArticle> => {
  const urlParamsObject = {
    filters: { slug },
    populate: {
      featureImage: { populate: '*' },
      tags: { populate: '*' },
      seo: { populate: '*' },
    },
  }

  const data = useQuery({
    queryKey: ['article', 'detail', slug],
    queryFn: async () => {
      const res = await fetchAPI(`/articles`, urlParamsObject)

      if (res.data?.length === 0) return notFound()
      else return res.data[0]
    },
    enabled: enabled,
  })

  return data
}
