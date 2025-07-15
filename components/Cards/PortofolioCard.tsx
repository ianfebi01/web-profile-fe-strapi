'use client'

import { Link } from '@/i18n/navigation'
import imageLoader from '@/lib/constans/image-loader'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import imageUrl from '@/utils/imageUrl'
import { getPlainText } from '@/utils/parseMd'
import Image from 'next/image' // Update this import as needed

interface PortofolioCardProps {
  portofolio: ApiPortofolioPortofolio['attributes']
}

const PortofolioCard = ( { portofolio }: PortofolioCardProps ) => {
  return (
    <Link
      href={`/portofolio/${portofolio.slug}`}
      className="bg-dark-secondary rounded-lg w-full overflow-hidden flex flex-col !no-underline group h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden shrink-0 bg bg-dark/50">
        <Image
          alt={`Image ${portofolio?.title}`}
          src={
            imageUrl(
              portofolio.featureImage?.data || portofolio.featureImage,
              'original'
            ) || ''
          }
          fill
          className="group-hover:scale-110 transition-default object-contain object-center"
          loading="lazy"
          placeholder={imageLoader}
        />
      </div>

      <div className="relative flex flex-col px-4 py-6 h-full">
        {!!portofolio.year && (
          <small className="text-xs lg:text-sm line-clamp-1 px-2 py-1 bg-dark rounded-md w-fit mb-2">
            {portofolio.year}
          </small>
        )}

        <h3 className="pt-0 text-xl xxl:text-3xl xxl:leading-[2rem] font-extra-bold lg:mb-6 lg:mt-2">
          {portofolio.title}
        </h3>

        {!!getPlainText( portofolio.description ) && (
          <div className='xxl:text-xl'>
            <p className="line-clamp-3 text-white/80 m-0">
              {getPlainText( portofolio.description )}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PortofolioCard
