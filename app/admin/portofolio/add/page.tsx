import Header from '@/components/Layouts/Header'
import AddPortofolio from '@/components/Pages/AddPortofolio'
import { IPaginationParams } from '@/types/params'
import { Url } from 'next/dist/shared/lib/router/router'
import React from 'react'

export default function AddPortofolioPage( { searchParams }: {searchParams: IPaginationParams } ) {
  const backLink: Url = {
    pathname : '/admin/portofolio',
    query    : {
      ...searchParams
    }

  }
	
  return (
    <div className="flex flex-col gap-6 h-full">
      <Header text='Add Portofolio'
        link={backLink}
      />
      <AddPortofolio/>
    </div> 
  )
}
