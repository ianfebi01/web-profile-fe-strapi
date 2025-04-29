'use client'
import DefaultCategories from '@/components/DefaultCategories'
import NoDataFound from '@/components/NoDataFound'
import { IFilter, useGetDatas } from '@/lib/hooks/api/cashFlow'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { cn } from '@/lib/utils'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const CashFlow = () => {
  const { month, year, spaceMonthYear } = useFormatDate()

  const date = new Date()
  const [filter, setFilter] = useState<IFilter>( {
    month : month( date ),
    year  : year( date ),
  } )

  const { data, isLoading } = useGetDatas( filter )

  const formatCurency = ( value: number ) => {
    return value.toLocaleString( 'id-ID', {
      style    : 'currency',
      currency : 'IDR',
    } )
  }

  const mockLoop = new Array( 6 ).fill( 0 )

  const changeMonth = ( type: 'prev' | 'next' ) => {
    if ( type === 'prev' ) {
      setFilter( ( prev ) => ( { ...prev, month : String( Number( prev.month ) - 1 ) } ) )
    } else if ( type === 'next' ) {
      setFilter( ( prev ) => ( { ...prev, month : String( Number( prev.month ) + 1 ) } ) )
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <button
          className="hover:text-white-overlay transition-default"
          onClick={() => changeMonth( 'prev' )}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className="h3 font-normal m-0">
          {spaceMonthYear( new Date( `${filter.year}-${filter.month}-01` ) )}
        </h2>
        <button
          className="hover:text-white-overlay transition-default"
          onClick={() => changeMonth( 'next' )}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
        {isLoading &&
          mockLoop.map( ( item ) => (
            <div
              key={item}
              className="animate-pulse h-32 w-full rounded-lg bg-dark-secondary"
            />
          ) )}
        {!isLoading &&
          data?.transactions &&
          data?.transactions?.length > 0 &&
          data?.transactions.map( ( item, index ) => (
            <div
              key={index}
              className="p-4 bg-dark-secondary shadow-xl rounded-lg flex flex-col gap-4"
            >
              <div className="flex gap-2 items-center">
                <h2 className="m-0">{item.day}</h2>
                <div className="grow" />
                <div className="w-28 text-right text-blue-400">
                  <p className="m-0">{formatCurency( item.income )}</p>
                </div>
                <div className="w-28 text-right text-orange">
                  <p className="m-0">{formatCurency( item.expense )}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {item.transactions.map( ( subItem, subIndex ) => (
                  <div
                    className="flex flex-row gap-4 items-center"
                    key={subIndex}
                  >
                    <DefaultCategories name={subItem.mm_category?.name} />
                    <p className="m-0">{subItem.description}</p>
                    <div className="grow" />
                    <p
                      className={cn( 'm-0', [
                        subItem.type === 'income' && 'text-blue-400',
                        subItem.type === 'expense' && 'text-orange',
                      ] )}
                    >
                      {formatCurency( subItem.amount )}
                    </p>
                  </div>
                ) )}
              </div>
            </div>
          ) )}
        {!isLoading && data?.transactions.length === 0 && <NoDataFound />}
      </div>
    </div>
  )
}

export default CashFlow
