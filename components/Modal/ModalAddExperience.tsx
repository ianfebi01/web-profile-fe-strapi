"use client"
import React, { FunctionComponent, useEffect, useRef } from 'react'
import Modal from './Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '../Inputs/FormikField'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {  AxiosResponse } from 'axios'
import { IApi, IApiPagination } from '@/types/api'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import { IApiExperience } from '@/types/api/experience'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
}
const ModalAddExperience: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {

  const axiosAuth = useAxiosAuth()

  const searchParams = useSearchParams()
  const page = parseInt( searchParams.get( 'page' ) || '1' )
  const q = searchParams.get( 'q' ) || ''
	
  // React Query
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['experience', q, page],
    mutationFn  : async( value: Omit<IApiExperience, 'id'> )=> {
      const data: AxiosResponse<IApi<IApiExperience> & IApiPagination> = await axiosAuth.post(
        `/v1/experience`, 
        value
      )
			
      return data.data.data
    },
    onSuccess : (  )=> {
      queryClient.invalidateQueries( { queryKey : ['experience', q, page] } )
      toast.success( 'Successfully add new experience!' )
      setIsOpen( false )
    },
    onError : () => {
      toast.error( 'Cant add experience, please try again latter.' )
    }
  } )

  // Dynamic fields
  const fields: IDynamicForm[] = [
    {
      name        : 'title',
      type        : 'text',
      placeholder : 'eg. Frontend Developer',
      fieldType   : 'text',
      label       : 'Title',
      validation  : {
        charLength : {
          min : 3,
          max : 30
        },
        required : true
      }
    },
    {
      name        : 'companyName',
      type        : 'text',
      placeholder : 'eg. Goto',
      fieldType   : 'text',
      label       : 'Company Name',
      validation  : {
        charLength : {
          min : 3,
          max : 30
        },
        required : true
      }
    },
    {
      name        : 'location',
      type        : 'text',
      placeholder : 'eg. Indonesia',
      fieldType   : 'text',
      label       : 'Location',
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
      placeholder : 'eg. Create user interface for user',
      fieldType   : 'text',
      label       : 'Description',
      validation  : {
        charLength : {
          min : 3,
          max : 1000
        },
        required : true
      }
    },
    {
      name        : 'startDate',
      type        : 'date',
      placeholder : 'Select start date',
      fieldType   : 'month-year',
      label       : 'Start Date',
      validation  : {
        required : true
      }
    },
    {
      name        : 'endDate',
      type        : 'date',
      placeholder : 'Select end date',
      fieldType   : 'month-year',
      label       : 'End Date',
      validation  : {
        required : true
      }
    },
  ]

  // Form
  const schema = generateValidationSchema( fields )

  // Formik
  const date = new Date()
  const formik = useFormik( {
    initialValues : {
      title       : '',
      description : '',
      companyName : '',
      location    : '',
      startDate   : date,
      endDate     : date
    },
    validationSchema : schema,
    onSubmit         : ( value ) => {
      mutate( { ...value } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( ()=>{
    formik.handleReset( {
      title       : '',
      description : '',
      companyName : '',
      location    : '',
      startDate   : date,
      endDate     : date
    } )
  }, [isOpen] )
	
  return (
    <Modal isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={()=>submitRef.current?.click()}
      onCancel={()=> setIsOpen( false )}
      title='Add new experience'
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

export default ModalAddExperience
