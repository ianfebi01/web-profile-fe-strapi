import sanitize from './sanitize' // Ensure sanitize works similarly to sanitize-html.
import { Marked, Renderer, Tokens } from 'marked'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'

// Custom tokenizer for modifying <a> tags
const linkTokenizer = {
  name  : 'link',
  level : 'inline' as const,
  start( src: string ) {
    return src.indexOf( '[' ) // Start only if '[' is found (indicating a potential link)
  },
  tokenizer( src: string ) {
    const rule = /^\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]+)")?\)/ // Match [text](url "title")
    const match = rule.exec( src )
    if ( match ) {
      return {
        type   : 'link',
        raw    : match[0],
        text   : match[1],
        href   : match[2],
        title  : match[3] || null,
        tokens : marked.lexer( match[1] ),
      }
    }

    return undefined
  },
  renderer( token: Tokens.Link ) {
    const titleAttr = token.title ? ` title="${token.title}"` : ''

    return `<a href="${
      token.href
    }" target="_blank" rel="noopener noreferrer"${titleAttr}>${marked.parseInline(
      token.tokens.map( ( t ) => t.raw ).join( '' )
    )}</a>`
  },
}

const renderer = new Renderer()
const marked = new Marked(
  markedHighlight( {
    emptyLangClass : 'hljs',
    langPrefix     : 'hljs language-',
    highlight( code, lang ) {
      const language = hljs.getLanguage( lang ) ? lang : 'plaintext'

      return hljs.highlight( code, { language } ).value
    },
  } )
)

// Configure the `marked` renderer (you can customize rendering as needed).
marked.use( { renderer, gfm : true, breaks : true, extensions : [linkTokenizer] } )

/**
 * Parses markdown content, removes escape sequences, and sanitizes the output.
 * @param content - The raw markdown content.
 * @returns The sanitized HTML string.
 */
const parseMd = ( content: string ): string => {
  // Ensure content is defined and strip backslashes from the beginning of each line.
  const textContent = content?.replace( /^\\/gm, '' ) || ''

  // Unescape underlines.
  const unescapedContent = textContent.replace( /\\_/g, '_' )

  // Parse the markdown to HTML.
  const parsedContent = marked.parse( unescapedContent )

  // Sanitize the parsed HTML to allow only permitted tags/attributes.
  const escapedContent = sanitize( parsedContent, 'richtext' )

  return escapedContent
}

export default parseMd
