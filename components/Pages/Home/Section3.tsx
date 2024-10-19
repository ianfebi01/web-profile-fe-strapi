import TextHeader from '@/components/Texts/TextHeader'
import CardPortofolio from '@/components/Cards/CardPortofolio'
import axios, { AxiosResponse } from 'axios'
import { IApiPortofolio } from '@/types/api/portofolio'
import { IApi, IApiPagination } from '@/types/api'
import Link from 'next/link'
import Button2 from '@/components/Buttons/Button2'

const Section3 = async () => {
  const data: AxiosResponse<IApi<IApiPortofolio[]> & IApiPagination> = await axios.get( `${process.env.BASE_URL}/v1/portofolio`, {
    params : {
      page  : 1,
      limit : 4,
      q     : '',
    }
  } )
	
  return (
    <section id="portofolio"
      className="main__section h-fit bg-dark"
    >
      <div className="main__container my-8 flex flex-col gap-4">
        <TextHeader title="Portofolio"
          subtitle="See what i’ve been build"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
          {/* @ NOTE  CARD*/}

          {data.data?.data?.map( ( item: IApiPortofolio, i: number ) => (
            <CardPortofolio
              key={item.id}
              index={i}
              color={
                i === 1
                  ? 'bg-white'
                  : i === 2
                    ? 'bg-green'
                    : 'bg-dark-secondary'
              }
              data={item}
              transitionIn
              transitionHover
              link
            />
						
          ) )}

        </div>
        <Link className='no-underline'
          href={'/portofolio'}
        >
          <Button2 variant='secondary'
            className="w-fit"
          >Show more</Button2>
        </Link>
      </div>
    </section>
  )
}

export default Section3
