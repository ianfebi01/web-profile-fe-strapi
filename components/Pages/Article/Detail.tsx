'use client'
import Image from 'next/image'
import imageUrl from '@/utils/imageUrl'
import Markdown from '@/components/Parsers/Markdown'
import { useGetDetail } from '@/lib/hooks/api/article'
import imageLoader from '@/lib/constans/image-loader'
import SkeletonDetail from '../Portofolio/SkeletonDetail'
import Header from '@/components/Layouts/Header'
import Chip from '@/components/Chip'
import { useTranslations } from 'next-intl'

interface Props {
  slug: string | number
}
const Detail = ( { slug }: Props ) => {
  const { data, isFetching } = useGetDetail( slug )
  const t = useTranslations();

  return (
    <section
      id="portofolio"
      className="w-full flex flex-col items-center bg-dark grow-[1]"
    >
      {isFetching && !data ? (
        <SkeletonDetail />
      ) : (
        <div className="w-full h-full grow-[1] max-w-5xl px-6 lg:px-8 mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={t( 'back' )}
            link={'/article'}
          />
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
            <div className="relative aspect-video w-full">
              {!!data?.attributes?.featureImage?.data && (
                <>
                  <Image
                    className="h-full object-cover object-center w-full hidden md:block"
                    src={
                      imageUrl(
                        data?.attributes?.featureImage?.data,
                        'xlarge'
                      ) || ''
                    }
                    fill
                    alt={`${data?.attributes?.title} Image`}
                    loading="eager"
                    placeholder={imageLoader}
                  />
                  <Image
                    className="h-full object-cover object-center w-full md:hidden"
                    src={
                      imageUrl( data?.attributes?.featureImage?.data, 'small' ) ||
                      ''
                    }
                    fill
                    alt={`${data?.attributes?.title} Image`}
                    loading="lazy"
                    placeholder={imageLoader}
                  />
                </>
              )}
            </div>

            <h1 className="mt-4 mb-0">{data?.attributes.title}</h1>

            <div className="flex flex-col gap-4 w-full">
              {!!data?.attributes.date && (
                <Chip label={data?.attributes.date}
                  bg="dark-secondary"
                />
              )}
              {!!data?.attributes.content && (
                <div className="bg-dark-secondary p-4 border border-none rounded-lg flex flex-col gap-4 text-white/90">
                  <Markdown content={data?.attributes.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Detail
