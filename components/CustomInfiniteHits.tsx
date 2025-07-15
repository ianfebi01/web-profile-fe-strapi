import { cn } from '@/lib/utils'
import React, { createElement, FunctionComponent } from 'react'
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch'
import NoDataFound from './NoDataFound'
import { NoResultsBoundary } from './NoResutsBoundary'

interface Props extends UseInfiniteHitsProps {
  component: FunctionComponent<any>
  wrapperClass?: string
}

export default function CustomInfiniteHits( {
  component,
  wrapperClass = 'mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 list-none',
  ...props
}: Props ) {
  const { items, sendEvent, showMore, isLastPage } = useInfiniteHits( props )

  return (
    <>
      <NoResultsBoundary fallback={<NoDataFound />}>
        <div className="flex flex-col gap-8 ">
          <ul className={wrapperClass}>
            {items.map( ( hit, index ) => (
              <li
                key={index}
                onClick={() => sendEvent( 'click', hit, 'Hit Clicked' )}
                onAuxClick={() => sendEvent( 'click', hit, 'Hit Clicked' )}
              >
                {createElement( component, { hit : hit } )}
              </li>
            ) )}
          </ul>
          <button
            onClick={showMore}
            disabled={isLastPage}
            className={cn( 'button button-secondary', {
              'button-disabled' : isLastPage,
            } )}
          >
            Show more results
          </button>
        </div>
      </NoResultsBoundary>
    </>
  )
}
