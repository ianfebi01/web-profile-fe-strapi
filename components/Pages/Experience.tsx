'use client'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination } from '@/types/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import SearchInput from '../Inputs/SearchInput'
import StyledPagination from '../Layouts/StyledPagination'
import NoDataFound from '../NoDataFound'
import Button2 from '../Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IApiSkill } from '@/types/api/skill'
import toast from 'react-hot-toast'
import DeleteButton from '../Buttons/DeleteButton'
import Image from 'next/image'
import EditButton from '../Buttons/EditButton'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ModalAddExperience from '../Modal/ModalAddExperience'
import ModalEditExperience from '../Modal/ModalEditExperience'

const Experience = () => {
  const axiosAuth = useAxiosAuth()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page =parseInt( searchParams.get( 'page' ) || '1' )
  const limit = parseInt( searchParams.get( 'limit' ) || '12' )
  const q = searchParams.get( 'q' ) || ''

  const { data, isLoading } = useQuery<IApi<IApiSkill[]> & IApiPagination>( {
    queryKey : ['experience', q, page],
    queryFn  : async () => {
      const data: AxiosResponse<IApi<IApiSkill[]> & IApiPagination> =
        await axiosAuth.get( '/v1/experience', {
        	params : {
        		page  : page || 1,
        		limit : limit || 12,
        		q     : q || '',
        	}
        } )

      return data?.data
    },
  } )

  const handlePageChange = ( page: number )=>{
    const selectedPage = page + 1

    setSearchParams( 'page', selectedPage.toString() )
  }

  const setSearchParams = ( key: string, val: string )=> {
    const current = new URLSearchParams( Array.from( searchParams.entries() ) )
    // update as necessary
    const value = val.trim();

    if ( !value ) {
      current.delete( key );
    } else {
      current.set( key, val );
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push( `${pathname}${query}` );
  }

  const mockLoop = new Array( limit ).fill( 0 )

  // Modal
  const [isOpen, setIsOpen] = useState<boolean>( false )

  // @ NOTE handle delete
  const [id, setId] = useState<number | null>( null )
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['experience', 'delete'],
    mutationFn  : async ( id: number ) => {
      const data: AxiosResponse<IApi<IApiSkill> & IApiPagination> =
        await axiosAuth.delete( `/v1/skill/${id}` )

      return data.data.data
    },
    onSuccess : () => {
      queryClient.invalidateQueries( {
        queryKey : ['experience', q, page],
      } )
      toast.success( 'Successfully delete skill!' )
      setIsOpen( false )
    },
    onError : ( error: AxiosError<IApi> ) => {
      toast.error( error.response?.data?.message as string )
    },
  } )

  const handleDelete = ( id: number ) => {
    setId( id )
    mutate( id )
  }

  // @ NOTE handleEdit
  const [detailDataId, setDetailDataId] = useState<number>(  );
  const [isEditOpen, setIsEditOpen] = useState<boolean>( false );
  const [detailData, setDetailData] = useState<IApiSkill>(  );

  const { mutate: detailMutate, isPending: isDetailPending } = useMutation( {
    mutationKey : ['skill', 'detail', detailDataId],
    mutationFn  : async ( id: number ) => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.get( `/v1/skill/${id}` )
		
      return data.data.data
    },
    onSuccess : ( data ) => {
      setDetailData( data )
      setIsEditOpen( true )
    },
    onError : ( error: AxiosError<IApi> ) => {
      toast.error( error.response?.data?.message as string )
    },
  } )

  const handleEdit = ( id: number ) => {
    setDetailDataId( id )
    detailMutate( id )
  }

  return (
    <>
      <div className="flex flex-col gap-8 h-full">
        <ModalAddExperience isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <ModalEditExperience isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          detail={detailData as IApiSkill}
        />
        <div className="flex gap-4 justify-between">
          <SearchInput
            placeholder="Search position"
            type="text"
            value={q as string || ''}
            setValue={( value: string )=> setSearchParams( 'q', value )}
          />

          <Button2
            type="button"
            className="gap-2 flex"
            onClick={() => setIsOpen( true )}
          >
            <FontAwesomeIcon icon={faPlus} />
            			Add Experience
          </Button2>
        </div>

        {data?.data?.length && !isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data?.data?.map( ( item: IApiSkill, i ) => (
              <article
                key={i}
                className=" bg-dark p-4 border border-none rounded-lg flex gap-4 items-start transition-default"
              >

                <Image src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className='flex-shrink-0'
                />

                <div className='flex flex-col gap-2 grow-[1]'>
                  <div className="flex gap-4 justify-between">
                    <p className="text-xl font-bold line-clamp-1 leading-none text-ellipsis">
                      {item.name}
                    </p>
                    <div className='flex items-center justify-center gap-4'>
                      <EditButton
                        loading={isDetailPending && detailDataId === item.id}
                        disabled={isDetailPending}
                        onClick={() => handleEdit( item.id as number )}
                      />
                      <DeleteButton
                        loading={isPending && id === item.id}
                        disabled={isPending}
                        onClick={() => handleDelete( item.id as number )}
                      />
                    </div>
                  </div>
                  <p className="text-[0.8rem] line-clamp-4 leading-normal">{item.description}</p>
                </div>
              </article>
            ) )}
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLoop.map( ( item, i ) => (
              <article
                key={i}
                className="h-28 p-4 border border-none rounded-lg flex flex-col gap-2 animate-pulse bg-dark-secondary"
              >
                <div className="h-6 bg-dark-secondary max-w-[10rem]"></div>
                <div className="h-4 bg-dark-secondary" />
                <div className="h-4 bg-dark-secondary max-w-[13rem]" />
              </article>
            ) )}
          </div>
        ) : (
          <NoDataFound />
        )}

        {/* Pagination */}
        {data && data?.data?.length && !isLoading ? (
          <StyledPagination
            setCurrentPage={handlePageChange}
            currentPage={data.page || 1}
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

export default Experience
