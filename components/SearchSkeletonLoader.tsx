'use client'
import NoDataFound from '@/components/NoDataFound'
import { createElement, FunctionComponent, useEffect, useState } from 'react'
import { useInstantSearch } from 'react-instantsearch'

interface Props {
  children: React.ReactNode
  skeletonComponent: FunctionComponent<any>
}
const SearchSkeletonLoader = ({ children, skeletonComponent }: Props) => {
  const { status, results } = useInstantSearch()
  const [isClientSide, setIsClientSide] = useState(false)
  useEffect(() => {
    setIsClientSide(true)
  }, [])
  /**
   *  fake array
   */
  const mockLoop = new Array(9).fill(0)

  if (status === 'stalled') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockLoop.map((_item, i) => (
          <div key={i}>{createElement(skeletonComponent)}</div>
        ))}
      </div>
    )
  }
  return children
}

export default SearchSkeletonLoader
