import { fetchAPI } from './fetch-api'

export async function getSiteData( lang: string ) {

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
        populate : {
          navItems : {
            populate : '*'
          },
          navItem : {
            populate : '*'
          }
        }
      },
      footerNavMenu : {
        populate : '*'
      }
    },
    locale : lang,
  }

  return await fetchAPI( path, urlParamsObject )
}
