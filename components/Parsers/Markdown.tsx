'use client'
import parseMd from '@/utils/parseMd'
import sanitize from '@/utils/sanitize'
import truncate from '@/utils/truncate'
import React, { useEffect, useRef } from 'react'

interface Props {
  content: string
  excerpt?: number
}

const Markdown = ( { content, excerpt }: Props ) => {
  const bodyCopyRef = useRef<HTMLDivElement>( null )

  useEffect( () => {
    const aTags = bodyCopyRef.current?.querySelectorAll( 'a' )

    if ( aTags?.length ) {
      aTags.forEach( ( t ) => {
        t?.setAttribute( 'target', '_blank' )
        t?.setAttribute( 'rel', 'noopener noreferrer' )
      } )
    }
  }, [] )

  return (
    <div ref={bodyCopyRef}
      className='body-copy'
    >
      {!excerpt && !!content ? (
        <div
          dangerouslySetInnerHTML={{
            __html : sanitize( parseMd( content ), 'richtext' ),
          }}
        ></div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html : truncate( sanitize( parseMd( content ), 'richtext' ), excerpt ),
          }}
        ></div>
      )}
    </div>
  )
}

export default Markdown
