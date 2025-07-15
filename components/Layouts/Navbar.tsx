'use client';
import { useState } from 'react'
import MenuItem from './MenuItem'
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import MobileNavbar from './MobileNavbar'
import Image from 'next/image'
import {
  ArraysSocials,
  NavCategoriesNavCategories,
} from '@/types/generated/components'
import MenuItemSocial from './MenuItemSocial'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
  items: NavCategoriesNavCategories['attributes'][]
  socials: ArraysSocials['attributes'][]
}
const Navbar = ( { items, socials }: Props ) => {
  const t = useTranslations()
  const { scrollY } = useScroll()
  const visibilityControl = useAnimation()

  const [isOpen, setIsOpen] = useState<boolean>( false )

  function update() {
    if ( scrollY?.get() < scrollY?.getPrevious() ) {
      visibilityControl.start( 'visible' )
    } else if (
      scrollY?.get() > 100 &&
      scrollY?.get() > scrollY?.getPrevious()
    ) {
      visibilityControl.start( 'hidden' )
    }
  }

  useMotionValueEvent( scrollY, 'change', () => {
    update()
  } )

  return (
    <>
      <motion.nav
        variants={{
          hidden : {
            opacity : 0,
            y       : -64,
          },
          visible : {
            opacity : 1,
            y       : 0,
          },
        }}
        initial="visible"
        animate={isOpen ? undefined : visibilityControl}
        transition={{ ease : [0.1, 0.25, 0.3, 1], duration : 0.5 }}
        className={cn( 'fixed top-0 w-full h-16 z-30 bg-transparent md:bg-dark' )}
      >
        <div className="inset-x-0 items-center hidden h-full gap-2 px-4 mx-auto max-w-7xl sm:px-4 md:px-4 xl:px-0 2xl:px-0 md:flex">
          <Link href={'/'}>
            <Image src="/Logo.svg"
              alt="Logo image"
              width={40}
              height={40}
              priority
            />
          </Link>
          <div className="grow"></div>
          <div className="flex items-center gap-4">
            {items?.map( ( item, i ) => (
              <div key={i}>
                <MenuItem data={item} />
              </div>
            ) )}
            <MenuItemSocial title={t( 'contact' )}
              socials={socials}
            />
            <LocaleSwitcher/>
          </div>
        </div>
        <div className="flex items-center h-16 px-6 md:hidden">
          <Link href={'/'}
            onClick={() => setIsOpen( false )}
          >
            <Image src="/Logo.svg"
              alt="Logo image"
              width={40}
              height={40}
            />
          </Link>
          <div className='grow'/>
          <div className="md:hidden">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white transition-all duration-300 ease-in-out"
              aria-label="Open navigation drawer"
              onClick={() => setIsOpen( true )}
            >
              <FontAwesomeIcon
                icon={faBars}
                size='2xl'
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <MobileNavbar isOpen={isOpen}
          items={items}
          setIsOpen={setIsOpen}
        />
      </motion.nav>
    </>
  )
}

export default Navbar
