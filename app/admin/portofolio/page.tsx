'use client'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useMemo, useState } from 'react'
import SearchInput from '@/components/Inputs/SearchInput'
import StyledPagination from '@/components/Layouts/StyledPagination'
import Button2 from '@/components/Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { IApiPortofolio } from '@/types/api/portofolio'
import { usePathname, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Modal from '@/components/Modal/Modal'
import DataTable, { IColumn } from '@/components/DataTable'
import { format } from 'date-fns'
import { useRouter } from 'nextjs-toploader/app'
import Header from '@/components/Layouts/Header'
import { useGetDatas } from '@/lib/hooks/api/portofolio'
import ModalAddPortofolio from '@/components/Modal/ModalAddPortofolio'

export default function PortofolioPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   *  Query
   */
  const page = parseInt( searchParams.get( 'page' ) || '1' )
  const limit = parseInt( searchParams.get( 'limit' ) || '12' )
  const q = searchParams.get( 'q' ) || ''

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
    const query = search ? `?${search}` : ''

    router.push( `${pathname}${query}` )
  }

  /**
   *  Get datas
   */
  const axiosAuth = useAxiosAuth()

  const { data, isFetching, refetch } = useGetDatas( {
    page,
    limit,
    q,
  } )

  const handlePageChange = ( page: number ) => {
    const selectedPage = page + 1

    setSearchParams( 'page', selectedPage.toString() )
  }

  /**
   *  Router
   */

  const goToEdit = ( id: number ) => {
    const queryParams = new URLSearchParams( searchParams.toString() )

    router.push(
      '/admin/portofolio/edit/' + id.toString() + '?' + queryParams.toString()
    )
  }

  /**
   *  Handle Delete
   */
  const [deleteWarningAlert, setDeleteWarningAlert] = useState<boolean>( false )
  const [id, setId] = useState<number | null>( null )
  // const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['skill', 'delete'],
    mutationFn  : async ( id: number ) => {
      const data: AxiosResponse<IApi<IApiPortofolio> & IApiPagination> =
        await axiosAuth.delete( `/v1/portofolio/${id}` )

      return data.data.data
    },
    onSuccess : () => {
      refetch()
      toast.success( 'Successfully delete portofolio!' )
      setDeleteWarningAlert( false )
    },
    onError : ( error: AxiosError<IApi> ) => {
      toast.error( error.response?.data?.message as string )
    },
  } )

  const handleDelete = ( id: number ) => {
    setId( id )
    setDeleteWarningAlert( true )
  }

  const onDeleteOk = () => {
    if ( id ) mutate( id )
  }

  /**
   *  Table
   */

  const COLUMNS: IColumn<IApiPortofolio>[] = useMemo(
    () => [
      {
        label      : 'ID',
        renderCell : ( item: IApiPortofolio ) => item.id,
        size       : '40px',
      },
      { label : 'Name', renderCell : ( item: IApiPortofolio ) => item.name },
      {
        label      : 'Year',
        renderCell : ( item: IApiPortofolio ) =>
          String( format( new Date( item.year ), 'yyyy' ) ),
      },
      {
        label      : 'Skills',
        renderCell : ( item: IApiPortofolio ) =>
          item.skills?.map( ( skill ) => skill.name ),
      },
      {
        label      : 'Action',
        size       : '96px',
        renderCell : ( item: IApiPortofolio ) => (
          <div className="flex items-center gap-2">
            <Button2
              variant="icon"
              disabled={isFetching}
              onClick={() => goToEdit( item.id )}
            >
              <FontAwesomeIcon icon={faPen}
                size="sm"
              />
            </Button2>
            <Button2
              variant="icon"
              disabled={isFetching}
              onClick={() => handleDelete( item.id )}
            >
              <FontAwesomeIcon icon={faTrash}
                size="sm"
              />
            </Button2>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFetching]
  )

  /**
   *  Add Portofolio
   */
  const [isOpen, setIsOpen] = useState<boolean>( false )

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
        <Header text="Portofolio" />
        <>
          <div className="flex flex-col gap-8 h-full">
            <div className="flex gap-4 justify-between">
              <SearchInput
                placeholder="Search portofolio"
                type="text"
                value={( q as string ) || ''}
                setValue={( value: string ) => setSearchParams( 'q', value )}
              />

              <Button2
                type="button"
                className="gap-2 flex"
                onClick={() => setIsOpen( true )}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Portofolio
              </Button2>
            </div>
            <DataTable
              columns={COLUMNS}
              datas={data?.data}
              loading={isFetching}
            />

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
          <Modal
            isOpen={deleteWarningAlert}
            setIsOpen={setDeleteWarningAlert}
            onConfirm={() => onDeleteOk()}
            onCancel={() => setDeleteWarningAlert( false )}
            variant="warning"
            title="Are you sure?"
            desciption="Are you sure want to delete portofolio?"
            confirmText="Confirm"
            loading={isPending}
          ></Modal>
        </>
      </div>
      <ModalAddPortofolio isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}
