import { fetchAPI } from '@/utils/fetch-api'
import { ApiPortofolioPortofolio } from '@/types/generated/contentTypes'
import Button2 from '../Buttons/Button2'
import { Link } from '@/i18n/navigation'
import NoDataFound from '../NoDataFound'
import { getLocale } from 'next-intl/server'
import PortofoliosWrapper from '../PortofoliosWrapper'

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
      limit : 3,
    },
    locale,
  }

  const responseData = await fetchAPI( path, urlParamsObject )
  if ( responseData.data?.length === 0 ) return <NoDataFound />

  return (
    <div className="flex flex-col gap-4">
      <PortofoliosWrapper
        portofolios={( responseData?.data as ApiPortofolioPortofolio[] ).map( ( item ) => item.attributes )}
      />
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
