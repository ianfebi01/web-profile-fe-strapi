import SectionProvider from '@/components/Context/SectionProvider'
import ErrorLoadingData from '@/components/Layouts/ErrorLoadingData'
import Section1 from '@/components/Pages/Home/Section1'
import Section2 from '@/components/Pages/Home/Section2'
import Section3 from '@/components/Pages/Home/Section3'
import Section4 from '@/components/Pages/Home/Section4'
import { IApi, IApiLanding } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import axios from 'axios'

let cachedMetadata: any | null = null

export async function generateMetadata() {
  if ( !cachedMetadata ) {
    cachedMetadata = await getMetadata()
  }

  return cachedMetadata
}

const getMetadata = async () => {
  try {
    const response = await axios.get<IApi<IApiLanding>>(
      `${process.env.BASE_URL}/v1/landing`,
      {
        params : {
          email : 'ianfebi01@gmail.com',
        },
      }
    )

    const data = response.data
    const title = data.data?.profile.name
    const desc =
      'Front End Web Developer with 1+ year of experience. Expert on React js and Vue js'

    return {
      title,
      description : desc,
      openGraph   : {
        title,
        description : desc,
        url         : 'https://ianfebisastrataruna.my.id',
        siteName    : title,
        images      : [{ url : data.data?.profile.personImage }],
        type        : 'article',
        authors     : [data.data?.profile.name],
      },
      twitter : {
        card        : 'summary', // 'summary' for small card
        site        : '@ianfebi01', // Replace with your Twitter username
        title,
        description : desc,
        image       : [{ url : data.data?.profile.personImage }],
      },
    }
  } catch ( error ) {
    // eslint-disable-next-line no-console
    console.error( 'Error fetching metadata:', error )

    return null
  }
}

export default async function Home() {
  let data: IApi<IApiLanding> | null = null

  try {
    const response = await axios.get<IApi<IApiLanding>>(
      `${process.env.BASE_URL}/v1/landing`,
      {
        params : {
          email : 'ianfebi01@gmail.com',
        },
      }
    )
    data = response.data
  } catch ( error ) {
    return <ErrorLoadingData />
  }

  return (
    <main>
      <SectionProvider>
        <Section1 profile={data.data?.profile as IApiProfile} />
      </SectionProvider>
      <SectionProvider>
        <Section2 quote={data.data?.profile?.quote as string} />
      </SectionProvider>
      <SectionProvider>
        <Section3 />
      </SectionProvider>
      <SectionProvider>
        <Section4 />
      </SectionProvider>
    </main>
  )
}
