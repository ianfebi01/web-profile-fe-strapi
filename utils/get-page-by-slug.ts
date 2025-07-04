import { fetchAPI } from './fetch-api'
import bannerQueries from '@/assets/queries/heroes.json'
import sectionsQuery from '@/assets/queries/sections.json'

export async function getPageBySlug( slug: string, lang: string ) {

  const path = `/pages`
  const urlParamsObject = {
    filters  : { slug },
    populate : {
      banner : bannerQueries['banner'],
      seo    : {
        populate : {
          metaSocial : {
            populate : {
              image : '*'
            }
          },
          metaImage : '*'
        }
      },
      content : sectionsQuery["content"]
    },
    locale : lang,
  }

  return await fetchAPI( path, urlParamsObject )
}
