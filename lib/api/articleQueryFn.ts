import { ApiArticleArticle } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'

export const getDetail = async (
  slug: string | number
): Promise<ApiArticleArticle | null> => {
  const urlParamsObject = {
    filters  : { slug },
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      galery       : { populate : '*' },
      seo          : { populate : '*' },
    },
    pagination : {
      page     : 1,
      pageSize : 10000,
    },
  }

  const res = await fetchAPI( `/articles`, urlParamsObject ).then( ( res ) =>
    res.json()
  )
  if ( res.data?.length === 0 ) return null
  else {
    return res.data[0]
  }
}

export const getAllArticleSlugs = async (): Promise<
  ApiArticleArticle[] | null
> => {
  const urlParamsObject = {
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      galery       : { populate : '*' },
      seo          : { populate : '*' },
    },
  }

  const res = await fetchAPI( `/articles`, urlParamsObject ).then( ( res ) =>
    res.json()
  )
  if ( res.data?.length === 0 ) return null
  else return res.data
}
