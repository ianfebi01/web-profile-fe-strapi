'use client'

import { Link } from '@/i18n/navigation'
import imageLoader from '@/lib/constans/image-loader'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import imageUrl from '@/utils/imageUrl'
import { getPlainText } from '@/utils/parseMd'
import Image from 'next/image' // Update this import as needed

interface PortofolioCardProps {
  portofolio: ApiPortofolioPortofolio
}

const PortofolioCard = ( { portofolio }: PortofolioCardProps ) => {
  const { attributes } = portofolio

  return (
    <Link href={`/portofolio/${portofolio.attributes.slug}`}
      className="bg-dark-secondary rounded-lg w-full overflow-hidden flex flex-col !no-underline group"
    >
      <div className="relative aspect-video w-full overflow-hidden shrink-0">
        <Image
          alt={`Image ${attributes?.title}`}
          src={
            imageUrl( attributes.featureImage?.data, 'original' ) || ''
          }
          fill
          style={{
            objectFit : 'cover',
          }}
          className='group-hover:scale-110 transition-default'
          loading="lazy"
          placeholder={imageLoader}
        />
      </div>

      <div className="m-4">
        {!!attributes.year && (
          <small className="px-2 py-1 bg-dark rounded-md">
            {attributes.year}
          </small>
        )}

        <h2 className="h3 mt-2">{attributes.title}</h2>

        {!!getPlainText( attributes.description ) && (
          <p className="line-clamp-3 text-white/80">
            {getPlainText( attributes.description )}
          </p>
        )}
      </div>
    </Link>
  )
}

export default PortofolioCard
