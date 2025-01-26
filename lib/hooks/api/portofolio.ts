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
      )
      
      if ( res.data?.length === 0 ) return null
      else
        return res.data[0]
    },
    enabled : enabled,
  } )
  
  return data
}
