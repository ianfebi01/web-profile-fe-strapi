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
import { IApiSkill } from '@/types/api/skill'
import { useSearchParams } from 'next/navigation'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
	detail: IApiSkill
}
const ModalEditExperience: FunctionComponent<Props> = ( { isOpen, setIsOpen, detail } ) => {

  const axiosAuth = useAxiosAuth()

  const searchParams = useSearchParams()
  const page =parseInt( searchParams.get( 'page' ) || '1' )
  const q = searchParams.get( 'q' ) || ''
	
  // React Query
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['experience', q, page],
    mutationFn  : async( value: Omit<IApiSkill, 'id'> )=> {
      const data: AxiosResponse<IApi<IApiSkill> & IApiPagination> = await axiosAuth.put(
        `/v1/experience/${detail.id}`, 
        value
      )

      return data.data.data
    },
    onSuccess : (  )=> {
      queryClient.invalidateQueries( { queryKey : ['experience', q, page] } )
      toast.success( 'Successfully edit experience!' )
      setIsOpen( false )
    },
    onError : ( ) => {
      toast.error( 'Cant edit experience, please try again latter.' )
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
    {
      name        : 'image',
      type        : 'image',
      placeholder : 'Upload image',
      fieldType   : 'image',
      label       : 'Icon',
      validation  : {
        required : true,
        image    : {
          maxSize : 1000
        }
      }
    },
  ]

  // Form
  const schema = generateValidationSchema( fields )

  // Formik
  const formik = useFormik( {
    initialValues : {
      name        : '',
      description : '',
      image       : ''
    },
    validationSchema : schema,
    onSubmit         : ( value ) => {
      mutate( { ...value } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( ()=>{
    if( isOpen ){
      formik.setFieldValue( 'name', detail?.name )
      formik.setFieldValue( 'description', detail?.description )
      formik.setFieldValue( 'image', detail?.image )
    }
    if( isOpen === false )
      formik.handleReset( {
        name        : '',
        description : '',
        image       : ''
      } )
  }, [isOpen] )
	
  return (
    <Modal isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={()=>submitRef.current?.click()}
      onCancel={()=> setIsOpen( false )}
      title='Edit experience'
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

export default ModalEditExperience
