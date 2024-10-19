'use client'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { IApiSkill } from '@/types/api/skill'
import { IDynamicForm, IOptions } from '@/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import FormikField from '../Inputs/FormikField'
import Button2 from '../Buttons/Button2'
import { useSession } from 'next-auth/react'
import { Options } from 'react-select'
import Modal from '../Modal/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import UploadMultipleImage from '../Inputs/UploadMultipleImage'

const AddPortofolio = () => {
  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // @ NOTE ROuter
  const back = () => {
    const url = new URLSearchParams( searchParams.toString() )

    router.push( '/admin/portofolio?' + url.toString() )
  }

  // React Query
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation( {
    mutationKey : ['portofolio', 'add'],
    mutationFn  : async ( value: Omit<IApiPortofolio, 'id'> ) => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.post(
        `/v1/portofolio`,
        value
      )

      return data.data.data
    },
    onSuccess : () => {
      queryClient.invalidateQueries( { queryKey : ['portofolio', '', 1] } )
      setSubmitWarningAlert( false )
      formik.resetForm()
      back()
      toast.success( 'Successfully add new portofolio!' )
    },
    onError : () => {
      toast.error( 'Cant add portofolio, please try again latter.' )
    },
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
          max : 30,
        },
        required : true,
      },
    },
    {
      name        : 'description',
      type        : 'text-editor',
      placeholder : 'eg. Create user interface based on figma',
      fieldType   : 'text-editor',
      label       : 'Description',
      validation  : {
        charLength : {
          min : 3,
        },
        required : true,
      },
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
          maxSize : 1000,
        },
      },
    },
    {
      name        : 'skills',
      type        : 'select',
      placeholder : 'Select skills',
      fieldType   : 'select',
      label       : 'Skills',
      select      : {
        isMulti : true,
      },
      validation : {
        required : true,
      },
    },
    {
      name        : 'year',
      type        : 'year',
      placeholder : 'Select year',
      fieldType   : 'year',
      label       : 'Year',
      validation  : {
        required : true,
      },
    },
  ]

  // @ NOTE Form
  const schema = generateValidationSchema( fields )

  // @ NOTE Formik
  const date = new Date()

  // submited form value
  const [submitedValue, setSubmitedValue] =
    useState<Omit<IApiPortofolio, 'id'>>()

  interface IInitialValues
    extends Omit<IApiPortofolio, 'id' | 'skills' | 'userId'> {
    skills: Options<IOptions>
  }
  const initialValues: IInitialValues = {
    name        : '',
    description : '',
    image       : '',
    year        : date,
    skills      : [],
  }
  const formik = useFormik( {
    initialValues    : initialValues,
    validationSchema : schema,
    onSubmit         : ( value ) => {
      setSubmitedValue( {
        ...value,
        userId : session?.user.id,
        skills : value.skills?.map( ( item ) => item.value ),
      } as Omit<IApiPortofolio, 'id' | 'skills'> )

      setSubmitWarningAlert( true )
    },
  } )

  // @ NOTE get skill list

  const { data: skillListData, isLoading: isSkillListLoading } = useQuery<
    IApi<Pick<IApiSkill, 'name' | 'id'>[]>
  >( {
    queryKey : ['skill-list'],
    queryFn  : async () => {
      const data: AxiosResponse<IApi<Pick<IApiSkill, 'name' | 'id'>[]>> =
        await axiosAuth.get( '/v1/skill-list' )

      return data?.data
    },
    retry : false,
  } )

  // @ NOTE loading
  const getLoading = ( fieldType: string | undefined ) => {
    switch ( fieldType ) {
    case 'select':
      return isSkillListLoading
    default:
      return false
    }
  }
  // @ NOTE options
  const getOptions = ( name: string | undefined ) => {
    switch ( name ) {
    case 'skills':
      return skillListData?.data?.map(
        ( item: Pick<IApiSkill, 'id' | 'name'> ) => ( {
          label : item.name,
          value : item.id,
        } )
      )
    default:
      return []
    }
  }

  // @ NOTE warning alert
  const [submitWarningAlert, setSubmitWarningAlert] = useState<boolean>( false )
  const onSubmitOk = () => {
    mutate( {
      ...submitedValue,
    } as Omit<IApiPortofolio, 'id'> )
  }

  return (
    <section className="text-left">
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          <FormikField
            label={'Name'}
            name={'name'}
            placeholder={'eg. Frontend Developer'}
            fieldType={'text'}
            required={true}
          />
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col gap-2 max-w-2xl w-full">
              <FormikField
                key="description"
                label="Description"
                name="description"
                placeholder="eg. Create user interface based on figma"
                fieldType="text-editor"
                required={true}
                options={getOptions( 'description' )}
                loading={getLoading( 'text-editor' )}
              />

              <FormikField
                key="image"
                label="Icon"
                name="image"
                placeholder="Upload image"
                fieldType="image"
                required={true}
                options={getOptions( 'image' )}
                loading={getLoading( 'image' )}
              />

              <FormikField
                key="skills"
                label="Skills"
                name="skills"
                placeholder="Select skills"
                fieldType="select"
                required={true}
                select={{ isMulti : true }}
                options={getOptions( 'skills' )}
                loading={getLoading( 'select' )}
              />

              <FormikField
                key="year"
                label="Year"
                name="year"
                placeholder="Select year"
                fieldType="year"
                required={true}
                options={getOptions( 'year' )}
                loading={getLoading( 'year' )}
              />
            </div>
            <div className='w-full'>
              <UploadMultipleImage />
            </div>
          </div>
          <Button2 disabled={isPending}
            type="submit"
          >
            Submit
          </Button2>
        </Form>
      </FormikProvider>

      <Modal
        isOpen={submitWarningAlert}
        setIsOpen={setSubmitWarningAlert}
        onConfirm={() => onSubmitOk()}
        onCancel={() => setSubmitWarningAlert( false )}
        variant="warning"
        title="Are you sure?"
        desciption="Are you sure want to add new portofolio?"
        confirmText="Confirm"
        loading={isPending}
      ></Modal>
    </section>
  )
}

export default AddPortofolio
