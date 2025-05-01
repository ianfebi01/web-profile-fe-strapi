'use client'
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  createElement,
  FunctionComponent,
} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { id, enUS } from 'date-fns/locale'
import { ISelectedRange, Placement, TActivatorProps } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faBan,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { useLocale, useTranslations } from 'next-intl'
import '@/assets/css/react-datepicker.css'

interface Props {
  value: ISelectedRange
  setValue: ( val: ISelectedRange ) => void
  min?: Date
  max?: Date
  activator?: FunctionComponent<TActivatorProps>
  position?: Placement
  isTableFilter?: boolean
  handleCommitted?: ( val: ISelectedRange ) => void
}

const DateRangePicker = ( {
  min,
  max,
  activator,
  position = 'bottom-start',
  value,
  isTableFilter = false,
  setValue,
  handleCommitted,
}: Props ) => {
  const t = useTranslations()
  const locale = useLocale()

  const dateLocale = locale === 'id' ? id : enUS

  const datePickerRef = useRef<DatePicker>( null )

  const [state, setState] = useState<ISelectedRange>( {
    startDate : null,
    endDate   : null,
  } )

  useEffect( () => {
    setState( value )
  }, [] )

  const handleChange = ( [newStartDate, newEndDate]: Array<Date | null> ) => {
    setState( { startDate : newStartDate, endDate : newEndDate } )
  }

  const onReset = () => {
    datePickerRef.current?.setOpen( false )
    setValue( { startDate : null, endDate : null } )
    setState( { startDate : null, endDate : null } )
  }

  const handleClose = () => {
    datePickerRef.current?.setOpen( false )
    setState( value )
  }

  const handleSave = () => {
    datePickerRef.current?.setOpen( false )
    setValue( state )
    if ( handleCommitted ) {
      handleCommitted( state )
    }
  }

  const handleOpenMenu = () => {
    datePickerRef.current?.setOpen( true )
  }

  const selectedTextValue = useMemo( () => {
    const startDate = value.startDate
      ? format( value.startDate, 'd MMMM yyyy', { locale : dateLocale } )
      : ''
    const endDate = value.endDate
      ? format( value.endDate, 'd MMMM yyyy', { locale : dateLocale } )
      : ''

    return value.endDate && value.startDate ? `${startDate} - ${endDate}` : ''
  }, [value] )

  const DefaultActivator = () => (
    <button
      onClick={handleOpenMenu}
      className={`w-full text-left border rounded px-3 py-2 text-sm flex justify-between items-center ${
        isTableFilter ? 'h-8 text-xs' : 'min-w-[300px]'
      }`}
    >
      <span>
        {selectedTextValue || t( isTableFilter ? 'all' : 'select_date' )}
      </span>
      <FontAwesomeIcon icon={faCalendarAlt}
        className="text-gray-500 ml-2"
      />
    </button>
  )

  return (
    <DatePicker
      ref={datePickerRef}
      popperPlacement={position}
      minDate={min}
      maxDate={max}
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      tabIndex={1}
      selected={state.startDate}
      onChange={handleChange}
      selectsRange
      startDate={state.startDate ?? undefined}
      endDate={state.endDate ?? undefined}
      renderDayContents={RenderDayContent}
      renderCustomHeader={RenderCustomHeader( dateLocale )}
      popperProps={{ strategy : 'absolute' }}
      portalId="root"
      customInput={
        activator ? (
          createElement( activator, { rawValue : value, handleOpenMenu } )
        ) : (
          <DefaultActivator />
        )
      }
    >
      <div className="px-3 pb-3 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2 overflow-hidden">
          <input
            className="border rounded px-2 py-1 text-sm bg-gray-100 w-full"
            disabled
            placeholder="-"
            value={
              state.startDate
                ? format( state.startDate, 'dd MMM yyyy', { locale : dateLocale } )
                : ''
            }
          />
          -
          <input
            className="border rounded px-2 py-1 text-sm bg-gray-100 w-full"
            disabled
            placeholder="-"
            value={
              state.endDate
                ? format( state.endDate, 'dd MMM yyyy', { locale : dateLocale } )
                : ''
            }
          />
        </div>
        <hr />
        <div className="flex justify-end gap-2">
          <button onClick={onReset}
            className="text-sm text-gray-700"
          >
            {t( 'reset' )}
          </button>
          <button
            onClick={handleClose}
            className="border rounded px-3 py-1 text-sm flex items-center gap-1 border-gray-300 text-gray-900"
          >
            <FontAwesomeIcon icon={faBan} /> {t( 'close' )}
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white rounded px-3 py-1 text-sm flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faCheckCircle} /> {t( 'set_date' )}
          </button>
        </div>
      </div>
    </DatePicker>
  )
}

export default DateRangePicker

const RenderDayContent = ( day: number ) => <span>{day}</span>

type TCustomHeaderProps = {
  date: Date
  decreaseYear: () => void
  increaseYear: () => void
  prevYearButtonDisabled: boolean
  nextYearButtonDisabled: boolean
  changeYear: ( date: number ) => void
  changeMonth: ( date: number ) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}

const RenderCustomHeader =
  ( dateLocale: Locale ) => {
    const CustomHeader = ( {
      date,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }: TCustomHeaderProps ) => {
      return (
        <div className="flex items-center justify-between px-3 py-2">
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="text-gray-700"
          >
            <FontAwesomeIcon icon={faChevronLeft}
              size="sm"
            />
          </button>
          <span className="text-sm font-medium">
            {format( date, 'MMM, yyyy', { locale : dateLocale } )}
          </span>
          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="text-gray-700"
          >
            <FontAwesomeIcon icon={faChevronRight}
              size="sm"
            />
          </button>
        </div>
      )
    }

    CustomHeader.displayName = 'CustomDatePickerHeader'
    
    return CustomHeader
  }
