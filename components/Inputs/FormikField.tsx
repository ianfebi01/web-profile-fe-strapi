'use client'
import { ChangeEvent, useMemo, useRef } from 'react'
import { useField } from 'formik'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Switch } from '@headlessui/react'
import readAsBase64 from '@/lib/readAsBase63'
import { cn } from '@/lib/utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select, { Options, StylesConfig, components } from 'react-select'
import { IOptions } from '@/types/form'
import ITextEditor from '@/components/Inputs/ITextEditor'
interface Props {
  name: string
  label: string
  placeholder: string
  fieldType?:
    | 'text'
    | 'image'
    | 'switch'
    | 'year'
    | 'date'
    | 'select'
    | 'month-year'
    | 'text-editor'
  defaultImageUrl?: string
  setImageBase64?: ( base64: string ) => void
  required?: boolean
  disabled?: boolean
  select?: {
    isMulti?: boolean
  }
  loading?: boolean
  options?: Options<IOptions>
}

const FormikField = ( props: Props ) => {
  const {
    name,
    label,
    placeholder,
    fieldType = 'text',
    required,
    disabled = false,
    select,
    loading,
    options,
  } = props

  const [field, meta, helpers] = useField( name )

  /**
   *  text editor handle value
   */
  const handleTextEditor = async ( val: string ) => {
    helpers.setValue( val )

    setTimeout( () => helpers.setTouched( true ) )
  }
  // handle image
  const imageField = useRef<HTMLInputElement>( null )

  const handleImage = async ( e: ChangeEvent<HTMLInputElement> ) => {
    if ( !e?.target?.files ) return

    const base64 = await readAsBase64( e.target.files[0] )
    helpers.setValue( base64 )
    await Promise.resolve()
    setTimeout( () => helpers.setTouched( true ) )
  }

  const clearImage = () => {
    helpers.setValue( '' )
  }

  const requiredIcon = useMemo( () => {
    if ( required && disabled ) return '*'
    else if ( required && !disabled )
      return <span className="text-red-500">*</span>
    else if ( required && !disabled ) return ''
  }, [] )

  // React select
  const handleSelectChange = async ( val: IOptions | IOptions[] ) => {
    helpers.setValue( val )
    await Promise.resolve()
    setTimeout( () => helpers.setTouched( true ) )
    helpers.setTouched( true )
  }
  const color = {
    dark              : '#222222',
    'dark-secondary'  : 'rgba(84, 84, 84, 0.46)',
    orange            : '#F26B50',
    green             : '#4FAA84',
    white             : '#FBFBFB',
    'white-overlay'   : 'rgba(251, 251, 251, 0.40)',
    'white-overlay-2' : 'rgba(251, 251, 251, 0.20)',
  }
  const customStyles: StylesConfig = {
    control : ( provided: Record<string, unknown>, state: any ) => ( {
      ...provided,
      color     : '#fff',
      width     : '100%',
      minHeight : '36px',
      padding   : '0 0.5rem',
      border    : state.isFocused
        ? meta.touched && meta.error
          ? '1px solid rgb(239 68 68 / 1)'
          : `1px solid rgb(251 251 251 / 0.5)`
        : meta.touched && meta.error
          ? '1px solid rgb(239 68 68 / 1)'
          : `1px solid rgb(251 251 251 / 0.25)`,
      outline      : 'none',
      borderRadius : '8px',
      transition   : 'all 0.3s ease-in-out',
      boxShadow    : 'none',
      '&:hover'    : {
        border : state.isFocused
          ? meta.touched && meta.error
            ? '1px solid rgb(239 68 68 / 1)'
            : `1px solid rgb(251 251 251 / 0.5)`
          : meta.touched && meta.error
            ? '1px solid rgb(239 68 68 / 1)'
            : `1px solid rgb(251 251 251 / 0.25)`,
      },
      backgroundColor : 'transparent',
    } ),
    option : ( styles, { isDisabled, isFocused, isSelected } ) => ( {
      ...styles,
      // backgroundColor : 'rgb(34 34 34 / var(--tw-bg-opacity))',
      backgroundColor : isDisabled
        ? 'transparent'
        : isSelected
          ? color['dark-secondary']
          : isFocused
            ? color['dark-secondary']
            : color['dark'],
      color : isDisabled
        ? '1px solid rgb(251 251 251 / 0.25)'
        : isSelected
          ? '1px solid rgb(251 251 251)'
            ? 'white'
            : 'black'
          : '1px solid rgb(251 251 251 / 0.25)',
      cursor    : isDisabled ? 'not-allowed' : 'default',
      ':active' : {
        ...styles[':active'],
        backgroundColor : !isDisabled
          ? isSelected
            ? color['dark-secondary']
            : color['dark-secondary']
          : undefined,
      },
    } ),
    menu : ( base ) => ( {
      ...base,
      // override border radius to match the box
      // borderRadius : 0,
      // kill the gap
      // marginTop    : 0
      boxShadow : '0px 1px 4px 1px rgba(34, 34, 34, 0.25)',
      border    : '1px solid #9A9A9A',
      overflow  : 'hidden',
    } ),
    menuList : ( base ) => ( {
      ...base,
      // kill the white space on first and last option
      padding         : 0,
      backgroundColor : color.dark,
    } ),
    singleValue : ( provided ) => ( {
      ...provided,
      color : 'white',
    } ),
    multiValue : ( styles ) => {
      return {
        ...styles,
        backgroundColor : color['dark-secondary'],
      }
    },
    multiValueLabel : ( styles ) => ( {
      ...styles,
      color : 'white',
    } ),
    multiValueRemove : ( styles ) => ( {
      ...styles,
      color      : 'rgb(251 251 251 / 0.25)',
      transition : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      ':hover'   : {
        //   backgroundColor : color['dark-secondary'],
        color : 'white',
      },
    } ),
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={name}
        className="w-fit"
      >
        <span>{label}</span>
        {requiredIcon}
      </label>
      {fieldType === 'text' ? (
        <>
          {loading ? (
            <div className="h-8 p-2 w-full border border-white/25 rounded-lg">
              <div className="h-full max-w-sm bg-dark-secondary animate-pulse"></div>
            </div>
          ) : (
            <input
              id={name}
              type="text"
              placeholder={placeholder}
              {...field}
              className={cn(
                'text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default',
                // field validation
                [
                  'focus:border-white/50 border-white/25',
                  meta.touched &&
                    meta.error &&
                    'focus:border-red-500 border-red-500',
                ]
              )}
              disabled={disabled}
            />
          )}
        </>
      ) : fieldType === 'image' ? (
        <>
          {loading ? (
            <div className="bg-dark-secondary aspect-square w-60  flex items-center justify-center animate-pulse">
              Loading...
            </div>
          ) : (
            <>
              <input
                id={name}
                ref={imageField}
                type="file"
                placeholder={placeholder}
                className="hidden"
                onChange={handleImage}
                disabled={disabled}
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
              />
              {field.value !== '' ? (
                <div className=" aspect-square w-60 relative border border-dashed border-white-overlay hover:border-white transition-default">
                  <div className="absolute z-20 right-4 top-4">
                    <button
                      type="button"
                      className="text-white w-6 aspect-square border border-white-overlay-2 hover:border-white-overlay bg-dark-secondary rounded-full"
                      onClick={() => clearImage()}
                      disabled={disabled}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <Image
                    src={field.value as string}
                    alt="Preview image"
                    fill
                    style={{
                      objectFit : 'contain',
                    }}
                    className="z-0"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className={cn(
                    'bg-dark-secondary aspect-square w-60 border border-dashed border-white/25',
                    meta.touched &&
                      meta.error &&
                      'focus:border-red-500 border-red-500'
                  )}
                  onClick={() => imageField.current?.click()}
                  disabled={disabled}
                >
                  Select Image
                </button>
              )}
            </>
          )}
        </>
      ) : fieldType === 'switch' ? (
        <>
          <Switch
            name={field.name}
            checked={field.value}
            onChange={() => {
              helpers.setValue( !field.value )
              helpers.setTouched( true )
            }}
            value={field.value}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full border border-transparent transition-default bg-dark hover:border-white/25',
              ['bg-dark-secondary', field.value && 'bg-orange']
            )}
            disabled={disabled}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition',
                ['translate-x-1', field.value && 'translate-x-6']
              )}
            />
          </Switch>
        </>
      ) : fieldType === 'date' ? (
        <>
          <DatePicker
            showIcon
            selected={field.value}
            value={field.value}
            className={cn(
              'text-white !py-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default',
              [
                'focus:border-white/50 border-white/25',
                meta.touched &&
                  meta.error &&
                  'focus:border-red-500 border-red-500',
              ]
            )}
            icon={<FontAwesomeIcon icon={faCalendar} />}
            onChange={( date ) => {
              helpers.setValue( new Date( date as Date ) )
              helpers.setTouched( true )
            }}
          />
        </>
      ) : fieldType === 'month-year' ? (
        <>
          {loading ? (
            <div className="h-8 p-2 max-w-[10rem] border border-white/25 rounded-lg">
              <div className="h-full max-w-[4rem] bg-dark-secondary animate-pulse"></div>
            </div>
          ) : (
            <DatePicker
              popperPlacement="top-end"
              showIcon
              selected={field.value}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className={cn(
                'text-white !py-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default',
                [
                  'focus:border-white/50 border-white/25',
                  meta.touched &&
                    meta.error &&
                    'focus:border-red-500 border-red-500',
                ]
              )}
              icon={<FontAwesomeIcon icon={faCalendar} />}
              onChange={( date ) => {
                helpers.setValue( new Date( date as Date ) )
                helpers.setTouched( true )
              }}
            />
          )}
        </>
      ) : fieldType === 'year' ? (
        <>
          {loading ? (
            <div className="h-8 p-2 max-w-[10rem] border border-white/25 rounded-lg">
              <div className="h-full max-w-[4rem] bg-dark-secondary animate-pulse"></div>
            </div>
          ) : (
            <DatePicker
              popperPlacement="top-end"
              showIcon
              selected={field.value}
              showYearPicker
              dateFormat="yyyy"
              className={cn(
                'text-white !py-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default',
                [
                  'focus:border-white/50 border-white/25',
                  meta.touched &&
                    meta.error &&
                    'focus:border-red-500 border-red-500',
                ]
              )}
              icon={<FontAwesomeIcon icon={faCalendar} />}
              onChange={( date ) => {
                helpers.setValue( new Date( date as Date ) )
                helpers.setTouched( true )
              }}
            />
          )}
        </>
      ) : fieldType === 'select' ? (
        <>
          <Select
            instanceId={name}
            name={name}
            options={options}
            isMulti={select?.isMulti}
            styles={customStyles}
            isLoading={loading}
            value={field.value}
            components={{
              Input : ( props ) => (
                <components.Input
                  {...props}
                  aria-activedescendant={undefined}
                />
              ),
            }}
            onChange={( val: unknown ) =>
              handleSelectChange( val as IOptions | IOptions[] )
            }
          />
        </>
      ) : fieldType === 'text-editor' ? (
        <div className="text-dark">
          <ITextEditor
            value={field.value}
            setValue={( val ) => handleTextEditor( val )}
          />
        </div>
      ) : (
        ''
      )}
      <p className="invisible">space for error message</p>
      <p
        className={cn(
          'absolute bottom-0 text-[0.7rem] text-red-500 transition-default delay-100',
          [
            '-translate-y-2 opacity-0',
            meta.error && meta.touched && 'translate-y-0 opacity-100',
          ]
        )}
      >
        {meta.error}
      </p>
    </div>
  )
}

export default FormikField
