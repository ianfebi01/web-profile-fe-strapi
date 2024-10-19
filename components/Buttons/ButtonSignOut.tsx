'use client'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import React, { FunctionComponent, useMemo } from 'react'

interface Props{
	iconOnly?: boolean
}
const ButtonSignOut: FunctionComponent<Props> = ( props ) => {
  const { iconOnly = false } = props
  const classes = useMemo( ()=>{
    const buttonClasses = 'bg-transparent hover:bg-dark  p-2 transition-all ease-in-out duration-500 text-base text-white flex items-center gap-2 rounded-lg'
    if ( iconOnly ){
      return `${buttonClasses} w-fit border hover:border-white/25 border-transparent`
    }else{
      return `${buttonClasses} w-full border border-white/25 hover:border-transparent`
    }
  }, [props] )
	
  return (
    <button
      className={classes}
      onClick={() => signOut( { callbackUrl : '/' } )}
      type="button"
    >
      {!iconOnly && <p>Sign Out</p> }
      {!iconOnly && <div className="grow-[1]"></div> }
			
      <FontAwesomeIcon icon={faSignOut}
        size="sm"
      />
    </button>
  )
}

export default ButtonSignOut
