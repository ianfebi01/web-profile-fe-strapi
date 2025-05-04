import { Fragment, useMemo } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { IOptions } from '@/types/form'
import { cn } from '@/lib/utils'
import { useCategories } from '@/lib/hooks/api/cashFlow'
import DefaultCategories from '../DefaultCategories'

interface Props {
  label?: string
  value: IOptions['value']
  onChange: ( value: IOptions ) => void
  enabled: boolean
}

export default function DropdownCategories( {
  label = 'Select category',
  value,
  onChange,
  enabled = false,
}: Props ) {
  const filters = { user : { id : 42 } }
  const { data } = useCategories( 1, 100, enabled, filters )

  const options = useMemo( () => {
    return (
      data?.data.map( ( category ) => ( {
        label : category.attributes.name,
        value : category.id,
      } ) ) || []
    )
  }, [data] )

  const selectedLabel = useMemo( () => {
    return options.find( ( opt ) => opt.value === value )?.label || ''
  }, [value, options] )

  const selectedValue = useMemo( () => {
    return options.find( ( opt ) => opt.value === value )?.value || ''
  }, [value, options] )

  const handleSelect = ( value: IOptions ) => {
    onChange( value )
  }

  return (
    <Disclosure as="div"
      className="relative w-full"
    >
      {( { open, close } ) => (
        <>
          <Disclosure.Button
            className={cn(
              'w-full min-w-[300px]',
              'flex justify-between items-center text-left',
              'p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none transition-colors duration-500 ease-in-out',
              'text-sm lg:text-base',
              'focus:border-white/50 border-white/25',
              'pr-4'
            )}
          >
            {selectedLabel ? (
              <div className="text-white">
                <DefaultCategories name={selectedLabel} />
              </div>
            ) : (
              <span className="line-clamp-1 text-white-overlay">{label}</span>
            )}
            <div
              className={`transition-all duration-300 ease-out ${
                open ? '-rotate-180' : ''
              }`}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-white-overlay"
              />
            </div>
          </Disclosure.Button>

          <Transition
            enterFrom="transform max-h-0 opacity-0 overflow-hidden"
            enterTo="transform max-h-[500px] opacity-100 duration-700 ease-out overflow-hidden"
            leaveFrom="transform max-h-[500px] opacity-100 overflow-hidden"
            leaveTo="transform max-h-0 opacity-0 duration-700 ease-out overflow-hidden"
          >
            <Disclosure.Panel static
              className="overflow-hidden"
            >
              <table className="table-fixed w-full border-collapse mt-2">
                <tbody>
                  {Array.from( { length : Math.ceil( options.length / 3 ) } ).map(
                    ( _, rowIndex ) => (
                      <tr key={rowIndex}>
                        {options
                          .slice( rowIndex * 3, rowIndex * 3 + 3 )
                          .map( ( item, index ) => (
                            <td
                              key={index}
                              className={`border border-white-overlay-2 p-0`}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  handleSelect( item )
                                  close()
                                }}
                                className={cn(
                                  'flex items-center justify-between w-full gap-2 px-4 py-3 text-left no-underline transition-all duration-300 ease-in-out cursor-pointer hover:bg-dark-secondary',
                                  [
                                    selectedValue === item.value
                                      ? 'bg-dark-secondary text-white'
                                      : 'text-white-overlay',
                                  ]
                                )}
                              >
                                <DefaultCategories name={item?.label} />
                                {value === item.value && (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-white-overlay w-4 h-4 shrink-0"
                                  />
                                )}
                              </button>
                            </td>
                          ) )}
                        {/* Fill empty cells if needed to complete the row */}
                        {Array.from( {
                          length :
                            3 -
                            options.slice( rowIndex * 3, rowIndex * 3 + 3 )
                              .length,
                        } ).map( ( _, i ) => (
                          <td
                            key={`empty-${i}`}
                            className="border border-white-overlay-2 p-0"
                          />
                        ) )}
                      </tr>
                    )
                  )}
                  {!options.length && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-left px-4 py-3 border border-white-overlay-2"
                      >
                        No options
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
