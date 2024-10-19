'use client'
import { useUpload } from '@/lib/hooks/api/uploadImage'
import readAsBase64 from '@/lib/readAsBase63'
import { cn } from '@/lib/utils'
import { IUploadImageResponse } from '@/types/api/upload-image'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { ChangeEvent, Fragment, useRef, useState } from 'react'
import Spinner from '../Icons/Spinner'
import getImageSize from '@/lib/getImageSize'
import Button2 from '../Buttons/Button2'
import { Transition } from '@headlessui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  placeholder?: string
  disabled?: boolean
}

const UploadMultipleImage = ( { placeholder, disabled = false }: Props ) => {
  const [value, setValue] = useState<string[]>( [] )
  const [loading, setLoading] = useState<boolean>( false )
  const [selected, setSelected] = useState<string>( '' )
  const [isUploadFailed, setIsUploadFailed] = useState<boolean>( false )

  const [parent] = useAutoAnimate( {
    duration : 300,
    easing   : 'ease-in-out'
  } )

  const imageField = useRef<HTMLInputElement>( null )

  const uploadImage = useUpload()

  const handleImage = async ( e: ChangeEvent<HTMLInputElement> ) => {
    if ( !e?.target?.files?.length ) return

    setLoading( true )
    const base64 = await readAsBase64( e.target.files[0] )
    setSelected( base64 )
    const res: IUploadImageResponse | undefined = await uploadImage( base64 )
    if ( res?.status === 200 ) {
      setValue( [...value.concat( res.data )] )
      clearImage()
    } else {
      setIsUploadFailed( true )
    }
    setLoading( false )
    if ( imageField.current ) {
      imageField.current.value = "";
    }
  }

  const clearImage = () => {
    setSelected( '' )
  }

  const removeUploadedImage = ( url: string ) => {
    setValue( value.filter( ( item ) => item !== url ) )
  }

  return (
    <div ref={parent}
      className="flex flex-col gap-4 overflow-hidden"
    >
      <input
        ref={imageField}
        type="file"
        placeholder={placeholder}
        className="hidden"
        onInput={handleImage}
        disabled={disabled}
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
      />
      {/* Display uploaded image */}
      {value.length > 0 &&
        value.map( ( item, i: number ) => (
          <div
            key={i}
            className="aspect-video w-full relative border border-white/25 rounded-lg hover:border-white/50 transition-default overflow-hidden"
          >
            <div className="absolute z-20 right-4 top-4">
              <button
                type="button"
                className="text-white w-6 aspect-square border border-white/25 hover:border-white/50 bg-dark-secondary rounded-full"
                onClick={() => removeUploadedImage( item )}
                disabled={disabled || loading}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <Image
              src={getImageSize( item, 'md' ) as string}
              alt="Preview image"
              fill
              style={{
                objectFit : 'contain',
              }}
              className="z-0"
            />
            {loading && (
              <div className="absolute w-full h-full flex items-center justify-center top-0 left-0">
                <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 bg-white-overlay opacity-50"></div>
                <Spinner />
              </div>
            )}
            {isUploadFailed && (
              <div className="absolute w-full h-full flex items-center justify-center top-0 left-0">
                <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 bg-white-overlay opacity-50"></div>
                <Button2
                  onClick={clearImage}
                  className="z-10 whitespace-nowrap"
                  variant="link"
                >
                  <FontAwesomeIcon icon={faXmark} />
                Clear image
                </Button2>
              </div>
            )}
          </div>
        ) )}

      <button
        type="button"
        className={cn(
          'h-40 w-full border border-dashed border-white/25 hover:border-white/50 rounded-lg text-base'
        )}
        onClick={() => imageField.current?.click()}
        disabled={disabled}
      >
        Select Image
      </button>
    </div>
  )
}

export default UploadMultipleImage
