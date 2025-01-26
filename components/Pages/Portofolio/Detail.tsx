'use client'
import { useGetDetail } from '@/lib/hooks/api/portofolio'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
import Header from '@/components/Layouts/Header'
import Markdown from '@/components/Parsers/Markdown'
import GaleryCarousel from '@/components/Layouts/GaleryCarousel'
interface Props {
  slug: string | number
}
const Detail = ( { slug }: Props ) => {
  const { data, isFetching } = useGetDetail( slug )

  return (
    <section id="portofolio"
      className="w-full flex flex-col items-center bg-dark grow-[1]"
    >
      {isFetching && !data ? (
        <SkeletonDetail />
      ) : (
        <div className="w-full h-full grow-[1] max-w-5xl px-6 lg:px-8 mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={data?.attributes.title || ''}
            link={'/portofolio'}
          />
          {data?.attributes.gallery?.data?.length && (
            <GaleryCarousel data={data?.attributes.gallery?.data} />
          )}
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
            {data?.attributes.year !== undefined && (
              <Chip label={data?.attributes.year}
                bg="dark-secondary"
              />
            )}
            {data?.attributes.description !== undefined && (
              <div className="bg-dark-secondary p-4 border border-none rounded-lg flex flex-col gap-4 text-white/90">
                <Markdown content={data?.attributes.description} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Detail
