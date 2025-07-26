import { ApiPagePage } from '@/types/generated/contentTypes'
import { fetchAPI } from '@/utils/fetch-api'
import { notFound } from 'next/navigation'

export const getAllPageSlugs = async (): Promise<
  ApiPagePage[] | null
> => {
  const urlParamsObject = {
    populate : {
      seo : { populate : '*' },
    },
    locale : 'all',
  }

  const res = await fetchAPI( `/pages`, urlParamsObject )

  if ( res.data?.length === 0 || !res?.data ) return notFound()
  else {
    return res.data
  }
}
