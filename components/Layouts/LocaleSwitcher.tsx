'use client'
import { cn } from '@/lib/utils'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
  const t = useTranslations( 'locale-switcher' )
  const [show, setShow] = useState<boolean>( false )

  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const changeLocale = ( locale: string ) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale : locale }
    )
  }

  return (
    <div className="relative">
      <Popover
        className="relative"
        onMouseEnter={() => setShow( true )}
        onMouseLeave={() => setShow( false )}
        onTouchStart={() => setShow( !show )}
      >
        {() => (
          <>
            <Popover.Button
              className={cn(
                'py-2 px-4 text-xs xl:text-base flex items-center gap-2 transition-default w-fit rounded-lg border border-transparent',
                ' hover:border-white/25',
                'ring-0 focus:ring-0 outline-none',
                show ? 'text-white border-white/25' : 'text-white/50'
              )}
            >
              <FontAwesomeIcon icon={faLanguage} />
              <div
                className={cn(
                  'transition-default group-hover:text-orange-300/80',
                  show ? 'text-white transform -rotate-180' : 'text-white/50'
                )}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              show={show}
            >
              <Popover.Panel
                static
                className="absolute right-0 z-10 pt-3 w-full px-4 sm:px-0"
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid bg-dark-secondary p-4">
                    {routing.locales?.map( ( item, i ) => {
                      return (
                        <div
                          key={i}
                          className={cn(
                            i !== routing.locales?.length - 1 &&
                              'border-b border-dark mb-2 pb-2'
                          )}
                        >
                          <button
                            onClick={() => changeLocale( item )}
                            className={cn(
                              'flex items-center rounded-lg p-2 min-h-20   w-full',
                              ' text-sm xl:text-base font-medium text-left uppercase',
                              'transition duration-150 ease-in-out',
                              'hover:bg-dark focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50 hover:shadow-xl'
                            )}
                          >
                            {item}
                          </button>
                        </div>
                      )
                    } )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
