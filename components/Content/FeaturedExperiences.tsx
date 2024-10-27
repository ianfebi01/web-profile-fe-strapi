import { ApiExperienceExperience } from '@/types/generated/contentTypes';
import { fetchAPI } from '@/utils/fetsh-api';
import { FunctionComponent } from 'react';
import Experience from '../Experience';

const FeaturedExperiences: FunctionComponent = async ( ) => {

  const path = `/experiences`
  const urlParamsObject = {
    sort       : { endDate : 'desc' },
    populate   : '*',
    pagination : {
      start : 0,
      limit : 100,
    },
  }

  const responseData = await fetchAPI( path, urlParamsObject )
  if ( responseData.data?.length === 0 ) return null
  
  return (
    <Experience
      data={responseData.data}
    />
  )
}

export default FeaturedExperiences
