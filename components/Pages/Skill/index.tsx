'use client'
import { IPayloadPagination } from '@/types/api'
import { useState } from 'react';
import SearchInput from '@/components/Inputs/SearchInput'
import StyledPagination from '@/components/Layouts/StyledPagination'
import NoDataFound from '@/components/NoDataFound'
import Button2 from '@/components/Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalAddSkill from '@/components/Modal/ModalAddSkill'
import { IApiSkill } from '@/types/api/skill'
import toast from 'react-hot-toast'
import DeleteButton from '@/components/Buttons/DeleteButton'
import Image from 'next/image'
import EditButton from '@/components/Buttons/EditButton'
import ModalEditSkill from '@/components/Modal/ModalEditSkill'
import { useDelete, useGetData } from '@/lib/hooks/api/skill';

const Skill = () => {
  /**
   *  Params
   */
  const [params, setParams] = useState<IPayloadPagination>( {
    page  : 1,
    limit : 12,
    q     : '',
  } )

  /**
   *  Get data
   */
  const { data, isLoading } = useGetData( params )

  const handlePageChange = ( page: number ) => {
    setParams( {
      ...params,
      page : page + 1,
    } )
  }

  /**
   *  Mock array for looping skeleton loading
   */
  const mockLoop = new Array( params.limit ).fill( 0 )

  /**
   *  Modal
   */
  const [isOpen, setIsOpen] = useState<boolean>( false )

  /**
   *  Delete
   */
  const [id, setId] = useState<number | null>( null )

  const onDeleteSuccess = () => {
    toast.success( 'Successfully delete skill!' )
    setIsOpen( false )
  }
  const { mutate, isPending } = useDelete( { onSuccess : onDeleteSuccess } )

  const handleDelete = ( id: number ) => {
    setId( id )
    mutate( id )
  }

  /**
   *  Edit
   */
  const [detailDataId, setDetailDataId] = useState<number>( 0 )
  const [isEditOpen, setIsEditOpen] = useState<boolean>( false )

  const handleEdit = ( id: number ) => {
    setDetailDataId( id )
    setIsEditOpen( true )
  }

  return (
    <>
      <div className="flex flex-col gap-8 h-full">
        <ModalAddSkill isOpen={isOpen}
          setIsOpen={setIsOpen}
          params={params}
        />
        <ModalEditSkill
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          params={params}
          detailDataId={detailDataId}
        />
        <div className="flex gap-4 justify-between">
          <SearchInput
            placeholder="Search position"
            type="text"
            value={params.q}
            setValue={( value: string ) =>
              setParams( {
                ...params,
                q : value,
              } )
            }
          />

          <Button2
            type="button"
            className="gap-2 flex"
            onClick={() => setIsOpen( true )}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Skill
          </Button2>
        </div>

        {data?.data?.length && !isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data?.data?.map( ( item: IApiSkill, i ) => (
              <article
                key={i}
                className=" bg-dark p-4 border border-none rounded-lg flex gap-4 items-start transition-default"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="flex-shrink-0"
                />

                <div className="flex flex-col gap-2 h-full grow">
                  <div className="flex gap-4 justify-between">
                    <p className="text-xl font-bold line-clamp-1 leading-none text-ellipsis">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-[0.75rem] line-clamp-4 leading-normal">
                    {item.description}
                  </p>
                  <div className="grow"></div>
                  <div className="flex items-center justify-end gap-4">
                    <EditButton
                      onClick={() => handleEdit( item.id as number )}
                    />
                    <DeleteButton
                      loading={isPending && id === item.id}
                      disabled={isPending}
                      onClick={() => handleDelete( item.id as number )}
                    />
                  </div>
                </div>
              </article>
            ) )}
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLoop.map( ( item, i ) => (
              <article
                key={i}
                className="h-28 p-4 border border-none rounded-lg flex flex-col gap-2 animate-pulse bg-dark"
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

export default Skill
