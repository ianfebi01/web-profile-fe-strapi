'use client'
import parseMd from '@/utils/parseMd'
import sanitize from '@/utils/sanitize'
import truncate from '@/utils/truncate'
import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

interface Props {
  content: string
  excerpt?: number
}

const Markdown = ( { content, excerpt }: Props ) => {
  const bodyCopyRef = useRef<HTMLDivElement>( null )

  useEffect( () => {
    // Add target and rel attributes to all <a> tags
    const aTags = bodyCopyRef.current?.querySelectorAll( 'a' )
    if ( aTags?.length ) {
      aTags.forEach( ( t ) => {
        t?.setAttribute( 'target', '_blank' )
        t?.setAttribute( 'rel', 'noopener noreferrer' )
      } )
    }

    // Apply syntax highlighting to all <pre><code> blocks
    hljs.highlightAll();
  }, [content] )

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
