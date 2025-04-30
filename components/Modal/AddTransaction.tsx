'use client'
import { generateValidationSchema } from '@/lib/validation/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useTranslations } from 'next-intl'
import { useLogin } from '@/lib/hooks/api/auth'
import Button2 from '@/components/Buttons/Button2'
import Modal from './Modal'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IBodyTransaction } from '@/types/api/transaction'

const AddTransaction = () => {
  const t = useTranslations()
  const { login, loading } = useLogin()

  const [isOpen, setIsOpen] = useState<boolean>( false )

  // Dynamic fields
  const fields: IDynamicForm[] = [
    {
      name        : 'date',
      type        : 'date',
      placeholder : 'Select date',
      label       : 'Date',
      validation  : {
        required : true,
      },
    },
    {
      name        : 'amount',
      type        : 'currency-id',
      placeholder : 'eg. 10000',
      label       : 'Total',
    },
    {
      name        : 'mm_category',
      type        : 'select',
      placeholder : 'Select category',
      label       : 'Category',
    },
    {
      name        : 'description',
      type        : 'text',
      placeholder : 'eg. Cafe',
      label       : 'Description',
    },
  ]

  // @ NOTE Form
  const schema = generateValidationSchema( fields )

  // @ NOTE Formik
  const initialValues: IBodyTransaction = {
    amount      : 0,
    date        : '',
    mm_category : null,
    type        : 'expense',
    description : '',
  }

  const formik = useFormik( {
    initialValues    : initialValues,
    validationSchema : schema,
    onSubmit         : ( value ) => {
      onSubmitOk( value )
    },
  } )

  const onSubmitOk = async ( value: IBodyTransaction ) => {
    await login( value )
  }

  return (
    <div className="w-fit">
      <Button2
        type="button"
        variant='secondary'
        className="gap-2 flex"
        onClick={() => setIsOpen( true )}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Skill
      </Button2>
      <Modal
        title="Add Transaction"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => null}
        variant='normal'
      >
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
                disabled={loading}
              />
            ) )}
            <Button2 variant="primary"
              type="submit"
              loading={loading}
            >
              {t( 'login' )}
            </Button2>
          </Form>
        </FormikProvider>
      </Modal>
    </div>
  )
}

export default AddTransaction
