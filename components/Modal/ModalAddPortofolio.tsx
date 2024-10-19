"use client";
import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import Modal from './Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { useFormik } from 'formik';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PositionContext } from '@/context/PositionContext'
import { AxiosResponse } from 'axios'
import { IApi, IApiPagination } from '@/types/api'
import { IApiPosition } from '@/types/api/position'
import toast from 'react-hot-toast'
import AddPortofolio from '../Pages/AddPortofolio'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
}
const ModalAddPortofolio: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {

  // Context
  const { state } = useContext( PositionContext );

  const axiosAuth = useAxiosAuth()

  // React Query
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['position'],
    mutationFn  : async( value: Omit<IApiPosition, 'id'> )=> {
      const data: AxiosResponse<IApi<IApiPosition> & IApiPagination> = await axiosAuth.post(
        `/v1/position`, 
        value
      )
			
      return data.data.data
    },
    onSuccess : ( data )=> {
			
      queryClient.setQueryData( ['position', state.paginator.page, state.paginator.q], ( oldData: IApi<IApiPosition[]> & IApiPagination )=> {
        const tmp = oldData.data
        if( tmp && tmp?.length < state.paginator.limit ){
          tmp.push( data  as IApiPosition )
        }
				
        return {
          ...oldData,
          data : tmp
        }
      } )
      toast.success( 'Successfully add new position!' )
      setIsOpen( false )
    }
  } )

  // Dynamic fields
  const fields: IDynamicForm[] = [
    {
      name        : 'name',
      type        : 'text',
      placeholder : 'eg. Frontend Developer',
      fieldType   : 'text',
      label       : 'Name',
      validation  : {
        charLength : {
          min : 3,
          max : 30
        },
        required : true
      }
    },
    {
      name        : 'description',
      type        : 'text',
      placeholder : 'eg. Create user interface based on figma',
      fieldType   : 'text',
      label       : 'Description',
      validation  : {
        charLength : {
          min : 3,
          max : 300
        },
        required : true
      }
    },
  ]

  // Form
  const schema = generateValidationSchema( fields )

  // Formik
  const formik = useFormik( {
    initialValues : {
      name        : '',
      description : ''
    },
    validationSchema : schema,
    onSubmit         : ( values )=>{
      mutate( values )

    }
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( ()=>{
    formik.handleReset( {
      name        : '',
      description : ''
    } )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )
	
  return (
    <Modal isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={()=>submitRef.current?.click()}
      onCancel={()=> setIsOpen( false )}
      title='Add new portofolio'
      loading={isPending}
      variant='fullscreen'
    >
      <AddPortofolio/>
    </Modal>
  )
}

export default ModalAddPortofolio
