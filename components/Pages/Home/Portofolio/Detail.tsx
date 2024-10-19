'use client'
import { useGetDetail } from '@/lib/hooks/api/portofolio'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
import Header from '@/components/Layouts/Header'
interface Props {
  id: string | number
}
const Detail = ( { id }: Props ) => {
  const { data, isFetching } = useGetDetail( id )
  const { year } = useFormatDate()

  return (
    <section id="portofolio"
      className="main__section bg-dark grow-[1]"
    >
      {isFetching && !data?.data ? (
        <SkeletonDetail />
      ) : (
        <div className="article__container mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <Header text={data?.data?.name || ''}
            link={'/portofolio'}
          />
          {data?.data?.image !== undefined && (
            <div className="relative aspect-video  overflow-hidden">
              <Image
                alt={`Image ${data?.data?.name}`}
                src={data?.data?.image}
                fill
                style={{
                  objectFit : 'contain',
                }}
                sizes="auto"
              />
            </div>
          )}
          {data?.data?.year !== undefined && (
            <Chip label={year( data?.data?.year )}
              bg="dark-secondary"
            />
          )}
          {data?.data?.description !== undefined && (
            <div className="bg-dark-secondary p-4 border border-none rounded-lg flex flex-col gap-4">
              <div
                className="text-white/90"
                dangerouslySetInnerHTML={{
                  __html : sanitizeHtml( data?.data?.description ),
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
