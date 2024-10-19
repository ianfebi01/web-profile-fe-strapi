"use client"
import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import Modal from './Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '../Inputs/FormikField'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PositionContext } from '@/context/PositionContext'
import { AxiosResponse } from 'axios'
import { IApi, IApiPagination } from '@/types/api'
import { IApiPosition } from '@/types/api/position'
import toast from 'react-hot-toast'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
}
const ModalAddPosition: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {

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
  }, [isOpen] )
	
  return (
    <Modal isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={()=>submitRef.current?.click()}
      onCancel={()=> setIsOpen( false )}
      title='Add new position'
      loading={isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className='flex flex-col gap-2'
        >
          {
            fields.map( ( item: IDynamicForm )=>(
              <FormikField     
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                key={item.name}
                fieldType={item.fieldType}
                required={item.validation?.required}
              />
            ) )
          }
          <button ref={submitRef}
            type='submit'
            className='hidden'
          ></button>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default ModalAddPosition
