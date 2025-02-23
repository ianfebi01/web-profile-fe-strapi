'use client'
import parseMd from '@/utils/parseMd'
import sanitize from '@/utils/sanitize'
import truncate from '@/utils/truncate'
import React, { useEffect, useRef, useState } from 'react'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

interface Props {
  content: string
  excerpt?: number
}

const Markdown = ( { content, excerpt }: Props ) => {
  const bodyCopyRef = useRef<HTMLDivElement>( null )
  const [parsedContent, setParsedContent] = useState<string>( '' )

  useEffect( () => {
    // Parse and sanitize the content
    const parsed = sanitize( parseMd( content ), 'richtext' )
    setParsedContent( excerpt ? truncate( parsed, excerpt ) : parsed )
  }, [content, excerpt] )

  useEffect( () => {
    if ( !bodyCopyRef.current ) return

    // Add target and rel attributes to all <a> tags
    const aTags = bodyCopyRef.current.querySelectorAll( 'a' )
    aTags.forEach( t => {
      t.setAttribute( 'target', '_blank' )
      t.setAttribute( 'rel', 'noopener noreferrer' )
    } )

    // Apply syntax highlighting
    hljs.highlightAll()
  }, [parsedContent] ) // Ensure highlighting runs only after parsing is complete

  return (
    <div ref={bodyCopyRef}
      className="body-copy w-full"
    >
      {parsedContent && (
        <div dangerouslySetInnerHTML={{ __html : parsedContent }}></div>
      )}
    </div>
  )
}

export default Markdown
