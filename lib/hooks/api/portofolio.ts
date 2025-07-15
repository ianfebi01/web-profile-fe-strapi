import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'
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
      gallery      : { populate : '*' },
      seo          : { populate : '*' },
    },
  }

  const data = useQuery( {
    queryKey : ['portofolio', 'detail', slug],
    queryFn  : async () => {
      const res = await fetchAPI( `/portofolios`, urlParamsObject )

      if ( res.data?.length === 0 ) return null
      else return res.data[0]
    },
    enabled : enabled,
  } )

  return data
}
/**
 *  Get Latest Portofolio
 */
export const useGetLatestPortofolios = (
  currentSlug: string,
  enabled: boolean = true
): UseQueryResult<ApiPortofolioPortofolio[]> => {
  const urlParamsObject = {
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
    },
    filters : {
      slug : {
        $ne : currentSlug,
      },
    },
    pagination : {
      limit : 4,
    },
    sort : ['createdAt:asc'],
  }

  const data = useQuery( {
    queryKey : ['latest-portofolios', currentSlug],
    queryFn  : async () => {
      const res = await fetchAPI( `/portofolios`, urlParamsObject )

      if ( res.data?.length === 0 ) return null
      else return res.data
    },
    enabled : enabled,
  } )

  return data
}
