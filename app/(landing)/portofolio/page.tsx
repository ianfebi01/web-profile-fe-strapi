import Header from '@/components/Layouts/Header'
import Portofolio from '@/components/Pages/Home/Portofolio'
import { getPortofolioQueryFn } from '@/lib/api/portofolioQueryFn'
import { IPaginationParams } from '@/types/params'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Url } from 'next/dist/shared/lib/router/router'
import React from 'react'

export default async function PortofoliosPage( {
  searchParams,
}: {
  searchParams: IPaginationParams
} ) {
  const backLink: Url = {
    pathname : '/',
    query    : {
      ...searchParams,
    },
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery( {
    queryKey : [
      'portofolio',
      searchParams.page || 1,
      searchParams.q || '',
      searchParams.limit || 12,
    ],
    queryFn : () =>
      getPortofolioQueryFn( {
        page  : searchParams.page || 1,
        q     : searchParams.q || '',
        limit : searchParams.limit || 12,
      } ),
  } )

  const dehydratedState = dehydrate( queryClient )

  return (
    <main className="main">
      <section id="portofolio"
        className="main__section h-fit bg-dark"
      >
        <div className="main__container mt-20 sm:mt-20 flex flex-col gap-4">
          <Header text="Portofolio"
            link={backLink}
          />
          <HydrationBoundary state={dehydratedState}>
            <Portofolio />
          </HydrationBoundary>
        </div>
      </section>
    </main>
  )
}
