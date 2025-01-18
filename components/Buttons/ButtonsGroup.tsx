import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArraysLinks } from '@/types/generated/components'

interface ButtonGroupProps {
  buttons?: ArraysLinks['attributes'][]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ( { buttons = [] } ) => {
  if ( !buttons.length ) return null

  return (
    <div className="flex items-center gap-4 justify-center lg:justify-start mt-2 flex-wrap">
      {buttons.map( ( button, index ) => (
        <Link
          key={index}
          className={cn( 'button button-primary' )}
          href={button.link}
          target={button.newTab ? '_blank' : undefined}
          rel={button.newTab ? 'noopener noreferrer' : undefined}
        >
          {button.title}
        </Link>
        // <pre>{JSON.stringify( button, null, 2 )}</pre>
      ) )}
    </div>
  )
}

export default ButtonGroup
