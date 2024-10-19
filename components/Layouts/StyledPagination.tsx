import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react'
import { Pagination } from "react-headless-pagination";

interface Props{
	currentPage: number
	totalPages: number
	setCurrentPage: ( page: number ) => void
	hasNextPage: boolean
}
const StyledPagination: FunctionComponent<Props> = ( props ) => {
  const { currentPage, totalPages, setCurrentPage, hasNextPage } = props

  return (
    <div className='flex justify-center'>
      <Pagination
        edgePageCount={2}
        middlePagesSiblingCount={1}
        currentPage={currentPage - 1 as number}
        totalPages={totalPages as number}
        setCurrentPage={setCurrentPage}
        className="flex w-fit gap-4"
        truncableText="..."
        truncableClassName=""
      >
        <Pagination.PrevButton className={`w-6 h-6 rounded-full btn-admin-default ${currentPage <= 1 && 'cursor-default hover:bg-dark-secondary border-none hover:border-none'}`}
          disabled={currentPage <= 1}
        >
          <div className={`${currentPage <= 1 ? 'text-white/25' : 'text-white'} `}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </div>
        </Pagination.PrevButton>

        <nav className="flex justify-center flex-grow">
          <ul className="flex items-center justify-center gap-4">
            <Pagination.PageButton
              activeClassName="text-orange font-bold cursor-default"
              inactiveClassName="cursor-pointer"
              className=""
            />
          </ul>
        </nav>

        <Pagination.NextButton className={`w-6 h-6 rounded-full btn-admin-default ${!hasNextPage && 'cursor-default hover:bg-dark-secondary border-none hover:border-none'}`}
          disabled={!hasNextPage}
        >
          <div className={`${!hasNextPage ? 'text-white/25' : 'text-white'} `}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Pagination.NextButton>
      </Pagination>
    </div>
  )
}

export default StyledPagination
