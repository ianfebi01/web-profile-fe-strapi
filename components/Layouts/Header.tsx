import React, { FunctionComponent } from 'react'
import Button2 from '../Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'

interface Props{
    text: string
    link?: Url
}
const Header: FunctionComponent<Props> = ( props ) => {
  const { text, link } = props
	
  return (
    <div className='flex flex-row items-center gap-4'>
      {link ? (
        <Link href={link}>
          <Button2 type='button'
            variant='icon'
            className='gap-2 flex'
          >
            <FontAwesomeIcon icon={faChevronLeft}
              size='xl'
            />
          </Button2>
        </Link>
      ) : ''}
			
      <h1 className="text-2xl font-semibold m-0">{text}</h1>
    </div>
  )
}

export default Header
