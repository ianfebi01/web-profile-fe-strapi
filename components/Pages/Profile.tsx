"use client"
import { useSession } from 'next-auth/react'
import React, { FormEvent } from 'react'
import FormikField from '../Inputs/FormikField'
import { Form, FormikProvider, useFormik } from 'formik'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation } from '@tanstack/react-query'
import Button2 from '../Buttons/Button2'
import { IDynamicForm } from '@/types/form'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import toast from 'react-hot-toast'
import { IApiPayload } from '@/types/api/profile'
import { AxiosError } from 'axios'
import { IApi } from '@/types/api'

const Profile = () => {

  const { data:session, update } = useSession()
  const axiosAuth = useAxiosAuth()

  const { mutate, isPending } = useMutation( {

    mutationFn : async( value: IApiPayload )=> {
      const data = await axiosAuth.put(
        `/v1/profile`, 
        value,
        {
          headers : {
            "Content-Type" : "multipart/form-data"
          }
        }
      )
      await update( {
        ...session,
        user : {
          ...session?.user,
          ...data?.data.data
        }
      } )
			
      return data
    },
    onSuccess : () => {
      toast.success( 'Successfully update profile data!' )
    },
    onError : ( error: AxiosError<IApi> ) => {
      toast.error( error.response?.data?.message as string )
    }
  } )

  const field: IDynamicForm[] = [
    {
      name        : 'name',
      type        : 'text',
      placeholder : 'eg. Ian Febi S',
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
      name        : 'email',
      type        : 'email',
      placeholder : "eg. iangtg@gmail.com",
      fieldType   : 'text',
      label       : 'Email',
      validation  : {
        charLength : {
          min : 3,
          max : 30
        },
        required : true
      }
    },
    {
      name        : 'textBg',
      type        : 'text',
      placeholder : "eg. IAN FEBI",
      fieldType   : 'text',
      label       : 'Text on BG',
      validation  : {
        charLength : {
          min : 3,
          max : 30
        },
        required : false
      }
    },
    {
      name        : 'quote',
      type        : 'text',
      placeholder : "eg. Hari yang cerah",
      fieldType   : 'text',
      label       : 'Quote',
      validation  : {
        charLength : {
          min : 3,
          max : 300
        },
        required : false
      }
    },
    {
      name        : 'openToWork',
      type        : 'text',
      placeholder : "Open to work",
      fieldType   : 'switch',
      label       : 'Open to work',
      validation  : {
        required : false
      }
    },
    {
      name        : 'personImage',
      type        : 'text',
      placeholder : "Select person image",
      fieldType   : 'image',
      label       : 'Person Image',
    },
  ]

  const schema = generateValidationSchema( field )

  const initial: IApiPayload = {
    name        : session?.user.name || '',
    email       : session?.user.email || '',
    quote       : session?.user.quote || '',
    personImage : session?.user.personImage || '',
    textBg      : session?.user.textBg || '',
    openToWork  : session?.user.openToWork || false
  }
  // Formik
  const formik = useFormik( {
    initialValues    : initial,
    validationSchema : schema,
    onSubmit         : ( value ) => {
      mutate( { ...value } )
    },
  } )

  const onSubmit = ( e: FormEvent<HTMLFormElement> )=>{
    e.preventDefault();

    formik.handleSubmit( e )
  }
	
  return (
    <section className='overflow-hidden'>
      <FormikProvider value={formik}>

        <Form onSubmit={onSubmit}
          className='flex flex-col gap-2'
        >

          {
            field.map( ( item: IDynamicForm )=>(
              <FormikField     
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                key={item.name}
                fieldType={item.fieldType}
                defaultImageUrl={session?.user.personImage}
                required={item.validation?.required}
                disabled={isPending}
              />
            ) )
          }
          <Button2 disabled={!formik.isValid || isPending}
            loading={isPending}
            type="submit"
          >Submit</Button2>
        </Form>
      </FormikProvider>
    </section>
  )
}

export default Profile
