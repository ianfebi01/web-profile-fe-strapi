import { fetchAPI } from '@/utils/fetch-api'
import { MetadataRoute } from 'next'

/**
 * Type
 */

type TContentType = {
  apiPath: string
  sitePath: string
}

type TLocale = {
  code: string
  url: string
}

type TResponse = {
  slug: string
  updatedAt: string
}
/**
 * Conts
 */
export const locales: TLocale[] = [
  {
    code : 'en',
    url  : `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
  },
  {
    code : 'id',
    url  : `${process.env.NEXT_PUBLIC_BASE_URL}/id`,
  },
]

export const contentTypes: TContentType[] = [
  {
    apiPath  : 'pages',
    sitePath : '',
  },
  {
    apiPath  : 'articles',
    sitePath : 'article',
  },
  {
    apiPath  : 'portofolios',
    sitePath : 'portofolio',
  },
]

/**
 * Fetch Func
 */
export const fetchContent = async (
  def: TContentType,
  locale: TLocale,
  fields = ['slug']
) => {
  let allSlugs: TResponse[] = []

  try {
    const initialResponse = await fetchAPI( `/${def.apiPath}`, {
      locale     : locale.code,
      pagination : {
        pageSize : 100,
      },
      fields : [...fields],
    } )

    // Helper function to fetch a specific page
    const fetchPage = async ( page: number ): Promise<TResponse[]> => {
      const response = await await fetchAPI( `/${def.apiPath}`, {
        locale     : locale.code,
        pagination : {
          pageSize : 100,
          page     : page,
        },
        fields : [...fields],
      } )

      if ( response.data?.length === 0 ) return []

      return response?.data?.map( ( d: { attributes: TResponse } ) => d.attributes )
    }

    // Fetch all pages based on the pageCount.
    const pageCount = initialResponse.meta?.pagination?.pageCount
    allSlugs = allSlugs.concat( await fetchPage( 1 ) ) // We already have the first page

    for ( let page = 2; page <= pageCount; page++ ) {
      const pageSlugs = await fetchPage( page )
      allSlugs = allSlugs.concat( pageSlugs )
    }

    return allSlugs
  } catch ( error ) {
    // eslint-disable-next-line no-console
    console.error( 'Failed to fetch content:', error )

    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes: MetadataRoute.Sitemap = []

  await Promise.all(
    contentTypes.map( async ( contentType ) => {
      await Promise.all(
        locales.map( async ( locale ) => {
          const content: TResponse[] = await fetchContent( contentType, locale, [
            'slug',
            'updatedAt',
          ] )

          content?.forEach( ( entry ) => {
            const { slug, updatedAt } = entry

            if ( slug === 'home' ) return

            if (
              !( typeof slug === 'string' && /^[؀-ۿ|a-z|0-9|-]+$/.test( slug ) )
            ) {
              throw new Error( `Invalid slug: ${slug}` )
            }

            const path = `/${contentType.sitePath}/${slug}`.replace(
              /\/\//g,
              '/'
            )
            const url = `${locale.url}${path}`

            dynamicRoutes.push( {
              url,
              lastModified : new Date( updatedAt ),
            } )
          } )
        } )
      )
    } )
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/account` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/cabins` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/checkin` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/reservations` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/settings` },
    { url : `${process.env.NEXT_PUBLIC_BASE_URL}/users` },
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
