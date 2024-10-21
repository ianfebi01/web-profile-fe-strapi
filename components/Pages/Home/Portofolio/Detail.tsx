'use client'
import { useGetDetail } from '@/lib/hooks/api/portofolio'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
import Header from '@/components/Layouts/Header'
import imageUrl from '@/utils/imageUrl';
import { useEffect } from 'react';
import parseMd from '@/utils/parseMd';
import sanitize from '@/utils/sanitize';
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
        <div className="article__container mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={data?.attributes.title || ''}
            link={'/portofolio'}
          />
          {data?.attributes.featureImage !== undefined && (
            <div className="relative aspect-video  overflow-hidden">
              <Image
                alt={`Image ${data?.attributes.title}`}
                src={imageUrl( data?.attributes.featureImage.data ) || ''}
                fill
                style={{
                  objectFit : 'contain',
                }}
                sizes="auto"
              />
            </div>
          )}
          {data?.attributes?.year !== undefined && (
            <Chip label={data?.attributes?.year}
              bg="dark-secondary"
            />
          )}
          {data?.attributes?.description !== undefined && (
            <div className="bg-dark-secondary p-4 border border-none rounded-lg flex flex-col gap-4">
              <div
                className="text-white/90 body-copy"
                dangerouslySetInnerHTML={{
                  __html : sanitize( parseMd( data.attributes.description ), 'richtext' ),
                }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Detail
