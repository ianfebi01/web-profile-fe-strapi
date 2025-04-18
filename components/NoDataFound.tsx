import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const NoDataFound = () => {
  const t = useTranslations()
  
  return (
    <div className='w-full flex-grow flex flex-col gap-6 items-center justify-center'>
      <div className='relative w-60 h-60'>
        <Image src='/not-found.svg' 
          fill
          sizes='auto'
          alt='Not found image'
          className='object-cover'
          priority
        />
      </div>
      <h2 className='text-lg'>{t( 'no-data-found' )}</h2>
    </div>
  )
}

export default NoDataFound
