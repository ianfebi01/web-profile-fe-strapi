import { fetchAPI } from './fetsh-api'

export async function getSiteData( lang: string ) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const path = `/site`
  const urlParamsObject = {
    populate : {
      name : {
        populate : '*'
      },
      description : {
        populate : '*'
      },
      logo : {
        populate : '*'
      },
      favicon : {
        populate : '*'
      },
      socials : {
        populate : '*'
      },
      mainNavMenu : {
        populate : '*'
      },
      footerNavMenu : {
        populate : '*'
      }
    },
    locale : lang,
  }
  const options = { headers : { Authorization : `Bearer ${token}` } }

  return await fetchAPI( path, urlParamsObject, options )
}
