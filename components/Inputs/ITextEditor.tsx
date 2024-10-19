'use client'
import { Editor } from '@tinymce/tinymce-react'

// type DeepPartial<T> = T extends object
//   ? {
//       [P in keyof T]?: DeepPartial<T[P]>
//     }
//   : T

interface Props {
  value: string
  setValue: ( val: string ) => void
}
const ITextEditor = ( {
  value = '',
  setValue,
}: Props ) => {

  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY

  return (
    <Editor
      id='tiny-mce-ianfebi01'
      apiKey={apiKey || ''}
      init={{
        plugins : [
          // Core editing features
          'anchor',
          'autolink',
          'charmap',
          'codesample',
          'emoticons',
          'image',
          'link',
          'lists',
          'media',
          'searchreplace',
          'table',
          'visualblocks',
          'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Oct 8, 2024:
        ],
        toolbar :
          'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
      }}
      initialValue={value}
      onChange={( e )=>setValue( e.target.getContent() )}
    />
  )
}

export default ITextEditor
