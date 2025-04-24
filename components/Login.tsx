'use client';
import { generateValidationSchema } from '@/lib/validation/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react';
import FormikField from './Inputs/FormikField'
import { useTranslations } from 'next-intl';

interface Login {
  email: string
  password: string
}

const Login = () => {
  const t = useTranslations()
  const tp = useTranslations( 'placeholder' )

  // Dynamic fields
  const fields: IDynamicForm[] = [
    {
      name        : 'email',
      type        : 'email',
      placeholder : tp( 'email' ),
      label       : t( 'email' ),
      validation  : {
        required : true,
      },
    },
    {
      name        : 'password',
      type        : 'password',
      placeholder : tp( 'password' ),
      label       : t( 'password' ),
      validation  : {
        required   : true,
        charLength : {
          min : 8,
        },
      },
    },
  ]

  // @ NOTE Form
  const schema = generateValidationSchema( fields )

  // @ NOTE Formik

  // submited form value
  const [submitedValue, setSubmitedValue] = useState<Login>( {
    email    : '',
    password : '',
  } )

  const initialValues: Login = {
    email    : '',
    password : '',
  }

  const formik = useFormik( {
    initialValues    : initialValues,
    validationSchema : schema,
    onSubmit         : ( value ) => {

      onSubmitOk( value )
    },
  } )

  const onSubmitOk = ( value: Login ) => {
    // @ TODO submit here
    console.log( value )
  }

  return (
    <div className="w-full">
      <FormikProvider value={formik}>
        <Form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 w-full"
        >
          {fields.map( ( item: IDynamicForm ) => (
            <FormikField
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              key={item.name}
              type={item.type}
              required={item.validation?.required}
              select={item?.select}
            />
          ) )}
          <button className="button button-primary w-fit"
            type="submit"
          >
            {t( 'login' )}
          </button>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Login
