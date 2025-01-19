import { ContentComponentsBodyCopy } from '@/types/generated/components'
import React from 'react'
import Markdown from '../Parsers/Markdown'

interface Props {
  sectionData: ContentComponentsBodyCopy['attributes']
}
const BodyCopy: React.FC<Props> = ( { sectionData } ) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Markdown content={sectionData.content} />
    </div>
  )
}
export default BodyCopy
