'use client' // <===== REQUIRED

import React from 'react'

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArraysImageGalery } from '@/types/generated/components'
import imageUrl from '@/utils/imageUrl'
import Markdown from '../Parsers/Markdown'
import Image, { ImageLoaderProps } from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import imageLoader from '@/utils/image-loader'

interface Props {
  data: ArraysImageGalery['attributes'][]
}

const GaleryCarousel: React.FC<Props> = ( { data } ) => {
  return (
    <ul className="w-full !m-0 relative">
      <Swiper
        navigation={{
          prevEl : `.btn-prev`,
          nextEl : `.btn-next`,
        }}
        pagination={{
          clickable          : true,
          el                 : `.paginationEL`,
          dynamicBullets     : true,
          dynamicMainBullets : 1,
        }}
        autoplay={{
          delay                : 5000,
          disableOnInteraction : true,
        }}
        autoHeight
        slidesPerView={1}
        centeredSlides
        centerInsufficientSlides
        lazyPreloadPrevNext={2}
        loop={true}
        mousewheel
        speed={1500}
        simulateTouch
        threshold={1}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {data.map( ( { caption, media }, index: number ) => (
          <SwiperSlide key={index}>
            <div className="h-full flex flex-col">
              <div className="relative aspect-video  overflow-hidden mb-8">
                <Image
                  alt={`Image ${index}`}
                  src={imageUrl( media.data, 'original' ) || ''}
                  loader={imageLoader}
                  fill
                  style={{
                    objectFit : 'contain',
                  }}
                  loading='lazy'
                  sizes="auto"
                />
              </div>
              {!!caption && (
                <div className="grow flex text-center w-full mx-auto max-w-3xl">
                  <Markdown content={caption} />
                </div>
              )}
            </div>
          </SwiperSlide>
        ) )}
      </Swiper>
      <div className="aspect-video absolute w-full top-0 hidden min-[1156px]:block">
        <button className="btn-prev absolute right-full inset-y-0 my-auto z-30 text-white/90 -translate-x-2 lg:-translate-x-4">
          <FontAwesomeIcon icon={faChevronLeft}
            size="5x"
          />
        </button>
        <button className="btn-next absolute left-full inset-y-0 my-auto z-30 text-white/90 translate-x-2 lg:translate-x-4">
          <FontAwesomeIcon icon={faChevronRight}
            size="5x"
          />
        </button>
      </div>
      <div className="aspect-video absolute w-full top-0">
        <div className="flex flex-row gap-2 items-center justify-center h-[44px] mx-auto inset-x-0 z-30 absolute top-full">
          <button className="btn-prev size-6 text-white/90 xl:hidden">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="paginationEL leading-none !translate-x-0"></div>
          <button className="btn-next size-6 text-white/90 xl:hidden">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </ul>
  )
}

export default GaleryCarousel
