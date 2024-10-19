'use client'
import React, { FunctionComponent, useState } from 'react'
import Button from '../Buttons/Button'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useAnimation,
} from 'framer-motion'
import Link from 'next/link'

const menus = [
  { id : 'home', label : 'Home' },
  { id : 'quote', label : 'Quote' },
  { id : 'portofolio', label : 'Portofolio' },
  { id : 'experience', label : 'Experience' },
  { id : 'skills', label : 'Skills' },
]

interface Props {}
const Navbar: FunctionComponent<Props> = () => {
  const [activeMenu, setActiveMenu] = useState( 'home' )

  const { scrollY } = useScroll()
  const visibilityControl = useAnimation()

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

  const handleScroll = ( e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
    // first prevent the default behavior
    e.preventDefault()
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href
    const targetId = href.replace( /.*\#/, '' )
    // get the element by id and use scrollIntoView
    const elem = document.getElementById( targetId )
    elem?.scrollIntoView( {
      behavior : 'smooth',
    } )
  }

  return (
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
      animate={visibilityControl}
      transition={{ ease : [0.1, 0.25, 0.3, 1], duration : 0.6 }}
      className="main__header"
    >
      <div className="grow-[1]"></div>
      <div
        className="bg-white-overlay-2 h-11 px-2 flex items-center w-fit backdrop-blur-sm"
        style={{
          borderRadius : 9999,
        }}
      >
        {menus.map( ( item ) => (
          <Link href={`#${item.id}`}
            key={item.id}
            onClick={handleScroll}
          >
            <Button variant={'link'}
              onClick={() => setActiveMenu( item.id )}
            >
              {activeMenu === item.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white-overlay text-white "
                  style={{ borderRadius : 9999 }}
                  transition={{ type : 'spring', bounce : 0.2, duration : 0.5 }}
                />
              )}
              {item.label}
            </Button>
          </Link>
        ) )}
      </div>
    </motion.nav>
  )
}

export default Navbar
