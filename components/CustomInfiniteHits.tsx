import { cn } from '@/lib/utils'
import React, { createElement, FunctionComponent } from 'react'
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch'

interface Props extends UseInfiniteHitsProps {
  component: FunctionComponent<any>
}

export default function CustomInfiniteHits( { component, ...props }: Props ) {
  const { items, sendEvent, showMore, isLastPage } = useInfiniteHits( props )

  return (
    <div className="flex flex-col gap-8 ">
      <ul className="list-none ml-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map( ( hit ) => (
          <li
            key={hit.objectID}
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
  )
}
