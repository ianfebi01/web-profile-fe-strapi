import { fetchAPI } from './fetch-api'
import bannerQueries from '@/assets/queries/heroes.json'
import sectionsQuery from '@/assets/queries/sections.json'

export async function getHomePage( lang: string ) {

  const path = `/home-page`
  const urlParamsObject = {
    populate : {
      page : {
        populate : {
          banner : bannerQueries['banner'],
          seo    : {
            populate : {
              metaSocial : {
                populate : {
                  image : '*',
                },
              },
              metaImage : '*',
            },
          },
          content : sectionsQuery['content'],
        },
      },
    },
    locale : lang,
  }
  // const options = { headers : { Authorization : `Bearer ${token}` } }

  return await fetchAPI( path, urlParamsObject )
}
