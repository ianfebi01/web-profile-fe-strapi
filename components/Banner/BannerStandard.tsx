'use client'
import React, { useState, useEffect, useMemo } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import { cn } from '@/lib/utils'
import isVideo from '@/utils/is-video'
import { BannerComponentsBannerStandard } from '@/types/generated/components'
import imageUrl from '@/utils/imageUrl'
import Markdown from '../Parsers/Markdown'

interface BannerProps {
  sectionData: BannerComponentsBannerStandard['attributes']
}

const BannerStandard: React.FC<BannerProps> = ( { sectionData } ) => {
  const [isMobile, setIsMobile] = useState( false )

  const image = useMemo(
    () =>
      sectionData.background?.data && !isVideo( sectionData.background?.data )
        ? imageUrl( sectionData.background?.data, isMobile ? 'small' : 'xlarge' ) // Replace with your image URL logic
        : // eslint-disable-next-line react-hooks/exhaustive-deps
        '',
    [sectionData]
  )

  useEffect( () => {
    const mediaQuery = window.matchMedia( '(max-width: 768px)' )
    setIsMobile( mediaQuery.matches )

    const handleMediaQueryChange = ( event: MediaQueryListEvent ) => {
      setIsMobile( event.matches )
    }

    mediaQuery.addEventListener( 'change', handleMediaQueryChange )

    return () =>
      mediaQuery.removeEventListener( 'change', handleMediaQueryChange )
  }, [] )

  return (
    <section
      className={cn(
        'relative overflow-x-clip flex min-h-screen xxl:min-h-[710px] items-center',
        !sectionData.background?.data && 'bg-grey'
      )}
      style={
        !!sectionData.background?.data && !isVideo( sectionData.background?.data )
          ? { background : `url(${image}) no-repeat center center / cover` }
          : undefined
      }
    >
      {!!sectionData.background?.data &&
        isVideo( sectionData.background?.data ) && (
        <div className="absolute w-full h-full">
          <VideoPlayer
            sources={[
              {
                location :
                    imageUrl( sectionData?.background?.data, 'original' ) || '',
                codec : sectionData.background?.data?.attributes?.mime || '',
              },
            ]}
            isPlaying={true}
            autoplay={true}
            loop={true}
            inline={true}
            dimension="cover"
          />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col pr-6 lg:pr-8 justify-center h-full relative z-10 py-28 xxl:py-48 overflow-x-clip">
        <div className="flex flex-col justify-center items-start max-w-3xl">
          {sectionData.heading && (
            <h1
              className={cn(
                'font-extra-bold mt-0 w-fit text-white relative z-[1]',
                'text-3xl lg:text-5xl xxl:text-[4.35rem] xxl:leading-[4.5rem]',
                'drop-shadow-20-0.5'
              )}
            >
              {sectionData.heading}
            </h1>
          )}
          {!!sectionData.description && (
            <div className="drop-shadow-20-0.5">
              <Markdown content={sectionData.description} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BannerStandard
