'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import imageUrl from '@/utils/imageUrl'
import Markdown from '@/components/Parsers/Markdown'
import { useGetDetail } from '@/lib/hooks/api/article'
import imageLoader from '@/lib/constans/image-loader'
import SkeletonDetail from '../Portofolio/SkeletonDetail'
import Header from '@/components/Layouts/Header'
import Chip from '@/components/Chip'

interface Props {
  slug: string | number
}
const Detail = ( { slug }: Props ) => {
  const { data, isFetching } = useGetDetail( slug )
  const [isMobile, setIsMobile] = useState( false )

  useEffect( () => {
    // Check if mobile or not
    const mediaQuery = window.matchMedia( '(max-width: 768px)' )
    setIsMobile( mediaQuery.matches )

    mediaQuery.addEventListener( 'change', () => setIsMobile( mediaQuery.matches ) )

    return () => {
      mediaQuery.removeEventListener( 'change', () =>
        setIsMobile( mediaQuery.matches )
      )
    }
  }, [] )

  return (
    <section id="portofolio"
      className="main__section bg-dark grow-[1]"
    >
      {isFetching && !data ? (
        <SkeletonDetail />
      ) : (
        <div className="main__container mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={'Back'}
            link={'/article'}
          />
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
            <h1 className='mb-4 mt-0'>{data?.attributes.title}</h1>

            <div className="relative aspect-video w-full">
              {!!data?.attributes?.featureImage?.data && (
                <Image
                  className=" h-full object-cover object-center w-full"
                  src={
                    imageUrl(
                      data?.attributes?.featureImage?.data,
                      isMobile ? 'small' : 'xlarge'
                    ) || ''
                  }
                  fill
                  alt={`${data?.attributes?.title} Image`}
                  loading="lazy"
                  placeholder={imageLoader}
                />
              )}
            </div>

            <div className="flex flex-col gap-4 w-full">
              {data?.attributes.date !== undefined && (
                <Chip label={data?.attributes.date}
                  bg="dark-secondary"
                />
              )}
              {data?.attributes.content !== undefined && (
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
