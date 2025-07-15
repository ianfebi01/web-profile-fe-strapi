'use client'
import {
  useGetDetail,
  useGetLatestPortofolios,
} from '@/lib/hooks/api/portofolio'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
import Header from '@/components/Layouts/Header'
import Markdown from '@/components/Parsers/Markdown'
import GaleryCarousel from '@/components/Layouts/GaleryCarousel'
import { useTranslations } from 'next-intl'
import PortofolioCard from '@/components/Cards/PortofolioCard'
interface Props {
  slug: string
}
const Detail = ( { slug }: Props ) => {
  const { data, isFetching } = useGetDetail( slug )
  const {
    data: latestPortofolioDatas,
    isFetching: isLatestPortofolioFetching,
  } = useGetLatestPortofolios( slug )

  const t = useTranslations()

  return (
    <section
      id="portofolio"
      className="w-full flex flex-col items-center bg-dark grow-[1]"
    >
      {isFetching && !data ? (
        <SkeletonDetail />
      ) : (
        <div className="w-full h-full grow-[1] max-w-3xl px-6 lg:px-8 mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={data?.attributes.title || ''}
            link={'/portofolio'}
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full mx-auto">
              {data?.attributes.gallery?.data?.length && (
                <GaleryCarousel data={data?.attributes.gallery?.data} />
              )}
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 flex-wrap">
                  {data?.attributes.year !== undefined && (
                    <Chip label={data?.attributes.year}
                      bg="dark-secondary"
                    />
                  )}
                  {data?.attributes.url !== undefined && (
                    <Chip
                      label="Url: "
                      link={data?.attributes.url}
                      bg="dark-secondary"
                    />
                  )}
                </div>
                {data?.attributes.description !== undefined && (
                  <div className="bg-dark-secondary p-4 border border-none rounded-lg flex flex-col gap-4 text-white/90">
                    <Markdown content={data?.attributes.description} />
                  </div>
                )}
              </div>
            </div>
            <hr className="border-white-overlay-2" />
            {!isLatestPortofolioFetching &&
              !!latestPortofolioDatas &&
              latestPortofolioDatas?.length > 0 && (
              <>
                <h2 className="h1 mt-0">{t( 'see_latest_portfolios' )}:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {latestPortofolioDatas?.map( ( portofolio ) => (
                    <PortofolioCard
                      key={portofolio.attributes.slug}
                      portofolio={portofolio?.attributes}
                    />
                  ) )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Detail
