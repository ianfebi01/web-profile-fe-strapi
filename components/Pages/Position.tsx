"use client"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPosition } from '@/types/api/position'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React, { useContext, useState } from 'react'
import SearchInput from '../Inputs/SearchInput'
import StyledPagination from '../Layouts/StyledPagination'
import NoDataFound from '../NoDataFound'
import Button2 from '../Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalAddPosition from '../Modal/ModalAddPosition'
import { PositionContext } from '@/context/PositionContext'

const Position = () => {

  // Position Context
  const { state, dispatch } = useContext( PositionContext )

  const axiosAuth = useAxiosAuth()
    
  const [params, setParams] = useState<IPayloadPagination>( {
    page  : 1,
    limit : 12,
    q     : ''
  } );

  const{ data, isLoading } = useQuery<IApi<IApiPosition[]> & IApiPagination>( {
    queryKey : ['position', params.page, params.q],
    queryFn  : async ()=> {
      const data: AxiosResponse<IApi<IApiPosition[]> & IApiPagination>  = await axiosAuth.get( '/v1/position', {
        params : params
      } )
			
      return data?.data
    },
  } )
    
  const handlePageChange = ( page: number )=>{
    setParams( {
      ...params,
      page : page + 1
    } )

    dispatch( {
      type    : 'set_paginator',
      payload : {
        ...state.paginator,
        page : page + 1
      }
    } )
  }

  const mockLoop = new Array( params.limit ).fill( 0 )

  // Modal
  const [isOpen, setIsOpen] = useState<boolean>( false );
	
  return (
    <>
      <div className='flex flex-col gap-8 h-full'>
        <ModalAddPosition isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className='flex gap-4 justify-between'>
          <SearchInput placeholder='Search position'
            type='text'
            value={params.q}
            setValue={( value: string )=> setParams( {
              ...params,
              q : value
            } )}
          />

          <Button2 type='button'
            className='gap-2 flex'
            onClick={()=> setIsOpen( true )}
          >
            <FontAwesomeIcon icon={faPlus}/>
					Add Position
          </Button2>

        </div>
				
        {
          data?.data?.length && !isLoading ?
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
              {data?.data?.map( ( item: IApiPosition, i )=>(
                    
                <article key={i}
                  className='h-24 bg-dark p-4 border border-none rounded-lg flex flex-col gap-2'
                >
                  <h2 className='text-xl font-bold line-clamp-1 leading-none'>
                    {item.name}
                  </h2>
                  <p className='text-[0.8rem] line-clamp-2'>
                    {item.description}
                  </p>
                </article>

              ) )}
            </div>
            : isLoading ? 
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  mockLoop.map( ( item, i )=>(
                    <article key={i}
                      className='h-24 p-4 border border-none rounded-lg flex flex-col gap-2 animate-pulse bg-dark'
                    >
                      <div className='h-6 bg-dark-secondary max-w-[10rem]'>
		
                      </div>
                      <div className='h-4 bg-dark-secondary'/>
                      <div className='h-4 bg-dark-secondary max-w-[13rem]'/>
                    </article>
                  ) )
                }
              </div>
              : (
                <NoDataFound/>
              )
        }

        {/* Pagination */}
        {data && data?.data?.length && !isLoading ? (
          <StyledPagination 
            setCurrentPage={handlePageChange} 
            currentPage={state.paginator.page}
            totalPages={data?.totalPage as number}
            hasNextPage={data?.hasNextPage as boolean}
          />

        ) : ''
		
        }
      </div>
    </>
  )
}

export default Position
