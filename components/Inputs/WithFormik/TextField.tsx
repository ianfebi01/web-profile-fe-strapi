'use client'
import { InputHTMLAttributes, useState } from 'react'
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
  const [field, meta] = useField( name )

  const [showPassword, setShowPassword] = useState<boolean>( false )

  return loading ? (
    <div className="h-8 p-2 w-full border border-white/25 rounded-lg">
      <div className="h-full max-w-sm bg-dark-secondary animate-pulse" />
    </div>
  ) : (
    <div className="relative">
      <input
        id={name}
        placeholder={placeholder}
        type={type === 'password' ? ( showPassword ? 'text' : 'password' ) : type}
        {...field}
        className={cn(
          'w-full',
          'text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none transition-colors duration-500 ease-in-out',
          'text-sm lg:text-base',
          [
            'focus:border-white/50 border-white/25',
            meta.touched && meta.error && 'focus:border-red-500 border-red-500',
          ],
          [type === 'password' && 'pr-4']
        )}
        disabled={disabled}
      />
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
