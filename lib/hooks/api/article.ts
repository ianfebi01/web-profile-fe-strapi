import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { fetchAPI } from '@/utils/fetch-api'
import { ApiArticleArticle } from '@/types/generated/contentTypes'
import { notFound } from 'next/navigation'
/**
 *  Get Detail
 */
export const useGetDetail = (
  slug: string | number,
  enabled: boolean = true
): UseQueryResult<ApiArticleArticle> => {
  const urlParamsObject = {
    filters  : { slug },
    populate : {
      featureImage : { populate : '*' },
      tags         : { populate : '*' },
      seo          : { populate : '*' },
    },
  }

  const data = useQuery( {
    queryKey : ['article', 'detail', slug],
    queryFn  : async () => {
      const res = await fetchAPI(
        `/articles`,
        urlParamsObject
      ).then( ( response ) => response.json() )
      
      if ( res.data?.length === 0 ) return notFound()
      else
        return res.data[0]
    },
    enabled : enabled,
  } )
  
  return data
}
