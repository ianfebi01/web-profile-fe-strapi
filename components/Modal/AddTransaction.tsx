'use client'
import { generateValidationSchema } from '@/lib/validation/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { useTranslations } from 'next-intl'
import { useLogin } from '@/lib/hooks/api/auth'
import Button2 from '@/components/Buttons/Button2'
import Modal from './Modal'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IBodyTransaction } from '@/types/api/transaction'
import SingleDatePicker from '../Inputs/SingleDatePicker'

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

  const [dateValue, setDateValue] = useState<Date | null>( null )

  return (
    <div className="w-fit">
      <Button2
        type="button"
        variant="secondary"
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
        variant="normal"
      >
        <form
          className="flex flex-col gap-2 w-full"
        >
          <SingleDatePicker value={dateValue}
            setValue={setDateValue}
          />
          <Button2 variant="secondary"
            type="submit"
            loading={loading}
          >
            Add transaction
          </Button2>
        </form>
      </Modal>
    </div>
  )
}

export default AddTransaction
