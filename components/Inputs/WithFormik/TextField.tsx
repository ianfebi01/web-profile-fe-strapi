'use client'
import { FormEvent, InputHTMLAttributes, useState } from 'react'
import { useField } from 'formik'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  loading?: boolean
  type?: string
}

const TextField = ( {
  name,
  loading,
  placeholder,
  disabled,
  type,
}: TextFieldProps ) => {
  const [field, meta, helpers] = useField( name )

  const [showPassword, setShowPassword] = useState<boolean>( false )

  /**
   *  Format Number to curency
   */

  const [value, setValue] = useState( '' )

  const formatRupiah = ( number: string ) => {
    const parsed = parseInt( number.replace( /\D/g, '' ), 10 )
    if ( isNaN( parsed ) ) return ''

    return parsed.toLocaleString( 'id-ID' )
  }

  const handleChange = ( e: FormEvent<HTMLInputElement> ) => {
    const input = ( e.target as HTMLInputElement )?.value
    const numericValue = input.replace( /\D/g, '' )
    setValue( formatRupiah( numericValue ) )
    helpers.setValue( numericValue )
  }

  return loading ? (
    <div className="h-8 p-2 w-full border border-white/25 rounded-lg">
      <div className="h-full max-w-sm bg-dark-secondary animate-pulse" />
    </div>
  ) : (
    <div className="relative">
      {/* Currency */}
      {type === 'currency-id' && (
        <>
          <span className="absolute left-2 inset-y-0 my-auto pointer-events-none h-fit p m-0">
            Rp.
          </span>
          <input
            id={name}
            placeholder={placeholder}
            type={'text'}
            {...field}
            value={value}
            onChange={handleChange}
            className={cn(
              'w-full',
              'py-2 px-8',
              'text-white border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none transition-colors duration-500 ease-in-out',
              'text-sm lg:text-base',
              [
                'focus:border-white/50 border-white/25',
                meta.touched &&
                  meta.error &&
                  'focus:border-red-500 border-red-500',
              ]
            )}
            disabled={disabled}
          />
        </>
      )}

      {['text', 'password', 'number', 'email'].includes( String( type ) ) && (
        <input
          id={name}
          placeholder={placeholder}
          type={
            type === 'password' ? ( showPassword ? 'text' : 'password' ) : type
          }
          {...field}
          className={cn(
            'w-full',
            'text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none transition-colors duration-500 ease-in-out',
            'text-sm lg:text-base',
            [
              'focus:border-white/50 border-white/25',
              meta.touched &&
                meta.error &&
                'focus:border-red-500 border-red-500',
            ],
            [type === 'password' && 'pr-4']
          )}
          disabled={disabled}
        />
      )}

      {type === 'password' && (
        <button
          className="absolute right-2 inset-y-0 my-auto"
          type="button"
          onClick={() => setShowPassword( !showPassword )}
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
      )}
    </div>
  )
}

export default TextField
