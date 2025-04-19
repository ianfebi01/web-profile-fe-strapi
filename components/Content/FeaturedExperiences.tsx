import { fetchAPI } from '@/utils/fetch-api';
import { FunctionComponent } from 'react';
import Experience from '../Experience';
import { getLocale } from 'next-intl/server';
import NoDataFound from '../NoDataFound';

const FeaturedExperiences: FunctionComponent = async ( ) => {

  const locale = await getLocale()

  const path = `/experiences`
  const urlParamsObject = {
    sort       : { endDate : 'desc' },
    populate   : '*',
    pagination : {
      start : 0,
      limit : 100,
    },
    locale,
  }
  
  const responseData = await fetchAPI( path, urlParamsObject )
  if ( responseData.data?.length === 0 ) return <NoDataFound />
  
  return (
    <Experience
      data={responseData.data}
    />
  )
}

export default FeaturedExperiences
