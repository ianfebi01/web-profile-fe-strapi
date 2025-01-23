import sanitize from './sanitize' // Ensure sanitize works similarly to sanitize-html.
import { marked, Renderer } from 'marked'

const renderer = new Renderer()

// Configure the `marked` renderer (you can customize rendering as needed).
marked.use( { renderer, gfm : true, breaks : true } )

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
  const parsedContent = marked( unescapedContent )

  // Sanitize the parsed HTML to allow only permitted tags/attributes.
  const escapedContent = sanitize( parsedContent, 'richtext' )

  return escapedContent
}

export default parseMd
