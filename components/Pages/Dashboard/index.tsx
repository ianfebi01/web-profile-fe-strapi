'use client'
import ChartCard from '@/components/Cards/ChartCard'
import ColumnChart from '@/components/Chart/Column'
import { IFilterMonthly, useGetDatas } from '@/lib/hooks/api/dashboard'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { cn } from '@/lib/utils'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import SkeletonMonthlyChart from './SkeletonMonthlyChart'

const Dashboard = () => {
  const date = new Date()
  const { year } = useFormatDate()

  const [filter, setFilter] = useState<IFilterMonthly>( {
    year : year( date ),
  } )

  const { data, isLoading, isError } = useGetDatas( filter )

  const changeYear = ( type: 'prev' | 'next' ) => {
    if ( type === 'prev' ) {
      setFilter( ( prev ) => ( { ...prev, year : String( Number( prev.year ) - 1 ) } ) )
    } else if ( type === 'next' ) {
      setFilter( ( prev ) => ( { ...prev, year : String( Number( prev.year ) + 1 ) } ) )
    }
  }

  return (
    <div className="mt-8">
      <div className={cn( 'grid grid-cols-1 md:grid-cols-2 gap-4' )}>
        <ChartCard
          title="Monthly Transactions"
          isError={isError}
          isLoading={isLoading}
          isNoData={( !!data && data.categories.length === 0 ) || !data}
          filterComponent={
            <div className="flex gap-2 items-center">
              <button
                className="border rounded-md w-6 h-6 border-white-overlay-2 hover:border-white-overlay transition-default"
                onClick={() => changeYear( 'prev' )}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span className="p font-normal m-0">{filter.year}</span>
              <button
                className="border rounded-md w-6 h-6 border-white-overlay-2 hover:border-white-overlay transition-default"
                onClick={() => changeYear( 'next' )}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          }
          loaderComponent={<SkeletonMonthlyChart />}
        >
          <ColumnChart
            categories={data?.categories || []}
            series={data?.series || []}
          />
        </ChartCard>
      </div>
    </div>
  )
}

export default Dashboard
