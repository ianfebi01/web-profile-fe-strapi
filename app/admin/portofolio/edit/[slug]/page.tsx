'use client';;
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { IApiSkill } from '@/types/api/skill'
import { IDynamicForm, IOptions } from '@/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Form, FormikProvider, useFormik } from 'formik'
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast'
import FormikField from '@/components/Inputs/FormikField'
import Button2 from '@/components/Buttons/Button2'
import { useSession } from 'next-auth/react'
import { Options } from 'react-select'
import Modal from '@/components/Modal/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Layouts/Header'
import { Url } from 'next/dist/shared/lib/router/router'

export default function EditPortofolioPage( {
  params,
}: {
  params: { slug: string }
} ) {
  const id = params.slug

  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt( searchParams.get( 'page' ) || '1' )
  const q = searchParams.get( 'q' ) || ''
  const limit = searchParams.get( 'limit' ) || ''

  const backLink: Url = useMemo(
    () => ( {
      pathname : '/admin/portofolio',
      query    : {
        q,
        page,
        limit,
      },
    } ),
    [q, page, limit]
  )

  // @ NOTE ROuter
  const back = () => {
    const url = new URLSearchParams( searchParams.toString() )

    router.push( '/admin/portofolio?' + url.toString() )
  }

  // React Query
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery<IApi<IApiPortofolio>>( {
    queryKey : ['portofolio', id],
    queryFn  : async () => {
      const data: AxiosResponse<IApi<IApiPortofolio>> = await axiosAuth.get(
        '/v1/portofolio/' + id
      )
      const res = data.data.data

      Object.keys( res as IApiPortofolio ).map( ( key ) => {
        if ( res ) {
          if ( key === 'skills' ) {
            const value = ( res[key as keyof IApiPortofolio] as IApiSkill[] ).map(
              ( item ) => ( {
                label : item.name,
                value : item.id,
              } )
            )
            formik.setFieldValue( key, value )
          } else if ( key === 'year' ) {
            const date = new Date( res[key as keyof IApiPortofolio] as Date )
            formik.setFieldValue( key, date )
          } else formik.setFieldValue( key, res[key as keyof IApiPortofolio] )
        }
      } )

      return data?.data
    },
  } )
  const { mutate, isPending } = useMutation( {
    mutationKey : ['portofolio', 'edit', id],
    mutationFn  : async ( value: Omit<IApiPortofolio, 'id'> ) => {
      const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.put(
        `/v1/portofolio/${id}`,
        value
      )

      return data.data.data
    },
    onSuccess : () => {
      queryClient.invalidateQueries( { queryKey : ['portofolio', page, q] } )
      queryClient.invalidateQueries( { queryKey : ['portofolio'] } )
      setSubmitWarningAlert( false )
      formik.resetForm()
      back()
      toast.success( 'Successfully edit portofolio!' )
    },
    onError : () => {
      toast.error( 'Cant edit portofolio, please try again latter.' )
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
      type        : 'text',
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
    name        : data?.data?.name || '',
    description : data?.data?.description || '',
    image       : data?.data?.image || '',
    year        : data?.data?.year ? new Date( data?.data?.year as Date ) : date,
    skills :
      data?.data?.skills?.map( ( item ) => ( {
        label : item.name,
        value : item.id,
      } ) ) || [],
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
  } )

  // @ NOTE loading
  const getLoading = ( fieldType: string | undefined ) => {
    switch ( fieldType ) {
    case 'select':
      return isSkillListLoading
    default:
      return isFetching
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
    <div className="flex flex-col gap-6 h-full">
      <Header text="Edit Portofolio"
        link={backLink}
      />
      <section className="">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2"
          >
            {fields.map( ( item: IDynamicForm ) => (
              <FormikField
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                key={item.name}
                fieldType={item.fieldType}
                required={item.validation?.required}
                select={item?.select}
                options={getOptions( item.name )}
                loading={getLoading( item.fieldType )}
              />
            ) )}
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
          desciption="Are you sure want to edit portofolio?"
          confirmText="Confirm"
          loading={isPending}
        ></Modal>
      </section>
    </div>
  )
}
