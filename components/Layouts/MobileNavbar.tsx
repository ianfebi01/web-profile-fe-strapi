import { socials } from '@/lib/constans/socials-media'
import { cn, openNewTab } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { useAnimation, motion, easeInOut } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
}

const MobileNavbar = ( { isOpen }: Props ) => {
  const animationControl = useAnimation()
  const [showItem, setShowItem] = useState<boolean>( false );

  const startAnimation = useCallback( () => {
    if ( showItem ) {
      animationControl.start( 'visible' )
    } else if ( !showItem ) {
      animationControl.start( 'hidden' )
    }
  }, [showItem, animationControl] )

  useEffect( () => {
    startAnimation()
  }, [startAnimation] )

  return (
    <Transition
      className="h-full w-full fixed top-0"
      appear={true}
      show={isOpen}
      afterEnter={()=> setShowItem( true )}
      beforeLeave={()=> setShowItem( false )}
    >
      <Transition.Child
        className={cn( 'h-screen', 'md:hidden', 'transition-all duration-300 ease-out delay-500 opacity-0' )}

        // enter="transition-all duration-300 ease-out delay-500"
        // enterFrom="opacity-0"
        enterTo="no-doc-scroll bg-black opacity-100"
        // leave="duration-300 ease-in delay-[600ms]"
        // leaveFrom="no-doc-scroll bg-black opacity-100"
        // leaveTo="opacity-0"
      >
        <div className="flex flex-col h-full p-6 justify-center items-center font-bold text-xl text-white">
          {socials.map( ( item, index ) => (
            <button
              onClick={() => openNewTab( item.href )}
              className={cn(
                'flex items-center h-[56px] rounded-lg transition duration-150 ease-in-out overflow-hidden',
                'focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50'
              )}
              key={index}
            >
              <motion.div
                variants={{
                  hidden : {
                    opacity : 0,
                    y       : isOpen ? 75 : -75,
                  },
                  visible : {
                    opacity : 1,
                    y       : 0,
                  },
                }}
                initial="hidden"
                animate={animationControl}
                transition={{
                  duration : isOpen ? 0.6 : 0.6,
                  delay    : isOpen ? 0 + ( index / 12 ) : 0 + ( index / 12 ),
                  ease     : easeInOut,
                }}
              >
                <p className="text-4xl font-medium text-white text-center">
                  {item.name}
                </p>
              </motion.div>
            </button>
          ) )}
        </div>
      </Transition.Child>
    </Transition>
  )
}

export default MobileNavbar
