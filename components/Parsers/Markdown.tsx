'use client'
import parseMd from '@/utils/parseMd'
import sanitize from '@/utils/sanitize'
import truncate from '@/utils/truncate'
import React, { useEffect, useRef } from 'react'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

interface Props {
  content: string
  excerpt?: number
}

const Markdown = ( { content, excerpt }: Props ) => {
  const bodyCopyRef = useRef<HTMLDivElement>( null )

  useEffect( () => {
    if ( !bodyCopyRef.current ) return

    // Add target and rel attributes to all <a> tags
    const aTags = bodyCopyRef.current.querySelectorAll( 'a' )
    aTags.forEach( ( t ) => {
      t.setAttribute( 'target', '_blank' )
      t.setAttribute( 'rel', 'noopener noreferrer' )
    } )

    // Wait for the next render cycle before highlighting
    hljs.highlightAll()
  }, [content] ) // Runs whenever content updates

  return (
    <div ref={bodyCopyRef}
      className="body-copy w-full"
    >
      {!excerpt && !!content ? (
        <div
          dangerouslySetInnerHTML={{
            __html : sanitize( parseMd( content ), 'richtext' ),
          }}
        ></div>
      ) : !!content ? (
        <div
          dangerouslySetInnerHTML={{
            __html : truncate( sanitize( parseMd( content ), 'richtext' ), excerpt ),
          }}
        ></div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Markdown
