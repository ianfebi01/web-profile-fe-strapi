import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'

export const getDetail = async (
  slug: string | number
): Promise<ApiPortofolioPortofolio | null> => {
  const urlParamsObject = {
    filters  : { slug },
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      gallery      : { populate : '*' },
      seo          : { populate : '*' },
    },
    pagination : {
      page     : 1,
      pageSize : 10000,
    },
  }

  const res = await fetchAPI( `/portofolios`, urlParamsObject )
  if ( res.data?.length === 0 ) return null
  else return res.data[0]
}

export const getAllPortfolioSlugs = async (): Promise<
  ApiPortofolioPortofolio[] | null
> => {
  const urlParamsObject = {
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
      gallery      : { populate : '*' },
      seo          : { populate : '*' },
    },
  }

  const res = await fetchAPI( `/portofolios`, urlParamsObject )

  if ( res.data?.length === 0 ) return null
  else return res.data
}

export const getLatestPortofolios = async ( currentSlug: string ): Promise<
  ApiPortofolioPortofolio[] | null
> => {
  const urlParamsObject = {
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
    },
    filters : {
      slug : {
        $ne : currentSlug
      }
    },
    pagination : {
      limit : 4
    },
    sort : ['createdAt:asc']
  }

  const res = await fetchAPI( `/portofolios`, urlParamsObject )

  if ( res.data?.length === 0 ) return null
  else return res.data
}
