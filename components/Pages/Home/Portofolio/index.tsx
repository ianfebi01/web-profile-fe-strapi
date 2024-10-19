'use client';
import { IApiPortofolio } from '@/types/api/portofolio'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchInput from '@/components/Inputs/SearchInput'
import CardPortofolio from '@/components/Cards/CardPortofolio'
import NoDataFound from '@/components/NoDataFound'
import StyledPagination from '@/components/Layouts/StyledPagination'
import { useGetPortofolio } from '@/lib/hooks/api/portofolio'

const Portofolio = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parseInt( searchParams.get( 'page' ) || '1' )
  const limit = parseInt( searchParams.get( 'limit' ) || '12' )
  const q = searchParams.get( 'q' ) || ''

  const { data, isFetching } = useGetPortofolio( {
    page,
    limit,
    q,
  } )

  const handlePageChange = ( page: number ) => {
    const selectedPage = page + 1

    setSearchParams( 'page', selectedPage.toString() )
  }

  // @ NOTE router

  const setSearchParams = ( key: string, val: string ) => {
    const current = new URLSearchParams( Array.from( searchParams.entries() ) )
    // update as necessary
    const value = val.trim()

    if ( !value ) {
      current.delete( key )
    } else {
      current.set( key, val )
    }

    // cast to string
    const search = current.toString()
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : ''

    router.push( `${pathname}${query}` )
  }

  // @ NOTE fake look
  const mockLoop = new Array( limit ).fill( 0 )

  // color
  const getColor = ( index: number ) => {
    const num = index + 1

    if ( num % 4 === 0 ) return 'bg-dark-secondary'
    else if ( num % 3 === 0 ) return 'bg-green'
    else if ( num % 2 === 0 ) return 'bg-white'
    else return 'bg-dark-secondary'
  }

  return (
    <>
      <div className="flex flex-col gap-8 h-full pb-4">
        <div className="flex gap-4 justify-between">
          <SearchInput
            placeholder="Search portofolio"
            type="text"
            value={( q as string ) || ''}
            setValue={( value: string ) => setSearchParams( 'q', value )}
          />
        </div>

        {data?.data?.length && !isFetching ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data?.data?.map( ( item: IApiPortofolio, i ) => (
              <CardPortofolio
                key={item.id}
                index={i}
                color={getColor( i )}
                data={item}
                link
              />
            ) )}
          </div>
        ) : isFetching ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockLoop.map( ( _item, i ) => (
              <article
                key={i}
                className="h-64 md:h-64 p-4 border border-none rounded-lg flex gap-2 animate-pulse bg-dark-secondary"
              >
                <div className="basis-1/2 w-full flex flex-col justify-center gap-2">
                  <div className="h-6 bg-dark-secondary max-w-[10rem]" />
                  <div className="h-4 bg-dark-secondary" />
                  <div className="h-4 bg-dark-secondary max-w-[13rem]" />
                </div>
                <div className="basis-1/2 w-full">
                  <div className="h-full w-full bg-dark-secondary"></div>
                </div>
              </article>
            ) )}
          </div>
        ) : (
          <NoDataFound />
        )}

        {/* Pagination */}
        {data && data?.data?.length && !isFetching ? (
          <StyledPagination
            setCurrentPage={handlePageChange}
            currentPage={page}
            totalPages={data?.totalPage as number}
            hasNextPage={data?.hasNextPage as boolean}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Portofolio
