import { fetchAPI } from '@/utils/fetch-api'
import React from 'react'
import CardPortofolio from '../Cards/CardPortofolio'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import Button2 from '../Buttons/Button2'
import { Link } from '@/i18n/navigation'
import NoDataFound from '../NoDataFound'
import { getLocale } from 'next-intl/server'

const FeaturedPortofolios = async () => {
  const locale = await getLocale()

  const path = `/portofolios`
  const urlParamsObject = {
    sort     : { createdAt : 'desc' },
    populate : {
      featureImage : { populate : '*' },
      skills       : { populate : '*' },
    },
    pagination : {
      start : 0,
      limit : 4,
    },
    locale,
  }

  const responseData = await fetchAPI( path, urlParamsObject )
  if ( responseData.data?.length === 0 ) return <NoDataFound />

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
        {/* @ NOTE  CARD*/}

        {( responseData?.data as ApiPortofolioPortofolio[] )?.map(
          ( item, i: number ) => (
            <CardPortofolio
              key={item.attributes.slug}
              index={i}
              color={
                i === 1
                  ? 'bg-white'
                  : i === 2
                    ? 'bg-green'
                    : 'bg-dark-secondary'
              }
              data={item.attributes}
              transitionIn
              transitionHover
              link
            />
          )
        )}
      </div>
      <Link className="no-underline"
        href={'/portofolio'}
      >
        <Button2 variant="secondary"
          className="w-fit"
        >
          Show more
        </Button2>
      </Link>
    </div>
  )
}

export default FeaturedPortofolios
