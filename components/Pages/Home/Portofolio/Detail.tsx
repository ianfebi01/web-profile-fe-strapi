'use client'
import { useGetDetail } from '@/lib/hooks/api/portofolio'
import Image from 'next/image'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
import Header from '@/components/Layouts/Header'
import imageUrl from '@/utils/imageUrl'
import Markdown from '@/components/Parsers/Markdown'
import { ArraysImageGalery } from '@/types/generated/components'
interface Props {
  slug: string | number
}
const Detail = ( { slug }: Props ) => {
  const { data, isFetching } = useGetDetail( slug )

  return (
    <section id="portofolio"
      className="main__section bg-dark grow-[1]"
    >
      {isFetching && !data ? (
        <SkeletonDetail />
      ) : (
        <div className="max-w-7xl w-full mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={data?.attributes.title || ''}
            link={'/portofolio'}
          />
          <div className="grid grid-cols-12 gap-8 overflow-visible">
            <div className=" text-white/90 col-span-12 lg:col-span-4 body-copy">
              <div className="sticky top-20">
                <div className="flex flex-row items-center gap-2">
                  {data?.attributes?.year !== undefined && (
                    <>
                      <Chip
                        label={data?.attributes?.year}
                        bg="dark-secondary"
                      />
                    </>
                  )}
                </div>
                {data?.attributes.description && (
                  <div>
                    <p className="text-white-overlay">Project description:</p>
                    <Markdown content={data?.attributes.description} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8 col-span-12 lg:col-span-8 h-full">
              {/* {data?.attributes.featureImage !== undefined && (
                <div className="relative overflow-hidden w-full aspect-video">
                  <Image
                    alt={`Image ${data?.attributes.title}`}
                    src={imageUrl( data?.attributes.featureImage.data ) || ''}
                    fill
                    sizes="auto"
                  />
                </div>
              )} */}

              {data?.attributes.galery?.length &&
                data?.attributes.galery.map(
                  ( item: ArraysImageGalery['attributes'], i: number ) => (
                    <div key={i}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative overflow-hidden w-full aspect-video">
                        <Image
                          alt={`Galery ${data.attributes.title} ${i}`}
                          src={imageUrl( item.media.data ) || ''}
                          fill
                          sizes="auto"
                        />
                      </div>
                      {item.caption && <Markdown content={item.caption} />}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Detail
