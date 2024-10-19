import { cn, openNewTab } from '@/lib/utils'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'
import CopyToClipboard from '../Inputs/CopyToClipboard'
import { socials } from '@/lib/constans/socials-media'
export default function MenuItem() {
  const [show, setShow] = useState<boolean>( false )

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
                'py-2 px-4 text-xs flex items-center gap-2 transition-default w-fit rounded-lg border border-transparent',
                ' hover:border-white/25',
                'ring-0 focus:ring-0 outline-none',
                show ? 'text-white border-white/25' : 'text-white/50'
              )}
            >
              <span className="text-lg-medium">About Me</span>
              <div
                className={cn(
                  'transition-default group-hover:text-orange-300/80',
                  show ? 'text-white transform -rotate-180' : 'text-white/50'
                )}
              >
                <FontAwesomeIcon
                  icon={faChevronDown}
                />
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
                className="absolute right-0 z-10 pt-3 w-screen max-w-xs px-4 sm:px-0"
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-dark-secondary p-7">
                    {socials.map( ( item ) => (
                      <button
                        key={item.name}
                        onClick={() => openNewTab( item.href )}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-dark focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white text-left">
                            {item.name}
                          </p>
                          <p className="text-sm text-white/50 text-left">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ) )}
                  </div>
                  <div className="bg-dark p-4">
                    <button className="flow-root w-full rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-dark-secondary focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-white">
                          Email
                        </span>
                      </span>
                      <span className="block text-sm text-left text-white/50">
                        <CopyToClipboard
                          copyText="ianfebi01@gmail.com"
                          className="text-md"
                        />
                      </span>
                    </button>
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
