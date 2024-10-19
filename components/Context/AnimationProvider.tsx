'use client'

import React, { FunctionComponent, ReactNode, useCallback, useEffect, useRef } from 'react'

import { motion, useInView, useAnimation, easeOut } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  once?: boolean
}

const AnimationProvider: FunctionComponent<Props> = ( {
  children,
  className,
  once = true
} ) => {
  const ref = useRef( null )
  const isInView = useInView( ref, {
    once,
  } )
  const animationControl = useAnimation()
	
  const startAnimation = useCallback( ()=>{
    if ( isInView ) {
      animationControl.start( 'visible' )
    }
    if ( !isInView ) {
      animationControl.start( 'hidden' )
    }
  }, [isInView, animationControl] )

  useEffect( () => {
    startAnimation()
  }, [startAnimation] )
	
  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden : {
            opacity : 0,
            y       : 75,
          },
          visible : {
            opacity : 1,
            y       : 0,
          },
        }}
        initial="hidden"
        animate={animationControl}
        transition={{
          duration : 0.3,
          delay    : 0.2,
          ease     : easeOut,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default AnimationProvider
