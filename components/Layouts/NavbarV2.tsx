'use client';
import { useState } from 'react'
import MenuItem from './MenuItem'
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from 'framer-motion'
import Hamburger from '../Icons/Hamburger'
import { cn } from '@/lib/utils';
import MobileNavbar from './MobileNavbar'
import Image from 'next/image';
import Link from 'next/link';

const NavbarV2 = () => {
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
            y       : -25,
          },
          visible : {
            opacity : 1,
            y       : 0,
          },
        }}
        initial="visible"
        animate={isOpen ? undefined : visibilityControl}
        transition={{ ease : [0.1, 0.25, 0.3, 1], duration : 0.3 }}
        className={cn( 'fixed top-0 w-full h-16 z-30 bg-transparent md:bg-dark' )}
      >
        <div className="inset-x-0 mx-auto max-w-5xl px-4 lg:px-0 h-full hidden md:flex gap-2 items-center">
          <Link href={'/'}>
            <Image src="/Logo.svg"
              alt="Logo image"
              width={40}
              height={40}
            />
          </Link>
          <div className='grow'></div>
          <MenuItem />
        </div>
        <div className="absolute top-4 right-4 z-50 md:hidden">
          <Hamburger open={isOpen}
            setOpen={setIsOpen}
          />
        </div>
        <MobileNavbar isOpen={isOpen}/>
      </motion.nav>
      {/* {open && (
        // <div className="h-full w-full fixed top-16 bg-dark z-50 no-doc-scroll md:hidden"></div>
        
      )} */}
    </>
  )
}

export default NavbarV2
