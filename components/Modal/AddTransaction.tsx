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
import TextField from '../Inputs/TextField'
import DropdownSelect from '../Inputs/DropdownSelect'

const AddTransaction = () => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState<boolean>( false )
  const [sharedDate, setSharedDate] = useState<Date | null>( null )
  const [form, setForm] = useState<Omit<IBodyTransaction, 'date'>>( {
    type        : 'expense',
    amount      : 0,
    description : '',
    mm_category : 0,
  } )
  const [transactions, setTransactions] = useState<IBodyTransaction[]>( [] )

  const handleChange = ( value: string | number, name: string ) => {
    setForm( ( prev ) => ( {
      ...prev,
      [name] :
        name === 'amount' || name === 'mm_category' ? Number( value ) : value,
    } ) )
  }

  const handleAddTransaction = () => {
    if ( !sharedDate ) {
      alert( 'Please select a date first.' )

      return
    }

    const newTransaction: IBodyTransaction = {
      ...form,
      date : new Date( sharedDate ).toISOString(),
    }

    setTransactions( ( prev ) => [...prev, newTransaction] )

    // Reset form
    setForm( {
      type        : 'expense',
      amount      : 0,
      description : '',
      mm_category : 0,
    } )
  }

  const handleSubmitAll = () => {
    console.log( 'Submitting transactions:', transactions )
    // Submit `transactions` to your backend here
  }

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
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2 relative mb-4">
            <label htmlFor={'date'}
              className="w-fit text-sm lg:text-base"
            >
              <span>{'Date'}</span>
            </label>
            <SingleDatePicker value={sharedDate}
              setValue={setSharedDate}
            />
          </div>
          <form className="flex flex-col gap-2 w-full p-4 border border-white-overlay rounded-lg">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor={'amount'}
                className="w-fit text-sm lg:text-base"
              >
                <span>{'Amount'}</span>
              </label>
              <TextField
                type="currency-id"
                value={String( form.amount )}
                name="amount"
                placeholder="eg. 1000"
                onChange={( val: string ) => handleChange( val, 'amount' )}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor={'type'}
                className="w-fit text-sm lg:text-base"
              >
                <span>{'Type'}</span>
              </label>
              <DropdownSelect
                value={form.type as string | number}
                options={[
                  {
                    label : 'Income',
                    value : 'income',
                  },
                  {
                    label : 'Expense',
                    value : 'expense',
                  },
                ]}
                onChange={( value: string | number ) =>
                  handleChange( value, 'type' )
                }
              />
            </div>
            <Button2 variant="secondary"
              type="submit"
              className="mt-4"
            >
              Add transaction
            </Button2>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddTransaction
